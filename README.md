# Broad Street Run message board web scraper
A simple web scraper that looked for updates to a message board and used the Twilio API to alert designated phone numbers. 


## Motivation
The Broad Street is a popular 10 mile run in Philadelphia, PA. The registration is done by lottery and sometimes when you sign up you don't get a bib.
When potential runners don't get a spot, they monitor a message board on the Broad Street Run website where users post that they can't participate in the run any longer and want to sell their bibs.

Because the run is so popular, people are monitoring the site day and night. Once a post shows up on the site, someone immediately responds. So if you aren't on your computer at the exact right time, you miss out.

I needed a way to know the exact moment a user posted on the message board so that I could respond immediately.

## Solution
The solution was to write a simple [node script](https://github.com/ChuckPierce/scraper/blob/master/index.js) that scraped the site and stored all the current urls of the current messages into a json file.
From there, I would scrape the site every second. If a new message was posted, I used the [Twilio API](https://www.twilio.com/docs/usage/api) to send a text message to two specific numbers about the change to the message board.
In the text was the url to the message that was just posted. We successfully responded first multiple times to people who were selling their registrations.
