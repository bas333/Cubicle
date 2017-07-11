Template.addrent.events({
  'click button'(elt,instance){
    // type = instance.$('#housetype').is(':checked').val();
    const location = instance.$('#location').val();
    const time = instance.$('#time').val();
    const roomsize = instance.$('#roomsize').val();
    const facilities = instance.$('#facilities').val();
    const detailed = instance.$('#detaileddescription').val();
    const roommate = instance.$('#roommatedescription').val();
    const price = instance.$('#price').val();
    const contact = instance.$('#contact-information').val();
    console.log("adding " + location);
    instance.$('#location').val("");
    instance.$('#time').val("");
    instance.$('#roomsize').val("");
    instance.$('#facilities').val("");
    instance.$('#detailed-description').val("");
    instance.$('#roommate-description').val("");
    instance.$('#price').val("");
    instance.$('#contact-information').val("");
    var rentpost =
    { location:location,
      time:time,
      roomsize:roomsize,
      facilities:facilities,
      detailed:detailed,
      roommate:roommate,
      price:price,
      contact:contact,
      createdAt: new Date(),
      owner: Meteor.userId()
    };

    Meteor.call('rent.insert',rentpost,
        (err, res) => {
          if (err) {
            alert("Failed to add your rental post");
          } else {
            alert("Successfully added your rental post");
          }
        }
    );
  },
})
Template.addrent.helpers({
  locationdata(){
    return location;
  },

})

const location=[
  {name:"Waltham"},
  {name:"Watertown"},
  {name:"Newton"},
  {name:"Cambridge"},
  {name:"Boston"},
  {name:"Brookline"},
  {name:"Somerville"},
  {name:"Malden"},
]
