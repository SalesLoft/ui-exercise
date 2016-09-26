(function ($, Structure) {
    var g_widget, g_$inputBtnGroup, g_$tagBtnGroup, g_$tagInput, g_$tagOutput, g_$outputArea, g_uniquetags, g_$input, g_tags;

    $.widget("UIApp.modalManageTags", {
        options: {
            callback: null,
            cancelCallback: null,
            uniqueTags: null,
            tags: null
        },

        _create: function () {
            var g_widget = this;

            var addBtnSpan = $('<span id="addBtn" class="input-group-btn"><button class="btn btn-primary btn-add" type="button">+ Add</button></span>');
            g_$input = $('<input class="typeahead tt-input" type="text">');
            g_$inputBtnGroup = $('<div class="input-group"></div>')
                .append(g_$input)
                .append(addBtnSpan);

            g_$outputArea = $('<ul class="form-control">');
            g_$tagBtnGroup = $('<div id="tagOutput"></div>')
                .append($('<div class="header control-label">Tags:</div>'))
                .append(g_$outputArea);

            g_uniquetags = g_widget.options.uniqueTags
            g_tags = g_widget.options.tags
            g_$tagInput = g_$inputBtnGroup.find('.tt-input');
            $addBtn = g_$inputBtnGroup.find('.btn-add');
            g_$tagOutput = g_$tagBtnGroup.find('#tagOutput');

            $addBtn.on('click', addTag);
            g_$tagInput.keypress(function (e) {
                if ($addBtn.hasClass('disabled') === false) {
                    Structure.Utilities.TriggerOnEnter(e, $addBtn);
                }
            });

            g_$tagInput.keyup(function (e) {
                if (g_$tagInput.val() === "") {
                    $addBtn.addClass('disabled');
                } else {
                    $addBtn.removeClass('disabled');

                    // IE compatability. Didn't have time to find a better solution.
                    $addBtn.focus();
                    g_$tagInput.focus();
                }
            });

            $addBtn.addClass('disabled');

            g_widget.element.append(g_$inputBtnGroup).append(g_$tagBtnGroup);

            g_$input.typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            },
            {
                name: 'uniquetags',
                source: substringMatcher(g_uniquetags)
            });

            addExistingTags(g_tags);

            g_widget.element.customModal({
                heading: "Manage Tags"
                , confirmBtnText: 'Save'
                , callback: function () { g_widget.options.callback($('.btnTag-add')); }
                , cancelCallback: g_widget.options.cancelCallback
            });
        },

        _destroy: function () {
            this.remove();
        }
    });

    function addTag() {
        var tag = g_$tagInput.val();
        if (g_uniquetags.indexOf(tag) === -1) {
            addToTagList(tag);
            g_uniquetags.push(tag);
        }
        g_$tagInput.val("");
        $('.tt-menu').hide();
    }

    function addExistingTags(tags) {
        _.each(tags, function (tag) {
            addToTagList(tag);
        });
    }

    function renderTagListItem(tag) {
        return $('<li type="button" id="btnTag" class="btn-default btnTag-add"><span>' + tag + '</span><a class="delete">x</a></li>');
    }

    function addToTagList(tag) {
        var $newOutputTag = renderTagListItem(tag);
        $newOutputTag.find('a.delete').on('click', function () { $newOutputTag.remove(); });

        g_$outputArea.append($newOutputTag);
    }

    var substringMatcher = function (strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            if (q.indexOf('\\') > -1 || q.indexOf('[') > -1 || q.indexOf('?') > -1 || q.indexOf('*') > -1) {
                return;
            }
            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function (i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });

            cb(matches);
        };
    };
})(jQuery, UIApp.Structure);