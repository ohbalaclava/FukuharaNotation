
export function downloadJson ({ filename, json }) {
  const blob = new Blob([json])
  const downloadUrl = URL.createObjectURL(blob)

  const downloadLink = document.createElement('a')
  downloadLink.href = downloadUrl
  downloadLink.download = filename
  downloadLink.click()
  URL.revokeObjectURL(downloadUrl)
}

export function uploadJson ({ onload, onerror }) {
  const uploadInput = document.createElement('input')
  uploadInput.type = 'file'
  uploadInput.multiple = false
  uploadInput.accept = '.json,application/json,.shinobue'

  uploadInput.addEventListener('change', () => {
    const fileObj = uploadInput.files[0]
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      onload(JSON.parse(reader.result))
    })

    reader.addEventListener('error', () => {
      onerror(reader.error.name, reader.error.message)
    })

    reader.readAsText(fileObj)
  })

  uploadInput.click()
}
