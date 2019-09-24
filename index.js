

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'viz_pivot',
    uiExports: {
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },
  });
}
