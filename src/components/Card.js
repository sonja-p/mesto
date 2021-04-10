export default class Card {
  constructor(data, template, { handleCardClick }, { handleSubmitDelete }, { handleLikeCard }, { handleDeleteLike }, userId) {
    this._text = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._id = data._id;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleSubmitDelete = handleSubmitDelete;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteLike = handleDeleteLike;
    this._userId = userId;
  }
  
  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector('.element')
      .cloneNode(true);
  
    return cardElement;
  }
  
  _disableDeleteButton() {
    this._deleteButton.disabled = true;
    this._deleteButton.classList.add('button_type_delete-card_disable');
  }

  getId() {
    return this._id
  }

  setLikesInfo(data) {
    this._element.querySelector('.element__likes').textContent = (data.likes.length);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
  
    const elementImage = this._element.querySelector('.element__image');

    elementImage.src = this._image;
    elementImage.alt = this._text;
    this._element.id = this._id;
    this._element.querySelector('.element__title').textContent = this._text;
    this._element.querySelector('.element__likes').textContent = this._likes.length;
    this._deleteButton = this._element.querySelector('.button_type_delete-card');
    
    if (this._owner._id !== this._userId) {
      this._disableDeleteButton();
    }

    if (this._likes.some(like => like._id === this._userId)) {
      this._likeButton.classList.add('button_type_like_active');
      this.isLiked = true;
    };
        
    return this._element;
  }
  
  removeCard() {
    this._element.remove();
    this._element = null;
  } 
  
  _setEventListeners() {
    this._likeButton = this._element.querySelector('.button_type_like');
    this._likeButton.addEventListener('click', () => {
      if (!this.isLiked) {
        this._handleLikeCard(this);
        this._likeButton.classList.add('button_type_like_active')
      } else {
        this._handleDeleteLike(this);
        this._likeButton.classList.remove('button_type_like_active')
      }
    });
    
    this._element.querySelector('.element__image').addEventListener('click', () => this._handleCardClick(this._image, this._text));
    this._element.querySelector('.button_type_delete-card').addEventListener('click', () => this._handleSubmitDelete(this));
  }
}