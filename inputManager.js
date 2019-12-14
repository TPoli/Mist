
var m_InputManager = null;

const KeyEventProcessor = (keyCode, keyState) => {
	switch (keyCode) {
	case 37:
		m_InputManager.keys.left = keyState;
		break;
	case 38:
		m_InputManager.keys.up = keyState;
		break;
	case 39:
		m_InputManager.keys.right = keyState;
		break;
	case 40:
		m_InputManager.keys.down = keyState;
		break;
	case 32:
		m_InputManager.keys.space = keyState;
		break;
	case 87:
		m_InputManager.keys.w = keyState;
		break;
	case 65:
		m_InputManager.keys.a = keyState;
		break;
	case 83:
		m_InputManager.keys.s = keyState;
		break;
	case 68:
		m_InputManager.keys.d = keyState;
		break;
	default:
		console.log(keyCode);
	}
};

const KeyDownCallback = (event) => {
	KeyEventProcessor(event.keyCode, 1);
};

const KeyUpCallback = (event) => {
	KeyEventProcessor(event.keyCode, 2);
};

export const InputManager = () => {
	if (m_InputManager !== null) {
		return m_InputManager;
	}

	m_InputManager = {
		// 0 = up(not pressed), 1 = down, 2 = released(this frame)
		keys: {
			left: 0,
			right: 0,
			up: 0,
			down: 0,
			space: 0,
			w:0,
			a:0,
			s:0,
			d:0
		}
	};

	document.addEventListener('keydown', KeyDownCallback);
	document.addEventListener('keyup', KeyUpCallback);

	m_InputManager.Update = () => {

		for (var key of Object.keys(m_InputManager.keys)) {
			if(m_InputManager.keys[key] == 2) {
				m_InputManager.keys[key] = 0;
			}
		}
	};

	return m_InputManager;
};