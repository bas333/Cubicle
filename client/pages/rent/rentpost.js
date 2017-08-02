Template.rentpost.helpers({
  hasPic1(){
    if(this.pic1!=undefined){
      return true;
    }else{
      return false;
    }
  },
  hasPic2(){
    if(this.pic2!=undefined){
      return true;
    }else{
      return false;
    }
  },
  hasPic3(){
    if(this.pic3!=undefined){
      return true;
    }else{
      return false;
    }
  }
})
if(Meteor.isClient){
    Template.rentpost.onCreated(function(){
      Meteor.subscribe('rent');
    })
    Template.singleitem.onCreated(function(){
      Meteor.subscribe('allusers');
    })
}
