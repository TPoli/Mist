import { Vector2 } from '../vector2.js';

import { CanvasManager } from '../canvasManager.js';
import { InputManager, KeyStatus } from '../inputManager.js';
import { CreateFont, GetFontHeight } from './fonts.js';

const gRadius = 8;

export class Button {
	constructor(a_sText, a_vPosition, a_Callback) {
		const canvasManager = new CanvasManager();
		this.ctx = canvasManager.uiCanvas.getContext('2d');

		this.m_iFontSize = 15;
		this.m_sFont = 'Arial';
		this.m_textColour = 'red';
		this.m_hoverTextColour = 'white';
		this.m_outlineColour = 'red';
		this.m_hoverOutlineColour = 'green';

		this.callback = a_Callback;
		this.SetPosition(a_vPosition);
		this.text = a_sText;
		this.ctx.font = CreateFont(this.m_sFont, this.m_iFontSize);
		this.hPadding = 7;
		this.vPadding = 5;
		this.SetBounds();
	}
	SetPosition(a_vPosition) {
		const canvasManager = new CanvasManager();
		const bottom = canvasManager.uiCanvas.clientHeight;
		this.vPosition = new Vector2(a_vPosition.X, bottom - a_vPosition.Y);
	}
	Render() {
		this.ctx.font = CreateFont(this.m_sFont, this.m_iFontSize);
		
		this.ctx.textAlign = 'left';

		const inputManager = InputManager();
		const bHovered = this.Contains(inputManager.mouse.position);
		
		this.ctx.fillStyle = bHovered ? this.m_hoverTextColour : this.m_textColour;
		this.ctx.strokeStyle = bHovered ? this.m_hoverOutlineColour : this.m_outlineColour;

		this.ctx.fillText(this.text, this.vPosition.X, this.vPosition.Y);
		this.DrawBorder();
	}
	SetBounds() {
		this.radius = gRadius;

		const width = this.ctx.measureText(this.text).width;
		const height = GetFontHeight(this.m_sFont, this.m_iFontSize);
		this.textDimensions = new Vector2(width, height);

		this.inner = {
			top: this.vPosition.Y - height - this.vPadding + gRadius,
			left: this.vPosition.X - this.hPadding + gRadius,
			right: this.vPosition.X + width + this.hPadding - gRadius,
			bottom: this.vPosition.Y + this.vPadding - gRadius,
		};

		this.outer = {
			top: this.inner.top - gRadius,
			left: this.inner.left - gRadius,
			right: this.inner.right + gRadius,
			bottom: this.inner.bottom + gRadius
		};
	}
	DrawBorder() {
		this.ctx.beginPath();
		this.ctx.moveTo(this.inner.left, this.outer.top);
		this.ctx.lineTo(this.inner.right, this.outer.top);
		this.ctx.quadraticCurveTo(this.outer.right, this.outer.top, this.outer.right, this.inner.top);
		this.ctx.lineTo(this.outer.right, this.inner.bottom);
		this.ctx.quadraticCurveTo(this.outer.right, this.outer.bottom, this.inner.right, this.outer.bottom);
		this.ctx.lineTo(this.inner.left, this.outer.bottom);
		this.ctx.quadraticCurveTo(this.outer.left, this.outer.bottom, this.outer.left, this.inner.bottom);
		this.ctx.lineTo(this.outer.left, this.inner.top);
		this.ctx.quadraticCurveTo(this.outer.left, this.outer.top, this.inner.left, this.outer.top);
		this.ctx.stroke();
	}
	Contains(vPosition) {
		// outside on X axis
		if(vPosition.X < this.outer.left || vPosition.X > this.outer.right) {
			return false;
		}

		// outside on Y axis
		if(vPosition.Y < this.outer.top || vPosition.Y > this.outer.bottom) {
			return false;
		}

		const corners = [
			{
				outer: new Vector2(this.outer.left, this.outer.top),
				inner: new Vector2(this.inner.left, this.inner.top)
			}, {
				outer: new Vector2(this.outer.right, this.outer.top),
				inner: new Vector2(this.inner.right, this.inner.top),
			}, {
				outer: new Vector2(this.outer.left, this.outer.bottom),
				inner: new Vector2(this.inner.left, this.inner.bottom)
			}, {
				outer: new Vector2(this.outer.right, this.outer.bottom),
				inner: new Vector2(this.inner.right, this.inner.bottom)
			}
		];

		for(let i = 0; i < corners.length; ++i) {
			const outerDist = corners[i].outer.Subtract(vPosition);
			if(Math.abs(outerDist.X) > gRadius || Math.abs(outerDist.Y) > gRadius) {
				continue; // too far from outer corner to be in rounded off section
			}

			const innerDist = corners[i].inner.Subtract(vPosition).DistanceSquared;
			
			if(innerDist < gRadius * gRadius) {
				return false; // too far from the inner corner, in rounded off section
			}
		}
		return true;
	}
	Clicked() {
		const inputManager = InputManager();
		if(inputManager.mouse.leftState === KeyStatus.RELEASED) {
			return this.Contains(inputManager.mouse.position);
		}
			
		return false;
	}
}