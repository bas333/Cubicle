Template.addrent.events({
  'click #submitrent'(elt,instance){
    const location = instance.$('#location :selected').val();
    const street = instance.$('#street-address').val();
    const time = instance.$('#time').val();
    const roomsize = instance.$('#roomsize').val();
    const facilities = instance.$('#facilities').val();
    const detailed = instance.$('#detaileddescription').val();
    const roommate = instance.$('#roommatedescription').val();
    const price = instance.$('#price').val();
    const contact = instance.$('#contact-information').val();
    console.log("adding " + location);
    instance.$('#location').val("");
    instance.$('#street-address').val("");
    instance.$('#time').val("");
    instance.$('#roomsize').val("");
    instance.$('#facilities').val("");
    instance.$('#detaileddescription').val("");
    instance.$('#roommatedescription').val("");
    instance.$('#price/month').val("");
    instance.$('#contact-information').val("");
    var rentpost =
    { location:location,
      street:street,
      time:time,
      roomsize:roomsize,
      facilities:facilities,
      detailed:detailed,
      roommate:roommate,
      price:price,
      contact:contact,
      createdAt: new Date(),
      owner: Meteor.userId()
    };

    Meteor.call('rent.insert',rentpost,
        (err, res) => {
          if (err) {
            alert("Failed to add your rental post");
          } else {
            alert("Successfully added your rental post");
          }
        }
    );
  },
  'click #addrentalrec': function(elt,instance){
    var recognition;
    var accessToken = "1b1610a6d61d46959c56b8d0bf607881";
    var baseUrl = "https://api.api.ai/v1/";
    switchRecognition();
    function switchRecognition() {
      if (recognition) {
        stopRecognition();
      } else {
        startRecognition();
      }
    }
    function startRecognition() {
      recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.onstart = function(event) {
        updateRec();
      };
      recognition.onresult = function(event) {
        var text = "";
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
            if(event.results[i][0].transcript.includes('stop')){
              console.log("stop recording");
              instance.$('#location').val("")==null;
              instance.$('#street-address').val("");
              instance.$('#time').val("");
              instance.$('#roomsize').val("");
              instance.$('#facilities').val("");
              instance.$('#detaileddescription').val("");
              instance.$('#roommatedescription').val("");
              instance.$('#price/month').val("");
              instance.$('#contact-information').val("");

              console.log("hihihi");
              recognition.stop();
              stopRecognition();
              instance.$("#usersay").val("");
            }else if(event.results[i][0].transcript.includes('submit')){
              console.log("user want to submit");
              const location = instance.$('#location :selected').val();
              const street = instance.$('#street-address').val();
              const time = instance.$('#time').val();
              const roomsize = instance.$('#roomsize').val();
              const facilities = instance.$('#facilities').val();
              const detailed = instance.$('#detaileddescription').val();
              const roommate = instance.$('#roommatedescription').val();
              const price = instance.$('#price/month').val();
              const contact = instance.$('#contact-information').val();
              var rentpost =
              { location:location,
                street:street,
                time:time,
                roomsize:roomsize,
                facilities:facilities,
                detailed:detailed,
                roommate:roommate,
                price:price,
                contact:contact,
                createdAt: new Date(),
                owner: Meteor.userId()
              };

              Meteor.call('rent.insert',rentpost,
                  (err, res) => {
                    if (err) {
                      alert("Failed to add your rental post");
                    } else {
                      alert("Successfully added your rental post");
                    }
                  }
              );
              console.log("print fields");
              console.log(location);
              console.log(street);
              console.log(time);
              console.log(roomsize);
              console.log(facilities);
              console.log(detailed);
              console.log(roommate);
              console.log(price);
              console.log(contact);

              console.log("insert");
              instance.$('#location').val("")==null;
              instance.$('#street-address').val("");
              instance.$('#time').val("");
              instance.$('#roomsize').val("");
              instance.$('#facilities').val("");
              instance.$('#detaileddescription').val("");
              instance.$('#roommatedescription').val("");
              instance.$('#price/month').val("");
              instance.$('#contact-information').val("");
              console.log("you submit we stop");
              recognition.stop();
              stopRecognition();
              instance.$("#usersay").val("");
            } else if((instance.$('#location').val()!="")&&(instance.$('#contact-information').val()!="")&&(instance.$('#price/month').val()!="")&&(instance.$('#roommatedescription').val()!="")&&(instance.$('#facilities').val()!="")
            &&(instance.$('#detaileddescription').val()!="")&&(instance.$('#street-address').val()!="")&&(instance.$('#time').val()!="")&&(instance.$('#roomsize').val()!="")){
              console.log("user has filled all the fields")
              const location = instance.$('#location :selected').val();
              const street = instance.$('#street-address').val();
              const time = instance.$('#time').val();
              const roomsize = instance.$('#roomsize').val();
              const facilities = instance.$('#facilities').val();
              const detailed = instance.$('#detaileddescription').val();
              const roommate = instance.$('#roommatedescription').val();
              const price = instance.$('#price/month').val();
              const contact = instance.$('#contact-information').val();
              var rentpost =
              { location:location,
                street:street,
                time:time,
                roomsize:roomsize,
                facilities:facilities,
                detailed:detailed,
                roommate:roommate,
                price:price,
                contact:contact,
                createdAt: new Date(),
                owner: Meteor.userId()
              };

              Meteor.call('rent.insert',rentpost,
                  (err, res) => {
                    if (err) {
                      alert("Failed to add your rental post");
                    } else {
                      alert("Successfully added your rental post");
                    }
                  }
              );
              console.log("qqq");

              console.log("print fields");
              console.log(location);
              console.log(street);
              console.log(time);
              console.log(roomsize);
              console.log(facilities);
              console.log(detailed);
              console.log(roommate);
              console.log(price);
              console.log(contact);

              console.log("aaa");
              recognition.stop();
              instance.$('#location').val("")==null;
              instance.$('#street-address').val("");
              instance.$('#time').val("");
              instance.$('#roomsize').val("");
              instance.$('#facilities').val("");
              instance.$('#detaileddescription').val("");
              instance.$('#roommatedescription').val("");
              instance.$('#price/month').val("");
              instance.$('#contact-information').val("");
              console.log("mmm");
              stopRecognition();
              console.log("rrr");
            }
          }
          setInput(text);
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
        instance.$('#itemname').val("");
        instance.$('#price').val("");
        instance.$('#condition').val("");
        instance.$('#category').val("");
        instance.$('#description').val("");
      }
      updateRec();
    }

    function setInput(text) {
      $("#userrental").val(text);
      send();
    }
    function updateRec() {
      $("#addrentalrec").text(recognition ? "Stop" : "Speak");
    }

    function send() {
      var text = $("#usersay").val();
      $.ajax({
        type: "POST",
        url: baseUrl + "query?v=20150910",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({ query: text, lang: "en", sessionId: "66666666" }),
        success: function(data) {
          setResponse(JSON.stringify(data, undefined, 2));
          var substring1="stop";
          var substring2="submit";
          if(text.includes(substring1)||text.includes(substring2)){
            console.log("into stop or submit condition");
          }else{
          console.log("---");
          console.log(data);
          console.log($("#location").val());
          var isAdded=false;
          if(instance.$("#location").val()==null){
            console.log("into location");
            console.log(instance.$("#location").val());
            console.log(data.result.parameters.location);
            if(data.result.parameters.location!=""){
              console.log(data.result.parameters.location);
              $("#location").val(data.result.parameters.location).trigger("change");
              console.log(instance.$("#location").val());
              responsiveVoice.speak("city added");
              responsiveVoice.speak("What is the street address of this rent?","UK English Female");
            }else if(data.result.parameters.location==""){
              if(data.result.parameters.location==""&&instance.$("#location").val()==null){
                instance.$("#location").val("Please say the city of this rent");
                responsiveVoice.speak("What is the city of this rent? The category you can choose are waltham, watertown, boston, cambridge, newton, brookline, somerville and malden","UK English Female",{rate:0.9});
                console.log("enter first condition for location!!!");
              }else if(data.result.parameters.location==""&&instance.$("#category").val()!=""){
                console.log("enter second rent condition!!!!");
                instance.$("#category").val(text);
                responsiveVoice.speak("city added");
                responsiveVoice.speak("What is the street address of this rent?","UK English Female");
              }
              return;
            }
          }

          console.log(instance.$("#street-address").val());
          if(instance.$("#street-address").val()==""||instance.$("#street-address").val()=="Please say the room size now"){
            console.log("into street-address");
            if(data.result.parameters.Price!=""){
              console.log("existed street-address");
              $("#street-address").val(data.result.parameters.streetaddress);
              responsiveVoice.speak("street-address added");
              responsiveVoice.speak("What is the room size?","UK English Female");
            }else if(data.result.parameters.Price==""){
                  console.log(data.result.parameters.streetaddress=="");
                  console.log(instance.$("#street-address").val()=="");
                if(data.result.parameters.Price==""&&instance.$("#street-address").val()==""){
                  console.log("enter first condition");
                  console.log("user said "+text);
                  instance.$("#street-address").val("Please say the room size now");
                }else if(data.result.parameters.streetaddress==""&&instance.$("#street-address").val()!=""){
                console.log("enter second condition");
                instance.$("#street-address").val(text);
                responsiveVoice.speak("street-address added");
                responsiveVoice.speak("What is the facilities of this rent?","UK English Female");
                }
              return;
            }
          }


          console.log(instance.$("#facilities").val());
          if(instance.$("#facilities").val()==""||instance.$("#facilities").val()=="Please say the facilities now"){
            console.log("into facilities");
            if(data.result.parameters.facilities!=""){
              $("#facilities").val(data.result.parameters.facilities);
              responsiveVoice.speak("facilities added");
              responsiveVoice.speak("What is the detailed description of this rent","UK English Female",{rate:0.9});
            }else if(data.result.parameters.facilities==""){
              if(data.result.parameters.facilities==""&&instance.$("#facilities").val()==""){
                console.log("enter first facilities condition!!!");
                instance.$("#facilities").val("Please say the facilities now");
              }else if(data.result.parameters.Name==""&&instance.$("#facilities").val()!=""){
                console.log("enter second facilities condition!!!!");
                instance.$("#facilities").val(text);
                responsiveVoice.speak("facilities added");
                responsiveVoice.speak("What is the detailed description of this rent","UK English Female",{rate:0.9});
              }
              return;
            }
          }
          console.log($("#condition").val());
          if(instance.$("#condition").val()==null){
            console.log("into condition");
            if(data.result.parameters.Quality!=""){
              $("#condition").val(data.result.parameters.Quality).trigger("change");
              responsiveVoice.speak("Condition added","UK English Female");
              responsiveVoice.speak("Please add some detailed description to this product","UK English Female");
              return;
            }else if(data.result.parameters.Quality==""){
              if(data.result.parameters.Quality==""&&instance.$("#condition").val()==""){
                console.log("enter first quality condition!!!");

              }else if(data.result.parameters.Name==""&&instance.$("#condition").val()!=""){
                console.log("enter second quality condition!!!!");
                instance.$("#condition").val(text);
                responsiveVoice.speak("Condition added");
                responsiveVoice.speak("Please add some detailed description to this product","UK English Female");
              }
              return;
            }
          }
          console.log($("#description").val());
          if(instance.$("#description").val()==""){
            console.log("into description");
            console.log(data.result.parameters);
            console.log("description: "+data.result.parameters.Detaildescription);
            instance.$("#description").val(text);
            return;
            }
          }},
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
  'keypress #userrental' (elt,instance){
    if (event.which == 13) {
      event.preventDefault();
      send();
    }
    function send() {
      var text = $("#userrental").val();
      $.ajax({
        type: "POST",
        url: baseUrl + "query?v=20150910",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({ query: text, lang: "en", sessionId: "66666666" }),
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


Template.addrent.helpers({
  locationdata(){
    return location;
  },
})
Template.ownpostrow.helpers({
  isOwner(){
    console.dir(this);
    console.log(this);
    return this.rent.owner==Meteor.userId();
  },
  locationdata(){
    return location;
  },
})

Template.ownpostrow.events({
  'click #deleteRent':function(elt,instance){
    Meteor.call('rent.remove',this.rent);
  },
  'click #updateRent':function(elt,instance){
    const rent_id = this.rent._id;
    const newLocation=instance.$("#newlocation :selected").val();
    const newStreet=instance.$("#newstreet").val();
    const newTime=instance.$("#newtime").val();
    const newRoomSize=instance.$("#newsize").val();
    const newFacilities=instance.$("#newfacilities").val();
    const newDetail=instance.$("#newdetail").val();
    const newRoommate=instance.$("#newroommate").val();
    const newPrice=instance.$("#newprice").val();
    const newContact=instance.$("#newcontact").val();
    var newRent={
      location:newLocation,
      street:newStreet,
      time:newTime,
      roomsize:newRoomSize,
      facilities:newFacilities,
      detail:newDetail,
      roommate:newRoommate,
      price:newPrice,
      contact:newContact,
    }
    Meteor.call('rent.update',rent_id,newRent);
  }
})


Template.showOwnPost.helpers({
  rentlist() {return Rent.find()},
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
