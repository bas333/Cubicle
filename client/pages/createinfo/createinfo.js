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

Template.showproduct.helpers({
  productlist() {
    return Product.find()},
  isOwner(product){
    console.log(product.owner);
    return (product.owner == Meteor.userId())}
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
    }
    Meteor.call('product.insert',productinfo);

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
                instance.$('#itemname').val("");
                instance.$('#price').val("");
                instance.$('#condition').val("");
                instance.$('#category').val("");
                instance.$('#description').val("");
                recognition.stop();
                stopRecognition();
              }else if(event.results[i][0].transcript.includes('submit')){
                console.log("user want to submit");
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
                }
                console.log(itemname);
                console.log(price);
                console.log(category);
                console.log(description);
                console.log(condition);
                Meteor.call('product.insert',productinfo);

                recognition.stop();
                console.log('adding'+itemname);
                instance.$('#itemname').val("");
                instance.$('#price').val("");
                instance.$('#condition').val("");
                instance.$('#category').val("");
                instance.$('#description').val("");
                stopRecognition();
              }else if(instance.$('#itemname').val()!=""&&instance.$('#price').val()!=""&&instance.$('#condition').val()!=""&&instance.$('#category').val()!=""&&instance.$('#description').val()!=""){
                console.log("user has filled all the fields")
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
                }
                console.log(itemname);
                console.log(price);
                console.log(category);
                console.log(description);
                console.log(condition);
                Meteor.call('product.insert',productinfo);

                recognition.stop();
                console.log('adding'+itemname);
                instance.$('#itemname').val("");
                instance.$('#price').val("");
                instance.$('#condition').val("");
                instance.$('#category').val("");
                instance.$('#description').val("");
                stopRecognition();
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
            if(data.result.parameters.Category!=""){
              console.log(data.result.parameters.Category);
              $("#category").val(data.result.parameters.Category).trigger("change");
            }else if(data.result.parameters.Category==""){
              responsiveVoice.speak("What is the category of this product? The category you can choose are Textbooks/books, electronics, clothes,shoes,and accessories, furniture/home, art/handcrafts, and others","UK English Female",{rate:0.8});
            }
            if(data.result.parameters.Name!=""){
              $("#itemname").val(data.result.parameters.Name);
            }else if(data.result.parameters.Name==""){
              responsiveVoice.speak("What is the name of this product?","UK English Female");
              $("#itemname").val(text);
            }
            if(data.result.parameters.Quality!=""){
              $("#condition").val(data.result.parameters.Quality).trigger("change");
            }else if(data.result.parameters.Quality==""){
              responsiveVoice.speak("What is the condition of this product? You can choose from like new, very good, good and acceptable","UK English Female",{rate:0.8});
              $("#condition").val(text);
            }
            if(data.result.parameters.Price!=""){
              $("#price").val(data.result.parameters.Price);
            }else if(data.result.parameters.Price==""){
                responsiveVoice.speak("What is the price of this product?","UK English Female");
                $("#price").val(text);
            }
            if(data.result.parameters.Detaildescription==""){
              responsiveVoice.speak("Please add some detailed description to this product","UK English Female");
              $("#description").val(text);
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
