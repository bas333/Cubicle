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
    console.log("herehere");
    var chat=Chat.findOne({users_id:[sellerid,buyerid]});
    Meteor.call('message.insert',chat._id,Meteor.userId(),privatetext);
    instance.$('privatetext').val("");
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
  }
})
