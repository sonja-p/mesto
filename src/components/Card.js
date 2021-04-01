export default class Card {
  constructor(data, template, { handleCardClick }, { handleSubmitDelete }, api) {
    this._text = data.name;
    this._image = data.link;
    this._likes = data.likes.length;
    this._owner = data.owner;
    this._id = data._id;
    this._handleCardClick = handleCardClick;
    this._handleSubmitDelete = handleSubmitDelete;
    this._template = template;
    this._api = api;
  }
  
  _getTemplate() {
    const cardElement = document
      .querySelector('.card_template')
      .content
      .cloneNode(true);
  
    return cardElement;
  }
  
  _disableDeleteButton() {
    this._button.disabled = true;
    this._button.classList.add('button_type_delete-card_disable');
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
  
    const elementImage = this._element.querySelector('.element__image');

    elementImage.src = this._image;
    elementImage.alt = this._text;
    this._element.querySelector('.element').id = this._id;
    this._element.querySelector('.element__title').textContent = this._text;
    this._element.querySelector('.element__likes').textContent = this._likes;
    this._button = this._element.querySelector('.button_type_delete-card');
    
    if (this._owner._id !== '22d3160f22696e6f4d344887') {
      this._disableDeleteButton();
    }
        
    return this._element;
  }
  
  _handleLikeIcon(evt) {
    evt.target.classList.toggle('button_type_like_active');
  };

  _setEventListeners() {
    this._element.querySelector('.button_type_like').addEventListener('click', (evt) => {
      this._handleLikeIcon(evt)
    });
    
    this._element.querySelector('.element__image').addEventListener('click', () => this._handleCardClick(this._image, this._text));
    this._element.querySelector('.button_type_delete-card').addEventListener('click', () => this._handleSubmitDelete(this._id, this._element));
  }
}