Template.shop.onRendered(function(){
  console.log("the user wants " + Router.current().params.query.type);
  console.log("The user specifically wants " + Router.current().params.query.keywords);
  //window.location.hash = "";
  // window.location.hash = "#"+Router.current().params.hash;
})

Template.shop.events({
  'click #return' (elt,instance) {
    Router.go("home");
  }
})

Template.shop.helpers({
  filteredlist() {return Product.find().fetch()},
})
