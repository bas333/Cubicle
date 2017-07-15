Template.home.helpers ({
  productlist() {return Product.find()},
})

Template.home.events ({
  'click #shopnow' (elt,instance){
    var selectedcategory = instance.$('#category :selected').text();
    console.log(Product.find());
    if (selectedcategory == "All Categories") {
      if(searchstring != "") {
        Router.go("allproducts", {}, {query:'keywords='+searchstring});
      } else {
        console.log("Are you here!");
        Router.go("allproducts");
      }
    } else {
      Router.go("shop", {}, {query:'type='+selectedcategory});
    }
  },



  'click #rec':function(elt,instance){
      var recognition;
      var accessToken = "1b1610a6d61d46959c56b8d0bf607881";
      var baseUrl = "https://api.api.ai/v1/";
      switchRecognition();
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
  },
  'keypress #input' (elt,instance){
    if (event.which == 13) {
      event.preventDefault();
      send();
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
        },
        error: function() {
          setResponse("Internal Server Error");
        }
      });
      setResponse("Loading...");
    };
    function setResponse(val) {
      $("#response").text(val);
    };
  }
})
