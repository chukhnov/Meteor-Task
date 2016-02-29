Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/dashboard');
Router.route('/admin');
Router.route('/register');
Router.route('/login');
Router.route('/', {
    template: 'login'
});