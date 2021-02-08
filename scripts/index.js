const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1547996668-eb0c9bec5c4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1276&q=80'
  },
  {
    name: 'Калининград',
    link: 'https://images.unsplash.com/photo-1595948917906-d68ac6ef4d16?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1604762093467-ac22c30cc60e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80'
  },
  {
    name: 'Алтай',
    link: 'https://images.unsplash.com/photo-1582086670462-bd0b47819245?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1190&q=80'
  },
  {
    name: 'Владивосток',
    link: 'https://images.unsplash.com/photo-1592150587525-90486c792197?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1789&q=80'
  }
];


const editButton = document.querySelector('.button_type_edit-profile');
const popupEditProfile = document.querySelector('.popup_type_edit');
const formEditProfile = popupEditProfile.querySelector('.popup__container');
const profileName = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const addButton = document.querySelector('.button_type_add-card');
const popupAddCard = document.querySelector('.popup_type_add');
const cardTemplate = document.querySelector('.card_template').content;
const list = document.querySelector('.elements__list');
const formAddCard = popupAddCard.querySelector('.popup__container');
const popupViewImage = document.querySelector('.popup_type_view');
const popupImage = popupViewImage.querySelector('.popup__image');
const popupImageTitle = popupViewImage.querySelector('.popup__image-title');



const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', handleEscClose);
  popup.addEventListener('mousedown', handleOverlayClose);
}

const handleEscClose = (evt) => {
//найти открытое модальное окно и передать его параметром в функцию закрытия попапа
  if (evt.keyCode === 27) {
    closePopup(popup);
  }
}

const handleOverlayClose = (evt) => {
  const popupOpened = evt.target.closest('.popup');
  if (evt.target === evt.currentTarget) { 
    closePopup(popupOpened);
  }
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('keydown', handleEscClose);
  popup.removeEventListener('mousedown', handleOverlayClose);
}

editButton.addEventListener('click', () => openPopup(popupEditProfile));
addButton.addEventListener('click', () => openPopup(popupAddCard));

formEditProfile.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = document.querySelector('input[name=profile-name]').value;
    description.textContent = document.querySelector('input[name=description]').value;
    closePopup(popupEditProfile);
})

//закрытие попапов
popupAddCard.querySelector('.button_type_close').addEventListener('click', () => {
  closePopup(popupAddCard);
})

popupViewImage.querySelector('.button_type_close').addEventListener('click', () => {
  closePopup(popupViewImage);
})

popupEditProfile.querySelector('.button_type_close').addEventListener('click', () => {
  closePopup(popupEditProfile);
})

//показываем 6 карточек на странице
function render() {
  initialCards.forEach(renderCard);
}

function renderCard(element) {
  const card = getCardElement(element);
  list.appendChild(card);
}


const getCardElement = (element) => {
  const card = cardTemplate.cloneNode(true);
  const elementImage = card.querySelector('.element__image');
  elementImage.src = element.link;
  elementImage.alt = element.name;
  card.querySelector('.element__title').textContent = element.name;
  
  card.querySelector('.button_type_delete-card').addEventListener('click', deleteCard);
  card.querySelector('.button_type_like').addEventListener('click', handleLikeIcon);
  elementImage.addEventListener('click', () => handlePreviewPicture(element)); 

  return card;
}

const handleLikeIcon = (evt) => {
  evt.target.classList.toggle('button_type_like_active');
};
  
const handlePreviewPicture = (element) => {
  popupImage.src = element.link;
  popupImage.alt = `${element.name}`;
  popupImageTitle.textContent = element.name;
  openPopup(popupViewImage);
};

//добавим карточку
function renderNewCard() {
  const nameInput = document.querySelector('input[name=image-name]').value;
  const linkInput = document.querySelector('input[name=image-link]').value;
  const newElement = {
    name: nameInput,
    link: linkInput,
  }
  
  const newCard = getCardElement(newElement);
  list.prepend(newCard);
}

formAddCard.addEventListener('submit', (event) => {  
  event.preventDefault();
  renderNewCard();
  closePopup(popupAddCard);
  formAddCard.reset();
})

render();

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}