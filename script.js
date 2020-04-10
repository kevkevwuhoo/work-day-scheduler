// date at the top of the page
$("#currentDay").text(moment().format("dddd, MMM Do YYYY"));

// standard hours of the day
var hours = [
    { time: "9AM", hour: 0900 },
    { time: "10AM", hour: 1000 },
    { time: "11AM", hour: 1100 },
    { time: "12PM", hour: 1200 },
    { time: "1PM", hour: 1300 },
    { time: "2PM", hour: 1400 },
    { time: "3PM", hour: 1500 },
    { time: "4PM", hour: 1600 },
    { time: "5PM", hour: 1700 },
];

// create the time blocks
hours.map((blockHour) => {
    // create new div to house time block
    var timeblockDiv = $("<div>");

    // span to hold the time
    var hoursSpan = $("<span>");
    hoursSpan.attr("class", "hour col-1");
    hoursSpan.text(blockHour.time);
    // add the hour span to the timeblock
    timeblockDiv.append(hoursSpan);

    // textarea to allow user input
    var textBox = $("<textarea>");
    textBox.attr("class", "description col-10");
    // fill with events that user already saved
    var storedEvent = localStorage.getItem(blockHour.time);
    // only if theres something stored
    if (storedEvent) {
        textBox.val(storedEvent);
    }
    // add the textarea to the timeblock
    timeblockDiv.append(textBox);

    // save button to let user save their events
    var saveButton = $("<button>");
    // listen for click event
    saveButton.on("click", function () {
        // save the events to local storage
        localStorage.setItem(blockHour.time, textBox.val());
    });
    saveButton.attr("class", "saveBtn col-1");
    saveButton.text("Save");
    // add save button to timeblock
    timeblockDiv.append(saveButton);

    // style timeblock colors
    // if timeblock has past, change to gray
    // if timeblock is now, change to red
    // if timeblock is future, change to red
    var timeNow = parseInt(moment().format("HH") + "00");
    var timeblockTime = blockHour.hour;
    if (timeblockTime < timeNow) {
        timeblockDiv.attr("class", "row time-block past");
    } else if (timeblockTime === timeNow) {
        timeblockDiv.attr("class", "row time-block present");
    } else {
        timeblockDiv.attr("class", "row time-block future");
    }
    // add timeblock to the container
    $(".container").append(timeblockDiv);
});
