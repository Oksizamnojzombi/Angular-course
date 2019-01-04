import { env } from './../config/env';

export class CommentService {
    constructor() {
        this._token = localStorage.getItem("social_user_token");
    }

    /**
     * addComment - ����� �������� ������ ���������
     * @param {string} imageId - ������������� �����������
     * @param {Object} form - ����� ���������
     */
    addComment(id, commentText) {
        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/users/comment/${id}`, {
                method: 'POST',
                body: JSON.stringify({
                    comment_text: commentText
                }),
                headers: {
                    "Content-type": "application/json",
                    "x-access-token": this._token
                }
            })

                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });
    }

    /**
     * deleteComment - ����� �������� �����������
     * @param {string} comId - ������������� �����������
     * @param {string} pictureId - ������������� �����������
     */
    deleteComment(idImg, idComments) {
        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/users/comment/${idComments}`, {
                method: 'DELETE',
                body: JSON.stringify({
                    image_id: idImg // image id
                }),
                headers: {
                    "Content-type": "application/json",
                    "x-access-token": this._token
                }
            })
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });
    }

    /**
     * editComment- �������������� �����������
     * @param {*} comId - ������������� ����������
     * @param {*} form - ����� � ���������� ��� ������������
     */
    editComment(idComments, commentText) {
        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/users/comment/${idComments}`, {
                method: 'PUT',
                body: JSON.stringify({
                    comment_text: commentText
                }),
                headers: {
                    "Content-type": "application/json",
                    "x-access-token": this._token
                }
            })
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });
    }
}