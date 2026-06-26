
export const LivePreview = (code) => {

    let sanitized = code
  .replace(/import\s+.*?from\s+["'].*?["'];?/g, "")
  .replace(/export\s+/g, "");

sanitized = sanitized
  .replace(/position\s*:\s*["']fixed["']/g, 'position: "absolute"')
  .replace(/position\s*:\s*`fixed`/g, 'position: "absolute"')
  .replace(/\bfixed\b/g, "absolute");
} 
