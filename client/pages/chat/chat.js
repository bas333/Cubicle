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
  // this.dict.set("showChatBox",false);
})
Template.showchat.onCreated(function(){
  this.dictionary=new ReactiveDict();
  this.dictionary.set("showChatBOx",false);
})
// Template.showchat.onCreated(function(){
//   this.dictionary=this.dict;
//   this.dictionary.set("showChatBox",false);
// })
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
// Template.chatroom.events({
//   'click #beginChat'(event,template){
//     Template.instance().dict.set("showChatBox",true);
//   }
// })
Template.showchat.events({
  'click #beginChat'(event,template){
    Template.instance().dictionary.set("showChatBox",true);
  },
  'click #enterMessage'(elt,instance){
    const privatetext=instance.$('#privatetext').val();
    var user=AllUsers.findOne({owner:Meteor.userId()});
    for (var chatid of user.chatlist){
      var chat=Chat.findOne(chatid);
      if (chat.users_id.includes(this.c.owner)){
        console.log(chat);
        console.log("message insert");
        Meteor.call('message.insert',chat._id,Meteor.userId(),privatetext);
        instance.$('privatetext').val("");
        return;
      }
    }

  }
})
Template.showchat.helpers({
  showChatBox:function(){
    return Template.instance().dictionary.get("showChatBox");
  },
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
    // console.log(chat);
    // console.log("chat find!!!");
    // console.log(chat.messages);
    // return (chat.messages);
  }
}
})
Template.chatroom.helpers({
  // showChatBox:function(){
  //   return Template.instance().dict.get("showChatBox");
  // },
  dict:function(){
    return Template.instance().dict;
  }
})
