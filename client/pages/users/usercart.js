Template.mycart.helpers({
  cartlist(){
    var user=AllUsers.findOne({owner:Meteor.userId()});
    console.log(user);
    var cart=user.cart;
    console.log(cart);
    return cart;
  },
})
Template.removecart.events({
  'click #removethis'(){
    console.log(this.p);
    Meteor.call('product.removecart',Meteor.userId(),this.p);
  }
})
Template.removecart.helpers({
  hasPic(p){
    if(p.pic!=undefined){
      return true;
    }else{
      return false;
    }
  },
  sellername(product){
    var user=AllUsers.findOne({owner:product.owner});
    return user.username;
  }
})
