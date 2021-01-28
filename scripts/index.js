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


let editButton = document.querySelector('.button_type_edit-profile');
let popupEditProfile = document.querySelector('.popup_type_edit');
let formEditProfile = popupEditProfile.querySelector('.popup__container');
let inputsProfile = popupEditProfile.querySelectorAll('input');
let profileName = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let addButton = document.querySelector('.button_type_add-card');
let popupAddCard = document.querySelector('.popup_type_add');
let inputs = popupAddCard.querySelectorAll('input');
let cardTemplate = document.querySelector('.card_template').content;
let list = document.querySelector('.elements__list');
let formAddCard = popupAddCard.querySelector('.popup__container');



//попап для редактирования профиля
let togglePopupEditProfile = () => {
    popupEditProfile.classList.toggle('popup_opened');
}

editButton.addEventListener('click', togglePopupEditProfile);

formEditProfile.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = inputsProfile[0].value;
    description.textContent = inputsProfile[1].value;
    togglePopupEditProfile();
})

//попап для добавления карточек.
let togglePopupAddCard = () => {
  popupAddCard.classList.toggle('popup_opened');
}

addButton.addEventListener('click', togglePopupAddCard);

//показываем 6 карточек на странице
function render() {
  initialCards.forEach(renderCard);
}

function renderCard(element) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.element__image').src = element.link;
  card.querySelector('.element__image').alt = element.name;
  card.querySelector('.element__title').innerText = element.name;
  card.querySelector('.button_type_delete-card').addEventListener('click', deleteCard);

  card.querySelector('.button_type_like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('button_type_like_active');
  })

//открытие просмотра фотографии
  let viewOn = () => {
    popupViewImage.querySelector('.popup__image').src = element.link;
    popupViewImage.querySelector('.popup__image-title').innerText = element.name;
    togglePopupViewImage()
  }

  card.querySelector('.element__image').addEventListener('click', viewOn);
  list.appendChild(card);
}

const popupViewImage = document.querySelector('.popup_type_view');

let togglePopupViewImage = () => {
  popupViewImage.classList.toggle('popup_opened');    
}


//закрытие попапа
document.addEventListener('click', closePopup);

function closePopup(event){
  let popup = event.target.closest('.popup');
  let closeButton = event.target.closest('.button_type_close');
  if (!closeButton) return;
  popup.classList.toggle('popup_opened');

  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      popup.classList.toggle('popup_opened');
    }
  })
}

//добавим карточку
formAddCard.addEventListener('submit', (event) => {  
  event.preventDefault();
  renderNewCard();
  togglePopupAddCard();
})

function renderNewCard() {
  const newElement = cardTemplate.cloneNode(true);
  newElement.querySelector('.element__image').src = inputs[1].value;
  newElement.querySelector('.element__image').alt = inputs[0].value;
  newElement.querySelector('.element__title').innerText = inputs[0].value;
  newElement.querySelector('.button_type_delete-card').addEventListener('click', deleteCard);

  newElement.querySelector('.button_type_like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('button_type_like_active');
  })
  
  list.prepend(newElement);
}

render();

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

