$(function(){
//ocr using tesseract

console.log("check zero");
//import { createWorker } from 'tesseract.js';
//import Tesseract from "tesseract.js";

var photo;

$(':file').on('change', function () {
	//need to use html5 API FileReader to send file via ajax
	photo = this.files[0];
});

var $form = $("#scanner");

$form.on("submit",function(e){

e.preventDefault();

console.log("check one");

if(!photo){
	alert("You need to submit a file");
	return;
}

//imperative
/*
const { createWorker } = Tesseract;
(async () => {
  const worker = createWorker();
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize(photo);
  console.log(text);
  worker.terminate();
})();
*/

//idk man
/*
Tesseract.recognize(
  photo,
  'eng',
  { logger: m => console.log(m) }
).then(({ data: { text } }) => {
  console.log(text);
});
*/
const worker = Tesseract.createWorker({
      logger: m => console.log(m)
    });
    Tesseract.setLogging(true);
    work();

    async function work() {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');

      result = await worker.recognize(photo);
      console.log(result.data);

      await worker.terminate();
    }

console.log("check two");

});
});
