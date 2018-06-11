import React, { Component } from 'react';
import VerifyInput from './VerifyInput';
import CalculateDistance from './CalculateDistance';
 
class SecondQuestion extends Component {

  constructor() {
    super();
    this.state = {
      zipOne: '',
      zipTwo: '',
      Distance: '',
      error: ''
    }
  }

  handleChange = e => {
    if (parseInt(e.target.value) == e.target.value) {
      if (e.target.value.length > 5) {
        this.setState({ error: "Please only 5 digit zip codes" });
        return;
      }
      this.setState({
        [e.target.name]: e.target.value
      })
    } else {
      this.setState({ error: "Please input only numbers"});
    }
  }
 
 render() {
   return (
     <div>
       <VerifyInput zipOne={this.state.zipOne} zipTwo={this.state.zipTwo} error={this.state.error} handleChange={this.handleChange} />
       <CalculateDistance zipOne={this.state.zipOne} zipTwo={this.state.zipTwo} />
     </div>
   );
 }
}
 
export default SecondQuestion;