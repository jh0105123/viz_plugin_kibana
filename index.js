export default function (kibana) {

  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/viz_pivot/vis'
      ]
    }
  });
}
