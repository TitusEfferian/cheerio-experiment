import express from 'express'
import cheerio from 'cheerio'
import rp from 'request-promise'
import profileParser from './profile'
const app = express()
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

app.get('/scrap', function (req, res) {
  const wikiUrl = []
  rp(url)
  .then((html)=>{
    for(let a = 0 ; a<45;a++){
      wikiUrl.push(cheerio('big > a',html)[a].attribs.href)
    }
    return Promise.all(
      wikiUrl.map(x=>profileParser('https://en.wikipedia.org'+x))
    )
  })
  .then((president)=>{
    res.send({success:true,data:president})
  })
  .catch((err)=>{
    console.log(err)
  })
})

app.listen('8081')