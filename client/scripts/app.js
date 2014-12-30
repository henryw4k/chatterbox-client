
var app = {};

// List of HTML entities for escaping.
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
};

// Regex containing the keys listed immediately above.
var htmlEscaper = /[&<>"'\/]/g;

// Escape a string for HTML interpolation.
_.escape = function(string) {
  return ('' + string).replace(htmlEscaper, function(match) {
    return htmlEscapes[match];
  });
};




app.init= function() {
  app.server = 'https://api.parse.com/1/classes/chatterbox';
};

app.fetch= function() {
  $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      contentType: 'application/json',
      // how we extract data - by reverse chronological order
      // how data is presented
      data: {
        order: "-createdAt"
      },
      success: function (data) {
        console.log('chatterbox: got the message');
        console.log(data);

        for (var i = 0; i < data.results.length; i++) {
          var $username = '<span class = user>'+_.escape(data.results[i].username)+'</span>';
          var $message = '<span class = message>'+_.escape(data.results[i].text)+'</span>';
          var $time = '<span class=time>' + _.escape(data.results[i].createdAt) + '</span>'
          // $('.chats').append(data.results[i].username + ": ").append(data.results[i].text).append("<br>");
            $('.chats').append($username + ': ' + $message + $time + '<br>');
        }
        //console.log(newdata.results.length);
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get message');
      }
    });
};


app.refresh = function() {
 $(document).ready(function(){
  $('.refresh').click(function(){
      $('.chats').empty();
      app.fetch();
    });
});


};
// var message = {
//       // createdAt: "2013-10-07T17:24:40.668Z",
//       // objectId: "8noEr4Pu8J",
//       username: 'jillian',
//       text: 'hello',
//       roomname: 'lobby'
//       // updatedAt: "2013-10-07T17:24:40.668Z",
//     };//message from input form
  // var message = {
  //   username: $('userBox').val(),
  //   text: $('textBox').val(),
  //   roomname: $('roomBox').val()
  // };
    //var message = {
    //   username: $(".userBox").val(),
    //   texts: $(".messageBox").val(),
    //   roomname: $(".roomBox").val()
    // };


// LOOK AT CONFIG.JS!!!
app.send = function(message) {
      $.ajax({
        // always use this url
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'POST',
        // how data is presented
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          // var $username = '<span class = users>'+_.escape(data.username)+'</span>';
          // var $message = '<span class = messages>'+_.escape(data.texts)+'</span>';
          // var $time = '<span class=times>' + _.escape(data.roomname) + '</span>'
          // // $('.chats').append(data.results[i].username + ": ").append(data.results[i].text).append("<br>");
          //   $('.chats').append($username + ': ' + $message + $time + '<br>');
          // console.log('chatterbox: Message sent');
          console.log(data);
        },
        error: function (data) {
          // console.log($('.textBox').val());
          // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message');
        }
      });
  };

$('.send').on('click', function () {
   var username = $('.userBox').val();
   var texts = $('.messageBox').val();
   var roomName = $('.roomBox').val();

   var message = {
    'username': username,
    'text': texts,
    'roomname': roomName
   };

   console.log(message);
   app.send(message);
});

app.fetch();
app.refresh();
