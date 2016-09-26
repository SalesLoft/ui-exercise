(function ($, Structure) {
    $.fn.extend({
        customModal: function (modalOptions) {
            var defaults = {
                callback: null,
                confirmBtnText: 'Confirm',
                confirmBtnClass: null,
                cancelBtnText: 'Cancel',
                cancelCallback: null,
                size: 'medium',
                modalType: null
            };

            var options = $.extend(defaults, modalOptions);
            var _this = $(this);

            var modal = $('<div></div>').addClass('modal fade');
            var modalDialog = $('<div></div>').addClass('modal-dialog');
            var modalContent = $('<div></div>').addClass('modal-content');
            var modalClose = $('<button></button>')
                .addClass('close')
                .attr({
                    "data-dismiss": "modal"
                    , "type": "button"
                    , "aria-hidden": "true"
                })
                .html("&times;");

            var modalCancel = $('<button></button>').addClass('btn btn-cancel').attr("data-dismiss", "modal").html(options.cancelBtnText);

            var modalHeader = $('<div></div>').addClass('modal-header').append(modalCancel).append($('<h4></h4>').html(options.heading));
            var modalConfirm = $('<button></button>').addClass('btn btn-primary').html(options.confirmBtnText);

            if (options.modalType !== null) {
                if (options.modalType === 'warning') {
                    modalHeader = $('<div></div>').addClass('modal-header warning').append(modalCancel).append($('<h4></h4>').html(options.heading));
                    modalConfirm = $('<button></button>').addClass('btn btn-warning').html(options.confirmBtnText);
                }
            }
            var modalBody = $('<div></div>').addClass('modal-body').append(_this);
            var modalFooter = $('<div></div>').addClass('modal-footer').append(modalCancel).append(modalConfirm);

            modal.append(modalDialog.append(
                modalContent
                    .append(modalHeader)
                    .append(modalBody)
                    .append(modalFooter)
            ));

            var closeHandler = function () {
                modal.remove();
            };

            if (options.size === 'small')
                modalDialog.addClass('modal-sm');
            else if (options.size === 'large')
                modalDialog.addClass('modal-lg');

            modalConfirm.on('click', function () {
                var close;

                if (options.callback !== null) {
                    close = options.callback();
                }

                if (close !== false) {
                    modal.one('hidden.bs.modal', function () {
                        closeHandler();
                    });

                    modal.modal('hide');
                }
            });

            modalConfirm.on('keydown', function (e) {
                if (e.keyCode === Structure.Utilities.TAB_KEY || e.which === Structure.Utilities.TAB_KEY) {
                    Structure.Controls.FocusFirstControl();

                    e.preventDefault();
                }
            });

            modalCancel.one('click', function () {
                modal.one('hidden.bs.modal', function () {
                    // Once the modal has been hidden, call the callbacks, if they've been set
                    if (options.cancelCallback !== null) {
                        options.cancelCallback();
                    }
                    closeHandler();
                });
            });

            modalClose.one('click', function () {
                modal.one('hidden.bs.modal', function () {
                    closeHandler();
                });
            });

            //center the modal
            modal.css('display', 'block');

            modal.modal();
        }
    });
})(jQuery, UIApp.Structure);