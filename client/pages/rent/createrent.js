Template.addrent.onCreated(function(){
  this.pic_status = new ReactiveVar([]);
})

Template.addrent.onRendered(function(){
  $("#location").val("");
})


Template.addrent.events({
  'click #submitrent':function (elt,instance){
    elt.preventDefault();
    const location = instance.$('#location :selected').val();
    const street = instance.$('#streetaddress').val();
    const startdate = instance.$('#createdatestart :selected').val();
    console.log("startdate" + startdate);
    const startmonth = instance.$('#timestart :selected').val();
    console.log("startmonth" + startmonth);
    const startyear = instance.$('#monthstartyear').val();
    console.log("startyear" + startyear);
    const enddate = instance.$('#createdateend :selected').val();
    const endmonth = instance.$('#timeend :selected').val();
    const endyear = instance.$('#monthendyear').val();
    const roomsize = instance.$('#roomsize').val();
    const facilities = instance.$('#facilities').val();
    const detailed = instance.$('#detaileddescription').val();
    const roommate = instance.$('#roommatedescription').val();
    const price = instance.$('#priceM').val();
    const contact = instance.$('#contactinformation').val();
    const pic1=instance.$('#rentalpic1')[0].files[0];
    const pic2=instance.$('#rentalpic2')[0].files[0];
    const pic3=instance.$('#rentalpic3')[0].files[0];
    const pic_status = Template.instance().pic_status;
    console.log("adding " + location);
    var rentpost =
    { location:location,
      street:street,
      startdate:startdate,
      startmonth:startmonth,
      startyear:startyear,
      enddate:enddate,
      endmonth:endmonth,
      endyear:endyear,
      roomsize:roomsize,
      facilities:facilities,
      detailed:detailed,
      roommate:roommate,
      price:price,
      contact:contact,
      createdAt: new Date(),
      owner: Meteor.userId()
    };

    const template = Template.instance();
    for(var i=1; i<=3; i++){
      if($('#rentalpic'+i).val()){
        if($('#rentalpic'+i)[0].files&&$('#rentalpic'+i)[0].files[0] && ($('#rentalpic'+i)[0].files[0].type).match(/(jpg|png|jpeg|gif)$/)){
          if($('#rentalpic'+i)[0].files[0].size>1048576){
            alert('The file size should be smaller than 1MB');
          }else{
            var imagefile=$('#rentalpic'+i)[0].files[0];
            (function(i){
              var reader=new FileReader();
              reader.onload=function(){
                var dataURL = reader.result;
                imageBase64Form=dataURL.split(',')[1];
                rentpost["pic"+i]=imageBase64Form;
                const current_status = template.pic_status.get();
                current_status[i] = "done";
                template.pic_status.set(current_status);
              };

              reader.readAsDataURL(imagefile);
            })(i);

          };
        }else{
          $("#showrentalpic"+i).attr("src","");
          $("#showrentalpic"+i).css("display","none");
          alert("Please add a image file"+i);
        }
      } else {
        const current_status = template.pic_status.get();
        current_status[i] = "done";
        template.pic_status.set(current_status);
      }
    }

    Tracker.autorun((computation)=>{
      if(pic_status.get()[1] && pic_status.get()[2] && pic_status.get()[3]){
        Meteor.call('rent.insert',rentpost,
            (err, res) => {
              if (err) {
                alert("Failed to add your rental post");
              } else {
                alert("Successfully added your rental post");
              }
            }
        );
        computation.stop();
      }
    })
    $('#rentalpic1').val("");
    $('#rentalpic2').val("");
    $('#rentalpic3').val("");
    $('#showrentalpic1').css("display","none");
    $('#showrentalpic2').css("display","none");
    $('#showrentalpic3').css("display","none");
  },
  'change #rentalpic1':function(event){
    //if the pic has input
    if($("#rentalpic1").val()){
      //if the input array is not empty, if the first element in the input array is not empty, check the input type is pics
      if(event.currentTarget.files&&event.currentTarget.files[0]&&event.currentTarget.files[0].type.match(/(jpg|png|jpeg|gif)$/)){
        if(event.currentTarget.files[0].size>1048576){//file size out of range
          alert('The file size should be smaller than 1MB');
        }else{
          //an object to read file
          var picreader = new FileReader();
          //when loading the input file
          picreader.onload = function(event){
            var result=event.currentTarget.result;
            $('#showrentalpic1').attr('src',result);
            $('#showrentalpic1').css('display','block');
          }
          picreader.readAsDataURL(event.currentTarget.files[0]);
        }
      }else{//not a image file
        alert('You are only allowed to upload an image file');
      }
    }else{
      $("#showrentalpic1").attr("src","");
      $("#showrentalpic1").css("display","none");
    }
  },
  'change #rentalpic2':function(event){
    if($("#rentalpic2").val()){
      //if the input array is not empty, if the first element in the input array is not empty, check the input type is pics
      if(event.currentTarget.files&&event.currentTarget.files[0]&&event.currentTarget.files[0].type.match(/(jpg|png|jpeg|gif)$/)){
        if(event.currentTarget.files[0].size>1048576){//file size out of range
          alert('The file size should be smaller than 1MB');
        }else{
          //an object to read file
          var picreader = new FileReader();
          //when loading the input file
          picreader.onload = function(event){
            var result=event.currentTarget.result;
            $('#showrentalpic2').attr('src',result);
            $('#showrentalpic2').css('display','block');
          }
          picreader.readAsDataURL(event.currentTarget.files[0]);
        }
      }else{//not a image file
        alert('You are only allowed to upload an image file');
      }
    }else{
      $("#showrentalpic2").attr("src","");
      $("#showrentalpic2").css("display","none");
    }
  },
  'change #rentalpic3':function(event){
    if($("#rentalpic3").val()){
      //if the input array is not empty, if the first element in the input array is not empty, check the input type is pics
      if(event.currentTarget.files&&event.currentTarget.files[0]&&event.currentTarget.files[0].type.match(/(jpg|png|jpeg|gif)$/)){
        if(event.currentTarget.files[0].size>1048576){//file size out of range
          alert('The file size should be smaller than 1MB');
        }else{
          //an object to read file
          var picreader = new FileReader();
          //when loading the input file
          picreader.onload = function(event){
            var result=event.currentTarget.result;
            $('#showrentalpic3').attr('src',result);
            $('#showrentalpic3').css('display','block');
          }
          picreader.readAsDataURL(event.currentTarget.files[0]);
        }
      }else{//not a image file
        alert('You are only allowed to upload an image file');
      }
    }else{
      $("#showrentalpic3").attr("src","");
      $("#showrentalpic3").css("display","none");
    }
  },
  'click #addrentalrec': function(elt,instance){
    var recognition;
    var checkingtime=0;
    var acity=false;
    var astreet=false;
    var afacilities=false;
    var adetail=false;
    var aroommate=false;
    var aprice=false;
    var acontact=false;
    var adate=false;
    var asize=false;
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
        checkingtime++;
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
            if(event.results[i][0].transcript.includes('stop')){
              console.log("stop recording");
              instance.$('#location').val("")==null;
              instance.$('#streetaddress').val("");
              instance.$('#time').val("");
              instance.$('#roomsize').val("");
              instance.$('#facilities').val("");
              instance.$('#detaileddescription').val("");
              instance.$('#roommatedescription').val("");
              instance.$('#priceM').val("");
              instance.$('#contactinformation').val("");

              console.log("user want stop");
              recognition.stop();
              stopRecognition();
              instance.$("#usersay").val("");
            }else if(event.results[i][0].transcript.includes('submit')){
              console.log("user want to submit");
              const location = instance.$('#location :selected').val();
              const street = instance.$('#streetaddress').val();
              const time = instance.$('#time').val();
              const roomsize = instance.$('#roomsize').val();
              const facilities = instance.$('#facilities').val();
              const detailed = instance.$('#detaileddescription').val();
              const roommate = instance.$('#roommatedescription').val();
              const price = instance.$('#priceM').val();
              const contact = instance.$('#contactinformation').val();
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

              console.log("insert");
              instance.$('#location').val("")==null;
              instance.$('#streetaddress').val("");
              instance.$('#time').val("");
              instance.$('#roomsize').val("");
              instance.$('#facilities').val("");
              instance.$('#detaileddescription').val("");
              instance.$('#roommatedescription').val("");
              instance.$('#priceM').val("");
              instance.$('#contactinformation').val("");
              console.log("you submit we stop");
              recognition.stop();
              stopRecognition();
              instance.$("#usersay").val("");
            } else if((instance.$('#location').val()!="")&&(instance.$('#contactinformation').val()!="")&&(instance.$('#priceM').val()!="")&&(instance.$('#roommatedescription').val()!="")&&(instance.$('#facilities').val()!="")
            &&(instance.$('#detaileddescription').val()!="")&&(instance.$('#streetaddress').val()!="")&&(instance.$('#time').val()!="")&&(instance.$('#roomsize').val()!="")){
              console.log("user has filled all the fields")
              const location = instance.$('#location :selected').val();
              const street = instance.$('#streetaddress').val();
              const time = instance.$('#time').val();
              const roomsize = instance.$('#roomsize').val();
              const facilities = instance.$('#facilities').val();
              const detailed = instance.$('#detaileddescription').val();
              const roommate = instance.$('#roommatedescription').val();
              const price = instance.$('#priceM').val();
              const contact = instance.$('#contactinformation').val();
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

              console.log("aaa");
              recognition.stop();
              instance.$('#location').val("")==null;
              instance.$('#streetaddress').val("");
              instance.$('#time').val("");
              instance.$('#roomsize').val("");
              instance.$('#facilities').val("");
              instance.$('#detaileddescription').val("");
              instance.$('#roommatedescription').val("");
              instance.$('#priceM').val("");
              instance.$('#contactinformation').val("");
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
        checkingtime = 0;
        instance.$('#location').val("")==null;
        instance.$('#streetaddress').val("");
        instance.$('#time').val("");
        instance.$('#roomsize').val("");
        instance.$('#facilities').val("");
        instance.$('#detaileddescription').val("");
        instance.$('#roommatedescription').val("");
        instance.$('#priceM').val("");
        instance.$('#contactinformation').val("");
      }
      updateRec();
    }

    function setInput(text) {
      $("#userrental").val(text);
      send(checkingtime,acity,astreet,afacilities,adetail,aroommate,aprice,acontact,adate,asize);
    }
    function updateRec() {
      $("#addrentalrec").text(recognition ? "Stop" : "Speak");
    }

    function send(checkingtime,acity,astreet,afacilities,adetail,aroommate,aprice,acontact,adate,asize) {
      var text = $("#userrental").val();
      console.log(checkingtime);
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
          console.log(checkingtime);
          console.log("---");
          console.log(data);
          console.log($("#location").val());
          var isAdded=false;
          if(checkingtime==1&&data.result.metadata.intentName!="RentalPost"){
            checkingtime=0;
            responsiveVoice.speak("Sorry I don't understand, please say that again");
          }else{
            if($("#location").val()==null&&acity==false){
              console.log("into location");
              console.log(instance.$("#location").val());
              console.log(data.result.parameters.location);
              if(data.result.parameters.location!=""){
                console.log(data.result.parameters.location);
                $("#location").val(data.result.parameters.location).trigger("change");
                acity=true;
                console.log(instance.$("#location").val());
                responsiveVoice.speak("city added");
                if(data.result.parameters.streetaddress==""){
                  responsiveVoice.speak("What is the street address of this rent?","UK English Female");
                }
              }else if(data.result.parameters.location==""){
                if(data.result.parameters.location==""&&instance.$("#location").val()==null){
                  instance.$("#location").val("Please say the city of this rent");
                  responsiveVoice.speak("What is the city of this rent? The city you can choose are waltham, watertown, boston, cambridge, newton, brookline, somerville and malden","UK English Female",{rate:0.9});
                  console.log("enter first condition for location!!!");
                }else if(data.result.parameters.location==""&&instance.$("#location").val()!=null){
                  console.log("enter second rent condition!!!!");
                  $("#location").val(text).trigger("change");
                  acity=true;
                  responsiveVoice.speak("city added");
                  responsiveVoice.speak("What is the street address of this rent?","UK English Female");
                }
                return;
              }
            }


            if($("#streetaddress").val()==""&&astreet==false||$("#streetaddress").val()=="Please say the street address now"&&astreet==false){
              console.log("into streetaddress");
              if(data.result.parameters.streetaddress!=""){
                console.log("existed streetaddress");
                $("#streetaddress").val(data.result.parameters.streetaddress);
                astreet=true;
                responsiveVoice.speak("streetaddress added");
                responsiveVoice.speak("What is the facilities of this rent?","UK English Female");
              }else if(data.result.parameters.streetaddress==""){
                    console.log(data.result.parameters.streetaddress=="");
                    console.log($("#streetaddress").val());
                  if(data.result.parameters.streetaddress==""&&$("#streetaddress").val()==""){
                    console.log("enter first condition");
                    console.log("user said "+text);
                    $("#streetaddress").val("Please say the street address now");
                  }else if(data.result.parameters.streetaddress==""&&$("#streetaddress").val()!=""){
                  console.log("enter second condition");
                  $("#streetaddress").val(text);
                  astreet=true;
                  responsiveVoice.speak("streetaddress added");
                  responsiveVoice.speak("What is the facilities of this rent?","UK English Female");
                  }
                return;
              }
            }


            console.log($("#facilities").val());
            if($("#facilities").val()==""&&afacilities==false||$("#facilities").val()=="Please say the facilities now"&&afacilities==false){
              console.log("into facilities");
              if(data.result.parameters.facilities!=""){
                $("#facilities").val(data.result.parameters.facilities);
                afacilities=true;
                responsiveVoice.speak("facilities added");
                responsiveVoice.speak("What is the detailed description of this rent","UK English Female",{rate:0.9});
              }else if(data.result.parameters.facilities==""){
                if(data.result.parameters.facilities==""&&$("#facilities").val()==""){
                  console.log("enter first facilities condition!!!");
                  $("#facilities").val("Please say the facilities now");
                }else if(data.result.parameters.facilities==""&&$("#facilities").val()!=""){
                  console.log("enter second facilities condition!!!!");
                  $("#facilities").val(text);
                  afacilities=true;
                  responsiveVoice.speak("facilities added");
                  responsiveVoice.speak("What is the detailed description of this rent","UK English Female",{rate:0.9});
                }
                return;
              }
            }

            console.log($("#detaileddescription").val());
            if($("#detaileddescription").val()==""&&adetail==false||adetail==false&&$("#detaileddescription").val()=="Please say detailed description now"){
              console.log("into detailed description");
              if(data.result.parameters.detaileddescription!=""){
                $("#detaileddescription").val(data.result.parameters.detaileddescription);
                adetail=true;
                responsiveVoice.speak("detailed description added","UK English Female");
                responsiveVoice.speak("Please add some roommate description to this rent","UK English Female");
                return;
              }else if(data.result.parameters.detaileddescription==""){
                if(data.result.parameters.detaileddescription==""&&$("#detaileddescription").val()==""){
                  console.log("enter first detail description condition!!!");
                  // $("#detaileddescription").val("Please say detailed description now");
                  $("#detaileddescription").val(text);
                  adetail=true;
                  responsiveVoice.speak("detaileddescription added");
                  responsiveVoice.speak("Please add some roommate description to this rent","UK English Female");
                }
                // else if(data.result.parameters.detaileddescription==""&&instance.$("#detaileddescription").val()!=""){
                //   console.log("enter second detail description condition!!!!");
                //   instance.$("#detaileddescription").val(text);
                //   responsiveVoice.speak("detaileddescription added");
                //   responsiveVoice.speak("Please add some roommate description to this rent","UK English Female");
                // }
                return;
              }
            }

            console.log($("#roommatedescription").val());
            if($("#roommatedescription").val()==""&&aroommate==false){
              console.log("into roommate description");
              if(data.result.parameters.roommates!=""){
                $("#roommatedescription").val(data.result.parameters.roommates);
                aroommate=true;
                responsiveVoice.speak("roommate description added","UK English Female");
                responsiveVoice.speak("Please add the price of this rent","UK English Female");
                return;
              }else if(data.result.parameters.roommates==""){
                if(data.result.parameters.roommates==""&&$("#roommatedescription").val()==""){
                  console.log("enter first roommatedescription condition!!!");
                  $("#roommatedescription").val(text);
                  aroommate=true;
              //}else if(data.result.parameters.roommates==""&&instance.$("#roommatedescription").val()!=""){
                //console.log("enter second roommatedescription condition!!!!");
                //instance.$("#roommatedescription").val(text);
                  responsiveVoice.speak("roommatedescription added");
                  responsiveVoice.speak("Please add the price to this rent","UK English Female");
                }
                return;
              }
            }

            console.log($("#priceM").val());
            if(instance.$("#priceM").val()==""&&aprice==false){
              console.log("into price");
              if(data.result.parameters.price!=""){
                console.log("existed price");
                $("#priceM").val(data.result.parameters.price);
                aprice=true;
                responsiveVoice.speak("price added","UK English Female");
                responsiveVoice.speak("Please add contact infomation of this rent","UK English Female");
                return;
              }else if(data.result.parameters.price==""){
                if(data.result.parameters.price==""&&instance.$("#priceM").val()==""){
                  console.log("enter first price condition!!!");
                //  instance.$("#price").val("Please say price now");
              //  }else if(data.result.parameters.price==""&&instance.$("#priceM").val()!=""){
                  //console.log("enter second price condition!!!!");
                  console.log(data.result.resolvedQuery)
                  $("#priceM").val(data.result.resolvedQuery);
                  aprice=true;
                  responsiveVoice.speak("price added");
                  responsiveVoice.speak("Please add the contact to this rent","UK English Female");
                }
                return;
              }
            }


            console.log($("#contactinformation").val());
            if(instance.$("#contactinformation").val()==""&&acontact==false){
              console.log("into contactinformation");
              if(data.result.parameters.contactinfo!=""){
                $("#contactinformation").val(data.result.parameters.contactinfo);
                acontact=true;
                responsiveVoice.speak("contact info added","UK English Female");
                responsiveVoice.speak("Please add the room size of this rent","UK English Female");
                return;
              }else if(data.result.parameters.contactinfo==""){
                if(data.result.parameters.contactinfo==""&&instance.$("#contactinformation").val()==""){
                  console.log("enter first contactinformation condition!!!");
                //  instance.$("#contactinformation").val("Please say your contact information now");
              //  }else if(data.result.parameters.contactinfo==""&&instance.$("#contactinformation").val()!=""){
                //  console.log("enter second contactinformation condition!!!!");
                  $("#contactinformation").val(text);
                  acontact=true;
                  responsiveVoice.speak("contactinformation added");
                  responsiveVoice.speak("Please add the room size to this rent","UK English Female");
                }
                return;
              }
            }

            console.log($("#roomsize").val());
            if($("#roomsize").val()==""&&asize==false){
              console.log("into roomsize");
              if(data.result.parameters.roomsize!=""){
                $("#roomsize").val(data.result.parameters.roomsize);
                asize=true;
                responsiveVoice.speak("roomsize added","UK English Female");
                responsiveVoice.speak("Please add availabletime to this rent","UK English Female");
                return;
              }else if(data.result.parameters.roomsize==""){
                if(data.result.parameters.roomsize==""&&$("#roomsize").val()==""){
                  console.log("enter first roomsize condition!!!");
                  $("#roomsize").val(text);
                  asize=true;
                  responsiveVoice.speak("roomsize added");
                  responsiveVoice.speak("Please add availabletime to this rent","UK English Female");
                }
                /*else if(data.result.parameters.detaileddescription==""&&instance.$("#detaileddescription").val()!=""){
                  console.log("enter second detail description condition!!!!");
                  instance.$("#detaileddescription").val(text);
                  responsiveVoice.speak("detaileddescription added");
                  responsiveVoice.speak("Please add some roommate description to this rent","UK English Female");
                }*/
                return;
              }
            }

            console.log($("#time").val());
            if(instance.$("#time").val()==""){
              console.log("into time");
              if(data.result.parameters.availabletime!=""){
                instance.$("#time").val(data.result.parameters.availabletime);
                responsiveVoice.speak("availabletime added","UK English Female");
              //  responsiveVoice.speak("Please add the available time of this rent","UK English Female");
                return;
              }else if(data.result.parameters.availabletime==""){
                if(data.result.parameters.availabletime==""&&instance.$("#time").val()==""){
                  console.log("enter first contactinformation condition!!!");
                //  instance.$("#contactinformation").val("Please say your contact information now");
              //  }else if(data.result.parameters.contactinfo==""&&instance.$("#contactinformation").val()!=""){
                //  console.log("enter second contactinformation condition!!!!");
                  instance.$("#contactinformation").val(text);
                  responsiveVoice.speak("availabletime added");
                //  responsiveVoice.speak("Please add the available time to this rent","UK English Female");
                }
                return;
              }
            }

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

Template.ownpostrow.onCreated(function(){
  this.pic_status = new ReactiveVar([]);
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
  hasPic1(rent){
    if(rent.pic1!=undefined){
      return true;
    }else{
      return false;
    }
  },
  hasPic2(rent){
    if(rent.pic2!=undefined){
      return true;
    }else{
      return false;
    }
  },
  hasPic3(rent){
    if(rent.pic3!=undefined){
      return true;
    }else{
      return false;
    }
  }
})

Template.ownpostrow.events({
  'click #deleteRent':function(elt,instance){
    Meteor.call('rent.remove',this.rent);
  },
  'change .newrentalpic':function(event,instance){
    console.log(event);
    console.dir(event);
    const rentid=this.rent._id;
    const picid=event.currentTarget.id;
      if($("#"+picid).val()){
        if(event.currentTarget.files&&event.currentTarget.files[0]&&event.currentTarget.files[0].type.match(/(jpg|png|jpeg|gif)$/)){
          if(event.currentTarget.files[0].size>1048576){
            alert('The file size should be smaller than 1MB');
          }else{
            var str=picid;
            var substr1=str.split("newrentalpic")[1];
            var num=substr1.split("_"+rentid)[0];
            console.log(num)
            $('#oldrentalpic'+num+'_'+rentid).css('display','none');
            var picreader = new FileReader();
            picreader.onload = function(event){
              var result=event.currentTarget.result;
              // console.log(result);
              console.log("enter show pic1");
              $('#shownewrentalpic'+num+'_'+rentid).attr('src',result);
              $('#shownewrentalpic'+num+'_'+rentid).css('display','block');
            }
            picreader.readAsDataURL(event.currentTarget.files[0]);
          }
        }else{
          alert('You are only allowed to upload an image file');
        }
      }else{
        $("#shownewrentalpic"+num+"_"+rentid).attr("src","");
        $("#shownewrentalpic"+num+"_"+rentid).css("display","none");
      }

  },
  'click #updateRent':function(elt,instance){
    event.preventDefault();
    const rentid = this.rent._id;
    const newLocation=instance.$("#newlocation_"+rentid+" :selected").val();
    const newStreet=instance.$("#newstreet_"+rentid).val();
    const newTime=instance.$("#newtime_"+rentid).val();
    const newRoomSize=instance.$("#newsize_"+rentid).val();
    const newFacilities=instance.$("#newfacilities_"+rentid).val();
    const newDetail=instance.$("#newdetail_"+rentid).val();
    const newRoommate=instance.$("#newroommate_"+rentid).val();
    const newPrice=instance.$("#newprice_"+rentid).val();
    const newContact=instance.$("#newcontact_"+rentid).val();
    const pic1=instance.$('#newrentalpic1_'+rentid)[0].files[0];
    const pic2=instance.$('#newrentalpic2_'+rentid)[0].files[0];
    const pic3=instance.$('#newrentalpic3_'+rentid)[0].files[0];
    const pic_status=Template.instance().pic_status;

    var newRent={
      location:newLocation,
      street:newStreet,
      time:newTime,
      roomsize:newRoomSize,
      facilities:newFacilities,
      detailed:newDetail,
      roommate:newRoommate,
      price:newPrice,
      contact:newContact,
    }
    const template=Template.instance();
    for(var i=1;i<=3;i++){
      if($('#newrentalpic'+i+"_"+rentid).val()){
        if(($('#newrentalpic'+i+"_"+rentid)[0].files&&$('#newrentalpic'+i+"_"+rentid)[0].files[0]) && ($('#newrentalpic'+i+"_"+rentid)[0].files[0].type).match(/(jpg|png|jpeg|gif)$/)){
          if(instance.$('#newrentalpic'+i+"_"+rentid)[0].files[0].size>1048576){
            alert('The file size should be smaller than 1MB');
            return;
          }else{
            var imagefile=$('#newrentalpic'+i+"_"+rentid)[0].files[0];
              (function(i, imagefile){
                var reader=new FileReader();
                reader.onload=function(){
                var dataURL = reader.result;
                imageBase64Form=dataURL.split(',')[1];
                newRent["pic"+i]=imageBase64Form;
                const now=template.pic_status.get();
                now[i]="finished";
                template.pic_status.set(now);
              };
              reader.readAsDataURL(imagefile);
              instance.$('#newrentalpic'+i+"_"+rentid).val("");
              $('#shownewrentalpic'+i+'_'+rentid).css('display','none');
              $('#oldrentalpic'+i+'_'+rentid).css('display','block');
          })(i, imagefile);
          }
        }else{
          instance.$("#shownewrentalpic"+i+"_"+rentid).attr("src","");
          instance.$("#shownewrentalpic"+i+"_"+rentid).css("display","none");
          alert("Please add a image file");
          return;
        }
    }else{
      const now=template.pic_status.get();
      now[i]="finished";
      template.pic_status.set(now);
    }
  }
  Tracker.autorun((computation)=>{
    if(pic_status.get()[1] && pic_status.get()[2] && pic_status.get()[3]){
      Meteor.call('rent.update',rentid,newRent, function(err){
        if(err){
          window.alert(err);
          return;
        }
        pic_status.set([]);
        computation.stop();
      });
    }
  })
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
