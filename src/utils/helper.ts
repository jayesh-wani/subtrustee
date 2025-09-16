//Updated regex checking

export function extractRemainingPart(str: string): string {
  return Array.from(str)
    .reverse()
    .join("")
    .replace(/[^a-zA-Z ,()]/, "|")
    .split("|")[0]
    .split("")
    .reverse()
    .join("")
    .trim();
}
