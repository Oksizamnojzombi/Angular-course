/**
 * UserUI - класс отображени€ информации пользовател€
 * 
 */
export class UserUI {
    /**
     * конструктор определ€ющий елементы интерфкйса дл€ вывода информации пользовател€
     */
    constructor() {
        this._cover = document.querySelector(".user-cover");
        this._userAvatar = document.querySelector(".user-ava");
        this._userName = document.querySelector(".user-name");
    }

    /**
    * renderUserInfo - метод принимающий ответ сервера, раздел€ет на компонентыинформацию
    * дл€ дальнейшей обработки
    * @param {string} avatar - зашифрованное изображение
    * @param {file} cover - фон
    * @param {string} full_name - им€ пользовател€
    */
    renderUserInfo({avatar, cover, full_name}) {
        this.setUserCover(cover);
        this.setAvatar(avatar);
        this.setName(full_name);
    }

    /**
    * setUserCover - метод замены фона
    * @param {*} url - путь к изображению (откуда?)
    */
    setUserCover(url) {
        this._cover.style.background = `url("${url}") no-repeat center / cover`;
    }

    /**
    * setAvatar - метод который измен€ет аватар, создает место дл€ отображени€
    * @param {*} url - путь к изображению
    */
    setAvatar(url) {
        const template = `<img src="${url}" alt="">`;
        this._userAvatar.insertAdjacentHTML("afterbegin", template);
    }

    /**
    * setName -  вставка имени пользовател€ на страницу
    * @param {String} name - им€ пользовател€
    */
    setName(name) {
        this._userName.textContent = name;
    }
}