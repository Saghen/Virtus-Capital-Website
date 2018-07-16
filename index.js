let express = require('express'),
    app = express(),
    path = require('path'),
    compression = require('compression');

app.use(compression());
app.use(express.static('static'));

app.get('/update-news', (req, res) => {
    if(req.query.token != 'gHsGEw7u4YTcaOf') {
        res.status(401).send('Token was incorrect. Please email liamcdyer@gmail.com if a new token is needed');
        return;
    }
    res.sendFile(path.resolve(__dirname, 'update_news/index.html'));
})

require('greenlock-express').create({

    // Let's Encrypt v2 is ACME draft 11
    version: 'draft-11'
  
    // Note: If at first you don't succeed, switch to staging to debug
    // https://acme-staging-v02.api.letsencrypt.org/directory
  , server: 'https://acme-v02.api.letsencrypt.org/directory'
  
    // Where the certs will be saved, MUST have write access
  , configDir: '~/.config/acme/'
  
    // You MUST change this to a valid email address
  , email: 'saghendev@gmail.com'
  
    // You MUST change these to valid domains
    // NOTE: all domains will validated and listed on the certificate
  , approveDomains: [ 'virtuscapital.ca' ]
  
    // You MUST NOT build clients that accept the ToS without asking the user
  , agreeTos: true
  
  , app: app
  
    // Join the community to get notified of important updates
  , communityMember: false
  
    // Contribute telemetry data to the project
  , telemetry: false
  
  }).listen(80, 443);