import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = document.querySelector('.popup__image');
        this._popupImgCaption = document.querySelector('.popup__image-title')
    }

    open(link, name) {
        
        this._popupImage.src = link;
        this._popupImgCaption.textContent = name;
        this._popupImage.setAttribute('alt', `увеличенное изображение ${name}`);
        super.open();
    }
}

/*Создайте класс PopupWithImage, который наследует от Popup. 
Этот класс должен перезаписывать родительский метод open. 
В методе open класса PopupWithImage нужно вставлять в попап 
картинку и атрибут src изображения и подпись к картинке.*/