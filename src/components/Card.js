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
  
  _handleLikeCard() {
    this._api.addLike(this._id)
      .then((res) => {
        this._isLiked = true;
        document.getElementById(this._id).querySelector('.element__likes').textContent = (res.likes.length)
      })
      .then(() => {
        document.getElementById(this._id).querySelector('.button_type_like').classList.add('button_type_like_active');
      })
      .catch(err => {
        console.log('Ошибка при постановке лайка карточке', err.message);
      });
  }

  _handleDeleteLike() {  
    this._api.deleteLike(this._id)
      .then((res) => {
        document.getElementById(this._id).querySelector('.element__likes').textContent = (res.likes.length);
        this._isLiked = false;
      })
      .then(() => {
        document.getElementById(this._id).querySelector('.button_type_like').classList.remove('button_type_like_active');
        })
      .catch(err => {
        console.log('Ошибка при постановке лайка карточке', err.message);
      });
  }

  _setEventListeners() {
    this._element.querySelector('.button_type_like').addEventListener('click', () => {
     if (!this._isLiked) {
        this._handleLikeCard();
      } else {
        this._handleDeleteLike();
      }
    });
    
    this._element.querySelector('.element__image').addEventListener('click', () => this._handleCardClick(this._image, this._text));
    this._element.querySelector('.button_type_delete-card').addEventListener('click', () => this._handleSubmitDelete(this._id, this._element));
  }
}