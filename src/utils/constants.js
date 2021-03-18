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

export { config, addButton, editButton }