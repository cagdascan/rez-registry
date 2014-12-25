var uploader = new Slingshot.Upload("myFileUploads");


Template.inputForm.events({
  'click #uploadButton': function () {
    var dataurl = $('#imgcrop').attr('src');
    var file = new File([dataurl], "image.jpeg", {type: 'image/jpeg'});
    // var file = new File(["lols"], "filename.txt", {type: "text/plain"})
    var reader = new FileReader();
    reader.readAsDataURL(file);
    uploader.send(file, function (error, downloadUrl) {
      if (error) {
        console.log('file: ' + file.name);
        console.log(error);
      } else {
        console.log(downloadUrl);
      }
    });
  },
  'click #cropButton': function () {
    var croppedImage = $('#imgsrc').cropper("getDataURL", "image/jpeg");
    $('#imgcrop').attr('src', croppedImage);
  }
});




// Template.inputForm.helpers({
//   'selectedImage': function () {
//     return Session.get('image');
//   }
// })


// Tracker.autorun(function () {
//   if (document.getElementById('file') !=null) {
//     var img = document.getElementById('file').files[0].name;
//     Session.set('image', img);
//   }
// })
