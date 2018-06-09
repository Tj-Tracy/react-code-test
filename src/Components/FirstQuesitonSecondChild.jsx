import React, { Component } from 'react';
 
class FirstQuestionSecondChild extends Component {
 
 render() {
   return (
     <div>
       {this.props.string.split("").reverse().join("")}
     </div>
   );
 }
}
 
export default FirstQuestionSecondChild;