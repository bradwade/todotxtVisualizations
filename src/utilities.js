import { TodoTxt } from 'jstodotxt';
import { TodoTxtExtension, DueExtension } from '../node_modules/jstodotxt/jsTodoExtensions.js';
import { WorkflowExtension, DueExtension2 } from './myJsTodoExtensions';

// https://github.com/jmhobbs/jsTodoTxt/issues/20
// A line in TodoTxt is testing if the custom extensions are instances of
// TodoTxtExtension, but TodoTxtExtension is not defined in TodoTxt's scope.
// ( this.extensions[i] instanceof TodoTxtExtension)
// Workaround by attaching it to the window.
window.TodoTxtExtension = TodoTxtExtension;

export const utilities = {

  processFiles: function(fileList) {
    const filesReader = new FileReader();
    Array.from(fileList).map(file => {
      dropbox.textContent = `Viewing ${file.name}.`;
      filesReader.readAsText(file);
    });

    filesReader.onload = function(e) {
      const textBlob = e.target.result;
      const todoArray = utilities.textToArray(textBlob);

      textDisplayArea.textContent = textBlob;
      utilities.fillTable(todoArray);
    }
  },

  fillTable: function(todoArray) {
    const tableContents = document.querySelector('.table-body');
    tableContents.textContent = '';
    todoArray.forEach(function(row, i){
      const tableRow = `<tr class="${(i % 2 === 0) ? 'odd' : 'even'}">
        <td class="priority">${(row.priority ? row.priority : '')}</td>
        <td class="complete">${row.complete ? 'X' : ''}</td>
        <td class="workflow">${row.wf ? row.wf : ''}</td>
        <td class="due-date">${row.dueString ? row.dueString : ''}</td>
        <td class="date">${row.dateString() ? row.dateString() : ''}</td>
        <td class="description">${row.text}</td>
        <td class="project">${row.projects ? row.projects : ''}</td>
        <td class="context">${row.contexts ? row.contexts : ''}</td>
      </tr>`;
      tableContents.insertAdjacentHTML('beforeend', tableRow);
    });
  },

  textToArray: function(textBlob) {
    //TODO: Get jstodotxt extensions working.
    const todoArray = TodoTxt.parse( textBlob, [ 
      new WorkflowExtension(),
      new DueExtension2(),
    ] );
    return todoArray;
  }

}