import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(data, popupSelector) {
        super(popupSelector);
        this._image = data.src;
        this._text = data.textContent;
    }

    open() {
        const popupImage = document.querySelector('.popup__image');
        popupImage.src = this._image;
        popupImage.alt = this._text;
        document.querySelector('.popup__image-title').textContent = this._text;

        super.open();
    }
}

/*Создайте класс PopupWithImage, который наследует от Popup. 
Этот класс должен перезаписывать родительский метод open. 
В методе open класса PopupWithImage нужно вставлять в попап 
картинку и атрибут src изображения и подпись к картинке.*/