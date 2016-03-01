Template.login.events({
    'submit form': function (event) {
        event.preventDefault();
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();

        Meteor.loginWithPassword(username, password, function () {
            if (Meteor.user().username == 'admin') {
                Router.go("admin")
            } else if (Meteor.user().username !== 'admin') {
                Router.go("dashboard");
            }
        });
    }
});
