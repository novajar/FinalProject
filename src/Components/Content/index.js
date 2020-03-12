import React, { Component } from 'react';
import './Content.module.css';
import Card from '../Cards';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { theme, title, showList, content, className } = this.props;

    return (
      <div className={className}>
        {title ? <p>{title}</p> : ''}
        {showList && <Card theme={theme} content={content} />}
      </div>
    );
  }
}
