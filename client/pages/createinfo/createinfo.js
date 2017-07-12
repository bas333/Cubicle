// if(Meteor.isClient){
//     Template.addproduct.onCreated(function(){
//       Meteor.subscribe('info_allproducts');
//     });
//     Template.showproduct.onCreated(function(){
//       Meteor.subscribe('info_allproducts');
//     });
// }
Template.showproduct.helpers({
  productlist() {
    return Product.find()},
  isOwner(product){
    console.log(product.owner);
    return (product.owner == Meteor.userId())}
})
Template.addproduct.events({
  'click button'(elt,instance){
    const itemname = instance.$('#itemname').val();
    const condition=instance.$('#condition :selected').text();
    const category=instance.$('#category :selected').val();
    const description= instance.$('#description').val();
    const price= instance.$('#price').val();
    var productinfo =
    {
      itemname:itemname,
      price:price,
      condition:condition,
      category:category,
      description:description,
      createdAt:new Date(),
      owner:Meteor.userId()
    }
    Meteor.call('product.insert',productinfo);

    console.log('adding'+itemname);
    instance.$('#itemname').val("");
    instance.$('#price').val("");
    instance.$('#condition').val("");
    instance.$('#category').val("");
    instance.$('#description').val("");
  }
})


Template.productrow.helpers({
  isOwner(){
    return (this.p.owner == Meteor.userId())}
})

Template.ownerproduct.events({
  'click span'(elt,instance){
    console.dir(this);
    console.log(this);
    console.log(this.p._id);
    Meteor.call('product.remove',this.p);
},

'click #updateitem'() {
  const newitemname = $('#itemname').val();
  const newcondition=$('#condition :selected').text();
  const newcategory=$('#category :selected').val();
  const newdescription=$('#description').val();
  const newprice=$('#price').val();
  id = Meteor.userId();
  var newproductinfo =
  {
    itemname:newitemname,
    price:newprice,
    condition:newcondition,
    category:newcategory,
    description:newdescription,
    createdAt:new Date(),
    owner:Meteor.userId()
  }
    console.dir(this);
    Meteor.call('product.update',newproductinfo);
  }
})
