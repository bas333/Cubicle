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
  this.dictionary.set("showChatBox",false);
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
  'click #beginChat'(event,template,instance){
    $(".modal-dialog").css("display","none");
    template.$(".modal-dialog").css("display","block");

    $("#chatbox_"+this.c._id).prop({scrollTop: $("#chatbox_"+this.c._id)[0].scrollHeight});

  },
  'keypress input'(event,elt,instance){
    if (event.which==13){
      const _id = this.c._id;
      const privatetext=$('#privatetext_' + _id).val();
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
            $("#chatbox_" + _id).prop({scrollTop: $("#chatbox_" + _id)[0].scrollHeight});
            $('#privatetext_' + _id).val("");
          });
          return false;

        }
      }
    }
  },
  'click #enterMessage'(elt,instance){
    const _id = this.c._id;
    const privatetext=$('#privatetext_' + _id).val();
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
          $('#chatbox_' + _id).prop({scrollTop: $('#chatbox_' + _id)[0].scrollHeight});
          $('#privatetext_' + _id).val("");
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
