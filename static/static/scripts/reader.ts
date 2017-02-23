async function readFile (file_ : File) : Promise<string> {
    return await new Promise<string>((resolve) => {
        const reader_ = new FileReader();
        reader_.addEventListener('load', (event_ : any) => {
            resolve(event_.target.result);
        });
        reader_.readAsDataURL(file_);
    });
}

self.addEventListener('message', async (event_) => {
    const file_ = await readFile(event_.data as File);
    const index_ = file_.indexOf(',');
    self.postMessage(file_.substr(index_ + 1), undefined);
});
