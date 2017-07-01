Meteor.methods({
  'users.insert':function(user){
    AllUsers.insert(user);
  },
})
