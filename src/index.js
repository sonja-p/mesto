import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../utils/data.js';
import { config, addButton, editButton } from '../utils/constants.js';


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

const popupEditProfile = new PopupWithForm({
  renderer: () => {
    const userInfo = new UserInfo({ 
      nameSelector: 'input[name=profile-name]', 
      infoSelector: 'input[name=description]' 
    });
    userInfo.setUserInfo();
  }
},'.popup_type_edit'
);

popupEditProfile.setEventListeners();
editButton.addEventListener('click', () => {
  popupEditProfile.open();
});

const popupAddCard = new PopupWithForm({ 
  renderer: () => {
    const data = {
      link: document.querySelector('input[name=image-link]').value,
      name: document.querySelector('input[name=image-name]').value
    }
    const newCard = new Card(data, { 
      handleCardClick: (evt) => {
        const popupViewImage = new PopupWithImage(evt.target, '.popup_type_view');
        popupViewImage.setEventListeners();
        popupViewImage.open();
      }
    }, '.card_template');
    const newCardElement = newCard.generateCard();
    document.querySelector('.elements__list').prepend(newCardElement);
    }
  },'.popup_type_add'
);

popupAddCard.setEventListeners();

addButton.addEventListener('click', () => {
  popupAddCard.open();
});

const formEditProfileValidator = new FormValidator(config, '.popup_type_edit');
const formAddCardValidator = new FormValidator(config, '.popup_type_add');

formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
