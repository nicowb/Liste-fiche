import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { blue200 } from 'material-ui/styles/colors';

import { Slider, List, Button } from 'antd';

import PhfPaper from './PhfPaper';

const colorIndex= {
  '-0.1':'#ffe6e6','-0.2':'#ffe6e6','-0.3':'#ffe6e6','-0.4':'#ffcccc','-0.5':'#ffcccc','-0.6':'#ffcccc',
  '-0.7':'#ffb3b3','-0.8':'#ffb3b3','-0.9':'#ffb3b3','-1.0':'#ffb3b3','-1':'#ffb3b3',
  '-1.1':'#ff9999','-1.2':'#ff9999','-1.3':'#ff9999','-1.4':'#ff9999','-1.5':'#ff9999',
  '-1.6':'#ff8080','-1.7':'#ff8080','-1.8':'#ff8080','-1.9':'#ff8080','-2.0':'#ff8080','-2':'#ff8080',
  '-2.1':'#ff6666','-2.2':'#ff6666','-2.3':'#ff6666','-2.4':'#ff6666','-2.5':'#ff6666',  
}
const styles = theme => ({
  container: {
    width:200,
    margin: theme.spacing.unit,
  },
  rowC:{
    display:'flex',
    flexDirection:'row',
    marginTop:2,
    paddingTop:4,  
  },
  margin: {
    margin: theme.spacing.unit,
  },
 });

const maxi=(maxiVal)=>{
  return {style: {
    color: '#f50',
  },
  label: <strong>{maxiVal}</strong>}
}
const getValeur = (value,echelle) => {
  const sli= {}
  var maVal=value*(50/echelle)+50
  maVal>100?sli[100]=maxi(value):(maVal<0?sli[0]=maxi(value):sli[maVal]=value)
  // sli[maVal]=value
  // console.log(sli)
  return(sli)
}
const getColor = (value)=>{
  // value < -2.4 ? { return 'rgb(255, 245, 215)'} :{}  }
  return colorIndex[value];
}
const PHF_Index=(props)=> {
  const { classes, valeur, echelle, format, data,action} = props;
  // var maVal=valeur*(50/echelle)+50 // 84
  // var tableau=maVal>50?[50,maVal]:[maVal,50]
  function tableau(valeurT){
    var maVal=valeurT*(50/echelle)+50 // 84
    return (maVal>50?[50,maVal]:[maVal,50]);
  }
  function formatter(value){
    // return (format?`${(value-50)/50*echelle}`:null)
    return `${(value-50)/50*echelle}`
  }
  
  // console.log(data)
  return (
    <span className='Index'>
        <List 
          grid={{ gutter: 2,
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 1,
                  xxl: 1,
                  size: 'small'}}
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title={item["label"]}
                  />
              <span className={classes.rowC}>
                <PhfPaper //props pour index
                    titre={item["CD"]!==undefined?`CD ${item["CD"]}`:''}
                    typelibelle='caption'
                    alignement="left" // alignement si multiligne 
                    fontsize={11} // cas libelle
                    elevation={0}
                    indexStyle={true}
                    couleur2= {blue200} //couleur du libelle
                  />
                {item["index"]<0?(
                  <Button style={{backgroundColor:getColor(item["index"]), marginLeft:0,marginTop:2,width:50,textAlign:'right',fontSize:14,height:30}}>{item["index"]}</Button>
                  ):
                  (<Button style={{marginLeft:0,marginTop:2,width:50,textAlign:'right',fontSize:14,height:30}}>{item["index"]}</Button>
                  )
                }
                <Slider range
                  tipFormatter={format?formatter:null}
                  marks={getValeur(item["index"],echelle)} 
                  value={tableau(item["index"])} 
                />
              </span>
            </List.Item>
          )}
        />
      </span>
  
    // <div className={classes.container}>
    //   <FormControl className={classes.margin}>
    //   </FormControl>
    // </div>
  );
}

PHF_Index.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(PHF_Index);



