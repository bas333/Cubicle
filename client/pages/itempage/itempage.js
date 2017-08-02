Template.itempage.helpers({
  itemdata: function(){
    return Product.find({},{sort:{itemname:1}});
  },
})
