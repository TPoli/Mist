export const g_AllShaders = [];

// need to double "step" used to indicate the ratio of pixels to clipspace units because
// clipspace is -1 to 1 not 0 to 1

const CreateShader = (a_sVert, a_sFrag) => {
	var canvas = document.getElementById('my_Canvas');
	var gl = canvas.getContext('experimental-webgl');

	var vertShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertShader, a_sVert);
	gl.compileShader(vertShader);

	var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragShader, a_sFrag);
	gl.compileShader(fragShader);

	var shader = gl.createProgram();

	gl.attachShader(shader, vertShader); 
	gl.attachShader(shader, fragShader);

	gl.linkProgram(shader);

	gl.useProgram(shader);
	var u_image0Location = gl.getUniformLocation(shader, 'u_texture');
	gl.uniform1i(u_image0Location, 0);

	return shader;
};

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
	'vec3 vert = vec3(halfStep.x * coordinates.x + cameraOffset.x, halfStep.y * coordinates.y + cameraOffset.y, coordinates.z);' +
	'gl_Position = vec4(vert + vec3(position,0), 1.0);' +
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
'void main(void) {'+
	'gl_FragColor = texture2D(u_texture, vUV);' +
'}';

export const TileShader = () => {

	const existing = g_AllShaders.find(element => element.name === 'TileShader');
	if (existing !== undefined) {
		return existing.shader;
	}

	const newShader = {
		name: 'TileShader',
		shader: CreateShader(tileVertSource, defaultFragSource)
	};

	g_AllShaders.push(newShader);

	return newShader.shader;
};

export const DefaultShader = () => {
	const existing = g_AllShaders.find(element => element.name === 'TileShader');
	if (existing !== undefined) {
		return existing.shader;
	}

	const newShader = {
		name: 'DefaultShader',
		shader: CreateShader(defaultVertSource, defaultFragSource)
	};

	g_AllShaders.push(newShader);

	return newShader.shader;
};