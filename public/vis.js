import './vis.less';

import optionsTemplate from './options_template.html';
import { VisController } from './vis_controller';

import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import { Schemas } from 'ui/vis/editors/default/schemas';

const MyNewVisType = (Private) => {
  const VisFactory = Private(VisFactoryProvider);

  return VisFactory.createBaseVisualization({
    name: 'pivot_table',
    title: 'Pivot Table',
    icon: 'tableOfContents',
    description: 'Pivot Table',
    visualization: VisController,
    visConfig: {
      defaults: {
        // add default parameters
        fontSize: '30',
        config: {
          rows: "",
          cols: "",
          aggregatorName: "Count",
          vals:""
        },
        availableAggregatorOptions:[
          "Count",
          "Count Unique Values",
          "List Unique Values",
          "Sum",
          "Integer Sum",
          "Average",
          "Minimum",
          "Maximum",
          "First",
          "Last",
          "Sum over Sum",
          "80% Upper Bound",
          "80% Lower Bound",
          "Sum as Fraction of Total",
          "Sum as Fraction of Rows",
          "Sum as Fraction of Columns",
          "Count as Fraction of Total",
          "Count as Fraction of Rows",
          "Count as Fraction of Columns"
        ]
      },
    },
    editorConfig: {
      optionsTemplate: optionsTemplate,
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Metric',
          min: 1,
          aggFilter: ['!derivative', '!geo_centroid'],
          defaults: [
            { type: 'count', schema: 'metric' }
          ]
        }, {
          group: 'buckets',
          name: 'segment',
          title: 'Bucket Split',
          min: 0,
          max: 1,
          aggFilter: ['!geohash_grid', '!filter']
        }
      ]),
    },
    responseHandler: (response, dimensions) => {
      return new Promise(resolve => {
        // do stuff with the response
        resolve(response);
      });
    }
  });
}

// register the provider with the visTypes registry
VisTypesRegistryProvider.register(MyNewVisType);

//export default TestVisProvider;