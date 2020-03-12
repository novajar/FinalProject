import React, { Component } from 'react';
import './Section.css';
import Card from '../Cards/Card.js';

export default class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { theme, title, showList, content } = this.props;
    return (
      <div className="Section">
        <head>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
            rel="stylesheet"
          ></link>
        </head>
        <p>{title}</p>
        {showList && <Card theme={theme} content={content} />}
      </div>
    );
  }
}
