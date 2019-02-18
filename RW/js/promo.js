$(document).ready(function() {
            var li = "http://issuu.com/amertech/docs/ws_fm19combined?e=1721656/34012999",
                wb = "http://issuu.com/amertech/docs/wswb19?e=1721656/10204639";

            function closecontact() {
                $('#demomodal').trigger('reveal:close');
            }

            // make Modal available on click
            $('.modal-btn').on('click', function(e) {
                e.preventDefault();
                var attr = $(this).attr('rel');
                console.log(attr)
                $('#demomodal').reveal();
                return false;
            });
        };
