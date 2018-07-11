import React, { Component } from 'react';
import ListeTaureaux from './listeTaureaux/Form';
import FicheTaureaux from './ficheTaureaux/Form';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
//import { Switch, Route } from 'antd';
//import {BrowserRouter, Route, Switch, browserHistory } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  state = {
    fields: null
  };

  onChange = updatedValue => {
    console.log("fiche : ", updatedValue);
    this.setState({/*
      fields: {
        ...this.state.fields,
        ...updatedValue
      }*/
      fields: updatedValue
    });
  };


  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Router>
            <div>
                {
                  (!this.state.fields) && (
                    <div>
                      <Link to={'/'}></Link>
                      <ListeTaureaux onChange={fields => this.onChange(fields)}/>
                    </div>
                  )
                }
                {
                  (this.state.fields) && (
                    <div>
                      <Link to={'/'} onClick={() => this.onChange(null)}>
                         retour
                      </Link>
                      <FicheTaureaux onChange={() => this.onChange(this.state.fields)}/>
                    </div>
                  )
                }
            </div>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
