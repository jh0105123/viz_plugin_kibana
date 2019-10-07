import { VisFactoryProvider } from "ui/vis/vis_factory";
import { VisTypesRegistryProvider } from "ui/registry/vis_types";
import { Schemas } from "ui/vis/editors/default/schemas";

import "./vis.less";
import optionsTemplate from "./options_template.html";
import { VisController } from "./vis_controller";

const MyNewVisType = Private => {
  const VisFactory = Private(VisFactoryProvider);

  return VisFactory.createBaseVisualization({
    name: "pivot_table",
    title: "Pivot Table",
    icon: "tableOfContents",
    description: "Pivot Table",
    visualization: VisController,
    visConfig: {
      defaults: {
        editMode: true
      }
    },
    editorConfig: {
      optionsTemplate: optionsTemplate,
      enableAutoApply: true,
      schemas: new Schemas([
        {
          group: "metrics",
          name: "metric",
          title: "Metric",
          min: 1,
          aggFilter: [
            "count",
            "avg",
            "sum",
            "min",
            "max",
            "median",
            "std_dev"
            //"sum_of_squares",
            //"variance"
          ],
          defaults: [{ type: "count", schema: "metric" }]
        },
        {
          group: "buckets",
          name: "segment",
          icon: "fa fa-th",
          title: "Bucket Split",
          min: 1,
          aggFilter: ["!geohash_grid", "!filter"]
        }
      ])
    }
  });
};

VisTypesRegistryProvider.register(MyNewVisType);
