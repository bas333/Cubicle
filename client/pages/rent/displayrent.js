Template.showrent.helpers({
  rentlist() {return Rent.find()},
})

Template.rentrow.helpers({
  isOwner() {console.dir(this);
    return this.rent.owner == Meteor.userId();
  },
  hasPic1(product){
    if(product.pic1!=undefined){
      return true;
    }else{
      return false;
    }
  }
})

Template.rentrow.events({
  'click #delete':function(elt,instance) {
    console.log("remove");
    Meteor.call('rent.remove',this.rent);
  },
  'click #editHouseOwner':function(elt,instance){
    console.log("edit owner");
    $("#newOwner").css("display","block");
    $("#owneredit").css("display","none");
  },
  'click #cancleOwner':function(elt,instance){
    $("#newOwner").css("display","none");
      $("#owneredit").css("display","block");
  },
  'click #cancleLocation':function(elt,instance){
    $("#newLocation").css("display","none");
  },
  'click #cancleStreet':function(elt,instance){
    $("#newStreet").css("display","none");
  },
  'click #updateLocation':function(elt,instance){
    const loc=instance.$('#locationUpdate').val();
    Meteor.call('rentLocation.update',this.rent._id,loc);
    instance.$('#locationUpdate').val("");
    $("#newLocation").css("display","none");
  },
  'click #updateStreet':function(elt,instance){
    const street=instance.$('streetUpdate').val();
    Meteor.call('rentStreet.update',this.rent._id,street);
    instance.$('streetUpdate').val("");
    $("#newStreet").css("display","none");
  }
})
