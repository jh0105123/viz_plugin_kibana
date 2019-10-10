// node_module import
import jQuery from "jquery";
import "jqueryui";
import "pivottable";

import "pivottable/dist/pivottable.css";
import "pivottable/dist/plotly_renderers.js";
import "globals";
export const globals = {
  isContentLoading: false,
  isDeployNeeded: true
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

    // $(".output").remove();
    // this.pivottableVis = document.createElement("div");
    // this.pivottableVis.className = "output";
    // this.container.appendChild(this.pivottableVis);

    if (this.vis.params.editMode)
      return this.renderPivotUITable(result, metericType, valsType);
    else return this.renderPivotTable(result, metericType, valsType);
  }

  async renderPivotTable(result, metericType, valsType) {
    $(".output").pivot(result, {
      vals: valsType,
      aggregatorName: metericType
    });
  }

  async renderPivotUITable(result, metericType, valsType) {
    alert(isDeployNeeded);

    $(".output").pivotUI(result, {
      // cols: $scope.table.config.cols,
      // rows: $scope.table.config.rows,
      vals: valsType,
      aggregatorName: metericType,
      renderers: $.extend(
        $.pivotUtilities.renderers,
        $.pivotUtilities.plotly_renderers
      ),
      //rendererName: "Bar Chart",
      onRefresh: function(config) {
        var config_copy = JSON.parse(JSON.stringify(config));
        //delete some values which are functions
        delete config_copy["aggregators"];
        delete config_copy["renderers"];
        delete config_copy["derivedAttributes"];
        //delete some bulky default values
        delete config_copy["rendererOptions"];
        delete config_copy["localeStrings"];

        this.vis = config_copy;
      }
    });
  }

  destroy() {
    this.el.innerHTML = "";
  }
}
