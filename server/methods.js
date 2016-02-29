Members = new Mongo.Collection("members");


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