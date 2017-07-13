Template.mycart.helpers({
  cartlist(){
    var user=AllUsers.findOne({owner:Meteor.userId()});
    var cart=user.cart;
    console.log(cart);
    return cart;
  }
})
Template.mycart.events({
  'click span'(){
    Meteor.call('product.removecart',Meteor.userId(),this.p);
  }
})
