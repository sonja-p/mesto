export default class UserInfo {
    constructor({ nameSelector, infoSelector }) {
        this._name = document.querySelector(nameSelector).value;
        this._description = document.querySelector(infoSelector).value;
    }

    getUserInfo() {
        return { name: this._name,
            description: this._description
        }
    }

    setUserInfo() {
        document.querySelector('.profile__name').textContent = this._name;
        document.querySelector('.profile__description').textContent = this._description;
    }
}

/*Класс UserInfo отвечает за управление отображением информации о пользователе на странице. 
Этот класс:
Принимает в конструктор объект с селекторами двух элементов: 
элемента имени пользователя и элемента информации о себе.

Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.

Содержит публичный метод setUserInfo, который принимает новые данные пользователя и 
добавляет их на страницу.*/