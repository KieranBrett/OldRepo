$('#scrollDown').click(() => {
    $(`html, body`).animate({
        scrollTop: $('#contentPane').offset().top
    }, 2000);
});