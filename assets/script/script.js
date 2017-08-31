
      
      // car variables = ["honda", "chevy", "porsche", "ford"];

      // displayCarInfo function re-renders the HTML to display the appropriate content
      function displayCarInfo() {

        var cars = $(this).attr("data-cars");
        //ajax method properties of URL and GET to query the GIPHY site and pull the CARS giphs.
          $.ajax({
          url: "https://api.giphy.com/v1/gifs/search?q=" +
            cars + "&api_key=dc6zaTOxFJmzC&limit=10",
          method: "GET"
        })

          .done(function(response) {
          //HERE WE STORE THE RESULTS IN AN ARRAY VARIABLE

          var results = response.data;
          //looping over every result in the array

          for (var i = 0; i < results.length; i++) {

            //conditional statement 
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div with the class "carsgifdiv"
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

      // This function handles events where the add cars button is clicked "on-click"
      $("#add-cars").on("click", function(event) {
        event.preventDefault();

        // here we grab the input from the textbox
        var cars = $("#cars-input").val().trim();

        // The car input from textbox is then added to the array
     
          var a = $("<button>");
          // Adds a class of cars to button

          a.addClass("cars");
          // Added a data-attribute

          a.attr("data-cars", cars);
          // Provided the initial button text

          a.text(cars);
          // Appending the button to the buttons-view div
          $("#buttons-view").append(a);
      });



       // here we control the images moving when the image is "clicked on"
       $('body').on('click', "img", function(event) {

        var movingImage = $(this).attr("moving-image");
        $(this).attr("src", movingImage);
        console.log("click")
    
  });
      

      $(document).on("click", ".cars", displayCarInfo);
      // renderButtons();
    