const KeyStatus = {
	UP: 0,
	DOWN: 1,
	RELEASED: 2
};

var m_InputManager = null;

const KeyEventProcessor = (keyCode, keyState) => {
	const keyDataKey = Object.keys(m_InputManager.keys).find( (key) => {
		return m_InputManager.keys[key].code === keyCode;
	});

	if(keyDataKey !== undefined) {
		m_InputManager.keys[keyDataKey].keyState = keyState;
	} else {
		console.log(keyCode);
	}
};

const KeyDownCallback = (event) => {
	KeyEventProcessor(event.keyCode, KeyStatus.DOWN);
};

const KeyUpCallback = (event) => {
	KeyEventProcessor(event.keyCode, KeyStatus.RELEASED);
};

export const InputManager = () => {
	if (m_InputManager !== null) {
		return m_InputManager;
	}

	m_InputManager = {
		keys: {
			space: {
				status: KeyStatus.UP,
				code: 32
			},
			left: {
				status: KeyStatus.UP,
				code: 37
			},
			up: {
				status: KeyStatus.UP,
				code: 38
			},
			right: {
				status: KeyStatus.UP,
				code: 39
			},
			down: {
				status: KeyStatus.UP,
				code: 40
			},
			w:{
				status: KeyStatus.UP,
				code: 87
			},
			a:{
				status: KeyStatus.UP,
				code: 65
			},
			s:{
				status: KeyStatus.UP,
				code: 83
			},
			d:{
				status: KeyStatus.UP,
				code: 68
			}
		}
	};

	document.addEventListener('keydown', KeyDownCallback);
	document.addEventListener('keyup', KeyUpCallback);

	m_InputManager.Update = () => {

		for (const key of Object.keys(m_InputManager.keys)) {
			if(m_InputManager.keys[key] === KeyStatus.RELEASED) {
				m_InputManager.keys[key] = KeyStatus.UP;
			}
		}
	};

	return m_InputManager;
};