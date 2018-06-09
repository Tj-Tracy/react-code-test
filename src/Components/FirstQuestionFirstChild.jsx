import React, { Component } from 'react';
 
class FirstQuestionFirstChild extends Component {

  constructor(props) {
    super(props);
    this.state = {
      string: ''
    }
  }

 render() {
   return (
     <div>
       <input type='text'  onChange={ this.props.handleChange} />
     </div>
   );
 }
}
 
export default FirstQuestionFirstChild;