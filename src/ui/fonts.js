const fontLookup = {
	Arial: 0.75
};

export const GetFontHeight = (a_sFont, a_iSize) => {
	if(fontLookup[a_sFont] === undefined) {
		throw new Error (`unknown font ${a_sFont}`);
	}

	return a_iSize * fontLookup[a_sFont];
};

export const CreateFont = (a_sFont, a_iSize) => {
	if(fontLookup[a_sFont] === undefined) {
		throw new Error (`unknown font ${a_sFont}`);
	}

	return `${a_iSize}px ${a_sFont}`;
};