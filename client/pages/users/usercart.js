Template.mycart.helpers({
  cartlist(){
    var user=AllUsers.findOne({owner:Meteor.userId()});
    var cart=user.cart;
    console.log(cart);
    return cart;
  }
})
<<<<<<< HEAD
=======
Template.mycart.events({
  'click span'(){
    Meteor.call('product.removecart',Meteor.userId(),this.p);
  }
})
>>>>>>> f6d55a5f248218dee937494649f6fab26dcc62b5
