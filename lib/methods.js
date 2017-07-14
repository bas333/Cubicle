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
  'product.addcart'(userid,product){
    var user=AllUsers.findOne({owner:userid});
    console.log(user.cart);
    var newcart=user.cart;
    var found = false;
    for(var i = 0; i < newcart.length; i++) {
      console.log("herehere");
      if (newcart[i]._id==product._id) {
        console.log("zhe");
        found = true;
        break;
      }
    }
    if (!found){
      newcart.push(product);
    }
    console.log(newcart);
    AllUsers.update(user._id,{$set:{cart:newcart}});
    console.log(user.cart);
  },
  'product.removecart'(userid,product){
    var user=AllUsers.findOne({owner:userid});
    var newcart=user.cart;
    var pos=newcart.indexOf(product);
    newcart.splice(pos,1);
    AllUsers.update(user._id,{$set:{cart:newcart}});
  },
  'product.sold'(userid,product){
    var user=AllUsers.findOne({owner:userid});
    console.log(userid);
    var newsoldhistory=user.soldhistory;
    var found = false;
    for(var i = 0; i < newsoldhistory.length; i++) {
      if (newsoldhistory[i]._id==product._id) {
        found = true;
        break;
      }
    }
    if (!found){
      newsoldhistory.push(product);
    }
    AllUsers.update(user._id,{$set:{soldhistory:newsoldhistory}});
    console.log(user.soldhistory);
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
   'sendJSONtoAPI_ai':function(text){
     return HTTP.call("POST","http://api.api.ai/v1/query/",
        {
          header:{
            "Authorization": "Bearer " + "1b1610a6d61d46959c56b8d0bf607881",
            "Content-Type":"application/json; charset=utf-8"
          },
          data:{
            "query":text,
            "lang":"en",
            "sessionId":"somerandomthing"
          }
   })
 },
})
