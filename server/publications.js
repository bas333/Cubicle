Meteor.publish('shop_products', function(type){
  return Product.find({category: type});
})

Meteor.publish('info_allproducts', function(){
  return Product.find();
})
