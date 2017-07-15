Template.salehistory.helpers({
  soldlist(){
    var user=AllUsers.findOne({owner:Meteor.userId()});
    var soldhistory=user.soldhistory;

    return soldhistory;
  }
})
