Meteor.subscribe('members');


Template.dashboard.helpers({
    isLoggedInUser: function () {
        return !!Meteor.user();
    },

    days() {
        const
            startWeek = Session.get('startWeek') || 0,
            beginOfWeek = moment().startOf('week').add(startWeek, 'day'),
            endOfWeek = moment().endOf('week').add(startWeek, 'day'),
            range = moment().range(beginOfWeek, endOfWeek),
            user = Members.findOne(Meteor.userId());
        let days = [];
        range.by('day', function (day) {
            const
                currentDay = day.format('l'),
                found = user.days.find(item => item.day == currentDay);
            days.push({
                day: currentDay,
                status: !!found,
                className: found ? 'btn btn-primary btn-lg' : "btn btn-default btn-lg"
            })
        });
        return days
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