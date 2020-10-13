(function ($, Structure) {
    //#region Variables
    var g_$tblCad;

    var g_manage = "manage";
    var g_copy = "copy";
    var g_archive = "archive";
    var g_toggleVisibility = "toggleVisibility";
    var g_delete = "delete";
    var g_uniqueTags, g_selectedRow, g_tableData, g_rowIndex;

    //#endregion Variables

    //#region Doc Ready
    $().ready(function () {
        initVars();
        initControls();
        initEvents();
    });

    function initVars() {
        g_$tblCad = $('#tblCad');
    }

    function initControls() {
        initTable();

        g_tableData = getData();

        bindData(getData());

        var tags = [];
        _.each(g_tableData, function (data) {
            _.each(data.tags, function (tag) {
                tags.push(tag);
            });
        });

        g_uniqueTags = _.union(tags);
    }

    function initEvents() {
    }
    //#endregion Doc Ready

    //#region Events

    function showTagSelection(e) {
        var selectedRow = g_$tblCad.DataTable().row($(e.target).closest("tr")).data();
        var $container = renderTagOptions(selectedRow.tags);

        addQtipEvent($(this), $container);

        $container.find('#btnTagOption').on('click', btnTagOption_clicked);
    }

    function showActionSelection(e) {
        var selectedRow = g_$tblCad.DataTable().row($(e.target).closest("tr")).data();
        var $container = renderActionOptions(selectedRow);
        g_rowIndex = g_$tblCad.DataTable().row($(e.target).closest("tr")).index();
        g_selectedRow = selectedRow;
        addQtipEvent($(this), $container);

        $container.find('.btnAction').on('click', btnAction_clicked);
    }

    function btnAction_clicked() {
        $('.qtip').hide();
        switch ($(this).prop('id')) {
            case g_manage:
                displayManageTagModal(g_selectedRow.tags);
                break;
            case g_copy:
                displayCopyCadModal();
                break;
            case g_archive:
                displayArchiveModal();
                break;
            case g_toggleVisibility:
                displayToggleVisibilityConfirmationModal();
                break;
            case g_delete:
                displayDeleteConfirmationModal();
                break;
            default:
                throw new Error("Case unimplemented");
        }

        if ($(this).hasClass(g_manage)) {
        }
    }

    function btnTagOption_clicked(e) {
        $('.qtip').hide();
        var tag = $(this).html();
        $($("th[aria-label*='TAGS:']")[0]).children().val(tag);
        g_$tblCad.DataTable().columns(3).search(tag).draw();
    }

    //#endregion Events

    //#region Helper Function

    /*
    * This funciton would perform a service call to a db.
    */
    function updateTable($newTags) {
        var newTags = [];
        _.each($newTags, function (newTag) {
            $newTag = $(newTag);
            newTags.push($newTag.children().html());
        });
        g_tableData[g_rowIndex].tags = newTags;

        Structure.Tbl.BindData(g_$tblCad, g_tableData);

        Structure.Utilities.DisplayNotify("Tags Saved");
    }

    /*
    * This funciton would perform a service call to a db.
    */
    function deleteCad() {
        g_tableData = $.grep(g_tableData, function (row) {
            return row != g_tableData[g_rowIndex];
        });

        Structure.Tbl.BindData(g_$tblCad, g_tableData);

        Structure.Utilities.DisplayNotify('Cadence "' + g_tableData[g_rowIndex].cadName + '" deleted');
    }

    /*
    * This funciton would perform a service call to a db.
    */
    function setVisibility(visibility) {
        g_tableData[g_rowIndex].visibility = visibility;

        Structure.Tbl.BindData(g_$tblCad, g_tableData);

        Structure.Utilities.DisplayNotify('Cadence "' + g_tableData[g_rowIndex].cadName + '" made ' + visibility);
    }

    /*
    * This funciton would perform a service call to a db.
    * Assigning to other users is OOS of this exercise.
    */
    function copyCad() {
        //Write new cad to db.

        //Pull and redraw table.
    }

    /*
    * This funciton would perform a service call to a db.
    */
    function archiveCad() {
        //Set flag in record.

        //Pull and redraw table.

        //JQuery dataTables cannot replicate this functionality with just column filtering.
        //However, this can be remedied easily by adding something like a "show Archived" checkbox.
    }

    function displayArchiveModal() {
        var modal = $('<div></div>');
        modal.modalConfirmation({
            callback: archiveCad
            , heading: 'Archive Cadence?'
            , body: 'Are you sure you want to archive this Cadence?'
            , confirmBtnText: 'Yes'
            , cancelBtnText: 'No'
            , confirmationType: 'warning'
        });
    }

    function displayCopyCadModal() {
        var modal = $('<div></div>');
        modal.modalCopyCad({
            callback: copyCad
        });
    }

    function displayManageTagModal(tags) {
        var modal = $('<div></div>');
        modal.modalManageTags({
            callback: updateTable
            , uniqueTags: g_uniqueTags
            , tags: tags
        });
    }

    function displayToggleVisibilityConfirmationModal() {
        var visibility = 'private';

        if (g_selectedRow.visibility === 'private') {
            visibility = 'public';
        }

        var modal = $('<div></div>');
        modal.modalConfirmation({
            callback: function () { setVisibility(visibility); }
            , heading: 'Change Cadence Visibility?'
            , body: "Are you sure you want to set this Cadence's visilbity to " + visibility + "?"
            , confirmBtnText: 'Yes'
            , cancelBtnText: 'No'
        });
    }

    function displayDeleteConfirmationModal(tags) {
        var modal = $('<div></div>');
        modal.modalConfirmation({
            callback: deleteCad
            , heading: 'Delete Cadence?'
            , body: 'Are you sure you want to delete this Cadence? All data will be lost and all scheduled emails will be cancelled.'
            , confirmBtnText: 'Yes'
            , cancelBtnText: 'No'
            , confirmationType: 'warning'
        });
    }

    function addQtipEvent($element, container) {
        $element.qtip({
            overwrite: false,
            hide: 'unfocus',
            position: {
                my: 'center right',
                at: 'bottom left'
            },
            content: container,
            show: {
                ready: true,
                solo: true,
                event: 'click'
            },
            style: {
                classes: 'qtip-light qtip-shadow'
            }
        });
    }

    function renderActionOptions(selectedRow) {
        var visibility = 'private';

        if (selectedRow.visibility === 'private') {
            visibility = 'public';
        }

        var container = $('<div></div>')
        var actions = [
              { "text": "Manage Tags", "id": g_manage }
            , { "text": "Copy", "id": g_copy }
            , { "text": "Archive", "id": g_archive }
            , { "text": "Make " + visibility, "id": g_toggleVisibility }
            , { "text": "Delete", "id": g_delete }];

        _.each(actions, function (action) {
            container.append($('<button type="button" id=' + action.id + ' class="btn btn-default option col-xs-12 text-left btnAction">' + action.text + '</button>'))
        });
        return container;
    }

    function renderTagOptions(tags) {
        var container = $('<div></div>')
        _.each(tags, function (tag) {
            container.append($('<button type="button" id="btnTagOption" class="btn btn-default option col-xs-12 text-left">' + tag + '</button>'))
        });

        return container;
    }

    /*
    * Paging is easy enough to add. However, since jQuery Datatables has instant column filter pagination is not needed.
    * Consequently, all of the Filter & Sort functionalty is achievable by the column filter
    */
    function initTable() {
        var tblSettings = {
            "columns": [
                 { "data": "visibility", "render": renderLock, "width": "5%", "sClass": "text-center" }
               , { "data": "cadName", "sClass": "text-left", "width": "50%" }
               , { "data": "owner", "sClass": "text-left", "width": "10%" }
               , { "data": "tags", "render": renderTag, "sClass": "text-left", "width": "10%" }
               , { "data": "stats", "render": renderStats, "sClass": "text-left" }
               , { "render": renderGear, "width": "5%", "sClass": "text-center" }
            ]
            , "columnDefs": [
                  { "targets": 0, "orderable": false }
                , { "targets": 5, "orderable": false }, {
                    targets: [0, 1, 2, 3, 4, 5],
                    render: function (data, type) {
                        if (type == 'display') {
                            return '<span class="td-container" title="' + data + '">' + data + '</span>';
                        } else {
                            return data;
                        }
                    }
                }
            ]
            , "drawCallback": function () {
                $('span[title]').qtip({
                    position: {
                        my: 'bottom center',
                        at: 'top center'
                    },
                    style: {
                        classes: 'qtip-dark'
                    }
                });
            }
        };
        Structure.Tbl.LoadTbl(g_$tblCad, tblSettings, [0, 5]);
    }

    function bindData(tblData) {
        Structure.Tbl.BindData(g_$tblCad, tblData);

        g_$tblCad.on('click', '.multiple-tag', showTagSelection);
        g_$tblCad.on('click', '.single-tag', btnTagOption_clicked);
        g_$tblCad.on('click', '.actionGear', showActionSelection);
    }

    function renderGear() {
        return '<button type="button" id="btnAction" class="st action-icon qa-gear actionGear"/>'
    }

    function renderTag(data) {
        if (data.length > 2) {
            var tags = '';
            _.each(data, function (tag) {
                tags += tag + ' ';
            });
            return '<div><span class="hidden">' + tags + '</span><button type="button" id="btnTag" class="btn-default btnTag multiple-tag">' + data.length + ' Tags</button></div>'
        }
        else if (data.length === 2) {
            return '<div><button type="button" id="btnTag" class="btn-default btnTag single-tag">' + data[0]
                + '</button><button type="button" id="btnTag" class="btn-default btnTag single-tag">' + data[1] + '</button></div>';
        }
        else if (data.length === 1) {
            return '<div><button type="button" id="btnTag" class="btn-default btnTag single-tag">' + data[0] + '</button></div>';
        }
    }

    function renderLock(data) {
        if (data === 'private') {
            return '<button type="button" id="btnAction" class="st action-icon qa-gear privateLock"/>'
        }
        return '<div/>'
    }

    function renderStats(data) {
        var total = data[0];
        var completed = data[1];
        var removed = data[2];

        return '<div class="col-md-12 div-stats">' +
                    '<div class="col-md-4 text-center div-stats">' +
                        '<div class="div-stats col-md-12">' + data[0] + '</div>' +
                        '<div class="div-stats cad-stat-name col-md-12">Total People</div>' +
                    '</div>' +
                    '<div class="col-md-4 text-center div-stats">' +
                        '<div class="div-stats col-md-12">' + data[1] + '</div>' +
                        '<div class="div-stats cad-stat-name col-md-12">Compeleted</div>' +
                    '</div>' +
                    '<div class="col-md-4 text-center div-stats">' +
                        '<div class="div-stats col-md-12">' + data[2] + '</div>' +
                        '<div class="div-stats cad-stat-name col-md-12">Removed</div>' +
                    '</div>' +
                '</div>';
    }

    /*
    * This funciton would perform a service call to a db.
    * Since that is not a part of this exercise the data will be static
    */
    function getData() {
        return [
              { "hasLock": "", "cadName": "Cadence A", "owner": "Person A", "tags": ["Good", "bad", "test"], "stats": [5, 3, 2], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence B", "owner": "Person B", "tags": ["Good", "bad", "test"], "stats": [6, 5, 2], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence C", "owner": "Person C", "tags": ["Good", "bad", "test"], "stats": [1, 0, 0], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence D", "owner": "Person D", "tags": ["Good", "bad"], "stats": [9, 4, 3], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence E", "owner": "Person E", "tags": ["Good"], "stats": [7, 4, 3], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence F", "owner": "Person F", "tags": ["bad"], "stats": [8, 7, 2], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence G", "owner": "Person G", "tags": ["test"], "stats": [3, 2, 0], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence H", "owner": "Person H", "tags": ["Good", "bad", "test"], "stats": [4, 2, 3], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence I", "owner": "Person I", "tags": ["Good", "bad", "test"], "stats": [5, 2, 1], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence J", "owner": "Person J", "tags": ["Good", "bad"], "stats": [3, 2, 0], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence K", "owner": "Person K", "tags": ["Good"], "stats": [1, 2, 2], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence L", "owner": "Person L", "tags": ["bad"], "stats": [2, 2, 1], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence M", "owner": "Person M", "tags": ["test"], "stats": [3, 2, 0], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence N", "owner": "Person N", "tags": ["Good", "bad", "test"], "stats": [6, 2, 0], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence O", "owner": "Person O", "tags": ["Good", "bad", "test"], "stats": [7, 2, 1], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence P", "owner": "Person P", "tags": ["Good", "bad"], "stats": [2, 2, 0], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence Q", "owner": "Person Q", "tags": ["Good"], "stats": [1, 2, 0], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence R", "owner": "Person R", "tags": ["bad"], "stats": [7, 2, 1], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence S", "owner": "Person S", "tags": ["test"], "stats": [9, 2, 0], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence T", "owner": "Person T", "tags": ["Good", "bad", "test"], "stats": [5, 2, 1], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence U", "owner": "Person U", "tags": ["Good", "bad", "test"], "stats": [3, 2, 0], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence V", "owner": "Person V", "tags": ["Good", "bad"], "stats": [1, 2, 0], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence W", "owner": "Person W", "tags": ["Good"], "stats": [2, 2, 1], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence X", "owner": "Person X", "tags": ["bad"], "stats": [7, 2, 1], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence Y", "owner": "Person Y", "tags": ["test"], "stats": [7, 2, 0], "visibility": "public" }
            , { "hasLock": "", "cadName": "Cadence Z", "owner": "Person Z", "tags": ["test"], "stats": [8, 2, 1], "visibility": "public" }
        ];
    }

    //#endregion Helper Function
})(jQuery, UIApp.Structure);