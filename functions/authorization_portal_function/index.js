const catalyst = require('zcatalyst-sdk-node')
// const express = require('express');
// const app = express();
module.exports = (context, basicIO) => {

  console.log("1234");
  const catalystApp = catalyst.initialize(context)
  const requestDetails = catalystApp.userManagement().getSignupValidationRequest(basicIO)
  if (requestDetails) {
    if (requestDetails.user_details.email_id.includes('@zylker.com')) {
      // The actions that occur in the event of a successful authentication can be customized
      basicIO.write(JSON.stringify({
        status: 'success',
        user_details:
             {
               first_name: requestDetails.user_details.first_name,
               last_name: requestDetails.user_details.last_name,
               email_id: requestDetails.user_details.email_id,
               role_identifier: 'App User', // If you want to override the default role, you can specify the role id/name here.
               org_id: '' // If you are providing the Org ID, make sure it is copied exactly from the console.
             }
             
      }))
    } else {
      // The user has failed authentication
      basicIO.write(JSON.stringify({
        status: 'failure'
      }))
    }
  }
  console.log("432");
  context.close()
}

// app.listen(port, async () => {
   
//   console.log(`Server running on http://localhost: 3002`);
// });
