import { env } from './../config/env';
import { ImageService } from './../services/image';
import { ImageModal } from './../ui/imageModal';
const imageModal = new ImageModal();
const imageService = new ImageService();

/**
 * UserService - контроллер обратотки информации пользователя
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
     * uploadCover - метод отправки файла для изменения фона, через Form Data создаем материал для
     * отправки на сервер, добавляем в него файл и присваиваем эму имя через formData.append("coverImg", file)
     * достаем данные о реестации из локаьного хранилища и отправляем POST  запрос на сервер с файлом
     * и хедером "x-access-token": token
     * @param {File} file - загружаемое изображение 
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
     * loadPhoto - метод отправки пользовательских изображений на сервер, через fetch POST FormData
     * @param {File} photo - загружаемое изображение
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
     * deletePhoto -  метод удаления фотографий с запросом к серверу
     * @param {String} photoId  -  идентефикатор изображения в разметке
     * @param {String} urlParametr - часть идентефикатора изображения на сервере
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
     * sendSearchQuery - запрос к серверу на поиск пользователей
     * @param {String} query -  пользовательскй поисковый запрос 
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
     * sendNewComment - метод отправки нового сообщения
     * @param {string} imageId - идентификатор изображения
     * @param {Object} form - форма сообщения
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
     * deleteComment - метод удаления комментария
     * @param {string} comId - идентификатор комментария
     * @param {string} pictureId - идентефикатор изображения
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
     * editComment- редактирование комментария
     * @param {*} comId - идентефикатор комметария
     * @param {*} form - форма с комметаием под изображением
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