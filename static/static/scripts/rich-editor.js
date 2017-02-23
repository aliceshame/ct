require([
    './scribe',
    './scribe-plugin-toolbar',
    './scribe-plugin-formatter-plain-text-convert-new-lines-to-html',
    './scribe-plugin-sanitizer',
    './scribe-plugin-inline-styles-to-elements',
    './scribe-plugin-heading-command',
    './scribe-plugin-link-prompt-command',
    './scribe-plugin-blockquote-command',
    './scribe-plugin-smart-lists',
    './scribe-plugin-intelligent-unlink-command',
    './scribe-plugin-formatter-html-ensure-semantic-elements',
    './scribe-plugin-content-cleaner',
    './scribe-plugin-keyboard-shortcuts',
    './dialog-polyfill'
], function (Scribe, scribePluginToolbar, scribePluginFormatterPlainTextConvertNewLinesToHtml, scribePluginSanitizer, scribePluginInlineStyles, scribePluginHeadingCommand, scribePluginLinkPromptCommand, scribePluginBlockquoteCommand, scribePluginSmartLists, scribePluginIntelligentUnlinkCommand, scribePluginFormatterHtmlEnsureSemanticElements, scribePluginContentCleaner, scribePluginKeyboardShortcuts, dp) {
    Array.prototype.slice.call(document.querySelectorAll('dialog')).forEach(function (dialog) {
        if (!dialog.showModal)
            dp.registerDialog(dialog);
        var close = dialog.querySelector('.close');
        if (close) {
            close.addEventListener('click', function () {
                dialog.close();
            });
        }
    });
    const scribes = Array.prototype.slice.call(document.querySelectorAll('.scribe'));
    function ctrlKey(event) {
        return event.metaKey || event.ctrlKey;
    }
    function initScribe(div_) {
        const contentElement = div_.querySelector('.scribe__content');
        const toolbarElement = div_.querySelector('.scribe__toolbar');
        const content = new Scribe(contentElement);
        content.use(scribePluginFormatterPlainTextConvertNewLinesToHtml());
        content.use(scribePluginSanitizer(sanitizer));
        content.use(scribePluginInlineStyles());
        content.use(scribePluginHeadingCommand(5));
        content.use(scribePluginLinkPromptCommand());
        content.use(scribePluginBlockquoteCommand());
        content.use(scribePluginSmartLists());
        content.use(scribePluginIntelligentUnlinkCommand());
        content.use(scribePluginFormatterHtmlEnsureSemanticElements());
        content.use(scribePluginContentCleaner());
        content.use(scribePluginKeyboardShortcuts(keys));
        content.use(scribePluginToolbar(toolbarElement));
    }
    let keys = {
        bold: function (event) {
            return ctrlKey(event) && event.keyCode === 66;
        },
        italic: function (event) {
            return ctrlKey(event) && event.keyCode === 73;
        },
        strikeThrough: function (event) {
            return event.altKey && event.shiftKey && event.keyCode === 83;
        },
        removeFormat: function (event) {
            return event.altKey && event.shiftKey && event.keyCode === 65;
        },
        linkPrompt: function (event) {
            return ctrlKey(event) && !event.shiftKey && event.keyCode === 75;
        },
        unlink: function (event) {
            return ctrlKey(event) && event.shiftKey && event.keyCode === 75;
        },
        insertUnorderedList: function (event) {
            return event.altKey && event.shiftKey && event.keyCode === 66;
        },
        insertOrderedList: function (event) {
            return event.altKey && event.shiftKey && event.keyCode === 78;
        },
        blockquote: function (event) {
            return event.altKey && event.shiftKey && event.keyCode === 87;
        },
        h5: function (event) {
            console.log(event.keyCode);
            return event.altKey && event.shiftKey && event.keyCode === 72;
        }
    };
    keys = Object.freeze(keys);
    const sanitizer = {
        tags: {
            p: {},
            br: {},
            b: {},
            strong: {},
            i: {},
            em: {},
            strike: {},
            blockquote: {},
            code: {},
            ol: {},
            ul: {},
            li: {},
            a: { href: true },
            h5: {},
            u: {}
        }
    };
    scribes.forEach(initScribe);
    document.addEventListener('textPartAdded', (event_) => {
        const scribe_ = event_.srcElement.querySelector('.scribe');
        initScribe(scribe_);
    });
});
//# sourceMappingURL=rich-editor.js.map