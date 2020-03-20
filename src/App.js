import React, { useState, useCallback, Component } from 'react';
import Navbar from './Components/Navbar';
import ArrayMap from './Components/ArrayMap';
import Content from './Components/Content';
import ContentHome from './Components/Content/home.js';
// import Work from './Components/Content/work.js';
import Contact from './Components/Content/contact.js';
import Poto from './Components/Content/galleryV2.js';
import Vendor from './Components/Content/Vendor.js';
import VendorList from './Components/Content/VendorList.js';
import Cart from './Components/Content/Cart.js';
import Product from './Components/Content/Product.js';
import { testi } from './Data/testimoni.js';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { photos, tags, top } from './Data/photo';
import { Affix } from 'antd';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [
      //   {
      //     title: '',
      //     nocard: true,
      //     content: 'test konten1',
      //     theme: 4,
      //     className: 'gambar'
      //   },
      //   {
      //     title: '',
      //     nocard: true,
      //     content: 'test konten1',
      //     theme: 4,
      //     className: 'gambar'
      //   }
      // ],
      home: {
        footer: 'Start Selling Your Photos Today. View plans and pricing',
        data: [
          {
            title: 'Join our Community & Start Earning',
            content:
              'Take a look at what the world’s best photographers have to offer.',
            button: '',
            nocard: true,
            theme: 5,
            themeTJ: 1,
            gallery: '',
            testi: '',
            search: true
          },
          {
            title: 'Thematic Galleries for Inspiration',
            content: 'The Most Inspiring Images from our Authors',
            button: '',
            nocard: true,
            theme: 6,
            themeTJ: '1',
            gallery: tags,
            testi: '',
            search: false
          },
          {
            title: 'Top Selling Collection of Images',
            content: 'Discover Creative Royalty-free Images & Illustrations',
            button: '',
            nocard: true,
            theme: 6,
            themeTJ: '',
            gallery: top,
            testi: '',
            search: false
          },
          {
            title: 'Testimonials',
            content: 'What our Photographers Say',
            button: '',
            nocard: true,
            theme: 6,
            themeTJ: '',
            gallery: '',
            testi: testi,
            search: false
          },
          {
            title: '',
            content: 'Explore Unlimited Popular Pixefy Collections',
            button: 'Getting Started',
            nocard: true,
            theme: 5,
            themeTJ: 2,
            gallery: '',
            testi: '',
            search: false
          }
        ]
      }
    };
  }

  render() {
    const { data, home } = this.state;
    return (
      <div>
        <Router>
          <Affix>
            <Navbar />
          </Affix>
          {/* <Switch> */}
          <Route exact path="/">
            <Home data={home.data} footer={home.footer} />
          </Route>
          {/* <Route path="/services">
            <Services />
          </Route> */}
          <Route path="/poto">
            <Gallery data={photos} />
          </Route>
          <Route path="/vendor">
            <Vendor data={data} />
          </Route>
          <Route path="/vendorList/:id">
            <VendorList />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          {/* </Switch> */}
        </Router>
      </div>
    );
  }
}

function Gallery({ data }) {
  return (
    <div>
      <Poto data={data} />
    </div>
  );
}

function Home({ data }) {
  return (
    <div className="Container-H">
      <ArrayMap data={data}>
        {({
          title,
          nocard,
          content,
          theme,
          button,
          themeTJ,
          gallery,
          testi,
          search
        }) => (
          <ContentHome
            title={title}
            showList={nocard}
            theme={theme}
            content={content}
            button={button}
            gallery={gallery}
            testi={testi}
            themeTJ={themeTJ}
            search={search}
          />
        )}
      </ArrayMap>
      {/* <div className="footer">{footer}</div> */}
    </div>
  );
}
const Services = () => (
  <div>
    <h1>Welcome Services</h1>
    {/* <Link to="/">Go to home</Link> */}
  </div>
);

export default App;
