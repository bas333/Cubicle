Meteor.publish('shop_products', function(type){
  return Product.find({category: type});
})

Meteor.publish('info_allproducts', function(){
  return Product.find();
})
Meteor.publish('allusers',function(){
  return AllUsers.find();
})
Meteor.publish('rent',function(){
  return Rent.find();
})
