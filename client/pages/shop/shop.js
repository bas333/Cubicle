Template.shop.onRendered(function(){
  console.log("the user wants " + Router.current().params.query.type);
  //window.location.hash = "";
  window.location.hash = "#"+Router.current().params.hash;
})

// Template.shop.onCreated(function() {
//   Meteor.subscribe('shop_products', Router.current().params.query.type);
// });

Template.shop.helpers({
  filteredlist() {return Product.find().fetch()},
})
