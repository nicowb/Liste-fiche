import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Mention } from 'antd';

const { toString } = Mention;

const users = ['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai'];

const styles = theme => ({
    container: {
      width:220,
      margin: theme.spacing.unit,
      // display: 'flex',
      // flexWrap: 'wrap',
  
    },
    margin: {
      margin: theme.spacing.unit,
    },
});

function onChange(editorState) {
  console.log(toString(editorState));
}
function onSelect(suggestion) {
  console.log('onSelect', suggestion);
}

const PHF_Mention=(props)=> {
  const {libelle, largeur} = props;
  return (
    <Mention
      style={{ width: largeur }}
      onChange={onChange}
      defaultValue={libelle}
      suggestions={['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']}
      onSelect={onSelect}
      placeholder={libelle}
      placement="top"
      // suggestions={users}
      // readOnly
    />
  );
}
PHF_Mention.propTypes = {
    classes: PropTypes.object.isRequired,
    largeur: PropTypes.number.isRequired,
  };
  
export default withStyles(styles)(PHF_Mention);