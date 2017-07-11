Template.about.onRendered(function(){
  console.log("the user wants" + Router.current().params.query.type);
  //window.location.hash = "";
  window.location.hash = "#"+Router.current().params.hash;
  Products.find({type: Router.current().params.query.type});
})
