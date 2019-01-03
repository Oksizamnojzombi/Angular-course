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
     * onLoad - обработчик событи€ звгрузки страницы, активирует методы экземпл€ра объекта UserService
     * данные полученные в ответе сервера отправл€ютс€ в метод UserUI.renderUserInfo который сепарирует данные
     * дл€ отображени€ на странице, очищаетс€ темплейт, и вставл€ютс€ изображени€
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
     * onSearch - обработчик панели поиска пользоватеей, отправл€ет запрос с инициаламы пользовател€, прередает
     * ответ сервера на контроллер вывода, контролирует открытие графического интерфейса окна с результатами
     * @param {Event} e - внесение значений в строку поиска
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
     * logout -  обработчик выхода с профайла
     * @param {Event} e - клик по кнопке логаута
     */
    function logout(e) {
        localStorage.removeItem("social_user_id");
        localStorage.removeItem("social_user_token");
        window.location = "login.html";
    }

    /**
     * onCoverUpload - обработчик на событие загрузки файла спроверкой состо€ни€, и передачей на
     * user.uploadCover он запрашивает обновленную информацию, распарсивает ее и устанавливает новый
     * фон
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
     * onPhotosUpload -  обработчик отправки пользовательских изображаний с выводом изображени€
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
     * imageOpertion  - обработчик оперций с картинками пользовател€
     * @param {Event} e  - клик по полю в котором размещены изображени€ пользовател€
     */
    function imageOpertion(e) {
        e.stopPropagation();

        if (e.target.classList.contains("fa-trash-alt")) {
            const imgId = e.target.closest("[data-img-id]").dataset.imgId;
            const imgUrlParametr = e.target.closest("[data-img-id]").querySelector("img").src.slice(80);
            const confirmation = confirm(`ƒействительно удалить изображение є ${imgId}?`);
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
     * modalOperations - обработчик операций в модальном окне
     * @param {Event} e - событие
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
     * присвоение событи€ на кнопку выхода из сайта
     */
    btnLogout.addEventListener('click', logout);

    /**
     * присвоение событи€ на поле поиска
     */
    inputSearch.addEventListener("input", onSearch);
    /**
     * присвоени€ событи€ на загрузщик фона
     */
    inputCover.addEventListener("change", onCoverUpload);
    /**
     * присвоение событи€ отправи пользовательского изображени€
     */
    inputUserPhotos.addEventListener("change", onPhotosUpload);

    /**
     * присвоение событи€ клика по галерее изображений
     */
    imgWrapper.addEventListener("click", imageOpertion);

    /**
     * присвоение клика на модальное окно
     */
    modal.addEventListener("click", modalOperations);


    // Remove loader
    $('#imageModal').on('hidden.bs.modal', (e) => imageModal.loaderToggle());
}