Template.showproduct.helpers({
  productlist() {return Product.find()},
})
// Template.addperson.helpers({
//   typelist: function() {
//        console.log("in typelist");
//        return ['Natural Scenery and Landscapes','Urban Life and City Experience',
//        'Resorts and Theme Parks']
//     }
// })
Template.addproduct.events({
  'click button'(elt,instance){
    const itemname = instance.$('#itemname').val();
    const condition=instance.$('#condition :selected').text();
    const category=instance.$('#category:selected').text();
    const description= instance.$('#description').val();
    // desiredType = instance.$("#typelist input");
    // types = [];
    // desiredType.each(function(a,b){
    //   if (b.checked) { types.push(b.value);}
    // });
    console.log('adding'+itemname);
    instance.$('#itemname').val("");
    instance.$('#condition').val("");
    instance.$('#category').val("");
    instance.$('#description').val("");

    var user={itemname:itemname,
              condition:condition,
              category:category,
              description:description,
              owner:Meteor.userId(),
              createAt:new Date()}

    Meteor.call('user.insert',user);
    (err,res)=>{
      console.log('got the answer');
      console.dir([err,res]);
    }
  }
})
// Template.productrow.helpers({
//   isOwner(){console.dir(this);
//     return this.person.owner == Meteor.userId()}
//
// })
Template.productrow.events({
  'click span'(elt,instance){
    console.dir(this);
    console.log(this);
    console.log(this.person._id);
    Meteor.call('user.remove',this.person);
  //   if (this.person.owner==Meteor.userId()){
  //     People.remove(this.person._id);
  // }else {
  //   alert("You are not allowed to delete this information");
  // }
}
})
