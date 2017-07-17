if(Meteor.isClient){
    Template.showAll.onCreated(function(){
      Meteor.subscribe('product');
    });
    Template.showAll.onCreated(function(){
      Meteor.subscribe('allusers');
    })
}
Template.showAll.helpers({
  productlist() {return Product.find()},
})

Template.allproducts.events({
  'click #return' (elt,instance) {
    Router.go("home");
  }
})
Template.addcart.events({
  'click #add'(elt,instance){
    if (AllUsers.findOne({owner:Meteor.userId()})!=undefined){
      Meteor.call('product.addcart',Meteor.userId(),this.p);
    }else{
      alert('Please log in first.')
    }
    alert('Item added to cart')
  }
})
Template.addcart.helpers({
  isOwner(product){
    console.log(product.owner);
    return (product.owner == Meteor.userId())}
})
