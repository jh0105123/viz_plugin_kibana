// node_module import
import jQuery from "jquery";
import "jqueryui";
import "pivottable";

import "pivottable/dist/pivottable.css";

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

    $(".output").remove();
    this.pivottableVis = document.createElement("div");
    this.pivottableVis.className = "output";
    this.container.appendChild(this.pivottableVis);

    if (this.vis.params.editMode)
      this.renderPivotUITable(result, metericType, valsType);
    else this.renderPivotTable(result, metericType, valsType);

    await Promise.all(renderArray);
  }

  async renderPivotTable(result, metericType, valsType) {
    $(".output").pivot(result, {
      vals: valsType,
      aggregatorName: metericType
    });
  }

  async renderPivotUITable(result, metericType, valsType) {
    $(".output").pivotUI(result, {
      vals: valsType,
      aggregatorName: metericType
    });
  }

  destroy() {
    this.el.innerHTML = "";
  }
}
