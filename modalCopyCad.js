(function ($, Structure) {
    $.widget("UIApp.modalCopyCad", {
        options: {
            callback: null,
            cancelCallback: null
        },

        _create: function () {
            var widget = this;
            var $messageLabel = $('<div class="header control-label">Select which user you would like to copy this Cadence to:</div>');
            var $ddlTransfer = $('<input/>').prop("type", "hidden").prop("id", "name");
            var $select2Container = $('<div class="select2-container"></div>').append($ddlTransfer);

            var users = getUser();

            widget.element.append($messageLabel).append($select2Container);

            widget.element.customModal({
                heading: 'Copy Cadence?'
                , callback: widget.options.callback
                , cancelCallback: widget.options.cancelCallback
            });

            Structure.Utilities.BindSelect2($ddlTransfer, users, "id", "name");
        },

        _destroy: function () {
            this.remove();
        }
    });

    /*
    * This funciton would perform a service call to a db.
    */
    function getUser() {
        return [{ "id": "Bob Smith", "name": "Bob Smith" }, { "id": "John Doe", "name": "John Doe" }];
    }
})(jQuery, UIApp.Structure);