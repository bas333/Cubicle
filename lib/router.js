Router.configure({
	layoutTemplate: 'main',
});

Router.route('/', {name: 'home'});
Router.route('createinfo', {
	waitOn: function(){
		Meteor.subscribe('info_allproducts');
	}
});
Router.route('contact');
Router.route('testing');
Router.route('about');
Router.route('shop',
	{ waitOn: function(){
		return Meteor.subscribe('shop_products', Router.current().params.query.type, Router.current().params.query.keywords);
		console.log("current input is " + Router.shop.searchstring);
		console.log("current type is " + Router.current().params.query.type);
	}});
Router.route('users', {
	waitOn: function(){
		return Meteor.subscribe("allusers");
	}
});
Router.route('itempage');
Router.route('createrent');
Router.route('displayrent',{
	waitOn:function(){
		return Meteor.subscribe("rent");
	}
});
Router.route('login');
Router.route('singleitem/:itemname',
 {name:"singleitem",
  data: function(){
 	 const c = Product.findOne({itemname:this.params.itemname});
 	 return c;
  }});
	Router.route('allproducts', {
		waitOn: function(){
				Meteor.subscribe('info_allproducts');
		}
	});
