Meteor.methods({
  'users.insert':function(user){
    const userId=Meteor.userId();
    if(AllUsers.findOne({owner:userId})){
      throw new Meteor.Error(123, "Profile already exists!!!");
    }else{
      AllUsers.insert(user);
    }
  },
  'users.remove':function(newUser){
    AllUsers.remove(newUser._id);
  },
  'users.updateAge':function(id,age){
  AllUsers.update({owner:id},{
    $set:{age:age}
  });
  },
  'users.updateGender':function(id,gender){
    AllUsers.update({owner:id},{
      $set:{gender:gender}
    });
  },
  'users.updateEmail':function(id,email){
    AllUsers.update({owner:id},{
      $set:{email:email}
    });
  },
  'users.updatePaymethod':function(id,paymethod){
    AllUsers.update({owner:id},{
      $set:{paymethod:paymethod}
    });
  },
  'allusers.updateName':function(id,name){
    console.log(name);
    AllUsers.update({owner:id},{
      $set:{username:name}
    });
  },
  'product.remove'(productinfo) {
    if (this.userId == productinfo.owner){
      Product.remove(productinfo._id);
    }
   },
  'product.insert'(productinfo){
    Product.insert(productinfo);
  },

  'product.update':function(id,newinput){
    var product = Product.findOne(id);
    Product.update(product._id, {$set:newinput});
  },
  'product.addcart'(userid,productid){
    var user=AllUsers.findOne({owner:userid});
    console.log(user.cart);
    var newcart=user.cart;
    newcart.push(productid);
    console.log(newcart);
    AllUsers.update(user._id,{$set:{cart:newcart}});
    console.log(user.cart);
  },

  'rent.insert':function(rentpost){
    Rent.insert(rentpost);
  },

  'rent.remove': function(rentpost){
    console.log("userid="+this.userId);
    console.log('rent.owner='+rentpost.owner);
    console.dir(rentpost);
    if (this.userId == rentpost.owner)
      Rent.remove(rentpost._id);
   },

})
