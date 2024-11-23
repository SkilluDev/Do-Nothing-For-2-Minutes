document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
    
    // Initialize timer variables
    const TIMER_DURATION = 120; // 2 minutes in seconds
    let timeLeft = TIMER_DURATION;
    let timerInterval;
    let locked = false;
    
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        // Format the time with leading zeros
        const displayMinutes = String(minutes).padStart(2, '0');
        const displaySeconds = String(seconds).padStart(2, '0');
        
        // Update the timer display
        document.getElementById('timer').textContent = `${displayMinutes}:${displaySeconds}`;
        
        if (timeLeft > 0) {
            timeLeft--;
            timerInterval = setTimeout(updateTimer, 1000);
        } else {
            locked = true;
            document.getElementById('timer').style.opacity = 0;
            document.querySelector('.cat-container').style.opacity = 1;
        }
    }

    function resetTimer() {
        if(locked){
            return;
        }
        // Flash red animation
        const timerElement = document.getElementById('timer');
        timerElement.classList.add('flash-red');
        setTimeout(() => {
            timerElement.classList.remove('flash-red');
        }, 2000);

        // Clear existing timer
        clearTimeout(timerInterval);
        // Reset time to initial value
        timeLeft = TIMER_DURATION;
        // Hide cat image
        document.querySelector('.cat-container').style.opacity = 0;
        // Reset and show timer
        timerElement.style.opacity = 1;
        // Start timer again
        updateTimer();
    }

    // Start timer immediately when page loads
    updateTimer();

    // Add mouse movement listener
    document.addEventListener('mousemove', function() {
        resetTimer();
    });

    // Add document visibility change listener
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && !locked) {
            timeLeft = TIMER_DURATION;
            resetTimer();
            clearTimeout(timerInterval);
        }
    });

    // Add mouse leave listener for browser
    document.addEventListener('mouseleave', function() {
        if (!locked) {
            timeLeft = TIMER_DURATION;
            resetTimer();
            clearTimeout(timerInterval);
        }
    });
}); 