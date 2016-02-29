Meteor.subscribe('members');


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
    },
    adminFindUsers: function () {
        console.log(Members.find().collection._docs._map)
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
        Session.set('currentDay', day);
        console.log(Session.get('currentDay'));
    }
});
