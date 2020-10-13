(function ($, Structure, _) {
    Structure.Utilities = Structure.Utilities ||
	(function () {
	    //#region Notifications
	    var displayNotify = function (message) {
	        var timeoutDelay = 3000;
	        var notifyOffset = window.innerHeight - 105;

	        $.notify({
	            // options
	            icon: null,
	            message: message,
	            url: '',
	            target: ''
	        }, {
	            // settings
	            element: 'body',
	            position: null,
	            type: 'info',
	            allow_dismiss: true,
	            newest_on_top: true,
	            showProgressbar: false,
	            placement: {
	                from: "bottom",
	                align: "center"
	            },
	            offset: notifyOffset,
	            spacing: 10,
	            z_index: 20000,
	            delay: timeoutDelay,
	            timer: 1000,
	            url_target: '',
	            mouse_over: null,
	            animate: {
	                enter: 'animated fadeInDown',
	                exit: 'animated fadeOutUp'
	            },
	            onShow: null,
	            onShown: null,
	            onClose: null,
	            onClosed: null,
	            icon_type: 'class',
	            template: '<div data-notify="container" class="col-xs-3 alert alert-{0}" role="alert">' +
	                        '<span data-notify="icon"></span>' +
	                        '<span data-notify="title">{1}</span>' +
	                        '<span data-notify="message" class="message col-xs-10">{2}</span>' +
                            '<button type="button" aria-hidden="true" class="btn-close-notify" data-notify="dismiss">×</button>' +
	                        '<a href="{3}" target="{4}" data-notify="url"></a>' +
                        '</div>'
	        });
	    };

	    //#region Select2 Helpers
	    var bindSelect2 = function ($s2control, data, valueColumnName, textColumnName) {
	        var bindData = [];
	        var rowObj = {};

	        if (!valueColumnName && !textColumnName) {
	            _.each(data, function (row) {
	                rowObj = {
	                    id: row,
	                    text: row
	                };
	                bindData.push(rowObj);
	            });
	        }
	        else {
	            _.each(data, function (row) {
	                rowObj = {
	                    id: row[valueColumnName],
	                    text: row[textColumnName]
	                };
	                bindData.push(rowObj);
	            });
	        }

	        $s2control.select2({ data: bindData, placeholder: "Select" });
	        return bindData;
	    };

	    function triggerOnEnter(e, $button) {
	        if (e.which === 13) {
	            e.preventDefault();
	            $button.trigger("click");
	        }
	    }

	    /**
         * Uses the location of the control and window height to calculate the height of the control.
         */
	    var calcHeight = function ($control, customBottomOffsetPercent) {
	        var parentOffset = $($control).offset().top;
	        var windowHeight = $(window).height() - $('.navbar').height();
	        var bottomOffsetPercent = customBottomOffsetPercent || 0.15;
	        var bottomOffset = windowHeight * bottomOffsetPercent;
	        return (windowHeight - parentOffset - bottomOffset);
	    };

	    return {
	        DisplayNotify: displayNotify
	        , BindSelect2: bindSelect2
	        , TriggerOnEnter: triggerOnEnter
	        , CalcHeight: calcHeight
	    };
	})();
})(jQuery, UIApp.Structure, _);