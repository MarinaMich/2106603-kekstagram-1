import {displayUserPictures} from './gallery.js';
import {openSelectionPicture} from './big-picture.js';
import {setImgFormSubmit, imgUploadCancel} from './editing-form.js';
import './effects.js';
import {getData, sendData} from './api.js';
import {showAlert, debounce} from './util.js';
import {showMessage} from './message-form.js';
import {onFilterClick} from './gallery-filters.js';

const RERENDER_DELAY = 500;

try {
  const picture = await getData();
  displayUserPictures(picture);
  onFilterClick(debounce(
    () => displayUserPictures(picture),
    RERENDER_DELAY,
  ));
  openSelectionPicture(picture);
} catch(err) {
  showAlert(err.message);
}

setImgFormSubmit(async (data) => {
  try {
    await sendData(data);
    imgUploadCancel();
    showMessage('success');
  } catch {
    showMessage('error');
  }
});
