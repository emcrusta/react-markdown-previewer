import React, { Component } from 'react';
import marked from 'marked';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
import { faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import './App.css';

class App extends Component{
    constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.handleEditorMax = this.handleEditorMax.bind(this);
            this.handlePreviewMax = this.handlePreviewMax.bind(this);
    
            this.state = {
                markdown: placeholderText,
                editorMax: false,
                previewMax: false
            }
        }
    
        handleChange(e) {
            this.setState({
                markdown: e.target.value
            })
        }
    
        handleEditorMax() {
            this.setState ({
                editorMax: !this.state.editorMax
            })
        }
    
        handlePreviewMax() {
            this.setState ({
                previewMax: !this.state.previewMax
            })
        }
    
        render() {
          const classes = this.state.editorMax ? ['editor-wrapper max', 'preview-wrapper hide', faWindowMinimize, 'windowMin'] :
          this.state.previewMax ? ['editor-wrapper hide', 'preview-wrapper max', faWindowMinimize, 'windowMin'] :
          ['editor-wrapper', 'preview-wrapper', faWindowMaximize, 'windowMax'];
          
            return (
                <div className="markdown-wrapper">  
                  <div className={classes[0]}>
                    <Header text="Editor"
                        className={classes[3]}
                        onClick={this.handleEditorMax}
                        icon={classes[2]}  
                      />
                    <Editor
                        markdown={this.state.markdown}
                        onChange={this.handleChange}
                    />
                   </div>
                <div className={classes[1]}>
                    <Header text="Preview"
                        onClick={this.handlePreviewMax}
                        icon={classes[2]}
                     />
                    <Preview 
                    markdown={this.state.markdown} />
                </div>
                </div>
            )
        }
    };
    
    const Header = (props) => {
        return (
            <div className="header">
                <p>{props.text}</p>
                <FontAwesomeIcon 
                    className={props.className}
                    icon={props.icon}
                    size='3x'
                    onClick={props.onClick} />  
            </div>
        )
    }
    
    const Editor = (props) => {
        return (
            <textarea id="editor"
                value={props.markdown}
                onChange={props.onChange}
                type="text" />
        )
    }
    
    const Preview = (props) => {
        return (
            <div id="preview"
                dangerouslySetInnerHTML={{__html: marked(props.markdown)}}
                />
        )
    }
    
    const placeholderText = `# Welcome to my React Markdown Previewer!
    
    ## Here's a fantastically formatted sub-heading.
    ### I think you'll enjoy all of these other markdown options:
      
    We can write code like this, \`<div></div>\`, between 2 backticks.
    
    \`\`\`
    // we can also write multi-line code like this:
    
    function exampleForYou(firstLine, lastLine) {
      if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
        return multiLineCode;
      }
    }
    \`\`\`
      
    When you're feeling serious, you can make text **bold**!
    And for emphasis, _italic_.
    We can combine the two for **_extra important_** information!
    If you don't like what you wrote, ~~cross it out~~.
    
    You can also create [links](https://www.freecodecamp.com), and
    > Block Quotes!
    
    Tables are also on the table:
    
    Header 1 | Header 2 | Header 3
    ------------ | ------------- | ------------- 
    You can add content | in each | of these tables.
    Check this out. | See? | A nice, full table.
    
    - Take a look at this list.
      - You can add bullets.
         - And adjust the indentations.
            - See how great it looks?
    
    
    1. Numbered lists also work!
    1. Just use 1s to create the list. 
    1. You can use other symbols, though.
    - Try using dashes or asterisks.
    * You can also embed images using markdown.
    
    ![Wessie from Wildernesscat](https://www.wildernesscat.com/wp-content/uploads/2017/03/Wessie-face-min.jpg)
    `;
export default App;
