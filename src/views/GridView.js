import React from 'react'
import { StyleSheet, View } from 'react-native-web'
import PropTypes from 'prop-types'

GridView.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  noRows: PropTypes.number,
  style: PropTypes.object
}

const styles = StyleSheet.create({
  columns: {
    flex: 1,
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  column: {
    flex: 1,
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 'min-content'
  }
})

export default function GridView ({ items, renderItem, noRows, style }) {
  if (noRows === undefined) {
    noRows = 1
  }

  const noCols = Math.ceil(items.length / noRows)

  function getColumn (columnIndex) {
    const rows = []
    for (let i = columnIndex * noRows, j = 0; j < noRows && i < items.length; ++i, ++j) {
      rows[j] = renderItem({ item: items[i] })
    }
    return rows
  }

  function getColumns () {
    const columns = []
    for (let i = 0; i < noCols; ++i) {
      columns[i] = (
        <View style={styles.column} key={i}>
          { getColumn(i) }
        </View>
      )
    }
    return columns
  }

  return (
    <View style={[style, styles.columns]}>
      { getColumns() }
    </View>
  )
}
