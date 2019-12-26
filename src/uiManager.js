
var uiCanvas = document.getElementById('uiCanvas');
var ctx = uiCanvas.getContext('2d');

export const RenderText = (a_fX, a_fY, a_sText) => {
	ctx.font = '30px Arial';
	ctx.fillStyle = 'red';
	ctx.textAlign = 'center';
	ctx.fillText(a_sText, a_fX, a_fY);
};

export const RenderUI = () => {
	const bottom = uiCanvas.clientHeight;

	const toolboxWidth = 300;
	const toolboxHeight = 200;
	ctx.clearRect(0,0, uiCanvas.clientWidth, uiCanvas.clientHeight);

	ctx.fillStyle = '#000000';
	ctx.fillRect(0, bottom - toolboxHeight, toolboxWidth, toolboxHeight);

	ctx.font = '15px Arial';
	ctx.fillStyle = 'red';
	ctx.textAlign = 'left';
	ctx.fillText('Barricade', 20, bottom - 20);
	ctx.fillText('Cache', 100, bottom - 20);
	ctx.fillText('Warehouse', 180, bottom - 20);

	ctx.fillText('Wall', 20, bottom - 120);
	ctx.fillText('Post', 100, bottom - 120);
	ctx.fillText('Tower', 180, bottom - 120);
};