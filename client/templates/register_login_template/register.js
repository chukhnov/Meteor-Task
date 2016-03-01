Template.register.events({
    'submit form': function (event) {
        event.preventDefault();
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();

        // Meteor.call("register", username, password);
        
        
        Accounts.createUser({
            username: username,
            password: password,
            profile: {
                role: 2,
                days:["initial"]
            }
        }, function (error) {
            if (error) {
                console.log(error.reason);
            } else {
                Router.go("login");
            }
        });

    }
});