Template.addrent.events({
  'click button'(elt,instance){
    // type = instance.$('#housetype').is(':checked').val();
    const location = instance.$('#location').val();
    const time = instance.$('#time').val();
    const roomsize = instance.$('#roomsize').val();
    const facilities = instance.$('#facilities').val();
    const detaileddescription = instance.$('#detailed-description').val();
    const roommatedescription = instance.$('#roommate-description').val();
    const price = instance.$('#price').val();
    const contact = instance.$('#contact-information').val();
    console.log("adding " + location);
    var rentpost =
    { location:location,
      time:time,
      roomsize:roomsize,
      detailed:detaileddescription,
      roommate:roommatedescription,
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
