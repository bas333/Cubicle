Meteor.publish('shop_products', function(type, keywords){
  var key = new RegExp(keywords, "i");
  console.log(type);
  console.log(keywords)
  if(type){
    return Product.find({category:type, itemname:{$regex:key}});
  } else {
    return Product.find({itemname:{$regex:key}});
  }

})
// {category: type,itemname:{$regex: '/'+keywords+'/'}}
Meteor.publish('info_allproducts', function(keywords){
  var re = new RegExp(keywords, "i");
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
