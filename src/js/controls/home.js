import { UserService } from './../services/user';
import { ImageService } from './../services/image';
import { UserUI } from './../ui/user';
import { ImageUI } from './../ui/image';
import { ImageModal } from './../ui/imageModal';
const $ = require('jquery');

export function HomePage() {
    // Init User service
    const user = new UserService();
    // Image Service
    const imageService = new ImageService();
    // Init User UI
    const userUI = new UserUI();
    // Init Image UI
    const imageUI = new ImageUI();
    // Init Image Modal
    const imageModal = new ImageModal();

    // UI elements
    const inputCover = document.getElementById("coverImg");
    const imageWrap = document.querySelector(".images-wrap");

    user.getInfo()
        .then((data) => {
            userUI.renderUserInfo(data);
            return data;
        })
        .then((data) => {
            imageUI.clearContainer();
            data.my_images.forEach((img) => imageUI.addImage(img));
            return data;
        })
        .catch((error) => console.log(error));

    inputCover.addEventListener("change", (e) => {
        if (inputCover.files.length) {
            user.uploadCover(inputCover.files[0])
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    });

    // Get one image info
    imageWrap.addEventListener("click", (e) => {
        if (e.target.classList.contains("on-hover")) {
            const id = e.target.closest("[data-img-id]").dataset.imgId;
            $('#imageModal').modal('toggle');

            imageService.getInfo(id)
                .then((data) => imageModal.renderInfo(data))
                .catch((error) => {
                    console.log(error);
                });
        }
    });


    // Remove loader
    $('#imageModal').on('hidden.bs.modal', (e) => imageModal.loaderToggle());
}
