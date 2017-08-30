
      
      // car variables = ["honda", "chevy", "porsche", "ford"];

      // displayCarInfo function re-renders the HTML to display the appropriate content
      function displayCarInfo() {

        var cars = $(this).attr("data-cars");
        
          $.ajax({
          url: "https://api.giphy.com/v1/gifs/search?q=" +
            cars + "&api_key=dc6zaTOxFJmzC&limit=10",
          method: "GET"
        })

          .done(function(response) {
          //storing an array of results in the results variable
          var results = response.data;
          //looping over every result item
          for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div with the class "item"
            var gifDiv = $("<div class='carsGifDiv'>");
            // Storing the result item's rating
            var rating = results[i].rating;
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);
            // Creating an image tag
            var carsImage = $("<img>");

            carsImage.addClass("carsGif");
            // Giving the image tag an src attribute of a proprty pulled off the result item
            carsImage.attr("src", results[i].images.fixed_height_still.url);
            carsImage.attr("moving-image", results[i].images.fixed_height.url );
            carsImage.attr("still-image", results[i].images.fixed_height_still.url);
            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.prepend(p);
            gifDiv.prepend(carsImage);
            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              // $("#gifs-appear-here").prepend(gifDiv);
            $("#gifs-appear-here").prepend(gifDiv);
          }
        }
      }); 

    }    

      // This function handles events where the add cars button is clicked
      $("#add-cars").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var cars = $("#cars-input").val().trim();

        // The movie from the textbox is then added to our array
        //log
          var a = $("<button>");
          // Adds a class of cars to our button
          a.addClass("cars");
          // Added a data-attribute
          a.attr("data-cars", cars);
          // Provided the initial button text
          a.text(cars);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
      });
       // $(document).ready(function(){
       $('body').on('click', "img", function(event) {

        var movingImage = $(this).attr("moving-image");
        $(this).attr("src", movingImage);
        console.log("click")
    
  });
      

      $(document).on("click", ".cars", displayCarInfo);
      // renderButtons();
    