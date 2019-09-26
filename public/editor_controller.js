class EditorController {
    constructor(el, vis) {
      this.el = el;
      this.vis = vis;
      this.config = vis.type.editorConfig;
   }
   async render(visData) {
      <b>${this.config.my}</b>
      return 'done rendering';
   }
   destroy() {
      console.log('destroying');
   }
}