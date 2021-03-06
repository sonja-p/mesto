export default class UserInfo {
    constructor({ nameSelector, infoSelector, avatarSelector }) {        
        this._profileName = document.querySelector(nameSelector);
        this._profileProfession = document.querySelector(infoSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return { name: this._profileName.textContent,
            profession: this._profileProfession.textContent
        }
    }

    setAvatar(avatarLink) {
        this._avatar.src = avatarLink;
    }

    setUserInfo(name, profession) {
        this._profileName.textContent = name;
        this._profileProfession.textContent = profession;
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