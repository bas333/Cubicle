import {ReactiveDict}from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';
if(Meteor.isClient){
    Template.chatroom.onCreated(function(){
      Meteor.subscribe('chat');
    });
    Template.chatroom.onCreated(function(){
      Meteor.subscribe('allusers');
    })
    Template.showchat.onCreated(function(){
      Meteor.subscribe('chat');
      Meteor.subscribe('allusers');
    })
}
Template.chatroom.onCreated(function(){
  this.dict=new ReactiveDict();
})
Template.showchat.onCreated(function(){
  this.dictionary=new ReactiveDict();
  this.dictionary.set("showChatBOx",false);
})
Template.chatroom.helpers({
  mychatlist(){
    var mychatlist=[];
    var user=AllUsers.findOne({owner:Meteor.userId()});
    for (var chatid of user.chatlist){
      var chat=Chat.findOne(chatid);
      for (var userid of chat.users_id){
        if (userid!=Meteor.userId()){
          console.log(userid);
          var otheruser=AllUsers.findOne({owner:userid});
          mychatlist.push(otheruser);
        }
      }
    }
    console.log(mychatlist);
    return mychatlist;
  }
})
Template.showchat.events({
  'click #beginChat'(event,template){
    $(".modal-dialog").css("display","none");
    template.$(".modal-dialog").css("display","block");
    $("#chatbox").prop({scrollTop: $("#chatbox")[0].scrollHeight});

  },
  'click #enterMessage'(elt,instance){
    const privatetext=instance.$('#privatetext').val();
    var user=AllUsers.findOne({owner:Meteor.userId()});
    for (var chatid of user.chatlist){
      var chat=Chat.findOne(chatid);
      if (chat.users_id.includes(this.c.owner)){
        console.log(chat);
        console.log("message insert");
        Meteor.call('message.insert',chat._id,Meteor.userId(),privatetext,function(err,result){
          if(err){
            alert("Failed to send message");
            return;
          }
          $("#chatbox").prop({scrollTop: $("#chatbox")[0].scrollHeight});
          instance.$('#privatetext').val("");
        });

        return;
      }
    }

  }
})
Template.showchat.helpers({
  messagelist(){
    var chatarray=[];
    var user=AllUsers.findOne({owner:Meteor.userId()});
    for (var chatid of user.chatlist){
      var chat=Chat.findOne(chatid);
      if (chat.users_id.includes(this.c.owner)){
        console.log(chat);
        console.log("chat find!!!");
        return (chat.messages);
      }
  }
}
})
Template.chatroom.helpers({
  dict:function(){
    return Template.instance().dict;
  }
})
