/* jshint devel:true */
$.fn.serializeObject = function()
{
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

function setClass(el, className, present) {
  $(el)[present ? 'addClass' : 'removeClass'](className);
}

function goto(id, offset) {
  $.scrollTo(id, 500, {offset: offset || -60, easing: 'swing'});
  Parse.Analytics.track('goto', {id: id});
}


// Parse Initialize
Parse.initialize("2b3PmoTwQyVTrAQnVBK8ZDIiWhsbUg1KQlxczhIJ", "WEkQ8CclHvIbD3fFSOMf6bFsCfExpiQu0uterfbe");

// Initialize scrolling behaviors
$(function() {
  $(window).scroll(function updateBodyClasses() {
    setClass('body', 'scrolling', window.scrollY > 150);
  }).scroll();

  Parse.Analytics.track('loaded');
});

// RSVP

var RSVP = Parse.Object.extend("RSVP");

$('form').submit(function(e) {
  e.preventDefault();
  data = $('form').serializeObject();

  $('.has-error').removeClass('has-error');
  var errors = false;

  if (!data.name) {
    $('[name=name]').closest('.form-group').addClass('has-error');
    errors = true;
  }

  if (!data.attending) {
    $('[name=attending]').closest('.form-group').addClass('has-error');
    errors = true;
  }

  if (!errors) {
    var rsvp = new RSVP()
    rsvp.save(data, {
      success: function (object) {
        $('form').hide();
        $('.success').show();
      },
      error: function (model, error) {
        alert(error);
      }
    });
  }
});

function changeToggle(selector, className) {
  $(selector).change(function(e) {
    setClass('form', className, $(this).val() == 'yes');
    //$.scrollTo('input[type=submit]', 500, {offset: 0});
  }).change();
}

changeToggle('[name=attending]', 'is_attending');
changeToggle('[name=guest]', 'has_guest');



