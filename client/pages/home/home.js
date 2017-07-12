Template.home.helpers ({
  productlist() {return Product.find()},
})

Template.home.events ({
  'click button' (elt,instance){
    var selectedcategory = instance.$('#category :selected').text();
    console.log(Product.find());
    if (selectedcategory == "All Categories") {
      console.log("Are You here " + selectedcategory);
      Router.go("allproducts");
    } else {
      Router.go("shop", {}, {query:'type='+selectedcategory});
    }
  },
})
