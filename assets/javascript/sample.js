$(function () {

    $('#side-menu').metisMenu();
    $('.editable-text').editable();
    $('.editable-inline').editable({ mode: 'inline' });
});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
$(function () {
    $(window).bind("load resize", function () {
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.sidebar-collapse').addClass('collapse')
        } else {
            $('div.sidebar-collapse').removeClass('collapse')
        }
    })

    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "FLAP",
            value: 1250356.13
        }, {
            label: "IRA",
            value: 256503.12
        }, {
            label: "DAC",
            value: 575356.23
        }, {
            label: "TDA",
            value: 323879.90
        }],
        resize: true,
        formatter: function (y, data) {
            return '$' + Intl.NumberFormat().format(y);
        },
        colors: ['#669933', '#0b62a4', '#FC6823', '#fcb322']
    });

    $('.selectpicker').selectpicker();
})