import jQuery from "jquery";
import "jqueryui";
import "pivottable";

import "pivottable/dist/pivottable.css";
import "pivottable/dist/plotly_renderers.js";
import "./css/custom.css";
import "globals";
export const globals = {
  rendererName: "Table",
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

    globals.rendererName = vis.params.rendererName;
    globals.rows = vis.params.rows;
    globals.cols = vis.params.cols;
  }

  async render(visData, status) {
    var columnsName = [];
    var result = [];

    var metericType = String(null);
    var valsType = [];

    status.dimensions.metric.forEach(metric => {
      metericType = metric.aggType;
      metericType == "count" ? (metericType = "Count") : metericType;
      metericType == "Max" ? (metericType = "Maximum") : metericType;
      metericType == "Min" ? (metericType = "Minimum") : metericType;
      metericType == "Standard Deviation"
        ? (metericType = "Sample Standard Deviation")
        : metericType;
    });

    visData.columns.forEach((column, index) => {
      if (index == visData.columns.length - 1) {
        valsType.push(column["name"]);
      }
      columnsName.push(column["name"]);
    });

    visData.rows.forEach(row => {
      var tempObj = {};
      visData.columns.forEach((column, i) => {
        tempObj[columnsName[i]] = row[column["id"]];
      });
      result.push(tempObj);
    });

    if (this.vis.params.editMode)
      await this.renderPivotUITable(result, metericType, valsType);
    else await this.renderPivotTable(result, metericType, valsType);

    this.vis.params.rendererName = globals.rendererName;
    this.vis.params.rows = globals.rows;
    this.vis.params.cols = globals.cols;

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
        onRefresh: await this.configChanged.bind(this)
      },
      true
    );
  }

  configChanged(config) {
    if (config == undefined) return;

    if (config.rendererName == null) config.rendererName = "Table";

    globals.rendererName = config.rendererName;
    globals.rows = config.rows;
    globals.cols = config.cols;

    const stateCopy = this.vis.getState();

    if (
      stateCopy.params.rendererName != globals.rendererName ||
      JSON.stringify(stateCopy.params.rows) != JSON.stringify(globals.rows) ||
      JSON.stringify(stateCopy.params.cols) != JSON.stringify(globals.cols)
    ) {
      stateCopy.params.rendererName = globals.rendererName;
      stateCopy.params.rows = globals.rows;
      stateCopy.params.cols = globals.cols;
      this.vis.setState(stateCopy);
    }
  }

  destroy() {
    this.vis.updateState();
    this.el.innerHTML = "";
  }
}
