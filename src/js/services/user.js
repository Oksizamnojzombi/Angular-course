import { env } from './../config/env';

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
            formData.append("coverImg", file);

            // Get token
            const token = localStorage.getItem("social_user_token");
            // Get user id
            const id = localStorage.getItem("social_user_id");

            if (!token || !id) return reject("Error. Unauthorized.");

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
}