(function () {
    $.widget("UIApp.ucAddPallet", {
        options: {
            callback: null,
            cancelCallback: null,
            body: null,
            heading: null,
            confirmBtnText: null,
            cancelBtnText: null,
            showCancel: null
        },

        _create: function () {
            var _this = this;
            var messageLabel = $('<label class="control-label regularFont">' + _this.options.body + '</label>');

            _this.element.append(messageLabel);

            _this.element.customModal({
                heading: _this.options.heading
                , callback: _this.options.callback
                , cancelCallback: _this.options.cancelCallback
                , confirmBtnText: _this.options.confirmBtnText
                , cancelBtnText: _this.options.cancelBtnText
                , showCancel: _this.options.showCancel
            });
        },

        _destroy: function () {
            var _this = this;
            _this.remove();
        }
    });
})();