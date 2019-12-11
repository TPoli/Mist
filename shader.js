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
            'attribute vec3 color;' +
            'varying vec3 vColor;' +
            'uniform vec2 position;' +
            'void main(void) {' +
                ' gl_Position = vec4(coordinates + vec3(position,0), 1.0);' +
               'vColor = color;'+
            '}';

	var fragCode = 'precision mediump float;'+
            'varying vec3 vColor;'+
            'void main(void) {'+
               'gl_FragColor = vec4(vColor, 1.);'+
            '}';

	m_oDefaultShader = CreateShader(vertCode, fragCode);
    
	return m_oDefaultShader;
};