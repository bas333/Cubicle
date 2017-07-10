Template.showrent.helpers({
  rentlist() {return Rent.find()},
})

Template.rentrow.helpers({
  isOwner() {console.dir(this);
    return this.rent.owner == Meteor.userId()}
})

Template.rentrow.events({
  'click button'(elt,instance) {
    console.log("remove");
    Meteor.call('rent.remove',this.rent);
  }
})
