var button = $("#btnstopid");
var textparagraph = $("#para");

$("#btnstopid").on('click', function () {
    if (isNaN($("#stopid").val())){
        $("#stopid").val("");
        $("#stopid").attr("placeholder", "Enter a number e.g. 7150");
        console.log("failed by not a number");
    } else if ($("#stopid").val() < 1){
        $("#stopid").val("");
        $("#stopid").attr("placeholder", "Enter text here");
        console.log("failed by being empty");
    } else {
        console.log("success here");
        console.log($("#stopid").val());
        processStopID($("#stopid").val());
    }
});

function processStopID(number){
        var params = {
            // Request parameters
            "callback": "{string}",
        };
      
        $.ajax({
            url: "https://api.at.govt.nz/v2/gtfs/stops/stopId/" + number,
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Accept","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","3c10f424470a439aa15ee65c1be93de3");
            },
            contentType: 'application/json; charset=utf-8',
            type: "GET",
        })
        .done(function(data) {
            alert("success");
            console.log("done data");
        })
        .fail(function() {
            alert("error");
            console.log("failed data");
        });
}