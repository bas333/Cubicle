Meteor.methods({
  'users.insert':function(user){
    const userId=Meteor.userId();
    if(AllUsers.findOne({owner:userId})){
      throw new Meteor.Error(123, "Profile already exists!!!");
    }else{
      AllUsers.insert(user);
    }
  },
  'product.remove':function(productinfo) {
    if (this.userId == productinfo.owner)
      Product.remove(productinfo._id);
   },

  'product.insert':function(productinfo){
    Product.insert(productinfo);
  },

  'product.update': function(newproductinfo) {
    console.log(newproductinfo);
    console.dir(this);
    Product.update({owner:Meteor.userId()}, {
      $set: {productinfo:newproductinfo}
    });
  // throw new Meteor.Error(500, "Succesfully updated your location");
  // } else {
  //     alert("Failed to update location.");
  //   }
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
