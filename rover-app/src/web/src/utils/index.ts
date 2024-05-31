function splitPath(path: string): string[] {
  if (!path) {
    return []
  }

  const result = []
  let pos = path.indexOf('/')
  while (pos >= 0) {
    if (pos === 0) {
      result.push('/')
    } else {
      result.push(path.substring(0, pos))
    }

    pos = path.indexOf('/', pos + 1)
  }

  result.push(path)

  return result
}

export { splitPath }
