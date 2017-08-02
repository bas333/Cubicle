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
    return (product.owner == Meteor.userId())
  },
  isInCart(product){
    console.log(product);
    var user=AllUsers.findOne({owner:Meteor.userId()});
    console.log(user.cart);
    var newcart=user.cart;
    var found = false;
    for(var i = 0; i < newcart.length; i++) {
      if (newcart[i]._id==product._id) {
        found = true;
      }
    }
    return found;
  },
})
Template.productrow.helpers({
  sellername(product){
    var user=AllUsers.findOne({owner:product.owner});
    return user.username;
  },
  hasPic1(p){
    if(p.pic1!=undefined){
      return true;
    }
  },
  hasPic2(p){
    if(p.pic2!=undefined){
      return true;
    }
  },
  hasPic3(p){
    if(p.pic3!=undefined){
      return true;
    }
  },
})
