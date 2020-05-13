import { handlers } from './handlers.js';
import { defaultTodo } from './data.js';
import { textToArray } from './handlers.js';
import { utilities } from './utilities.js';

// https://kyleamathews.github.io/typography.js/
import Typography from 'typography';
import grandView from 'typography-theme-grand-view';
const typography = new Typography(grandView);
// export const { scale, rhythm, options } = typography
// export default typography
typography.injectStyles();

const inputElement = document.getElementById("todoFile");
const dropbox = document.getElementById("dropbox");


inputElement.addEventListener("change", handlers.handleFileInput, false);
dropbox.addEventListener("dragenter", handlers.handleDropboxDragenter, false);
dropbox.addEventListener("dragover", handlers.handleDropboxDragover, false);
dropbox.addEventListener("drop", handlers.handleDropboxDrop, false);


function loadInitialData(initialData) {
  let todoArray = utilities.textToArray(initialData);
  console.log(todoArray);
  textDisplayArea.textContent = initialData;
  todoArray.sort(function(a, b) {
    if (a.priority == null && b.priority == null) return 0;
    if (a.priority == null || a.priority > b.priority) {
      return 1;
    }
    if (b.priority == null || a.priority < b.priority) {
      return -1;
    }
    return 0;
  });
  console.log(todoArray)
  utilities.fillTable(todoArray);
}

loadInitialData(defaultTodo);


