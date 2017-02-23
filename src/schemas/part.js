"use strict";
(function (PartType) {
    PartType[PartType["Text"] = 0] = "Text";
    PartType[PartType["Image"] = 1] = "Image";
    PartType[PartType["Attachment"] = 2] = "Attachment";
})(exports.PartType || (exports.PartType = {}));
var PartType = exports.PartType;
(function (PartIcon) {
    PartIcon[PartIcon["Pdf"] = 0] = "Pdf";
    PartIcon[PartIcon["Archive"] = 1] = "Archive";
    PartIcon[PartIcon["Text"] = 2] = "Text";
    PartIcon[PartIcon["Word"] = 3] = "Word";
    PartIcon[PartIcon["Excel"] = 4] = "Excel";
    PartIcon[PartIcon["Powerpoint"] = 5] = "Powerpoint";
    PartIcon[PartIcon["Audio"] = 6] = "Audio";
    PartIcon[PartIcon["Video"] = 7] = "Video";
    PartIcon[PartIcon["Other"] = 8] = "Other";
})(exports.PartIcon || (exports.PartIcon = {}));
var PartIcon = exports.PartIcon;
//# sourceMappingURL=part.js.map