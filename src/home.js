import React from 'react';

import { LoadScript } from "@react-google-maps/api";
import Map from "./App";



const lib = ["places"];
const key = "AIzaSyCMYE0Ui87z3Z3pwMrR6Dp2-Jgu9GM5NhY"; // PUT GMAP API KEY HERE
class Home extends React.Component {
  render() {
    return (
     
      <LoadScript googleMapsApiKey={key} libraries={lib}>
        <Map />
      </LoadScript>
    
    );
  }
}

export default Home;

