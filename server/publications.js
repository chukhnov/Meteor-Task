Meteor.publish("directory", function () {
    return Meteor.users.find();
});