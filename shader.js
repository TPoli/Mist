export const g_AllShaders = [];

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

export const TileShader = () => {

	const existing = g_AllShaders.find(element => element.name === 'TileShader');
	if (existing !== undefined) {
		return existing.shader;
	}

	var vertCode = 'attribute vec3 coordinates;'+
            'attribute vec2 UV;' +
            'varying vec2 vUV;' +
            'uniform vec2 position;' +
			'uniform vec2 canvasSize;' +
			'void main(void) {' +
				'vec2 step = vec2((64.0 / canvasSize.x), (64.0 / canvasSize.y));' +
				'vec2 offset = (position * step) - vec2(1.0,1.0) + (step * 0.5);' +
				'vec3 vert = vec3(step.x * coordinates.x, step.y * coordinates.y, coordinates.z);' +
				'gl_Position = vec4(vert + vec3(offset,0), 1.0);' +
               'vUV = UV;'+
            '}';

	var fragCode = 'precision mediump float;'+
			'varying vec2 vUV;'+
			'uniform sampler2D u_texture;' +
            'void main(void) {'+
				'gl_FragColor = texture2D(u_texture, vUV);' +
            '}';

	const newShader = {
		name: 'TileShader',
		shader: CreateShader(vertCode, fragCode)
	};

	g_AllShaders.push(newShader);

	return newShader.shader;
};

export const DefaultShader = () => {
	const existing = g_AllShaders.find(element => element.name === 'TileShader');
	if (existing !== undefined) {
		return existing.shader;
	}

	var vertCode = 'attribute vec3 coordinates;'+
            'attribute vec2 UV;' +
            'varying vec2 vUV;' +
            'uniform vec2 position;' +
			'uniform vec2 canvasSize;' +
			'void main(void) {' +
				'vec3 vert = vec3((64.0 / canvasSize.x) * coordinates.x, (64.0 / canvasSize.y) * coordinates.y, coordinates.z);' +
				'gl_Position = vec4(vert + vec3(position,0), 1.0);' +
               'vUV = UV;'+
            '}';

	var fragCode = 'precision mediump float;'+
			'varying vec2 vUV;'+
			'uniform sampler2D u_texture;' +
            'void main(void) {'+
				'gl_FragColor = texture2D(u_texture, vUV);' +
            '}';

	const newShader = {
		name: 'DefaultShader',
		shader: CreateShader(vertCode, fragCode)
	};

	g_AllShaders.push(newShader);

	return newShader.shader;
};