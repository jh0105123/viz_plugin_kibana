import jQuery from 'jquery';
import 'jqueryui';
import 'pivottable';

import 'pivottable/dist/pivottable.css';
import './vis.less';
import customData from './data.json';

window.$ = window.jQuery = jQuery;

class VisController {
  constructor(el, vis) {
    this.vis = vis;
    this.el = el;

    this.container = document.createElement('div');
    this.container.className = 'myvis-container-div';
    this.el.appendChild(this.container);
  }

  destroy() {
    this.el.innerHTML = '';
  }

  render(visData, status) {
    const data = customData;

    $(function(){
      $('div').removeClass('no-js');
    });

    $( document ).ready( function() {
      $("#output").pivotUI(
        data
      );
    } );

    const pivotDiv = document.createElement(`div`);
    pivotDiv.innerHTML = '<div id="output" class="no-js"/>';
    this.container.appendChild(pivotDiv);

    return new Promise(resolve => {

      resolve('when done rendering');
    });
  }
};

export { VisController };
