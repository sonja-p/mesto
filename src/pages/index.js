import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirmDelete from '../components/PopupConfirmDelete.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { config, addButton, editButton, nameInput, professionInput, imageLinkInput, imageTitleInput } from '../utils/constants.js';
import './index.css';

const options = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: 'cd759303-a31e-4c72-9731-100be2145ca7',
    'Content-Type': 'application/json'
  }
}

const api = new Api(options);
 
const userInfo = new UserInfo({
  nameSelector: '.profile__name', 
  infoSelector: '.profile__description',
  avatarSelector: '.profile__avatar',
}, api);

api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo(data.name, data.about);
  })
  .catch(err => {
    console.log('Ошибка при загрузке информации пользователя', err.message);
  });

const popupEditProfile = new PopupWithForm({
  renderer: () => {
    api.editUserInfo(nameInput.value, professionInput.value)
      .then(data => {
        userInfo.setUserInfo(data.name, data.about);
      })
      .catch(err => {
        console.log('Ошибка при загрузке информации пользователя', err.message);
      });
  }
},'.popup_type_edit', api
);

popupEditProfile.setEventListeners();

editButton.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  professionInput.value = profileInfo.profession;
  popupEditProfile.open();
});

const popupWithImage = new PopupWithImage('.popup_type_view');
popupWithImage.setEventListeners();

const popupDeleteCard = new PopupConfirmDelete('.popup_type_delete');
popupDeleteCard.setEventListeners();

function createCard(item) {
  const card = new Card(item, '.card_template', { 
    handleCardClick: () => {
      popupWithImage.open(item.link, item.name);
    }
  }, { 
    handleCardDelete: (event) => {
      popupDeleteCard.open(event)
    }, api
  });


  return card.generateCard();
}

api.getInitialCards()  
  .then((data) => {
    const cardList = new Section({
      items: data,
      renderer: (cardItem) => {
        const cardElement = createCard(cardItem);
        cardList.addItem(cardElement);
        },
      },
      '.elements__list', api
    );
    cardList.renderItems()
  })
  .catch(err => {
    console.log('Ошибка при загрузке карточек', err.message);
  });

const popupAddCard = new PopupWithForm({
  renderer: () => {
    const inputData = {
      name: imageTitleInput.value,
      link: imageLinkInput.value
    };
    api.addNewCard(inputData)
      .catch(err => {
        console.log('Ошибка при загрузке карточки', err.message);
      });
    }
  },'.popup_type_add', api
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
