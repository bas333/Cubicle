Router.configure({
	layoutTemplate: 'main',
});

Router.route('/', {name: 'home'});
Router.route('createinfo');
Router.route('contact');
Router.route('about');
Router.route('users');
Router.route('shop',
	{ waitOn: function(){
		return Meteor.subscribe('shop_products', Router.current().params.query.type);
	}});
Router.route('itempage');
Router.route('createrent');
Router.route('displayrent');
Router.route('login');
Router.route('singleitem/:itemname',
 {name:"singleitem",
  data: function(){
 	 const c = Product.findOne({itemname:this.params.itemname});
 	 return c;
  }});
