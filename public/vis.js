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
        // add default parameters
        fontSize: "30",
        config: {
          rows: "",
          cols: "",
          aggregatorName: "Count",
          vals: ""
        },
        availableAggregatorOptions: [
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
      }
    },
    editorConfig: {
      optionsTemplate: optionsTemplate,
      schemas: new Schemas([
        {
          group: "metrics",
          name: "metric",
          title: "Metric",
          min: 1,
          aggFilter: ["!derivative", "!geo_centroid"],
          //aggFilter: ["count", "avg", "sum", "min", "max", "cardinality"],
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

// register the provider with the visTypes registry
VisTypesRegistryProvider.register(MyNewVisType);

//export default TestVisProvider;
