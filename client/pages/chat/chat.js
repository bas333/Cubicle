if(Meteor.isClient){
    Template.chatroom.onCreated(function(){
      Meteor.subscribe('chat');
    });
    Template.chatroom.onCreated(function(){
      Meteor.subscribe('allusers');
    })
}
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
