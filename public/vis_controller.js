// node_module import
import React from "react";
import jQuery from "jquery";
import "jqueryui";
import "pivottable";

import "pivottable/dist/pivottable.css";
import customData from "./data.json";

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

    const metericType = String(null);
  }

  // 변화 감지 이벤트 받는 곳
  // 컴포넌스가 어떻게 생겼는지 정의하는 역할
  // html 형식의 문자열을 반환하지 않고 뷰가 어떻게 생겼고 어떻게 작동하는지에 대한 정보

  //default response handler
  async render(visData, status) {
    var columnsName = [];
    var result = [];

    visData.columns.forEach(column => {
      columnsName.push(column["name"]);

      const aggConfig = column.aggConfig.__type;
      if (aggConfig.type == "metrics") {
        metericType = aggConfig.title;
      }
    });

    visData.rows.forEach(row => {
      var tempObj = {};
      visData.columns.forEach((column, i) => {
        tempObj[columnsName[i]] = row[column["id"]];
      });
      result.push(tempObj);
    });

    return this._updateUI(result, metericType);
  }

  async _updateUI(result, metericType) {
    $(".output").remove();
    this.pivottableVis = document.createElement("div");
    this.pivottableVis.className = "output";
    this.container.appendChild(this.pivottableVis);

    $(".output").pivotUI(result, {
      // rows: ["TEAM"],
      vals: ["시간"],
      aggregatorName: metericType
    });
  }

  destroy() {
    this.el.innerHTML = "";
  }
}
