(function ($, Structure, _) {
    Structure.Tbl = Structure.Tbl ||
    (function () {
        var sumColumn = function (api, columnIndex) {
            //var table = $table.DataTable();
            //var tableID = '#' + $table[0].id + '_wrapper';
            //var $filterRow = $("#filterrow th").closest(tableID).find("#filterrow th");
            // Total over all pages
            var total = api
                .column(columnIndex)
                .data()
                .reduce(function (a, b) {
                    return parseInt(a) + parseInt(b);
                });

            // Total over this page
            var pageTotal = api
                 .column(columnIndex, { page: 'current' })
                 .data()
                 .reduce(function (a, b) {
                     return parseInt(a) + parseInt(b);
                 }, 0);

            // Update footer
            $(api.column(columnIndex).footer()).html(pageTotal + " of " + total);
        };

        /**
         * Uses the location of the table and window height to set the height of the table.
         * @param {Jquery object} $table - The data Table being sized.
         * @param {int} customBottomOffsetPercent - OPTIONAL: Defaults to 15%. Percent of screen whitespace between bottom of table and bottom of screen.
         * @returns {int} Table Height
         */
        var calcTableHeight = function ($table, customBottomOffsetPercent, parentTableHeight) {
            var tableHeight = Structure.Utilities.CalcHeight($table, customBottomOffsetPercent) - $('#pageHeaderContainer').height();

            if (parentTableHeight) {
                tableHeight -= parentTableHeight;
            }

            return tableHeight;
        };

        //skipColumnIndexes is an integer array of columns that should not be searched on
        //it can also be false, which explicitely does not enable column searching
        var loadTbl = function ($table, tableSettings, skipColumnIndexes) {
            var defaults = {
                "dom": "t",
                "paging": false,
                "info": true,
                "ordering": true,
                "sScrollY": calcTableHeight($table),
                "aaSorting": [], // disable the initial sorting
                "oLanguage": { //Used to Modify the text on the data table
                    "sLengthMenu": "Display _MENU_ records per page",
                    "sInfo": "Showing _TOTAL_ record(s)",
                    "sInfoEmpty": "Showing 0 records",
                    "sInfoFiltered": "(filtered from _MAX_ returned records)"
                }
            };

            var dataTableHandle = $table.DataTable($.extend(defaults, tableSettings));

            if (skipColumnIndexes !== false) {
                enableColumnSearching($table, skipColumnIndexes);
            }

            var $searchBox = $(".dataTables_filter").find("input");

            return dataTableHandle;
        };

        //#region ENABLE COLUMN SEARCHING
        var enableColumnSearching = function ($table, skipColumnIndexes) {
            if (skipColumnIndexes && !_.isArray(skipColumnIndexes)) {
                throw new Error("Skip Column Indexes must be an array of integers");
            }

            var upperColumnIndex = $table.find('thead th').length - 1;
            var outOfBoundIndex = _.find(skipColumnIndexes, function (value) {
                return value > upperColumnIndex;
            });

            if (typeof outOfBoundIndex !== 'undefined') {
                throw new Error("Index " + outOfBoundIndex + " is out column bounds.");
            }

            addSearchRowToHeader($table);

            addSearchInputsToHeader($table, skipColumnIndexes);
        };

        var addSearchRowToHeader = function ($table) {
            var $tableHeaderFilterRow;

            var $scrollBody = $table.closest('.dataTables_scrollBody');
            var $targetHead;

            if ($scrollBody.length > 0) {
                $targetHead = $table.closest(".dataTables_scroll").find(".dataTables_scrollHeadInner thead");
                $tableHeaderFilterRow = $targetHead.find('tr').clone();
            }
            else {
                $targetHead = $table.find('thead');
                $tableHeaderFilterRow = $targetHead.find('tr').clone();
            }

            $tableHeaderFilterRow.prop("id", "filterrow");

            $tableHeaderFilterRow.find('th').removeAttr('class').html("");

            $targetHead.prepend($tableHeaderFilterRow);
        };

        var addSearchInputsToHeader = function ($table, skipColumnIndexes) {
            var table = $table.DataTable();
            var tableID = '#' + $table[0].id + '_wrapper';
            var $filterRow = $("#filterrow th").closest(tableID).find("#filterrow th");
            var colIndex = 0;

            $filterRow.each(function () {
                colIndex = $(this).index();

                if (_.contains(skipColumnIndexes, colIndex)) { return true; } // next.each

                //changing tab order for filter cells and filter boxes
                $(this).html('<input type="text" class="form-control dataTable_column_filter col-xs-8" placeholder="Search Column..."/>');
            });

            //gets datatables indices of visible columns
            var visible = [];
            _.each(table.columns().visible(), function (row, index) {
                if (row) visible.push(index);
            });

            //iterates over visible columns and associates them to appropriate input boxes
            _.each(visible, function (visColIdx, tableColIdx) {
                if (_.contains(skipColumnIndexes, tableColIdx)) { return true; }

                $filterRow.eq(tableColIdx).find("input").on('keyup change paste', function () {
                    var input = this;
                    setTimeout(function () {
                        table
                        .column(visColIdx)
                        // Disable smart search on columns
                        .search(input.value)
                        .draw();
                    }, 100);
                });
            });
        };
        //#endregion ENABLE COLUMN SEARCHING

        var enableSingleSelection = function ($table, callbacks) {
            $table.find('tbody').on('click', 'tr', function () {
                var $row = $(this);
                var $cell = $row.children();
                var $leftCell = $($cell[0]);
                var $rightCell = $($cell[$cell.length - 1]);

                if ($cell.hasClass('dataTables_empty')) {
                    return;
                }

                if ($cell.hasClass('selectedCell', 'leftEndCell', 'rightEndCell') || $row.hasClass('selected')) {
                    $row.removeClass('selected');
                    $cell.removeClass('selectedCell table-bordered');
                    $leftCell.removeClass('leftEndCell');
                    $rightCell.removeClass('rightEndCell');
                    if (callbacks && callbacks.deSelectCallback) {
                        callbacks.deSelectCallback();
                    }
                }
                else {
                    clearSelectedRow($table);
                    $row.addClass('selected');
                    $cell.addClass('selectedCell table-bordered');
                    $leftCell.addClass('leftEndCell');
                    $rightCell.addClass('rightEndCell');
                    if (callbacks && callbacks.selectCallback) {
                        //select callback passes row data and row index to function
                        var row = $table.DataTable().row(this);
                        callbacks.selectCallback(row.data(), row.index());
                    }
                }
            });
        };

        var clearSelectedRow = function ($table) {
            $table.DataTable().$('tr.selected').removeClass('selected');
            $table.DataTable().$('td.selectedCell').removeClass('selectedCell');
            $table.DataTable().$('td.leftEndCell').removeClass('leftEndCell');
            $table.DataTable().$('td.rightEndCell').removeClass('rightEndCell');
        };

        var enableMultipleSelection = function ($table) {
            $table.find('tbody').on('click', 'tr', function () {
                $(this).toggleClass('active');
            });
        };

        var getSelectedRowData = function ($table) {
            var rows = $table.find('tr.active');
            if (rows.length !== 0) {
                return $table.DataTable().rows(rows).data();
            }
            return $table.DataTable().row($table.find("tbody, tr[class*=selected]")).data();
        };

        var getRowDataOnClick = function ($table, e) {
            var cell = e.target.parentNode;
            return $table.DataTable().row($(cell).closest("tr")).data();
        };

        var isRowVisible = function ($table) {
            return getSelectedRowData($table) != null;
        };

        var bindData = function ($table, data, callback) {
            $table.DataTable().clear();

            if (!data || data.length <= 0) {
                $table.DataTable().draw();
                return;
            }

            $table.DataTable().rows.add(data);
            setTimeout(function () {
                $table.DataTable().columns.adjust().draw();
                if ($table.children()[1] != null && $($table.children()[1]).children().length > 0) {
                    $($table.children()[1]).children().addClass('tableRow');
                }
                if (callback) {
                    callback();
                }
            }, 150);
        };
        var clearTable = function ($table) {
            return $table.DataTable().clear().draw();
        };

        var colorRowOrCell = function ($table, rowOrCell, color) {
            prepareTableForColorizing($table);
            rowOrCell.bgColor = color;
        };

        var colorRowOrCellKeepFormat = function ($table, rowOrCell, color) {
            rowOrCell.bgColor = color;
        };

        var colorCellText = function ($table, cell, color) {
            prepareTableForColorizing($table);
            $(cell).css('color', color);
        };

        var clearSelections = function ($table) {
            $table.find('tr.active').removeClass('active');
        };

        var hideTableRow = function (rowOrCell, hidden) {
            rowOrCell.hidden = hidden;
        };

        function prepareTableForColorizing($table) {
            //This class interferes with row coloring and needs to be removed before the row is colored.
            if ($table.hasClass('table-striped')) {
                $table.removeClass('table-striped');
            }
        }

        ////#region RESIZE_TABLE
        var update_size = function () {
            var tableParents = $('.table').closest('.dataTables_scrollBody');
            var tables = tableParents.find('.table');
            if (tableParents.length > 0) {
                for (var indexOfTable = 0; indexOfTable < tableParents.length; indexOfTable++) {
                    $(tables[indexOfTable]).css({ width: $(tableParents[indexOfTable]).width() });
                    if ($(tables[indexOfTable]) != null) {
                        $(tables[indexOfTable]).DataTable().columns.adjust().draw();
                    }
                }
            }
        };

        $(window).resize(function () {
            clearTimeout(window.refresh_size);
            window.refresh_size = setTimeout(function () { update_size(); }, 250);
        });
        //#endregion RESIZE_TABLE

        var getColIndex = function ($dataTable, colName) {
            var table = $dataTable.DataTable();
            for (var index = 0; index < table.column()[0].length; index++) {
                if (table.column(index).header().innerText === colName) {
                    return index;
                }
            }
        };

        var showHideColumns = function ($dataTable, colNames, colIndexes, visibilityList) {
            var nameLength = colNames.length;
            var indexLength = colIndexes.length;

            if ((nameLength === 0 && indexLength === 0) || visibilityList.length === 0) {
                return;
            }

            // Need to remove custom filter row so column visibility changes don't break the table
            $('.dataTables_scrollHead #filterrow').remove();

            if (nameLength !== 0) {
                _.each(colNames, function (colName, index) {
                    $dataTable.DataTable().column(colName + ":name").visible(visibilityList[index]);
                });
            } else {
                _.each(colIndexes, function (colIndex, index) {
                    $dataTable.DataTable().column(colIndex).visible(visibilityList[index]);
                });
            }

            // Re-enable column searching
            Structure.DataTable.EnableColumnSearching($dataTable);
            $dataTable.DataTable().draw();
        }

        return {
            EnableColumnSearching: enableColumnSearching,
            EnableMultipleSelection: enableMultipleSelection,
            EnableSingleSelection: enableSingleSelection,
            GetSelectedRowData: getSelectedRowData,
            LoadTbl: loadTbl,
            BindData: bindData,
            ClearTable: clearTable,
            ColorRowOrCell: colorRowOrCell,
            ColorCellText: colorCellText,
            ClearSelections: clearSelections,
            ClearSelectedRow: clearSelectedRow,
            SumColumn: sumColumn,
            IsRowVisible: isRowVisible,
            CalcTableHeight: calcTableHeight,
            GetColIndex: getColIndex,
            HideTableRow: hideTableRow,
            ColorRowOrCellKeepFormat: colorRowOrCellKeepFormat,
            GetRowDataOnClick: getRowDataOnClick,
            ShowHideColumns: showHideColumns
        };
    })();
})(jQuery, UIApp.Structure, _);