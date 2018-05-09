validateUser = function(user) {
	check(user["username"], String);
	var errors = { };
	if (!user.email)
		errors.email = "Please enter you email";
	if (!user.username)
		errors.username = "Please enter a username";
	if (user["password"].length < 6)
		errors.password = "Please ensure your password is 6 characters or longer";

	return errors;
}
validateEmail = function(email) {
	var errors = { };
	if (!email)
		errors.email = "Please fill in your recovery Email";
}