let currentScannerItem = 1
function nextScannerItem(){
    $('.scannerItem').removeClass('active');
    $('.scannerItem' + currentScannerItem).addClass('active');
    // Calculate margin needed to center active item
    let scannerItemHeight = $('.scannerItem').outerHeight();
    let scannerWrapHeight = $('.animWrap1').height();
    let scannerTopMargin = (scannerWrapHeight/2) - (scannerItemHeight/2) - ((currentScannerItem-1) * scannerItemHeight);
    $('.scannerItems').css('margin-top', scannerTopMargin + 'px');
    
    // Reset and trigger scan animation
    $('.scannerOverlayInner').removeClass('scan');
    void $('.scannerOverlayInner')[0].offsetWidth; // Trigger reflow
    $('.scannerOverlayInner').addClass('scan');
    
    currentScannerItem++;
    if(currentScannerItem > 5) currentScannerItem = 1;
}

// Animate call bubbles scrolling upward
let callBubblesScrollSpeed = .5; // pixels per frame
let callBubblesWrap = $('.callBubblesWrap');
let callBubbles = $('.callBubbles');
let callBubblesOffset = 0;

function animateCallBubbles() {
    
    // Get height of one callBubbles element  
    let bubbleHeight = $('.callBubbles:first-of-type').outerHeight();
    
    // Increment margin position
    callBubblesOffset += callBubblesScrollSpeed;
    
    // If we've moved past first element, reset to top and clone/append
    if(Math.abs(callBubblesOffset) >= bubbleHeight) {
        callBubblesOffset = 0;
        // Clone first set of bubbles and append to end
        let $clone = $('.callBubbles:first-of-type').clone();
        $('.callBubblesWrap').append($clone);
        // Remove first set if we have more than 2 sets
        if($('.callBubblesWrap').children('.callBubbles').length > 2) {
            $('.callBubbles:first-of-type').remove();
        }
    }
    
    // Apply new margin position to all bubble sets
    $('.callBubbles').css({'transform': 'translateY(-' + callBubblesOffset + 'px)'});

    // Randomly add won/dropped classes
    if(Math.random() < 0.04) {  // probability
        // Get visible call bubbles without won/dropped classes
        let $availableBubbles = $('.callBubble:not(.won, .dropped)').filter(':visible');
        
        if($availableBubbles.length > 0) {
            // Select and update random bubble
            let $selectedBubble = $availableBubbles.eq(Math.floor(Math.random() * $availableBubbles.length));
            $selectedBubble.addClass(Math.random() < 0.55 ? 'won' : 'dropped');
        }
    }
    
    // Continue animation
    requestAnimationFrame(animateCallBubbles);
    
}

$(document).ready(function(){

    if ( $('.animWrap1').length ) {
        nextScannerItem();
        setInterval(function(){
            nextScannerItem();
        }, 2000);
    }

    if ( $('.animWrap2').length ) {
        animateCallBubbles();
    }

});