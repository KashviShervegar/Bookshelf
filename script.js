function setBackgroundBasedOnTimeZone(timeZone) {
    const now = new Date();
    const options = { timeZone: timeZone };
    const hour = now.toLocaleString('en-US', { hour: 'numeric', hour12: false, ...options });

    // Set background color based on the time of day in the specified time zone
    if (hour >= 6 && hour < 12) {
        document.body.style.backgroundColor = "#f6e6cf"; // Morning
    } else if (hour >= 12 && hour < 18) {
        document.body.style.backgroundColor = "#C0B4A2"; // Afternoon
    } else if (hour >= 18 && hour < 20) {
        document.body.style.backgroundColor = "#847C70"; // Evening
    } else {
        document.body.style.backgroundColor = "#3E3B35"; // Night
    }

    // Set clock background color based on the time zone
    const clock = document.getElementById("clock");
    const clockBackgroundColor = (timeZone === timeZone1) ? '#e39aa5' : '#FFB23F';
    clock.style.transition = 'background-color 0.5s ease';
    clock.style.backgroundColor = clockBackgroundColor;
}

const timeZone1 = "America/New_York";
const timeZone2 = "Asia/Kolkata";

// Initialize the clock with the first time zone
let currentTimeZone = timeZone1;
rotateClockHands(currentTimeZone);

// Set background color based on the initial time zone
setBackgroundBasedOnTimeZone(currentTimeZone);

// Add click event listener to the clock
const clock = document.getElementById("clock");
clock.addEventListener('click', function() {
    // Toggle between time zones
    currentTimeZone = (currentTimeZone === timeZone1) ? timeZone2 : timeZone1;

    // Rotate clock hands based on the new time zone
    rotateClockHands(currentTimeZone);

    // Update background colors based on the new time zone
    setBackgroundBasedOnTimeZone(currentTimeZone);
});

// Function to rotate clock hands based on time zone
function rotateClockHands(timeZone) {
    const now = new Date();
    const options = { timeZone: timeZone };

    const hour = now.toLocaleString('en-US', { hour: 'numeric', hour12: false, ...options }) % 12;
    const minute = now.toLocaleString('en-US', { minute: 'numeric', ...options });
    const second = now.toLocaleString('en-US', { second: 'numeric', ...options });

    const hourHand = document.getElementById("hour-hand");
    const minuteHand = document.getElementById("minute-hand");
    const secondHand = document.getElementById("second-hand");

    // Calculate angles for rotation
    const hourAngle = (hour * 30) + (0.5 * minute); // 30 degrees per hour, 0.5 degrees per minute
    const minuteAngle = (minute * 6) + (0.1 * second); // 6 degrees per minute, 0.1 degrees per second
    const secondAngle = second * 6; // 6 degrees per second

    // Apply rotation using CSS transform property
    hourHand.style.transform = `translate(-50%, -100%) rotate(${hourAngle}deg)`;
    minuteHand.style.transform = `translate(-50%, -100%) rotate(${minuteAngle}deg)`;
    secondHand.style.transform = `translate(-50%, -100%) rotate(${secondAngle}deg)`;
}

// Function to toggle background color based on time zone
function toggleBackgroundColor(timeZone) {
    const backgroundColor = (timeZone === timeZone1) ? '#7975A3' : '#FFB23F';
    clock.style.transition = 'background-color 0.5s ease';
    clock.style.backgroundColor = backgroundColor;
}

const myHome = document.getElementById("myHome");

// Add click event listener
myHome.addEventListener('click', function() {
    window.location.href = "index.html";
});

let currentlyDraggedElement = null;
let zIndexCounter = 1000;

// Make images draggable
document.querySelectorAll('.draggable-note-1').forEach(function(image) {
    makeDraggable(image);
});

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.addEventListener('mousedown', dragMouseDown);
    element.addEventListener('touchstart', dragTouchStart, { passive: false });

    function dragMouseDown(e) {
        e.preventDefault();
        // Set the currently dragged element
        currentlyDraggedElement = element;
        // Increase z-index to make the dragged element appear above others
        zIndexCounter++;
        element.style.zIndex = zIndexCounter;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.addEventListener('mouseup', closeDragElement);
        // call a function whenever the cursor moves:
        document.addEventListener('mousemove', elementDrag);
    }

    function dragTouchStart(e) {
        e.preventDefault();
        // Set the currently dragged element
        currentlyDraggedElement = element;
        // Increase z-index to make the dragged element appear above others
        zIndexCounter++;
        element.style.zIndex = zIndexCounter;
        // get the touch position at startup:
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
        document.addEventListener('touchend', closeDragElement);
        // call a function whenever the touch position moves:
        document.addEventListener('touchmove', elementDrag, { passive: false });
    }

    function elementDrag(e) {
        e.preventDefault();
        // calculate the new cursor/touch position:
        pos1 = pos3 - (e.clientX || e.touches[0].clientX);
        pos2 = pos4 - (e.clientY || e.touches[0].clientY);
        pos3 = (e.clientX || e.touches[0].clientX);
        pos4 = (e.clientY || e.touches[0].clientY);
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // Clear the currently dragged element reference
        currentlyDraggedElement = null;
        // stop moving when mouse/touch interaction ends:
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('touchend', closeDragElement);
        document.removeEventListener('mousemove', elementDrag);
        document.removeEventListener('touchmove', elementDrag);
    }
}