import React, { Component } from 'react';
import {format} from 'd3-format';
import {RadarChart, CircularGridLines, LabelSeries} from 'react-vis';
/*
const DATA = [
  {name: 'Mercedes', mileage: 7, price: 10, safety: 8, performance: 9, interior: 7, warranty: 7},
  {name: 'Honda', mileage: 8, price: 6, safety: 9, performance: 6, interior: 3, warranty: 9},
  {name: 'Chevrolet', mileage: 5, price: 4, safety: 6, performance: 4, interior: 5, warranty: 6}
];*/

const basicFormat = format('.2r');
// const wideFormat = format('.3r');

class BasicRadarChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: props.data,
            domains: props.domains,
            width: props.width,
            height: props.height,
        };
    }

    formDomain(){
        var Domain = [];
        this.state.data.map(
            (obj) => {
                var indice = 0;
                for(var i in obj){
                    Domain.push(
                        {name: i, domain: this.state.domains[indice], tickTotal: 5}
                    );
                    indice++;
                }
            }
        );
        return Domain;
    };

    newticksFormat(t, obj){
        console.log("t : ", t, " obj : ", obj);
        return basicFormat(t);
    }

    RangeMaxData(radius, startingAngle){
        var MAX = [];
        const size = Object.keys(this.state.data[0]);
        this.state.data.map(
            (obj) => {
                var indice = 0;
                for(var i in obj){
                    var angle = indice / size.length * Math.PI * 2  + startingAngle;
                    const domain = this.state.domains[indice];
                    const pointX = radius * Math.cos(angle);
                    const pointY = radius * Math.sin(angle);
                    MAX.push(
                        {x: pointX, y: pointY, label: domain[1].toString()}
                    );
                    indice++;
                }
            }
        );
        return MAX;
    }  
    
    RangeMinData(radius, startingAngle){
        var MIN = [];
        const size = Object.keys(this.state.data[0]);
        this.state.data.map(
            (obj) => {
                var indice = 0;
                for(var i in obj){
                    var angle = indice / size.length * Math.PI * 2  + startingAngle;
                    const domain = this.state.domains[indice];
                    const pointX = radius * Math.cos(angle);
                    const pointY = radius * Math.sin(angle);
                    MIN.push(
                        {x: pointX, y: pointY, label: domain[0].toString()}
                    );
                    indice++;
                }
            }
        );
        return MIN;
    }  
    
    CircleValuesData(radius, startingAngle){
        var MAX = [];
        const size = Object.keys(this.state.data[0]);
        const DATA = this.state.data[0];
        var indice = 0;
        for(var obj in DATA){
            var angle = indice / size.length * Math.PI * 2  + startingAngle;
            const pointX = radius * Math.cos(angle);
            const pointY = radius * Math.sin(angle);
            MAX.push(
                {x: pointX, y: pointY, label: DATA[obj].toString()}
            );
            indice++;
        }
        return MAX;
    }


  render() {
    return (
            <RadarChart
                data={this.state.data}
                //tickTotal={3}
                //tickFormat={(t) => this.newticksFormat(t)}
                startingAngle={0}
                domains={this.formDomain()}
                width={this.state.width}
                height={this.state.height} 
                //hideInnerMostValues={false} // fait apparaitre valeur min (au centre)
                margin={{
                  left: 100,
                  top: 100,
                  bottom: 100,
                  right: 100
                }}
                style={{
                    axes: { // style des axes
                        line: { // style des lignes des axes
                            stroke: 'black'
                        },
                        ticks: {
                        },
                        text: { //style des graduations sur les axes
                            //stroke: '#ADDDE1'
                            opacity: 1,
                            fillOpacity: 0.0,
                        }
                    },
                    polygons: { // style du polygone
                        strokeWidth: 3,
                        stroke: 'red',
                        fillOpacity: 0.1,
                        fill: "red"
                    },
                    labels: {   //style des libellés au bout des axes
                        //stroke: '#ADDDE1',
                        textAnchor: 'middle'
                    }
                  }}
            >

            <CircularGridLines 
                tickValues={[...new Array(4)].map((v, i) => i / 4 - 1)}
                style={{
                    fill: 'none', 
                    //fillOpacity: 0.2,
                    stroke: 'gray',
                    ticks: {   //style des libellés au bout des axes
                        //stroke: '#ADDDE1',
                        textAnchor: 'middle'
                    }
                }}
            />
            {/* Cercle externe*/}
            {/* <CircularGridLines 
                tickValues={[5 / 5 - 1]}
                //tickValues={this.RangeMaxData()}
                //rRange={}
                //tickFormat={this.RangeMaxData()}
                style={{
                    fill: 'none', 
                    //fillOpacity: 0.2,
                    stroke: 'gray',
                    ticks: {   //style des libellés au bout des axes
                        stroke: '#ADDDE1',
                        textAnchor: 'middle'
                    }
                }}
            /> */}
                {(this.props.labelMax === true) && <LabelSeries
                    //animation
                    //allowOffsetToBeReversed
                    data={this.RangeMaxData(1.05, 0)} 
                    style={{
                        fillOpacity: 0.5,
                      }}
                />}
                {(this.props.labelMin === true) && <LabelSeries
                    //animation
                    //allowOffsetToBeReversed
                    data={this.RangeMinData(0.3, 0)} 
                    style={{
                        fillOpacity: 0.5,
                      }}
                />}
                {(this.props.labelValue === true) && <LabelSeries
                    //animation
                    //allowOffsetToBeReversed
                    data={this.CircleValuesData(0.8, 0)} 
                    style={{
                        fillOpacity: 0.5,
                        fill:"red"
                      }}
                />}
                

            </RadarChart>
    );
  }
};


export default BasicRadarChart;


const arrayRange = [
    [-5, 5],
    [5, 10],
    [10, 50],
    [50, 100],
    [100, 500],
    [500, 1000],
];


export function formDomains(data){
    var domains = [];
    data.map(
      (obj) => {
        for(var label in obj){
            for(var range in arrayRange ){
                const min = arrayRange[range][0];
                const max = arrayRange[range][1];
                if((min < obj[label]) && (max >= obj[label])){
                    domains.push(arrayRange[range]);
                }
            }
        }
      }
    );
    return domains;
  };

  export class FormBasicRadarChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : props.data.data,
            domains: formDomains(props.data.data),
            width: props.data.width,
            height: props.data.height,
            labelMax: props.data.labelMax,
            labelMin: props.data.labelMin,
            labelValue: props.data.labelValue
        };
    }

    render(){
        return (
            <BasicRadarChart 
                data={this.state.data} 
                domains={this.state.domains} 
                width={this.state.width - 50 } 
                height={this.state.height - 50}
                labelMax={this.state.labelMax}
                labelMin={this.state.labelMin}
                labelValue={this.state.labelValue}/>
        );
    }
}


export function retrieveData(DATA){
    var data = {};
    DATA.map(
        (obj) => {
            data[obj[0]] = obj[1];
        }
    );
    return [data];
};

export function retrieveDomains(DATA){
    var domains = [];
    DATA.map(
        (obj) => {
            domains.push(obj[2]);
        }
    );
    return domains;
};



export class FormBasicRadarChartWithoutDomains extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: retrieveData(props.data),
            domains: retrieveDomains(props.data),
            width: props.width,
            height: props.height,
            labelMax: props.labelMax,
            labelMin: props.labelMin,
            labelValue: props.labelValue
        };
    }

    render(){
        return (
            <BasicRadarChart 
                data={this.state.data} 
                domains={this.state.domains} 
                width={this.state.width - 50 } 
                height={this.state.height - 50}
                labelMax={this.state.labelMax}
                labelMin={this.state.labelMin}
                labelValue={this.state.labelValue}/>
        );
    }
}