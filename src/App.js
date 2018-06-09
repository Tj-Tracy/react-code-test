import React, { Component } from 'react';
import FirstQuestionParent from './Components/FirstQuestionParent';
import SecondQuestion from './Components/SecondQuestion';

class App extends Component {

  constructor() {
    super();
    this.state = {
      questionOne: true
    }
  }

  switchQuestions = () => {
    this.setState(previous => {
      return { questionOne: !previous.questionOne }
    })
  }

  render() {
    return (
      <div className="App">
      <button onClick={this.switchQuestions}>Switch Questions</button>
       {this.state.questionOne ? 
        (
         <FirstQuestionParent />
        ):(
         <SecondQuestion />
        )}
      </div>
    );
  }
}

export default App;
