Template.loading.rendered = function () {
  if ( ! Session.get('loadingSplash') ) {
    this.loading = window.pleaseWait({
		logo: '/Onion_512.png',
      backgroundColor: '#DCE775',
      loadingHtml: spinner
    });
    Session.set('loadingSplash', true); // just show loading splash once
  }
};

Template.loading.destroyed = function () {
  if ( this.loading ) {
    this.loading.finish();
  }
};
var spinner = '<div class="sk-spinner sk-spinner-chasing-dots">'
  + ' <div class="sk-dot1"></div>'
  + ' <div class="sk-dot2"></div>'
  + '</div>';