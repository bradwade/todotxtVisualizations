function WorkflowExtension() {
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
