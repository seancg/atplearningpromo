$(document).ready(function () {

    // make Modal available on click
    $('.modal-btn').on('click', function (e) {
        e.preventDefault();
        var attr = $(this).attr('rel');
        console.log(attr)
        $('#demomodal').reveal();
        return false;
    });
});
