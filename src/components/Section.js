 export default class Section {
    constructor({ items, renderer }, containerSelector, api) {
        this._renderedItems = items;
        this._renderer = renderer; 
    
        this._container = document.querySelector(containerSelector);
        this._api = api;
    }

    renderItems() {
        this._renderedItems.forEach(item => this._renderer(item, this._api));
    }
    
    addItem(element) {
        this._container.append(element);
    }

    addNewItem(element) {
        this._container.prepend(element);
    }
}

/*Создайте класс Section, который отвечает за отрисовку элементов на странице. 
Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса
Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
Содержит публичный метод, который отвечает за отрисовку всех элементов. 
Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.*/
