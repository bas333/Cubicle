Template.itempage.helpers({
  itemdata: function(){
    return Product.find({},{sort:{itemname:1}});
  },
})
if(Meteor.isClient){
    Template.itempage.onCreated(function(){
      Meteor.subscribe('product');
    })
}
