import jQuery from 'jquery';
import 'jqueryui';
import 'pivottable';
import 'pivottable/pivot.min.css';

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

    $( document ).ready( function() {
      // alert("hello world");
      $("#output").pivotUI(
        [
            {color: "blue", shape: "circle"},
            {color: "red", shape: "triangle"}
        ],
        {
            rows: ["color"],
            cols: ["shape"]
        }
      );
    } );

    const pivotDiv = document.createElement(`div`);
    pivotDiv.innerHTML = '<div id="output">hello</div>';
    this.container.appendChild(pivotDiv);

    return new Promise(resolve => {

      resolve('when done rendering');
    });
  }
};

export { VisController };
