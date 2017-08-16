$(document).ready(function(){

    event.preventDefault();

    $("#table").hide()

    $("#cost").on("click", function(){
          $("#table").toggle()
    });
  $("#quiz").hide()
      $("#options").hide()

   $("#quizButton").on("click", function(){
          $("#quiz").show()
          $("#options").show()
    });
    var quiz = {
      question: "What size dog do you want?",
      answers: ["Small", "Medium", "Large"],
    };

     var small = [ "Chihuahua", "Yorkie","Pug", "Beagle"];
 var medium = ["Basset-Hound",  "Schnauzer","Poodle","Golden-Retriever"];
 var large = ["German-Shepherd", "Great Dane", "Husky", "Dalmation"];

    
    $("#quiz").append("<h2>" + quiz.question + "</h2><br>" + "<button id='small' style='font-size:18px'><i class='fa fa-paw'></i> " + quiz.answers[0] + "</button>"+ "<button id='medium' style='font-size:18px'><i class='fa fa-paw'></i>" + quiz.answers[1] +"</button>" + "<button id='large' style='font-size:18px'><i class='fa fa-paw'></i>" + quiz.answers[2] + "</button>");
  

    

    $("#small").on("click", function(){
      $("#options").empty();

      console.log("work");

      for (var i =0; i < small.length; i++){

      var pickSmall = $("<button id ='work'>");

      pickSmall.text(small[i]);

      $("#options").append(pickSmall);
    }

   
    });

     $("#medium").on("click", function(){
       $("#options").empty();

      for (var i =0; i < medium.length; i++){

      var pickMedium = $("<button id ='work'>");

      pickMedium.text(medium[i]);

      $("#options").append(pickMedium);
    }
      });

      $("#large").on("click", function(){
         $("#options").empty();
      for (var i =0; i < large.length; i++){

      var pickLarge = $("<button id ='work'>");

      pickLarge.text(large[i]);

      $("#options").append(pickLarge);
    }
    });

      $(document).on("click", '#work', function(){
        console.log("please");

        var pickDog = $(this).text();
        $("#search").val(pickDog);
      });

    


      var breed = "";
      

    $(".find").click(function(){

      var breed = $("#search").val().trim();
      var name = $("#vistor").val().trim();
      var location = $("#code").val().trim();

      console.log(breed);
      console.log(name);
      console.log(location);


      var queryURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + breed + "&format=json&callback=?";

      var imageURL = "https://dog.ceo/api/breed/" + breed + "/images";

       
      
      $("#image").empty();
     
      $.ajax({
        url: queryURL,
        method: "GET",
        contentType: "applocation/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function(data){
          $("#facts").html(data[2][0]);
          // $("#output").html(data[3][0]);

          for(var i=0; i<data[2].length; i++){
            $("#link").html("<div>" + "Find out about the " + breed + "s lifespan and size with this link " + "<a href =" + data[3][0] + ">"+ data[3][0] +"</a></div>")
            console.log(data);
          };
        },
        
      });


  var baseURL = "https://api.petfinder.com/";
  var reqType = "pet.find?";
  var params = "breed="+ breed + "&location=" + location + "&count=1&output=basic&";
  var yourKey = "key=ad2cd8f7ea4a77a23e2a8bb6b66b4b52&";
  var format = "format=json";
  var callback = "&callback=?";
  

  var fullURL = baseURL+reqType+params+yourKey+format+callback;
  
    $("#your-request").text(fullURL);

        
      $.ajax({
    dataType: "jsonp",
    url: fullURL,
   
    success:(function(data){
    

      $("#hereIs").html("<div>" + "<h2>" + "About " + breed + "</h2></div>");
      $("#here").html("<div>" + "<h2>" + "Here is your " + breed + "</h2></div>");
    
      $("#photo").html("<img src="+data.petfinder.pets.pet.media.photos.photo[3].$t+"></img>");
    
      
      $("#name").text("Name: " + data.petfinder.pets.pet.name.$t);
      $("#description").text("Description: " + data.petfinder.pets.pet.description.$t);
      $("#sex").text("Sex: " + data.petfinder.pets.pet.sex.$t);
      $("#size").text("Size: " + data.petfinder.pets.pet.size.$t);
      $("#age").text("Age: " + data.petfinder.pets.pet.age.$t);
      

      $("#shelter").text("Shelter: " + data.petfinder.pets.pet.shelterId.$t);
      $("#contact1").text("Contact: " + data.petfinder.pets.pet.contact.phone.$t);
      $("#contact2").html("<a href =" + data.petfinder.pets.pet.contact.email.$t + ">" + data.petfinder.pets.pet.contact.email.$t + "</a>" );


       console.log(data);
       console.log(data.petfinder.pets.pet.name.$t);
   
    })

  });
  $(".form-control").val("");
  

  function getName(){
      // Initialize Firebase
       var config = {
          apiKey: "AIzaSyDuBFYzfIw_9JwSE3U0_dkWvbUt2OhV72Q",
          authDomain: "petmatch-b3da8.firebaseapp.com",
          databaseURL: "https://petmatch-b3da8.firebaseio.com",
        projectId: "petmatch-b3da8",
          storageBucket: "petmatch-b3da8.appspot.com",
          messagingSenderId: "1014252033957"
        };

  
        firebase.initializeApp(config);

        var database = firebase.database();

        var user = {
          Customer_Name: name,
          Breed: breed,
          Zip_Code: zipCode
        }

        database.ref().push(user);
    


   database.ref().on("child_added", function(childSnapshot) {

    var vistorName = childSnapshot.val().name
    console.log(vistorName)
  

    $("#marque").append("<h1>" + "Thank you" + vistorName + "for visting our page!" + "<i class='fa fa-paw' style='font-size:36px'></i>" + "</h1>" )
 
   });

 };



  

    
  getName ();

    });
 
      
  });
