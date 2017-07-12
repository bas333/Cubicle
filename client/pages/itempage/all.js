if(Meteor.isClient){
    Template.showAll.onCreated(function(){
      Meteor.subscribe('product');
    });
}
Template.showAll.helpers({
  productlist() {return Product.find()},
})
