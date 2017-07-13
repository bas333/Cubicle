Template.home.helpers ({
  productlist() {return Product.find()},
})

Template.home.events ({
  'click .shop' (elt,instance){
    var selectedcategory = instance.$('#category :selected').text();
    var searchstring = instance.$('#searchbox').val();
    console.log(Product.find());
    if (selectedcategory == "All Categories") {
      console.log("Are You here " + selectedcategory);
      Router.go("allproducts");
    } else {
      Router.go("shop", {}, {query:'type='+selectedcategory+'&keywords='+searchstring});
    }
  },
})
