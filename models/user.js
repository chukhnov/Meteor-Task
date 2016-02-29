class User {

    constructor(doc) {
        Object.keys(doc).forEach(key => this[key] = doc[key])
    }

    isAdmin() {
        return this.profile.role == User.ROLE_ADMIN
    }

    isUser() {
        return this.profile.role == User.ROLE_USER
    }
}


User.ROLE_ADMIN = 1;
User.ROLE_USER  = 0;