$.ajax({
  url: '\/getprofile',
  method: 'GET',
}).done(function(jsondata) {
  console.log(jsondata);
});
