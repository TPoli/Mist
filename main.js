import { DefaultShader } from './shader.js';
import { Renderable } from './renderable.js';

export const main = () => {
	console.log('thing');
};

var canvas = document.getElementById('my_Canvas');
var gl = canvas.getContext('experimental-webgl');

var vertices = [ 
	-0.5,-0.5,0.0,  //  1,1,1, // bottom left
	0.5,0.5,0.0,    //    1,0,1, // top right
	0.5,-0.5,0.0,   //  0,0,0,// bottom right
	-0.5,0.5,0.0,   //  0,1,0// Top Left
];
var indices = [0,1,2, 0,1,3];

// Create a new buffer object
var vertex_buffer = gl.createBuffer();

// Bind an empty array buffer to it
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        
// Pass the vertices data to the buffer
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Unbind the buffer
gl.bindBuffer(gl.ARRAY_BUFFER, null);

var Index_Buffer = gl.createBuffer();

// Bind appropriate array buffer to it
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

// Pass the vertex data to the buffer
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        
// Unbind the buffer
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);


gl.useProgram(DefaultShader());

gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

//Get the attribute location
var coord = gl.getAttribLocation(DefaultShader(), 'coordinates');
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0 * gl.FLOAT, 0);
gl.enableVertexAttribArray(coord);

// get the attribute location
var color = gl.getAttribLocation(DefaultShader(), 'color');
gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0 * gl.FLOAT, 0 * gl.FLOAT) ;
gl.enableVertexAttribArray(color);

var position = gl.getUniformLocation(DefaultShader(), 'position');
gl.uniform2fv(position, [0.2, 0]);

var renderableObject = Renderable(0,1);

/* Step5: Drawing the required object (triangle) */

// Clear the canvas
gl.clearColor(0.5, 0.5, 0.5, 0.9);

// Enable the depth test
gl.enable(gl.DEPTH_TEST); 
        
// Clear the color buffer bit
//gl.clear(gl.COLOR_BUFFER_BIT);

gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
// Set the view port
gl.viewport(0,0,canvas.width,canvas.height);

// Draw the triangle
//gl.drawArrays(gl.TRIANGLES, 0, 3);
    

gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0);