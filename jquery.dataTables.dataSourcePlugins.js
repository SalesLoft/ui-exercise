// Check Box Sorting
$.fn.dataTableExt.afnSortData['dom-checkbox'] = function(oSettings, iColumn) {
    var aData = [];
    $('td:eq(' + iColumn + ') input', oSettings.oApi._fnGetTrNodes(oSettings)).each(function() {
        aData.push(this.checked == true ? "1" : "0");
    });
    return aData;
}