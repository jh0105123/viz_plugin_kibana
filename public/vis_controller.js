import jQuery from 'jquery';
import 'jqueryui';
import 'pivottable';

import 'pivottable/dist/pivottable.css';
import customData from './data.json';

window.$ = window.jQuery = jQuery;

class VisController {
  constructor(el, vis) {
    this.vis = vis;
    this.el = el;

    this.container = document.createElement('div');
    this.container.className = 'myvis-container-div';
    this.el.appendChild(this.container);

    $( document ).ready( function() {
      $(".output").pivotUI(
        customData,
        {
          rows: ["TEAM"],
          vals: ["시간"],
          aggregatorName: "Sum"
        }
      );
    } );

    const pivotDiv = document.createElement('div');
    pivotDiv.className = 'output';
    this.container.appendChild(pivotDiv);
  }

  destroy() {
    this.el.innerHTML = '';
  }

  render(visData, status) {
    const table = visData;
    
    alert(table);

    return new Promise(resolve => {
      resolve('when done rendering');
    });
  }
};

export { VisController };
