Template.postforum.helpers({
  requests(){
    return Forum.find();
  },

})
Template.showpost.helpers({
  isNotOwnPost(){
    if(this.p.owner!=Meteor.userId()){
      return true;
    }
  },
  replys(){
    return Reply.find({replyId:this.p._id});
  },
  isOwnReply(r){
    if(r.owner==Meteor.userId()){
      return true;
    }
  }
})
Template.showpost.events({
  'click .submitreply':function(elt,instance){
    var name = AllUsers.findOne({owner:Meteor.userId()}).username;
    var now = new Date();
    var text = instance.$("#replypost_"+this.p._id).val();
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
    instance.$("#replypost_"+this.p._id).val("")
  },
  'click .deletereply':function(elt,instance){
    console.log("delete");
    console.log(elt.currentTarget.id);
    var str=elt.currentTarget.id;
    var id=str.split("deletereply_")[1];
    Meteor.call('reply.delete',id);
  }
})
