Meteor.methods({
  'users.insert':function(user){
    const userId=Meteor.userId();
    console.log(user);
    if(AllUsers.findOne({owner:userId})){
      throw new Meteor.Error(123, "Profile already exists!!!");
    }else{
      AllUsers.insert(user);
    }
  },
  'users.createuser':function(email,password,newUser) {
    var credentials = {email,password};
    console.log("credentials are ");
    console.dir(credentials);
    var userid = Accounts.createUser(credentials);
    newUser.owner = userid;
    console.log("newuserid=" + userid);
    AllUsers.insert(newUser);
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
      if (newcart[i]._id==product._id) {
        found = true;
        alert('Item already in cart')
        break;
      }
    }
    if (!found){
      newcart.push(product);
      alert('Item added to cart')
    }
    console.log(newcart);
    AllUsers.update(user._id,{$set:{cart:newcart}});
    console.log(user.cart);
  },
  'product.removecart'(userid,product){
    var user=AllUsers.findOne({owner:userid});
    var newcart=user.cart;
    const pos=newcart.indexOf(product);
    for(var i = 0; i < newcart.length; i++){
      if(newcart[i]._id === product._id){
        newcart.splice(i, 1);
        break;
      }
    }
    console.log(newcart);

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
    var newsoldhistory=[];

    newsoldhistory=user.soldhistory;
    var found = false;
    if (newsoldhistory!=null){
      for(var i = 0; i < newsoldhistory.length; i++) {
        if (newsoldhistory[i]._id==product._id) {
          found = true;
          break;
        }
      }
    }
    console.log(product._id);
    Product.update(product._id,{$set:{soldtime:new Date()}});
    console.log(product);
    if (!found){
      newsoldhistory.push(Product.findOne(product._id));
    }
    AllUsers.update(user._id,{$set:{soldhistory:newsoldhistory}});
    Product.remove(product._id);
    console.log(user.soldhistory);
  },
  'chat.insert'(buyerid,product){
    const seller=AllUsers.findOne({owner:product.owner});

    const buyer=AllUsers.findOne({owner:buyerid});
    const sellerid=seller.owner;
    var users_id=[];
    users_id.push(sellerid);
    users_id.push(buyerid);
    messages=[];
    var chat={
      users_id:users_id,
      messages:messages,
    }
    Chat.insert(chat);
    console.log("chat created");
    var newchat=Chat.findOne({users_id:[sellerid,buyerid]});
    console.log(newchat._id);
    buyer.chatlist.push(newchat._id);
    seller.chatlist.push(newchat._id);
    console.log(buyer.chatlist);
    // var buyerchatlist=buyer.chatlist;
    // var sellerchatlist=seller.chatlist;
    // buyerchatlist.push(newchat._id);
    // sellerchatlist.push(newchat._id);
    // console.log("newchatlist"+newchatlist);
    // AllUsers.update(buyer._id,{$set:{chatlist:buyerchatlist}});
    // AllUsers.update(seller._id,{$set:{chatlist:sellerchatlist}});
    // console.log("user chatlist"+buyerchatlist+sellerchatlist);
  },
  'message.insert'(chatid,userid,text){
    var thischat=Chat.findOne(chatid);
    const username=AllUsers.findOne({owner:userid});
    var thismessage={
      userid:userid,
      messagetext:text,
    }
    console.log("this is the message"+thismessage);
    thischat.messages.push(text);
  },
  'message.insert'(chatid,userid,text){
    var thischat=Chat.findOne(chatid);
    const user=AllUsers.findOne({owner:userid});
    var thismessage={
      username:user.username,
      userid:userid,
      messagetext:text,
    }
    thischat.messages.push(thismessage);
    console.log(thischat.messages);
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
   'rent.update':function(id,newrent){
     Rent.update({_id:id},{$set:newrent});
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
