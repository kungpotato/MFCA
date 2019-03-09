const Helper = {
  isNull: (param) => {
    if (param === '' || param === null || param === undefined) {
      return true
    }
    return false
  },
  isEqual: (param1, param2) => {
    if (param1 === param2) {
      return true
    }
    return false
  },
  isLengthZero: (param) => {
    if (param.length === 0) {
      return true
    }
    return false
  },
  Running: () => {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < 7; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text.toUpperCase()
  },
  arrayRemove: (arr, value) => arr.filter((ele => ele !== value))
}

export default Helper
