import React, { Component } from 'react';

class CalculateDistance extends Component {

  constructor(props) {
    super(props);
    this.state = {
      distance: ""
    }
  }

  calculateDistance = (zipOne, zipTwo) => {
    this.setState({distance: "searching. . ."});

    const zipBody = {
      method: "POST",
      timeout: 1000,
      body: JSON.stringify({ ZipCodeOne: zipOne, ZipCodeTwo: zipTwo }),
      headers: {
        "Content-Type": "application/json"
      }
    }

    let zipCodes;

    //fetch the first zip
    fetch('/zipLookup', zipBody)
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.success === true) {
          console.log(data)
          zipCodes = data;
          //calculate the distance
          const R = 6371e3
          //change the latitudes to radians
          let zipOneLatR = parseFloat(zipCodes.zip[0].Lat);
          zipOneLatR = zipOneLatR * Math.PI / 180;
          let zipTwoLatR = parseFloat(zipCodes.zip[1].Lat);
          zipTwoLatR = zipTwoLatR * Math.PI / 180;
          let latR = parseFloat(zipTwoLatR - zipOneLatR);
          latR = latR * Math.PI / 180;
          let longR = parseFloat(zipCodes.zip[1].Long - zipCodes.zip[0].Long);
          longR = longR * Math.PI / 180;
          let a = Math.sin(latR / 2) * Math.sin(latR / 2) + Math.cos(zipOneLatR) * Math.cos(zipTwoLatR) * Math.sin(longR / 2) * Math.sin(longR / 2);
          let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          let d = R * c;
          d = d * 0.00062137
          this.setState({ distance: Math.ceil(d) + " miles"  });
        } else {
          this.setState({distance: "One of the zip codes is not correct."});
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({distance: "One of the zip codes is not correct."});
      });


  }

  render() {
    return (
      <div>
        <button onClick={() => this.calculateDistance(this.props.zipOne, this.props.zipTwo)}>Calculate Distance</button>
        <div>
          {this.state.distance === ""? "" : this.state.distance } 
        </div>
      </div>
    );
  }
}

export default CalculateDistance;