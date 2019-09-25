import React from 'react';
import jQuery from 'jquery';
import 'jqueryui';
import 'pivottable';

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

  //   $(".output").pivot(
  //     [
  //         {color: "blue", shape: "circle"},
  //         {color: "red", shape: "triangle"}
  //     ],
  //     {
  //         rows: ["color"],
  //         cols: ["shape"]
  //     }
  // );

    $( document ).ready( function() {
      alert("hello world");
      // $(".output").pivotUI(
      //   [
      //       {color: "blue", shape: "circle"},
      //       {color: "red", shape: "triangle"}
      //   ],
      //   {
      //       rows: ["color"],
      //       cols: ["shape"]
      //   }
      // );
    } );


    // this.container.innerHTML = '';

    const pivotDiv = document.createElement(`div`);
    pivotDiv.className = 'output';
    this.container.appendChild(pivotDiv);

    // const table = visData.tables[0];
    // const metrics = [];
    // let bucketAgg;

    // table.columns.forEach((column, i) => {
    //   // we have multiple rows … first column is a bucket agg
    //   if (table.rows.length > 1 && i == 0) {
    //     bucketAgg = column.aggConfig;
    //     return;
    //   }

    //   table.rows.forEach(row => {
    //     const value = row[i];
    //     metrics.push({
    //       title: bucketAgg ? `${row[0]} ${column.title}` : column.title,
    //       value: row[i],
    //       formattedValue: column.aggConfig ? column.aggConfig.fieldFormatter('text')(value) : value,
    //       bucketValue: bucketAgg ? row[0] : null,
    //       aggConfig: column.aggConfig
    //     });
    //   });
    // });

    // metrics.forEach(metric => {
    //   const metricDiv = document.createElement(`div`);
    //   metricDiv.className = `myvis-metric-div`;
    //   metricDiv.innerHTML = `<b>${metric.title}:</b> ${metric.formattedValue}`;
    //   metricDiv.setAttribute('style', `font-size: ${this.vis.params.fontSize}pt`);
    //   metricDiv.addEventListener('click', () => {
    //     if (!bucketAgg) return;
    //     const filter = bucketAgg.createFilter(metric.bucketValue);
    //     this.vis.API.queryFilter.addFilters(filter);
    //   });

    //   this.container.appendChild(metricDiv);
    // });

    // return new Promise(resolve => {

    //   resolve('when done rendering');
    // });

    // return (
    //   <div id="output"></div>
    // );

    return new Promise(resolve => {

      resolve('when done rendering');
    });
  }
};

export { VisController };
