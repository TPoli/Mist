// implemented from https://en.wikipedia.org/wiki/Mersenne_Twister

const w = 32; // word size (in number of bits)
const n = 624; // degree of recurrence
const m = 397; // middle word, an offset used in the recurrence relation defining the series x, 1 ≤ m < n
const r = 31; // separation point of one word, or the number of bits of the lower bitmask, 0 ≤ r ≤ w - 1
const a = 0x9908B0DF16; // coefficients of the rational normal form twist matrix
const u = 11; // additional Mersenne Twister tempering bit shifts/masks
const d = 0xFFFFFFFF16; // additional Mersenne Twister tempering bit shifts/masks
const s = 7; // TGFSR(R) tempering bit shifts
const b = 0x9D2C568016; // TGFSR(R) tempering bitmasks
const t = 15; // TGFSR(R) tempering bit shifts
const c = 0xEFC6000016; // TGFSR(R) tempering bitmasks
const l = 18; // additional Mersenne Twister tempering bit shifts/masks
const f = 1812433253;

const bitmask = 0xFFFFFFFF;
 
// Create a length n array to store the state of the generator
const MT = [];
var iIndex = n+1;
const iLower_mask = (1 << r) - 1; // That is, the binary number of r 1's
//const iUpper_mask = lowest w bits of (~iLower_mask);
const iUpper_mask = ~iLower_mask;
 
// Initialize the generator from a seed
export const SeedRandom = (seed) => {
	iIndex = n;
	MT[0] = seed;
	for(let i = 1; i < n; ++i) { // loop over each element
		MT[i] = bitmask & (f * (MT[i-1] ^ (MT[i-1] >> (w-2))) + i);
	}
};
 
// Extract a tempered value based on MT[iIndex]
// calling twist() every n numbers
export const RandomNext = () => {
	if (iIndex >= n) {
		if (iIndex > n) {
			throw new Error('Generator was never seeded');
			// Alternatively, seed with constant value; 5489 is used in reference C code[48]
		}
		Twist();
	}
 
	var y = MT[iIndex];
	y = y ^ ((y >> u) & d);
	y = y ^ ((y << s) & b);
	y = y ^ ((y << t) & c);
	y = y ^ (y >> l);
 
	++iIndex;
	return bitmask & y;
};

// Generate the next n values from the series x_i 
const Twist = () => {
	for (let i = 0; i < n; ++i) {
		let x = (MT[i] & iUpper_mask) + (MT[(i+1) % n] & iLower_mask);
		let xA = x >> 1;
		if (x % 2 !== 0) { // lowest bit of x is 1
			xA = xA ^ a;
		}
		MT[i] = MT[(i + m) % n] ^ xA;
	}
	iIndex = 0;
};