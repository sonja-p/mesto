import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../utils/data.js';
import { config, addButton, editButton } from '../utils/constants.js';
import './index.css';

const popupWithImage = new PopupWithImage('.popup_type_view');
popupWithImage.setEventListeners();

function createCard(item) {
  const card = new Card(item, '.card_template', { 
    handleCardClick: () => {
      popupWithImage.open(item.link, item.name);
    }
  });
  return card.generateCard();
} 

const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const cardElement = createCard(cardItem);
    cardList.addItem(cardElement);
    },
  },
  '.elements__list'
);

cardList.renderItems();

const userInfo = new UserInfo({
  nameSelector: '.profile__name', 
  infoSelector: '.profile__description'
});

const popupEditProfile = new PopupWithForm({
  renderer: () => {
    userInfo.setUserInfo('input[name=profile-name]', 'input[name=description]');
  }
},'.popup_type_edit'
);

popupEditProfile.setEventListeners();
editButton.addEventListener('click', () => {

  const profileInfo = userInfo.getUserInfo();
  document.querySelector('input[name=profile-name]').value = profileInfo.name;
  document.querySelector('input[name=description]').value = profileInfo.profession;
  
  popupEditProfile.open();
});

const popupAddCard = new PopupWithForm({ 
  renderer: () => {
    const data = {
      link: document.querySelector('input[name=image-link]').value,
      name: document.querySelector('input[name=image-name]').value
    }
    const newCard = createCard(data);
    cardList.addNewItem(newCard);
    }
  },'.popup_type_add'
);

popupAddCard.setEventListeners();

const formEditProfileValidator = new FormValidator(config, '.popup_type_edit');
const formAddCardValidator = new FormValidator(config, '.popup_type_add');

formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

addButton.addEventListener('click', () => {
  formAddCardValidator.disableSubmitButton();
  popupAddCard.open();
});
