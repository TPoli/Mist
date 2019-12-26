
var canvasManager = null;

export class CanvasManager {
	constructor() {
		if(canvasManager !== null) {
			return canvasManager;
		}
		canvasManager = this;
		this.glCanvas = document.getElementById('my_Canvas');
		this.gl = this.glCanvas.getContext('experimental-webgl');
		this.uiCanvas = document.getElementById('uiCanvas');

		this.glCanvas.width = this.glCanvas.offsetWidth;
		this.glCanvas.height = this.glCanvas.offsetHeight;

		this.uiCanvas.width = this.glCanvas.offsetWidth;
		this.uiCanvas.height = this.glCanvas.offsetHeight;

		this.gl.viewport(0,0, this.glCanvas.width, this.glCanvas.height);
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		// eslint-disable-next-line no-magic-numbers
		this.gl.clearColor(0.5, 0.5, 0.5, 0.9);
		return canvasManager;
	}
}