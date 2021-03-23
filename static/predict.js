let imageLoaded = false;
$("#image-selector").change(function() {
    imageLoaded = false;
    let reader = new FileReader();
    $('#your_result').hide();
    $('#loading_result').show();
    $('#loading_result').text('Loading image...');
    reader.onload = function() {
        let dataURL = reader.result;
        $("#selected-image").attr("src", dataURL);
        $("#prediction-list").empty();
        $('#loading_result').hide();
        imageLoaded = true;
    }

    let file = $("#image-selector").prop('files')[0];
    reader.readAsDataURL(file);
});

let model;
let modelLoaded = false;
$(document).ready(async function() {
    modelLoaded = false;
    $('#loading_model').show();
    // console.log("Loading model...");
    model = await tf.loadGraphModel('model/model.json');
    // console.log("Model loaded.");
    $('#loading_model').hide();
    modelLoaded = true;
});




$("#predict-button").click(async function() {


    if (!modelLoaded) { alert("The model must be loaded first"); return; }
    if (!imageLoaded) { alert("Please select an image first"); return; }

    $('#loading_result').show();
    $('#loading_result').text('Loading result...');

    let image = $('#selected-image').get(0);

    // Pre-process the image
    // console.log("Loading image...");
    let tensor = tf.browser.fromPixels(image, 3)
        .resizeNearestNeighbor([224, 224]) // change the image size
        .expandDims()
        .toFloat()
        .reverse(-1); // RGB -> BGR

    let predictions = await model.predict(tensor).data();


    let top5 = Array.from(predictions)
        .map(function(p, i) { // this is Array.map
            return {
                probability: p,
                className: TARGET_CLASSES[i] // we are selecting the value from the obj
            };
        }).sort(function(a, b) {
            return b.probability - a.probability;
        }).slice(0, 2);

    $('#loading_result').hide();
    $('#your_result').show();
    $("#prediction-list").empty();

    top5.forEach(function(p) {
        $("#prediction-list").append(`<li>${p.className}: ${(p.probability.toFixed(6)*100).toFixed(3)} %</li>`);
    });

});