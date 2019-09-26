class MyEditorController {
    constructor(el, vis) {
      this.el = el;
      this.vis = vis;
      this.config = vis.type.editorConfig;
   }
   async render(visData) {
    //   <b>hello</b>
      
      return 'done rendering';
   }
   destroy() {
      console.log('destroying');
   }
}

export { MyEditorController };