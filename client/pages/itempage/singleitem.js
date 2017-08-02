if(Meteor.isClient){
    Template.singleitem.onCreated(function(){
      Meteor.subscribe('product');
    })
    Template.singleitem.onCreated(function(){
      Meteor.subscribe('chat');
    })
    Template.singleitem.onCreated(function(){
      Meteor.subscribe('allusers');
    })
}


Template.singleitem.events({
  'click #add'(elt,instance){
    if (AllUsers.findOne({owner:Meteor.userId()})!=undefined){
      Meteor.call('product.addcart',Meteor.userId(),this);
    }else{
      alert('Please log in first.')
    }
  },
  'click #chatnow'(elt,instance){
    console.log("product id"+this._id);
    var product=Product.findOne(this._id);
  if (Chat.findOne({users_id:[this.owner,Meteor.userId()]})==undefined){
    console.log("no chat exist");
    Meteor.call('chat.insert',Meteor.userId(),product);
  }
  },
  'click #enterMessage'(elt,instance){
    const privatetext=instance.$('#privatetext').val();
    const buyerid = Meteor.userId();
    const sellerid = this.owner;
    var chat=Chat.findOne({users_id:[sellerid,buyerid]});
    Meteor.call('message.insert',chat._id,Meteor.userId(),privatetext);
    $("#chatbox").prop({scrollTop: $("#chatbox")[0].scrollHeight});
    $('#privatetext').val("");
  },
  'keypress input'(event, instance){
    if (event.which==13){
      const privatetext=instance.$('#privatetext').val();
      const buyerid = Meteor.userId();
      const sellerid = this.owner;
      console.log("keypress"+event.which);
      var chat=Chat.findOne({users_id:[sellerid,buyerid]});
      Meteor.call('message.insert',chat._id,Meteor.userId(),privatetext,function(err,result){
        if(err){
          alert("Failed to send message");
          return;
        }
        $("#chatbox").prop({scrollTop: $("#chatbox")[0].scrollHeight});
        $('#privatetext').val("");
      });
    }
  }
})
Template.singleitem.helpers({
  isOwner(){
    console.log(this.owner);
    return (this.owner == Meteor.userId())},
  messagelist(){
    var buyerid = Meteor.userId();
    var sellerid = this.owner;
    var chat=Chat.findOne({users_id:[sellerid,buyerid]});
    console.log(chat);
    console.log("chat find!!!");
    console.log(chat.messages);
    return (chat.messages);
  },
  sellername(instance){
    var user=AllUsers.findOne({owner:this.owner});
    return user.username;
  },
  hasPic1(){
    if(this.pic1!=undefined){
      return true;
    }
  },
  hasPic2(){
    if(this.pic2!=undefined){
      return true;
    }
  },
  hasPic3(){
    if(this.pic3!=undefined){
      return true;
    }
  },
  isInCart(){
    var user=AllUsers.findOne({owner:Meteor.userId()});
    console.log(user.cart);
    var newcart=user.cart;
    var found = false;
    for(var i = 0; i < newcart.length; i++) {
      if (newcart[i]._id==this._id) {
        found = true;
      }
    }
    return found;
  },
})
