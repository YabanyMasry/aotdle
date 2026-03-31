// Maps specific debut chapter titles to broader story arcs and ordering for comparisons.
const chapterToArc: Record<string, string> = {
  "To You, 2,000 Years From Now": "Fall of Shiganshina",
  "That Day": "Fall of Shiganshina",
  "Icon": "Fall of Shiganshina",
  "Where's the Left Arm?": "Trost District",
  "First Battle": "Trost District",
  "Response": "Trost District",
  "A Dull Glow in the Midst of Despair": "104th Training Corps",
  "Night of the Disbanding Ceremony": "104th Training Corps",
  "Long-Distance Enemy Scouting Formation": "Female Titan",
  "Special Operations Squad": "Female Titan",
  "Captain Levi": "Uprising",
  "Erwin Smith": "Clash of the Titans",
  "Warrior": "Clash of the Titans",
  "Southwestward": "Clash of the Titans",
  "The Beast Titan": "Clash of the Titans",
  "Smoke Signal": "Return to Shiganshina",
  "Friends": "Uprising",
  "Krista Lenz": "Clash of the Titans",
  "Ilse's Notebook": "Clash of the Titans",
  "Soldier": "Clash of the Titans",
  "Grin": "Clash of the Titans",
  "Still Can't See": "Uprising",
  "The Other Side of the Ocean": "Marley",
  "A Dream I Once Had": "War for Paradis",
  "Brave Volunteers": "Marley",
  "Mission Objectives": "Marley",
  "Soldiers Dance": "War for Paradis",
  "Delusions of Strength": "War for Paradis",
  "Actors": "Uprising",
  "Wound": "Uprising",
  "Response": "Trost District",
  "Icon": "Fall of Shiganshina",
};

// Ordered list of chapters for directional comparison; earlier index = earlier in story.
const chapterOrder = [
  "To You, 2,000 Years From Now",
  "That Day",
  "Icon",
  "Where's the Left Arm?",
  "First Battle",
  "Response",
  "A Dull Glow in the Midst of Despair",
  "Night of the Disbanding Ceremony",
  "Long-Distance Enemy Scouting Formation",
  "Special Operations Squad",
  "Captain Levi",
  "Erwin Smith",
  "Warrior",
  "Southwestward",
  "The Beast Titan",
  "Krista Lenz",
  "Ilse's Notebook",
  "Soldier",
  "Grin",
  "Smoke Signal",
  "Still Can't See",
  "Friends",
  "Actors",
  "Wound",
  "The Other Side of the Ocean",
  "Brave Volunteers",
  "Mission Objectives",
  "Delusions of Strength",
  "A Dream I Once Had",
  "Soldiers Dance",
];

export function mapChapterToArc(chapter: string): string {
  return chapterToArc[chapter] ?? "Unknown Arc";
}

export function compareChapterOrder(chapter: string, targetChapter: string): "lower" | "higher" | "same" | "unknown" {
  const a = chapterOrder.indexOf(chapter);
  const b = chapterOrder.indexOf(targetChapter);
  if (a === -1 || b === -1) return "unknown";
  if (a === b) return "same";
  return a < b ? "lower" : "higher"; // lower index = earlier debut
}

export function cleanGrade(raw: string): string {
  return raw.replace(/\[.*?\]/g, "").trim();
}

export function cleanValue(raw: string): string {
  return raw.replace(/\[.*?\]/g, "").trim();
}