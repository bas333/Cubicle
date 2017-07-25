Meteor.methods({
  'users.insert':function(user){
    const userId=Meteor.userId();
    console.log(user);
    if(AllUsers.findOne({owner:userId})){
      throw new Meteor.Error(123, "Profile already exists!!!");
    }else{
      console.log("inserted");
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
  'users.updateSchool':function(id,school){
    AllUsers.update({owner:id},{
      $set:{school:school}
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
  'users.updatePic':function(id,newpic){
    AllUsers.update({owner:id},{
      $set:{pic:newpic}
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

    Product.update(product._id,{$set:{soldtime:new Date()}});

    if (!found){
      newsoldhistory.push(Product.findOne(product._id));
    }
    AllUsers.update(user._id,{$set:{soldhistory:newsoldhistory}});
    Product.remove(product._id);
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
    var newchat=Chat.findOne({users_id:[sellerid,buyerid]});
    var newbuyerchatlist=buyer.chatlist;
    var newsellerchatlist=seller.chatlist;
    newbuyerchatlist.push(newchat._id);
    newsellerchatlist.push(newchat._id);
    AllUsers.update(buyer._id,{$set:{chatlist:newbuyerchatlist}});
    AllUsers.update(seller._id,{$set:{chatlist:newsellerchatlist}});
  },
  'message.insert'(chatid,userid,text){
    var thischat=Chat.findOne(chatid);
    const user=AllUsers.findOne({owner:userid});
    var thismessage={
      username:user.username,
      userid:userid,
      messagetext:text,
    }
    var newmessages=thischat.messages;
    newmessages.push(thismessage);

    Chat.update(chatid,{$set:{messages:newmessages}});

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
 'forum.insert':function(post){
   Forum.insert(post);
 },
 'forumpost.update':function(id,post){
   Forum.update({_id:id},{$set:post});
 },
 'forum.remove':function(post){
   Forum.remove(post);
 }
})
