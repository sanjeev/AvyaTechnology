/*global google*/
import React from "react";
import './App.css';
import { connect } from "react-redux";
import { confirmatiomAction } from './redux/actions/confirmationActions'
import { StandaloneSearchBox } from "@react-google-maps/api";
import { Link } from 'react-router-dom'
let markerArray = [];

class App extends React.Component {
  state = {
    //currentLocation: { lat: 0, lng: 0 },
    markers: [],
    //bounds: null,
    address: '',
    lat: '',
    lng: '',
    routes: '',
    neighborhood: '',
    sublocality: '',
    political: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
  };

  /* onMapLoad = map => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
      
        const pos = { lat, lng };
        this.setState({ currentLocation: pos });
      }
    );
    google.maps.event.addListener(map, "bounds_changed", () => {
      console.log(map.getBounds());
      this.setState({ bounds: map.getBounds() });
    });
  }; */


  getCurrentloction = () => {
    navigator?.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      console.log(lng);
      console.log(lat);
      var google_map_position = new google.maps.LatLng(lat, lng);
      var google_maps_geocoder = new google.maps.Geocoder();
      this.setState({ lat: lat });
      this.setState({ lng: lng });
      google_maps_geocoder.geocode({ 'latLng': google_map_position }, (results, status) => {
        if (status !== google.maps.GeocoderStatus.OK) {
          alert(status);
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status === google.maps.GeocoderStatus.OK) {

          var address = results[0].formatted_address;
          this.setState({ address: address });

          var address_components = results[0].address_components;

          for (let z = 0; z < address_components.length; z++) {
            console.log(address_components[z].types[0]);
            if (address_components[z].types[0] === 'route') {

              this.setState({ routes: address_components[z].long_name });
            }
            if (address_components[z].types[0] === 'neighborhood') {
              this.setState({ neighborhood: address_components[z].long_name });
            }
            if (address_components[z].types[0] === 'sublocality_level_2') {
              this.setState({ sublocality: address_components[z].long_name });
            }
            if (address_components[z].types[0] === 'sublocality_level_1') {
              this.setState({ political: address_components[z].long_name });
            }
            if (address_components[z].types[0] === 'locality') {
              this.setState({ city: address_components[z].long_name });
            }
            if (address_components[z].types[0] === 'administrative_area_level_1') {
              this.setState({ state: address_components[z].long_name });
            }
            if (address_components[z].types[0] === 'postal_code') {
              this.setState({ postal_code: address_components[z].long_name });
            }
            if (address_components[z].types[0] === 'country') {
              this.setState({ country: address_components[z].long_name });
            }

          }

        }
      });





    })



  }
  componentWillUnmount() {
    const user = this.state;

    this.props.confirmatiomAction(user);
  }
  onSBLoad = ref => {

    this.searchBox = ref;
  };

  onPlacesChanged = () => {



    markerArray = [];
    let results = this.searchBox.getPlaces();

    for (let i = 0; i < results.length; i++) {
      //let place = results[i].geometry.location;
      //console.log(results[i]);
      markerArray.push(results[i].address_components);

      var address_components = results[i].address_components;



      for (let z = 0; z < address_components.length; z++) {
        if (address_components[z].types[0] === 'route') {
          this.setState({ routes: address_components[z].long_name });
        }
        if (address_components[z].types[0] === 'neighborhood') {
          this.setState({ neighborhood: address_components[z].long_name });
        }
        if (address_components[z].types[0] === 'sublocality_level_2') {
          this.setState({ sublocality: address_components[z].long_name });
        }
        if (address_components[z].types[0] === 'sublocality_level_1') {
          this.setState({ political: address_components[z].long_name });
        }
        if (address_components[z].types[0] === 'locality') {
          this.setState({ city: address_components[z].long_name });
        }
        if (address_components[z].types[0] === 'administrative_area_level_1') {
          this.setState({ state: address_components[z].long_name });
        }
        if (address_components[z].types[0] === 'postal_code') {
          this.setState({ postal_code: address_components[z].long_name });
        }
        if (address_components[z].types[0] === 'country') {
          this.setState({ country: address_components[z].long_name });
        }

      }
      let lng = results[i].geometry.location.lng();
      let lat = results[i].geometry.location.lat();
      this.setState({ lat: lat });
      this.setState({ lng: lng });
    }
    this.setState({ markers: markerArray });
    // console.log(markerArray);
    const user = this.state;

    this.props.confirmatiomAction(user);



    //console.log(this.state.bounds);

  };

  render() {
    //console.log(this.props.data);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6" id=" searchbox">
            <div className="form-group">
              <label htmlFor="email">Enter address:</label>
              <StandaloneSearchBox
                onLoad={this.onSBLoad}
                onPlacesChanged={this.onPlacesChanged}
                bounds={this.state.bounds}
              >

                <input
                  type="text"
                  placeholder="Enter address"
                  defaultValue={this.state.address}
                  style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `100%`,
                    height: `35px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    /* position: "absolute",
                    left: "50%",
                    marginLeft: "-120px" */
                  }}
                />
              </StandaloneSearchBox>
            </div>
          </div>
          <div className="col-md-6">
            <button type="button" style={{ marginTop: "23px" }} className="btn btn-primary" onClick={this.getCurrentloction}>Get current location</button>
            <Link to="/confirmation" style={{ marginTop: "23px", marginLeft: "20px" }} className="btn btn-primary">View Data</Link>
          </div>
        </div>



      </div>

    );
  }
}


const mapStateToProps = (state) => ({
  data: state.combine
})
const mapDispatchToProps = {
  confirmatiomAction
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
