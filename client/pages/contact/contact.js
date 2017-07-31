Template.contact.events({
  'click #submitopinion' (elt,instance) {
    var op = instance.$('#opinionfield').text();
    Meteor.call('opinion.insert', op);
  }
})
