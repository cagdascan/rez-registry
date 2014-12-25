Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
  bucket: "imagesrez",
  allowedFileTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif", "text/plain"],
  maxSize: 0,
  // acl: "public-read",

  authorize: function () {
    //Deny uploads if user is not logged in.
    // if (!this.userId) {
    //   var message = "Please login before posting files";
    //   throw new Meteor.Error("Login Required", message);
    // }

    return true;
  },

  key: function (file) {
    //Store file into a directory by the user's username.
    // var user = Meteor.users.findOne(this.userId);

    return 'restaurant-logos' + "/" + file.name;
  },

  AWSAccessKeyId: "AKIAIYFMPVEPFH2VARJA",
  AWSSecretAccessKey: "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"
});
