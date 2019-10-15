// node_module import
import jQuery from "jquery";
import "jqueryui";
import "pivottable";

import "pivottable/dist/pivottable.css";
import "pivottable/dist/plotly_renderers.js";
import "./css/custom.css";
import "globals";
export const globals = {
  rendererName: "table",
  cols: [],
  rows: []
};

window.$ = window.jQuery = jQuery;
export class VisController {
  constructor(el, vis) {
    this.vis = vis;
    this.el = el;

    this.container = document.createElement("div");
    this.container.className = "myvis-container-div";
    this.container.style.cssText = "overflow: auto; width:100%;";
    this.el.appendChild(this.container);

    this.pivottableVis = document.createElement("div");
    this.pivottableVis.className = "output";
    this.container.appendChild(this.pivottableVis);

    globals.rows = vis.params.rows;
    globals.cols = vis.params.cols;
  }

  async render(visData, status) {
    var columnsName = [];
    var result = [];

    var metericType = String(null);
    var valsType = [];

    visData.columns.forEach(column => {
      columnsName.push(column["name"]);

      const aggConfig = column.aggConfig.__type;
      if (aggConfig.type == "metrics") {
        metericType = aggConfig.title;

        metericType == "Max" ? (metericType = "Maximum") : metericType;

        metericType == "Min" ? (metericType = "Minimum") : metericType;

        metericType == "Standard Deviation"
          ? (metericType = "Sample Standard Deviation")
          : metericType;

        valsType.push(column["name"]);
      }
    });

    visData.rows.forEach(row => {
      var tempObj = {};
      visData.columns.forEach((column, i) => {
        tempObj[columnsName[i]] = row[column["id"]];
      });
      result.push(tempObj);
    });

    if (this.vis.params.editMode)
      this.renderPivotUITable(result, metericType, valsType);
    else this.renderPivotTable(result, metericType, valsType);

    return new Promise(resolve => {
      resolve("when done rendering");
    });
  }

  async renderPivotTable(result, metericType, valsType) {
    $(".output").pivot(
      result,
      {
        cols: globals.cols,
        rows: globals.rows,
        vals: valsType,
        aggregatorName: metericType,
        aggregator: $.pivotUtilities.aggregators[metericType](valsType),
        renderers: $.extend(
          $.pivotUtilities.renderers,
          $.pivotUtilities.plotly_renderers
        ),
        rendererName: globals.rendererName,
        renderer: $.pivotUtilities.renderers[globals.rendererName],
        onRefresh: function onRefresh(config) {
          if (config == undefined) return;

          globals.rendererName = config.rendererName;
          globals.rows = config.rows;
          globals.cols = config.cols;
        }
      },
      true
    );
  }

  // this.vis.params.rows = globals.rows;
  // this.vis.params.cols = globals.cols;

  async renderPivotUITable(result, metericType, valsType) {
    $(".output").pivotUI(
      result,
      {
        cols: globals.cols,
        rows: globals.rows,
        vals: valsType,
        aggregatorName: metericType,
        rendererName: globals.rendererName,
        renderers: $.extend(
          $.pivotUtilities.renderers,
          $.pivotUtilities.plotly_renderers
        ),
        onRefresh: this.configChanged.bind(this)
      },
      true
    );
  }

  configChanged(config) {
    if (config == undefined) return;

    globals.rendererName = config.rendererName;
    globals.rows = config.rows;
    globals.cols = config.cols;
  }

  destroy() {
    this.el.innerHTML = "";
  }
}
