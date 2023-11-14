/**
 * Module dependencies.
 */

import express from 'express';
import { configDotenv } from 'dotenv';
import { CLASS_NAMES } from './constants.js';

const ONE_DAY_MS = 86400000;
const app = express();
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
  let deliveryDays;
  let soldDays;
  if (req.body.delivery) {
    deliveryDays = (Date.now() - (new Date(req.body.delivery)).getTime()) / ONE_DAY_MS
  }

  if (req.body.sold) {
    soldDays = (Date.now() - (new Date(req.body.sold)).getTime()) / ONE_DAY_MS
  }
  res.render('result', { dpci: req.body.dpci, department: req.body.dpci.substring(0, 3), classID: req.body.dpci.substring(0, 6), classN: classN, delivery: deliveryDays, sold: soldDays })
})

const getClassN = (dpci) => {
  const classID = dpci.substring(0, 6);
  return CLASS_NAMES[classID];
}
app.listen(process.env.PORT, () => {
  console.log("Product help bot has started on port", process.env.PORT);
});
