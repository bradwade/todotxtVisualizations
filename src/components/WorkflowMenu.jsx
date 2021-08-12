import React, {useState} from 'react';

const WorkflowMenu = (props) => {

  // This function counts instances of elements in an array
  // the return object has the array elements as keys
  // and number of occurrences as it's value
  const arrToInstanceCountObj = arr => arr.reduce((obj, e) => {
    obj[e] = (obj[e] || 0) + 1;
    return obj;
  }, {});

  console.log(props.todo.map(item=>item.wf));

  const wfCountObj = arrToInstanceCountObj(props.todo.map(item=>item.wf));

  const wfArray = ['new', 'doing', 'done', 'blocked'];

  console.log(wfCountObj);

  return (
    <div className="workflow-menu">
      {wfArray.map((wf, key) => (
        <button key={key} disabled={props.workflow == wf} onClick={() => props.setWorkflow(wf)}>
          {wf} ({wfCountObj[wf]})
        </button>
      ))}
    </div>
  )
}

export default WorkflowMenu;