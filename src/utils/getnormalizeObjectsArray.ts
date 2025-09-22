export interface NormalizedResult<T> {
  column: string[];
  values: T[];
}

// Format and capitalize field names for display
function formatAndCapitalize(arr: string[]): string[] {
  return arr.map((str) => {
    if (!str || typeof str !== "string") return str;

    str = str.replace(/^\d+\s*/, "");

    str = str.replace(/([a-z])([A-Z])/g, "$1 $2");

    str = str.replace(/[-_]/g, " ");

    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  });
}

function flattenObject(
  obj: Record<string, any>,
  parentKey = "",
  result: Record<string, any> = {},
): Record<string, any> {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const isNumericKey = /^\d+$/.test(key);
    const newKey = parentKey
      ? isNumericKey
        ? parentKey
        : `${parentKey}_${key}`
      : key;

    const value = obj[key];

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      flattenObject(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

export const getNormalizeObjectsArray = <T extends Record<string, any>>(
  arr: T[],
): NormalizedResult<Record<string, any>> => {
  const allKeys = new Set<string>();

  const flattenedObjects = arr.map((obj) => {
    const flat = flattenObject(obj);
    Object.keys(flat).forEach((key) => allKeys.add(key));
    return flat;
  });

  const normalized = flattenedObjects.map((obj) => {
    const newObj: Record<string, any> = {};
    allKeys.forEach((key) => {
      newObj[key] = Object.prototype.hasOwnProperty.call(obj, key)
        ? obj[key]
        : "N/A";
    });
    return newObj;
  });

  return {
    column: formatAndCapitalize(Array.from(allKeys)),
    values: normalized,
  };
};
