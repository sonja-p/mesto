
// включение валидации вызовом enableValidation
// все настройки передаются при вызове

/*enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });*/
/*const submitButton = document.querySelector('button[type="submit"]');
const form = document.querySelector('#form');

submitButton.addEventListener('click', (evt) => {
    evt.preventDefault;
    const inputs = Array.from(form.elements).filter(input => input.tagName !== 'BUTTON');
    inputs.forEach(input => validate(input));
})

function validate(input) {
    if (input.checkValidity()) return;
    const errorTextElement = document.querySelector(`#${input.id}-error`);
    errorTextElement.textContent = 'Вы пропустили это поле';
}*/




const formElement = document.querySelector('.popup__container');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`.${formInput.id}-error`);
  
  // Слушатель события input
formInput.addEventListener('input', function (evt) {
  console.log(evt.target.validity.valid);
}); 

const showInputError = (element, errorMessage) => {
  element.classList.add('popup__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__input-error_active');
};

const hideInputError = (element) => {
  element.classList.remove('popup__input_type_error');
  formError.classList.remove('popup__input-error_active');
  formError.textContent = '';
};

const isValid = () => {
  if (!formInput.validity.valid) { 
    showInputError(formInput, formInput.validationMessage);
  } else {
    hideInputError(formInput);
  }
}

formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', isValid);

//код из тренажера

/*const showInputError = (formElement, inputElement, validationMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = validationMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_inactive');
  } else {
    buttonElement.classList.remove('button_inactive');
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement);
      checkInputValidity(formElement, inputElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
     evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};

enableValidation();
*/