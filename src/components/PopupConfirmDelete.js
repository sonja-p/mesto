import Popup from './Popup.js';

export default class PopupConfirmDelete extends Popup {
    constructor(popupSelector, api) {
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__save-button');
        //this._handleDeleteCard = handleDeleteCard;
        this._api = api;
    }

    _handleDeleteCard(id) {
        this._api.handleDeleteCard(id)
          .then(() => {
            const card = document.getElementById(id);
            card.remove();
          })
          .catch(err => {
            console.log('Ошибка при удалении карточки', err);
          });
      }

    open(id) {  
        super.open();
        this._button.addEventListener('click', () => this._handleDeleteCard(id));
    }

    close() {
        super.close();
        this._button.removeEventListener('click', () => this._handleDeleteCard);
    }

    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', () => this.close());
    }
}