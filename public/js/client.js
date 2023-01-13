import { response } from "express";

// let upload = document.querySelector("#upload");
let myfile = document.querySelector("#myfile");
let body = document.querySelector("body");
let data = "6.12.22  input and output";
var fileData;

var formData = new FormData();
formData.append("file", myfile.files[0]);

async function connectWallet() {
  var provider = new ethers.providers.Web3Provider(window.ethereum);
  var account = await provider.send("eth_requestAccounts", []);
  // alert("public address: " + account);
  var signer = await provider.getSigner();
}
connectWallet();
myfile.addEventListener("change", function () {
  var GetFile = new FileReader();
  GetFile.readAsBinaryString(this.files[0]);
  GetFile.onload = () => {
    fileData = GetFile.result;
  };
});


// $.ajax({
//   url: "/test",
//   type: "POST",
//   data: formData,
//   processData: false, // tell jQuery not to process the data
//   contentType: false, // tell jQuery not to set contentType
// });


// const upload = (file)=>{
//   fetch("/",{
//     method:'POST',
//     headers:{
//       "Content-Type": "file/text"
//     },
//     body: file
//   }).then(()=>{
//     console.log("successful");
//   }).catch((err)=>{
//     console.log(err);
//   });
// }

$("button").on("click", () => {
  alert("file Data is : " + fileData);
  // alert(formData.getAll("file"));
  // upload(myfile.files[0]);
});