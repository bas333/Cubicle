Template.rentsearch.helpers({
  filteredrentlist() {return Rent.find().fetch()},
})

Template.rentsearch.onRendered(function(){
  console.log("the user wants a house in" + Router.current().params.query.location);
  console.log("the price should be " + Router.current().params.query.price);
  console.log("available time are " + Router.current().params.query.start + "to" + Router.current().params.query.end);
  console.log("the facilities are " + Router.current().params.query.facilities);
})
