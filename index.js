let express = require('express'),
    app = express();

app.use(express.static('static'));

app.listen(80);