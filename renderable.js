
var canvas = document.getElementById('my_Canvas');
var gl = canvas.getContext('experimental-webgl');

export const Renderable = (a_iX, a_iY, a_oShader) => {

	const renderable = {
		X: a_iX,
		Y: a_iY,
		shader: a_oShader
	};

	renderable.Render = () => {
		gl.useProgram(renderable.shader);
		var position = gl.getUniformLocation(renderable.shader, 'position');
		gl.uniform2fv(position, [renderable.X, renderable.Y]);
		gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT,0); // always render 2 triangles
	};

	return renderable;
};