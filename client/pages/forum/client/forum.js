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

Template.showownpost.events({
  'click #updateforum':function(elt,instance){
    const postid=this.p._id;
    const posttext=instance.$("#editforumpost").val();
    const postowner=this.p.name;
    const now=new Date();
    var post={
      name:postowner,
      owner:Meteor.userId(),
      createdAt:now,
      text:posttext
    };
    Meteor.call("forumpost.update",postid,post);
    instance.$("#editforumpost").val("");
  },
  'click #deleteforum':function(elt,instance){
    Meteor.call("forum.remove",this.p);
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
