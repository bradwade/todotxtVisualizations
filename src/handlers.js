import { utilities } from './utilities.js';

export const handlers = {

  handleFileInput: function (e) {
    utilities.processFiles(e.target.files);
  },

  handleDropboxDragenter: function (e) {
    e.stopPropagation();
    e.preventDefault();
  },

  handleDropboxDragover: function (e) {
    e.stopPropagation();
    e.preventDefault();
  },

  handleDropboxDrop: function (e) {
    e.stopPropagation();
    e.preventDefault();
    utilities.processFiles(e.dataTransfer.files);
  }
}
