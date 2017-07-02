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

    Product.insert({
      itemname:itemname,
      price:price,
      condition:condition,
      category:category,
      description:description,
      createdAt:new Date(),
      owner:Meteor.userId()
    });
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
    return (this.product.owner == Meteor.userId())}
})
Template.productrow.events({
  'click span'(elt,instance){
    console.dir(this);
    console.log(this);
    console.log(this.product._id);
    Meteor.call('item.remove',this.product);
  //   if (this.person.owner==Meteor.userId()){
  //     People.remove(this.person._id);
  // }else {
  //   alert("You are not allowed to delete this information");
  // }
}
})
