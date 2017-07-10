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
