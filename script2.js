// =====================countdown================================
const endDate = new Date(2025, 11, 31, 23, 59, 59).getTime() / 1000;

function updateCountdown() {
    const now = new Date().getTime() / 1000;
    const diff = endDate - now;

    const days = Math.floor(diff / (60 * 60 * 24));
    const hours = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((diff % (60 * 60)) / (60));
    const seconds = Math.floor((diff % 60));
    document.getElementById("days").innerText = days.toString().padStart(3, "0");
    document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
// =====================end-countdown================================