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
      margin: 20,
      padding: 10
    },
    bamboo: {
      flex: 1,
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 5
    }
  },
  notes: {
    view: {
      flexFlow: 'row nowrap'
    },
    noteButton: {
      padding: 10,
      marginVertical: 6,
      marginHorizontal: 6,
      image: {
        width: 30,
        height: 30
      },
      borderRadius: 50,
      borderWidth: 3,
      borderColor: 'black',
      backgroundColor: buttonColour
    }
  },
  accidentals: {
    view: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    accidentalButton: {
      padding: 10,
      marginVertical: 6,
      marginHorizontal: 6,
      image: {
        width: 30,
        height: 30
      },
      borderRadius: 5,
      borderWidth: 3,
      backgroundColor: buttonColour
    }
  },
  operations: {
    view: {
      flexFlow: 'column nowrap',
      justifyContent: 'space-evenly',
      alignItems: 'stretch',
      row1: {
        flexFlow: 'row nowrap',
        justifyContent: 'space-evenly',
        alignItems: 'stretch'
      },
      row2: {
        flexFlow: 'row nowrap',
        justifyContent: 'space-evenly',
        alignItems: 'stretch'
      }
    },
    deleteButton: {
      padding: 10,
      marginVertical: 6,
      marginHorizontal: 6,
      image: {
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 60,
        height: 20
      },
      borderRadius: 5,
      borderWidth: 1,
      backgroundColor: 'rgba(245, 245, 245, 0.9)'
    },
    newlineButton: {
      padding: 10,
      marginVertical: 6,
      marginHorizontal: 6,
      image: {
        width: 40,
        height: 40
      },
      borderRadius: 5,
      borderWidth: 1,
      backgroundColor: 'rgba(245, 245, 245, 0.9)'
    },
    downloadButton: {
      padding: 10,
      marginVertical: 6,
      marginHorizontal: 6,
      image: {
        width: 40,
        height: 40
      },
      borderRadius: 5,
      borderWidth: 1,
      backgroundColor: 'rgba(245, 245, 245, 0.9)'
    },
    uploadButton: {
      padding: 10,
      marginVertical: 6,
      marginHorizontal: 6,
      image: {
        width: 40,
        height: 40
      },
      borderRadius: 5,
      borderWidth: 1,
      backgroundColor: 'rgba(245, 245, 245, 0.9)'
    }
  },
  title: {
    flex: 1,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
    fontFamily: 'serif',
    fontSize: 18
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
