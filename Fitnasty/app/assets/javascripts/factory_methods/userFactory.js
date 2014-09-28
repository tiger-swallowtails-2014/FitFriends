var userHolder = {
  users: [],
  addUser: function(user) {
    this.users.push(user)
  }
}

// user Factory
var UserFactory = (function(holder) {

  return {
    createUsers: function(arrayOfUsers) {
      for (var i = 0; i < arrayOfUsers.length; i++) {
        user = new User(arrayOfUsers[i])
        holder.addUser(user)
      }
    }
  }
})(userHolder);