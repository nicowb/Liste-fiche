import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import orange from '@material-ui/core/colors/orange';
import { red500, blue200 } from 'material-ui/styles/colors';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin : theme.spacing.unit,
  },
  cssLabel: {
    color: blue200,
    '&$cssFocused': {
      color: orange[500],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: orange[500],
    },
  },
  cssError:{
    color: red500,
    fontSize: 12,
  },
  // cssPosition: {
  //   position:'absolute',
  // }
 });


const PhfInput=(props)=> {
  const { classes, placeholder, libelle, errorText, action, inputName, erreur, multiligne, grise, type, largeur } = props;
  var widthInput=(largeur!==undefined)?largeur:300
  return (
    // <div className={classes.container.position}>
    //balise span si groupe input horizontal
    //balise div si groupe input vertical
    <span className={classes.containers}> 
      <FormControl className={classes.margin}>
        <InputLabel
          FormLabelClasses={{
            root: classes.cssLabel,
            focused: classes.cssFocused,
          }}
          htmlFor="custom-css-input"
        >
        {libelle}
          {/*  Custom CSS */}
        </InputLabel>
        <Input
          style={{ alignSelf: 'flex-end', marginLeft: 0, width: widthInput }}
          onChange={action}
          disabled={grise}
          classes={{
            underline: classes.cssUnderline,
          }}
          error={erreur}
          id={"custom-css-input_"+inputName}
          name={inputName}
          multiline={multiligne}
          type={type}
          placeholder={placeholder}
        />
        <p className={classes.cssError}>
          {errorText}
        </p>
      </FormControl>
    </span>
  );
}

PhfInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhfInput);
