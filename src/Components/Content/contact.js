import React, { Component } from 'react';
import QlueDashboardStyle from '@qlue-ui/react-component/dist/QlueDashboardStyle';
import MapEnrollment from '@qlue-ui/react-component/dist/MapEnrollment';
import leaflet from 'leaflet/dist/leaflet.css';

export class Navbar extends Component {
  render() {
    // const { children } = this.props;
    return (
      <div>
        <>
          {/* <QlueDashboardStyle /> */}
          <MapEnrollment
            center={{
              lat: -6.310807,
              lng: 106.781929
            }}
            height="400px"
            // iconUrl="static/media/markerCCTV.f601dd08.svg"
            // onChange={function noRefCheck() {}}
            // onScriptLoaded={function noRefCheck() {}}
            // validationErrorText="Please enter a valid location"
            width="90%"
          />
        </>
      </div>
    );
  }
}

export default Navbar;
