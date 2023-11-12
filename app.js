/**
 * Module dependencies.
 */

import express from 'express';
import 'dotenv/config';

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('/public'));

app.get('/', (req, res) => { res.render('index') });

app.listen(process.env.PORT, () => {
  console.log("Fulfillment Manager has started...");
});
