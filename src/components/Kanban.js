import React from 'react';

function Kanban(props) {
  const workFlows = new Set();
  props.todo.forEach((item) => typeof item.wf !== 'undefined' && workFlows.add(item.wf));

  return (
    <div className="kanban-view">
      <div className="column">a column</div>
      <div className="column">a column</div>
      <div className="column">a column</div>
      <div className="column">a column</div>
      <div className="column">a column</div>
    </div>
  );
}

export default Kanban;
