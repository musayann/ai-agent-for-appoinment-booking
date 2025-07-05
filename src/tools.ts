
type functionType = (...args: any[]) => unknown;

export const generateFunctionMap = (...functions: functionType[]): Record<string, functionType> => {
    const functionMap: Record<string, functionType> = {};
    for (const func of functions) {
        functionMap[func.name] = func;
    }
    return functionMap;
}


/**
 * Function to get the timezone
 * @param timeZone 
 * @returns 
 */
export function getCurrentTimeInTimeZone(timeZone: string) {
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true, // For AM/PM format
    }).format(new Date());
  }