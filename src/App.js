import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EditorComponent from './components/EditorComponent'
class App extends Component {

  saveContent = (content) => {
    // console.log(content)

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Writter</h1>
        </header>
        Write down
        <EditorComponent onsaveContent={this.saveContent} />
      </div>
    );
  }
}

export default App;
