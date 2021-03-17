import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    conctructor(popupSelector, renderer) {
        this._popupSelector = document.querySelector(popupSelector);
        this._renderer = renderer;
    }

    _getInputValues() {
        //собирает данные всех полей формы
        profileName.textContent = document.querySelector('input[name=profile-name]').value;
        description.textContent = document.querySelector('input[name=description]').value;
    }

    setEventListeners() {
        super.setEventListeners();

        //добавить обработчик сабмита формы
        formEditProfile.addEventListener('submit', (event) => {
            event.preventDefault();
            _getInputValues();
            closePopup();
        })
    }

    close() {
        super.close();

        //при закрытии попапа форма должна ещё и сбрасываться
        this.reset();
    }
}

/*Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
Содержит приватный метод _getInputValues, который собирает данные всех полей формы.

Перезаписывает родительский метод setEventListeners. 
Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, 
но и добавлять обработчик сабмита формы.

Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
Для каждого попапа создавайте свой экземпляр класса PopupWithForm.*/