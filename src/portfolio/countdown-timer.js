function countdown() {
    const today     = new Date();
    const targetDay = new Date('2021-12-31T23:59:59');

    const totalSecs = (targetDay - today) / 1000;

    const days      = (Math.floor((totalSecs / 3600) / 24));
    const hours     = Math.floor(totalSecs / 3600) % 24;
    const minutes   = Math.floor(totalSecs / 60) % 60;
    const seconds   = Math.floor(totalSecs % 60);
    
    const daysLeft  = document.querySelector('.days h3');
    const hoursLeft = document.querySelector('.hours h3');
    const minsLeft  = document.querySelector('.mins h3');
    const secsLeft  = document.querySelector('.secs h3'); 

    daysLeft.innerText  = formatTime(days);
    hoursLeft.innerText = formatTime(hours);
    minsLeft.innerText  = formatTime(minutes);
    secsLeft.innerText  = formatTime(seconds);

    function formatTime(num) {
        return (num < 10) ? `0${num}` : num;
    }
}

countdown();

setInterval(countdown, 1000);