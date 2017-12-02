import React, { Component } from 'react';
import Poll from './Poll';

const pollsList = [];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      polls: pollsList,
    };

    this.updateCount = this.updateCount.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:7777/api/polls')
      .then((response) => {
        response.json().then((data) => {
          this.setState(Object.assign(
            this.state,
            { polls: data },
          ));
        });
      });
  }

  updateCount(id, option) {
    const info = {
      id,
      option,
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch('http://localhost:7777/api/polls', {
      method: 'POST',
      headers,
      body: JSON.stringify(info),
    }).then((response) => {
      response.json().then((newdata) => {
        this.setState(Object.assign(
          this.state,
          { polls: newdata },
        ));
      });
    });
  }

  render() {
    const results = [];
    this.state.polls.forEach((item) => {
      results.push(<Poll poll={item} key={item._id} id={item._id} handleClick={this.updateCount} />);
    });

    return (
      <div>
        { results }
      </div>
    );
  }
}

export default App;
