import React, { Component } from 'react';
import jQuery from 'jquery';
import 'jqueryui';
import 'pivottable';

import 'pivottable/dist/pivottable.css';
import customData from './data.json';

window.$ = window.jQuery = jQuery;

export class VisController extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  _rederMetric=()=>{
    // return(
    //   <div>hello</div>
    // );
  };

  render(){
    retrun (hello);
    // let metricsHtml;
    // if(this.props.visData){
    //   metricsHtml = _rederMetric;
    // }
    // return (<div>hello</div>);
  }

  componentDidMount() {
    this.props.renderComplete();
  }

  componentDidUpdate() {
    this.props.renderComplete();
  }

  // constructor(el, vis) {
  //   this.vis = vis;
  //   this.el = el;

  //   this.container = document.createElement('div');
  //   this.container.className = 'myvis-container-div';
  //   this.el.appendChild(this.container);

  //   $( document ).ready( function() {
  //     $(".output").pivotUI(
  //       customData,
  //       {
  //         rows: ["TEAM"],
  //         vals: ["시간"],
  //         aggregatorName: "Count"
  //       }
  //     );
  //   } );

  //   const pivotDiv = document.createElement('div');
  //   pivotDiv.className = 'output';
  //   this.container.appendChild(pivotDiv);
  // }

  // destroy() {
  //   this.el.innerHTML = '';
  // }

  // render(visData, status) {

  //   return new Promise(resolve => {
  //     resolve('when done rendering');
  //   });
  // }
};

