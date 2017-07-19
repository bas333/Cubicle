if(Meteor.isClient){
    Template.singleitem.onCreated(function(){
      Meteor.subscribe('product');
    })
    Template.singleitem.onCreated(function(){
      Meteor.subscribe('chat');
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
    Meteor.call('chat.insert',Meteor.userId(),this._id);
  },
  'click #enterMessage'(elt,instance){
    const privatetext=instance.$('#privatetext').val();
    var findchat=[];
    var buyerid = Meteor.userId();
    var sellerid = this.owner;
    findchat.push(buyerid);
    findchat.push(sellerid);
    var chatid=Chat.findOne({users_id:findchat})._id;
    Meteor.call('message.insert',chatid,Meteor.userId());
  }
})
Template.singleitem.helpers({
  isOwner(){
    console.log(this.owner);
    return (this.owner == Meteor.userId())},
  messagelist(){
    var findchat=[];
    var buyerid = Meteor.userId();
    var sellerid = this.owner;
    findchat.push(buyerid);
    findchat.push(sellerid);
    return (Chat.findOne({users_id:findchat}).messages);
  }
})
