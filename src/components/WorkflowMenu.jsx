import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const WorkflowMenu = (props) => {

  // This function counts instances of elements in an array
  // the return object has the array elements as keys
  // and number of occurrences as it's value
  const arrToInstanceCountObj = arr => arr.reduce((obj, e) => {
    obj[e] = (obj[e] || 0) + 1;
    return obj;
  }, {});

  const wfCountObj = arrToInstanceCountObj(props.todo.map(item=>item.wf));

  const wfArray = ['new', 'doing', 'done', 'blocked'];

  const handleWorkflowChange = (e) => {
    props.setWorkflow(e.target.closest('button').value);
    const cf = props.currentFilters;
    cf.workflow = e.target.closest('button').value;
    props.setCurrentFilters(cf);
    props.filterTodo();
  }

  return (
    <div className="workflow-menu">
      <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
        {wfArray.map((wf, key) => (
          <Button key={key} disabled={props.workflow == wf} value={wf} onClick={handleWorkflowChange}>
            {wf} ({wfCountObj[wf]})
          </Button>
        ))}
      </ButtonGroup>
    </div>
  )
}

export default WorkflowMenu;