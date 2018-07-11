import React, { Component } from "react";
import 'antd/dist/antd.css';
import { FormGroup } from "@material-ui/core";
import RaisedButton from "material-ui/RaisedButton";

import PHF_Index from "./PHF_Index";
import BasicRadarChart, {FormBasicRadarChart, FormBasicRadarChartWithoutDomains} from './BasicRadar';
import { constanteRadar, constantesLabels } from './constantes';

/* VARIABLES */

/* LOTS DE DONNEES INDEX */
var dataIndex = {};
/* LOTS DE DONNEES RADAR */
// const newradar = processData(param, "INDEX", "RADAR", constanteRadar);
const newradar = [
  ["TP", 0, [-5, 5]],
  ["TB", 1.8, [-5, 5]],
  ["MP", 26, [10, 50]],
  ["INEL", 38, [10, 50]],
  ["MG", 59, [50, 100]],
  ["LAIT", 911, [500, 1000]],
  ["MA", 2.3, [-5, 5]],
  ["CC", -0.1, [-5, 5]],
  ["ME", 1.3, [-5, 5]],
  ["STMA", 2.3, [-5, 5]],
  ["REPRO", 2.4, [-5, 5]],
  ["LGF", 1.7, [-5, 5]],
  ["VT", -0.6, [-5, 5]]
];

const data = [
  { key: "NF_LAIT", "index": 0, "label": "Nb. filles" },
  { key: "LAIT", "index": 2.2, "label": "Lait" },
  { key: "TP", "index": 0.7, "label": "TP" },
  { key: "TB", "index": 0.8, "label": "TB" },
  { key: "INEL", "index": 2.1, "label": "INEL" },
  { key: "NF_MO", "index": 0, "label": "Nb. filles" },
  { key: "MO", "index": 4.7, "label": "Morphologie", "CD": 69 },
  { key: "MA", "index": 4.5, "label": "Mamelle" },
  { key: "CC", "index": 1.8, "label": "Capacité corp." },
  { key: "ME", "index": 1.4, "label": "Membres" },
  { key: "PS", "index": 1.4, "label": "Profondeur sillon" },
  { key: "PJ", "index": 4.6, "label": "Dist. Plancher Jarret" },
  { key: "EQ", "index": 1.9, "label": "Equilibre" },
  { key: "AA", "index": 3.2, "label": "Attache avant" },
  { key: "AH", "index": 3.9, "label": "hauteur attache arrière" },
  { key: "EA", "index": 0.5, "label": "Ecart avant" },
  { key: "IA", "index": 0.9, "label": "Implantation arrière" },
  { key: "LT", "index": 0.3, "label": "Longueur des trayons" },
  { key: "HS", "index": 3.4, "label": "Hauteur au sacrum" },
  { key: "PC", "index": 1.1, "label": "Profondeur de corps" },
  { key: "LP", "index": 0.8, "label": "Largeur de poitrine" },
  { key: "AS", "index": 2.1, "label": "Aspect" },
  { key: "EC", "index": -1.1, "label": "Etat corporel" },
  { key: "IS", "index": 2.5, "label": "Largeur aux ischions" },
  { key: "IB", "index": 0.1, "label": "Inclinaison du bassin" },
  { key: "AJ", "index": -0.5, "label": "Angle du jarret" },
  { key: "PI", "index": 0.6, "label": "Angle du pied" },
  { key: "MR", "index": 1.2, "label": "Membres arrière vue arr." },
  { key: "LO", "index": 1.5, "label": "Locomotion" },
  { key: "STMA", "index": 2.2, "label": "Santé mamelle" },
  { key: "REPRO", "index": 1.3, "label": "Synthèse fertilité" },
  { key: "LGF", "index": 2.5, "label": "Longévité", "CD": 55 },
  { key: "TR", "index": 0.3, "label": "Vitesse de traite" },
  { key: "TE", "index": 0.7, "label": "Tempérament", "CD": 69 },
  { key: "CELL", "index": 2.2, "label": "Cellules", "CD": 68 },
  { key: "MACL", "index": 1.9, "label": "Mammites cliniques", "CD": 55 },
  { key: "FERV", "index": 1.5, "label": "Fertilité vaches", "CD": 61 },
  { key: "FERG", "index": 0.1, "label": "Fertilité génisses", "CD": 56 },
  { key: "IVIA1", "index": 0.7, "label": "Intervalle Velage IA1", "CD": 57 },
  { key: "FNAI", "index": 90, "label": "Facilité naissance", "CD": 69 },
  { key: "FVEL", "index": 94, "label": "Facilité velage", "CD": 64 },
  { key: "VNAI", "index": 93, "label": "Vitalité naissance", "CD": 65 },
  { key: "VVEL", "index": 96, "label": "Vitalité velage", "CD": 60 },
]
const containerStyle = {
  padding: 40,
  paddingBottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: 'calc(100% - 40px)',

};
export default class FicheTaureaux extends Component {
  constructor() {
    super()
    this.state = {
      dataIndex: {},
      dataIndexP: {}, // à alimenter
      dataIndexM: {}, // à alimenter
      dataIndexP: {}, // à alimenter
    }

  }
  componentDidMount() {
    this.getFicheData()
  }
  // This method will be sent to the child component
  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  getRond() {
    let { dataIndex } = this.state
    console.log(dataIndex)
    var x = document.getElementsByClassName("ant-slider-handle-2")
    for (var i = 0; i < x.length; i++) {
      if (dataIndex[i].index < 0) {
        x[i].style.visibility = "hidden";
      }
    }

    x = document.getElementsByClassName("ant-slider-handle-1")
    for (var i = 0; i < x.length; i++) {
      if (dataIndex[i].index > 0) {
        x[i].style.visibility = "hidden";
      }
    }

  }

  getFicheData() {
    var dataIndexList = data;
    console.log(dataIndexList)
    var x = document.getElementsByClassName("div.ant-slider-handle.ant-slider-handle-2")
    console.log('rond 2 ', x.length)
    for (var i = 0; i < x.length; i++) {
      if (dataIndexList[i].index < 0) {
        x[i].style.visibility = "hidden";
      }
    }
    x = document.getElementsByClassName("div..ant-slider-handle.ant-slider-handle-1")
    console.log('rond 1 ', x.length)
    for (var i = 0; i < x.length; i++) {
      if (dataIndexList[i].index > 0) {
        x[i].style.visibility = "hidden";
      }
    }
    this.setState({ dataIndex: dataIndexList })
  }

  render() {
    let { dataIndex } = this.state
    return (
      <div className="App" style={{ margin: 'auto', top: 0, bottom: 0, left: 0, right: 0, maxWidth: 800 }}>
        <section style={containerStyle}>
          <FormGroup>
            {/* Trier les dataIndex */}
            {/* Séparer les dataIndex */}
            {/* créer plusieurs PHF_Index , échelle 2.5 & 90 */}
            <FormBasicRadarChartWithoutDomains
              data={newradar}
              width={600}
              height={600}
              labelMax={true}
              // labelMin={true}
              labelValue={true} />
            <RaisedButton label="Index Morphologie" onClick={(e) => this.change(e)} primary />
            <div style={{ display: 'block' }}>
              <PHF_Index
                // valeur={item.val}
                echelle={2.5}
                data={dataIndex}
                format
              />
            </div>
          </FormGroup>
        </section>
      </div>
    );
  }
}
