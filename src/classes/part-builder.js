"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const part = require('../schemas/part');
const icon_1 = require('../util/icon');
const unicode = require('../util/unicode');
const re_ = {
    archive: /rar|tar|zip|7z|compressed/i,
    audio: /^audio/,
    video: /^video/,
    excel: /xls|excel|spreadsheet/,
    powerpoint: /ppt|powerpoint|presentation/,
    word: /doc|word/,
    text: /^text|djvu/,
    pdf: /pdf/
};
const promptFile = () => __awaiter(this, void 0, void 0, function* () {
    return yield new Promise((resolve) => {
        const fileDesu_ = document.querySelector('#fileDesu');
        let timedOut_ = false;
        const to_ = setTimeout(() => {
            timedOut_ = true;
            resolve(null);
            clearTimeout(to_);
        }, 1000 * 3600);
        const handler_ = () => {
            fileDesu_.removeEventListener('change', handler_);
            if (fileDesu_.files.length) {
                if (!timedOut_) {
                    resolve(fileDesu_.files[0]);
                }
            }
            else {
                if (!timedOut_) {
                    resolve(null);
                }
            }
            fileDesu_.value = '';
            clearTimeout(to_);
        };
        fileDesu_.addEventListener('change', handler_);
        fileDesu_.click();
    });
});
class PartBuilder {
    constructor() {
        this.changed = false;
        this.zeroKara = false;
    }
    get size() {
        return this._size;
    }
    set size(size_) {
        this._size = size_;
        this.sizeText = this.tl.bytes(size_);
    }
    static detectIcon(type_) {
        if (re_.audio.test(type_)) {
            return part.PartIcon.Audio;
        }
        else if (re_.video.test(type_)) {
            return part.PartIcon.Video;
        }
        else if (re_.pdf.test(type_)) {
            return part.PartIcon.Pdf;
        }
        else if (re_.text.test(type_)) {
            return part.PartIcon.Text;
        }
        else if (re_.word.test(type_)) {
            return part.PartIcon.Word;
        }
        else if (re_.excel.test(type_)) {
            return part.PartIcon.Excel;
        }
        else if (re_.powerpoint.test(type_)) {
            return part.PartIcon.Powerpoint;
        }
        else if (re_.archive.test(type_)) {
            return part.PartIcon.Archive;
        }
        else {
            return part.PartIcon.Other;
        }
    }
    static detectType(type_) {
        switch (type_) {
            case 'image/png':
            case 'image/jpeg':
            case 'image/gif':
                return part.PartType.Image;
            default:
                return part.PartType.Attachment;
        }
    }
    registerHandlers() {
        if (this.type === part.PartType.Text) {
            const scribeContent_ = this.div.querySelector('.scribe__content');
            const scribeHandler_ = () => {
                const oldSize_ = this.size;
                const newSize_ = unicode.b64EncodeUnicode(scribeContent_.innerHTML).length;
                const difference_ = newSize_ - oldSize_;
                this.size += difference_;
                this.capsuleBuilder.size += difference_;
                this.changed = true;
                this.content = scribeContent_.innerHTML;
            };
            scribeContent_.addEventListener('input', scribeHandler_);
            scribeContent_.addEventListener('change', scribeHandler_);
            scribeContent_.addEventListener('keyup', scribeHandler_);
            scribeContent_.addEventListener('keydown', scribeHandler_);
            scribeContent_.addEventListener('click', scribeHandler_);
            scribeContent_.addEventListener('mousedown', scribeHandler_);
            scribeContent_.addEventListener('mouseup', scribeHandler_);
            scribeContent_.addEventListener('mousemove', scribeHandler_);
            scribeContent_.addEventListener('mouseout', scribeHandler_);
            scribeContent_.addEventListener('paste', scribeHandler_);
            scribeContent_.addEventListener('cut', scribeHandler_);
            const scribe_ = this.div.querySelector('.scribe');
            scribe_.addEventListener('focusin', () => {
                scribe_.classList.add('is-focused');
            });
            scribe_.addEventListener('focusout', () => {
                scribe_.classList.remove('is-focused');
            });
        }
        else {
            const capsuleBuilder_ = this.capsuleBuilder;
            const part_ = this.div;
            const rm_ = part_.querySelector('.capsule-part__rm');
            rm_.addEventListener('click', (event_) => {
                capsuleBuilder_.size -= this.size;
                part_.parentElement.removeChild(part_);
                capsuleBuilder_.parts.splice(capsuleBuilder_.parts.indexOf(this), 1);
                capsuleBuilder_.updateStats();
                event_.preventDefault();
            });
        }
    }
    static fromDiv(capsuleBuilder_, part_) {
        const partBuilder_ = new PartBuilder();
        partBuilder_.div = part_;
        partBuilder_.capsuleBuilder = capsuleBuilder_;
        partBuilder_.tl = capsuleBuilder_.tl;
        partBuilder_.id = part_.dataset['id'];
        partBuilder_.size = parseInt(part_.dataset['size']);
        partBuilder_.sizeText = partBuilder_.tl.bytes(partBuilder_.size);
        partBuilder_.type = parseInt(part_.dataset['type']);
        if (partBuilder_.type === part.PartType.Text) {
            partBuilder_.content = part_.querySelector('.scribe__content').innerHTML;
        }
        if (partBuilder_.type === part.PartType.Image || partBuilder_.type === part.PartType.Attachment) {
            partBuilder_.hash = part_.dataset['hash'];
            partBuilder_.icon = parseInt(part_.dataset['icon']);
        }
        if (partBuilder_.type === part.PartType.Attachment) {
            partBuilder_.name = part_.dataset['name'];
        }
        partBuilder_.changed = false;
        partBuilder_.registerHandlers();
        return partBuilder_;
    }
    static fromZero(capsuleBuilder_) {
        return __awaiter(this, void 0, void 0, function* () {
            const pb_ = new PartBuilder();
            pb_.capsuleBuilder = capsuleBuilder_;
            pb_.tl = capsuleBuilder_.tl;
            pb_.id = 'undefined';
            pb_.hash = 'undefined';
            pb_.file = yield promptFile();
            pb_.size = pb_.file.size;
            if ((pb_.capsuleBuilder.size + pb_.size) >= 30000000) {
                document.querySelector('.bad-input').showModal();
                return null;
            }
            pb_.zeroKara = true;
            pb_.type = PartBuilder.detectType(pb_.file.type);
            let div_;
            switch (pb_.type) {
                case part.PartType.Image:
                    div_ = document.querySelector('.part-templates__image .capsule-part').cloneNode(true);
                    div_.style.backgroundImage = `url(${URL.createObjectURL(pb_.file)})`;
                    pb_.div = div_;
                    break;
                case part.PartType.Attachment:
                    div_ = document.querySelector('.part-templates__attachment .capsule-part').cloneNode(true);
                    pb_.icon = PartBuilder.detectIcon(pb_.file.type);
                    const icon_ = div_.querySelector('.fa');
                    icon_.classList.remove('fa-file-archive-o');
                    icon_.classList.add(`fa-${icon_1.icon(pb_.icon)}`);
                    pb_.name = pb_.file.name;
                    const name_ = div_.querySelector('.capsule-part__attachment-name a');
                    name_.innerHTML = pb_.name;
                    name_.href = URL.createObjectURL(pb_.file);
                    const size_ = div_.querySelector('.capsule-part__attachment-size');
                    size_.innerHTML = pb_.sizeText;
                    pb_.div = div_;
                    break;
            }
            document.querySelector('.editor-grid').appendChild(pb_.div);
            pb_.registerHandlers();
            pb_.capsuleBuilder.parts.push(pb_);
            pb_.changed = true;
            return pb_;
        });
    }
    toJSON() {
        const simplified_ = {};
        simplified_.id = this.id;
        simplified_.type = this.type;
        simplified_.size = this.size;
        simplified_.changed = this.changed;
        switch (this.type) {
            case part.PartType.Attachment:
                simplified_.name = this.name;
                simplified_.icon = this.icon;
                simplified_.hash = this.hash;
                break;
            case part.PartType.Image:
                simplified_.hash = this.hash;
                break;
            case part.PartType.Text:
                simplified_.content = this.content;
        }
        if (this.file) {
            simplified_.file = {
                size: this.file.size,
                name: this.file.name,
                file: this.file
            };
        }
        return simplified_;
    }
}
exports.PartBuilder = PartBuilder;
//# sourceMappingURL=part-builder.js.map