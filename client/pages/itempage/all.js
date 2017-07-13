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
  'click .return' (elt,instance) {
    Router.go("home");
  }
})
Template.addcart.events({
  'click span'(elt,instance){
    // if (currentUser){
      Meteor.call('product.addcart',Meteor.userId(),this.p);
    // }else{
    //   alert('Please login first.')
    // }
  }
})
