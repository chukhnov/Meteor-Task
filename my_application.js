if (Meteor.isClient) {

    //REGISTER
    Template.register.events({
        'submit form': function (event) {
            event.preventDefault();
            var username = $('[name=username]').val();
            var password = $('[name=password]').val();

            Accounts.createUser({
                username: username,
                password: password

            }, function (error) {
                if (error) {
                    console.log(error.reason);
                } else {
                    Router.go("login");
                }
            });

        }
    });

    //LOGIN
    Template.login.events({
        'submit form': function (event) {
            event.preventDefault();
            var username = $('[name=username]').val();
            var password = $('[name=password]').val();

            Meteor.loginWithPassword(username, password, function (error) {
                if (error) {
                    console.log(error.reason);
                } else {
                    !!Meteor.user({username: 'admin'}) ?
                        Router.go("admin")
                        : Router.go("dashboard");

                }
            });
        }
    });
    Template.admin.helpers({
        isLoggedInAdmin: function () {
            return Meteor.user().username == 'admin'
        },

        createCalendar: function () {
             calendar = [{
                status: true,
                owner: "Mike"
            },{
                status: true,
                owner: "Mike"
            }];
            //var begin = moment().startOf('week');
            //var endOfWeek = moment().endOf('week').add(1, 'day');
            //
            //while (!endOfWeek.isSame(begin, 'day')) {
            //    calendar.push[begin.format('l')] = {
            //        status: false,
            //        owners: []
            //    };
            //    begin.add(1, 'day')
            //}
            return calendar
        }

    });

    Template.dashboard.helpers({
        isLoggedInUser: function () {
            return Meteor.user().username !== 'admin';
        }
    });


    //LOGOUT USER
    Template.dashboard.events({
        'click #logout': function (event) {
            event.preventDefault();
            Meteor.logout();
            Router.go("/");
        }
    });
    //LOGOUT ADMIN
    Template.admin.events({
        'click #logout': function (event) {
            event.preventDefault();
            Meteor.logout();
            Router.go("/");
        }
    });

}

if (Meteor.isServer) {
    Meteor.startup(function () {

    });
}


//ROUTES
Router.route('/dashboard');
Router.route('/admin');
Router.route('/register');
Router.route('/login');
Router.route('/', {
    template: 'login'
});


var calendar = {};
var begin = moment().startOf('week');
var endOfWeek = moment().endOf('week').add(1, 'day');

while (!endOfWeek.isSame(begin, 'day')) {
    calendar[begin.format('l')] = {
        status: false,
        owners: []
    };
    begin.add(1, 'day')
}