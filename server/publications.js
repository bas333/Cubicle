Meteor.publish('shop_products', function(type, keywords){
  var re = new RegExp(keywords);
  console.log(type);
  console.log(keywords)
  if(type){
    return Product.find({category:type, itemname:{$regex:re}});
  } else {
    return Product.find({itemname:{$regex:re}});
  }

})
// {category: type,itemname:{$regex: '/'+keywords+'/'}}
Meteor.publish('info_allproducts', function(keywords){
  var re = new RegExp(keywords);
  return Product.find({itemname:{$regex:re}});
})
Meteor.publish('info_allproducts_null', function(){
  return Product.find();
})
Meteor.publish('allusers',function(){
  return AllUsers.find();
})
Meteor.publish('rent',function(){
  return Rent.find();
})
Meteor.publish('product',function(){
  return Product.find();
})
