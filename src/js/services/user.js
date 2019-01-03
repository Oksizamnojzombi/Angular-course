import { env } from './../config/env';
import { ImageService } from './../services/image';
import { ImageModal } from './../ui/imageModal';
const imageModal = new ImageModal();
const imageService = new ImageService();

/**
 * UserService - ���������� ��������� ���������� ������������
 * @class 
 * 
 */
export class UserService {
    getInfo() {
        return new Promise((resolve, reject) => {
            // Get token 
            const token = localStorage.getItem("social_user_token");
            // Get id
            const id = localStorage.getItem("social_user_id");
            if (!token || !id) return reject("Unauthorized.");

            fetch(`${env.apiUrl}/public/users/get-info/${id}`, {
                method: "GET",
                headers: {
                    "x-access-token": token
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        })
    }


    /**
     * uploadCover - ����� �������� ����� ��� ��������� ����, ����� Form Data ������� �������� ���
     * �������� �� ������, ��������� � ���� ���� � ����������� ��� ��� ����� formData.append("coverImg", file)
     * ������� ������ � ��������� �� ��������� ��������� � ���������� POST  ������ �� ������ � ������
     * � ������� "x-access-token": token
     * @param {File} file - ����������� ����������� 
     */
    uploadCover(file) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('coverImg', file);
            // Get token 
            const token = localStorage.getItem("social_user_token");
            // Get id
            const id = localStorage.getItem("social_user_id");
            if (!token || !id) return reject("Unauthorized.");
    
            fetch(`${env.apiUrl}/public/users/upload-cover/${id}`, {
                method: "POST",
                body: formData,
                headers: {
                    "x-access-token": token
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }


    /**
     * loadPhoto - ����� �������� ���������������� ����������� �� ������, ����� fetch POST FormData
     * @param {File} photo - ����������� �����������
     */
    loadPhoto(photo) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();

            formData.append("userPhotos", photo);

            const token = localStorage.getItem("social_user_token");
            const id = localStorage.getItem("social_user_id");

            fetch(`${env.apiUrl}/public/users/upload-photos/${id}`, {
                method: 'POST',
                body: formData,
                headers: {
                    "x-access-token": token
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    if (!data.error) { console.log("User photos updated success!") }
                })
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });
    }


    /**
     * deletePhoto -  ����� �������� ���������� � �������� � �������
     * @param {String} photoId  -  ������������� ����������� � ��������
     * @param {String} urlParametr - ����� �������������� ����������� �� �������
     */
    deletePhoto(photoId, urlParametr) {
        return new Promise((resolve, reject) => {
            const id = localStorage.getItem("social_user_id");
            const token = localStorage.getItem("social_user_token");
            fetch(`${env.apiUrl}/public/users/remove-photo/${id}`, {
                method: 'DELETE',
                body: JSON.stringify({
                    image_id: `${photoId}`,
                    image_url: `users-photos/userPhotos-${urlParametr}`
                }),
                headers: {
                    "x-access-token": token,
                    "Content-type": "application/json"
                }
            })
                .then((data) => data.json())
                .then((data) => {
                    if (!data.error) { console.log(data.message) };
                    return data;
                })
                .then((data) => resolve(data))
                .catch((error) => reject(error.message));
        });
    };


    /**
     * sendSearchQuery - ������ � ������� �� ����� �������������
     * @param {String} query -  ��������������� ��������� ������ 
     */
    sendSearchQuery(query) {
        return new Promise((resolve, reject) => {
            const token = localStorage.getItem("social_user_token");
            fetch(`${env.apiUrl}/public/users/search-users`, {
                method: "POST",
                body: JSON.stringify({
                    search_text: `${query}`
                }),
                headers: {
                    "x-access-token": token,
                    "Content-type": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(error.message));
        })
    }


    /**
     * sendNewComment - ����� �������� ������ ���������
     * @param {string} imageId - ������������� �����������
     * @param {Object} form - ����� ���������
     */
    sendNewComment(imageId, form) {
        return new Promise((resolve, reject) => {
            const token = localStorage.getItem("social_user_token");
            const imgID = form.closest("div.modal-body").querySelector("[data-id]").dataset.id;
            fetch(`${env.apiUrl}/public/users/comment/${imageId}`, {
                method: 'POST',
                body: JSON.stringify({
                    comment_text: `${form.elements["comment"].value}`
                }),
                headers: {
                    "x-access-token": token,
                    "Content-type": "application/json"
                }
            })
                .then(response => response.json())
                .then(json => {
                    if (!json.error) {
                        console.log(json.message);
                        form.reset();
                    };
                    return json;
                })
                .then(json => {
                    imageService.getInfo(imgID)
                        .then((data) => {
                            imageModal.clearModal();
                            imageModal.setBaseInfo(data);
                            imageModal.setComments(data);
                        })
                        .catch((error) => { console.log(error); })
                    return json;
                })
                .then((data) => resolve(data))
                .catch((error) => reject(error.message));
        }
        );
    };


    /**
     * deleteComment - ����� �������� �����������
     * @param {string} comId - ������������� �����������
     * @param {string} pictureId - ������������� �����������
     */
    deleteComment(comId, pictureId) {
        return new Promise((resolve, reject) => {
            const token = localStorage.getItem("social_user_token");
            fetch(`${env.apiUrl}/public/users/comment/${comId}`, {
                method: 'DELETE',
                body: JSON.stringify({
                    image_id: `${pictureId}`
                }),
                headers: {
                    "x-access-token": token,
                    "Content-type": "application/json"
                }
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json.message);
                    return json;
                })
                .then(json => {
                    imageService.getInfo(pictureId)
                        .then((data) => {
                            imageModal.clearModal();
                            imageModal.setBaseInfo(data);
                            imageModal.setComments(data);
                        })
                        .catch((error) => { console.log(error); })
                    return json;
                })
                .then((data) => resolve(data))
                .catch((error) => reject(error.message))
        })
    };


    /**
     * editComment- �������������� �����������
     * @param {*} comId - ������������� ����������
     * @param {*} form - ����� � ���������� ��� ������������
     */
    editComment(comId, form) {
        return new Promise((resolve, reject) => {
            const token = localStorage.getItem("social_user_token");
            const imgID = form.closest("div.modal-body").querySelector("[data-id]").dataset.id;
            fetch(`${env.apiUrl}/public/users/comment/${comId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    comment_text: `${form.elements["UserMessage"].value}`
                }),
                headers: {
                    "x-access-token": token,
                    "Content-type": "application/json"
                }
            })
                .then(response => response.json())
                .then(json => {
                    if (!json.error) {
                        console.log(json.message);
                        form.reset();
                        form.classList.toggle("d-none");
                    };
                    return json;
                })
                .then(json => {
                    imageService.getInfo(imgID)
                        .then((data) => {
                            imageModal.clearModal();
                            imageModal.setBaseInfo(data);
                            imageModal.setComments(data);
                        })
                        .catch((error) => { console.log(error); })
                    return json;
                })
                .then((data) => resolve(data))
                .catch((error) => reject(error.message));
        })
    };
}