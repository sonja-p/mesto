let openButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let closeButton = popup.querySelector('.popup__close')

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
let name = document.querySelector('.profile__name')
let description = document.querySelector('.profile__description')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    name.textContent = inputs[0].value
    description.textContent = inputs[1].value
    togglePopup()
})