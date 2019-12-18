
export class Line {
	constructor (a_vA, a_vB) {
		this.A = a_vA;
		this.B = a_vB;
	}
	Intersects(a_Other) {
		// determines intersection by translating to origin and determining 
		// if a_Other A and B falls on either side of (0,0) -> (B - A)
		const vTranslatedB = this.B.Subtract(this.A);
		const vTranslatedA2 = a_Other.A.Subtract(this.A);
		const vTranslatedB2 = a_Other.B.Subtract(this.A);

		// get cross products
		//<0 == to the left, >0 == to the right
		const crossA = (vTranslatedB.X * vTranslatedA2.Y) - (vTranslatedB.Y * vTranslatedA2.X);
		const crossB = (vTranslatedB.X * vTranslatedB2.Y) - (vTranslatedB.Y * vTranslatedB2.X);

		// if both to the left or both to the right
		if((crossA<0) && (crossB<0) || (crossA>0) && (crossB>0)) {
			return false;
		}
		return true;
	}
}