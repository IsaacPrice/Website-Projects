$(document).ready(function() {
    var controller = new ScrollMagic.Controller();

    $('.informational-widget').each(function() {
        var scene = new ScrollMagic.Scene({
            triggerElement: this, /* Start the scene when this element is in the viewport */
            triggerHook: 0.9, /* The scene starts when the element is 90% from the top of the viewport */
            reverse: false /* The animation will not reverse when scrolling up */
        })
        .setClassToggle(this, 'visible') /* Add the .visible class to the element */
        .addTo(controller);
    });
});