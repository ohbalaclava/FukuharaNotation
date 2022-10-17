import { StyleSheet } from 'react-native-web'

import paper from '../assets/paper/watercolour_paper.jpg'
import flippedPaper from '../assets/paper/flipped_watercolour_paper.jpg'
import * as Dimensions from '../data/Dimensions'

const markOpacity = 0.66
const buttonColour = 'rgb(50, 50, 50)'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  main: {
    view: {
      flexFlow: 'row nowrap',
      backgroundImage: `url(${paper})`,
      backgroundRepeat: 'repeat'
    }
  },
  input: {
    view: {
      flex: 'initial',
      flexFlow: 'column nowrap',
      margin: Dimensions.inputPanelMargin
    },
    bamboo: {
      flex: 1,
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 5
    },
    marks: {
      flex: 'initial',
      flexFlow: 'row nowrap'
    }
  },
  notes: {
    view: {
      flex: 'initial',
      flexFlow: 'row nowrap',
      justifyContent: 'space-around'
    },
    buttons: {
      flex: 1,
      flexFlow: 'column nowrap',
      justifyContent: 'flex-start'
    },
    noteButton: {
      flex: 'initial',
      borderColor: 'black',
      backgroundColor: buttonColour
    }
  },
  accidentals: {
    view: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
      margin: 5
    },
    accidentalButton: {
      backgroundColor: buttonColour
    }
  },
  units: {
    view: {
      flex: 'initial',
      flexFlow: 'column nowrap',
      justifyContent: 'space-around'
    },
    unitButton: {
      padding: 10,
      marginVertical: 6,
      marginHorizontal: 6,
      image: {
        width: 30,
        height: 30
      },
      borderRadius: 5,
      borderWidth: 1,
      backgroundColor: buttonColour
    }
  },
  operations: {
    view: {
      flex: 2,
      flexFlow: 'column nowrap',
      justifyContent: 'space-evenly',
      row1: {
        flex: 1,
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center'
      },
      row2: {
        flex: 1,
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center'
      }
    },
    operationButton: {
      backgroundColor: 'rgba(245, 245, 245, 0.9)'
    }
  },
  title: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
    fontFamily: 'serif',
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: 'grey'
  },
  titleDialog: {
    view: {
      flex: 1,
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textComponents: {
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonComponents: {
      flexFlow: 'row nowrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
      marginVertical: 20
    },
    label: {
      flex: 1,
      padding: 20,
      textAlign: 'center',
      fontFamily: 'serif',
      fontSize: 18,
      fontWeight: 'bold'
    },
    input: {
      flex: 1,
      padding: 20,
      fontFamily: 'serif',
      fontSize: 18,
      textAlign: 'center'
    }
  },
  score: {
    flex: 1,
    border: '0px dashed black',
    borderRightWidth: 1,
    lines: {
      flex: 1,
      flexFlow: 'row nowrap',
      content: {
        padding: Dimensions.scoreContentPadding,
        backgroundImage: `url(${flippedPaper})`,
        backgroundRepeat: 'repeat'
      }
    },
    line: {
      flex: 'none',
      marginRight: Dimensions.scoreLineMarginRight
    },
    mark: {
      image: {
        opacity: markOpacity
      },
      zIndex: 0
    },
    accidental: {
      position: 'absolute',
      top: 10,
      left: 38,
      width: 20,
      height: 20,
      opacity: markOpacity,
      zIndex: 1
    },
    cursor: {
      flex: 'none',
      image: {
        opacity: 0.5
      },
      zIndex: 1
    }
  }
})

export default styles
