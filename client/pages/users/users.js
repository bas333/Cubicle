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
    var gender="";
    if($('input[id="male"]').is(':checked')){
      gender="male";
    }else if($('input[id="female"]').is(':checked')){
      gender="female";
    }else{
      gender="other";
    };
    console.log('adding '+name);
    instance.$('#username').val("");
    instance.$('#school').val("");
    instance.$('#gender').val("");
    instance.$('#age').val("");

    var newUser={
      username:username,
      school:school,
      gender:gender,
      owner:Meteor.userId(),
      createAt:new Date()
    };
    Meteor.call('users.insert',newUser);
  }})
