Template.register.events({
    'submit form': function (event) {
        event.preventDefault();
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();

        Accounts.createUser({
            username: username,
            password: password,
            profile: {
                role: 2
            },
            adsfasdf:'dsasdf'

        }, function (error) {
            if (error) {
                console.log(error.reason);
            } else {
                Router.go("login");
            }
        });

    }
});