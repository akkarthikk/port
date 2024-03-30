import express from "express";
import qr from "qr-image";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from "fs";

const app = express();
const port = 3000;
const currentDate = new Date().toISOString().split('T')[0];

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index.ejs");
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/qr", (req, res) => {
  res.render("qr.ejs");
});

app.get("/generateQRCode", (req, res) => {
  const url = req.query.url;
  const qr_svg = qr.image(url, { type: 'png' });
  res.type('png');
  qr_svg.pipe(res);
  fs.appendFile("URL.txt", url+'\n', (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
