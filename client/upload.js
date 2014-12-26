var uploader = new Slingshot.Upload("myFileUploads");

Template.inputForm.rendered = function () {
  var canvas = document.getElementById('my-canvas'),
  ctx = canvas.getContext('2d');
  draw_image = function (croppedImageWidth, croppedImageHeight) {
    croppedImage = new Image();
    // croppedImage.src = $('#imgsrc').cropper("getDataURL", "image/jpeg");
    croppedImage.src = $('#imgsrc').cropper('getDataURL', 'image/jpeg');
    croppedImage.onload = function () {
      ctx.clearRect (0, 0, canvas.width, canvas.height );
      ctx.drawImage(croppedImage, 0, 0);
    };
  };
};

Template.inputForm.events({

  // upload cropped image to s3 hopefully
  'click #uploadButton': function () {
    var canvas = document.getElementById("my-canvas"), ctx = canvas.getContext("2d");
    canvas.toBlob(function(blob) {
      saveAs(blob, "pretty image.png");
    });

    // var dataurl = $('#imgcrop').attr('src');
    // var file = new File([dataurl], "image.jpeg", {type: 'image/jpeg'});
    // // var file = new File(["lols"], "filename.txt", {type: "text/plain"})
    // var reader = new FileReader();
    // reader.readAsDataURL(file);
    // uploader.send(file, function (error, downloadUrl) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log(downloadUrl);
    //   }
    // });
  },

  // load source image
  'change #file': function (e) {
    var file = e.currentTarget.files[0];
    var displayArea = document.getElementsByClassName('image-container')[0];
    var imageType = /image.*/;
    if (file.type.match(imageType)) {
      var reader = new FileReader();
      reader.onload = function (e) {
        displayArea.innerHTML = '';
        var img = new Image();
        img.id = 'imgsrc';
        img.src = reader.result;
        displayArea.appendChild(img);

        // load image cropper
        $(".image-container > img").cropper({
          aspectRatio: 1.618,
          done: function(data) {
            // Output the result data for cropping image.
          }
        });


        // event handler on drag end for preview image
        $('#imgsrc').on('dragend.cropper', function () {
          var croppedImageHeight = $('#imgsrc').cropper('getImageData').height,
          croppedImageWidth = $('#imgsrc').cropper('getImageData').width;
          console.log(croppedImageWidth + croppedImageHeight);
          draw_image(croppedImageWidth, croppedImageHeight);
        });
      };
      reader.readAsDataURL(file);
    } else { // if source file is not an image
      displayArea.innerHTML = 'File not supported';
    }
  }
});
