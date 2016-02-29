Meteor.methods({
    register: function (user) {
        Accounts.createUser({
            username: user.username,
            password: user.password,
            profile: {
                type: User.ROLE_USER
            }
        })
    }
});