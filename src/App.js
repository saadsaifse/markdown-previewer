import React, { Component } from "react";
import "./App.css";
import "./main.css";
import marked from "marked";

class App extends Component {
  constructor(props) {
    super(props);

    const defaultMarkdown = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
      - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)`;

    this.state = {
      userInput: defaultMarkdown,
      enlargedEditor: false,
      enlargedPreview: false
    };

    marked.setOptions({ breaks: true });

    this.handleInput = this.handleInput.bind(this);
    this.resizeEditor = this.resizeEditor.bind(this);
    this.resizePreviewer = this.resizePreviewer.bind(this);
  }

  resizeEditor() {
    this.setState({
      enlargedEditor: !this.state.enlargedEditor
    });
  }

  resizePreviewer() {
    this.setState({
      enlargedPreview: !this.state.enlargedPreview
    });
  }

  handleInput(event) {
    this.setState({
      userInput: event.target.value
    });
  }

  render() {
    const classes = this.state.enlargedEditor
      ? ["maximized", "hide", "fa-compress-arrows-alt"]
      : this.state.enlargedPreview
      ? ["hide", "maximized", "fa-compress-arrows-alt"]
      : ["", "", "fa-expand-arrows-alt"];
    return (
      <div id="container">
        <div className={`editor ${classes[0]}`}>
          <div className="toolbar">
            <i className="fas fa-pen" />
            <label>Editor</label>
            <i
              className={`fas ${classes[2]} fa-arrows-alt`}
              onClick={this.resizeEditor}
            />
          </div>
          <textarea id="editor" onInput={this.handleInput} value={this.state.userInput} />
        </div>
        <div id="previewer" className={`previewer ${classes[1]}`}>
          <div className="toolbar">
            <i className="fab fa-markdown" />
            <label>Previewer</label>
            <i
              className={`fas ${classes[2]} fa-arrows-alt`}
              onClick={this.resizePreviewer}
            />
          </div>
          <div
            id="preview"
            dangerouslySetInnerHTML={{ __html: marked(this.state.userInput) }}
          />
        </div>
      </div>
    );
  }
}

export default App;
