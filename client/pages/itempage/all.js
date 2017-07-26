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
    console.log(Meteor.userId());
    console.log(AllUsers.findOne({owner:Meteor.userId()}));
    console.log(AllUsers.findOne({owner:Meteor.userId()})!=undefined);
    if (AllUsers.findOne({owner:Meteor.userId()})!=undefined){
      Meteor.call('product.addcart',Meteor.userId(),this.p);
      alert('Item added to cart')
    }else{
      alert('Please log in first.')
    }
    // alert('Item added to cart')
  }
})
Template.addcart.helpers({
  isOwner(product){
    console.log(product.owner);
    return (product.owner == Meteor.userId())}
})
