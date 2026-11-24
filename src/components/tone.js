// Palet pastel yang dipakai bergantian untuk kartu, label, dan titik timeline.
const TONES = ["pink", "yellow", "mint", "lavender", "sky", "coral"];
export const tone = (i) => ({ "--tone": `var(--${TONES[i % TONES.length]})` });
