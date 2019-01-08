export class UserUI {
    constructor() {
        this._cover = document.querySelector(".user-cover");
        this._userAvatar = document.querySelector(".user-ava");
        this._userName = document.querySelector(".user-name");
    }

    clearContainer() {
        this._userAvatar.innerHTML = "";
    }

    /**
    * renderUserInfo - method accepting the response of the server, splits the information into components for further processing
    * @param  avatar - user photo
    * @param  cover - user defined background
    * @param  full_name - Username
    */
    renderUserInfo({avatar, cover, full_name}) {
        this.setUserCover(cover);
        this.setAvatar(avatar);
        this.setName(full_name);
    }

    /**
    * setUserCover - replace background for user page
    * @param url - url of the picture
    */
    setUserCover(url) {
        this._cover.style.background = `url("${url}") no-repeat center / cover`;
    }

    /**
    * setAvatar - set user profile photo
    * @param url - path to the picture
    */
    setAvatar(url) {
        const template = `<img src="${url}" alt="">`;
        this._userAvatar.insertAdjacentHTML("afterbegin", template);
    }

    /**
    * setName -  set username
    * @param name
    */
    setName(name) {
        this._userName.textContent = name;
    }
}
