Router.configure({
	layoutTemplate: 'main',
});

Router.route('/', {name: 'home'});
Router.route('createinfo');
Router.route('contact');
Router.route('about');
Router.route('users');
Router.route('shop');
Router.route('itempage');
Router.route('createrent');
Router.route('displayrent');
Router.route('login');
Router.route('allproducts');
Router.route('singleitem/:itemname',
 {name:"singleitem",
  data: function(){
 	 const c = Product.findOne({itemname:this.params.itemname});
 	 return c;
}});
