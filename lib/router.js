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
		var searchcriteria =
		{
			location: Router.current().params.query.location,
			price: Router.current().params.query.price,
			startdate: Router.current().params.query.rentdatestart,
			startmonth: Router.current().params.query.rentmonthstart,
			startyear: Router.current().params.query.rentyearstart,
			enddate: Router.current().params.query.rentdateend,
			endmonth: Router.current().params.query.rentmonthend,
			endyear: Router.current().params.query.rentyearend,
			facilities: Router.current().params.query.facilities
		};
		return Meteor.subscribe('rent_search', searchcriteria);
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
