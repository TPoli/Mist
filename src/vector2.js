export class Vector2 {
	
	constructor(a_X, a_Y) {
		this.X = a_X;
		this.Y = a_Y;
	}
	Copy() {
		return new Vector2(this.X, this.Y);
	}
	Normalize() {
		const lengthSquare = this.DistanceSquared();
		if(lengthSquare > 0) {
			const length = Math.sqrt(lengthSquare);
			this.X /= length;
			this.Y /= length;
		}
	}
	ToPoint(a_vOffset) {
		if(a_vOffset !== undefined) {
			return new Vector2(Math.floor(this.X + a_vOffset.X), Math.floor(this.Y + a_vOffset.Y));
		}
		return new Vector2(Math.floor(this.X), Math.floor(this.Y));
	}
	Subtract(a_vOther) {
		return new Vector2(this.X - a_vOther.X, this.Y - a_vOther.Y);
	}
	Add(a_vOther) {
		return new Vector2(this.X + a_vOther.X, this.Y + a_vOther.Y);
	}
	DistanceSquared() {
		return this.X * this.X + this.Y * this.Y;
	}
}