export function getExtensionByMimeType(mimeType) {
  switch (mimeType) {
    case 'image/jpeg':
      return '.jpg'
    case 'image/png':
      return '.png'
    case 'video/mp4':
      return '.mp4'
    case 'video/quicktime':
      return '.mp4'
    case 'audio/mpeg':
        return '.mp3'
    case 'application/zip':
      return '.zip'
    case 'application/xml':
      return '.xml'
    case 'text/xml':
      return '.xml'
    case 'text/csv':
      return '.csv'
    default:
      return ''
  }
}

export function randomFileName(mimeType) {
  const extension = getExtensionByMimeType(mimeType)
  const dateSuffix = new Date().toISOString().replace(/\.\d{3}Z/, '').replace(/\D/g, '')
  const rand = Math.round(Math.random() * 1E9)
  return `${dateSuffix}_${rand}${extension}`
}

export function randomFileNameWithoutExtension() {
  const dateSuffix = new Date().toISOString().replace(/\.\d{3}Z/, '').replace(/\D/g, '')
  const rand = Math.round(Math.random() * 1E9)
  return `${dateSuffix}_${rand}`
}

export function sortAlphabetically(items) {
  const sorted = items.map((item) => item.trim()).sort((a, b) => {
    const aNormalized = a.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
    const bNormalized = b.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
    return aNormalized.localeCompare(bNormalized, 'en', { sensitivity: 'base' })
  })
  return sorted
}
