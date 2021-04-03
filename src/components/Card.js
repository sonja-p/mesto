export default class Card {
  constructor(data, template, { handleCardClick }, { handleSubmitDelete }, { handleLikeCard }, { handleDeleteLike }, userId) {
    this._text = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._id = data._id;
    this._handleCardClick = handleCardClick;
    this._handleSubmitDelete = handleSubmitDelete;
    this._template = template;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteLike = handleDeleteLike;
    this._userId = userId;
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

  getId() {
    return this._id
  }

  setLikesInfo(data) {
    document.getElementById(this._id).querySelector('.element__likes').textContent = (data.likes.length);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
  
    const elementImage = this._element.querySelector('.element__image');

    elementImage.src = this._image;
    elementImage.alt = this._text;
    this._element.querySelector('.element').id = this._id;
    this._element.querySelector('.element__title').textContent = this._text;
    this._element.querySelector('.element__likes').textContent = this._likes.length;
    this._button = this._element.querySelector('.button_type_delete-card');
    
    if (this._owner._id !== this._userId) {
      this._disableDeleteButton();
    }

    if (this._likes.some(like => like._id === this._userId)) {
      this._element.querySelector('.button_type_like').classList.add('button_type_like_active');
    };
        
    return this._element;
  }
  
  _setEventListeners() {
    this._element.querySelector('.button_type_like').addEventListener('click', () => {
      if (!this.isLiked) {
        this._handleLikeCard(this);
        document.getElementById(this._id).querySelector('.button_type_like').classList.add('button_type_like_active')
      } else {
        this._handleDeleteLike(this);
        document.getElementById(this._id).querySelector('.button_type_like').classList.remove('button_type_like_active')
      }
    });
    
    this._element.querySelector('.element__image').addEventListener('click', () => this._handleCardClick(this._image, this._text));
    this._element.querySelector('.button_type_delete-card').addEventListener('click', () => this._handleSubmitDelete(this._id, this._element));
  }
}