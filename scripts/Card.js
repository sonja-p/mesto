import { openPopup } from './index.js';

const popupViewImage = document.querySelector('.popup_type_view');
const popupImage = popupViewImage.querySelector('.popup__image');
const popupImageTitle = popupViewImage.querySelector('.popup__image-title');


export default class Card {
    constructor(data, cardSelector) {
        this._text = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
    }
  
    _getTemplate() {
        const cardElement = document
          .querySelector('.card_template')
          .content
          .cloneNode(true);
  
        return cardElement;
    }
  
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
  
        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__image').alt = this._text;
        this._element.querySelector('.element__title').textContent = this._text;
        
        return this._element;
    }
  
    _handleLikeIcon() {
      this._element.querySelector('.button_type_like').classList.toggle('button_type_like_active');
      console.log(this)
    };
  
    _handlePreviewPicture() {
      popupImage.src = this._image;
      popupImage.alt = `${this._text}`;
      popupImageTitle.textContent = this._text;
      openPopup(popupViewImage);
    };
  
    _handleDeleteCard() {
      this._element.remove();
    }
  
    _setEventListeners() {
      this._element.querySelector('.button_type_like').addEventListener('click', () => {
        this._handleLikeIcon()
      });
      
      this._element.querySelector('.element__image').addEventListener('click', () => {
        this._handlePreviewPicture()
      });
  
      this._element.querySelector('.button_type_delete-card').addEventListener('click', () => {
        this._handleDeleteCard()
      });
    }
  
}



/*Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
- принимает в конструктор её данные и селектор её template-элемента;
- содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
- содержит приватные методы для каждого обработчика;
- содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.

Для каждой карточки создайте экземпляр класса Card.*/