export function download({ filename, mimeType, data }) {
  const blob = new Blob([data], { mimeType });
  const downloadUrl = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = downloadUrl;
  downloadLink.download = filename;
  downloadLink.click();
  URL.revokeObjectURL(downloadUrl);
}

export function uploadJson({ onload, onerror }) {
  const uploadInput = document.createElement('input');
  uploadInput.type = 'file';
  uploadInput.multiple = false;
  uploadInput.accept = '.json,application/json,.shinobue';

  uploadInput.addEventListener('change', () => {
    const fileObj = uploadInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      onload(fromJSON(reader.result));
    });

    reader.addEventListener('error', () => {
      onerror(reader.error.name, reader.error.message);
    });

    reader.readAsText(fileObj);
  });

  uploadInput.click();
}

export function toJSON(value, replacer) {
  return JSON.stringify(value, (key, value) => {
    if (value instanceof Map) {
      return {
        type: 'Map',
        data: [...value],
      };
    } else {
      return (replacer && replacer(key, value)) || value;
    }
  });
}

export function fromJSON(json, reviver) {
  return JSON.parse(json, (key, value) => {
    if (typeof value === 'object') {
      if (value.type === 'Map') {
        return new Map(value.data);
      }
    }
    return (reviver && reviver(key, value)) || value;
  });
}
