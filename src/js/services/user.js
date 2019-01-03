import { env } from './../config/env';

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
}