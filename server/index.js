var express = require('express');
var app = express();

app.use(express.static('../client'));

app.get('*', (req, res) => {
    res.sendFile('./client/index.html', { root: `${__dirname}/../`});
});

app.listen(8000, () => {
    console.log("Running on port 8000");
});