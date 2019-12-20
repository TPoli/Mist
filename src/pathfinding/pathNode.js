
export class PathNode {
	constructor (a_oTile) {
		this.position = a_oTile.position.Copy();
		this.pathable = a_oTile.pathable;
		this.connections = {
			NW: null,
			N: null,
			NE: null,
			E: null,
			SE: null,
			S: null,
			SW: null,
			W: null
		};
	}
}