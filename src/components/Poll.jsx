import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import styles from '../styles/Poll.css';

const Poll = (props) => {
  const options = props.poll.options.map((option, i) => {
    return (
      <div style={{ float: 'left' }}>
        <p className={ styles.poll } key={i + 1}>{option[0]}</p>
        <button key={`key is ${i}`} onClick={() => props.handleClick(props.id, i + 1)}>Vote</button>
      </div>
    );
  });

  const labels = [];
  const entries = [];

  props.poll.options.forEach((item) => {
    labels.push(item[0]);
    entries.push(parseFloat(item[1]));
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Results',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: entries,
      },
    ],
  };

  // not working yet for begin at zero
  const optionsBar = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0,
        },
      }],
    },
  };

  return (
    <div>
      <h1>{props.poll.title}</h1>
      <HorizontalBar data={data} options={optionsBar} />
      <span>{options}</span>
    </div>
  );
};

export default Poll;
