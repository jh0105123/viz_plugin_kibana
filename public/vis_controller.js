import jQuery from 'jquery';
import 'jqueryui';
import 'pivottable';

import 'pivottable/dist/pivottable.css';
import customData from './data.json';

window.$ = window.jQuery = jQuery;

export class VisController{
  // constructor(el, vis) {
  //   this.vis = vis;
  //   this.el = el;

  //   this.container = document.createElement('div');
  //   this.container.className = 'myvis-container-div';
  //   this.el.appendChild(this.container);

  //   $( document ).ready( function() {
  //     $(".output").pivotUI(
  //       customData,
  //       {
  //         rows: ["TEAM"],
  //         vals: ["시간"],
  //         aggregatorName: "Count"
  //       }
  //     );
  //   } );

  //   const pivotDiv = document.createElement('div');
  //   pivotDiv.className = 'output';
  //   this.container.appendChild(pivotDiv);
  // }

  // destroy() {
  //   this.el.innerHTML = '';
  // }

  // render(visData, status) {
  //   const config = this.vis.params.metric;

  //   alert(config);

  //   return new Promise(resolve => {
  //     resolve('when done rendering');
  //   });
  // }
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
    this.container.innerHTML = '';

    const table = visData;
    const metrics = [];
    let bucketAgg;

    table.columns.forEach((column, i) => {
      // we have multiple rows … first column is a bucket agg
      if (table.rows.length > 1 && i == 0) {
        bucketAgg = column.aggConfig;
        return;
      }

      table.rows.forEach(row => {
        const value = row[i];
        metrics.push({
          title: bucketAgg ? `${row[0]} ${column.title}` : column.title,
          value: row[i],
          formattedValue: column.aggConfig ? column.aggConfig.fieldFormatter('text')(value) : value,
          bucketValue: bucketAgg ? row[0] : null,
          aggConfig: column.aggConfig
        });
      });
    });

    metrics.forEach(metric => {
      const metricDiv = document.createElement(`div`);
      metricDiv.className = `myvis-metric-div`;
      metricDiv.innerHTML = `<b>${metric.title}:</b> ${metric.formattedValue}`;
      metricDiv.setAttribute('style', `font-size: ${this.vis.params.fontSize}pt`);
      metricDiv.addEventListener('click', () => {
        if (!bucketAgg) return;
        const filter = bucketAgg.createFilter(metric.bucketValue);
        this.vis.API.queryFilter.addFilters(filter);
      });

      this.container.appendChild(metricDiv);
    });

    return new Promise(resolve => {

      resolve('when done rendering');
    });
  }
};

