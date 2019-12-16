export const glCanvas = document.getElementById('my_Canvas');
export const gl = glCanvas.getContext('experimental-webgl');
export const fontCanvas = document.getElementById('uiCanvas');

export const InitializeCanvasManager = () => {
	glCanvas.width = glCanvas.offsetWidth;
	glCanvas.height = glCanvas.offsetHeight;
	
	fontCanvas.width = glCanvas.offsetWidth;
	fontCanvas.height = glCanvas.offsetHeight;

	gl.viewport(0,0, glCanvas.width, glCanvas.height);
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
};