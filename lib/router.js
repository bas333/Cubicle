Router.configure({
	layoutTemplate: 'main',
});

Router.route('/', {name: 'home'});
Router.route('createinfo');
Router.route('contact');
Router.route('about');
Router.route('users')
