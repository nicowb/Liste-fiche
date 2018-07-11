import React, { Component } from "react";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import PhfIcon from './PhfIcon';

const expandedRowRender = record => <p>{record.key}</p>;
const rowSelection = {
  hideDefaultSelections: false,
  // width:100
};
class PHF_Table extends Component {
  config = {
    pagination: {
      pageSize: 30,
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      showSizeChanger: true,
      showQuickJumper: true
    },
    size: "middle",
    // scroll:{y: 760 },
    // width: 'calc(100% - 40px)',
    // bordered:true,
    textAlign: 'right !important',
    display: 'flex',
    position: 'relative',
    // rowSelection:{rowSelection}
  }
  state = {
    bordered: false,
    expandedRowRender,
    title: undefined,
    showHeader: true,
    footer: undefined,
    pageSize: this.props.pageSize,
    scroll_x: this.props.scroll_x,
    scroll_y: this.props.scroll_y,
    cle: this.props.cle, //cle pour le rowkey
    data: this.props.data, //le tableau de base (fichier CSS, à filtrer au niveau des colonnes)
    colonnes: this.props.colonnes,
    ligne: {}, //variable contenant la ligne sélectionnée affichée dans le bas en mode json
    action: this.props.action,
  }
  handleRowClick(record) {
    this.setState({ ligne: record });
    this.props.callback(record) //je renvoie la valeur au parent
    // console.log(record)
  }
  // handleRowEnter(){
  //   this.props.waitTable(true)    
  // }
  render() {
    const state = this.state;
    return (
      <div>
        <Table {...this.state} {...this.config}
          columns={state.colonnes} dataSource={state.data}
          rowKey={state.cle}
          onRow={(record) => {
            return {
              onClick: () => {this.handleRowClick(record)},       // click row
              // onClick: () => {this.handleRowClick(record); state.action},       // click row
              // onMouseEnter: () => {this.handleRowEnter()},  // mouse enter row
              onMouseOver: () => {
          // console.log('coucou')
          // return (
          //   <span className='row-icon'>
          //     <PhfIcon
          //       // type="edit"
          //       select
          //       onIconAddClick={() => this.handleRowClick(record)}
          //     />
          //   </span>)
        },
        //onXxxx...
      };
    }}
  />
        <p>
          {JSON.stringify(state.ligne, null, 2)}
        </p>
      </div>
    );
  }
}
export default PHF_Table;