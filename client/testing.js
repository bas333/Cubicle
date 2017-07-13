Template.testing.events({
  'click #fakesubmit':function(elt,instance){
    const inputCategory=instance.$('#input').val();
    console.log(inputCategory);
    var cate=[];
    for(var i=0;i<allCate.length;i++){
      console.log((allCate[i].toUpperCase()));
      console.log(inputCategory.toUpperCase());
      if( inputCategory.toUpperCase().match(/allCate[i].toUpperCase()/gi)){

        cate=allCate[i];
      }
    }
    console.log(cate);
    //for each string in array
    //check if the string contains the value of inputCategory by string.match(inputCategory)
    //if passed, set cate to be the string
  },
  'click #rec':function(elt,instance){
    var accessToken = "1b1610a6d61d46959c56b8d0bf607881";
    var baseUrl = "https://api.api.ai/v1/";
    $(document).ready(function() {
      $("#input").keypress(function(event) {
        if (event.which == 13) {
          event.preventDefault();
          send();
        }
      });
      $("#rec").click(function(event) {
        switchRecognition();
      });
    });
    var recognition;
    function startRecognition() {
      recognition = new webkitSpeechRecognition();
      recognition.onstart = function(event) {
        updateRec();
      };
      recognition.onresult = function(event) {
        var text = "";
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
          }
          setInput(text);
        stopRecognition();
      };
      recognition.onend = function() {
        stopRecognition();
      };
      recognition.lang = "en-US";
      recognition.start();
    }

    function stopRecognition() {
      if (recognition) {
        recognition.stop();
        recognition = null;
      }
      updateRec();
    }
    function switchRecognition() {
      if (recognition) {
        stopRecognition();
      } else {
        startRecognition();
      }
    }
    function setInput(text) {
      $("#input").val(text);
      send();
    }
    function updateRec() {
      $("#rec").text(recognition ? "Stop" : "Speak");
    }
    function send() {
      var text = $("#input").val();
      $.ajax({
        type: "POST",
        url: baseUrl + "query?v=20150910",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
        success: function(data) {
          setResponse(JSON.stringify(data, undefined, 2));
          console.log(data);
          console.log(data.result.parameters.Category);
          $("#input").val(data.result.parameters.Category);
        },
        error: function() {
          setResponse("Internal Server Error");
        }
      });
      setResponse("Loading...");
    }
    function setResponse(val) {
      $("#response").text(val);
    }
  }
})

const allCate=[
  "All Categories",
  "Textbooks/Books",
  "Electronics",
  "Clothes,Shoes,and Accessories",
  "Furniture/Home",
  "Art/Handcrafts",
]
