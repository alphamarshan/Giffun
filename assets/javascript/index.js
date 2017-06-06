var topics = ["squat", "deadlift", "bench press", "kettlebell swing", "pull-up", "push-up", "sit-up"];

	function renderButtons() {

		$("#topicsDiv").empty();

        for (var i = 0; i < topics.length; i++) {
        
	      var exButton = $("<button>");

	      exButton.addClass("exercise");
		
	      exButton.attr("name", topics[i]);

	      exButton.text(topics[i]);
	      
	      $("#topicsDiv").append(exButton);
	      console.log(topics[i]);
        }
    }

    $("#add-exercise").on("click", function(event) {
        
        event.preventDefault();

        var userExercise = $("#exercise-input").val().trim();

        topics.push(userExercise);

        renderButtons();
    });

renderButtons();


$("button").on("click", function() {

	$("#gifsDiv").empty();

	var exercise = $(this).attr("name");

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        exercise + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
          url: queryURL,
          method: "GET"
        })
    .done(function(response) {
    	
    	var results = response.data;

    	for (var i = 0; i < results.length; i++) {

    		var exerciseDiv = $("<div>");

    		var p = $("<p>").text("Rating: " + results[i].rating);

    		var exerciseImage = $("<img>");

    		exerciseImage.attr("src", results[i].images.fixed_height.url);

    		exerciseDiv.append(p);

    		exerciseDiv.append(exerciseImage);

    		$("#gifsDiv").prepend(exerciseDiv);
    	}


    })

})

$(".gif").on("click", function() {

	var state = $(this).attr("data-state");

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	}

	else {
		$(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
	}
});

