import { TodoTxt } from 'jstodotxt';
import { TodoTxtExtension } from '../node_modules/jstodotxt/jsTodoExtensions.js';
export function WorkflowExtension() {
    this.name = "wf";
}
WorkflowExtension.prototype = new TodoTxtExtension();
WorkflowExtension.prototype.parsingFunction = function(line) {
    var workflow = null;
    var workflowRegex = /wf:(\S*)\s*/;
    var matchWorkflow = workflowRegex.exec(line);
    if ( matchWorkflow !== null ) {
        workflow = matchWorkflow[1];
        return [workflow, line.replace(workflowRegex, ''), workflow[1]];
    }
    return [null, null, null];
};

export function DueExtension2() {
    this.name = "due";
}
DueExtension2.prototype = new TodoTxtExtension();
DueExtension2.prototype.parsingFunction = function(line) {
    var dueDate = null;
    var dueRegex = /due:([0-9]{4}-[0-9]{1,2}-[0-9]{1,2})\s*/;
    var matchDue = dueRegex.exec(line);
    if ( matchDue !== null ) {
        const datePieces = matchDue[1].split('-');
        dueDate = new Date( datePieces[0], datePieces[1], datePieces[2] );
        return [new Date(), line.replace(dueRegex, ''), matchDue[1]];
    }
    return [null, null, null];
};