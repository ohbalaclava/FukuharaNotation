import m from 'mithril'
import deepmerge from '../tools/DeepMerge'
import { toCSS } from '../styles/StyleUtils'

// Touchable button with an image rendered as a contained background.
// `style` keeps the react-native-web era array API: fragments from
// ScreenStyles.js deep-merged with runtime geometry from Dimensions.js.
// `highlightColour` selects TouchableHighlight behaviour (.touch-hl),
// otherwise TouchableOpacity (.touch-fade).

export default {
  view ({ attrs }) {
    let style = attrs.style
    if (Array.isArray(style)) {
      style = deepmerge.all(style)
    }

    return m('div.v' + (attrs.highlightColour ? '.touch-hl' : '.touch-fade'),
      {
        style: toCSS(style),
        onclick: attrs.onPress
      },
      m('div.v.bg-img', {
        style: {
          ...toCSS(style.image),
          backgroundImage: `url(${attrs.image})`
        }
      })
    )
  }
}
