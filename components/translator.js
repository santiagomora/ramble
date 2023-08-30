const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')
const {wrapHighlight,translateTime,toTitleCase,getKeyByValue} = require('./methods.js')


class Translator 
{

  translation = ""

  locale = []

  highlight = false

  clear()
  {
    this.translation = ""
    this.locale = []
    this.highlight = false
  }

  getTranslation()
  {
    const translation = this.translation
    this.clear()
    return translation
  }

  withHighlight()
  {
    this.highlight = true
    return this
  }

  withoutHighlight()
  {
    this.highlight = false
    return this
  }

  initialize(text,locale)
  {
    if( typeof text === 'undefined'
        || typeof locale === 'undefined' )
    {
      throw {error:'Required field(s) missing'}
    }
    if(!text)
    {
      throw { error: 'No text to translate' }
    }
    if( !/^american\-to\-british$/.test(locale)
        && !/^british\-to\-american$/.test(locale) )
    {
      throw {error:'Invalid value for locale field'}
    }
    this.translation = text
    this.locale = locale.split(/\-to\-/)
    return this
  }

  getFromLocale(translationObj)
  {
    const [frm] = this.locale
    return frm ==='british'
      ? str => getKeyByValue(translationObj,str.toLowerCase())
      : str => translationObj[str.toLowerCase()]
  }

  getTitles()
  {
    const [frm] = this.locale
    return frm === 'american'
      ? Object.keys(americanToBritishTitles)
      : Object.values(americanToBritishTitles)
  }

  translateTimes()
  {
    const [frm] = this.locale
    let test,hr,mn,time,splitAt = frm === 'british' ? '.' : ':'
    const reg = new RegExp(`\\d{1,2}\\${splitAt}\\d{1,2}`,"gi")
    const translator = str => frm === 'british' 
      ? str.replace('.',':') 
      : str.replace(':','.')
    this.translation = this.translation.replace(
      reg,
      x => 
      {
        test = x.split(splitAt).map(x => parseInt(x))
        hr = test[0]>23 ? test[0]%10 : test[0]
        mn = test[1]>59 ? test[1]%10 : test[1]
        time = `${hr}${splitAt}${mn}`
        return x.replace(
          time,
          this.highlight ? wrapHighlight(translator(time)) : translator(time)
        )
      }
    )
    return this
  }

  translateTitles()
  {
    const [frm] = this.locale
    const translate = this.getFromLocale(americanToBritishTitles)
    for(let i of this.getTitles())
    {
      this.translation = this.translation.replace(
        new RegExp(`(^${i}(?!\\w+)|(\\s+)${i}(?!\\w+))`,"gi"),
        x => 
        {
          const expr = toTitleCase(translate(x.trim().toLowerCase()))
          const replace = this.highlight ? wrapHighlight(expr): expr
          return x.replace(x.trim(),replace)
        }
      )
    }
    return this
  }

  translateUniquePhrases()
  {
    const [frm] = this.locale
    const uniqueExpr = {american:americanOnly,british:britishOnly}[frm]
    let reg;
    for(let i in uniqueExpr)
    {
      this.translation = this.translation.replace(
        new RegExp(`(^${i}(?!\\w+)|(\\s+)${i}(?!\\w+))`,"gi"),
        x => 
        {
          const expr = uniqueExpr[x.trim().toLowerCase()]
          const replace = this.highlight ? wrapHighlight(expr): expr
          return x.replace(x.trim(),replace)
        }
      )
    }
    return this
  }

  translateRegularPhrases()
  {
    let test,low;
    const translate = this.getFromLocale(americanToBritishSpelling);
    this.translation = this.translation.replace( 
      /\w+/gi,
      e => 
      {
        low = e.toLowerCase()
        if( (test = translate(low))
            && !americanToBritishTitles[low] )
        {
          return this.highlight ? wrapHighlight(test) : test
        }
        return e
      }
    )
    return this
  }
}

module.exports = Translator;