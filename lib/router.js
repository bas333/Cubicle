Router.configure({
	layoutTemplate: 'main',
});

Router.route('/', {name: 'home'});
Router.route('createinfo', {
	waitOn: function(){
		Meteor.subscribe('product');
	}
});
Router.route('forum',{
	waitOn:function(){
		Meteor.subscribe('forum');
		Meteor.subscribe('allusers');
	}
})
Router.route('postforum',{
	waitOn:function(){
		Meteor.subscribe('forum');
		Meteor.subscribe('allusers');
	}
})
Router.route('contact');
Router.route('testing');
Router.route('about');
Router.route('shop',
	{
		waitOn: function(){
		console.log("current input is " + Router.current().params.query.keywords);
		console.log("current type is " + Router.current().params.query.type);
		return Meteor.subscribe('shop_products', Router.current().params.query.type, Router.current().params.query.keywords);
	}});
Router.route('users', {
	waitOn: function(){
		return Meteor.subscribe("allusers");
	}
});
Router.route('chatroom',{
	waitOn: function(){
		return [Meteor.subscribe("allusers"),Meteor.subscribe('chat')];
	}
});
Router.route('itempage');
Router.route('createrent',{
	waitOn:function(){
		return Meteor.subscribe("rent");
	}
});
Router.route('mycart',{
	waitOn: function(){
		return [Meteor.subscribe("allusers"),Meteor.subscribe('product')];
	}
});
Router.route('salehistory',{
waitOn: function(){
	return [Meteor.subscribe("allusers"),Meteor.subscribe('product')];
}
});

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
 }}
);

Router.route('rentsearch', {
	waitOn: function() {
		return Meteor.subscribe('rent_search', Router.current().params.query.location, Router.current().params.query.price, Router.current().params.query.start, Router.current().params.query.end, Router.current().params.query.facilities);
	}
});
Router.route('allproducts', {
		waitOn: function(){
			if (Router.current().params.query.keywords === undefined) {
					Meteor.subscribe('info_allproducts_null');
			} else{
				  Meteor.subscribe('info_allproducts',Router.current().params.query.keywords);
			}
		}
	});
