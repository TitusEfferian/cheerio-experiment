import express from 'express'
import cheerio from 'cheerio'
import rp from 'request-promise'
import profileParser from './profile'
import axios from 'axios'
const app = express()
const url = 'https://www.tokopedia.com/';

app.get('/scrap', function (req, res) {
  axios.get('https://horriblesubs.info/')
    .then((response) => {
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
        const show = []
        $('table.schedule-table > tbody > tr').each(function () {
          show.push({
            title: $(this).find('a').text(),
            time: $(this).find('.schedule-widget-time').text()
          })
        })
        res.send(show)
      }
    })
})

app.listen('8081')