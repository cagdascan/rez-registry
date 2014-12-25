readURL = function(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#imgsrc').attr('src', e.target.result);
      $(".container > img").cropper({
        aspectRatio: 1.618,
        done: function(data) {
          // Output the result data for cropping image.
        }
      });
    }

    reader.readAsDataURL(input.files[0]);
  }
}
