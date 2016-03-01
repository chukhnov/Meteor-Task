Meteor.methods({
    addDay: function (currentDay) {
        const item = Meteor.users.findOne(Meteor.userId());
        for (var i = 0; i < item.profile.days.length; i++) {
            if (currentDay == item.profile.days[i].day) {
                Meteor.users.update(
                    {_id: Meteor.userId()},
                    {$pull: {"profile.days": {day: currentDay, status: true}}});
                break
            } else if (currentDay !== item.profile.days[i].day || undefined) {
                Meteor.users.update(
                    {_id: Meteor.userId()},
                    {$addToSet: {"profile.days": {day: currentDay, status: true}}});
            }
            
        }
    },
    removeDayFromUser: function (id,day) {
        Meteor.users.update(
            {_id: id},
            {$pull: {"profile.days": {day: day, status: true}}});
    },
    addDayToUser: function (id,day) {
        Meteor.users.update(
            {_id: id},
            {$addToSet: {"profile.days": {day: day, status: true}}});
    }
});