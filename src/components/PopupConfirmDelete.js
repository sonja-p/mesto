import Popup from './Popup.js';

export default class PopupConfirmDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__save-button');
    }

    open(event) {  
        super.open();

        this._button.addEventListener('click', () => {
            event.target.closest('.element').remove();
            this.close();
        })
    }
}