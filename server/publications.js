Meteor.publish('shop_products', function(type, text){
  return Product.find({type: Router.current().params.query.type, name:text});
})
Meteor.publish('product',function(){
  return Product.find();
})