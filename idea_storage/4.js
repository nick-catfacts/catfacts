 <!-- <% if (errors) { %>
        each error in errors
          div.alert.alert-danger
            span #{error.error}
      if saved
        div.alert.alert-success
          span Your profile has been saved -->



var collectFormErrors = require('express-stormpath/lib/helpers').collectFormErrors;

  //   res.redirect(req.baseUrl);
  // } else {
  //   res.redirect(req.baseUrl);
  // }


// The form library calls this success method if the
// form is being POSTED and does not have errors
var success_function = function (form, user){

  // The express-stormpath library will populate req.user,
  // all we have to do is set the properties that we care
  // about and then cal; save() on the user object:
  user.givenName = form.data.givenName;
  user.surname = form.data.surname;
  user.customData.streetAddress = form.data.streetAddress;
  user.customData.city = form.data.city;
  user.customData.state = form.data.state;
  user.customData.zip = form.data.zip;
  user.customData.save();
  user.save(function(err){
  //   if(err){
  //     if(err.developerMessage){
  //       console.error(err);
  //     }
  //     renderForm(req,res,{
  //       errors: [{
  //         error: err.userMessage ||
  //         err.message || String(err)
  //       }]
  //     });
  //   }else{
  //     renderForm(req,res,{
  //       saved:true
  //     });
  //   }
  // });
};



var error_function = function(form){
        // The form library calls this method if the form
        // has validation errors.  We will collect the errors
        // and render the form again, showing the errors
        // to the user
        // renderForm(req,res,{
        //   errors: collectFormErrors(form)
        // });
      }


var empty_function =  function(){
        // The form library calls this method if the
        // method is GET - thus we just need to render
        // the form
        // renderForm(req,res);
      };






