/**
 * @file AttributeTypes.ts
 * @description 
 * 1. Defines all possible attribute types
 * 2. Control the width of attributes on the table  
 * 3. Control the requirements associated with each data type. 
 */

export type AttributeType =
  | "measure"
  | "multiple_values"
  | "rich_text"
  | "single_select"
  | "number"
  | "short_text"
  | "long_text";

export const AttributeTypeMeta: Record<AttributeType, {
  displayName: string;
  defaultWidth: number;
  isMultiline?: boolean;
  requirements?: (params?: { [key: string]: string | string[] }) => string[];
}> = {
  measure: {
    displayName: "Measure",
    defaultWidth: 120,
    requirements: (params?: { unit: string }) => {
      const { unit } = params || {}; 
      return [
        `This attribute requires a measurement in the unit: ${unit}`,
        "Do not include the unit in the final answer, just the number."
      ]
    },
  },
  multiple_values: {
    displayName: "Multiple Values",
    defaultWidth: 180,
    requirements: () => {
      return [
        "This attribute can have multiple values. Return all as a list of strings." 
      ]
    },
  },
  rich_text: {
    displayName: "Rich Text",
    defaultWidth: 300,
    isMultiline: true,
    requirements: () => {
      return [
        "This attribute requires a complete and detailed rich text (HTML) response." 
      ]
    },
  },
  single_select: {
    displayName: "Single Select",
    defaultWidth: 150,
    requirements: (params?: { options: string[] }) => {
      const { options } = params; 
      return [
        `Select the most appropriate option from: ${options}`,
      ]
    },
  },
  number: {
    displayName: "Number",
    defaultWidth: 100,
    requirements: (params?: { unit?: string }) => {
      const { unit } = params || {}; 
      return [
        `This attribute requires a numeric value. ${unit ? `generate a number with unit ${unit}` : ""}.`,
      ]
    },
  },
  short_text: {
    displayName: "Short Text",
    defaultWidth: 150,
    requirements: () => {
      return [
        "This attribute requires a textual response shorter than 50 characters." 
      ]
    },
  },
  long_text: {
    displayName: "Long Text",
    defaultWidth: 250,
    isMultiline: true,
    requirements: () => {
      return [
        "This attribute requires a complete and detailed textual response." 
      ]
    },
  }
};
