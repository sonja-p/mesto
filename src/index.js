import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
//import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../utils/data.js';
import { config } from '../utils/constants.js';

const editButton = document.querySelector('.button_type_edit-profile');
//const popupEditProfile = document.querySelector('.popup_type_edit');
//const formEditProfile = popupEditProfile.querySelector('.popup__container');
const profileName = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const addButton = document.querySelector('.button_type_add-card');
const popupAddCard = document.querySelector('.popup_type_add');
const formAddCard = popupAddCard.querySelector('.popup__container');
//const popupViewImage = document.querySelector('.popup_type_view');


/*formEditProfile.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = document.querySelector('input[name=profile-name]').value;
    description.textContent = document.querySelector('input[name=description]').value;
    closePopup(popupEditProfile);
})

*/

/*const generateCardElement = (item) => {
  const card = new Card(item);
  return card.generateCard();
}

  initialCards.forEach((item) => {
  const cardElement = generateCardElement(item);
  document.querySelector('.elements__list').append(cardElement);
})*/

/*const resetPopupAddCard = () => {
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
})*/

///////////////////////////////////////////////////////////////


const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, { handleCardClick: (evt) => {
        const popupViewImage = new PopupWithImage(evt.target, '.popup_type_view');
        popupViewImage.setEventListeners();
        popupViewImage.open();
      }
    }, '.card_template');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    },
  },
  '.elements__list'
);

cardList.renderItems();

const popupEditProfile = new PopupWithForm('.popup_type_edit', (event) => {
  event.preventDefault();
  profileName.textContent = document.querySelector('input[name=profile-name]').value;
  description.textContent = document.querySelector('input[name=description]').value;
  closePopup.bind();
});

const formEditProfileValidator = new FormValidator(config, '.popup_type_edit');
const formAddCardValidator = new FormValidator(config, '.popup_type_add');

formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();




///////////////////////////////////////////////////////////////
