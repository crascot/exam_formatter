export type ParsedItem =
 | { type: "text"; value: string }
 | { type: "image"; id: string };
