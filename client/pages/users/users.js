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

Template.users.onRendered(function(){
  $('.ui.checkbox').checkbox({on: 'checked'});
  this.$('.ui.dropdown').dropdown({on: 'hover'});
  this.$('#signup-form')
    .form({
      fields: {
        name: {
          identifier: 'name',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your name'
            }
          ]
        },
        username: {
          identifier: 'username',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your name'
            }
          ]
        },
        email: {
          identifier: 'email',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your name'
            }
          ]
        },
        password: {
          identifier: 'password',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a password'
            },
            {
              type   : 'minLength[6]',
              prompt : 'Your password must be at least {ruleValue} characters'
            }
          ]
        },
        phone: {
          identifier: 'phone',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your phone'
            }
          ]
        },
        school: {
          identifier: 'school',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please select a school'
            }
          ]
        },
        gender: {
          identifier: 'gender',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please select a gender'
            }
          ]
        },
        age: {
          identifier: 'age',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please select an age'
            }
          ]
        },
        paymentlist: {
          identifier: 'paymentlist',
          rules: [
            {
              type   : 'checked',
              prompt : 'Please select at least one payment method'
            }
          ]
        },
        terms: {
          identifier: 'terms',
          rules: [
            {
              type   : 'checked',
              prompt : 'You must agree to the terms and conditions'
            }
          ]
        }
      }
    })
  ;
})

Template.users.events({
  'click #submitnow':function(elt,instance) {
    event.preventDefault();
    if(!$('#signup-form').form('is valid')){
      return;
    }
    const username=instance.$('#username').val();
    const school=instance.$('#school').val();
    const age=instance.$('#age').val();
    const email=instance.$('#email').val();
    const phone=instance.$('#phone').val();
    var gender=instance.$('#gender :selected').text();
    paymethodinputs = instance.$("#paymentlist input");
    paymethod = [];
    paymethodinputs.each(function(a,b){
      if (b.checked) { paymethod.push(b.value);}
    });
    cart=[];
    soldhistory=[];
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
