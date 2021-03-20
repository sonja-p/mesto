export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    _handleEscClose(evt) {
        const esc = 27;
        if (evt.keyCode === esc) {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target === evt.currentTarget) { 
            this.close();
        }
    }
    
    open() {  
        this._popup.classList.add('popup_opened');
        window.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        window.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popup.querySelector('.button_type_close').addEventListener('click', () => {
            this.close();
        });
        this._popup.addEventListener('mousedown', this._handleOverlayClose.bind(this));
    }
}

/*Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
Принимает в конструктор единственный параметр — селектор попапа.
Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.*/