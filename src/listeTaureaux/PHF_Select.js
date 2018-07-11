import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import FormControl from '@material-ui/core/FormControl';
import orange from '@material-ui/core/colors/orange';
import { red500, blue200 } from 'material-ui/styles/colors';
import SuperSelectField from 'material-ui-superselectfield';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
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
  cssError: {
    color: red500,
    fontSize: 12,
  },
  ssfField: {
    minWidth: 20,
    margin: 10,
    fontSize: 16,
  }  // cssPosition: {
  //   position:'absolute',
  // }
});


const PhfSelect = (props) => {
  const { classes, optionsContent, action, largeur, marge } = props;
  var hintText=''
  var placeholder=''
  var valeur=''
  var options = []
  var j = options.length;
  for (let i = 0; i < j; i++) {
    options.pop();
  }

  switch (optionsContent) {
    case "Pays":
      options.push(<div key='DK' value='DK' label='DK'>Danemark</div>)
      options.push(<div key='ES' value='ES' label='ES'>Espagne</div>)
      options.push(<div key='FR' value='FR' label='FR'>France</div>)
      options.push(<div key='US' value='US' label='US'>Etats-Unis</div>)
      valeur=
      hintText="Sélection pays"
      placeholder="nom du pays"
      break;
    case "TypeIndex":
      options.push(<div key='CF' value='CF' label='CF'>Conf.français</div>)
      options.push(<div key='EF' value='EF' label=''>Etr.Conf. indexés France</div>)
      options.push(<div key='I' value='I' label='I'>Interbull</div>)
      options.push(<div key='JF' value='JF' label='JF'>Jeunes français</div>)
      options.push(<div key='JI' value='JI' label='JI'>Jeunes interbull</div>)
      options.push(<div key='JE' value='JE' label='JE'>Jeunes Eurogenomics</div>)
      hintText="Sélection type index"
      placeholder="type d'index"
      break;
    case "Entreprise":
      options.push(<div key='EV' value='EV' label='EV'>Evolution</div>)
      options.push(<div key='GD' value='GD' label='GD'>Gènes Diffusion</div>)
      options.push(<div key='BV' value='BV' label='BV'>Bovec</div>)
      options.push(<div key='ES' value='ES' label='ES'>eSemin</div>)
      options.push(<div key='GF' value='GF' label='GF'>Gen'France</div>)
      options.push(<div key='GL' value='GL' label='GL'>Geniland</div>)
      options.push(<div key='JG' value='JG' label='JG'>JLD Genetics</div>)
      options.push(<div key='SX' value='SX' label='SX'>Semex</div>)
      options.push(<div key='SZ' value='SZ' label='SZ'>Semenzoo</div>)
      options.push(<div key='RB' value='RB' label='RB'>RedBlack</div>)
      hintText="Sélection entreprise"
      placeholder="nom entreprise"
      break;
  }
  return (
    // <span className={classes.containers}>
    //   {/* <FormControl className={classes.margin}> */}
      <SuperSelectField className={classes.ssfField}
        name={`select ${optionsContent}`}
        // disabled={isDisabled}
        hintText={hintText}
        // value={`select${optionsContent}`}
        value={null}
        hoverColor={'#f9ecf2'}
        popoverWidth={180}
        hintTextAutocomplete={placeholder}
        onChange={action}
        style={{ width: largeur, margin: marge }}
      >
        {options}
      </SuperSelectField>
    //   {/* </FormControl> */}
    // </span>
  );
}

PhfSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhfSelect);
