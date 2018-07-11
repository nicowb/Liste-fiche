import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    cssBlueStyle: {
        color: theme.palette.getContrastText('#0099cc'),
        backgroundColor: '#0099cc',
        '&:hover': {
            backgroundColor: '#66d9ff',
        },
    },
    cssOrangeStyle: {
        color: theme.palette.getContrastText('#994d00'),
        backgroundColor: '#ff8c1a',
        '&:hover': {
            backgroundColor: '#ffc266',
        },
    },
    cssGreenStyle: {
        color: '#1a3300',
        backgroundColor: '#59b300',
        '&:hover': {
            backgroundColor: '#bfff80',
        },
    },
    cssDefaultStyle: {
        color: theme.palette.getContrastText('#cccccc'),
        backgroundColor: '#cccccc',
        '&:hover': {
            backgroundColor: '#f0f5f5',
        },
    },
    displayLinebreak: {
        whiteSpace: 'pre-wrap',
        textTransform: 'none'
    }
});
const theme = createMuiTheme({
    palette: {}
});

const PhfButton = (props) => {
    const { classes, libelle, action, grise, arrondi, couleur, marge, largeur } = props;
    var borderRadiusButton = (arrondi !== undefined) ? arrondi : 5
    var style1 = classNames(classes.cssBlueStyle)
    var style2 = classNames(classes.cssOrangeStyle)
    var style3 = classNames(classes.cssDefaultStyle)
    var style4 = classNames(classes.cssGreenStyle)
    var colorButton = (couleur !== undefined) ?
        (couleur === "orange" ? style2 :
            (couleur === "bleu" ? style1 :
                (couleur === "vert" ? style4 : {}))) : style3
    return (
        <MuiThemeProvider theme={theme}>
            <Button variant="contained"
                className={colorButton}
                onClick={action}
                disabled={grise}
                style={{ borderRadius: borderRadiusButton, margin: marge, width:'-webkit-fill-available'}}
            >
                <div className={classes.displayLinebreak}>
                    {libelle}
                </div>

            </Button>
        </MuiThemeProvider>
    );
}

PhfButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhfButton);
