Template.users.helpers({
  numberList(){
    const a= [];
    for(var i=1; i<=100; i++){
      a.push(i);
    }
    return a;
  },
  schoolData(){
    return schools;
  }
})
const schools=[
  {name:"Brandeis University"},
  {name:"Boston University"},
  {name:"Boston College"},
  {name:"Babson College"},
  {name:"Northeastern University"}
]
Template.users.events({
  'click #submitnow':function(elt,instance) {
    event.preventDefault();
    const username=instance.$('#username').val();
    const school=instance.$('#school').val();
    const age=instance.$('#age').val();
    const email=instance.$('#email').val();
    const phone=instance.$('#phone').val();
    var gender="";
    if($('input[id="male"]').is(':checked')){
      gender="male";
    }else if($('input[id="female"]').is(':checked')){
      gender="female";
    }else{
      gender="other";
    };
    paymethodinputs = instance.$("#paymentlist input");
    paymethod = [];
    paymethodinputs.each(function(a,b){
      if (b.checked) { paymethod.push(b.value);}
    });
    cart=[];
    soldhistory=[];
    chatlist=[];
    console.log('adding '+username);
    instance.$('#username').val("");
    instance.$('#school').val("");
    instance.$('#gender').val("");
    instance.$('#age').val("");
    instance.$('#email').val("");
    instance.$('#phone').val("");

    var newUser={
      username:username,
      age:age,
      school:school,
      gender:gender,
      email:email,
      phone:phone,
      paymethod:paymethod,
      cart:cart,
      soldhistory:soldhistory,
      chatlist:chatlist,
      owner:Meteor.userId(),
      createAt:new Date()
    };
    Meteor.call('users.insert',newUser, function(err, result){
      if(err){
        window.alert(err);
        return;
      }
    });
  }})

Template.showprofile.helpers({
  numberList(){
    const a= [];
    for(var i=1; i<=100; i++){
      a.push(i);
    }
    return a;
  },
})

Template.showuser.helpers({
  peoplelist() {return AllUsers.find()},
  isOwner(person){
    console.log(person);
    return person.owner==Meteor.userId();
  }
})

Template.users.helpers({
    hasPerson(){
      return AllUsers.findOne({owner:Meteor.userId()})
    }
})

Template.showprofile.events({
   'click #editName':function(elt,instance){
      $("#newname").css("display", "block");
   },
   'click #editAge':function(elt,instance){
      $("#newage").css("display", "block");
   },
   'click #editGender':function(elt,instance){
      $("#newgender").css("display", "block");
   },
   'click #editEmail':function(elt,instance){
      $("#newemail").css("display", "block");
   },
   'click #editPaymethod':function(elt,instance){
      $("#newpayment").css("display", "block");
   },
   'click #canclePaymethod':function(elt,instance){
      $("#newpayment").css("display", "none");
   },
   'click #cancleEmail':function(elt,instance){
      $("#newemail").css("display", "none");
   },
   'click #cancleGender':function(elt,instance){
      $("#newgender").css("display", "none");
   },
   'click #cancleAge':function(elt,instance){
      $("#newage").css("display", "none");
   },
   'click #cancleName':function(elt,instance){
      $("#newname").css("display", "none");
   },
   'click #updateUsername1':function(elt,instance){
     const name=instance.$('#usernameUpdate').val();
     console.log('modifying '+name);
     Meteor.call('allusers.updateName',Meteor.userId(),name);
     instance.$('#usernameUpdate').val("");
     instance.$("#newname").css("display", "none");
   },
   'click #removeProfile':function(elt,instance){
     console.log(this.person);
     Meteor.call('users.remove',this.person);
   },
   'click #updateAge':function(elt,instance){
     const age=instance.$('#age2').val();
     console.log(age);
     Meteor.call('users.updateAge',Meteor.userId(),age);
     $("#newage").css({display:"none"});
   },
   'click #updateGender':function(elt,instance){
     const age=instance.$('#age2').val();
     var gender="";
     if($('input[id="male1"]').is(':checked')){
       gender="male";
     }else if($('input[id="female1"]').is(':checked')){
       gender="female";
     }else{
       gender="other";
     };
     Meteor.call('users.updateGender',Meteor.userId(),gender);
     $("#newgender").css({display:"none"});
   },
   'click #updateEmail':function(elt,instance){
     const email=instance.$('#emailUpdate').val();
     Meteor.call('users.updateEmail',Meteor.userId(),email);
     instance.$('#emailUpdate').val("");
     $("#newemail").css({display:"none"});
   },
   'click #updatePaymethod':function(elt,instance){
     paymethodinputs = instance.$("#newpayment input");
     paymethod = [];
     paymethodinputs.each(function(a,b){
       if (b.checked) { paymethod.push(b.value);}
     });
     console.log(paymethod);
     Meteor.call('users.updatePaymethod',Meteor.userId(),paymethod);
     $("#newpayment").css({display:"none"});
   }
})
