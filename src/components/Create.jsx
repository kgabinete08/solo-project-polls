import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      options: [{ option: '' }],
      fireRedirect: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { title, options } = this.state;
    event.preventDefault();

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const info = {
      title,
      options,
    };

    fetch('http://localhost:7777/api/create', {
      method: 'POST',
      headers,
      body: JSON.stringify(info),
    }).then((response) => {
      response.json().then((newdata) => {
        this.setState(Object.assign(
          this.state,
          { polls: newdata, fireRedirect: true },
        ));
      });
    });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleAddOption() {
    this.setState({ options: this.state.options.concat([{ option: '' }]) });
  }

  handleOptionChange(event, idx) {
    const newOptions = this.state.options.map((item, oidx) => {
      if (idx !== oidx) return item;
      return { option: event.target.value };
    });

    this.setState({ options: newOptions });
  }

  render() {
    const inputStyle = {
      width: '30%',
      padding: '12px 20px',
      margin: '8px 0',
      boxSizing: 'border-box',
      fontSize: '2em',
    };

    const buttonStyle = {
      backgroundColor: 'grey',
      padding: '0.8em',
      fontSize: '1.5em',
    };

    return (
      <div>
        <h1>Create Poll</h1>
        <form onSubmit={this.handleSubmit}>
          <h3>Title</h3>
          <input
            type="text"
            placeholder="Enter title here..."
            value={this.state.title}
            onChange={this.handleTitleChange}
            style={inputStyle}
          />

          <h3>Options</h3>

          {this.state.options.map((item, idx) => (
            <div>
              <input
                type="text"
                placeholder="Add option..."
                value={item.option}
                onChange={e => this.handleOptionChange(e, idx)}
                key={item}
                style={inputStyle}
              />
            </div>
          ))}
          <button type="button" onClick={this.handleAddOption} style={buttonStyle}>Add another option +</button>
          <button style={buttonStyle}>Submit</button>
        </form>
        {this.state.fireRedirect && <Redirect to="/" />}
      </div>
    );
  }
}

export default Create;
