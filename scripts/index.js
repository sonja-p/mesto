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

form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('submit')
})