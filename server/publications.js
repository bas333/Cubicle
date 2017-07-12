Meteor.publish('shop_products', function(type, text){
  return Product.find({type: Router.current().params.query.type, name:text});
})
Meteor.publish('product',function(){
  return Product.find();
})
Meteor.publish('allusers',function(){
  return AllUsers.find();
})
Meteor.publish('rent',function(){
  return Rent.find();
})
