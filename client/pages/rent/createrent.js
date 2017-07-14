Template.addrent.events({
  'click #submitrent'(elt,instance){
    const location = instance.$('#location').val();
    const street = instance.$('#street-address').val();
    const time = instance.$('#time').val();
    const roomsize = instance.$('#roomsize').val();
    const facilities = instance.$('#facilities').val();
    const detailed = instance.$('#detaileddescription').val();
    const roommate = instance.$('#roommatedescription').val();
    const price = instance.$('#price').val();
    const contact = instance.$('#contact-information').val();
    console.log("adding " + location);
    instance.$('#location').val("");
    instance.$('#street-address').val("");
    instance.$('#time').val("");
    instance.$('#roomsize').val("");
    instance.$('#facilities').val("");
    instance.$('#detaileddescription').val("");
    instance.$('#roommatedescription').val("");
    instance.$('#price').val("");
    instance.$('#contact-information').val("");
    var rentpost =
    { location:location,
      street:street,
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
Template.ownpostrow.helpers({
  isOwner(){
    console.dir(this);
    console.log(this);
    return this.rent.owner==Meteor.userId();
  },
  locationdata(){
    return location;
  },
})

Template.ownpostrow.events({
  'click #deleteRent':function(elt,instance){
    Meteor.call('rent.remove',this.rent);
  },
  'click #updateRent':function(elt,instance){
    const rent_id = this.rent._id;
    const newLocation=instance.$("#newlocation").val();
    const newStreet=instance.$("#newstreet").val();
    const newTime=instance.$("#newtime").val();
    const newRoomSize=instance.$("#newsize").val();
    const newFacilities=instance.$("#newfacilities").val();
    const newDetail=instance.$("#newdetail").val();
    const newRoommate=instance.$("#newroommate").val();
    const newPrice=instance.$("#newprice").val();
    const newContact=instance.$("#newcontact").val();
    var newRent={
      location:newLocation,
      street:newStreet,
      time:newTime,
      roomsize:newRoomSize,
      facilities:newFacilities,
      detailed:newDetail,
      roommate:newRoommate,
      price:newPrice,
      contact:newContact,
    }
    Meteor.call('rent.update',rent_id,newRent);
  }
})


Template.showOwnPost.helpers({
  rentlist() {return Rent.find()},
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
