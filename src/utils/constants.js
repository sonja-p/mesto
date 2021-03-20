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
const descriptionInput = document.querySelector('input[name=description]');

export { config, addButton, editButton, nameInput, descriptionInput }