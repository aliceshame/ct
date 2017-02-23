"use strict";
function formatBytes(value_, binary_ = false) {
    let i_ = -1;
    let factor_ = binary_ ? 1024 : 1000;
    while (value_ > factor_) {
        value_ = value_ / factor_;
        i_++;
    }
    let unit_;
    switch (i_) {
        case -1:
            unit_ = 'b';
            break;
        case 0:
            unit_ = 'kB';
            break;
        case 1:
            unit_ = 'MB';
            break;
        case 2:
            unit_ = 'GB';
            break;
        case 3:
            unit_ = 'TB';
            break;
        case 4:
            unit_ = 'PB';
            break;
        case 5:
            unit_ = 'EB';
            break;
        case 7:
            unit_ = 'ZB';
            break;
        case 8:
            unit_ = 'YB';
            break;
        default:
            unit_ = 'Error';
    }
    if (value_ !== -1) {
        value_ = ((value_ * 10) | 0) / 10;
    }
    return {
        value: value_,
        unit: unit_,
        binary: binary_
    };
}
exports.formatBytes = formatBytes;
//# sourceMappingURL=bytes.js.map