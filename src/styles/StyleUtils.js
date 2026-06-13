// Converts the react-native-web style objects produced by Dimensions.js and
// ScreenStyles.js into DOM inline-style objects for mithril. RNW accepted bare
// numbers and shorthand keys (marginVertical etc.) that plain CSS does not.

const unitless = new Set([
  'opacity',
  'zIndex',
  'flex',
  'flexGrow',
  'flexShrink',
  'fontWeight',
  'order',
]);

function px(value, key) {
  return typeof value === 'number' && !unitless.has(key) ? `${value}px` : value;
}

export function toCSS(style) {
  const out = {};
  for (const [key, value] of Object.entries(style || {})) {
    if (value === null || value === undefined) continue;
    if (typeof value === 'object') continue; // nested fragments, e.g. the 'image' sub-style
    switch (key) {
      case 'resizeMode':
        out.objectFit = value === 'stretch' ? 'fill' : value;
        break;
      case 'marginVertical':
        out.marginTop = px(value);
        out.marginBottom = px(value);
        break;
      case 'marginHorizontal':
        out.marginLeft = px(value);
        out.marginRight = px(value);
        break;
      case 'paddingVertical':
        out.paddingTop = px(value);
        out.paddingBottom = px(value);
        break;
      case 'paddingHorizontal':
        out.paddingLeft = px(value);
        out.paddingRight = px(value);
        break;
      case 'scale':
      case 'fontScale':
        break;
      default:
        out[key] = px(value, key);
    }
  }
  return out;
}
