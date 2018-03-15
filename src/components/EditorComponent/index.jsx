import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil, convertFromRaw, convertToRaw } from 'draft-js';
export default class EditorComponent extends Component {
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
    saveContent = (content) =>{
        // console.log(content)
        window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
    }
    onChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        this.saveContent(contentState)
        this.setState({
            editorState,
        })
    }


    render() {
        return (
            <div data-element='editor_save' className='editor' >
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                        keyBindingFn={this.keyBindingFn}
                        placeholder="Write Here"
                        onsaveContent={this.saveContent}
                    />
            </div>
        )
    }

}