Template.inputForm.rendered = function () {
  // loadFilePicker('AmSUZxOXPQYKS06ofWxF9z');
};

Template.inputForm.events({

  // upload cropped image to s3 hopefully
  'click #uploadButton': function () {
    filepicker.setKey("AmSUZxOXPQYKS06ofWxF9z");

    filepicker.pickAndStore(
      {
        mimetype:"image/*",
        folders:true
      },
      {
        location:"S3"
      },
      function(Blobs){
        console.log(JSON.stringify(Blobs));
        console.log(Blobs[0].url);

        Session.set('logoImage', 'https://s3.amazonaws.com/imagesrez/' + Blobs[0].key);
      }
    );

  }
});

Template.inputForm.helpers({
  'logoImage': function () {
    return Session.get('logoImage');
  }
});
