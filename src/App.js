import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil, convertFromRaw, convertToRaw } from 'draft-js';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: null
    };
    const content = window.localStorage.getItem('content');
    if (content) {
      this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
    } else {
      this.state.editorState = EditorState.createEmpty();
    }

    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }
  keyBindingFn = (event) => {
    if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 83) { return 'save'; }
    return getDefaultKeyBinding(event);
  }

  handleKeyCommand(command, editorState) {
    let newState = RichUtils.handleKeyCommand(editorState, command);
    const contentState = editorState.getCurrentContent();
    if (command === 'save') {
      this.saveContent(contentState);
      // newState = RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD');
    }

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  onChange = (editorState) => {
    this.setState({
      editorState,
    })
  }
  saveContent = (content) => {
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        Write down
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={this.keyBindingFn}
        />
      </div>
    );
  }
}

export default App;
