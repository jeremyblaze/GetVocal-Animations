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
let callBubblesScrollSpeed = 0.5; // pixels per frame
let callBubblesWrap = $('.callBubblesWrap');
let callBubbles = $('.callBubbles');

function animateCallBubbles() {
    // Get current scroll position
    let currentScroll = callBubblesWrap.scrollTop();
    
    // Get height of one callBubbles element
    let bubbleHeight = callBubbles.first().outerHeight();
    
    // Increment scroll position
    currentScroll += callBubblesScrollSpeed;
    
    // If we've scrolled past first element, reset to top
    if(currentScroll >= bubbleHeight) {
        currentScroll = 0;
    }
    
    // Apply new scroll position
    callBubblesWrap.scrollTop(currentScroll);

    // Randomly add won/dropped classes
    if(Math.random() < 0.04) {  // probability
        // Get all visible call bubbles without won/dropped classes
        let availableBubbles = $('.callBubble').not('.won, .dropped').filter(function() {
            let rect = this.getBoundingClientRect();
            let wrapRect = callBubblesWrap[0].getBoundingClientRect();
            return rect.top >= wrapRect.top && rect.bottom <= wrapRect.bottom;
        });
        
        if(availableBubbles.length > 0) {
            // Select one random bubble
            let randomIndex = Math.floor(Math.random() * availableBubbles.length);
            let selectedBubble = $(availableBubbles[randomIndex]);
            
            // Add either won or dropped class
            if(Math.random() < 0.55) { // % chance of won
                selectedBubble.addClass('won');
            } else {
                selectedBubble.addClass('dropped');
            }
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