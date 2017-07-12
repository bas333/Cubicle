if(Meteor.isClient){
    Template.addproduct.onCreated(function(){
      Meteor.subscribe('product');
    });
    Template.showproduct.onCreated(function(){
      Meteor.subscribe('product');
    });
}
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
Template.ownerproduct.events({
  'click span'(elt,instance){
    console.dir(this);
    console.log(this);
    console.log(this.p._id);
    Meteor.call('product.remove',this.p);
},

'click #updateitem'(event, instance) {
  const product_id = this.p._id;
  const newitemname = $('#newitemname_'+product_id).val();;
  const newcondition=$('#newcondition :selected').text();

  const newcategory=instance.$('#newcategory :selected').val();
  const newdescription=instance.$('#newdescription').val();
  const newprice=instance.$('#newprice').val();

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
    console.log(this.p);
    console.dir(this);
    Meteor.call('product.update',product_id,newproductinfo);
  },
  'click #enableedit'(event,instance){
    const newcategory=instance.$('#newcategory').val(this.p.category);
    const newcondition=instance.$('#newcondition').val(this.p.condition);
    console.log(newcategory);
  }
})
