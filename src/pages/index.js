import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirmDelete from '../components/PopupConfirmDelete.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { config, addButton, editButton, nameInput, professionInput, imageLinkInput, imageTitleInput, avatarLinkInput } from '../utils/constants.js';
import './index.css';

const options = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: 'cd759303-a31e-4c72-9731-100be2145ca7',
    'Content-Type': 'application/json'
  }
}

const api = new Api(options);

let userId = null;
 
const userInfo = new UserInfo({
  nameSelector: '.profile__name', 
  infoSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

const popupEditProfile = new PopupWithForm({
  renderer: () => {
    api.editUserInfo(nameInput.value, professionInput.value)
      .then(userData => {
        userInfo.setUserInfo(userData.name, userData.about);
      })
      .then(() => popupEditProfile.close())
      .catch(err => {
        console.log('Ошибка при загрузке информации пользователя', err.message);
      })
      .finally(() => {
        popupEditProfile.renderLoading(false);
      });
  }
},'.popup_type_edit'
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

function handleLikeCard(card) {
  api.addLike(card.getId())
    .then(data => {
      card.setLikesInfo(data);
      card.isLiked = true
    })
    .catch(err => {
      console.log('Ошибка при постановке лайка карточке', err.message);
    });
}

function handleDeleteLike(card) {  
  api.deleteLike(card.getId())
    .then(data => {
      card.setLikesInfo(data);
      card.isLiked = false
    })
    .catch(err => {
      console.log('Ошибка при удалении лайка карточки', err.message);
    });
}

const popupDeleteCard = new PopupConfirmDelete('.popup_type_delete');
popupDeleteCard.setEventListeners();

function createCard(item) {
  const card = new Card(item, '.card_template', { 
    handleCardClick: () => {
      popupWithImage.open(item.link, item.name);
    }
    }, { 
    handleSubmitDelete: (card) => {
      popupDeleteCard.setSubmitAction(() => {
        api.handleDeleteCard(card.getId())
        .then(() => {
          card.removeCard();
          popupDeleteCard.close();
        })
        .catch(err => {
          console.log('Ошибка при удалении карточки', err);
        })
        .finally(() => {
          popupDeleteCard.renderLoading(false)})         
        })

      popupDeleteCard.open(card)
    }
  }, { handleLikeCard }, { handleDeleteLike }, userId);
  return card.generateCard();
}

const formEditProfileValidator = new FormValidator(config, '.popup_type_edit');
const formAddCardValidator = new FormValidator(config, '.popup_type_add');
const formChangeAvatarValidator = new FormValidator(config, '.popup_type_change-avatar');

const popupEditAvatar = new PopupWithForm({
  renderer: () => {
    api.changeAvatar(avatarLinkInput.value)
      .then((profileData) => {
        document.querySelector('.profile__avatar').src = profileData.avatar;
        popupEditAvatar.close();
      })
      .catch(err => {
        console.log('Ошибка при обновлении аватара пользователя', err.message)
      })
      .finally(() => {
        popupEditAvatar.renderLoading(false);
      });
  }
}, '.popup_type_change-avatar')

popupEditAvatar.setEventListeners();
document.querySelector('.button_type_change-avatar').addEventListener('click', () => {
  popupEditAvatar.open();
})

formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
formChangeAvatarValidator.enableValidation();

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardsData, userData]) => {
    userId = userData._id;

    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData.avatar);

    const cardList = new Section({
      items: cardsData,
      renderer: (cardItem) => {
        const cardElement = createCard(cardItem);
        cardList.addItem(cardElement);
        }
      },
      '.elements__list'
    );

    const popupAddCard = new PopupWithForm({
      renderer: () => {
        const inputData = {
          name: imageTitleInput.value,
          link: imageLinkInput.value
        };
        api.addNewCard(inputData)
          .then((data) => createCard(data))
          .then((card) => {
            cardList.addNewItem(card);
            popupAddCard.close();
          })
          .catch(err => {
            console.log('Ошибка при загрузке карточки', err.message);
          })
          .finally(() => {
            popupAddCard.renderLoading(false);
          });
        }
      },'.popup_type_add'
    );
    popupAddCard.setEventListeners();

    addButton.addEventListener('click', () => {
      formAddCardValidator.disableSubmitButton();
      popupAddCard.open();
    });

    cardList.renderItems()  
  })
  .catch(err => console.log(`Ошибка загрузки данных: ${err}`))
