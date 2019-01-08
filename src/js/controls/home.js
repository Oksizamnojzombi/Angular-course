import { UserService } from './../services/user';
import { ImageService } from './../services/image';
import { CommentService } from './../services/comments';
import { SearchService } from './../services/search';

import { Message } from './../modules/message';

import { UserUI } from './../ui/user';
import { ImageUI } from './../ui/image';
import { ImageModal } from './../ui/imageModal';
import { SearchUI } from './../ui/search';
const $ = require('jquery');


export function HomePage() {
    // Init User service
    const user = new UserService();
    // Image Service
    const imageService = new ImageService();
    // Comments Service
    const commentService = new CommentService();
    // Search Service
    const serchService = new SearchService();
    // Init User UI
    const userUI = new UserUI();
    //init Image Service
    const image = new ImageService();
    // Init Image UI
    const imageUI = new ImageUI();
    // Init Image Modal
    const imageModal = new ImageModal();
    // Init Image Modal
    const searchUI = new SearchUI();
    // Init Message Module
    const message = new Message();

    // UI elements
    const elementImgRow = document.querySelector(".row");
    const imageWrap = document.querySelector(".images-wrap");
    const inputCover = document.getElementById("coverImg");
    const inputUploadPhoto = document.getElementById("userPhotos");
    const addComments = document.forms["addComments"];
    const commentInput = addComments.elements["comment"];
    const commentWraper = document.querySelector(".current-image-comments-wrap");
    const formSeach = document.forms["searchForm"];
    const inputSearch = formSeach.elements["search"];
    const searchWraper = document.querySelector(".search-result");
    const logButton = document.querySelector(".btn-outline-danger");


    /**
     * onLoad - The function that receives user information from the server
     * @param {e}
     */
    function onLoad(e) {
        user.getInfo()
            .then((data) => {
                userUI.clearContainer();
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
     * onCoverUpload - The function by which the photo is loaded for the background of the profile
     * @param {e} - event
     */
    function onCoverUpload(e) {
        if (inputCover.files.length) {
            const [newCover] = inputCover.files;
            user.uploadCover(newCover)
                .then(user.getInfo)
                .then((data) => userUI.setUserCover(data.cover))
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    /**
     * onPhotosUpload -  The function by which the photo is loaded into the user profile
     * @param {e}
     */
    function onloadingPhoto(e) {
        if (inputUploadPhoto.files.length) {
            const [newPhoto] = inputUploadPhoto.files;
            image.loadingPhoto(newPhoto)
                .then(() => onLoad())
                .catch((error) => console.log(error));
        }
    }

    /**
     * deletePhoto - The function by which the photo is removed from the user's page
     * @param {e}
     */
    function deletePhoto(e) {

        if (e.target.closest('.remove-wrap')) {
            // UI elements
            const imgSrc = e.target.offsetParent.previousElementSibling;
            const imgWrap = e.target.offsetParent.previousElementSibling.parentElement;

            let questionDelete = confirm('�� ����� ������ ������� ��� ���� ?');

            if (questionDelete) {
                // elements imgID - id photo, imgUrl - url photo
                const imgId = imgWrap.dataset.imgId;
                const imgUrl = imgSrc.currentSrc.split('/')[5];
                image.removePhoto(imgId, imgUrl);
            }
            user.getInfo()
                .then(() => onLoad())
                .catch((error) => console.log(error));
        }
    }

    /**
     * addComment - The function of adding a comment to the picture
     * @param {e}
     */
    function addComment(e) {
        e.preventDefault();

        const idComment = addComments.dataset.commentId;
        const commentText = commentInput.value;
        commentService.addComment(idComment, commentText);
        imageService.getInfo(idComment)
            .then((data) => imageModal.setNewComments(data))
            .catch((error) => {
                console.log(error);
            });
        addComments.reset()
    }

    /**
     * deleteComment - The function to delete a comment from under the pictures
     * @param {e}
     */
    function deleteComment(e) {
        if (e.target.closest(".fa-trash-alt")) {
            let commentDelete = confirm('������� ���������� ?');
            if (commentDelete) {
                const idImg = e.target.parentElement.dataset.imgId;
                const idComments = e.target.parentElement.dataset.commentid;

                $('#imageModal').modal('toggle');
                commentService.deleteComment(idImg, idComments)
                    .then((res) => message.show({ text: res.message, error: res.error }))
                    .catch((error) => console.log(error));
                imageService.getInfo(idImg)
                    .then((data) => imageModal.setNewComments(data))
                    .catch((error) => console.log(error));

                setTimeout(function () {
                    let messageContainer = document.querySelector(".message-container");
                    messageContainer.parentNode.removeChild(messageContainer);
                }, 3000)
            }
            message.init();
        }
        if (e.target.closest(".fa-edit")) {
            let commentEdit = confirm('Delete comment?');
            if (commentEdit) {
                const idComments = e.target.parentElement.dataset.commentId;
                const commentText = commentInput.value;
                $('#imageModal').modal('toggle');
                commentService.editComment(idComments, commentText)
                    .then((res) => {
                        if (!res.error) message.show({ text: res.message, error: res.error });
                        else message.show({ text: res.message, error: res.error });
                    })
                    .catch((error) => console.log(error));
                addComments.reset();

                setTimeout(function () {
                    let messageContainer = document.querySelector(".message-container");
                    messageContainer.parentNode.removeChild(messageContainer);
                }, 3000)
            }
            message.init();
        }
    }

    /**
     * searchHandler - Search for registered users
     * @param {e}
     */
    function searchHandler(e) {
        e.preventDefault();

        const userName = inputSearch.value;
        if (userName.length >= 3) {
            serchService.serchPeople(userName)
                .then((data) => {
                    searchWraper.classList.remove("hide");
                    searchUI.clearContainer();
                    data.forEach((info) => searchUI.addSerch(info));
                })
                .catch((error) => console.log(error));
        }
    }

    /**
     * logautSistem - function for logout
     * @param {e}
     */
    function logautSistem(e) {
        localStorage.clear();
        window.location = "login.html";
    }

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

    $('#imageModal').on('hidden.bs.modal', (e) => imageModal.loaderToggle());


    // Events
    inputSearch.addEventListener("blur", e => {
        searchWraper.classList.add("hide");
        formSeach.reset()
    });
    window.addEventListener("load", onLoad);
    inputCover.addEventListener("change", onCoverUpload);
    inputUploadPhoto.addEventListener("change", onloadingPhoto);
    elementImgRow.addEventListener('click', deletePhoto);
    addComments.addEventListener("submit", addComment);
    commentWraper.addEventListener("click", deleteComment);
    formSeach.addEventListener("submit", searchHandler);
    logButton.addEventListener("click", logautSistem);
}
