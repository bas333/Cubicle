Template.home.helpers ({
  productlist() {return Product.find()},
})

Template.home.onRendered(function(){
  this.$('#category').dropdown({on: 'hover'});
//  $('#category').select2();
})

const location=[
  {name:"Waltham",value:"waltham"},
  {name:"Watertown",value:"watertown"},
  {name:"Newton",value:"newton"},
  {name:"Cambridge",value:"cambridge"},
  {name:"Boston",value:"boston"},
  {name:"Brookline",value:"brookline"},
  {name:"Somerville",value:"somerville"},
  {name:"Malden",value:"malden"},
]

Template.home.helpers({
  locationdata(){
    return location;
  },
})

Template.home.events ({
  'click #shopnow' (elt,instance){
    var selectedcategory = instance.$('#category :selected').val();
    var searchstring = instance.$('#input').val();
    console.log(Product.find());
    if (selectedcategory == "All-categories") {
      console.log("Are You here " + selectedcategory);
      Router.go("allproducts", {}, {query:'keywords='+searchstring});
    } else {
      Router.go("shop", {}, {query:'type='+selectedcategory+'&keywords='+searchstring});
    }
  },


  'click #showrentalmodal'(elt,instance) {
    $('.ui.modal').modal({inverted: true}).modal('show');
    $('.ui.modal').modal({
      onApprove : function() {
        var rentcity = $('#searchlocation :selected').val();
        console.log("hi"+rentcity);
        var rentprice = $('#searchpriceM').val();
        console.log(rentprice);
        var rentstart = $('#search-date-start').val();
        var rentend = $('#search-date-end').val();
        console.log("here?");
        var rentfacility = $('#searchfacilities').val();
        Router.go("rentsearch", {}, {query:'location='+rentcity+'&price='+rentprice+'&rentstart=' + rentstart +'&rentend='+rentend+ '&facilities='+rentfacility});
      }
    })
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
          console.log(event);
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
            console.log(data.result.parameters.Category);
            console.log(data.result.parameters.Keywords);
            if(data.result.parameters.Category==""&&data.result.parameters.Keywords==""){
              console.log("condition1");
              responsiveVoice.speak("Sorry I don't understand, please say that again","UK English Female");
            }else if(data.result.parameters.Category!=""&&data.result.parameters.Keywords==""){
              console.log("condition2");
              console.log(data.result.parameters.Category);
              $("#category").val(data.result.parameters.Category).trigger("change");
              $("#input").val("");
              console.log("triggered condition2");
              var selectedcategory = instance.$('#category :selected').text();
              var searchstring = instance.$('#input').val();
              console.log(Product.find());
              if (selectedcategory == "All Categories") {
                console.log("Are You here " + selectedcategory);
                Router.go("allproducts", {}, {query:'keywords='+searchstring});
              } else {
                Router.go("shop", {}, {query:'type='+selectedcategory+'&keywords='+searchstring});
              }
              responsiveVoice.speak("searching by category now! The category is "+selectedcategory,"UK English Female");
            }else if(data.result.parameters.Category==""&&data.result.parameters.Keywords!=""){
              console.log("condition3");
              console.log(data.result.parameters.Keywords);
              $('#input').val(data.result.parameters.Keywords);
              var selectedcategory = instance.$('#category :selected').text();
              var searchstring = instance.$('#input').val();
              console.log(Product.find());
              if (selectedcategory == "All Categories") {
                console.log("Are You here " + selectedcategory);
                Router.go("allproducts", {}, {query:'keywords='+searchstring});
              } else {
                Router.go("shop", {}, {query:'type='+selectedcategory+'&keywords='+searchstring});
              }
              responsiveVoice.speak("searching by keywords now! The keywords are "+searchstring,"UK English Female");
            }else if(data.result.parameters.Category!=""&&data.result.parameters.Keywords!=""){
              console.log("condition4");
              $("#category").val(data.result.parameters.Category).trigger("change");
              instance.$('#input').val(data.result.parameters.Keywords);
              var selectedcategory = instance.$('#category :selected').text();
              var searchstring = instance.$('#input').val();
              console.log(Product.find());
              if (selectedcategory == "All Categories") {
                console.log("Are You here " + selectedcategory);
                Router.go("allproducts", {}, {query:'keywords='+searchstring});
              } else {
                Router.go("shop", {}, {query:'type='+selectedcategory+'&keywords='+searchstring});
              }
              responsiveVoice.speak("searching by category and keywords now! The category is "+selectedcategory+" The keywords are" +searchstring,"UK English Female");
            }
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
  'keypress #category' (elt,instance){
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
