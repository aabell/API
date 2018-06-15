var express = require('express');

var request = require('request');

var cheerio = require('cheerio');

var nodemailer = require('nodemailer');

var fs = require('fs');

var app = express();

var artist = process.argv[2];

String(artist);

var transporter = nodemailer.createTransport({

service:'gmail',
auth:{
user:'mezew.abel@gmail.com',
pass:'abeltilahun'
}
});

app.get('/scrape',function(req,res){
var $,scraped_data, url,data;
url = 'https://www.billboard.com/charts/rap-song';
request(url, function(error, response, html){
if(!error && response.statusCode == 200){
$ = cheerio.load(html);


$('a.chart-row__artist').each(function() {
if ($(this).text().trim()  == artist){

	data= "Artist:"+$(this).text()+" Song:"+$(this).siblings('.chart-row__song').text();

 			}
        });


var mailOptions = {
from:'mezew.abel@gmail.com',
to :'makhaylu@gmail.com',
subject: 'Let it can be any subject',
text:'Your Artist: '+ data
};
transporter.sendMail(mailOptions,function(error,info){
if(error){
console.log(error);

return ;

}

console.log('message send'+info.response);

})

}

})

})

app.listen(4000);