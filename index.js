let express = require('express'),
    app = express(),
    path = require('path'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    formidable = require('express-formidable');

app.use(compression());
app.use(express.static('static'));
app.use(formidable());

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
    fs.writeFile(path.resolve(__dirname, 'static/js/news.json'), JSON.stringify(req.fields), err => { if(err) return console.log(err); res.json({success: true}) });
});

app.post('/image-upload', (req, res) => {
    if (req.query.token != 'gHsGEw7u4YTcaOf') {
        res.status(401).send('Token was incorrect. Please email liamcdyer@gmail.com if a new token is needed.');
        return;
    }
    let oldPath = req.files.file.path;
    let newPath = __dirname + "/static/uploads/" + req.files.file.name;
    fs.rename(oldPath, newPath, function (err) {
        if (err) res.status(500).json({ success: false, error: err });
        else res.json({ success: true })
    });
})

require('greenlock-express').create({
    version: 'draft-11'
  , server: 'https://acme-v02.api.letsencrypt.org/directory'
  , configDir: '~/.config/acme/'
  , email: 'saghendev@gmail.com'
  , approveDomains: [ 'trivirtus.com' ]
  , agreeTos: true
  , app: app
  , communityMember: false
  , telemetry: false
  }).listen(80, 443);