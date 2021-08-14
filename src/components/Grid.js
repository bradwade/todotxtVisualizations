import React from 'react';
import WorkflowMenu from './WorkflowMenu';
import Filter from './Filter';


const Grid = (props) => {
    if (!props.todo) { return null; }

    const bigFilter = (todoItem) => {
      return todoItem.wf == props.workflow;
    }

    // This sorts list by priority
    props.todo.sort(function(a, b) {
      if (a.priority == null && b.priority == null) return 0;
      if (a.priority == null || a.priority > b.priority) {
        return 1;
      }
      if (b.priority == null || a.priority < b.priority) {
        return -1;
      }
      return 0;
    });

    return (
      <div className="grid-view">
        <div className="grid-column">
          <Filter />
        </div>
        <div className="grid-column">
          <WorkflowMenu setWorkflow={props.setWorkflow} todo={props.todo} workflow={props.workflow}/>
          <table id="todoTable">
            <thead>
              <tr>
                <th>P</th>
                <th>X</th>
                <th>Status</th>
                <th>Date</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody className="table-body">
            {props.todo.filter(bigFilter).map((row, key) => (
              <tr key={key} className={(key % 2 === 0) ? 'odd' : 'even'}>
                <td className="priority">{(row.priority ? row.priority : '')}</td>
                <td className="complete">{row.complete ? 'X' : ''}</td>
                <td className="workflow">{row.wf ? row.wf : ''}</td>
                <td className="date">
                  <div className="date__due">Due: {row.dueString ? row.dueString : ''}</div>
                  <div className="date__done">Done: {row.dateString() ? row.dateString() : ''}</div>  
                </td>
                <td className="task">
                  <div className="description">{row.text}</div>
                  <div className="project">Project: {row.projects ? row.projects : ''}</div>
                  <div className="context">Context: {row.contexts ? row.contexts : ''}</div>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default Grid;
