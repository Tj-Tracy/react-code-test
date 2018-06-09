import React, { Component } from 'react';
import FirstQuestionFirstChild from './FirstQuestionFirstChild';
import FirstQuesitonSecondChild from './FirstQuesitonSecondChild';

class FirstQuestionParent extends Component {
 
  constructor() {
    super();
    this.state = {
      string: ''
    }
  }
  handleChange = e => {
    this.setState({string: e.target.value})
    console.log(this.state.string);
  }

  flipString(string) {
   
  }

 render() {
   return (
     <div>
       <FirstQuestionFirstChild string={this.state.string} handleChange={this.handleChange} flipString={this.flipString}/>
       <FirstQuesitonSecondChild string={this.state.string}/>
     </div>
   );
 }
}
 
export default FirstQuestionParent;