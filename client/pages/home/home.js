Template.home.helpers ({
  productlist() {return Product.find()},
})

Template.home.events ({
  'click button' (elt,instance){
    var selectedcategory = instance.$('#category :selected').text();
    console.log(selectedcategory);
    console.log(Product.find());
    Router.go("shop", {}, {query:'type='+selectedcategory});
  },
})
