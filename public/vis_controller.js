import jQuery from "jquery";
import "jqueryui";
import "pivottable";

import "pivottable/dist/pivottable.css";
import "pivottable/dist/plotly_renderers.js";
import "./css/custom.css";

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
  }

  async render(visData, status) {
    let configs = {
      rendererName: "Table",
      cols: [],
      rows: [],
      metericTypes: new Map([
        ["Count", "Count"],
        ["Average", "Average"],
        ["Sum", "Sum"],
        ["Min", "Minimum"],
        ["Max", "Maximum"],
        ["Median", "Median"],
        ["Standard Deviation", "Sample Standard Deviation"]
      ])
    };

    // configs.rendererName = vis.params.rendererName;
    // configs.rows = vis.params.rows;
    // configs.cols = vis.params.cols;

    var columnsName = [];
    var result = [];

    var metericType = String(null);
    var valsType = [];

    // status.dimensions.metric.forEach(metric => {
    //   metericType = configs.metericTypes.get(metric.aggType);
    // });

    visData.columns.forEach((column, index) => {
      if (index == visData.columns.length - 1) {
        valsType.push(column["name"]);
        metericType = configs.metericTypes.get(column["name"].split(" ")[0]);
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
      await this.renderPivotUITable(result, metericType, valsType, configs);
    else await this.renderPivotTable(result, metericType, valsType, configs);

    this.vis.params.rendererName = configs.rendererName;
    this.vis.params.rows = configs.rows;
    this.vis.params.cols = configs.cols;

    return new Promise(resolve => {
      resolve("when done rendering");
    });
  }

  async renderPivotTable(result, metericType, valsType, configs) {
    $(".output").pivot(
      result,
      {
        cols: configs.cols,
        rows: configs.rows,
        vals: valsType,
        aggregatorName: metericType,
        aggregator: $.pivotUtilities.aggregators[metericType](valsType),
        renderers: $.extend(
          $.pivotUtilities.renderers,
          $.pivotUtilities.plotly_renderers
        ),
        rendererName: configs.rendererName,
        renderer: $.pivotUtilities.renderers[configs.rendererName],
        onRefresh: await this.configChanged.bind(this)
      },
      true
    );
  }

  async renderPivotUITable(result, metericType, valsType, configs) {
    $(".output").pivotUI(
      result,
      {
        cols: configs.cols,
        rows: configs.rows,
        vals: valsType,
        aggregatorName: metericType,
        rendererName: configs.rendererName,
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
    // if (config == undefined) return;
    // if (config.rendererName == null) config.rendererName = "Table";
    // configs.rendererName = config.rendererName;
    // configs.rows = config.rows;
    // configs.cols = config.cols;
    // const stateCopy = this.vis.getState();
    // if (
    //   stateCopy.params.rendererName != configs.rendererName ||
    //   JSON.stringify(stateCopy.params.rows) != JSON.stringify(configs.rows) ||
    //   JSON.stringify(stateCopy.params.cols) != JSON.stringify(configs.cols)
    // ) {
    //   stateCopy.params.rendererName = configs.rendererName;
    //   stateCopy.params.rows = configs.rows;
    //   stateCopy.params.cols = configs.cols;
    //   this.vis.setState(stateCopy);
    // }
  }

  destroy() {
    this.vis.updateState();
    this.el.innerHTML = "";
  }
}
