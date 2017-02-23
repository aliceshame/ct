declare var require : {
    <T>(path : string) : T;
    (paths : string[], callback : (... modules : any[]) => void) : void;
    ensure : (paths : string[], callback : (require : <T>(path : string) => T) => void) => void;
};


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
        ], function (
            Scribe,
            scribePluginToolbar,
            scribePluginFormatterPlainTextConvertNewLinesToHtml,
            scribePluginSanitizer,
            scribePluginInlineStyles,
            scribePluginHeadingCommand,
            scribePluginLinkPromptCommand,
            scribePluginBlockquoteCommand,
            scribePluginSmartLists,
            scribePluginIntelligentUnlinkCommand,
            scribePluginFormatterHtmlEnsureSemanticElements,
            scribePluginContentCleaner,
            scribePluginKeyboardShortcuts,
            dp
        ) {
    Array.prototype.slice.call(document.querySelectorAll('dialog')).forEach(function (dialog : any) {
        if (!dialog.showModal)
            dp.registerDialog(dialog);

        var close = dialog.querySelector('.close');

        if (close) {
            close.addEventListener('click', function () {
                dialog.close();
            });
        }
    });

    const scribes : HTMLDivElement[] = Array.prototype.slice.call(document.querySelectorAll('.scribe'));

    function ctrlKey (event : KeyboardEvent) {
        return event.metaKey || event.ctrlKey;
    }

    function initScribe (div_ : HTMLDivElement) {
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
        bold                : function (event : KeyboardEvent) {
            return ctrlKey(event) && event.keyCode === 66;
        }, // b
        italic              : function (event : KeyboardEvent) {
            return ctrlKey(event) && event.keyCode === 73;
        }, // i
        strikeThrough       : function (event : KeyboardEvent) {
            return event.altKey && event.shiftKey && event.keyCode === 83;
        }, // s
        removeFormat        : function (event : KeyboardEvent) {
            return event.altKey && event.shiftKey && event.keyCode === 65;
        }, // a
        linkPrompt          : function (event : KeyboardEvent) {
            return ctrlKey(event) && !event.shiftKey && event.keyCode === 75;
        }, // k
        unlink              : function (event : KeyboardEvent) {
            return ctrlKey(event) && event.shiftKey && event.keyCode === 75;
        }, // k,
        insertUnorderedList : function (event : KeyboardEvent) {
            return event.altKey && event.shiftKey && event.keyCode === 66;
        }, // b
        insertOrderedList   : function (event : KeyboardEvent) {
            return event.altKey && event.shiftKey && event.keyCode === 78;
        }, // n
        blockquote          : function (event : KeyboardEvent) {
            return event.altKey && event.shiftKey && event.keyCode === 87;
        }, // w
        h5                  : function (event : KeyboardEvent) {
            console.log(event.keyCode);
            return event.altKey && event.shiftKey && event.keyCode === 72;
        } // h
    };

    keys = Object.freeze(keys);

    const sanitizer = {
        tags : {
            p          : {},
            br         : {},
            b          : {},
            strong     : {},
            i          : {},
            em         : {},
            strike     : {},
            blockquote : {},
            code       : {},
            ol         : {},
            ul         : {},
            li         : {},
            a          : { href : true },
            h5         : {},
            u          : {}
        }
    };

    scribes.forEach(initScribe);

    document.addEventListener('textPartAdded', (event_ : Event) => {
        const scribe_ = event_.srcElement.querySelector('.scribe') as HTMLDivElement;
        initScribe(scribe_);
    });
});
