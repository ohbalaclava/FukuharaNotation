import { StyleSheet, StatusBar } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  main: {
    view: {
      flexFlow: 'row nowrap'
    }
  },
  input: {
    view: {
      flex: 'initial',
      borderEndWidth: 1,
      borderColor: 'grey'
    },
    paper: {
      flex: 1,
      flexFlow: 'row nowrap',
      justifyContent: 'center'
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
      borderWidth: 2,
      borderColor: 'crimson',
      backgroundColor: 'rgb(50, 50, 50)'
    }
  },
  accidentals: {
    view: {
      flex: 1,
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
      borderWidth: 1,
      backgroundColor: 'rgb(50, 50, 50)'
    }
  },
  operations: {
    view: {
      flexFlow: 'row nowrap',
      justifyContent: 'space-evenly',
      alignItems: 'stretch'
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
    }
  },
  score: {
    view: {
      flex: 2
    },
    paper: {
      flex: 1,
      flexFlow: 'row-reverse nowrap',
      alignItems: 'flex-start',
      padding: 50
    },
    line: {
      flex: 'none',
      marginTop: 20,
      marginRight: 20
    },
    mark: {
      padding: 2,
      marginVertical: 4,
      marginHorizontal: 6,
      image: {
        width: 40,
        height: 40,
        opacity: 0.75
      }
    },
    accidental: {
      position: 'absolute',
      top: 10,
      left: 38,
      width: 20,
      height: 20,
      opacity: 0.75
    },
    cursor: {
      flex: 'none',
      padding: 2,
      marginVertical: 4,
      marginHorizontal: 2,
      width: 46,
      height: 46,
      image: {
        width: 40,
        height: 40,
        opacity: 0.25
      },
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'grey',
      borderStyle: 'dotted'
    }
  },
  title: {
    fontSize: 32
  }
})

export default styles
