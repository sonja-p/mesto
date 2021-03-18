import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ renderer }, popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__container');
        this._renderer = renderer;
    }

    _getInputValues() {
        //собирает данные всех полей формы
        let formData = new FormData([form]);
        return(formData);
    }

    setEventListeners() {
        super.setEventListeners();

        //добавить обработчик сабмита формы
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._renderer(this._getInputValues);
            this.close();
        })
    }

    close() {
        super.close();
        this._form.reset();
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