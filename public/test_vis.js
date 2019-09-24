import './test_vis.less';

import optionsTemplate from './options_template.html';
import { VisController } from './vis_controller';

import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

const MyNewVisType = (Private) => {
  const VisFactory = Private(VisFactoryProvider);

  return VisFactory.createAngularVisualization({
    name: 'test_vis',
    title: 'Test Vis',
    icon: 'fa fa-gear',
    description: 'test vuis',
    visualization: VisController,
    visConfig: {
      defaults: {
        // add default parameters
        fontSize: '30'
      },
    },
    editorConfig: {
      optionsTemplate: optionsTemplate
      // schemas: new Schemas([
      //   {
      //     group: 'metrics',
      //     name: 'metric',
      //     title: 'Metric',
      //     min: 1,
      //     aggFilter: ['!derivative', '!geo_centroid'],
      //     defaults: [
      //       { type: 'count', schema: 'metric' }
      //     ]
      //   }, {
      //     group: 'buckets',
      //     name: 'segment',
      //     title: 'Bucket Split',
      //     min: 0,
      //     max: 1,
      //     aggFilter: ['!geohash_grid', '!filter']
      //   }
      // ]),
    }
  });
}

VisTypesRegistryProvider.register(MyNewVisType);

// function TestVisProvider(Private) {
//   const VisFactory = Private(VisFactoryProvider);
//   const Schemas = Private(VisSchemasProvider);

//   return VisFactory.createBaseVisualization({
//     name: 'test_vis',
//     title: 'Test Vis',
//     icon: 'fa fa-gear',
//     description: 'test vuis',
//     visualization: VisController,
//     visConfig: {
//       defaults: {
//         // add default parameters
//         fontSize: '30'
//       },
//     },
//     editorConfig: {
//       optionsTemplate: optionsTemplate,
//       schemas: new Schemas([
//         {
//           group: 'metrics',
//           name: 'metric',
//           title: 'Metric',
//           min: 1,
//           aggFilter: ['!derivative', '!geo_centroid'],
//           defaults: [
//             { type: 'count', schema: 'metric' }
//           ]
//         }, {
//           group: 'buckets',
//           name: 'segment',
//           title: 'Bucket Split',
//           min: 0,
//           max: 1,
//           aggFilter: ['!geohash_grid', '!filter']
//         }
//       ]),
//     }
//   });
// }

// register the provider with the visTypes registry
// VisTypesRegistryProvider.register(TestVisProvider);
