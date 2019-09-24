export default function (kibana) {

  return new kibana.Plugin({
    uiExports: {
      visTypes: [
        'plugins/pivot_table/vis'
      ]
    }
  });
}
