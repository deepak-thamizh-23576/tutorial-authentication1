async function signupAction() {
  //Get the details of the user from the HTML page
  const firstName = document.getElementById("firstname").value
  const lastName = document.getElementById("lastname").value
  const email = document.getElementById("mailid").value

  const data = {
    first_name: firstName,
    last_name: lastName,
    email_id: email,
    platform_type: "web",
  }

  const auth = catalyst.auth
  //The signup method will sign up the user with the specified data
  const signupresponse = await auth.signUp(data)

  if (signupresponse.status === 200) {
    document.body.innerHTML =
      "An account verification email has been sent to your email address"
    setTimeout(() => {
      location.reload()
    }, 5000)
  } else {
    alert(signupresponse.message)
    location.reload()
  }
}

async function showProfile() {
  //The catalyst.auth.isUserAuthenticated() method allows only authenticated users, i.e., the users who are logged in, to access the pages
  try {
    const result = await catalyst.auth.isUserAuthenticated()

    document.getElementById("fname").innerHTML =
      "First Name: " + result.content.first_name
    document.getElementById("lname").innerHTML =
      "Last Name: " + result.content.last_name
    document.getElementById("mailid").innerHTML =
      "Email Address: " + result.content.email_id
    document.getElementById("tzone").innerHTML =
      "Time Zone: " + result.content.time_zone
    document.getElementById("ctime").innerHTML =
      "Joined On: " + result.content.created_time

    document.getElementById("profile").style.display = "block"
  } catch (err) {
    document.body.innerHTML =
      "You are not logged in. Please log in to continue."
  }
}

function logout() {
  //The signOut method is used to sign the user out of the application
  const redirectURL = "/"
  catalyst.auth.signOut(redirectURL)
}

function showDiv() {
  document.getElementById("login").style.display = "none"
  document.getElementById("signup").style.display = "block"
  document.getElementById("buttons").style.display = "none"
}
