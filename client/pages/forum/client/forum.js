Template.forum.helpers({
  requests(){
    return Forum.find();
  },
  isOwner(post){
    if(post.owner==Meteor.userId()){
      return true;
    }else{
      return false;
    }
  }
})

Template.makepost.events({
  "click #submitforum"(event, instance){
    var name = AllUsers.findOne({owner:Meteor.userId()}).username;
    var now = new Date();
    var text = instance.$("#forumpost").val();
    var post = {
      owner:Meteor.userId(),
      name:name,
      createdAt: now,
      text: text
    };
    console.log(post);
    Meteor.call('forum.insert',post);
    instance.$("#forumpost").val("");
  }
})
