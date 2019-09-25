import jQuery from 'jquery';
import 'jqueryui';
import 'pivottable';

import 'pivottable/dist/pivottable.css';
import customData from './data.json';

window.$ = window.jQuery = jQuery;

$( document ).ready( function() {
  $("#output").pivotUI(
    customData
  );
} );

class VisController {
  constructor(el, vis) {
    this.vis = vis;
    this.el = el;

    this.container = document.createElement('div');
    this.container.className = 'myvis-container-div';
    this.el.appendChild(this.container);

    this.container.innerHTML = '<div id="output"/>';
    this.container.appendChild(this.container);
  }

  destroy() {
    this.el.innerHTML = '';
  }

  render(visData, status) {
    return new Promise(resolve => {
      resolve('when done rendering');
    });
  }
};

export { VisController };
