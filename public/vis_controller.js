import React from 'react';
import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiText
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';

import ReactDOM from 'react-dom';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';

import customData from './data.json';


export class VisController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //   /*
  //      FOR EXAMPLE PURPOSES ONLY.  There are much better ways to
  //      manage state and update your UI than this.
  //   */
  //   const { httpClient } = this.props;
  //   httpClient.get('../api/pivottable/example').then((resp) => {
  //     this.setState({ time: resp.data.time });
  //   });
  // }

  render() {
    const { title } = this.props;
    // const data = [['attribute', 'attribute2'], [500, 120]];	  
    const data = customData;

    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <EuiTitle size="l">
              <h1>
                <FormattedMessage
                  id="pivottable.helloWorldText"
                  defaultMessage="{title}"
                  values={{ title }}
                />
              </h1>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent>
            {/* <EuiPageContentHeader>
              <EuiTitle>
                <h2>
                  <FormattedMessage
                    id="pivottable.congratulationsTitle"
                    defaultMessage="Congratulations"
                  />
                </h2>
              </EuiTitle>
            </EuiPageContentHeader> */}
            <EuiPageContentBody>
              {/* <EuiText>
                <h3>
                  <FormattedMessage
                    id="pivottable.congratulationsText"
                    defaultMessage="You have successfully created your first Kibana Plugin!"
                  />
                </h3>
                <p>
                  <FormattedMessage
                    id="pivottable.serverTimeText"
                    defaultMessage="The server time (via API call) is {time}"
                    values={{ time: this.state.time || 'NO API CALL YET' }}
                  />
                </p>
              </EuiText> */}
                  <PivotTableUI
                    data={data}
                    onChange={s => this.setState(s)}
                    {...this.state}/>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}


// class VisController {
//   constructor(el, vis) {
//     this.vis = vis;
//     this.el = el;

//     this.container = document.createElement('div');
//     this.container.className = 'myvis-container-div';
//     this.el.appendChild(this.container);
//   }

//   destroy() {
//     this.el.innerHTML = '';
//   }

//   render(visData, status) {
//     // this.container.innerHTML = '';

//     // const table = visData.tables[0];
//     // const metrics = [];
//     // let bucketAgg;

//     // table.columns.forEach((column, i) => {
//     //   // we have multiple rows … first column is a bucket agg
//     //   if (table.rows.length > 1 && i == 0) {
//     //     bucketAgg = column.aggConfig;
//     //     return;
//     //   }

//     //   table.rows.forEach(row => {
//     //     const value = row[i];
//     //     metrics.push({
//     //       title: bucketAgg ? `${row[0]} ${column.title}` : column.title,
//     //       value: row[i],
//     //       formattedValue: column.aggConfig ? column.aggConfig.fieldFormatter('text')(value) : value,
//     //       bucketValue: bucketAgg ? row[0] : null,
//     //       aggConfig: column.aggConfig
//     //     });
//     //   });
//     // });

//     // metrics.forEach(metric => {
//     //   const metricDiv = document.createElement(`div`);
//     //   metricDiv.className = `myvis-metric-div`;
//     //   metricDiv.innerHTML = `<b>${metric.title}:</b> ${metric.formattedValue}`;
//     //   metricDiv.setAttribute('style', `font-size: ${this.vis.params.fontSize}pt`);
//     //   metricDiv.addEventListener('click', () => {
//     //     if (!bucketAgg) return;
//     //     const filter = bucketAgg.createFilter(metric.bucketValue);
//     //     this.vis.API.queryFilter.addFilters(filter);
//     //   });

//     //   this.container.appendChild(metricDiv);
//     // });

//     return new Promise(resolve => {

//       resolve('when done rendering');
//     });
//   }
// };

// export { VisController };
