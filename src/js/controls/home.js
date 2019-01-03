import { UserService } from './../services/user';
import { ImageService } from './../services/image';
import { UserUI } from './../ui/user';
import { ImageUI } from './../ui/image';
import { ImageModal } from './../ui/imageModal';
const $ = require('jquery');


export function HomePage() {
    // Init User Service
    const user = new UserService();
    //Image Servise
    const imageService = new ImageService();
    // Init User UI
    const userUI = new UserUI();
    // Init Image UI
    const imageUI = new ImageUI();
    // Init Image Modal
    const imageModal = new ImageModal();
    // UI elements
    const inputCover = document.getElementById("coverImg");
    const inputUserPhotos = document.getElementById("userPhotos");
    const imgWrapper = document.querySelector("div.images-wrap");
    const modal = document.querySelector("div.modal-body");
    const inputSearch = document.querySelector("input.form-control");
    const btnLogout = document.getElementById("loguot");


    /**
     * onLoad - ���������� ������� �������� ��������, ���������� ������ ���������� ������� UserService
     * ������ ���������� � ������ ������� ������������ � ����� UserUI.renderUserInfo ������� ���������� ������
     * ��� ����������� �� ��������, ��������� ��������, � ����������� �����������
     * @param {Event} e 
     */
    function onLoad(e) {
        user.getInfo()
            .then((data) => {
                userUI.renderUserInfo(data);
                return data;
            })
            .then((data) => {
                imageUI.clearContainer();
                data.my_images.forEach((img) => imageUI.addImage(img));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * onSearch - ���������� ������ ������ ������������, ���������� ������ � ���������� ������������, ���������
     * ����� ������� �� ���������� ������, ������������ �������� ������������ ���������� ���� � ������������
     * @param {Event} e - �������� �������� � ������ ������
     */
    function onSearch(e) {
        e.preventDefault();

        if (e.target.value.length > 2) {
            user.sendSearchQuery(e.target.value)
                .then((data) => {
                    userUI.controllerSearchingUserInfo(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (!document.querySelector("div.search-result").classList.contains('d-none') && e.target.value.length < 3) {
            document.querySelector("div.search-result").classList.toggle('d-none');
        }
    }

    /**
     * logout -  ���������� ������ � ��������
     * @param {Event} e - ���� �� ������ �������
     */
    function logout(e) {
        localStorage.removeItem("social_user_id");
        localStorage.removeItem("social_user_token");
        window.location = "login.html";
    }

    /**
     * onCoverUpload - ���������� �� ������� �������� ����� ���������� ���������, � ��������� ��
     * user.uploadCover �� ����������� ����������� ����������, ������������ �� � ������������� �����
     * ���
     * @param {Event} e 
     */
    function onCoverUpload(e) {
        if (inputCover.files.length) {
            const [newCover] = inputCover.files;
            user.uploadCover(newCover)
                .then(user.getInfo)
                .then((data) => userUI.setCover(data.cover))
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    /**
     * onPhotosUpload -  ���������� �������� ���������������� ����������� � ������� �����������
     * @param {Event} e 
     */
    function onPhotosUpload(e) {
        e.stopPropagation();

        if (inputUserPhotos.files.length) {
            const userPhoto = inputUserPhotos.files;
            const arrFiles = [];
            for (let kay in userPhoto) {
                if (isFinite(kay)) {
                    arrFiles.push(userPhoto[kay]);
                }
            }
            arrFiles.forEach((photo) => {
                user.loadPhoto(photo)
                    .then(user.getInfo)
                    .then((data) => {
                        userUI.renderUserInfo(data);
                        return data;
                    })
                    .then((data) => {
                        imageUI.clearContainer();
                        data.my_images.forEach((img) => imageUI.addImage(img));
                    })
            })
        }
    }

    /**
     * imageOpertion  - ���������� ������� � ���������� ������������
     * @param {Event} e  - ���� �� ���� � ������� ��������� ����������� ������������
     */
    function imageOpertion(e) {
        e.stopPropagation();

        if (e.target.classList.contains("fa-trash-alt")) {
            const imgId = e.target.closest("[data-img-id]").dataset.imgId;
            const imgUrlParametr = e.target.closest("[data-img-id]").querySelector("img").src.slice(80);
            const confirmation = confirm(`������������� ������� ����������� � ${imgId}?`);
            if (confirmation) {
                user.deletePhoto(imgId, imgUrlParametr)
                    .then(user.getInfo)
                    .then((data) => {
                        userUI.renderUserInfo(data);
                        return data;
                    })
                    .then((data) => {
                        imageUI.clearContainer();
                        data.my_images.forEach((img) => imageUI.addImage(img));
                    })
            }
        };

        if (e.target.classList.contains("on-hover")) {
            const id = e.target.closest("[data-img-id]").dataset.imgId;
            $('#imageModal').modal('toggle');

            imageService.getInfo(id)
                .then((data) => imageModal.renderInfo(data))
                .catch((error) => {
                    console.log(error);
                });
        };

    }

    /**
     * modalOperations - ���������� �������� � ��������� ����
     * @param {Event} e - �������
     */
    function modalOperations(e) {
        e.stopPropagation();
        e.preventDefault();
        const imgID = e.target.closest("div.modal-body").querySelector("[data-id]").dataset.id;
        const newCommentForm = e.target.closest("form");

        if (e.target.classList.contains("sendMessage")) {
            user.sendNewComment(imgID, newCommentForm)
            // .then(
            //     imageService.getInfo(imgID)
            //     .then((data) => imageModal.renderInfo(data))
            //     .catch((error) => {
            //     console.log(error);
            //     })
            // )
        } else if (e.target.classList.contains("fa-trash-alt")) {
            const comId = e.target.closest("div.comment-item-details").dataset.commentId;
            user.deleteComment(comId, imgID);
        }
        else if (e.target.classList.contains("fa-edit")) {
            const comIdent = e.target.closest("div.comment-item-details").dataset.commentId;
            let newMessageForm = e.target.closest("div.comment-item").querySelector("form.newMessage");
            newMessageForm.classList.toggle("d-none");
            // newMessageForm.addEventListener('submit', (e) => {
            //     e.preventDefault();
            //     user.editComment(comIdent, newMessageForm);
            // });

            newMessageForm.querySelector("button.editMessage").addEventListener("click", (e) => {
                e.preventDefault();
                user.editComment(comIdent, newMessageForm)

            });
        }
    }


    // Events
    window.addEventListener("load", onLoad);

    /**
     * ���������� ������� �� ������ ������ �� �����
     */
    btnLogout.addEventListener('click', logout);

    /**
     * ���������� ������� �� ���� ������
     */
    inputSearch.addEventListener("input", onSearch);
    /**
     * ���������� ������� �� ��������� ����
     */
    inputCover.addEventListener("change", onCoverUpload);
    /**
     * ���������� ������� ������� ����������������� �����������
     */
    inputUserPhotos.addEventListener("change", onPhotosUpload);

    /**
     * ���������� ������� ����� �� ������� �����������
     */
    imgWrapper.addEventListener("click", imageOpertion);

    /**
     * ���������� ����� �� ��������� ����
     */
    modal.addEventListener("click", modalOperations);


    // Remove loader
    $('#imageModal').on('hidden.bs.modal', (e) => imageModal.loaderToggle());
}