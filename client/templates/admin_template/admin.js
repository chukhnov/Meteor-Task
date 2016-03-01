Meteor.subscribe('directory');

Template.admin.rendered = function(){
    var d = document.getElementById("day");
    console.log(d.value)
};

Template.admin.helpers({
    isLoggedInAdmin: function () {
        return Meteor.user().username == 'admin'
    },
    usersWhoAdded: function () {
        let day = Session.get('adminClickedDay');
        return Meteor.users.find({"profile.days.day": {$in: [day]}}).fetch()
    },
    usersWhoRemoved: function () {
        let day = Session.get('adminClickedDay');
        return Meteor.users.find({"profile.days.day": {$nin: [day]}}).fetch()
    },

    days() {
        const
            startWeek = Session.get('startWeek') || 0,
            beginOfWeek = moment().startOf('week').add(startWeek, 'day'),
            endOfWeek = moment().endOf('week').add(startWeek, 'day'),
            range = moment().range(beginOfWeek, endOfWeek);
        let days = [];
        range.by('day', function (day) {
            const currentDay = day.format('l');
            days.push(currentDay)
        });
        return days
    }

});

Template.admin.events({
    'click #logout': function (event) {
        event.preventDefault();
        Meteor.logout();
        Router.go("/");
    },
    'click #day': function (event) {
        let day = event.currentTarget.value;
        Session.set('adminClickedDay', day);
    },
    'click #nextWeek': function () {
        Session.get('startWeek') == undefined ? Session.set('startWeek', 0) : null;
        let start = Session.get('startWeek');
        return Session.set('startWeek', start + 7)
    },
    'click #previousWeek': function () {
        Session.get('startWeek') == undefined ? Session.set('startWeek', 0) : null;
        let start = Session.get('startWeek');
        return Session.set('startWeek', start - 7)
    },
    'click #removeCurrentDayFromUser': function (event) {
        let id = event.target.value,
            day = Session.get('adminClickedDay');
        Meteor.call("removeDayFromUser", id, day);
    },
    'click #addCurrentDayToUser': function (event) {
        let id = event.target.value,
            day = Session.get('adminClickedDay');
        Meteor.call("addDayToUser", id, day);
    }
});
