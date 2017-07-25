Template.forum.helpers({
  requests(){
    return Forum.find();
  },
  isOwner(post){
    if(post.owner==Meteor.userId()){
      return true;
    }else{
      return false;
    }
  }
})

Template.showownpost.events({
  'click #updateforum':function(elt,instance){
    const postid=this.p._id;
    const posttext=instance.$("#editforumpost").val();
    const postowner=this.p.name;
    const now=new Date();
    var post={
      name:postowner,
      owner:Meteor.userId(),
      createdAt:now,
      text:posttext
    };
    Meteor.call("forumpost.update",postid,post);
    instance.$("#editforumpost").val("");
  },
  'click #deleteforum':function(elt,instance){
    Meteor.call("forum.remove",this.p);
  }
})


Template.makepost.events({
  "click #submitforum"(event, instance){
    var name = AllUsers.findOne({owner:Meteor.userId()}).username;
    var now = new Date();
    var text = instance.$("#forumpost").val();
    var post = {
      owner:Meteor.userId(),
      name:name,
      createdAt: now,
      text: text
    };
    console.log(post);
    Meteor.call('forum.insert',post);
    instance.$("#forumpost").val("");
  },

  'click #forumrec':function(elt,instance){
    console.log("enter click");
    var recognition;
    var accessToken = "1b1610a6d61d46959c56b8d0bf607881";
    var baseUrl = "https://api.api.ai/v1/";
    switchRecognition();
    function switchRecognition() {
      console.log("enter switch");
      if (recognition) {
        console.log("enter switch1");
        stopRecognition();
      } else {
        console.log("enter switch2");
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
        console.log(event);
        var text = "";
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
            // if(event.results[i][0].transcript==('stop')){
            //   console.log("stop recording");
            //   instance.$("#forumpost").val("");
            //   console.log("user says stop");
            //   recognition.stop();
            //   stopRecognition();
            // }else{
              var name = AllUsers.findOne({owner:Meteor.userId()}).username;
              var now = new Date();
              text = instance.$("#forumpost").val();
              var post = {
                owner:Meteor.userId(),
                name:name,
                createdAt: now,
                text: text
              };
              Meteor.call('forum.insert',post);
              console.log("autosubmit condition");
            // }
            setInput(text);
            // recognition.stop();
            stopRecognition();
            instance.$("#forumpost").val("");
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
          instance.$('#forumpost').val("");
        }
        updateRec();
      }

      function setInput(text) {
        $("#forumpost").val(text);
        send();
      }
      function updateRec() {
        $("#addforumrec").text(recognition ? "Stop" : "Speak");
      }

      var text = $("#forumpost").val();
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
          // if(text==(substring1)||text.includes(substring2)){
          //   console.log("into stop or submit condition");
          // }else{
          //
          // }
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



  'keypress #forumpost':function(elt,instance){
    if (event.which == 13) {
      event.preventDefault();
      send();
    }
    function send() {
      var text = $("#forumpost").val();
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
