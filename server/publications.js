Meteor.publish('shop_products', function(type, keywords){
  var key = new RegExp(keywords, "i");
  console.log("publish");
  if(type && keywords){
    console.log("Are you here?");
    console.log(key);
    return Product.find({category:type, itemname:{$regex:key}});
  } else if (keywords){
    console.log("You are here right");
    return Product.find({itemname:{$regex:key}});
  } else {
    console.log("?");
    return Product.find({category:type});
  }
})
Meteor.publish('forum',function(){
  return Forum.find();
})

Meteor.publish('rent_search',function(location,price,rentstart,rentend,facilities){
  var faci = new RegExp(facilities, "i");
  var startdate = Date(rentstart);
  var enddate = Date(rentend);
  console.log("here we are" + Rent.find({location:location,price:{$lte:price},startdate:{$lte: startdate}}).fetch());
  return Rent.find({location:location, price:{$lte:price}, facilities:{$regex:faci}});
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
Meteor.publish('reply',function(){
  return Reply.find();
})
