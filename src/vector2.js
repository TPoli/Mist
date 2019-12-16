export class Vector2 {
	
	constructor(a_X, a_Y) {
		this.X = a_X;
		this.Y = a_Y;
	}
	Normalize() {
		const lengthSquare = this.X * this.X + this.Y * this.Y;
		if(lengthSquare > 0) {
			const length = Math.sqrt(lengthSquare);
			this.X /= length;
			this.Y /= length;
		}
	}
}