$(document).ready(function() {
    const body = $('body');
    const shibaNum = Math.floor(Math.random() * 100) + 20;
    let isInteracting = false;

    // generate random shiba heads
    for (let i = 0; i < shibaNum; i++) {
        const shiba = $(`<img src="transshiba.png" class="shiba" alt="shiba"/>`);
        const randSize = Math.random() * 100 + 50;
        shiba.css({
            left: Math.random() * $(window).width(),
            top: Math.random() * $(window).height(),
            width: randSize,
            height: randSize
        });

        shiba.data({
            directionX: (Math.random() < 0.5 ? -1 : 1) * 4, // Double the distance moved each time
            directionY: (Math.random() < 0.5 ? -1 : 1) * 4
        });

        body.append(shiba);
    }

    // handle mousemove event
	 $(document).mousemove(function(e) {
		$('.shiba').each(function() {
			const shiba = $(this);
			const dx = e.pageX - (shiba.offset().left + shiba.width() / 2);
			const dy = e.pageY - (shiba.offset().top + shiba.height() / 2);
			const dist = Math.sqrt(dx * dx + dy * dy);
			const radius = 200; // Set the radius as you like

			// Only move the shiba head if it's within the radius
			if (dist < radius) {
				isInteracting = true;
				const newLeft = shiba.offset().left - dx * 1.5;
				const newTop = shiba.offset().top - dy * 1.5;
				shiba.css({left: newLeft, top: newTop});
			} else {
				isInteracting = false;
			}
		});
	});


    $(document).mouseout(function() {
        isInteracting = false;
    });

    // floating around in random directions
    setInterval(function() {
        if (isInteracting) return;

        $('.shiba').each(function() {
            const shiba = $(this);
            const directionX = shiba.data('directionX');
            const directionY = shiba.data('directionY');
            const newLeft = shiba.offset().left + directionX;
            const newTop = shiba.offset().top + directionY;

            // check if shiba head reaches the window boundary
            if (newLeft < 0 || newLeft + shiba.width() > $(window).width()) {
                shiba.data('directionX', -directionX);
            }
            if (newTop < 0 || newTop + shiba.height() > $(window).height()) {
                shiba.data('directionY', -directionY);
            }

            shiba.css({left: newLeft, top: newTop});
        });
    }, 100); // Increase the frequency of updates
});
