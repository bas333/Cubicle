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
 Template.main.onRendered(function() {
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
  'click #addproduct'(elt,instance){
    const itemname = instance.$('#itemname').val();
    const condition=instance.$('#condition :selected').val();
    const category=instance.$('#category :selected').val();
    const description= instance.$('#description').val();
    const price= instance.$('#price').val();
    var status=instance.$('#sold').val();
    const buyer=instance.$('#buyer').val();
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
    };
    Meteor.call('product.insert',productinfo,
      (err, res) => {
        if (err) {
          alert("Failed to add your item");
        } else {
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
                Meteor.call('product.insert',productinfo);

                console.log("insert");
                console.log('adding'+itemname);
                instance.$('#itemname').val("");
                instance.$('#price').val("");
                instance.$('#condition').val()==null;
                instance.$('#category').val()==null;
                instance.$('#description').val("");
                console.log("you stop we stop");
                recognition.stop();
                stopRecognition();
                instance.$("#usersay").val("");
              } else if((instance.$('#itemname').val()!="")&&(instance.$('#price').val()!="")&&(instance.$('#condition').val()!="")&&(instance.$('#category').val()!="")&&(instance.$('#description').val()!="Please say description now")&&(instance.$('#description').val()!="")){
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
    return (this.p.owner == Meteor.userId())}
})
Template.ownerproduct.helpers({
   displayitem() {
        if (Template.instance().itemsold.get())
          return "solditem";
        else {
          return "unsolditem";
        }
   }
 })
Template.ownerproduct.events({
  'click span'(elt,instance){
    Meteor.call('product.remove',this.p);
},

'click #updateitem'(event, instance) {
  const product_id = this.p._id;
  const newitemname = $('#newitemname_'+product_id).val();;
  const newcondition=$('#newcondition :selected').text();

  const newcategory=instance.$('#newcategory :selected').val();
  const newdescription=instance.$('#newdescription').val();
  const newprice=instance.$('#newprice').val();

  id = Meteor.userId();
  var newproductinfo =
  {
    itemname:newitemname,
    price:newprice,
    condition:newcondition,
    category:newcategory,
    description:newdescription,
    createdAt:new Date(),
    owner:Meteor.userId()
  }
    console.log(this.p);
    console.dir(this);
    Meteor.call('product.update',product_id,newproductinfo);
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
  }
})
