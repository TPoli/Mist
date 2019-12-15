
var canvas = document.getElementById('my_Canvas');
var gl = canvas.getContext('experimental-webgl');

export const Renderable = (a_iX, a_iY, a_oShader, a_oTexture, a_oColour) => {

	const renderable = {
		X: a_iX,
		Y: a_iY,
		shader: a_oShader,
		texture: a_oTexture,
		colour: a_oColour ? a_oColour : [1.0,1.0,1.0,1.0]
	};

	renderable.Render = () => {
		gl.useProgram(renderable.shader);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, renderable.texture);
		var position = gl.getUniformLocation(renderable.shader, 'position');
		gl.uniform2fv(position, [renderable.X, renderable.Y]);

		var colour = gl.getUniformLocation(renderable.shader, 'u_Colour');
		gl.uniform4fv(colour, renderable.colour);

		gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT,0); // always render 2 triangles
	};

	return renderable;
};