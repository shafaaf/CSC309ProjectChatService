function clickSubmit() {
  var firstName = ($('#profile-form').find('input[name=first_name]')).val();
  var lastName = ($('#profile-form').find('input[name=last_name]')).val();
  var subject = ($('#profile-form').find('input[name=subject]')).val();
  console.log(firstName, lastName, subject);
}
