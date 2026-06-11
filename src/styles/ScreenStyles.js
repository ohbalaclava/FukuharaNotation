// Style fragments that get deep-merged with the runtime geometry computed in
// Dimensions.js and applied inline. Static layout lives in screen.css.

const buttonColour = 'rgb(50, 50, 50)'

const styles = {
  input: {
    octaveButton: {
      flex: 'initial',
      borderColor: 'black',
      backgroundColor: buttonColour,
      image: {
        filter: 'invert(1)'
      }
    },
    octaveSelectorButton: {
      selected: {
        flex: 2,
        backgroundColor: 'rgba(192, 100, 100, 0.4)',
        borderBottomWidth: 1,
        borderColor: 'grey',
        image: {
          marginHorizontal: 'auto'
        }
      },
      unselected: {
        flex: 1,
        backgroundColor: 'rgba(192, 192, 192, 0.4)',
        borderBottomWidth: 1,
        borderColor: 'grey',
        image: {
          marginHorizontal: 'auto'
        }
      }
    },
    strokeButton: {
      backgroundColor: buttonColour,
      image: {
        filter: 'invert(1)'
      }
    },
    joinButton: {
      selected: {
        flex: 1,
        backgroundColor: 'rgb(255, 255, 255)'
      },
      unselected: {
        flex: 1,
        backgroundColor: buttonColour,
        image: {
          filter: 'invert(1)'
        }
      }
    },
    accidentalButton: {
      backgroundColor: buttonColour,
      image: {
        filter: 'invert(1)'
      }
    },
    decorationButton: {
      backgroundColor: buttonColour,
      image: {
        filter: 'invert(1)'
      }
    },
    operations: {
      showHideButton: {
        position: 'absolute',
        top: '50%',
        left: 0,
        backgroundColor: 'rgba(245, 245, 245, 0.9)'
      },
      operationButton: {
        backgroundColor: 'rgba(245, 245, 245, 0.9)'
      },
      menuButton: {
        backgroundColor: 'rgba(208, 208, 208, 0.7)'
      }
    }
  },
  score: {
    mark: {
      image: {
        opacity: 0.66
      },
      zIndex: 0
    }
  }
}

export default styles
