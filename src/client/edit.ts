import { CapsuleBuilder } from '../classes/capsule-builder';


document.addEventListener('DOMContentLoaded', () => {
    const capsule_ : HTMLDivElement = document.querySelector('.capsule-card_editor') as HTMLDivElement;

    new CapsuleBuilder(capsule_);
});
