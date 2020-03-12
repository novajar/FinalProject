import React, { Component } from 'react';
import './Content.module.css';
import Card from '../Cards/CardHome.js';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      theme,
      title,
      showList,
      content,
      image,
      themeTJ,
      gallery,
      search,
      testi,
      button
    } = this.props;
    return (
      <>
        <div>
          {/* {title ? <p>{title}</p> : ''} */}
          {showList && (
            <Card
              theme={theme}
              h1={title}
              content={content}
              image={image}
              themeTJ={themeTJ}
              gallery={gallery}
              search={search}
              testi={testi}
              button={button}
            />
          )}
        </div>
      </>
    );
  }
}
