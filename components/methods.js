
function getKeyByValue(obj,value)
{
  for(let i in obj)
  {
    if(obj[i]===value)
    {
      return i
    }
  }
  return null
}

function toTitleCase(str)
{
  return str.replace(
    /\w+/gi,
    x => x[0].toUpperCase()+x.substr(1)
  )
}

function wrapHighlight(str)
{
  return `<span class=\"highlight\">${str}</span>`
}

module.exports = {wrapHighlight,toTitleCase,getKeyByValue}