var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
function readFile(file_) {
    return __awaiter(this, void 0, Promise, function* () {
        return yield new Promise((resolve) => {
            const reader_ = new FileReader();
            reader_.addEventListener('load', (event_) => {
                resolve(event_.target.result);
            });
            reader_.readAsDataURL(file_);
        });
    });
}
self.addEventListener('message', (event_) => __awaiter(this, void 0, void 0, function* () {
    const file_ = yield readFile(event_.data);
    const index_ = file_.indexOf(',');
    self.postMessage(file_.substr(index_ + 1), undefined);
}));
