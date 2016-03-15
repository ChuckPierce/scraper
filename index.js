var cheerio = require('cheerio')
var jsonfile = require('jsonfile')
var fs = require('fs')
var request = require('request-promise')
var testSID = process.env.TWILIO_SID
var testAuth = process.env.TWILIO_AUTH
var twilio = require('twilio')
var client = new twilio.RestClient(testSID, testAuth)
var BPromise = require('bluebird')

var getHTML = function() {
  var url = 'http://www.broadstreetrun.com/Registration/BulletinBoard.cfm?step=1&Topic=154'
  var urlFile = fs.readFileSync('./url.json')
  var storedUrl = JSON.parse(fs.readFileSync('./url.json'))
  request(url)
    .then(function (html) {
        var $ = cheerio.load(html)
        var newUrl = $('.Boards-MessageTitle').attr('href')
        if (storedUrl.url !== newUrl) {
            console.log('new')
            var promise1 = client.messages.create({
              to: process.env.PHONE_NUMBER_1,
              from: process.env.TWILIO_PHONE_NUMBER,
              body: 'A new sale has been posted!  Go there now! http://www.broadstreetrun.com' + newUrl
            })
            var promise2 = client.messages.create({
              to: process.env.PHONE_NUMBER_2,
              from: process.env.TWILIO_PHONE_NUMBER,
              body: 'A new sale has been posted!  Go there now! http://www.broadstreetrun.com' + newUrl
            })
            jsonfile.writeFileSync('./url.json', { url: newUrl })
            console.log('written')
            return BPromise.all([promise1, promise2])
        } else {
            return 'no change'
        }
    })
    .then(function (message) {
        console.log(message)
        setTimeout(getHTML, 1000)
    })
    .catch(function (e) {
        console.log(e)
        setTimeout(getHTML, 1000)
    })
}

getHTML()
