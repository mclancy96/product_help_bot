/**
 * Module dependencies.
 */

import express from 'express';
import 'dotenv/config';
import { configDotenv } from 'dotenv';

var app = express();
configDotenv();

app.set('port', process.env.PORT || 3001);
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('/public'));
app.use(express.urlencoded({ extended: true }));

app.post('/product', (req, res) => {
  if (!req.body || !req.body.dpci) {
    res.status(400).send('Missing information. Please include at least a dpci.')
    return;
  }
  res.render('result', { dpci: req.body.dpci })
})
app.get('/', (req, res) => { res.render('index') });



app.listen(process.env.PORT, () => {
  console.log("Product help bot has started on port", process.env.PORT);
});
