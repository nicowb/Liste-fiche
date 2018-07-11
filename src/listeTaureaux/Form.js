import React, { Component } from "react";
import { Spin, Input } from 'antd';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import PHF_Table from './PHF_Table'
import PhfButton from './PhfButton';
import PhfIcon from './PhfIcon';
import PhfInput from './PHF_Input';
import PHF_Select from "./PHF_Select";
import { Listing } from "./donnees";


/* VARIABLES */
const data = {};
const indexTypes = []
const Option = Select.Option;

var singleKey = 0; // variable servant de "suffixe" pour l'unicité de la clé des colonnes
var configColonne = ["Nom", "Père", "GPM", "Isu", "Ent."]; // on affiche seulement les colonnes présentes dans la config
var indexProduction = ["CD", "Inel", "TP", "TB", "MP", "MG", "Lait"]; // colonnes index production
var indexMorphologie = ["MO", "MA", "CC", "ME"]; // colonnes index morphologie
var indexFonctionnel = ["STMA", "REPRO", "TR", "Nai", "CV", "SX"]; // colonnes index fonctionnels
var titresColonnes = { // correspondance code clé - libellé 
  "COPAIP": "Pays",
  "NOBOVI": "Nom",
  "Origine": "Index",
  "NOPERE": "Père",
  "NOGPM": "GPM",
  "INSYNT": "Isu",
  "NOBOVIL": "Nom long",
  "NOETRA": "Nom étranger",
  "LORGCPS": "Ent",
  "COPAFN": "Tx par",
  "CDINEL": "CD",
  "INEL": "Inel",
  "INDETP": "TP",
  "INDETB": "TB",
  "INDEMP": "MP",
  "INDEMG": "MG",
  "INLAIT": "Lait",
  "INMOPH": "MO",
  "INMAPH": "MA",
  "INCCPH": "CC",
  "INMEPH": "ME",
  "INTRPH": "TR",
  "INFNAI": "NAI",
  "LORGCPS": "Ent.",
  "PRIX_CONV": "CV",
  "PRIX_SEXEE": "SX",
};

export default class ListeTaureaux extends Component {
  constructor(props) {
    super(props)
    singleKey = 0;
    // this.uploadFile = this.uploadFile.bind(this);
  }

  state = {
    /* table taureaux */
    listeColonnes: [], // toutes colonnes WS avec séparateur ";"
    mapColonnes: [], //totalité des colonnes
    vueColonnes: [], //colonnes à afficher suivant filtre et critères
    dspColonnes: [], //colonnes dispo non affichées
    listeDonnees: [], //toutes lignes WS avec séparateur ";"
    mapLignes: [], //totalité des lignes
    vueLignes: [], // lignes à afficher suivant filtre et critères
    uploadedFileContents: null,
    waitingForFileUpload: false,
    ascendant: false, //tri des colonnes {false=ascendant, true=descendant}
    keySort: '',
    fiche: false,
    loading: false,
    loadingProduction: false,
    loadingMorphologie: false,
    loadingFonctionnel: false,
    /* filtres */
    filterDropdownVisible: false,
    searchText: '',
    searchType: 'N', // critère de tri suivant type de colonne => {'N' = nombre , 'S' = string}    filtered: false,
    filters: false,
    visible: false,
    selectTI: null, //valeur filtre type index
    selectFR: null, //valeur filtre pays
    selectEN: null, //valeur filtre entreprise
  };
  componentDidMount() {
    var j = indexTypes.length;
    for (let i = 0; i < j; i++) {
      indexTypes.pop();
    }
    indexTypes.push(<Option key={0}>Production</Option>)
    indexTypes.push(<Option key={1}>Morphologie</Option>)
    indexTypes.push(<Option key={2}>Fonctionnels</Option>)
    this.uploadFile();
  }
  // This method will be sent to the child component
  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    console.log(e.target.name)
    this.setState({
      [e.target.name]: e.target.value,
      searchText: e.target.value,
    });
  };

  OnDlbClick(titleKey) {
    console.log(titleKey.props.children[0])
  }
  handleClick = e => {
    // e.preventDefault();
    console.log(`fiche ${e}`);
    this.state.fiche = true;
    // this.setState({fiche:true})
  };
  handleClick2 = e => {
    console.log(`coucou ${e}`);
  };
  handleFiche(params) {
    let { fiche } = this.state
    var cleIndex = params["cle_2_1"] + "-" + params["cle_1_1"]
    if (fiche) {
      // alert(`fiche ${cleIndex}`);
      this.props.onChange(cleIndex);
      this.setState({ fiche: false })
    }
  }
  // sortTable(table, ordre, bcp47String) {
  //   var bcpStr = bcp47String || "fr-BE",
  //     ctor = new Intl.Collator(bcpStr, { "numeric": true }),
  //     n = (ordre === "desc") ? (-1) : (1);

  //   table.sort(function (a, b) {
  //     return n * ctor.compare(a, b);
  //   });

  //   return table;
  // }
  onSort(sortKey, titleKey, isAscending) {
    // console.log(titleKey)
    let { keySort, searchType } = this.state;
    /* assuming your data is something like
    [
      {code pays:'FR', nom:'NIPSY VAL'},
      {code pays:'FR', nom:'MILARD BIS'},
    ]    */
    /* titre colonne <= titleKey.props.children[0] ex: 'name' */
    if (keySort !== titleKey.props.children[0]) {
      keySort = titleKey.props.children[0]
      isAscending = true;
    }
    var oScolonne = titleKey.props.children[0].trim()
    const data = this.state.vueLignes;
    // /* works*/
    switch (oScolonne.trim()) {
      case "Nom":
      case "Père":
      case "GPM":
      case "Ent.":
        //libellés
        console.log('libelle')
        searchType = 'S'
        data.sort((a, b) =>
          (a[sortKey] == b[sortKey] ? 0
            : (a[sortKey] < b[sortKey]) ? -1 : 1) * (isAscending ? 1 : -1)
          // (a[sortKey].toUpperCase() == b[sortKey].toUpperCase() ? 0
          //   : (a[sortKey].toUpperCase() < b[sortKey].toUpperCase()) ? -1 : 1) * (isAscending ? 1 : -1)
        )
        break;
      default:
        //nombres
        console.log('nombre')
        searchType = 'N'
        data.sort((a, b) =>
          a[sortKey].padStart(10, "0").localeCompare(b[sortKey].padStart(10, "0")) * (isAscending ? 1 : -1)
          // a[sortKey].padStart(10, "0").localeCompare(b[sortKey].padStart(5, "0")) * (isAscending ? 1 : -1)
        )
        break;
    }


    this.setState({ vueLignes: data, ascendant: !isAscending, keySort: keySort, searchType: searchType })
  }

  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }
  recherche(source, find) {
    let { searchType } = this.state
    // console.log('source :'+source)
    // console.log('find :'+find)
    var result = [];
    // for (var i = 0; i < source.length; ++i) {
    switch (searchType) {
      case 'N':
        if (source === find) {
          return result
        }
        break;
      case 'S':
        // If you want to search case insensitive use 
        if (source.indexOf(find) > -1 ||
          (source.toLowerCase().indexOf(find.toLowerCase()) > -1) ||
          (source.toUpperCase().indexOf(find.toUpperCase()) > -1)) {
          // if (source.toLowerCase().indexOf(find.toLowerCase())>-1){
          // if (source.substring(i, i + find.length).toLowerCase() === find.toLowerCase()) {
          // if (source.substring(i, i + find.length) == find) {
          return result
        }
        break;
    }
    // }
    return null;
  }

  onSearch = (searchColonne, searchMultiColonnes = false) => {
    // console.log(searchColonne)
    // console.log(this.state.searchText)

    if (searchMultiColonnes) {

    } else {
      if (this.state.searchText === '') return null
      var tLignes = []
      tLignes = this.state.mapLignes.map((record, item) => {
        if (this.recherche(record[searchColonne], this.state.searchText) === null) {
          return null
        } else {
          return {
            ...record,
          }
        };
      }).filter(record => !!record)
    }

    if (tLignes.length === 0) {
      tLignes.push({})
      tLignes[0]['key'] = 0
      tLignes[0]['Nom'] = 'no data'
    }
    this.getVueLignes(tLignes)
    this.setState({
      filterDropdownVisible: false,
      filtered: !!this.state.searchText,
    });
  }

  getColName(cleColonne) {
    // myArray.id3 = 400;
    // myArray[titreColonne] = 500;
    // console.log(cleColonne)
    return titresColonnes[cleColonne] === undefined ? cleColonne : titresColonnes[cleColonne]
  }
  getFiltres() {
    let { filters } = this.state
    this.setState({ searchType: 'M', filters: !filters })
  }


  getColumns(tColonnes, e) {
    //faire le traitement de visu avec 'hiddenColumns'
    // => tableau d'indices de colonnes à cacher
    // => nouveau traitement  
    // var hid= hiddenColonnes[0].split(";");
    // console.log(this)
    let { mapColonnes, vueColonnes, dspColonnes } = this.state
    singleKey++;

    // RAZ des colonnes
    var j = mapColonnes.length
    for (let i = 0; i < j; i++) {
      mapColonnes.pop();
    }
    j = vueColonnes.length;
    for (let i = 0; i < j; i++) {
      vueColonnes.pop();
    }
    j = dspColonnes.length;
    for (let i = 0; i < j; i++) {
      dspColonnes.pop();
    }
    var _this = this;

    /* code de chargement des colonnes */
    tColonnes.map(function (columnName, i) {
      // => nouveau traitement 'SI PAS i ALORS PUSH
      var colName = _this.getColName(columnName)
      var keyName = `cle_${i}_${singleKey}`
      // var cela = _this;
      mapColonnes.push({
        title: colName,
        dataIndex: keyName,
        key: keyName,
        width: 150,
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => _this.searchInput = ele}
              placeholder={`saisie ${colName}`}
              // value={_this.state.searchText}
              onChange={_this.onInputChange}
              onPressEnter={(e) => _this.onSearch(keyName)}
            />
            {/* <Button
              type="primary"
              // libelle="Recherche"
              // couleur='bleu'
              // marge={15}               
              onClick={(e) => _this.onSearch(keyName, colName)}>Recherche</Button> */}
          </div>
        ),
        // filterIcon:
        //   // <Icon type="smile-o" style={{ color: _this.state.filtered ? '#108ee9' : '#aaa' }} />
        //   _this.state.loading ? null :
        //       <Icon title="recherche" type="smile-o" style={{ color: _this.state.filtered ? '#108ee9' : '#aaa' }} />

        // ,
        // filterDropdownVisible: _this.state.filterDropdownVisible,
        // onFilterDropdownVisibleChange: () => {
        //      () => _this.searchInput && _this.searchInput.focus();
        //  },
        // sorter:true,
        // fixed:colName === "Nom" ?'left':null,
        render: (text, column) => {
          //console.log(column);
          //console.log(column["cle_2_1"] + "-" + column["cle_1_1"]);
          return (
            colName === "Nom" ?
              <span className='row-icon'>
                {/* <Link to={'/' + column["cle_2_1"] + "-" + column["cle_1_1"]}>
            <a href="#" onClick={() => _this.handleClick(text)}>
                  {text}
                  </a></Link> */}
                <Link to={'/' + column["cle_2_1"] + "-" + column["cle_1_1"]} onClick={() => _this.handleClick(text)}> {/* change <a> vers <Link> pour modifier l'URL*/}
                  {text}</Link>
                {/* <PhfIcon
                // type="edit"
                select
                onIconAddClick={() => _this.handleClick2(text)}
              /> */}
              </span>
              :
              text
          );
        },
        onHeaderCell: (column) => {
          return {

            onClick: () => {
              _this.onSort(column.key, column.title, _this.state.ascendant)
            },
            // onDoubleClick:()=>{
            //   _this.OnDlbClick(column.title)
            // }
          };
        },
        onRow: (text) => {
          <span className='row-icon'>
            <PhfIcon
              // type="edit"
              select
              onIconAddClick={() => _this.handleClick2(text)}
            />
          </span>
        },

        sortOrder: 'descend',
      })
      // console.log(columnName)

      /* AJOUTER PROPS COLONNE*/
      // if (columnName==='NOBOVI'){
      //   mapColonnes[i].filterIcon= <Icon type="smile-o" style={{ color: _this.state.filtered ? '#108ee9' : '#aaa' }} />
      //   mapColonnes[i].filterDropdownVisible= _this.state.filterDropdownVisible
      //   mapColonnes[i].onFilterDropdownVisibleChange= (visible) => {
      //     _this.setState({
      //       filterDropdownVisible: visible,
      //     }, () => _this.searchInput);
      //   }
      // }
    })
    this.setState({})
    this.getVueColonnes(e);
  }
  getVueLignes(tLignes) {
    let { vueLignes, mapLignes } = this.state
    var j = vueLignes.length;
    for (let i = 0; i < j; i++) {
      vueLignes.pop();
    }
    // création des tableaux avec colonnes à afficher ou dispo
    for (var i = 0; i < tLignes.length; i++) {
      const resultat = mapLignes.find(ligne => ligne.key === tLignes[i].key) !== undefined
      if (resultat) {
        vueLignes.push(tLignes[i]);
      }
    }
    console.log(vueLignes)
    this.setState({ vueLignes: vueLignes })
  }

  // Configuration des colonnes
  getVueColonnes = typeIndex => {
    let { mapColonnes, dspColonnes, vueColonnes, loadingProduction, loadingMorphologie, loadingFonctionnel } = this.state
    var addProduction = false, addMorphologie = false, addFonctionnel = false
    // on affiche ou pas les colonnes d'index de production
    if (typeIndex === 'P') {
      if (!loadingProduction) {
        addProduction = true;
      }
      this.setState({ loadingProduction: !loadingProduction })
    } else {
      if (loadingProduction) {
        addProduction = true;
      }
    }
    // on affiche ou pas les colonnes d'index de morphologie
    if (typeIndex === 'M') {
      if (!loadingMorphologie) {
        addMorphologie = true;
      }
      this.setState({ loadingMorphologie: !loadingMorphologie })
    } else {
      if (loadingMorphologie) {
        addMorphologie = true;
      }
    }
    // on affiche ou pas les colonnes d'index fonctionnels
    if (typeIndex === 'F') {
      if (!loadingFonctionnel) {
        addFonctionnel = true;
      }
      this.setState({ loadingFonctionnel: !loadingFonctionnel })
    } else {
      if (loadingFonctionnel) {
        addFonctionnel = true;
      }
    }
    /*RAZ Liste colonnes*/
    var j = vueColonnes.length;
    for (let i = 0; i < j; i++) {
      vueColonnes.pop();
    }
    j = dspColonnes.length;
    for (let i = 0; i < j; i++) {
      dspColonnes.pop();
    }
    // switch (typeIndex) {
    //   case "P":
    //   case "M":
    //   case "F":
    //     // ré-initialisation des tableaux avec colonnes à afficher ou dispo
    //     var j = vueColonnes.length;
    //     for (let i = 0; i < j; i++) {
    //       vueColonnes.pop();
    //     }
    //     j = dspColonnes.length;
    //     for (let i = 0; i < j; i++) {
    //       dspColonnes.pop();
    //     }
    //     break;
    //   default:
    //     break;
    // }
    // création des tableaux avec colonnes à afficher ou dispo
    for (var i = 0; i < mapColonnes.length; i++) {
      var value = mapColonnes[i]
      // on affiche seulement les colonnes présentes dans la config
      var cle = (value.title)
      if (configColonne.indexOf(cle) > -1) {
        vueColonnes.push(value);
      } else {
        var dispo = true
        if (addProduction && indexProduction.indexOf(cle) > -1) {
          dispo = false
        }
        if (addMorphologie && indexMorphologie.indexOf(cle) > -1) {
          dispo = false
        }
        if (addFonctionnel && indexFonctionnel.indexOf(cle) > -1) {
          dispo = false
        }
        !dispo ? vueColonnes.push(value) : dspColonnes.push(value)
      }
    }
    this.setState({ vueColonnes: vueColonnes })
  }

  /* MISE A JOUR DU NOM CAS TAUREAU */
  getNobovi = (lignes, indice) => {
    // Si NOBOVI => NOBOVI {liste[0,4]}
    // SI PAS NOBOVI => NOETRA {liste[0,5]} ou NOM LONG
    // SI PAS DE NOMLONG ET PAS DE NOBOVI => COPAIP {liste[0,1]}+NUNATI {liste[0,2]}
    for (let i = 0; i < lignes.length - 1; i++) { // 'tLignes.length - 1' pour dernière ligne vide
      var liste = lignes[i].split(";")
      liste[i, 4] = (liste[i, 4] === '') ? (liste[i, 5] === '' ? liste[i, 1] + liste[i, 2] : liste[i, 5]) : liste[i, 4];
      lignes[i] = liste.join(";")
      // dataNobovi[i][5];
    }

  }
  /* AJOUT DES LIGNES */
  getLignes(tLignes) {
    let { mapLignes, vueLignes, mapColonnes } = this.state
    this.getNobovi(tLignes)
    var j = mapLignes.length;
    for (let i = 0; i < j; i++) {
      mapLignes.pop();
    }
    j = vueLignes.length;
    for (let i = 0; i < j; i++) {
      vueLignes.pop();
    }
    /* POUR CHAQUE LIGNE */
    for (let i = 0; i < tLignes.length - 1; i++) { // 'tLignes.length - 1' pour dernière ligne vide
      var vLigne = tLignes[i].split(";");
      /* POUR CHAQUE COLONNE */
      mapLignes[i] = {}; //création de la ligne indice 'i'
      mapLignes[i]["key"] = i
      mapColonnes.forEach((value, index) => {
        var cle = (value.dataIndex).toString()
        mapLignes[i][cle] = vLigne[index] === "NULL" ? "-" : vLigne[index];
      })
      vueLignes.push(mapLignes[i])
    }
    this.setState({ loading: false })
  }

  /* LECTURE ASYNCHRONE DU FICHIER SOURCE */
  readUploadedFileAsText = inputFile => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsText(inputFile);
    });
  };

  // /* Mise à jour affectation COLONNES+LIGNES */
  // drawColumns = e => {
  //   const { listeColonnes, listeDonnees } = this.state
  //   var col = listeColonnes[0].split(";");
  //   var lig = listeDonnees.slice(1); //retrait liste des colonnes sur 1ère ligne
  //   lig[lig.length - 1] === '' ? lig.slice(lig.length) : {}
  //   this.getColumns(col, e)
  //   this.getLignes(lig)
  // }

  /* Mise à jour affectation COLONNES+LIGNES */
  drawColumns = e => {
    const { listeColonnes, listeDonnees } = this.state
    console.log(listeColonnes)
    var col = listeColonnes[0].split(";");
    var lig = listeDonnees.slice(1); //retrait liste des colonnes sur 1ère ligne
    lig[lig.length - 1] === '' ? lig.slice(lig.length) : {}
    this.getColumns(col, e)
    this.getLignes(lig)
  }

  /* Lecture fichier CSV et affectation des variables pour la table */
  uploadFile() {
    console.log(Listing)
    /* mise à jour listeColonnes*/
    var mesColonnes=Listing.split('\n', 1);
    var mesLignes=Listing.split('\n');
    console.log(mesColonnes)
    this.setState({
      loading:true,
      uploadedFileContents: Listing,
      waitingForFileUpload: false,
      listeColonnes: mesColonnes,
      listeDonnees: mesLignes,
    });
    var col = mesColonnes[0].split(";");
    var lig = mesLignes.slice(1); //retrait liste des colonnes sur 1ère ligne
    lig[lig.length - 1] === '' ? lig.slice(lig.length) : {}
    this.getColumns(col, '')
    this.getLignes(lig)
  }

  // uploadFile = async event => {
  //   event.persist();

  //   if (!event.target || !event.target.files) {
  //     return;
  //   }

  //   this.setState({ waitingForFileUpload: true, loading: true });

  //   const fileList = event.target.files;
  //   // Uploads will push to the file input's `.files` array. Get the last uploaded file.
  //   const latestUploadedFile = fileList.item(fileList.length - 1);
  //   try {
  //     const fileContents = await this.readUploadedFileAsText(latestUploadedFile);
  //     console.log(fileContents)
  //     /* mise à jour listeColonnes*/
  //     this.setState({
  //       uploadedFileContents: fileContents,
  //       waitingForFileUpload: false,
  //       listeColonnes: fileContents.split('\n', 1),
  //       listeDonnees: fileContents.split('\n'),
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     this.setState({
  //       waitingForFileUpload: false
  //     });
  //   } finally {
  //     this.drawColumns('');
  //   }
  // };
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }
  hide = () => {
    this.setState({
      visible: false,
    });
  }
  handleChange = (value) => {
    console.log(`Selected: ${value}`);
    this.state.loadingProduction = false;
    this.state.loadingMorphologie = false;
    this.state.loadingFonctionnel = false;
    var _this = this
    value.forEach(function (element) {
      console.log(element);
      switch (element) {
        case '0':
          _this.state.loadingProduction = true;
          break;
        case '1':
          _this.state.loadingMorphologie = true;
          break;
        case '2':
          _this.state.loadingFonctionnel = true;
          break;
      }
    });
    _this.getVueColonnes('')
  }
  render() {
    let { vueColonnes, vueLignes, loading, filters, selectTI } = this.state
    //, maxWidth: 800 }}>
    // console.log('filtre : ' + filters)

    return (
      <div className="App" style={{ margin: 'auto' }}>
        <p>test</p>
        {/* <input type="file" id="csvFileInput" onChange={this.uploadFile} /> */}
        {loading ?
          <div className='root' style={{ position: 'fixed', top: '20%', left: '50%' }}>
            <Spin />
          </div>
          :
          //style={{ verticalAlign: 'center' }}
          <div className='root'>
            {vueLignes.length !== 0 ?
              <span>
                <Select
                  mode="multiple"
                  size='default'
                  placeholder="sélection des index à afficher"
                  onChange={this.handleChange}
                  style={{ width: '100%' }}
                >
                  {indexTypes}
                </Select>
                <PhfButton
                  libelle="Filtres"
                  marge={15}
                  action={e => this.getFiltres()}
                  largeur='-webkit-fill-available'
                />
                <span>
                  {filters ?
                    <span>
                      <PhfInput
                        name="nom"
                        inputName="nomName"
                        libelle="Nom"
                        largeur={150}
                        action={e => this.change(e)} />
                      <PhfInput
                        name="isu"
                        inputName="isuName"
                        libelle="ISU"
                        largeur={50}
                        action={e => this.change(e)} />
                      <PHF_Select
                        optionsContent='Pays'
                        action={e => this.getMultiSelect}
                        largeur={200}
                        marge={20}
                      />
                      <PHF_Select
                        optionsContent='Entreprise'
                        action={e => this.getMultiSelect}
                        largeur={200}
                        marge={20}
                      />
                      <PHF_Select
                        optionsContent='TypeIndex'
                        action={e => this.getMultiSelect}
                        largeur={250}
                        marge={20}
                      />
                      <PhfButton
                        libelle="Recherche"
                        marge={15}
                        couleur='vert'
                        action={e => this.onSearch('cle_4_1')}
                      />
                    </span> : null}
                </span>
                <PhfIcon
                  index
                  print
                  refresh
                  onRefreshClick={() => this.drawColumns('')}
                />
                <PHF_Table
                  // cle= "key"
                  data={vueLignes}
                  colonnes={vueColonnes}
                  callback={this.handleFiche.bind(this)}
                // loading={loading}
                // action={e => this.handleClick(e)}
                // scroll_y= {270}
                // pageSize={20}
                />
              </span>
              : ""}
          </div>}
      </div>
    );
  }
}
