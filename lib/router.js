Router.configure({
	layoutTemplate: 'main',
});

Router.route('/', {name: 'home'});
Router.route('createinfo');
Router.route('contact');
Router.route('about');
Router.route('users');
Router.route('items');
Router.route('singleitem/:itemname',
 {name:"singleitem",
  data: function(){
 	 const c = Product.findOne({itemname:this.params.itemname});
 	 return c;
  }});
