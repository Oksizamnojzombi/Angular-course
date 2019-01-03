/**
 * UserUI - ����� ����������� ���������� ������������
 * 
 */
export class UserUI {
    /**
     * ����������� ������������ �������� ���������� ��� ������ ���������� ������������
     */
    constructor() {
        this._cover = document.querySelector(".user-cover");
        this._userAvatar = document.querySelector(".user-ava");
        this._userName = document.querySelector(".user-name");
    }

    /**
    * renderUserInfo - ����� ����������� ����� �������, ��������� �� ��������������������
    * ��� ���������� ���������
    * @param {string} avatar - ������������� �����������
    * @param {file} cover - ���
    * @param {string} full_name - ��� ������������
    */
    renderUserInfo({avatar, cover, full_name}) {
        this.setUserCover(cover);
        this.setAvatar(avatar);
        this.setName(full_name);
    }

    /**
    * setUserCover - ����� ������ ����
    * @param {*} url - ���� � ����������� (������?)
    */
    setUserCover(url) {
        this._cover.style.background = `url("${url}") no-repeat center / cover`;
    }

    /**
    * setAvatar - ����� ������� �������� ������, ������� ����� ��� �����������
    * @param {*} url - ���� � �����������
    */
    setAvatar(url) {
        const template = `<img src="${url}" alt="">`;
        this._userAvatar.insertAdjacentHTML("afterbegin", template);
    }

    /**
    * setName -  ������� ����� ������������ �� ��������
    * @param {String} name - ��� ������������
    */
    setName(name) {
        this._userName.textContent = name;
    }
}