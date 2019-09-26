import './vis.less';

import optionsTemplate from './options_template.html';
import { VisController } from './vis_controller';
import { EditorController } from './editor_controller';

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
        fontSize: '30'
      }
    },
    editorConfig: {
      // optionsTemplate: EditorController
      // // defaults: {
      // //   my: 'custom config'
      // // }
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
      ])
    }
  });
}

// register the provider with the visTypes registry
VisTypesRegistryProvider.register(MyNewVisType);

//export default TestVisProvider;