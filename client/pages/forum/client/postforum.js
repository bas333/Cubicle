Template.postforum.helpers({
  requests(){
    return Forum.find();
  },
})
Template.showreply.helpers({
  replys(){
    return Reply.find({replyId:this.p._id});
  }
})
Template.showpost.helpers({
  isNotOwnPost(){
    if(this.p.owner!=Meteor.userId()){
      return true;
    }
  },
})
Template.showpost.events({
  'click #submitreply':function(elt,instance){
    var name = AllUsers.findOne({owner:Meteor.userId()}).username;
    var now = new Date();
    var text = instance.$("#replypost").val();
    var replyId=this.p._id;
    var reply = {
      owner:Meteor.userId(),
      name:name,
      createdAt: now,
      text: text,
      replyId:replyId,
    };
    console.log(reply);
    Meteor.call('reply.insert',reply);
  }
})
