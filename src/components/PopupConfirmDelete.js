import Popup from './Popup.js';

export default class PopupConfirmDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._submitButton = this._popup.querySelector('.popup__save-button');
        this._buttonDefaultText = this._submitButton.textContent;
    }


    setSubmitAction(action) {
        this._handleDeleteCard = action;
        this._deleteCard = this._handleDeleteCard.bind(this)
    }

    open() {
        super.open();
        this._submitButton.addEventListener('click', this._deleteCard);
    }

    close() {
        super.close();
        this._submitButton.removeEventListener('click', this._deleteCard);
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.renderLoading(true);
        })
    }

    renderLoading(isLoading) {
        this._submitButton.textContent = isLoading ? 'Удаление...' : this._buttonDefaultText;
    }
}