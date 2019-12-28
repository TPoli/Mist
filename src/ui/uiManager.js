import { Toolbox } from './toolbox.js';

var m_Instance = null;

var uiCanvas = document.getElementById('uiCanvas');
var ctx = uiCanvas.getContext('2d');

export class UIManager{
	constructor() {

		if(m_Instance !== null) {
			return m_Instance;
		}
		m_Instance = this;

		this.toolbox = new Toolbox();
	}

	Render() {
		this.toolbox.Render();
	}
	
	Update() {
		this.toolbox.Update();
	}
}







