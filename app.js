/**
 * Module dependencies.
 */

import express from 'express';
import { configDotenv } from 'dotenv';
import { CLASS_NAMES } from './constants.js';

var app = express();
configDotenv();

app.set('port', process.env.PORT || 3001);
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('/public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => { res.render('index') });

app.post('/product', (req, res) => {
  if (!req.body || !req.body.dpci) {
    res.status(400).send('Missing information. Please include at least a dpci.')
    return;
  }
  const classN = getClassN(req.body.dpci);
  res.render('result', { dpci: req.body.dpci, department: req.body.dpci.substring(0, 3), classID: req.body.dpci.substring(0, 6), classN: classN, delivery: req.body.delivery, sold: req.body.delivery })
})

const getClassN = (dpci) => {
  const classID = dpci.substring(0, 6);
  return CLASS_NAMES[classID];
}
app.listen(process.env.PORT, () => {
  console.log("Product help bot has started on port", process.env.PORT);
});
