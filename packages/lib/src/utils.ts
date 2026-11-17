// Browsers normalize style.color to rgb(); convert it back to hex for output.
// Quill only converts this on the Delta layer (formats/color.js), not for HTML.
export const toHexColor = (html: string) =>
  html.replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/g, (_, r, g, b) =>
    `#${[r, g, b].map((v) => (+v).toString(16).padStart(2, '0')).join('')}`
  );
