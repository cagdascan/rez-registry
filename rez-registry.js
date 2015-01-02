Restaurant = new Meteor.Collection('restaurant');
User = new Meteor.Collection('user');
User_Gastro = new Meteor.Collection('user_gastro');

if (Meteor.isServer) {

  Meteor.publish('restaurantList', function () {
    return Restaurant.find({}, {fields: {name: 1}});
  });

  Restaurant.allow({
    insert: function (userId, doc) {
      // the user must be logged in, and the document must be owned by the user
      return true;
    },
    update: function (userId, doc, fields, modifier) {
      // can only change your own documents
      return false;
    },
    remove: function (userId, doc) {
      // can only remove your own documents
      return false;
    }
  });

  User.allow({
    insert: function (userId, doc) {
      // the user must be logged in, and the document must be owned by the user
      return true;
    },
    update: function (userId, doc, fields, modifier) {
      // can only change your own documents
      return false;
    },
    remove: function (userId, doc) {
      // can only remove your own documents
      return false;
    }
  });

  User_Gastro.allow({
    insert: function (userId, doc) {
      // the user must be logged in, and the document must be owned by the user
      return true;
    },
    update: function (userId, doc, fields, modifier) {
      // can only change your own documents
      return false;
    },
    remove: function (userId, doc) {
      // can only remove your own documents
      return false;
    }
  });
}

if (Meteor.isClient) {

  Polymer({
    selectAction: function(e, detail) {
      if (detail.isSelected) {
        var selectedItem = detail.item;
        console.log(selectedItem);
      }
      // console.log(e)
    }
  });

  Meteor.subscribe('restaurantList');

  Template.restaurantList.helpers({
    'restaurant': function () {
      return Restaurant.find();
    }
  });


  Template.inputForm.events({
    'click button#done': function () {
      // increment the counter when button is clicked
      console.log('lols');
      var id = new Mongo.ObjectID();
      var email = $('#email').val();
      var parola = $('#parola').val();
      parola = CryptoJS.MD5(parola).toString();
      var firstname = $('#name').val();
      var lastname = '';
      var createdAt = new Date();
      var fbaccesstoken = '';
      var fbpage = '';
      var lastLogin = new Date();
      var phone = $('#telefon').val();
      var rights = {};
      var verifiedMail = true;
      var verifiedUser = true;

      User.insert({
        _id: id,
        created_at: createdAt,
        email: email,
        fbaccesstoken: fbaccesstoken,
        fbpage: fbpage,
        first_name: firstname,
        last_login: lastLogin,
        last_name: lastname,
        password: parola,
        phone: phone,
        right: rights,
        verified_mail: verifiedMail,
        verified_user: verifiedUser,
      });
      var long = parseFloat($('#long').val()),
          lat = parseFloat($('#lat').val()),
          restaurant = {
        "_id" : new Mongo.ObjectID(),
        "address" : $('#adres').val(),
        "bolge" : $('#semt').val(),
        "city" : $('#sehir').val(),
        "fbaccesstoken" : "",
        "fbpageid" : "",
        "foursqid" : "",
        "hasAdres" : true,
        "information" : $('#aciklama').val(),
        "kitchen" : '',
        "location" : [
          long,
          lat
        ],
        "logo" : "",
        "mail" : $('#rmail').val(),
        "mail_service" : {
        },
        "menu" : [],
        "name" : firstname,
        "otopark" : true,
        "payment" : [
        ],
        "properties" : {
        },
        "props" : [
        ],
        "rooms" : [
        ],
        "settings" : {
        },
        "slug" : $('#slug').val(),
        "tags" : [ ],
        "telephone" : $('#telefon').val(),
        "town" : "",
        "twkey" : "",
        "twsecret" : "",
        "web" : $('#web').val(),
        "yaka" : "",
        "avg_vote" : 3,
        "description" : $('#aciklama').val(),
        "shifts" : [
        ],
        "holidays" : [
        ]
      };

      Restaurant.insert(restaurant);

      var gastro = {
        _id: new Mongo.ObjectID(),
        user: id,
        restaurants: [restaurant._id]
      };

      User_Gastro.insert(gastro);

    }
  });
}
