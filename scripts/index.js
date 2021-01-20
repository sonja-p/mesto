let openButton = document.querySelector('.button_type_edit-profile')
let popup = document.querySelector('.popup')
let closeButton = popup.querySelector('.button_type_close')

let togglePopup = () => {
    popup.classList.toggle('popup_opened')
}

openButton.addEventListener('click', togglePopup)
closeButton.addEventListener('click', togglePopup)

popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        togglePopup()
    }
})

let form = popup.querySelector('.popup__container')
let inputs = popup.querySelectorAll('input')
let profileName = document.querySelector('.profile__name')
let description = document.querySelector('.profile__description')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    profileName.textContent = inputs[0].value
    description.textContent = inputs[1].value
    togglePopup()
})

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

const itemTemplate = document.querySelector(".item_template").content;
const list = document.querySelector(".elements__list");


function render() {
  initialCards.forEach(renderItem);
}

function renderItem(element) {
  const card = itemTemplate.cloneNode(true);

  card.querySelector('.element__image').src = element.link;
  card.querySelector('.element__title').textContent = element.name;
  
  list.appendChild(card);
}

/*function handleSubmit(evt) {
  renderItem(formInput.value)
}

formButton.addEventListener('click', handleSubmit);*/

render();