if(Meteor.isClient){
    Template.showAll.onCreated(function(){
      Meteor.subscribe('product');
    });
}
Template.showAll.helpers({
  productlist() {return Product.find()},
})

Template.allproducts.events({
  'click .return' (elt,instance) {
    Router.go("home");
  }
})
