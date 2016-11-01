import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { FlatButton, Dialog, SelectField, MenuItem } from 'material-ui'

import muiTheme from '../components/MuiTheme'
import MuiText from '../components/MuiText'

const styles = {
  customWidth: {
    width: 150,
  },
  value: 0
};

class NewStep extends Component {
  handleSelectMilestone = (event, index, value) => {
    console.log('e',event, 'index', index, 'value', value)
    this.setState({value})
  }

  render(){
    const stepsActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => { this.props.closeAddStepsDialog() }}
      />,
      <FlatButton
        label="Next"
        primary={true}
        disabled={!this.props.stepsText}
        onTouchTap={() => { this.props.nextButtonActionsOnSteps() }}
      />,
    ]
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <Dialog
      title="Add New steps"
      actions={stepsActions}
      modal={true}
      open={!!this.props.openStepsDialog}
      >
        {this.props.stepRows.map((num, i)=>{
          return (
                  <div key={i}>
                      <MuiThemeProvider muiTheme={muiTheme}>
                        <SelectField
                          key={i}
                          floatingLabelText="Milestone"
                          value={0}
                          onChange={() => { this.handleSelectMilestone() }}
                          autoWidth={true}
                        >
                          {this.props.newMilestones.map((m, j) => {
                            return (
                              <MenuItem value={j} primaryText={m} key={j} />
                            )
                          })}
                        </SelectField>
                      </MuiThemeProvider>

                      <MuiText
                        hintText="step"
                        floatingLabelText="step"
                        key={i}
                        text={this.props.stepsText[i]}
                        handleChange={this.props.handleStepInput}
                        handleSubmit={this.props.handleStepsInput}
                        addRow={this.props.addStepRow}
                        />
                      </div>
                  )

                  })}

                  </Dialog>
                </MuiThemeProvider>
    )
  }
}

export default NewStep
