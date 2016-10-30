import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addGoal, fetchGoal, checkedGoal, openAddGoalDialog, closeAddGoalDialog, handleGoalInput } from "../actions/goalActions"
import { fetchUser } from "../actions/userActions"
import { addMilestones, openAddMilestonesDialog, closeAddMilestonesDialog, handleMilestonesInput} from "../actions/milestoneActions"
import { addSteps, openAddStepsDialog, closeAddStepsDialog, handleStepsInput} from "../actions/stepActions"
import { addNotif } from "../actions/groupActions"


import Milestone from "../components/MilestoneIndex"
// import Form1 from "../components/Form1"
import { RaisedButton, FlatButton, Dialog } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import muiTheme from '../components/MuiTheme'
import MuiText from '../components/MuiText'
import AppBar from 'material-ui/AppBar';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};


class Goal_page extends Component {
  renderGoals = (goals) => {
   return (
     <ul>
       <li> {goals[0]} </li>
     </ul>
   )
  }

  handleChange = (event) => {
    this.props.checkedGoal(this.props.goal.goal_id, this.props.checked)

    const content = (this.props.goal.goal.checked ? `${this.props.user.user.username} unchecked their goal: ${this.props.goal.goal}` : `${this.props.user.user.username} completed their goal: ${this.props.goal.goal}`)

    this.props.addNotif({
      type: "notificaiton",
      content: content })
  }


  componentWillMount = () => {
    this.props.fetchGoal(2);
    this.props.fetchUser(1);
  }

  nextButtonActionsOnGoal = () => {
    this.props.addGoal(this.props.goalText)
    this.props.closeAddGoalDialog()
    this.props.openAddMilestonesDialog()
  }

  nextButtonActionsOnMilestones = () => {
    this.props.addMilestones(this.props.milestonesText)
    this.props.closeAddMilestonesDialog()
    this.props.openAddStepsDialog()
  }

  nextButtonActionsOnSteps = () => {
    this.props.addSteps(this.props.stepsText)
    this.props.closeAddStepsDialog()
  }

  render() {
    var g = this.props.goal;
    const modalActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => { this.props.closeAddGoalDialog() }}
      />,
      <FlatButton
        label="Next"
        primary={true}
        disabled={!this.props.goalText}
        onTouchTap={() => { this.nextButtonActionsOnGoal() }}
      />,
    ];

    const milestonesActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => { this.props.closeAddMilestonesDialog() }}
      />,
      <FlatButton
        label="Next"
        primary={true}
        disabled={!this.props.milestonesText}
        onTouchTap={() => { this.nextButtonActionsOnMilestones() }}
      />,
  ];

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
        onTouchTap={() => { this.nextButtonActionsOnSteps() }}
      />,
    ]

    return (
      <div>
        <MuiThemeProvider>
          <AppBar
            title={`${this.props.user.user.username}{'\''}s Goals`}
            iconClassNameLeft="muidocs-icon-navigation-expand-more"
            className="App-Bar"
          />
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={muiTheme}>
          <RaisedButton label="+" onClick={ () => this.props.openAddGoalDialog() } />
          </MuiThemeProvider>
        <h1>{this.props.goal.goal}
          <MuiThemeProvider style={styles.block}>
            <Checkbox
            style={styles.checkbox}
            onCheck={this.handleChange}
            checked={this.props.goal.checked}
            />
          </MuiThemeProvider>
        </h1>
        <Milestone onChange={this.handleChange} milestones={g.milestones} user={this.props.user.user.username}/>



        <MuiThemeProvider muiTheme={muiTheme}>
          <Dialog
            title="Add New Goal"
            actions={modalActions}
            modal={true}
            open={!!this.props.openGoalDialog}
          >
          <MuiText
            hintText="goal"
            floatingLabelText="goal"
            text={this.props.goalText}
            handleChange={this.props.handleGoalInput}
            />
          </Dialog>
        </MuiThemeProvider>

        <MuiThemeProvider muiTheme={muiTheme}>
          <Dialog
            title="Add New milestones"
            actions={milestonesActions}
            modal={true}
            open={!!this.props.openMilestonesDialog}
          >
          <MuiText
            hintText="milestone"
            floatingLabelText="milestone"
            text={this.props.milestoneText}
            handleChange={this.props.handleMilestonesInput}
            />
          </Dialog>
        </MuiThemeProvider>

        <MuiThemeProvider muiTheme={muiTheme}>
          <Dialog
            title="Add New steps"
            actions={stepsActions}
            modal={true}
            open={!!this.props.openStepsDialog}
          >
          <MuiText
            hintText="step"
            floatingLabelText="step"
            text={this.props.stepsText}
            handleChange={this.props.handleStepsInput}
            />
          </Dialog>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    goal: state.goal.goal,
    openGoalDialog: state.goal.openGoalDialog,
    openMilestonesDialog: state.milestones.openMilestonesDialog,
    openStepsDialog: state.steps.openStepsDialog,
    goalText: state.goal.goalText,
    milestonesText: state.milestones.milestonesText,
    stepsText: state.steps.stepsText,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchGoal,
      fetchUser,
      checkedGoal,
      addNotif,

      addGoal,
      addMilestones,
      addSteps,
      openAddGoalDialog,
      openAddMilestonesDialog,
      openAddStepsDialog,
      closeAddGoalDialog,
      closeAddMilestonesDialog,
      closeAddStepsDialog,
      handleGoalInput,
      handleMilestonesInput,
      handleStepsInput,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Goal_page);
