// Export all typography components from a single file
export * from "./heading";
export * from "./text";
export * from "./paragraph";
export * from "./caption";
export * from "./vertical-rhythm";
export * from "./prose";
export * from "./eyebrow";
export * from "./code";

// Re-export TextLabel (renamed from Label)
export { TextLabel, textLabelVariants } from "./label";

// Explicitly export Eyebrow component
export { Eyebrow, eyebrowVariants } from "./eyebrow";
