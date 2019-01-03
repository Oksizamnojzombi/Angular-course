import { env } from './../config/env';

/**
 * ImageService - ������ � ��������� ������ �� ����������� � �������
 */
export class ImageService {
    remove(id) {

    }
    getInfo(id) {
        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/users/image-info/${id}`)
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });
    }
}