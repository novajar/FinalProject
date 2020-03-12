import React, { Component } from 'react';
import './Card.css';
import { Input, Carousel, Button, Avatar } from 'antd';
import 'antd/dist/antd.css';
import { DownloadOutlined } from '@ant-design/icons';
import Gallery from 'react-photo-gallery';
import { Link } from 'react-router-dom';

export default class CardHome extends Component {
  render() {
    const style = {
      1: 'width-50',
      2: 'width-75',
      3: 'width-100',
      4: 'width-250p',
      5: 'jumbo',
      6: 'thematic'
    };
    const tipeJumbo = {
      1: 'header',
      2: 'bawah'
    };
    const { Search } = Input;
    const {
      theme,
      h1,
      content,
      image,
      footer,
      themeTJ,
      gallery,
      testi,
      search,
      button
    } = this.props;
    // const gambar = gallery => gallery.filter(x => x.tipe === 'nature');

    return (
      <>
        <div className={`card ${style[theme]} ${tipeJumbo[themeTJ]}`}>
          <h1>{h1}</h1>
          <span>
            <p>{content}</p>
          </span>
          {search ? (
            <>
              {/* <input type="text" placeholder="search..." className="cari" />{' '}
              <SearchOutlined /> */}
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                enterButton
                style={{ width: 600, height: 150, borderRadius: '5px' }}
              />
            </>
          ) : (
            ''
          )}
          {button ? (
            <Link to="/poto">
              {' '}
              <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                size="large"
              >
                {button}
              </Button>
            </Link>
          ) : (
            ''
          )}
        </div>

        {gallery ? (
          <>
            <div className="poto">
              <Gallery photos={gallery} />{' '}
              <span
              // style={{
              //   color: 'hotpink',
              //   textAlign: 'center',
              //   fontSize: '30px',
              //   margin: 'auto',
              //   alignContent: 'center'
              // }}
              ></span>
            </div>
          </>
        ) : (
          ''
        )}
        {testi ? (
          <div className="testCarousel">
            <Carousel
              style={{ width: '100%', height: '250px' }}
              effect="fade"
              autoplay
            >
              {testi.map(xx => (
                <span>
                  <h3>
                    <Avatar shape="round" size={125} src={xx.ava} />
                    <p>{xx.testi}</p>
                  </h3>
                </span>
              ))}
            </Carousel>
          </div>
        ) : (
          ''
        )}
      </>
    );
  }
}
