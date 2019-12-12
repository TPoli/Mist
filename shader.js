var m_oDefaultShader = null;

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

	return shader;
};

export const DefaultShader = () => {
	if(m_oDefaultShader !== null) {
		return m_oDefaultShader;
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

	m_oDefaultShader = CreateShader(vertCode, fragCode);

	return m_oDefaultShader;
};