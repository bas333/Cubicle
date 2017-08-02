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
		Meteor.subscribe('reply');
	}
})
Router.route('postforum',{
	waitOn:function(){
		Meteor.subscribe('forum');
		Meteor.subscribe('allusers');
		Meteor.subscribe('reply');
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
		return [Meteor.subscribe('shop_products', Router.current().params.query.type, Router.current().params.query.keywords),Meteor.subscribe('allusers')];
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
Router.route('itempage', {
	waitOn:function() {
		return Meteor.subscribe('product');
	}
});

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
	{ name:"singleitem",
		data: function(){
			Meteor.subscribe('product');
			Meteor.subscribe('chat');
			Meteor.subscribe('allusers');
			const c = Product.findOne({itemname:this.params.itemname});
			return c;
	}},
);
Router.route('rentpost/:_id',
	{name:"rentpost",
	data: function(){
		Meteor.subscribe('rent');
		Meteor.subscribe('allusers');
		const c = Rent.findOne({_id:this.params._id});
		console.log(c);
		return c;
	}
}
);
Router.route('rentsearch', {
	waitOn: function() {
	return Meteor.subscribe('rent_search',Router.current().params.query.location, Router.current().params.query.price, Router.current().params.query.rentstart, Router.current().params.query.rentend, Router.current().params.query.rentfacility);
	}
});
Router.route('allproducts', {
		waitOn: function(){
			Meteor.subscribe('allusers');
			if (Router.current().params.query.keywords === undefined) {
					Meteor.subscribe('info_allproducts_null');
			} else{
				  Meteor.subscribe('info_allproducts',Router.current().params.query.keywords);
			}
		}
	});
