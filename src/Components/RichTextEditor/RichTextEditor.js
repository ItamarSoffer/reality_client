import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromHTML, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import {Button} from "antd";


class RichTextEditor extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    };


    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };
    toolbarConfig={
        inline: {
            inDropdown: false,
            options: ['bold', 'italic', 'underline', 'strikethrough'],
        },
        fontFamily: {
            options: ['Segoe UI', 'Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
        },
        textAlign: { inDropdown: true,
            options: ['right', 'center', 'left', 'justify'],
},
        link: { inDropdown: true },
    };


    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    // editorClassName="demo-editor"
                    editorClassName="ant-input"
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={this.toolbarConfig}
                />
                <textarea
                    disabled
                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                />
                <Button onClick={() => console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))}>console.log</Button>
            </div>
        );
    }
}
export default RichTextEditor;