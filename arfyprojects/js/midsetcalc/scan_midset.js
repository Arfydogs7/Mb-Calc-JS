$(function() {
	//event handler get file
	//send file to ocr api

var file;

$(':file').on('change', function () {
	//need to use html5 API FileReader to send file via ajax
	file = this.files[0];

	if (file.size > 1048576) {
	  alert('max upload size is 1MB');
	}

// Also see .name, .type
});

var $scannerForm = $("#scanner");

$scannerForm.on("submit",function(e){

e.preventDefault();

console.log("check one");

if(!file){
	alert("You need to submit a file");
	return;
}

$loading = $("#loading")
$loading.html("loading...");

//Prepare form data
var $formData = new FormData();
$formData.append("file", file);
//formData.append("url", "URL-of-Image-or-PDF-file");
$formData.append("language", "eng");
$formData.append("apikey", "d3996b4a7188957");
$formData.append("isTable", true);

console.log("check two");

//Send OCR Parsing request asynchronously
jQuery.ajax({
	url: "https://api.ocr.space/parse/image",
	data: $formData,
	dataType: 'json',
	cache: false,
	contentType: false,
	processData: false,
	type: 'POST',
	success: function (ocrParsedResult) {
	//Get the parsed results, exit code and error message and details
	console.log("check three");
	var parsedResults = ocrParsedResult["ParsedResults"];
	var ocrExitCode = ocrParsedResult["OCRExitCode"];
	var isErroredOnProcessing = ocrParsedResult["IsErroredOnProcessing"];
	var errorMessage = ocrParsedResult["ErrorMessage"];
	var errorDetails = ocrParsedResult["ErrorDetails"];
	var processingTimeInMilliseconds = ocrParsedResult["ProcessingTimeInMilliseconds"];
	//If we have got parsed results, then loop over the results to do something
	if (parsedResults!= null) {
	//Loop through the parsed results
	$.each(parsedResults, function (index, value) {
	var exitCode = value["FileParseExitCode"];
	var parsedText = value["ParsedText"];
	var errorMessage = value["ParsedTextFileName"];
	var errorDetails = value["ErrorDetails"];

	var pageText = '';
	switch (+exitCode) {
	case 1:
	pageText = parsedText;
	break;
	case 0:
	case -10:
	case -20:
	case -30:
	case -99:
	default:
	pageText += "Error: " + errorMessage;
	break;
	}

	//YOUR CODE HERE
	$loading.html("");
	console.log(processingTimeInMilliseconds);
	$("#midset").html("<p><b>" + "OCR results for your image" + "</b><br />" + pageText + "</p>");
	console.log(pageText);

	});
	}
	}
});

});

});

/*
var newEl = document.createElement("p");
var newText = document.createTextNode("midsets");
newEl.appendChild(newText);
document.getElementById("midset").appendChild(newEl);
*/
