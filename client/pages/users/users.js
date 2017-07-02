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
    const phone=instance.$('#email').val();
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

    console.log('adding '+username);
    instance.$('#username').val("");
    instance.$('#school').val("");
    instance.$('#gender').val("");
    instance.$('#age').val("");
    instance.$('#email').val("");
    instance.$('#phone').val("");

    var newUser={
      username:username,
      school:school,
      gender:gender,
      email:email,
      phone:phone,
      paymethod:paymethod,
      owner:Meteor.userId(),
      createAt:new Date()
    };
    Meteor.call('users.insert',newUser);
  }})
