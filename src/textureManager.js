var canvas = document.getElementById('my_Canvas');
var gl = canvas.getContext('experimental-webgl');

const textures = [];

export const GetTexture = (src) => {

	src = 'assets/' + src;
	const existing = textures.find(element => element.src === src);
	if (existing !== undefined) {
		return existing.texture;
	}

	const newTex = {
		src,
		texture: gl.createTexture()
	};

	gl.bindTexture(gl.TEXTURE_2D, newTex.texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

	var image = new Image();
	image.src = src;
	image.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, newTex.texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
		gl.generateMipmap(gl.TEXTURE_2D);
	});

	textures.push(newTex);

	return newTex.texture;
};