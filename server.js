import Express, { application, text } from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import multer from "multer";
import {ThirdwebStorage} from "@thirdweb-dev/storage"
import { toHash, generateKey } from "./crypto.js";
// import crypto from "./crypto.js";

// Codes for server... start

const app = new Express();
app.use(Express.urlencoded({ extended: true }));

app.use(Express.static("public"));
app.set("view engine", "ejs");

const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(__filename);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on the port ${port}.`);
});

// app.use((req, res, next) => {
//   res.status(404).send("request is not sent properly.");
// });


// Codes for server... ends



// Codes for data transposition... starts

var fileName = '';

const storage = multer.diskStorage({
  destination:function (req, file, cb) {
    cb(null, _dirname + "\\uploads.txt");
  }, 
  filename: function (req, file, cb) {
   cb(null, file.originalname);
   fileName = file.originalname;
  //  main(file.originalname);  
  },
});
const upload = multer({ storage: storage });



// Codes for data transposition... ends



// Codes for communicating with client... starts

app.get("/", (req, res) => {
  res.render(_dirname + "/views/pages/index");
});

app.get("/history", (req, res) => {
  res.render(_dirname + "/views/pages/history");
});

app.get("/import", (req, res) => {
  res.render(_dirname + "/views/pages/import");
});

app.post("/", upload.single("myViewFile"), (req, res) => {
  main(fileName).then((response) => res.send(
    `URL Gateway - ${response}`
    ));
 fs.rm(_dirname +"\\uploads.txt\\"+fileName,(err,resolvedPath)=>{});
});

// Codes for communicating with client... ends



// Codes for ipfs connection and sharing... starts


const Storage = new ThirdwebStorage();

// (async () => {
//   const upload = await Storage.upload(
//     fs.readFileSync(_dirname + "/uploads.txt/believe.png")
//   );
//   console.log("only upload: "+upload);
//   console.log(`Gateway URL - ${Storage.resolveScheme(upload)}`);
//  const res = await Storage.download(upload);
//  const data = await res.text();
//  console.log("fetch data is : " + data);
// })();


async function main(fileName){
  // to upload on gateway.ipfscdn.io

  const upload = await Storage.upload(
    fs.readFileSync(_dirname + '\\uploads.txt\\'+fileName)
  );
  var url = Storage.resolveScheme(upload);
  // console.log(`Gateway URL - ${url}`);
   
  // console.log(toHash(upload));
  // console.log(url);
  return url;
  // to fetch/download the file.

  // const res = await Storage.download(upload);
  // const data = await res.text();
  // console.log("fetch data is : " + data);
}

