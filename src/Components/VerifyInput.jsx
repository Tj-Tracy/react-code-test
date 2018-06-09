import React, { Component } from 'react';

class VerifyInput extends Component {

  render() {
    return (
      <div>
        <p>{this.props.error}</p>
        <input type='text'  name='zipOne' onChange={this.props.handleChange} placeholder="First Zip code" />
        <input type='text'  name='zipTwo' onChange={this.props.handleChange} placeholder="Second Zip code" />
      </div>
    );
  }
}

export default VerifyInput;