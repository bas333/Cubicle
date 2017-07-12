Template.showproduct.helpers({
  productlist() {return Product.find()},
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

Template.createinfo.onCreated(function(){
  Meteor.subscribe('info_allproducts');
});

Template.productrow.helpers({
  isOwner(){
    return (this.product.owner == Meteor.userId())}
})
Template.productrow.events({
  'click span'(elt,instance){
    console.dir(this);
    console.log(this);
    console.log(this.product._id);
    Meteor.call('product.remove',this.product);
  //   if (this.person.owner==Meteor.userId()){
  //     People.remove(this.person._id);
  // }else {
  //   alert("You are not allowed to delete this information");
  // }
},

'click button'() {
  // console.dir(this);
  // console.log(this.person._id);
  // const name = $('#name').val();
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
