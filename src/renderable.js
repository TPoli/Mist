import { Vector2 } from './vector2.js';

var canvas = document.getElementById('my_Canvas');
var gl = canvas.getContext('experimental-webgl');

export class Renderable {
	constructor(a_iX, a_iY, a_oShader, a_oTexture, a_oColour) {
		this.position = new Vector2(a_iX,a_iY),
		this.shader = a_oShader,
		this.texture = a_oTexture,
		this.colour = a_oColour ? a_oColour : [1.0,1.0,1.0,1.0];
	}

	Render() {
		gl.useProgram(this.shader);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		var position = gl.getUniformLocation(this.shader, 'position');
		gl.uniform2fv(position, [this.position.X, this.position.Y]);

		var colour = gl.getUniformLocation(this.shader, 'u_Colour');
		gl.uniform4fv(colour, this.colour);

		gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT,0); // always render 2 triangles
	}
}