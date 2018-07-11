import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 1,
    // backgroundColor:orange300,
  }),
  index:{
    marginTop:0,
    paddingTop:13,
    width:36,
    height:30,
  },
});
/*typography*/
//Valeurs pour 'variant' = display4, display3, display2, display1, headline, title,
//          subheading, body2, body1, caption, button
//Valeurs pour 'text-align' = center, left, right, justify 

const PhfPaper=(props)=> {
  const { classes, titre, libelle, typetitre, typelibelle, multiligne, elevation, couleurfond, couleur1, couleur2, alignement, fontsize, indexStyle } = props;
  var variant1=(typetitre!==undefined?typetitre:"headline")
  var variant2=(typelibelle!==undefined?typelibelle:"body1")
  var tableau=[]
  return (
    <div>
      <Paper className={indexStyle?classes.index:classes.root} 
             elevation={elevation}
             style={{backgroundColor:couleurfond}}
            >
        <Typography style={{color:couleur1,marginBottom:10,fontSize:fontsize}}
                    variant={variant1} component="h5">
          {titre}
        </Typography>
        {multiligne
        ?(
          tableau=Array.from(libelle),
          tableau.map((ligne, i) => 
          <Typography key={i} style={{color:couleur2, textAlign:alignement}}
                      variant={variant2} component="p">
            {ligne}
          </Typography>)
          )
        : (
          <Typography style={{ color:couleur2, textAlign:alignement,fontSize:fontsize,}}
                      variant={variant2} component="p">
            {libelle}
          </Typography>
        )}
      </Paper>
    </div>
  );
}

PhfPaper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhfPaper);