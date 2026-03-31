function mulberry32(a: number) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

export function getDailySeed(dateString: string): number {
    // Basic hash of string to a 32-bit integer
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
        const char = dateString.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

export function getDailyTargetIndex(dateString: string, maxRange: number): number {
    const seed = getDailySeed(dateString);
    const prng = mulberry32(seed);
    const rand = prng();
    return Math.floor(rand * maxRange);
}
