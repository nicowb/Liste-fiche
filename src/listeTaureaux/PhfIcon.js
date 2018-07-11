import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import AddIcon from '@material-ui/icons/Add';
import LoopIcon from '@material-ui/icons/Loop';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import ExposurePLus1Icon from '@material-ui/icons/ExposurePlus1';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Equalizer from '@material-ui/icons/Equalizer';
import Print from '@material-ui/icons/Print';
import green from '@material-ui/core/colors/green';
import Tooltip from '@material-ui/core/Tooltip';
const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  button: {
    margin: theme.spacing.unit,
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
  },
  icon: {
    margin: theme.spacing.unit * 2,
    color: orange[800]
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[300],
      fontSize: 12,
    },
  },
});
class PhfIcon extends Component {

  state = {
    classes: this.props.classes,
    print: this.props.print,
    add: this.props.add,
    select: this.props.select,
    index: this.props.index,
    del: this.props.del,
    refresh: this.props.refresh,
    onAddClick: this.props.onAddClick,
    onIconAddClick: this.props.onIconAddClick,
    onRefreshClick: this.props.onRefreshClick,
    open: false,
  }
  handleTooltipClose = () => {
    this.setState({ open: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open: true });
  };
  render() {
    const state = this.state;
    return (
      <div>
        <span className={state.classes.root}>
          {state.index ?
            <IconButton color="secondary" className={state.classes.button} aria-label="index">
              <Equalizer />
            </IconButton> : null}

          {state.print ?
            <IconButton color="primary" className={state.classes.button} aria-label="imprimer">
              <Print />
            </IconButton> : null}

          {state.add ?
            <Button variant="fab" aria-label="ajouter"
              className={state.classes.fabGreen}
              onClick={state.onAddClick}>
              <AddIcon />
            </Button> : null}
          {(state.refresh) ? 
            // <Tooltip
            //   enterDelay={300}
            //   id="tooltip-controlled"
            //   leaveDelay={300}
            //   onClose={this.handleTooltipClose}
            //   onOpen={this.handleTooltipOpen}
            //   open={state.open}
            //   placement="bottom"
            //   title="Delete">           
            <IconButton className={state.classes.button} aria-label="imprimer"
                onClick={state.onRefreshClick}>
              <LoopIcon style={{color:'#ff8000'}}/>
            </IconButton> : null}

          {/* {state.refresh ?
            <Button variant="fab" aria-label="liste complète"
              className={state.classes.fabGreen}> */}
              {/* <Tooltip
              enterDelay={300}
              id="tooltip-controlled"
              leaveDelay={300}
              onClose={this.handleTooltipClose}
              onOpen={this.handleTooltipOpen}
              open={state.open}
              placement="bottom"
              title="Delete" */}
              {/* <LoopIcon /> */}
              {/* </Tooltip> */}
            {/* </Button> : null} */}
          {state.del ?
            <Button variant="fab" aria-label="delete" className={state.classes.button}>
              <DeleteIcon />
            </Button> : null}
        </span>
        {state.select ?
          <p className='row-icon2' >
            <IconButton style={{ paddingRight: 24,fontSize:12 }} color="primary"
              label='sélection' aria-label="sélectionner"
              onClick={state.onIconAddClick}>
              <ExposurePLus1Icon />
            </IconButton>
          </p>
          : null}
      </div>
    );
  }
}

PhfIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhfIcon);