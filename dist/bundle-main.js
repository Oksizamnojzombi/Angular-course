/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./js/app.js","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./css/style.css":
/*!***********************!*\
  !*** ./css/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./css/style.css?");

/***/ }),

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"../node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap */ \"../node_modules/bootstrap/dist/js/bootstrap.js\");\n/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var popper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! popper.js */ \"../node_modules/popper.js/dist/esm/popper.js\");\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../css/style.css */ \"./css/style.css\");\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_css_style_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _guard_auth_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./guard/auth.guard */ \"./js/guard/auth.guard.js\");\n/* harmony import */ var _controls_login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controls/login */ \"./js/controls/login.js\");\n/* harmony import */ var _controls_home__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./controls/home */ \"./js/controls/home.js\");\n/* harmony import */ var _controls_register__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./controls/register */ \"./js/controls/register.js\");\n// Libs\n\n\n // Styles\n\n // Guard\n\n // Pages\n\n\n\n\nvar guard = new _guard_auth_guard__WEBPACK_IMPORTED_MODULE_4__[\"AuthGuard\"]();\nvar path = window.location.pathname;\nvar page = path.split('/').pop().slice(0, -5);\n\nswitch (page) {\n  case 'login':\n    guard.check(page);\n    Object(_controls_login__WEBPACK_IMPORTED_MODULE_5__[\"LoginPage\"])();\n    break;\n\n  case 'index':\n    guard.check(page);\n    Object(_controls_home__WEBPACK_IMPORTED_MODULE_6__[\"HomePage\"])();\n    break;\n\n  case 'register':\n    guard.check(page);\n    Object(_controls_register__WEBPACK_IMPORTED_MODULE_7__[\"RegisterPage\"])();\n    break;\n}\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ }),

/***/ "./js/config/env.js":
/*!**************************!*\
  !*** ./js/config/env.js ***!
  \**************************/
/*! exports provided: env */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"env\", function() { return env; });\nvar env = {\n  apiUrl: \"https://mostlikedperson-api.herokuapp.com/api\"\n};\n\n//# sourceURL=webpack:///./js/config/env.js?");

/***/ }),

/***/ "./js/controls/home.js":
/*!*****************************!*\
  !*** ./js/controls/home.js ***!
  \*****************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HomePage\", function() { return HomePage; });\n/* harmony import */ var _services_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../services/user */ \"./js/services/user.js\");\n/* harmony import */ var _services_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../services/image */ \"./js/services/image.js\");\n/* harmony import */ var _services_comments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../services/comments */ \"./js/services/comments.js\");\n/* harmony import */ var _services_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../services/search */ \"./js/services/search.js\");\n/* harmony import */ var _modules_message__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../modules/message */ \"./js/modules/message.js\");\n/* harmony import */ var _ui_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../ui/user */ \"./js/ui/user.js\");\n/* harmony import */ var _ui_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../ui/image */ \"./js/ui/image.js\");\n/* harmony import */ var _ui_imageModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../ui/imageModal */ \"./js/ui/imageModal.js\");\n/* harmony import */ var _ui_search__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../ui/search */ \"./js/ui/search.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\n\n\n\nvar $ = __webpack_require__(/*! jquery */ \"../node_modules/jquery/dist/jquery.js\");\n\nfunction HomePage() {\n  // Init User service\n  var user = new _services_user__WEBPACK_IMPORTED_MODULE_0__[\"UserService\"](); // Image Service\n\n  var imageService = new _services_image__WEBPACK_IMPORTED_MODULE_1__[\"ImageService\"](); // Comments Service\n\n  var commentService = new _services_comments__WEBPACK_IMPORTED_MODULE_2__[\"CommentService\"](); // Search Service\n\n  var serchService = new _services_search__WEBPACK_IMPORTED_MODULE_3__[\"SearchService\"](); // Init User UI\n\n  var userUI = new _ui_user__WEBPACK_IMPORTED_MODULE_5__[\"UserUI\"](); //init Image Service\n\n  var image = new _services_image__WEBPACK_IMPORTED_MODULE_1__[\"ImageService\"](); // Init Image UI\n\n  var imageUI = new _ui_image__WEBPACK_IMPORTED_MODULE_6__[\"ImageUI\"](); // Init Image Modal\n\n  var imageModal = new _ui_imageModal__WEBPACK_IMPORTED_MODULE_7__[\"ImageModal\"](); // Init Image Modal\n\n  var searchUI = new _ui_search__WEBPACK_IMPORTED_MODULE_8__[\"SearchUI\"](); // Init Message Module\n\n  var message = new _modules_message__WEBPACK_IMPORTED_MODULE_4__[\"Message\"](); // UI elements\n\n  var elementImgRow = document.querySelector(\".row\");\n  var imageWrap = document.querySelector(\".images-wrap\");\n  var inputCover = document.getElementById(\"coverImg\");\n  var inputUploadPhoto = document.getElementById(\"userPhotos\");\n  var addComments = document.forms[\"addComments\"];\n  var commentInput = addComments.elements[\"comment\"];\n  var commentWraper = document.querySelector(\".current-image-comments-wrap\");\n  var formSeach = document.forms[\"searchForm\"];\n  var inputSearch = formSeach.elements[\"search\"];\n  var searchWraper = document.querySelector(\".search-result\");\n  var logButton = document.querySelector(\".btn-outline-danger\");\n  /**\r\n   * onLoad - ���������� ������� �������� ��������, ���������� ������ ���������� ������� UserService\r\n   * ������ ���������� � ������ ������� ������������ � ����� UserUI.renderUserInfo ������� ���������� ������\r\n   * ��� ����������� �� ��������, ��������� ��������, � ����������� �����������\r\n   * @param {Event} e \r\n   */\n\n  function onLoad(e) {\n    user.getInfo().then(function (data) {\n      userUI.clearContainer();\n      userUI.renderUserInfo(data);\n      return data;\n    }).then(function (data) {\n      imageUI.clearContainer();\n      data.my_images.forEach(function (img) {\n        return imageUI.addImage(img);\n      });\n    }).catch(function (error) {\n      console.log(error);\n    });\n  }\n  /**\r\n   * onCoverUpload - ���������� �� ������� �������� ����� ���������� ���������, � ��������� ��\r\n   * user.uploadCover �� ����������� ����������� ����������, ������������ �� � ������������� �����\r\n   * ���\r\n   * @param {Event} e \r\n   */\n\n\n  function onCoverUpload(e) {\n    if (inputCover.files.length) {\n      var _inputCover$files = _slicedToArray(inputCover.files, 1),\n          newCover = _inputCover$files[0];\n\n      user.uploadCover(newCover).then(user.getInfo).then(function (data) {\n        return userUI.setUserCover(data.cover);\n      }).catch(function (error) {\n        console.log(error);\n      });\n    }\n  }\n  /**\r\n   * onPhotosUpload -  ���������� �������� ���������������� ����������� � ������� �����������\r\n   * @param {Event} e \r\n   */\n\n\n  function onloadingPhoto(e) {\n    if (inputUploadPhoto.files.length) {\n      var _inputUploadPhoto$fil = _slicedToArray(inputUploadPhoto.files, 1),\n          newPhoto = _inputUploadPhoto$fil[0];\n\n      image.loadingPhoto(newPhoto).then(function () {\n        return onLoad();\n      }).catch(function (error) {\n        return console.log(error);\n      });\n    }\n  }\n  /**\r\n   * deletePhoto - �������� ���� � �������\r\n   * @param {Event} e - co,anbt\r\n   */\n\n\n  function deletePhoto(e) {\n    if (e.target.closest('.remove-wrap')) {\n      // UI elements\n      var imgSrc = e.target.offsetParent.previousElementSibling;\n      var imgWrap = e.target.offsetParent.previousElementSibling.parentElement;\n      var questionDelete = confirm('�� ����� ������ ������� ��� ���� ?');\n\n      if (questionDelete) {\n        // elements imgID - id photo, imgUrl - url photo\n        var imgId = imgWrap.dataset.imgId;\n        var imgUrl = imgSrc.currentSrc.split('/')[5];\n        image.removePhoto(imgId, imgUrl);\n      }\n\n      user.getInfo().then(function () {\n        return onLoad();\n      }).catch(function (error) {\n        return console.log(error);\n      });\n    }\n  }\n  /**\r\n   * addComment - ���������� ����������� �������������\r\n   * @param {any} e - �������\r\n   */\n\n\n  function addComment(e) {\n    e.preventDefault();\n    var idComment = addComments.dataset.commentId;\n    var commentText = commentInput.value;\n    commentService.addComment(idComment, commentText);\n    imageService.getInfo(idComment).then(function (data) {\n      return imageModal.setNewComments(data);\n    }).catch(function (error) {\n      console.log(error);\n    });\n    addComments.reset();\n  }\n  /**\r\n   * deleteComment - �������������� � �������� �����������\r\n   * @param {any} e\r\n   */\n\n\n  function deleteComment(e) {\n    if (e.target.closest(\".fa-trash-alt\")) {\n      var commentDelete = confirm('������� ���������� ?');\n\n      if (commentDelete) {\n        var idImg = e.target.parentElement.dataset.imgId;\n        var idComments = e.target.parentElement.dataset.commentid;\n        $('#imageModal').modal('toggle');\n        commentService.deleteComment(idImg, idComments).then(function (res) {\n          return message.show({\n            text: res.message,\n            error: res.error\n          });\n        }).catch(function (error) {\n          return console.log(error);\n        });\n        imageService.getInfo(idImg).then(function (data) {\n          return imageModal.setNewComments(data);\n        }).catch(function (error) {\n          return console.log(error);\n        });\n        setTimeout(function () {\n          var messageContainer = document.querySelector(\".message-container\");\n          messageContainer.parentNode.removeChild(messageContainer);\n        }, 3000);\n      }\n\n      message.init();\n    }\n\n    if (e.target.closest(\".fa-edit\")) {\n      var commentEdit = confirm('������������� ���������� ?');\n\n      if (commentEdit) {\n        var _idComments = e.target.parentElement.dataset.commentId;\n        var commentText = commentInput.value;\n        $('#imageModal').modal('toggle');\n        commentService.editComment(_idComments, commentText).then(function (res) {\n          if (!res.error) message.show({\n            text: res.message,\n            error: res.error\n          });else message.show({\n            text: res.message,\n            error: res.error\n          });\n        }).catch(function (error) {\n          return console.log(error);\n        });\n        addComments.reset();\n        setTimeout(function () {\n          var messageContainer = document.querySelector(\".message-container\");\n          messageContainer.parentNode.removeChild(messageContainer);\n        }, 3000);\n      }\n\n      message.init();\n    }\n  }\n  /**\r\n   * searchHandler - ����� ������������� � ������ ����� � ���� ������ ������\r\n   * @param {any} e - �������\r\n   */\n\n\n  function searchHandler(e) {\n    e.preventDefault();\n    var userName = inputSearch.value;\n\n    if (userName.length >= 3) {\n      serchService.serchPeople(userName).then(function (data) {\n        searchWraper.classList.remove(\"hide\");\n        searchUI.clearContainer();\n        data.forEach(function (info) {\n          return searchUI.addSerch(info);\n        });\n      }).catch(function (error) {\n        return console.log(error);\n      });\n    }\n  }\n\n  function logautSistem(e) {\n    localStorage.clear();\n    window.location = \"login.html\";\n  }\n\n  imageWrap.addEventListener(\"click\", function (e) {\n    if (e.target.classList.contains(\"on-hover\")) {\n      var id = e.target.closest(\"[data-img-id]\").dataset.imgId;\n      $('#imageModal').modal('toggle');\n      imageService.getInfo(id).then(function (data) {\n        return imageModal.renderInfo(data);\n      }).catch(function (error) {\n        console.log(error);\n      });\n    }\n  });\n  $('#imageModal').on('hidden.bs.modal', function (e) {\n    return imageModal.loaderToggle();\n  }); // Events\n\n  inputSearch.addEventListener(\"blur\", function (e) {\n    searchWraper.classList.add(\"hide\");\n    formSeach.reset();\n  });\n  window.addEventListener(\"load\", onLoad);\n  inputCover.addEventListener(\"change\", onCoverUpload);\n  inputUploadPhoto.addEventListener(\"change\", onloadingPhoto);\n  elementImgRow.addEventListener('click', deletePhoto);\n  addComments.addEventListener(\"submit\", addComment);\n  commentWraper.addEventListener(\"click\", deleteComment);\n  formSeach.addEventListener(\"submit\", searchHandler);\n  logButton.addEventListener(\"click\", logautSistem);\n}\n\n//# sourceURL=webpack:///./js/controls/home.js?");

/***/ }),

/***/ "./js/controls/login.js":
/*!******************************!*\
  !*** ./js/controls/login.js ***!
  \******************************/
/*! exports provided: LoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LoginPage\", function() { return LoginPage; });\n/* harmony import */ var _services_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../services/auth */ \"./js/services/auth.js\");\n/* harmony import */ var _modules_message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../modules/message */ \"./js/modules/message.js\");\n/* harmony import */ var _modules_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../modules/validation */ \"./js/modules/validation.js\");\n\n\n\nfunction LoginPage() {\n  // Init Auth Service\n  var auth = new _services_auth__WEBPACK_IMPORTED_MODULE_0__[\"AuthService\"](); // Init Message Module\n\n  var message = new _modules_message__WEBPACK_IMPORTED_MODULE_1__[\"Message\"]();\n  message.init(); // Login UI\n\n  var form = document.forms[\"loginForm\"];\n  var emailInput = form.elements[\"email\"];\n  var passwordInput = form.elements[\"password\"]; // Reset password\n\n  var resetPasswordForm = document.forms[\"resetPassword\"];\n  var resEmail = resetPasswordForm.elements[\"res_email\"];\n  var modalFormReset = document.querySelector(\".reset-password-modal\");\n  var modalBackdrop = document.querySelector(\"div .modal-backdrop\"); // Login handler\n\n  function submitHandler(e) {\n    e.preventDefault();\n    var validation = new _modules_validation__WEBPACK_IMPORTED_MODULE_2__[\"Validation\"](form);\n    validation.init();\n    if (!validation.check()) return console.error(\"Validation error.\");\n    auth.login(emailInput.value, passwordInput.value).then(function (res) {\n      if (!res.error) {\n        localStorage.setItem(\"social_user_id\", res.id);\n        localStorage.setItem(\"social_user_token\", res.token);\n        window.location = \"index.html\";\n      } else {\n        message.show({\n          text: res.message,\n          error: res.error\n        });\n      }\n    });\n  } //resetPasswordHandler\n\n\n  function resetPasswordHandler(e) {\n    e.preventDefault();\n    var modalBackdrop = document.querySelector(\".modal-backdrop\");\n    var validation = new _modules_validation__WEBPACK_IMPORTED_MODULE_2__[\"Validation\"](resetPasswordForm);\n    validation.init();\n    if (!validation.check()) return console.error(\"Validation error.\");\n    auth.resetPassword(resEmail.value).then(function (res) {\n      if (!res.error) {\n        modalFormReset.classList.remove(\"show\");\n        modalBackdrop.classList.remove(\"show\");\n        resetPasswordForm.reset();\n        message.show({\n          text: res.message,\n          error: res.error\n        });\n      } else {\n        modalFormReset.classList.remove(\"show\");\n        modalBackdrop.classList.remove(\"show\");\n        resetPasswordForm.reset();\n        message.show({\n          text: res.message,\n          error: res.error\n        });\n      }\n    });\n  }\n\n  form.addEventListener(\"submit\", submitHandler);\n  resetPasswordForm.addEventListener(\"submit\", resetPasswordHandler);\n}\n\n//# sourceURL=webpack:///./js/controls/login.js?");

/***/ }),

/***/ "./js/controls/register.js":
/*!*********************************!*\
  !*** ./js/controls/register.js ***!
  \*********************************/
/*! exports provided: RegisterPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RegisterPage\", function() { return RegisterPage; });\n/* harmony import */ var _services_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../services/auth */ \"./js/services/auth.js\");\n/* harmony import */ var _modules_message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../modules/message */ \"./js/modules/message.js\");\n/* harmony import */ var _modules_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../modules/validation */ \"./js/modules/validation.js\");\n\n\n\nfunction RegisterPage() {\n  // Init Auth Service\n  var auth = new _services_auth__WEBPACK_IMPORTED_MODULE_0__[\"AuthService\"](); // Init Message Module\n\n  var message = new _modules_message__WEBPACK_IMPORTED_MODULE_1__[\"Message\"]();\n  message.init(); // Login UI\n\n  var formReg = document.forms[\"signUpForm\"];\n  var firstNsmeInput = formReg.elements[\"first_name\"];\n  var lastNameInput = formReg.elements[\"last_name\"];\n  var nickNameInput = formReg.elements[\"nick_name\"];\n  var dayOfBirthInput = formReg.elements[\"day_of_birth\"];\n  var monthOfBirthInput = formReg.elements[\"month_of_birth\"];\n  var yearOfBirthInput = formReg.elements[\"year_of_birth\"];\n  var countryInput = formReg.elements[\"country\"];\n  var cityInput = formReg.elements[\"city\"];\n  var genderInput = formReg.elements[\"gender\"];\n  var regEmailInput = formReg.elements[\"email\"];\n  var phoneInput = formReg.elements[\"phone\"];\n  var regPasswordInput = formReg.elements[\"password\"]; //Login handler\n\n  function submitHandlerRegistration(e) {\n    e.preventDefault();\n    var validation = new _modules_validation__WEBPACK_IMPORTED_MODULE_2__[\"Validation\"](formReg);\n    validation.init();\n    if (!validation.check()) return console.error(\"Validation error.\");\n    auth.register(regEmailInput.value, regPasswordInput.value, nickNameInput.value, firstNsmeInput.value, lastNameInput.value, phoneInput.value, genderInput.value, cityInput.value, countryInput.value, dayOfBirthInput.value, monthOfBirthInput.value, yearOfBirthInput.value).then(function (res) {\n      if (!res.error) {\n        formReg.reset();\n        window.location = \"login.html\";\n      }\n\n      message.show({\n        text: res.message,\n        error: res.error\n      });\n      formReg.reset();\n    });\n  }\n\n  formReg.addEventListener(\"submit\", submitHandlerRegistration);\n}\n\n//# sourceURL=webpack:///./js/controls/register.js?");

/***/ }),

/***/ "./js/guard/auth.guard.js":
/*!********************************!*\
  !*** ./js/guard/auth.guard.js ***!
  \********************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AuthGuard\", function() { return AuthGuard; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar AuthGuard =\n/*#__PURE__*/\nfunction () {\n  function AuthGuard() {\n    _classCallCheck(this, AuthGuard);\n  }\n\n  _createClass(AuthGuard, [{\n    key: \"check\",\n    value: function check(currentPage) {\n      console.log(currentPage); // Get token \n\n      var token = localStorage.getItem(\"social_user_token\"); // Get id\n\n      var id = localStorage.getItem(\"social_user_id\");\n      if ((!token || !id) && currentPage !== 'login') return window.location = './login.html';\n      if (token && id && currentPage === 'login') return window.location = './index.html';\n    }\n  }]);\n\n  return AuthGuard;\n}();\n\n//# sourceURL=webpack:///./js/guard/auth.guard.js?");

/***/ }),

/***/ "./js/modules/message.js":
/*!*******************************!*\
  !*** ./js/modules/message.js ***!
  \*******************************/
/*! exports provided: Message */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Message\", function() { return Message; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Message =\n/*#__PURE__*/\nfunction () {\n  function Message() {\n    _classCallCheck(this, Message);\n\n    this._messageContainer;\n  }\n\n  _createClass(Message, [{\n    key: \"init\",\n    value: function init() {\n      this._setContainer();\n    }\n  }, {\n    key: \"show\",\n    value: function show(_ref) {\n      var text = _ref.text,\n          error = _ref.error;\n\n      var template = Message._createMessageTemplate(text, error);\n\n      this._messageContainer.insertAdjacentHTML(\"afterbegin\", template);\n    }\n  }, {\n    key: \"_setContainer\",\n    value: function _setContainer() {\n      var template = \"<div class='message-container'></div>\";\n      document.body.insertAdjacentHTML(\"afterbegin\", template);\n      this._messageContainer = document.querySelector(\".message-container\");\n    }\n  }], [{\n    key: \"_createMessageTemplate\",\n    value: function _createMessageTemplate(text, error) {\n      return \"\\n            <div class=\\\"alert \".concat(error ? 'alert-danger' : 'alert-success', \"\\\">\").concat(text, \"</div>\\n        \");\n    }\n  }]);\n\n  return Message;\n}();\n\n//# sourceURL=webpack:///./js/modules/message.js?");

/***/ }),

/***/ "./js/modules/validation.js":
/*!**********************************!*\
  !*** ./js/modules/validation.js ***!
  \**********************************/
/*! exports provided: Validation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Validation\", function() { return Validation; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Validation =\n/*#__PURE__*/\nfunction () {\n  function Validation(form) {\n    _classCallCheck(this, Validation);\n\n    this._form = form;\n    this._inputs = this._form.querySelectorAll(\"[data-pattern]\");\n  }\n\n  _createClass(Validation, [{\n    key: \"init\",\n    value: function init() {\n      this._setEvents();\n    }\n  }, {\n    key: \"check\",\n    value: function check() {\n      var state = true;\n\n      this._inputs.forEach(function (input) {\n        var regExp = new RegExp(input.dataset.pattern);\n\n        if (!regExp.test(input.value)) {\n          input.classList.add(\"is-invalid\");\n          state = false;\n        }\n      });\n\n      return state;\n    }\n  }, {\n    key: \"_setEvents\",\n    value: function _setEvents() {\n      var _this = this;\n\n      this._inputs.forEach(function (input) {\n        return input.addEventListener(\"focus\", function (e) {\n          return _this._onFocusHandler(e);\n        });\n      });\n    }\n  }, {\n    key: \"_onFocusHandler\",\n    value: function _onFocusHandler(e) {\n      e.target.classList.remove(\"is-invalid\");\n    }\n  }]);\n\n  return Validation;\n}();\n\n//# sourceURL=webpack:///./js/modules/validation.js?");

/***/ }),

/***/ "./js/services/auth.js":
/*!*****************************!*\
  !*** ./js/services/auth.js ***!
  \*****************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AuthService\", function() { return AuthService; });\n/* harmony import */ var _config_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../config/env */ \"./js/config/env.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\nvar AuthService =\n/*#__PURE__*/\nfunction () {\n  function AuthService() {\n    _classCallCheck(this, AuthService);\n  }\n\n  _createClass(AuthService, [{\n    key: \"login\",\n    value: function login(email, password) {\n      return new Promise(function (resolve, reject) {\n        fetch(\"\".concat(_config_env__WEBPACK_IMPORTED_MODULE_0__[\"env\"].apiUrl, \"/public/auth/login\"), {\n          method: \"POST\",\n          body: JSON.stringify({\n            email: email,\n            password: password\n          }),\n          headers: {\n            \"Content-type\": \"application/json\"\n          }\n        }).then(function (response) {\n          return response.json();\n        }).then(function (data) {\n          return resolve(data);\n        }).catch(function (error) {\n          return reject(error);\n        });\n      });\n    }\n  }, {\n    key: \"register\",\n    value: function register(email, password, nickname, first_name, last_name, phone, gender_orientation, city, country, date_of_birth_day, date_of_birth_month, date_of_birth_year) {\n      return new Promise(function (resolve, refect) {\n        fetch(\"\".concat(_config_env__WEBPACK_IMPORTED_MODULE_0__[\"env\"].apiUrl, \"/public/auth/signup\"), {\n          method: \"POST\",\n          body: JSON.stringify({\n            email: email,\n            password: password,\n            nickname: nickname,\n            first_name: first_name,\n            last_name: last_name,\n            phone: phone,\n            gender_orientation: gender_orientation,\n            city: city,\n            country: country,\n            date_of_birth_day: date_of_birth_day,\n            date_of_birth_month: date_of_birth_month,\n            date_of_birth_year: date_of_birth_year\n          }),\n          headers: {\n            \"Content-type\": \"application/json\"\n          }\n        }).then(function (response) {\n          return response.json();\n        }).then(function (data) {\n          return resolve(data);\n        }).catch(function (error) {\n          return reject(error);\n        });\n      });\n    }\n  }, {\n    key: \"resetPassword\",\n    value: function resetPassword(email) {\n      return new Promise(function (resolve, reject) {\n        fetch(\"\".concat(_config_env__WEBPACK_IMPORTED_MODULE_0__[\"env\"].apiUrl, \"/public/auth/reset-password\"), {\n          method: \"POST\",\n          body: JSON.stringify({\n            email: email\n          }),\n          headers: {\n            \"Content-type\": \"application/json\"\n          }\n        }).then(function (response) {\n          return response.json();\n        }).then(function (data) {\n          return resolve(data);\n        }).catch(function (error) {\n          return reject(error);\n        });\n      });\n    }\n  }]);\n\n  return AuthService;\n}();\n\n//# sourceURL=webpack:///./js/services/auth.js?");

/***/ }),

/***/ "./js/services/comments.js":
/*!*********************************!*\
  !*** ./js/services/comments.js ***!
  \*********************************/
/*! exports provided: CommentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CommentService\", function() { return CommentService; });\n/* harmony import */ var _config_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../config/env */ \"./js/config/env.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\nvar CommentService =\n/*#__PURE__*/\nfunction () {\n  function CommentService() {\n    _classCallCheck(this, CommentService);\n\n    this._token = localStorage.getItem(\"social_user_token\");\n  }\n  /**\r\n   * addComment - ����� �������� ������ ���������\r\n   * @param {string} imageId - ������������� �����������\r\n   * @param {Object} form - ����� ���������\r\n   */\n\n\n  _createClass(CommentService, [{\n    key: \"addComment\",\n    value: function addComment(id, commentText) {\n      var _this = this;\n\n      return new Promise(function (resolve, reject) {\n        fetch(\"\".concat(_config_env__WEBPACK_IMPORTED_MODULE_0__[\"env\"].apiUrl, \"/public/users/comment/\").concat(id), {\n          method: 'POST',\n          body: JSON.stringify({\n            comment_text: commentText\n          }),\n          headers: {\n            \"Content-type\": \"application/json\",\n            \"x-access-token\": _this._token\n          }\n        }).then(function (response) {\n          return response.json();\n        }).then(function (data) {\n          return resolve(data);\n        }).catch(function (error) {\n          return reject(error);\n        });\n      });\n    }\n    /**\r\n     * deleteComment - ����� �������� �����������\r\n     * @param {string} comId - ������������� �����������\r\n     * @param {string} pictureId - ������������� �����������\r\n     */\n\n  }, {\n    key: \"deleteComment\",\n    value: function deleteComment(idImg, idComments) {\n      var _this2 = this;\n\n      return new Promise(function (resolve, reject) {\n        fetch(\"\".concat(_config_env__WEBPACK_IMPORTED_MODULE_0__[\"env\"].apiUrl, \"/public/users/comment/\").concat(idComments), {\n          method: 'DELETE',\n          body: JSON.stringify({\n            image_id: idImg // image id\n\n          }),\n          headers: {\n            \"Content-type\": \"application/json\",\n            \"x-access-token\": _this2._token\n          }\n        }).then(function (response) {\n          return response.json();\n        }).then(function (data) {\n          return resolve(data);\n        }).catch(function (error) {\n          return reject(error);\n        });\n      });\n    }\n    /**\r\n     * editComment- �������������� �����������\r\n     * @param {*} comId - ������������� ����������\r\n     * @param {*} form - ����� � ���������� ��� ������������\r\n     */\n\n  }, {\n    key: \"editComment\",\n    value: function editComment(idComments, commentText) {\n      var _this3 = this;\n\n      return new Promise(function (resolve, reject) {\n        fetch(\"\".concat(_config_env__WEBPACK_IMPORTED_MODULE_0__[\"env\"].apiUrl, \"/public/users/comment/\").concat(idComments), {\n          method: 'PUT',\n          body: JSON.stringify({\n            comment_text: commentText\n          }),\n          headers: {\n            \"Content-type\": \"application/json\",\n            \"x-access-token\": _this3._token\n          }\n        }).then(function (response) {\n          return response.json();\n        }).then(function (data) {\n          return resolve(data);\n        }).catch(function (error) {\n          return reject(error);\n        });\n      });\n    }\n  }]);\n\n  return CommentService;\n}();\n\n//# sourceURL=webpack:///./js/services/comments.js?");

/***/ }),

/***/ "./js/services/image.js":
/*!******************************!*\
  !*** ./js/services/image.js ***!
  \******************************/
/*! exports provided: ImageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ImageService\", function() { return ImageService; });\n/* harmony import */ var _config_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../config/env */ \"./js/config/env.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\nvar ImageService =\n/*#__PURE__*/\nfunction () {\n  function ImageService() {\n    _classCallCheck(this, ImageService);\n\n    this._id = localStorage.getItem(\"social_user_id\");\n    this._token = localStorage.getItem(\"social_user_token\");\n  }\n  /**\r\n   * loadingPhoto - ����� �������� ���������������� ����������� �� ������, ����� fetch POST FormData\r\n   * @param {File} photo - ����������� �����������\r\n   */\n\n\n  _createClass(ImageService, [{\n    key: \"loadingPhoto\",\n    value: function loadingPhoto(file) {\n      var _this = this;\n\n      return new Promise(function (resolve, reject) {\n        var formData = new FormData();\n        formData.append(\"userPhotos\", file);\n        if (!_this._token || !_this._id) return reject(\"Error. Unauthorized.\");\n        fetch(\"\".concat(_config_env__WEBPACK_IMPORTED_MODULE_0__[\"env\"].apiUrl, \"/public/users/upload-photos/\").concat(_this._id), {\n          method: \"POST\",\n          body: formData,\n          headers: {\n            \"x-access-token\": _this._token\n          }\n        }).then(function (response) {\n          return response.json();\n        }).then(function (data) {\n          return resolve(data);\n        }).catch(function (error) {\n          return reject(error);\n        });\n      });\n    }\n    /**\r\n     * removePhoto -  ����� �������� ���������� � �������� � �������\r\n     * @param {String} photoId  -  ������������� ����������� � ��������\r\n     * @param {String} urlParametr - ����� �������������� ����������� �� �������\r\n     */\n\n  }, {\n    key: \"removePhoto\",\n    value: function removePhoto(imgId, imgUrl) {\n      var _this2 = this;\n\n      return new Promise(function (resolve, reject) {\n        fetch(\"\".concat(_config_env__WEBPACK_IMPORTED_MODULE_0__[\"env\"].apiUrl, \"/public/users/remove-photo/\").concat(_this2._id), {\n          method: 'DELETE',\n          body: JSON.stringify({\n            image_id: imgId,\n            image_url: \"users-photos/\".concat(imgUrl)\n          }),\n          headers: {\n            \"Content-type\": \"application/json\",\n            \"x-access-token\": _this2._token\n          }\n        }).then(function (response) {\n          return response.json();\n        }).then(function (data) {\n          return resolve(data);\n        }).catch(function (error) {\n          return reject(error);\n        });\n      });\n    }\n  }, {\n    key: \"getInfo\",\n    value: function getInfo(id) {\n      return new Promise(function (resolve, reject) {\n        fetch(\"\".concat(_config_env__WEBPACK_IMPORTED_MODULE_0__[\"env\"].apiUrl, \"/public/users/image-info/\").concat(id)).then(function (response) {\n          return response.json();\n        }).then(function (data) {\n          return resolve(data);\n        }).catch(function (error) {\n          return reject(error);\n        });\n      });\n    }\n  }]);\n\n  return ImageService;\n}();\n\n//# sourceURL=webpack:///./js/services/image.js?");

/***/ }),

/***/ "./js/services/search.js":
/*!*******************************!*\
  !*** ./js/services/search.js ***!
  \*******************************/
/*! exports provided: SearchService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SearchService\", function() { return SearchService; });\n/* harmony import */ var _config_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../config/env */ \"./js/config/env.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\nvar SearchService =\n/*#__PURE__*/\nfunction () {\n  function SearchService() {\n    _classCallCheck(this, SearchService);\n\n    this._token = localStorage.getItem(\"social_user_token\");\n  }\n  /**\r\n   * serchPeople - ����� ������������������ �������������\r\n   * @param {any} userName - �������� ������� ��������� ���������� � ������ ��� ������������\r\n   */\n\n\n  _createClass(SearchService, [{\n    key: \"serchPeople\",\n    value: function serchPeople(userName) {\n      var _this = this;\n\n      return new Promise(function (resolve, reject) {\n        fetch(\" \".concat(_config_env__WEBPACK_IMPORTED_MODULE_0__[\"env\"].apiUrl, \"/public/users/search-users/\"), {\n          method: 'POST',\n          body: JSON.stringify({\n            search_text: userName\n          }),\n          headers: {\n            \"Content-type\": \"application/json\",\n            \"x-access-token\": _this._token\n          }\n        }).then(function (response) {\n          return response.json();\n        }).then(function (data) {\n          return resolve(data);\n        }).catch(function (error) {\n          return reject(error);\n        });\n      });\n    }\n  }]);\n\n  return SearchService;\n}();\n\n//# sourceURL=webpack:///./js/services/search.js?");

/***/ }),

/***/ "./js/services/user.js":
/*!*****************************!*\
  !*** ./js/services/user.js ***!
  \*****************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UserService\", function() { return UserService; });\n/* harmony import */ var _config_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../config/env */ \"./js/config/env.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n/**\r\n * UserService - ���������� ��������� ���������� ������������\r\n * @class \r\n * \r\n */\n\nvar UserService =\n/*#__PURE__*/\nfunction () {\n  function UserService() {\n    _classCallCheck(this, UserService);\n  }\n\n  _createClass(UserService, [{\n    key: \"getInfo\",\n    value: function getInfo() {\n      return new Promise(function (resolve, reject) {\n        // Get token \n        var token = localStorage.getItem(\"social_user_token\"); // Get id\n\n        var id = localStorage.getItem(\"social_user_id\");\n        if (!token || !id) return reject(\"Unauthorized.\");\n        fetch(\"\".concat(_config_env__WEBPACK_IMPORTED_MODULE_0__[\"env\"].apiUrl, \"/public/users/get-info/\").concat(id), {\n          method: \"GET\",\n          headers: {\n            \"x-access-token\": token\n          }\n        }).then(function (response) {\n          return response.json();\n        }).then(function (data) {\n          return resolve(data);\n        }).catch(function (error) {\n          return reject(error);\n        });\n      });\n    }\n    /**\r\n     * uploadCover - ����� �������� ����� ��� ��������� ����, ����� Form Data ������� �������� ���\r\n     * �������� �� ������, ��������� � ���� ���� � ����������� ��� ��� ����� formData.append(\"coverImg\", file)\r\n     * ������� ������ � ��������� �� ��������� ��������� � ���������� POST  ������ �� ������ � ������\r\n     * � ������� \"x-access-token\": token\r\n     * @param {File} file - ����������� ����������� \r\n     */\n\n  }, {\n    key: \"uploadCover\",\n    value: function uploadCover(file) {\n      return new Promise(function (resolve, reject) {\n        var formData = new FormData();\n        formData.append(\"coverImg\", file); // Get token\n\n        var token = localStorage.getItem(\"social_user_token\"); // Get user id\n\n        var id = localStorage.getItem(\"social_user_id\");\n        if (!token || !id) return reject(\"Error. Unauthorized.\");\n        fetch(\"\".concat(_config_env__WEBPACK_IMPORTED_MODULE_0__[\"env\"].apiUrl, \"/public/users/upload-cover/\").concat(id), {\n          method: \"POST\",\n          body: formData,\n          headers: {\n            \"x-access-token\": token\n          }\n        }).then(function (response) {\n          return response.json();\n        }).then(function (data) {\n          return resolve(data);\n        }).catch(function (error) {\n          return reject(error);\n        });\n      });\n    }\n  }]);\n\n  return UserService;\n}();\n\n//# sourceURL=webpack:///./js/services/user.js?");

/***/ }),

/***/ "./js/ui/image.js":
/*!************************!*\
  !*** ./js/ui/image.js ***!
  \************************/
/*! exports provided: ImageUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ImageUI\", function() { return ImageUI; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar ImageUI =\n/*#__PURE__*/\nfunction () {\n  function ImageUI() {\n    _classCallCheck(this, ImageUI);\n\n    this._imagesContainer = document.querySelector(\".images-wrap .row\");\n  }\n  /**\r\n   * ������� ����������� � ��������\r\n   * @param {file} image - ����������� \r\n   */\n\n\n  _createClass(ImageUI, [{\n    key: \"addImage\",\n    value: function addImage(image) {\n      console.log(image);\n\n      var template = ImageUI._createImageTemplate(image);\n\n      this._imagesContainer.insertAdjacentHTML(\"afterbegin\", template);\n    }\n    /**\r\n     * ������� ��������\r\n     */\n\n  }, {\n    key: \"clearContainer\",\n    value: function clearContainer() {\n      this._imagesContainer.innerHTML = \"\";\n    }\n    /**\r\n     * �������� �������� ��� ����������� ������ �����������\r\n     * @param {string} url -������\r\n     * @param {object} views - ���������� ����������\r\n     * @param {object} likes ���������� ������\r\n     * @param {string} _id �������������  \r\n     */\n\n  }], [{\n    key: \"_createImageTemplate\",\n    value: function _createImageTemplate(_ref) {\n      var url = _ref.url,\n          views = _ref.views,\n          likes = _ref.likes,\n          _id = _ref._id;\n      return \"\\n        <div class=\\\"col-4 col\\\">\\n            <div class=\\\"img-wrap\\\" data-img-id=\\\"\".concat(_id, \"\\\">\\n                <img src=\\\"\").concat(url, \"\\\" alt=\\\"\\\">\\n                <div class=\\\"on-hover d-flex flex-column justify-content-between\\\">\\n                    <div class=\\\"remove-wrap d-flex\\\">\\n                        <i class=\\\"fas fa-trash-alt ml-auto\\\"></i>\\n                    </div>\\n\\n                    <div class=\\\"img-info d-flex align-items-center\\\">\\n                        <span class=\\\"views-count d-flex align-items-center\\\">\\n                            <i class=\\\"fas fa-eye\\\"></i>\\n                            \").concat(views.length, \"\\n                        </span>\\n                        <span class=\\\"likes-count d-flex align-items-center ml-5\\\">\\n                            <i class=\\\"fas fa-thumbs-up\\\"></i>\\n                            \").concat(likes.length, \"\\n                        </span>\\n                        \\n                    </div>\\n                </div>\\n            </div>\\n        </div>\\n        <!-- /.col-4 col -->\\n        \");\n    }\n  }]);\n\n  return ImageUI;\n}();\n\n//# sourceURL=webpack:///./js/ui/image.js?");

/***/ }),

/***/ "./js/ui/imageModal.js":
/*!*****************************!*\
  !*** ./js/ui/imageModal.js ***!
  \*****************************/
/*! exports provided: ImageModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ImageModal\", function() { return ImageModal; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/**\r\n * ImageModal - ����� ��������� ������ ����������� � ��������� �� � ��������� ����\r\n */\nvar ImageModal =\n/*#__PURE__*/\nfunction () {\n  function ImageModal() {\n    _classCallCheck(this, ImageModal);\n\n    this._imageInfoContainer = document.querySelector(\"#imageModal .current-image-info\");\n    this._imageCommentsWrap = document.querySelector(\".current-image-comments-wrap\");\n    this._imgTag = document.querySelector(\".current-image img\");\n    this._commentContainer = document.querySelector(\".current-image-comments-wrap\");\n    this._loader = document.getElementById(\"loading\");\n    this._form = document.forms[\"addComments\"];\n  }\n  /**\r\n   * renderInfo - �������������� ��� ������ ������\r\n   * @param {Object} image - ���������� ���������� � ��������\r\n   */\n\n\n  _createClass(ImageModal, [{\n    key: \"renderInfo\",\n    value: function renderInfo(image) {\n      this.clearModal();\n      this.setBaseInfo(image);\n      this.setImg(image);\n      this.setIdComment(image);\n      this.setComments(image);\n      this.loaderToggle();\n    }\n  }, {\n    key: \"setNewComments\",\n    value: function setNewComments(comments) {\n      this.clearComent();\n      this.setComments(comments);\n    }\n  }, {\n    key: \"loaderToggle\",\n    value: function loaderToggle() {\n      this._loader.classList.toggle(\"hidden\");\n    }\n    /**\r\n     * setBaseInfo - ���������� ������ �������� ��������������� ���� �������� � ��������� �������\r\n     * @param {Object} image - �����������\r\n     */\n\n  }, {\n    key: \"setBaseInfo\",\n    value: function setBaseInfo(image) {\n      var template = ImageModal._basicInfoTemplate(image);\n\n      this._imageInfoContainer.insertAdjacentHTML(\"afterbegin\", template);\n    }\n    /**\r\n    * setImg -  ������� ����������� � ����� ����\r\n    * @param {addres} url  - ��������� ������ �����������\r\n    */\n\n  }, {\n    key: \"setImg\",\n    value: function setImg(_ref) {\n      var url = _ref.url;\n      this._imgTag.src = url;\n    }\n  }, {\n    key: \"setIdComment\",\n    value: function setIdComment(_ref2) {\n      var _id = _ref2._id;\n      this._form.dataset.commentId = _id;\n    }\n  }, {\n    key: \"setComments\",\n    value: function setComments(_ref3) {\n      var comments = _ref3.comments,\n          owner = _ref3.owner;\n      var template = \"\";\n      comments.forEach(function (comment) {\n        return template += ImageModal._commentTemplate(comment, owner);\n      });\n\n      this._commentContainer.insertAdjacentHTML(\"afterbegin\", template);\n    }\n    /**\r\n     * clearModal - ������� ���������� � ����������� ���������� �������\r\n     */\n\n  }, {\n    key: \"clearModal\",\n    value: function clearModal() {\n      this._imageInfoContainer.innerHTML = \"\";\n    }\n    /**\r\n     * _commentTemplate - ������� �������\r\n     * @param {object} param0  - ���������� � ��������\r\n     * @param {*} _id - �������������\r\n     */\n\n  }], [{\n    key: \"_commentTemplate\",\n    value: function _commentTemplate(_ref4, _ref5) {\n      var owner = _ref4.owner,\n          avatar = _ref4.avatar,\n          full_name = _ref4.full_name,\n          text = _ref4.text,\n          time_update = _ref4.time_update,\n          sub_comments = _ref4.sub_comments;\n      var _id = _ref5._id;\n      var currentUserId = localStorage.getItem(\"social_user_id\");\n      var isOwner = currentUserId == owner || currentUserId == _id;\n      return \"\\n        <div class=\\\"comment-item mb-4\\\">\\n            <div class=\\\"comment-item-details d-flex\\\">\\n                <div class=\\\"comment-owner-avatar\\\">\\n                    <img src=\\\"\".concat(avatar, \"\\\" alt=\\\"\\\">\\n                </div>\\n                <!-- /.comment-owner -->\\n                <div class=\\\"comment-item-info d-flex flex-column\\\">\\n                    <h6 class=\\\"font-weight-bold\\\">\").concat(full_name, \"</h6>\\n                    <p>\").concat(text, \"</p>\\n                    <span class=\\\"text-secondary\\\">\").concat(time_update, \"</span>\\n                </div>\\n                <!-- /.comment-item-info -->\\n                <div class=\\\"ml-auto\\\">\\n                    \").concat(isOwner ? '<i class=\"fas fa-edit\"></i> <i class=\"fas fa-trash-alt\"></i>' : '', \"\\n                </div>\\n            </div>\\n            <!-- /.comment-item-details -->\\n            <div class=\\\"sub-comments\\\"></div>\\n            <!-- /.sub-comments -->\\n        </div>\\n        <!-- /.comment-item -->\\n        \");\n    }\n  }, {\n    key: \"_basicInfoTemplate\",\n    value: function _basicInfoTemplate(_ref6) {\n      var owner = _ref6.owner,\n          views = _ref6.views,\n          likes = _ref6.likes;\n      return \"\\n            <div class=\\\"owner-info d-flex align-items-center\\\">\\n                <div class=\\\"owner-avatar\\\">\\n                    <img src=\\\"\".concat(owner.avatar, \"\\\" alt=\\\"\\\">\\n                </div>\\n                <!-- /.owner-avatar -->\\n                <div class=\\\"d-flex flex-column\\\">\\n                    <span class=\\\"font-weight-bold\\\">\").concat(owner.full_name, \"</span>\\n                    <span class=\\\"text-secondary\\\">\").concat(owner.city, \"</span>\\n                </div>\\n            </div>\\n            <!-- /.owner-info -->\\n            <div class=\\\"current-image-stats d-flex ml-auto\\\">\\n                <div class=\\\"views-count d-flex flex-column align-items-center\\\">\\n                    <i class=\\\"fas fa-eye\\\"></i>\\n                    <span class=\\\"font-weight-bold\\\">\").concat(views.length, \"</span>\\n                </div>\\n                <div class=\\\"likes-count d-flex flex-column align-items-center ml-4\\\">\\n                    <i class=\\\"fas fa-thumbs-up\\\"></i>\\n                    <span class=\\\"font-weight-bold\\\">\").concat(likes.length, \"</span>\\n                </div>\\n            </div>\\n            <!-- /.image-sstatistics -->\\n        \");\n    }\n  }]);\n\n  return ImageModal;\n}();\n\n//# sourceURL=webpack:///./js/ui/imageModal.js?");

/***/ }),

/***/ "./js/ui/search.js":
/*!*************************!*\
  !*** ./js/ui/search.js ***!
  \*************************/
/*! exports provided: SearchUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SearchUI\", function() { return SearchUI; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar SearchUI =\n/*#__PURE__*/\nfunction () {\n  function SearchUI() {\n    _classCallCheck(this, SearchUI);\n\n    this._searchWraper = document.querySelector(\".search-result\");\n  }\n\n  _createClass(SearchUI, [{\n    key: \"addSerch\",\n    value: function addSerch(info) {\n      var template = SearchUI._searchTemplate(info);\n\n      this._searchWraper.insertAdjacentHTML(\"afterbegin\", template);\n    }\n  }, {\n    key: \"clearContainer\",\n    value: function clearContainer() {\n      this._searchWraper.innerHTML = \"\";\n    }\n  }], [{\n    key: \"_searchTemplate\",\n    value: function _searchTemplate(_ref) {\n      var avatar = _ref.avatar,\n          city = _ref.city,\n          full_name = _ref.full_name;\n      return \"\\n        <div class=\\\"owner-info d-flex align-items-center\\\">\\n            <div class=\\\"owner-avatar\\\">\\n                <img src=\\\"\".concat(avatar, \"\\\" alt=\\\"\\\">\\n            </div>\\n            <!-- /.owner-avatar -->\\n            <div class=\\\"d-flex flex-column\\\">\\n                <span class=\\\"font-weight-bold\\\">\").concat(full_name, \"</span>\\n                <span>\").concat(city, \"</span>\\n            </div>\\n        </div>\\n        \");\n    }\n  }]);\n\n  return SearchUI;\n}();\n\n//# sourceURL=webpack:///./js/ui/search.js?");

/***/ }),

/***/ "./js/ui/user.js":
/*!***********************!*\
  !*** ./js/ui/user.js ***!
  \***********************/
/*! exports provided: UserUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UserUI\", function() { return UserUI; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/**\r\n * UserUI - ����� ����������� ���������� ������������\r\n * \r\n */\nvar UserUI =\n/*#__PURE__*/\nfunction () {\n  /**\r\n   * ����������� ������������ �������� ���������� ��� ������ ���������� ������������\r\n   */\n  function UserUI() {\n    _classCallCheck(this, UserUI);\n\n    this._cover = document.querySelector(\".user-cover\");\n    this._userAvatar = document.querySelector(\".user-ava\");\n    this._userName = document.querySelector(\".user-name\");\n  }\n\n  _createClass(UserUI, [{\n    key: \"clearContainer\",\n    value: function clearContainer() {\n      this._userAvatar.innerHTML = \"\";\n    }\n    /**\r\n    * renderUserInfo - ����� ����������� ����� �������, ��������� �� ��������������������\r\n    * ��� ���������� ���������\r\n    * @param {string} avatar - ������������� �����������\r\n    * @param {file} cover - ���\r\n    * @param {string} full_name - ��� ������������\r\n    */\n\n  }, {\n    key: \"renderUserInfo\",\n    value: function renderUserInfo(_ref) {\n      var avatar = _ref.avatar,\n          cover = _ref.cover,\n          full_name = _ref.full_name;\n      this.setUserCover(cover);\n      this.setAvatar(avatar);\n      this.setName(full_name);\n    }\n    /**\r\n    * setUserCover - ����� ������ ����\r\n    * @param {*} url - ���� � ����������� (������?)\r\n    */\n\n  }, {\n    key: \"setUserCover\",\n    value: function setUserCover(url) {\n      this._cover.style.background = \"url(\\\"\".concat(url, \"\\\") no-repeat center / cover\");\n    }\n    /**\r\n    * setAvatar - ����� ������� �������� ������, ������� ����� ��� �����������\r\n    * @param {*} url - ���� � �����������\r\n    */\n\n  }, {\n    key: \"setAvatar\",\n    value: function setAvatar(url) {\n      var template = \"<img src=\\\"\".concat(url, \"\\\" alt=\\\"\\\">\");\n\n      this._userAvatar.insertAdjacentHTML(\"afterbegin\", template);\n    }\n    /**\r\n    * setName -  ������� ����� ������������ �� ��������\r\n    * @param {String} name - ��� ������������\r\n    */\n\n  }, {\n    key: \"setName\",\n    value: function setName(name) {\n      this._userName.textContent = name;\n    }\n  }]);\n\n  return UserUI;\n}();\n\n//# sourceURL=webpack:///./js/ui/user.js?");

/***/ })

/******/ });