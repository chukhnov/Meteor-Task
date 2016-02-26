Members = new Mongo.Collection("members");
Days = new Mongo.Collection("days");


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

            Meteor.loginWithPassword(username, password, function () {
                Meteor.call("createDaySchema");
                if (Meteor.user().username == 'admin') {
                    Router.go("admin")
                } else if (Meteor.user().username !== 'admin') {
                    Router.go("dashboard");
                }
            });
        }
    });
    Template.admin.helpers({
        isLoggedInAdmin: function () {
            return Meteor.user().username == 'admin'
        },

        createCalendar: function () {
            var calendar = [];
            var begin = moment().startOf('week');
            var endOfWeek = moment().endOf('week').add(1, 'day');

            while (!endOfWeek.isSame(begin, 'day')) {
                calendar.push(begin.format('l'));
                begin.add(1, 'day')
            }
            return calendar
        }

    });

    Template.dashboard.helpers({
        isLoggedInUser: function () {
            return !!Meteor.user();
        },

        createCalendar: function () {
            var item = Members.findOne(Meteor.userId());
            delete item.days[0];
            var calendar = [];
            var calendarOther = [];
            var begin, endOfWeek;
            
            var days = Session.get('startWeek');

            if (days == 0 || days == undefined) {
                begin = moment().startOf('week');
                endOfWeek = moment().endOf('week').add(1, 'day');
            } else{
                begin = moment().startOf('week').add(days, 'day');
                endOfWeek = moment().endOf('week').add(days +1, 'day');
            }


            while (!endOfWeek.isSame(begin, 'day')) {
                calendarOther.push({
                    day: begin.format('l'),
                    status: false,
                    className: "btn btn-default btn-lg"

            });
                calendar.push(begin.format('l'));
                begin.add(1, 'day')
            }
            Object.keys(calendarOther).map((i) => (
                Object.keys(item.days).map((key) => (
                    calendarOther[i].day == item.days[key].day ?
                        calendarOther[i].className = "btn btn-primary btn-lg" : null
                ))
            ));
            return calendarOther

        }
    });


    Template.dashboard.events({
        'click #logout': function (event) {
            event.preventDefault();
            Meteor.logout();
            Router.go("/");
        },
        'click #day': function (event) {
            event.preventDefault();
            var day = event.currentTarget.value;
            Meteor.call("addDay", day);
        },
        'click #nextWeek': function () {
            Session.get('startWeek') == undefined ? Session.set('startWeek', 0) : null;
            var start = Session.get('startWeek');
            return Session.set('startWeek', start + 7)
        },
        'click #previousWeek': function () {
            Session.get('startWeek') == undefined ? Session.set('startWeek', 0) : null;
            var start = Session.get('startWeek');
            return Session.set('startWeek', start - 7)
        }
    });


    Template.admin.events({
        'click #logout': function (event) {
            event.preventDefault();
            Meteor.logout();
            Router.go("/");
        },
        'click #day': function (event) {
            event.preventDefault();
            console.log(event.currentTarget.value);
            var day = event.currentTarget.value;
            Meteor.call("addDay", day);
        }
    });

}


Meteor.methods({
    addDay: function (day) {
        var item = Members.findOne(Meteor.userId());

        for (var i = 0; i < item.days.length; i++) {

            if (day == item.days[i].day) {
                Members.update({_id: Meteor.userId()},
                    {$pull: {days: {day: day, status: true}}});
                break
            } else if (day !== item.days[i].day) {
                Members.update({_id: Meteor.userId()},
                    {$addToSet: {days: {day: day, status: true}}},
                    {upsert: true})
            }
        }

    },

    createDaySchema: function () {
        Members.update({_id: Meteor.userId()},
            {$addToSet: {days: {day: null, status: false}}},
            {upsert: true})
    }
});


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