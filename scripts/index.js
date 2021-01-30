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
const inputsProfile = popupEditProfile.querySelectorAll('input');
const profileName = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const addButton = document.querySelector('.button_type_add-card');
const popupAddCard = document.querySelector('.popup_type_add');
const inputs = popupAddCard.querySelectorAll('input');
const cardTemplate = document.querySelector('.card_template').content;
const list = document.querySelector('.elements__list');
const formAddCard = popupAddCard.querySelector('.popup__container');
const popupViewImage = document.querySelector('.popup_type_view');
const popupImage = popupViewImage.querySelector('.popup__image');
const popupImageTitle = popupViewImage.querySelector('.popup__image-title');

const togglePopup = (popup) => {
  popup.classList.toggle('popup_opened');
}

//попап для редактирования профиля
const togglePopupEditProfile = () => {
  togglePopup(popupEditProfile);
}

editButton.addEventListener('click', togglePopupEditProfile);

formEditProfile.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = inputsProfile[0].value;
    description.textContent = inputsProfile[1].value;
    togglePopupEditProfile();
})

//попап для добавления карточек.
const togglePopupAddCard = () => {
  togglePopup(popupAddCard);
}

addButton.addEventListener('click', togglePopupAddCard);

//показываем 6 карточек на странице
function render() {
  initialCards.forEach(renderCard);
}

function renderCard(element) {
  const card = createCard(element);

  list.appendChild(card);
}

function createCard(element) {
  const card = cardTemplate.cloneNode(true);
  const elementImage = card.querySelector('.element__image');

  elementImage.src = element.link;
  elementImage.alt = element.name;
  card.querySelector('.element__title').textContent = element.name;
  
  card.querySelector('.button_type_delete-card').addEventListener('click', deleteCard);
  
  card.querySelector('.button_type_like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('button_type_like_active');
  })

  //открытие просмотра фотографии.
  elementImage.addEventListener('click', () => {
    popupImage.src = element.link;
    popupImageTitle.textContent = element.name;
    togglePopupViewImage()
  });
  
  return card;
}


const togglePopupViewImage = () => {
  togglePopup(popupViewImage);
}


//закрытие попапа
document.addEventListener('click', closePopup);

function closePopup(event){
  const popup = event.target.closest('.popup');
  const closeButton = event.target.closest('.button_type_close');
  if (!closeButton) return;
  popup.classList.toggle('popup_opened');

  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      popup.classList.toggle('popup_opened');
    }
  })
}

function renderNewCard() {
  const nameInput = inputs[0].value;
  const linkInput = inputs[1].value;
  const newElement = {
    name: nameInput,
    link: linkInput,
  }
  
  const newCard = createCard(newElement);
  list.prepend(newCard);
}

//добавим карточку
formAddCard.addEventListener('submit', (event) => {  
  event.preventDefault();
  renderNewCard();
  togglePopupAddCard();
})

render();

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

