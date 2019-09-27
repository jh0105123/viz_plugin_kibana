import jQuery from 'jquery';
import 'jqueryui';
import 'pivottable';

import 'pivottable/dist/pivottable.css';
import customData from './data.json';

window.$ = window.jQuery = jQuery;

export class VisController{
  constructor(el, vis) {
    this.vis = vis;
    this.el = el;

    this.container = document.createElement('div');
    this.container.className = 'myvis-container-div';
    this.el.appendChild(this.container);

    const data = eval(vis.indexPattern.originalBody.fields);
    const pivotDiv = document.createElement('div');
    pivotDiv.className = 'output';
    this.container.appendChild(pivotDiv);

    $( document ).ready( function() {
      $(".output").pivotUI(
        data,
        {
          //rows: ["TEAM"],
          // vals: ["시간"],
          //aggregatorName: value
        }
      );
    } );
  }

  destroy() {
    this.el.innerHTML = '';
  }

  // 변화 감지 이벤트 받는 곳
  async render(visData, status) {

    return new Promise(resolve => {
      resolve('when done rendering');
    });
  }
};
