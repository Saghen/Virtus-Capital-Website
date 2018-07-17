let express = require('express'),
    app = express(),
    path = require('path'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    fileUpload = require('express-fileupload');

app.use(compression());
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(fileUpload());

app.get('/update-news', (req, res) => {
    if(req.query.token != 'gHsGEw7u4YTcaOf') {
        res.status(401).send('Token was incorrect. Please email liamcdyer@gmail.com if a new token is needed.');
        return;
    }
    res.sendFile(path.resolve(__dirname, 'update-news/index.html'));
});

app.post('/update-news', (req, res) => {
    if(req.query.token != 'gHsGEw7u4YTcaOf') {
        res.status(401).send('Token was incorrect. Please email liamcdyer@gmail.com if a new token is needed.');
        return;
    }
    fs.writeFile(path.resolve(__dirname, 'static/js/news.json'), JSON.stringify(req.body), err => { if(err) console.log(err) });
    res.json({success: true});
});

app.post('/image-upload', (req, res) => {
    console.log(req.files);
})

require('greenlock-express').create({
    version: 'draft-11'
  , server: 'https://acme-v02.api.letsencrypt.org/directory'
  , configDir: '~/.config/acme/'
  , email: 'saghendev@gmail.com'
  , approveDomains: [ 'virtuscapital.ca' ]
  , agreeTos: true
  , app: app
  , communityMember: false
  , telemetry: false
  }).listen(80, 443);