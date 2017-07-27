import { Template } from 'meteor/templating';
 import { ReactiveVar } from 'meteor/reactive-var';

 Template.ownerproduct.onCreated(function ownerproductOnCreated(){
   this.itemsold= new ReactiveVar(false);
 })
 if(Meteor.isClient){
     Template.showproduct.onCreated(function(){
       Meteor.subscribe('product');
     });
     Template.showproduct.onCreated(function(){
       Meteor.subscribe('allusers');
     })
 }
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
  'change #productpic':function(event){
    if($("#productpic").val()){
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
            $('#showproductpic').attr('src',result);
            $('#showproductpic').css('display','block');
          }
          picreader.readAsDataURL(event.currentTarget.files[0]);
        }
      }else{//not a image file
        alert('You are only allowed to upload an image file');
      }
    }else{
      $("#showproductpic").attr("src","");
      $("#showproductpic").css("display","none");
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
          var picreader2 = new FileReader();
          //when loading the input file
          picreader2.onload = function(event){
            var result2=event.currentTarget.result;
            $('#showproductpic2').attr('src',result2);
            $('#showproductpic2').css('display','block');
          }
          picreader2.readAsDataURL(event.currentTarget.files[0]);
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
          var picreader3 = new FileReader();
          //when loading the input file
          picreader3.onload = function(event){
            var result3=event.currentTarget.result;
            $('#showproductpic3').attr('src',result3);
            $('#showproductpic3').css('display','block');
          }
          picreader3.readAsDataURL(event.currentTarget.files[0]);
        }
      }else{//not a image file
        alert('You are only allowed to upload an image file');
      }
    }else{
      $("#showproductpic3").attr("src","");
      $("#showproductpic3").css("display","none");
    }
  },
  'click #addproduct'(elt,instance){
    elt.preventDefault();
    console.log("click");
    const itemname = instance.$('#itemname').val();
    const condition=instance.$('#condition :selected').val();
    const category=instance.$('#category :selected').val();
    const description= instance.$('#description').val();
    const price= instance.$('#price').val();
    var status=instance.$('#sold').val();
    const buyer=instance.$('#buyer').val();
    const pic=instance.$("#productpic")[0].files[0];
    console.log(pic);
    const pic2=instance.$("#productpic2")[0].files[0];
    console.log(pic2);
    const pic3=instance.$("#productpic3")[0].files[0];
    console.log(pic3);
    var productinfo =
    {
      itemname:itemname,
      price:price,
      condition:condition,
      category:category,
      description:description,
      pic:"",
      pic2:"",
      pic3:"",
      createdAt:new Date(),
      buyer:buyer,
      owner:Meteor.userId()
    };

    var pic3_base64;
    if($('#productpic3').val()){
      console.log("enter 3.1");
      if($("#productpic3")[0].files&&$("#productpic3")[0].files[0]&&($('#productpic3')[0].files[0].type).match(/(jpg|png|jpeg|gif)$/)){
        console.log("enter 3.2");
        if($("#productpic3")[0].files[0].size>1048576){
          alert('The file size should ne smaller than 1 MB');
        }else{
          console.log("enter 3.3");
          var imagefile3=$('#productpic3')[0].files[0];
          var imageConvertTo64Base3=function(imagefile3,callback){
            var reader3=new FileReader();
            reader3.onload=function(){
              var dataURL3=reader3.result;
              imageBase64Form3=dataURL3.split(',')[1];
              callback(imageBase64Form3);
            };
          reader3.readAsDataURL(imagefile3);
          };

          imageConvertTo64Base3(imagefile3,function(imageBase64Form3){
            //console.log(imageBase64Form3);
            productinfo.pic3=imageBase64Form3;
          });
        }
      }else{
        $("#showproductpic3").attr("src","");
        $("#showproductpic3").css("display","none");
        alert("Please add a image file");
      }
    }
    // }else{
    //   productinfo.pic3="";
    // }




    var pic2_base64;
    if($('#productpic2').val()){
      console.log("enter 2.1");
      if($("#productpic2")[0].files&&$("#productpic2")[0].files[0]&&($('#productpic2')[0].files[0].type).match(/(jpg|png|jpeg|gif)$/)){
        console.log("enter 2.2");
        if($("#productpic2")[0].files[0].size>1048576){
          alert('The file size should ne smaller than 1 MB');
        }else{
          console.log("enter 2.3");
          var imagefile2=$('#productpic2')[0].files[0];
          var imageConvertTo64Base2=function(imagefile2,callback){
            var reader2=new FileReader();
            reader2.onload=function(){
              var dataURL2=reader2.result;
              imageBase64Form2=dataURL2.split(',')[1];
              callback(imageBase64Form2);
            };
          reader2.readAsDataURL(imagefile2);
          };
          imageConvertTo64Base2(imagefile2,function(imageBase64Form2){
            //console.log(imageBase64Form2);
            productinfo.pic2=imageBase64Form2;
          //  console.log(productinfo.pic2);
            console.log("finish pic2");
          });
          }
      }else{
        $("#showproductpic2").attr("src","");
        $("#showproductpic2").css("display","none");
        alert("Please add a image file");
      }
    }
    // }else{
    //   productinfo.pic2="";
    // }



    var pic_base64;
    if($('#productpic').val()){
      console.log("enter 1.1");
      if($('#productpic')[0].files&&$('#productpic')[0].files[0]&&($('#productpic')[0].files[0].type).match(/(jpg|png|jpeg|gif)$/)){
        console.log("enter 1.2");
        if($('#productpic')[0].files[0].size>1048576){
          alert('The file size should ne smaller than 1 MB');
        }else{
          console.log("enter 1.3");
          var imagefile=$('#productpic')[0].files[0];
          var imageConvertTo64Base=function(imagefile,callback){
            var reader=new FileReader();
            reader.onload=function(){
              var dataURL=reader.result;
              var imageBase64Form=dataURL.split(',')[1];
              callback(imageBase64Form);
            };
          reader.readAsDataURL(imagefile);
        };

        imageConvertTo64Base(imagefile,function(imageBase64Form){
          //console.log(imageBase64Form);
          productinfo.pic=imageBase64Form;
        });
        }
      }else{
        $("#showproductpic").attr("src","");
        $("#showproductpic").css("display","none");
        alert("Please add a image file");
      }
    }
    // else{
    //   productinfo.pic="";
    // }

     console.log("insert");
     console.log(productinfo);
    Meteor.call('product.insert',productinfo,
         (err, res) => {
           if (err) {
             alert("Failed to add your item");
           } else {
             console.log(productinfo);
             alert("Successfully added your item. You can view it by scrolling down the page.")
           }
         }
    );


    console.log('adding'+itemname);
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
    return (this.p.owner == Meteor.userId())},

    hasPic(product){
      if(product.pic!=undefined&&product.pic!=""){
        console.log("true 1");
        console.log(product.pic);
        return true;
      }else{
        console.log("false 1");
        return false;
      }
    },
    hasPic2(product){
      if(product.pic2!=undefined&&product.pic2!=""){
        console.log("true 2");
        console.log(product);
        return true;
      }else{
        console.log("false 2");
        return false;
      }
    },
    hasPic3(product){
      if(product.pic3!=undefined&&product.pic3!=""){
        console.log("true 3");
        console.log(product.pic3);
        return true;
      }else{
        console.log("false 3");
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
    hasPic(product){
      console.log(product);
      console.log(product.pic);

      if(product.pic!=undefined&&product.pic!=""){
        console.log("true 1");
        return true;
      }else{
        console.log("false 1");
        return false;
      }
    },
    hasPic2(product){
      console.log(product.pic2);
      if(product.pic2!=undefined&&product.pic2!=""){
        console.log("true 2");
        return true;
      }else{
        console.log("false 2");
        return false;
      }
    },
    hasPic3(product){
      console.log(product.pic3);
      if(product.pic3!=undefined&&product.pic3!=""){
        console.log("true 3");
        return true;
      }else{
        console.log("false 3");
        return false;
      }
    }
 })
Template.ownerproduct.events({
  'click span'(elt,instance){
    Meteor.call('product.remove',this.p);
},

'click #updateitem':function(elt, instance) {
  const product_id = this.p._id;
  const newitemname = $('#newitemname_'+product_id).val();
  const newcondition = $('#newcondition_'+product_id+' :selected').text();
  console.log(newcondition);
  const newcategory=$('#newcategory_'+product_id+' :selected').val();
  console.log(newcategory);
  const newdescription=$('#newdescription_' +product_id).val();
  console.log(newdescription);
  const newprice=$('#newprice_'+product_id).val();
  console.log(newprice);
  console.log($('#newproductpic_'+product_id).val())
  const pic=$('#newproductpic_'+product_id)[0].files[0];
  const id = Meteor.userId();
  var newproductinfo =
  {
    itemname:newitemname,
    price:newprice,
    condition:newcondition,
    category:newcategory,
    description:newdescription,
    pic:pic,
    createdAt:new Date(),
    owner:Meteor.userId()
  }

  var pic_base64;
  if($('#newproductpic_'+product_id).val()){
    if(($('#newproductpic_'+product_id)[0].files&&$('#newproductpic_'+product_id)[0].files[0]) && ($('#newproductpic_'+product_id)[0].files[0].type).match(/(jpg|png|jpeg|gif)$/)){
      if($('#newproductpic_'+product_id)[0].files[0].size>1048576){
        alert('The file size should be smaller than 1MB');
      }else{
        console.log("enter third");
        var imagefile=$('#newproductpic_'+product_id)[0].files[0];
        var imageConvertTo64Base=function(imagefile,callback){
          var reader=new FileReader();
          reader.onload=function(){
            var dataURL = reader.result;
            imageBase64Form=dataURL.split(',')[1];
            callback(imageBase64Form);
          };
        reader.readAsDataURL(pic);
      };

      //send to server
      imageConvertTo64Base(imagefile,function(imageBase64Form){
        //add a new field into newuser
        newproductinfo.pic=imageBase64Form;
        Meteor.call('product.update',product_id,newproductinfo);
        //Meteor.call('rent.update',rent_id,newRent);
        $('#newproductpic_'+product_id).val("")
      });
      }
      //$("#newpic").css("display","none");
    }else{
      $("#shownewproductpic"+product_id).attr("src","");
      $("#shownewproductpic"+product_id).css("display","none");
      alert("Please add a image file");
    }
  }else{
    Meteor.call('product.update',product_id,newproductinfo);
    //Meteor.call('rent.update',rent_id,newRent);
  }
    console.log(this.p);
    console.dir(this);
  },
  'click #enableedit'(event,instance){
    const newcategory=instance.$('#newcategory').val(this.p.category);
    const newcondition=instance.$('#newcondition').val(this.p.condition);
    console.log(newcategory);
  },
 'change #jsstatus'(event, instance) {
    instance.itemsold.set(event.currentTarget.checked);
    instance.$("")
    Meteor.call('product.sold',Meteor.userId(),this.p);
  },
  'change .newproductpic':function(event){
    const product_id=this.p._id;
    $('#productloadpic_'+product_id).css('display','none');
    if($("#newproductpic_"+product_id).val()){
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
            console.log("enter show pic");
            console.log($('#shownewproductpic_'+product_id));
            $('#shownewproductpic_'+product_id).attr('src',result);
            $('#shownewproductpic_'+product_id).css('display','block');
          }
          picreader.readAsDataURL(event.currentTarget.files[0]);
        }
      }else{//not a image file
        alert('You are only allowed to upload an image file');
      }
    }else{
      $("#shownewproductpic_"+product_id).attr("src","");
      $("#shownewproductpic_"+product_id).css("display","none");
    }
  },
})
