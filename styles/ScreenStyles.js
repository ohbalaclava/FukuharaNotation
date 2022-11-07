import { StyleSheet } from 'react-native-web'

import paper from '../assets/paper/watercolour_paper.jpg'
import flippedPaper from '../assets/paper/flipped_watercolour_paper.jpg'
import * as Dimensions from '../data/Dimensions'

const markOpacity = 0.66
const buttonColour = 'rgb(50, 50, 50)'
const selectedRadioButtonColour = 'rgba(192, 100, 100, 0.4)'
const unselectedRadioButtonColour = 'rgba(192, 192, 192, 0.4)'

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
      borderColor: 'grey',
      overflow: 'clip'
    },
    marks: {
      flex: 'initial',
      flexFlow: 'row nowrap',
      sections: {
        flex: 'initial',
        flexFlow: 'column nowrap',
        notes: {
          flex: 'initial',
          flexFlow: 'column nowrap',
          octaveView: {
            flex: 1,
            flexFlow: 'row nowrap'
          },
          octaves: {
            flex: 1,
            flexFlow: 'row nowrap',
            button: {
              flex: 'initial',
              borderColor: 'black',
              backgroundColor: buttonColour,
              image: {
                filter: 'invert(1)'
              }
            }
          },
          octaveSelector: {
            flex: 'initial',
            flexFlow: 'row nowrap',
            button: {
              selected: {
                flex: 2,
                backgroundColor: selectedRadioButtonColour,
                image: {
                  marginHorizontal: 'auto'
                }
              },
              unselected: {
                flex: 1,
                backgroundColor: unselectedRadioButtonColour,
                image: {
                  marginHorizontal: 'auto'
                }
              }
            }
          }
        },
        strokes: {
          flex: 'initial',
          flexFlow: 'row nowrap',
          alignItems: 'flex-end',
          button: {
            image: {
              filter: 'invert(1)'
            },
            backgroundColor: buttonColour
          }
        },
        accidentals: {
          flexFlow: 'column nowrap',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          margin: 5,
          button: {
            backgroundColor: buttonColour,
            image: {
              filter: 'invert(1)'
            }
          }
        },
        decorations: {
          flexFlow: 'column nowrap',
          backgroundColor: 'rgba(0, 255, 0, 0.2)',
          margin: 5,
          button: {
            backgroundColor: buttonColour,
            image: {
              filter: 'invert(1)'
            }
          }
        }
      },
    },
    operations: {
      flex: 2,
      flexFlow: 'column nowrap',
      justifyContent: 'space-evenly',
      editOps: {
        flex: 1,
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center'
      },
      fileOps: {
        flex: 1,
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center'
      },
      operationButton: {
        backgroundColor: 'rgba(245, 245, 245, 0.9)'
      },
      menuButton: {
        backgroundColor: 'rgba(192, 192, 192, 0.9)'
      }
    }
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
    titleInput: {
      flex: 1,
      padding: 20,
      fontFamily: 'serif',
      fontSize: 18,
      textAlign: 'center'
    },
    notesInput: {
      flex: 1,
      padding: 10,
      fontFamily: 'serif',
      fontSize: 14,
      textAlign: 'left',
      borderWidth: 1,
      borderColor: 'grey',
      borderStyle: 'dotted'
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
      top: '45%',
      right: '-18%',
      transform: 'translateY(-50%)',
      opacity: markOpacity
    },
    decorations: {
      position: 'absolute',
      top: 0,
      left: 0
    },
    decoration: {
      position: 'absolute',
      backgroundSize: 'contain',
      opacity: markOpacity
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
