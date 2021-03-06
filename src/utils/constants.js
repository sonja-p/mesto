const config = {
  formSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}

const addButton = document.querySelector('.button_type_add-card');
const editButton = document.querySelector('.button_type_edit-profile');
const nameInput = document.querySelector('input[name=profile-name]');
const professionInput = document.querySelector('input[name=description]');
const imageLinkInput = document.querySelector('input[name=image-link]');
const imageTitleInput = document.querySelector('input[name=image-name]');
const avatarLinkInput = document.querySelector('input[name=avatar-link]');

export { config, addButton, editButton, nameInput, professionInput, imageLinkInput, imageTitleInput, avatarLinkInput }