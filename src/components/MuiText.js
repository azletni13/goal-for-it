import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './MuiTheme'

class MuiText extends Component {
  state = {
    text: this.props.text || '',
    limit: 1
  }

  handleSubmit = e => {
    const text = e.target.value.trim()
    if (e.which === 13) {
      this.props.onSave(text)
      if (this.props.newTodo) {
        this.setState({ text: '' })
      }
    }
  }

  handleChange = e => {
    if (this.state.limit){
      this.props.addRow(e.target.value)
      this.setState({ limit: 0 })
    }
    this.setState({ text: e.target.value })
  }

  // handleBlur = e => {
  //   if (!this.props.newTodo) {
  //     this.props.onSave(e.target.value)
  //   }
  // }

  render(){
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <TextField
            hintText={this.props.hintText}
            floatingLabelText={this.props.floatingLabelText}
            errorText="This field is required"
            value={this.state.text}
            onChange={this.handleChange}
            onKeyDown={this.handleSubmit}
          />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default MuiText;