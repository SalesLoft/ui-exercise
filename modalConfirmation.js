(function () {
    $.widget("UIApp.modalConfirmation", {
        options: {
            callback: null,
            cancelCallback: null,
            body: null,
            heading: null,
            confirmBtnText: null,
            cancelBtnText: null,
            confirmationType: null
        },

        _create: function () {
            var widget = this;
            var messageLabel = $('<div class="header control-label confirmation">' + widget.options.body + '</div>');

            widget.element.append(messageLabel);

            widget.element.customModal({
                heading: widget.options.heading
                , callback: widget.options.callback
                , cancelCallback: widget.options.cancelCallback
                , confirmBtnText: widget.options.confirmBtnText
                , cancelBtnText: widget.options.cancelBtnText
                , modalType: widget.options.confirmationType
            });
        },

        _destroy: function () {
            this.remove();
        }
    });
})();