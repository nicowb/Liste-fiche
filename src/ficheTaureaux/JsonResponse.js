import React, { Component } from 'react';
import '../App.css';


export default class JSONFile extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataFile: null,
            dataArray: null
        };
        this.handleFiles = this.handleFiles.bind(this);
        this.loadHandler = this.loadHandler.bind(this);
    };


    /* Vérification de compatibilité */
    handleFiles(FileList) {
        // Check for the various File API support.
        if (window.FileReader) {
            // FileReader are supported.
            if(FileList[0] != null){
                this.getAsText(FileList[0]);
            }
        } else {
            alert('FileReader are not supported in this browser.');
        }
    }

    /* Ouverture du fichier */
    getAsText(fileToRead) {
        var reader = new FileReader();
        // Handle errors load
        reader.onload = this.loadHandler;
        reader.onerror = this.errorHandler;
        // Read file into memory as UTF-8      
        reader.readAsText(fileToRead);
    }

    /* Récupération des données */
    loadHandler(event) {
        var csv = event.target.result;  
        this.drawOutput(csv);          
    }


    errorHandler(evt) {
        if(evt.target.error.name === "NotReadableError") {
            alert("Canno't read file !");
        }
    }


    /* Mise à jour du state avec les données CSV */
    drawOutput(lines){
        this.props.callback({data: lines});
    }
    render(){
        return(
            <div>
                <label id="csvFileInput"><strong>JSON File:</strong></label>
                <input type="file" id="csvFileInput" onChange={(e) => this.handleFiles(e.target.files)} accept=".json"/>
            </div>
        );
    };
}

/* LES DONNEES SONT TRANSFORMEES EN OBJET JSON */
export function processData(filedata, parent, child, constantes){
    // var file = JSON.parse(filedata.data);
    const dataNode = filedata[parent][0][child];
    console.log(dataNode)
    var newData = [];
    //var result = CreateArrayData(dataNode, constantes);
    var result = CreateArrayData2(dataNode, constantes);
    if(result !== []){
        Array.prototype.push.apply(newData,result);
    }
    const sortDATA = sortJSON(newData, constantes);
    return sortDATA;
}

/* CREATION DU TABLEAU D'OBJETS */
function CreateArrayData(dataJSON, constantes){
    var newData = [];
    var newObj = null;
    for(var node in dataJSON){
        const keyLabels = Object.keys(constantes);
        if(keyLabels.includes(node) === true){
            newObj = {};
            newObj["key"] = node; //à automatiser
            newObj["index"] = dataJSON[node].VAL; //à automatiser
            newObj["label"] = constantes[node]; //à automatiser
            if(dataJSON[node].CD){
                newObj["CD"] = dataJSON[node].CD; //à automatiser
            }
            newData.push(newObj);

            if(node === "LAIT"){
                newObj = {};
                newObj["key"] = "NF_LAIT"; //à automatiser
                newObj["index"] = dataJSON[node].NF; //à automatiser
                newObj["label"] = constantes["NF_LAIT"]; //à automatiser
                if(dataJSON[node].CD){
                    newObj["CD"] = dataJSON[node].CD; //à automatiser
                }
                newData.push(newObj);
            }
            if(node === "MO"){
                newObj = {};
                newObj["key"] = "NF_MO"; //à automatiser
                newObj["index"] = dataJSON[node].NF; //à automatiser
                newObj["label"] = constantes["NF_MO"]; //à automatiser
                if(dataJSON[node].CD){
                    newObj["CD"] = dataJSON[node].CD; //à automatiser
                }
                newData.push(newObj);
            }
        }
    }
    return newData;
}

function CreateArrayData2(dataJSON, constantes){
    var newData = [];
    var newObj = null;
    for(var cle in constantes){
        const keyLabels = Object.keys(dataJSON);
        if(keyLabels.includes(cle) === true){
            newObj = {};
            newObj["key"] = cle; //à automatiser
            newObj["index"] = dataJSON[cle].VAL; //à automatiser
            newObj["label"] = constantes[cle]; //à automatiser
            if(dataJSON[cle].CD){
                newObj["CD"] = dataJSON[cle].CD; //à automatiser
            }
            newData.push(newObj);

            switch(cle){
                case'LAIT':
                case 'MO':
                    newObj = {};
                    newObj["key"] = `NF_${cle}`; //à automatiser
                    newObj["index"] = dataJSON[cle].NF; //à automatiser
                    newObj["label"] = constantes[`NF_${cle}`]; //à automatiser
                    if(dataJSON[cle].CD){
                        newObj["CD"] = dataJSON[cle].CD; //à automatiser
                    }
                    newData.push(newObj);
                    break;
                default:
                    break;
            }
        }
    }
    return newData;
}

/* CREATION D'UN NOUVEAU TABLEAU TRIE */
function sortJSON(dataJSON, constantes){
    var newData = [];
    const keyLabels = Object.keys(constantes);
    for(var key in keyLabels){
        const node = findObjectByKey(dataJSON, keyLabels[key]);
        if(node){
            newData.push(node);
        }else if(keyLabels[key]){
            const newObj = {};
            newObj["key"] = keyLabels[key];
            newObj["index"] = "-";
            newObj["label"] = constantes[keyLabels[key]];
            newData.push(newObj);
        }
    }
    return newData; 
}

/* TROUVE ET RETOURNE UN OBJET DANS UN TABLEAU EN UTILISANT LA VALEUR DE "key" */
function findObjectByKey(dataJSON, key){
    for(var node in dataJSON){
        if(dataJSON[node].key === key){
            return dataJSON[node];
        }
    }
}

/* RENVOIE UN TABLEAU AVEC LES VALEURS NON TRAITEES DU RADAR */
export function replaceIndexValue(dataJSON, dataRadar){
    var newDataRadar = dataRadar;
    for(var node in dataRadar){
        const newValue = findValueByKey(dataJSON, dataRadar[node].key);
        newDataRadar[node].index = newValue;
    }
    return newDataRadar;
}

/* TROUVE ET RETOURNE UNE VALEUR DANS UN TABLEAU EN UTILISANT LA VALEUR DE "key" */
function findValueByKey(dataJSON, key){
    for(var node in dataJSON){
        if(dataJSON[node]){
            if(dataJSON[node].key === key){
                return dataJSON[node].index;
            }
        }
    }
}