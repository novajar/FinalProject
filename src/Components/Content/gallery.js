import React, { useState, useCallback, Component } from 'react';
// import { photos } from './photo';
import Sidebar from '../Navbar/sidebar';
import './ContentGallery.css';

// const Poto = () => {
//   console.log(photos);
//   return (
// <div className="wrapper">
//   <div className="sidebar">
//     <Sidebar />
//   </div>
//   <div className="isi">
//     {photos
//       .filter(t => t.tipe)
//       .map(gbr => (
//         <div className="gallery" key={gbr.id}>
//           <img className="img" src={gbr.src} />
//           <span className="overlay">test</span>
//         </div>
//       ))}
//   </div>
// </div>
//   );
// };
// export default Poto;
export default class gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipe: true
    };
  }

  render() {
    const { tipe } = this.state;
    const { data } = this.props;
    const photos = data;

    const gambar = photos.filter(t => t.tipe === tipe);
    return (
      <div className="wrapper">
        <div className="sidebar">
          <Sidebar data={data} />
          <ul>
            <li onClick={() => this.setState({ tipe: 'nature' })}>Nature</li>
            <li onClick={() => this.setState({ tipe: 'FAmily' })}>All</li>
          </ul>
        </div>
        <div className="isi">
          {gambar.map(gbr => (
            <div className="gallery" key={gbr.id}>
              <img className="img" src={gbr.src} />
              <span className="overlay">test</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
