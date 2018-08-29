export function htmlDecode (text) {
  var temp = document.createElement('div')
  temp.innerHTML = text
  var output = temp.innerText || temp.textContent
  temp = null
  return output
}

export function addTableBox (str) {
  var s = ''
  if (str.length === 0) return ''
  s = str.replace(/<table/g, '<div class="table-container"><table')
  s = s.replace(/<\/table>/g, '</table></div>')
  return s
}
