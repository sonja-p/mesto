import { openPopup } from './index.js';

const popupViewImage = document.querySelector('.popup_type_view');
const popupImage = popupViewImage.querySelector('.popup__image');
const popupImageTitle = popupViewImage.querySelector('.popup__image-title');


export default class Card {
  constructor(data, template) {
    this._text = data.name;
    this._image = data.link;
    this._template = template;
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
  
    const elementImage = this._element.querySelector('.element__image');

    elementImage.src = this._image;
    elementImage.alt = this._text;
    this._element.querySelector('.element__title').textContent = this._text;
        
    return this._element;
  }
  
  _handleLikeIcon(evt) {
    evt.target.classList.toggle('button_type_like_active');
  };
  
  _handlePreviewPicture() {
    popupImage.src = this._image;
    popupImage.alt = `${this._text}`;
    popupImageTitle.textContent = this._text;
    openPopup(popupViewImage);
  };
  
  _handleDeleteCard() {
    evt.target.closest('.element').remove();
  }
  
  _setEventListeners() {
    this._element.querySelector('.button_type_like').addEventListener('click', (evt) => {
      this._handleLikeIcon(evt)
    });
      
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handlePreviewPicture()
    });
  
    this._element.querySelector('.button_type_delete-card').addEventListener('click', (evt) => {
      this._handleDeleteCard(evt)
    });
  }
}