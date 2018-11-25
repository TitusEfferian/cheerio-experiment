import rp from 'request-promise'
import cheerio from 'cheerio'

const profilParser = (url) => {
  return rp(url)
    .then((html) => {
      return {
        name: cheerio('.firstHeading', html).text(),
        birthday: cheerio('.bday', html).text()
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export default profilParser