import { Template } from 'meteor/templating';
 import { ReactiveVar } from 'meteor/reactive-var';

Template.addproduct.onCreated(function(){
  this.pic_status = new ReactiveVar([]);
})

 Template.ownerproduct.onCreated(function ownerproductOnCreated(){
   this.itemsold= new ReactiveVar(false);
 })
 // if(Meteor.isClient){
 //     Template.showproduct.onCreated(function(){
 //       Meteor.subscribe('product');
 //
 //     });
 //     Template.showproduct.onCreated(function(){
 //       Meteor.subscribe('allusers');
 //     })
 // }
 Template.createinfo.onRendered(function() {
   this.$('#category').dropdown({on: 'hover'});
   // other SUI modules initialization
   this.$('#condition').dropdown({on: 'hover'});
 });
Template.showproduct.helpers({
  productlist() {
    return Product.find()},
  isOwner(product){
    console.log(product.owner);
    return (product.owner == Meteor.userId())}
})
Template.addproduct.onRendered(function(){
  $("#condition").val("");
  $("#category").val("");
})

Template.addproduct.events({
  'change #productpic1':function(event){
    if($("#productpic1").val()){
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
            $('#showproductpic1').attr('src',result);
            $('#showproductpic1').css('display','block');
          }
          picreader.readAsDataURL(event.currentTarget.files[0]);
        }
      }else{//not a image file
        alert('You are only allowed to upload an image file');
      }
    }else{
      $("#showproductpic1").attr("src","");
      $("#showproductpic1").css("display","none");
    }
  },
  'change #productpic2':function(event){
    if($("#productpic2").val()){
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
            $('#showproductpic2').attr('src',result);
            $('#showproductpic2').css('display','block');
          }
          picreader.readAsDataURL(event.currentTarget.files[0]);
        }
      }else{//not a image file
        alert('You are only allowed to upload an image file');
      }
    }else{
      $("#showproductpic2").attr("src","");
      $("#showproductpic2").css("display","none");
    }
  },
  'change #productpic3':function(event){
    if($("#productpic3").val()){
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
            $('#showproductpic3').attr('src',result);
            $('#showproductpic3').css('display','block');
          }
          picreader.readAsDataURL(event.currentTarget.files[0]);
        }
      }else{//not a image file
        alert('You are only allowed to upload an image file');
      }
    }else{
      $("#showproductpic3").attr("src","");
      $("#showproductpic3").css("display","none");
    }
  },
  'click #addproduct':function(elt,instance){
    elt.preventDefault();
    const itemname = instance.$('#itemname').val();
    const delivery = instance.$('input[name="delivery"]:checked').val();
    const condition=instance.$('#condition :selected').val();
    const category=instance.$('#category :selected').val();
    const description= instance.$('#description').val();
    const price= instance.$('#price').val();
    var status=instance.$('#sold').val();
    const buyer=instance.$('#buyer').val();
    const pic1=instance.$("#productpic1")[0].files[0];
    const pic2=instance.$("#productpic2")[0].files[0];
    const pic3=instance.$("#productpic3")[0].files[0];
    const pic_status = Template.instance().pic_status;
    var productinfo =
    {
      itemname:itemname,
      delivery:delivery,
      price:price,
      condition:condition,
      category:category,
      description:description,
      createdAt:new Date(),
      buyer:buyer,
      owner:Meteor.userId()
    };
    const template=Template.instance();
    for(var i=0;i<=3;i++){
      if($('#productpic'+i).val()){
        if($('#productpic'+i)[0].files&&$('#productpic'+i)[0].files[0]&&($('#productpic'+i)[0].files[0].type).match(/(jpg|png|jpeg|gif)$/)){
          if($('#productpic'+i)[0].files[0].size>1048576){
            alert('The file size should ne smaller than 1 MB');
          }else{
            var imagefile=$('#productpic'+i)[0].files[0];
            (function(i){
                var reader=new FileReader();
                reader.onload=function(){
                  var dataURL=reader.result;
                  imageBase64Form=dataURL.split(',')[1];
                  productinfo["pic"+i]=imageBase64Form;
                  const current_status = template.pic_status.get();
                  current_status[i] = "finished";
                  template.pic_status.set(current_status);
                };
              reader.readAsDataURL(imagefile);
            })(i);
          };
        }else{
          $("#showproductpic"+i).attr("src","");
          $("#showproductpic"+i).css("display","none");
          alert("Please add a image file");
        }
      }else{
        const current_status = template.pic_status.get();
        current_status[i] = "finished";
        template.pic_status.set(current_status);
      }
      console.log(i);
    }

  Tracker.autorun((computation)=>{
    console.log(pic_status);
    if(pic_status.get()[1] && pic_status.get()[2] && pic_status.get()[3]){
      console.log(productinfo);
      Meteor.call('product.insert',productinfo,
        (err, res) => {
          if (err) {
            alert("Failed to add your item");
          } else {
            alert("Successfully added your item. You can view it by scrolling down the page.")
          }
        }
      );
      computation.stop();
    }
  })
  $('#productpic1').val("");
  $('#productpic2').val("");
  $('#productpic3').val("");
  $("#showproductpic1").css("display","none");
  $("#showproductpic2").css("display","none");
  $("#showproductpic3").css("display","none");
    instance.$('#itemname').val("");
    instance.$('#price').val("");
    instance.$('#condition').val("");
    instance.$('#category').val("");
    instance.$('#description').val("");
},
  'click #additemrec':function(elt,instance){
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
                $('#itemname').val("");
                $('#price').val("");
                $('#condition').val()==null;
                $('#category').val()==null;
                $('#description').val("");

                console.log("hihihi");
                recognition.stop();
                stopRecognition();
                instance.$("#usersay").val("");
              }else if(event.results[i][0].transcript.includes('submit')){
                console.log("user want to submit");
                const itemname = instance.$('#itemname').val();
                const condition=instance.$('#condition :selected').val();
                const category=instance.$('#category :selected').val();
                const description= instance.$('#description').val();
                const price= instance.$('#price').val();
                var status=instance.$('#sold').val();
                const buyer=instance.$('#buyer').val();
                console.log("getting fields");
                var productinfo =
                {
                  itemname:itemname,
                  price:price,
                  condition:condition,
                  category:category,
                  description:description,
                  createdAt:new Date(),
                  buyer:buyer,
                  owner:Meteor.userId()
                }
                console.log("print fields");
                console.log(itemname);
                console.log(price);
                console.log(category);
                console.log(description);
                console.log(condition);
                console.log("insert");
                console.log('adding'+itemname);
                instance.$('#itemname').val("");
                instance.$('#price').val("");
                instance.$('#condition').val("");
                instance.$('#category').val("");
                instance.$('#description').val("");
                Meteor.call('product.insert',productinfo);

                console.log("you stop we stop");
                recognition.stop();
                stopRecognition();
                instance.$("#usersay").val("");
              } else if(($('#itemname').val()!="")&&($('#price').val()!="")&&($('#condition').val()!="")&&($('#category').val()!="")&&($('#description').val()!="Please say description now")&&($('#description').val()!="")){
                console.log("user has filled all the fields")
                const itemname = instance.$('#itemname').val();
                const condition=instance.$('#condition :selected').val();
                const category=instance.$('#category :selected').val();
                const description= instance.$('#description').val();
                const price= instance.$('#price').val();
                var status=instance.$('#sold').val();
                const buyer=instance.$('#buyer').val();
                console.log("bbb");
                var productinfo =
                {
                  itemname:itemname,
                  price:price,
                  condition:condition,
                  category:category,
                  description:description,
                  createdAt:new Date(),
                  buyer:buyer,
                  owner:Meteor.userId()
                }

                console.log("qqq");
                console.log(itemname);
                console.log(price);
                console.log(category);
                console.log(description);
                console.log(condition);
                Meteor.call('product.insert',productinfo);
                console.log("aaa");
                recognition.stop();
                console.log('adding'+itemname);
                instance.$('#itemname').val("");
                instance.$('#price').val("");
                instance.$('#condition').val()==null;
                instance.$('#category').val()==null;
                instance.$('#description').val("");
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
  			$("#usersay").val(text);
  			send();
  		}
  		function updateRec() {
  			$("#additemrec").text(recognition ? "Stop" : "Speak");
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
            console.log($("#category").val());
            var isAdded=false;
            if($("#category").val()==null){
              console.log("into category");
              console.log($("#category").val());
              console.log(data.result.parameters.Category);
              if(data.result.parameters.Category!=""){
                console.log(data.result.parameters.Category);
                $("#category").val(data.result.parameters.Category).trigger("change");
                $("#category").val();
                responsiveVoice.speak("Category added");
                responsiveVoice.speak("What is the price of this product?","UK English Female");

              }else if(data.result.parameters.Category==""){
                if(data.result.parameters.Category==""&&instance.$("#category").val()==null){
                  responsiveVoice.speak("What is the category of this product? The category you can choose are Textbooks/books, electronics, clothes,shoes,and accessories, furniture/home, art/handcrafts, and others","UK English Female",{rate:0.9});
                  console.log("enter first condition for category!!!");
                }else if(data.result.parameters.Category==""&&instance.$("#category").val()!=""){
                  console.log("enter second category condition!!!!");
                  instance.$("#category").val(text);
                  responsiveVoice.speak("Category added");
                  responsiveVoice.speak("What is the price of this product?","UK English Female");
                }
                return;
              }
            }

            console.log(instance.$("#price").val());
            if(instance.$("#price").val()==""||instance.$("#price").val()=="0"){
              console.log("into price");
              if(data.result.parameters.Price!=""){
                console.log("existed price");
                $("#price").val(data.result.parameters.Price);
                responsiveVoice.speak("Price added");
                responsiveVoice.speak("What is the name of this product?","UK English Female");
              }else if(data.result.parameters.Price==""){
                    console.log(data.result.parameters.Price=="");
                    console.log(($("#price").val())=="");
                  if(data.result.parameters.Price==""&&instance.$("#price").val()==""){
                    console.log("enter first condition");
                    console.log("user said "+text);
                    instance.$("#price").val()=="0";
                  }else if(data.result.parameters.Price==""&&instance.$("#price").val()!=""){
                  console.log("enter second condition");
                  instance.$("#price").val(text);
                  responsiveVoice.speak("Price added");
                  responsiveVoice.speak("What is the name of this product?","UK English Female");
                  }
                return;
              }
            }
            console.log(instance.$("#itemname").val());
            if(instance.$("#itemname").val()==""||instance.$("#itemname").val()=="Please say name now"){
              console.log("into itemname");
              if(data.result.parameters.Name!=""){
                $("#itemname").val(data.result.parameters.Name);
                responsiveVoice.speak("Name added");
                responsiveVoice.speak("What is the condition of this product? You can choose from like new, very good, good and acceptable","UK English Female",{rate:0.9});
              }else if(data.result.parameters.Name==""){
                if(data.result.parameters.Name==""&&instance.$("#itemname").val()==""){
                  console.log("enter first condition!!!");
                  instance.$("#itemname").val("Please say name now");
                }else if(data.result.parameters.Name==""&&instance.$("#itemname").val()!=""){
                  console.log("enter second condition!!!!");
                  instance.$("#itemname").val(text);
                  responsiveVoice.speak("Name added");
                  responsiveVoice.speak("What is the condition of this product? You can choose from like new, very good, good and acceptable","UK English Female",{rate:0.9});
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

                }else if(data.result.parameters.Quality==""&&instance.$("#condition").val()!=""){
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
  'keypress #usersay' (elt,instance){
    if (event.which == 13) {
      event.preventDefault();
      send();
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


Template.productrow.helpers({
  isOwner(){
    return (this.p.owner == Meteor.userId())
  },
    hasPic1(product){
      if(product.pic!=undefined){
        console.log("true 1");
        console.log(product.pic);
        return true;
      }else{
        console.log("false 1");
        return false;
      }
    },
    hasPic2(product){
      if(product.pic2!=undefined){
        console.log("true 2");
        console.log(product);
        return true;
      }else{
        console.log("false 2");
        return false;
      }
    },
    hasPic3(product){
      if(product.pic3!=undefined){
        console.log("true 3");
        console.log(product.pic3);

        return true;
      }else{
        return false;
      }
    }
})
Template.ownerproduct.helpers({
   displayitem() {
        if (Template.instance().itemsold.get())
          return "solditem";
        else {
          return "unsolditem";
        }
    },
    hasPic1(product){
      if(product.pic1!=undefined){
        return true;
      }else{
        return false;
      }
    },
    hasPic2(product){
      if(product.pic2!=undefined){
        return true;
      }else{
        return false;
      }
    },
    hasPic3(product){
      if(product.pic3!=undefined){
        return true;
      }else{
        return false;
      }
    }
 })
 Template.ownerproduct.onRendered(function() {
   this.$('.ui.radio.checkbox').checkbox();
 })
 Template.ownerproduct.onCreated(function() {
   this.pic_status = new ReactiveVar([]);
 })

Template.ownerproduct.events({
  'click span'(elt,instance){
    Meteor.call('product.remove',this.p);
},
'click #updateitem':function(elt, instance) {
  elt.preventDefault();
  const product_id = this.p._id;
  const newitemname = $('#newitemname_'+product_id).val();
  const newcondition = $('#newcondition_'+product_id+' :selected').text();
  const newdelivery = $('input[name="newdelivery"]:checked').val();
  const newcategory=$('#newcategory_'+product_id+' :selected').val();
  const newdescription=$('#newdescription_' +product_id).val();
  const newprice=$('#newprice_'+product_id).val();
  const pic1=$('#newproductpic1_'+product_id)[0].files[0];
  const pic2=$('#newproductpic2_'+product_id)[0].files[0];
  const pic3=$('#newproductpic3_'+product_id)[0].files[0];
  const pic_status=Template.instance().pic_status;
  const id = Meteor.userId();
  var newproductinfo =
  {
    itemname:newitemname,
    price:newprice,
    delivery:newdelivery,
    condition:newcondition,
    category:newcategory,
    description:newdescription,
    createdAt:new Date(),
    owner:Meteor.userId()
  }
  const template=Template.instance();
  for(var i=1;i<=3;i++){
    if($('#newproductpic'+i+'_'+product_id).val()){
      if(($('#newproductpic'+i+'_'+product_id)[0].files&&$('#newproductpic'+i+'_'+product_id)[0].files[0]) && ($('#newproductpic'+i+'_'+product_id)[0].files[0].type).match(/(jpg|png|jpeg|gif)$/)){
        if($('#newproductpic'+i+'_'+product_id)[0].files[0].size>1048576){
          alert('The file size should be smaller than 1MB');
          return;
        }else{
          var imagefile=$('#newproductpic'+i+'_'+product_id)[0].files[0];
          (function(i,imagefile){
            var reader=new FileReader();
            reader.onload=function(){
              var dataURL = reader.result;
              imageBase64Form=dataURL.split(',')[1];
              newproductinfo["pic"+i]=imageBase64Form;
              const now=template.pic_status.get();
              now[i]="finished";
              template.pic_status.set(now);
            };
          reader.readAsDataURL(imagefile);
          $('#newproductpic'+i+'_'+product_id).val("");
          $('#shownewproductpic'+i+'_'+product_id).css("display","none");
          $('#productloadpic'+i+'_'+product_id).css('display','block');
          })(i, imagefile);
        }
      }else{
        $('#shownewproductpic'+i+'_'+product_id).attr("src","");
        $('#shownewproductpic'+i+'_'+product_id).css("display","none");
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
    console.log(pic_status);
    if(pic_status.get()[1] && pic_status.get()[2] && pic_status.get()[3]){
      Meteor.call('product.update',product_id,newproductinfo,function(err){
        if (err){
          window.alert("Unable to update product");
          return;
        }
        console.log("updated");
        pic_status.set([]);
        computation.stop();
      });
    }
  })
   $("#closenow_"+product_id).click();
  },
  'click #enableedit'(event, instance){
    const productid=this.p._id;
    const newcategory=instance.$('#newcategory_'+productid).val(this.p.category);
    const newcondition=instance.$('#newcondition_'+productid).val(this.p.condition);

    if (this.p.delivery==="Pick Up"){
        $("#newcheckpickup_"+productid).prop("checked",true);
      }else{
        $("#newcheckdelivery_"+productid).prop("checked",true);
      }

    },
 'change #jsstatus'(event, instance) {
    instance.itemsold.set(event.currentTarget.checked);
    instance.$("")
    Meteor.call('product.sold',Meteor.userId(),this.p);
  },
  'change .newproductpic':function(event,instance){
    const product_id=this.p._id;
    console.log(event.currentTarget.id);
    const picid=event.currentTarget.id
    if($("#"+picid).val()){
      if(event.currentTarget.files&&event.currentTarget.files[0]&&event.currentTarget.files[0].type.match(/(jpg|png|jpeg|gif)$/)){
        if(event.currentTarget.files[0].size>1048576){
          alert('The file size should be smaller than 1MB');
        }else{
          console.log("enter change");
          var str=picid;
          var substr1=str.split("newproductpic")[1];
          var num=substr1.split("_"+product_id)[0];
          console.log(num);
          $('#productloadpic'+num+'_'+product_id).css('display','none');
              var picreader = new FileReader();
              picreader.onload = function(event){
                 var result=event.currentTarget.result;
                 $('#shownewproductpic'+num+'_'+product_id).attr('src',result);
                 $('#shownewproductpic'+num+'_'+product_id).css('display','block');
               }
              picreader.readAsDataURL(event.currentTarget.files[0]);
        }

      }else{
        alert('You are only allowed to upload an image file');
      }
    }else{
      $("#shownewproductpic"+num+"_"+product_id).attr("src","");
      $("#shownewproductpic"+num+"_"+product_id).css("display","none");
    }
  },
})
