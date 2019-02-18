$(document).ready(function (e) {
    'use strict';
    var li = "http://issuu.com/amertech/docs/ws_fm19combined?e=1721656/34012999";
    var wb = "http://issuu.com/amertech/docs/wswb19?e=1721656/10204639";

    function closemodal() {
        $('#demomodal').trigger('reveal:close');
    }

    // make Modal available on click
    $('a.modal-btn').on('click', function (e) {
        e.preventDefault();
        var attr = $(this).attr('rel');
        console.log(attr);
        $('#demomodal').reveal();
        return false;
    });
});
