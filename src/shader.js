import { CanvasManager } from './canvasManager.js';

const canvasManager = new CanvasManager();

export const g_AllShaders = [];

// need to double "step" used to indicate the ratio of pixels to clipspace units because
// clipspace is -1 to 1 not 0 to 1

class Shader{
	constructor(a_sVert, a_sFrag) {
		var canvas = document.getElementById('my_Canvas');
		var gl = canvas.getContext('experimental-webgl');

		const vertShader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vertShader, a_sVert);
		gl.compileShader(vertShader);

		const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fragShader, a_sFrag);
		gl.compileShader(fragShader);

		this.shaderID = gl.createProgram();

		gl.attachShader(this.shaderID, vertShader); 
		gl.attachShader(this.shaderID, fragShader);

		gl.linkProgram(this.shaderID);

		gl.useProgram(this.shaderID);
		this.SetUniform1i('u_texture', 0);
	}
	SetUniform1i(a_sName, a_iValue) {
		var uniformIndex = canvasManager.gl.getUniformLocation(this.shaderID, a_sName);
		canvasManager.gl.uniform1i(uniformIndex, a_iValue);
	}
	SetUniform1f(a_sName, a_fValue) {
		var uniformIndex = canvasManager.gl.getUniformLocation(this.shaderID, a_sName);
		canvasManager.gl.uniform1f(uniformIndex, a_fValue);
	}
	SetUniform2f(a_sName, a_vValue) {
		var uniformIndex = canvasManager.gl.getUniformLocation(this.shaderID, a_sName);
		canvasManager.gl.uniform2fv(uniformIndex, a_vValue.ToArray());
	}
	SetUniform4f(a_sName, a_aValue) {
		var uniformIndex = canvasManager.gl.getUniformLocation(this.shaderID, a_sName);
		canvasManager.gl.uniform4fv(uniformIndex, a_aValue);
	}
	Bind() {
		canvasManager.gl.useProgram(this.shaderID);
	}
}

const universalVertSource = 'attribute vec3 coordinates;'+
'attribute vec2 UV;' +
'varying vec2 vUV;' +
'uniform vec2 position;' +
'uniform vec2 canvasSize;' +
'uniform vec2 cameraPosition;' +
'uniform float spriteSize;';

const universalVertSourceBody = 'vec2 halfStep = vec2((spriteSize / canvasSize.x), (spriteSize / canvasSize.y));' +
'vec2 step = halfStep * 2.0;' +
'vec2 cameraOffset = cameraPosition * step;' +
'vec2 glOffset = vec2(-1.0,-1.0) + halfStep;'// moves origin form 0,0 to -1,-1
;

const defaultVertSource = universalVertSource +
'void main(void) {' +
	universalVertSourceBody + 
	'vec2 offset = (position * step) + cameraOffset + glOffset;' +
	'vec3 vert = vec3(halfStep.x * coordinates.x, halfStep.y * coordinates.y, coordinates.z);' +
	'gl_Position = vec4(vert + vec3(offset,0), 1.0);' +
   'vUV = UV;'+
'}';

const tileVertSource = universalVertSource +
'void main(void) {' +
	universalVertSourceBody +

	'vec2 offset = (position * step) + cameraOffset + glOffset;' +
	'vec3 vert = vec3(halfStep.x * coordinates.x, halfStep.y * coordinates.y, coordinates.z);' +
	'gl_Position = vec4(vert + vec3(offset,0), 1.0);' +
	'vUV = UV;'+
'}';

const defaultFragSource = 'precision mediump float;'+
'varying vec2 vUV;'+
'uniform sampler2D u_texture;' +
'uniform vec4 u_Colour;' +
'void main(void) {'+
	'gl_FragColor = texture2D(u_texture, vUV) * u_Colour;' +
'}';

export const TileShader = () => {

	const existing = g_AllShaders.find( (element) => { return element.name === 'TileShader'; });
	if (existing !== undefined) {
		return existing.shader;
	}

	const newShader = {
		name: 'TileShader',
		shader: new Shader(tileVertSource, defaultFragSource)
	};

	g_AllShaders.push(newShader);

	return newShader.shader;
};

export const DefaultShader = () => {
	const existing = g_AllShaders.find((element) => { return element.name === 'DefaultShader'; });
	if (existing !== undefined) {
		return existing.shader;
	}

	const newShader = {
		name: 'DefaultShader',
		shader: new Shader(defaultVertSource, defaultFragSource)
	};

	g_AllShaders.push(newShader);

	return newShader.shader;
};