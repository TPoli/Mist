
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
	Unlink(a_oOther) {
		for (let key of Object.keys(a_oOther.connections)) {
			if(a_oOther.connections[key] === this) {
				a_oOther.connections[key] = null;
				break;
			}
		}
		
		for (let key of Object.keys(this.connections)) {
			if(this.connections[key] === a_oOther) {
				this.connections[key] = null;
				break;
			}
		}
	}
}