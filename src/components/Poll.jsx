import React from 'react';

const Poll = (props) => {
  const options = props.poll.options.map((option, i) => {
    return (
      <div>
        <li key={i + 1}>{option[0]} {option[1]}</li>
        <button key={`key is ${i}`} onClick={() => props.handleClick(props.id, i + 1)}>Vote</button>
      </div>
    );
  });

  return (
    <div>
      <h1>{props.poll.title}</h1>
      <ul>{options}</ul>
    </div>
  );
};

export default Poll;
