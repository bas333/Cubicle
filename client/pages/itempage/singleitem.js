if(Meteor.isClient){
    Template.singleitem.onCreated(function(){
      Meteor.subscribe('product');
    })
}
Template.singleitem.events({
  'click #add'(elt,instance){
    if (AllUsers.findOne({owner:Meteor.userId()})!=undefined){
      Meteor.call('product.addcart',Meteor.userId(),this.p);
    }else{
      alert('Please log in first.')
    }
    alert('Item added to cart')
  }
})
Template.singleitem.helpers({
  isOwner(){
    console.log(owner);
    return (owner == Meteor.userId())}
})
