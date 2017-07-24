Meteor.publish('shop_products', function(type, keywords){
  var key = new RegExp(keywords, "i");
  console.log("publish");
  if(type){
    console.log("Are you here?");
    console.log(key);
    return Product.find({category:type, itemname:{$regex:key}});
  } else {
    console.log("You are here right")
    return Product.find({itemname:{$regex:key}});
  }
})
Meteor.publish('forum',function(){
  return Forum.find();
})

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
Meteor.publish('chat',function(){
  return Chat.find();
})
