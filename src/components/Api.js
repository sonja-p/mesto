export default class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }   

    _parseResponse(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(res => this._parseResponse(res))
        .then((result) => {
        return(result);
        })
        .catch(err => {
            console.log('Ошибка при загрузке информации пользователя', err.message);
        }); 
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then(res => this._parseResponse(res))
        .then((result) => {
        console.log(result)
        return(result);
        })
        .catch(err => {
            console.log('Ошибка при загрузке карточек', err.message);
        });
    }


    editUserInfo(newName, newAbout) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            //в теле — JSON с двумя свойствами — name и about. Значениями этих свойств должны быть обновлённые данные пользователя
            body: JSON.stringify({
                name: newName,
                about: newAbout
            })
        })
        .then(res => this._parseResponse(res))
        .then((result) => {
        return(result);
        })
        .catch(err => {
            console.log('Ошибка при загрузке информации пользователя', err.message);
        });
    }

    addNewCard(inputData) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: inputData.name,
                link: inputData.link
            })
        })
        .then(res => this._parseResponse(res))
        .then((result) => {
            return(result);
        })
        .catch(err => {
            console.log('Ошибка при загрузке карточки', err.message);
        });
    }

    getCardLikes() {
        return fetch(`${this._url}/cards`, {
            //method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                likes: []
            })
        })
        .then(res => this._parseResponse(res))
        .then((result) => {
            console.log(result);
        })
        .catch(err => {
            console.log('Ошибка при загрузке карточки', err.message);
        });
    }

    /*handleDeleteCard() {

    }*/

    handleLikeCard() {
        //Вместо cardId в URL нужно подставить свойство _id соответствующей карточки.
        return fetch(`${this._url}/cards/likes/${this.cardId}`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(res => this._parseResponse(res))
        .then((result) => {
            console.log(result);
        })
        .catch(err => {
            console.log('Ошибка при загрузке карточки', err.message);
        });
    }

    addNewAvatar() {
        return fetch(`${this._url}/users/me/avatarreturn`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: ''
            })
        })
        .then(res => this._parseResponse(res))
        .then((result) => {
            console.log(result);
        })
        .catch(err => {
            console.log('Ошибка при загрузке карточки', err.message);
        });
    }
}


/*Создан класс Api, внутри которого описаны запросы к серверу. 
Запросы к серверу не должны быть описаны внутри других классов или index.js.
Каждый метод, включающий обращение к серверу содержит return fetch, т.е возвращает объект Promise
Все операции над DOM включены внутрь цепочки промисов.
Ответ от сервера всегда проверяется на корректность:

.then(res => {
  if (res.ok) {
    return res.json();
  }

// если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
});
                
Каждый промис содержит обработку ошибок после обращения к серверу.
Внутри класса Api не создаются экземпляры других классов, не вызываются методы других классов. 
Используется слабое связывание между классами. */