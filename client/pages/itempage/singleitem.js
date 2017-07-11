import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {ReactiveDict}from 'meteor/reactive-dict';
//
// Template.singleitem.events({
//   'click #editItem'(elt,instance){
//     console.log("here");
//     $("#myModal").modal('show');
//   }
// })
Template.singleitem.onCreated(function(){
  this.dictionary = new ReactiveDict();
  this.dictionary.set("showEditField",false);
})
Template.singleitem.helpers({
  showEditField: function(){
    return Template.instance().dictionary.get("showEditField");
  }
})
Template.singleitem.events({
    'click span'(elt,instance){
      Meteor.call('product.remove',this.p);
    },
    'click #enableEdit'(event,template){
       template.dictionary.set("showEditField",true);
    },
     'click #finishEdit'(elt,template){
      const item_id = this._id;
      const newinput = instance.$('#edititem').val();
      Meteor.call('product.edit',item_id,newinput);
      template.dictionary.set("showEditField",false);
    }
})
