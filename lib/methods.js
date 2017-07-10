Meteor.methods({
  'users.insert':function(user){
    AllUsers.insert(user);
  },
  'product.remove':function(productinfo) {
    if (this.userId == productinfo.owner)
      Product.remove(productinfo._id);
   },

  'product.insert':function(productinfo){
    Product.insert(productinfo);
  },

  'post.edit':function(id,newinput,field){
    var post = Posts.findOne(id);
    Product.update(product._id, {$set:{field:newinput}});
  },

  'rent.insert':function(rentpost){
    Rent.insert(rentpost);
  },

  'rent.remove': function(rentpost){
    console.log("userid="+this.userId);
    console.log('rent.owner='+rent.owner);
    console.dir(rent);
    if (this.userId == rent.owner)
      Rent.remove(rentpost._id);
   },

})
