import {displayUserPictures} from './gallery.js';
import {openSelectionPicture} from './big-picture.js';
import {setImgFormSubmit, onImgUploadCancel} from './editing-form.js';
import './effects.js';
import {getData, sendData} from './api.js';
import {showAlert, debounce} from './util.js';
import {showMessage} from './message-form.js';
import {onFilterClick} from './gallery-filters.js';
import './img-to-upload.js';

const RERENDER_DELAY = 500;

const onSuccess = (pictures) => {
  displayUserPictures(pictures);
  onFilterClick(debounce(
    () => displayUserPictures(pictures),
    RERENDER_DELAY,
  ));
  openSelectionPicture(pictures);
};

const onError = (err) => {
  showAlert(err);
};

getData(onSuccess, onError);

const onSuccessForm = () => {
  onImgUploadCancel();
  showMessage('success');
};

const onErrorForm = () => {
  showMessage('error');
};

setImgFormSubmit(async (data) => {
  await sendData(onSuccessForm, onErrorForm, data);
});
