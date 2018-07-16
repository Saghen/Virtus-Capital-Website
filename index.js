let express = require('express'),
    app = express(),
    path = require('path'),
    compression = require('compression'),
    formidable = require('express-formidable'),
    fs = require('fs');

app.use(compression());
app.use(formidable());
app.use(express.static('static'));

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
    fs.writeFile(path.resolve(__dirname, 'static/js/news.json'), JSON.stringify(req.body));
    res.json({success: true});
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