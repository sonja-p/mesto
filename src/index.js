import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import { initialCards } from '../scripts/data.js';

const editButton = document.querySelector('.button_type_edit-profile');
const popupEditProfile = document.querySelector('.popup_type_edit');
const formEditProfile = popupEditProfile.querySelector('.popup__container');
const profileName = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const addButton = document.querySelector('.button_type_add-card');
const popupAddCard = document.querySelector('.popup_type_add');
const formAddCard = popupAddCard.querySelector('.popup__container');
const popupViewImage = document.querySelector('.popup_type_view');


const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', handleEscClose);
  popup.addEventListener('mousedown', handleOverlayClose);
}

const handleEscClose = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');
  const esc = 27;

  if (evt.keyCode === esc) {
    closePopup(popupOpened);
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
  window.removeEventListener('keydown', handleEscClose);
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

popupAddCard.querySelector('.button_type_close').addEventListener('click', () => {
  closePopup(popupAddCard);
})

popupViewImage.querySelector('.button_type_close').addEventListener('click', () => {
  closePopup(popupViewImage);
})

popupEditProfile.querySelector('.button_type_close').addEventListener('click', () => {
  closePopup(popupEditProfile);
})

const generateCardElement = (item) => {
  const card = new Card(item);
  return card.generateCard();
}

initialCards.forEach((item) => {
  const cardElement = generateCardElement(item);
  document.querySelector('.elements__list').append(cardElement);
})

const resetPopupAddCard = () => {
  const submitButton = popupAddCard.querySelector('.popup__save-button');
  formAddCard.reset();
  submitButton.disabled = true;
  submitButton.classList.add('popup__save-button_disabled');
}; 

function renderNewCard() {
  const data = {
    name: document.querySelector('input[name=image-name]').value,
    link: document.querySelector('input[name=image-link]').value,
  }
  
  const newCardElement = generateCardElement(data);

  document.querySelector('.elements__list').prepend(newCardElement);
}

formAddCard.addEventListener('submit', (event) => {  
  event.preventDefault();
  renderNewCard();
  closePopup(popupAddCard);
  resetPopupAddCard();
})

const config = {
  formSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}

const formEditProfileValidator = new FormValidator(config, '.popup_type_edit');
const formAddCardValidator = new FormValidator(config, '.popup_type_add');

formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

export { openPopup }