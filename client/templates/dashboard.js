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