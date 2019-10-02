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
    this.el.appendChild(this.container);

    // const pivotDiv = document.createElement("div");
    // pivotDiv.className = "output";
    // this.container.appendChild(pivotDiv);
  }

  // 변화 감지 이벤트 받는 곳
  // 컴포넌스가 어떻게 생겼는지 정의하는 역할
  // html 형식의 문자열을 반환하지 않고 뷰가 어떻게 생겼고 어떻게 작동하는지에 대한 정보

  //default response handler
  render(visData, status) {
    var columnsName = [];
    var result = [];

    visData.columns.forEach(column => {
      columnsName.push(column["id"]);
    });

    visData.rows.forEach(row => {
      var tempObj = {};
      visData.columns.forEach((column, i) => {
        tempObj[columnsName[i]] = row;
      });
      result.push(tempObj);
    });

    $(document).ready(function() {
      $(".output").pivotUI(result, {
        // rows: ["TEAM"],
        // vals: ["시간"],
        // aggregatorName: "Sum"
      });
    });

    const pivotDiv = document.createElement("div");
    pivotDiv.className = "output";
    this.container.appendChild(pivotDiv);

    return new Promise(resolve => {
      resolve("when done rendering");
    });
  }

  destroy() {
    this.el.innerHTML = "";
  }
}
