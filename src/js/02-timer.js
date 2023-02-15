import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }



let date = document.querySelector('#datetime-picker')
let startCountDown = document.querySelector('[data-start]')
let secondsTime =document.querySelector('[data-seconds]')
let minutesTime =document.querySelector('[data-minutes]')
let hoursTime =document.querySelector('[data-hours]')
let daysTime =document.querySelector('[data-days]')
let currentDate = new Date();
let selectedDate, timer, timeObj, indicator = false;



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        indicator = false
        startTimer()
    },
};

flatpickr(date, options)

startCountDown.addEventListener('click', renderCountdown)


function renderCountdown(){
    currentDate = new Date();
    if (currentDate > selectedDate){
        alert('Please choose a date in the future')
        return
    }
    indicator = true
    daysTime.innerText = addLeadingZero(timeObj.days)
    hoursTime.innerText = addLeadingZero(timeObj.hours)
    minutesTime.innerText = addLeadingZero(timeObj.minutes)
    secondsTime.innerText = addLeadingZero(timeObj.seconds)
}


function startTimer(){
    if (currentDate > selectedDate){
        alert('Please choose a date in the future')
        return
    }
    timeObj = convertMs(selectedDate-currentDate)
    clearInterval(timer);
    timer = setInterval(minusOne, 1000)
    
}




function minusOne(){
    let secondsTimer = timeObj.seconds;
    let minutesTimer = timeObj.minutes;
    let hoursTimer = timeObj.hours;
    let daysTimer = timeObj.days
    timeObj.seconds = timeObj.seconds-1
    console.log(timeObj.seconds);
    if(timeObj.days == 0 && timeObj.hours == 0 && timeObj.minutes == 0 && timeObj.seconds == 0){
        secondsTime.innerText = '00';
        minutesTime.innerText = '00';
        hoursTime.innerText = '00';
        daysTime.innerText = '00'
        clearInterval(timer)
        if(indicator === true){
            alert('Time is up')
        }
    }
    if(timeObj.seconds < 0){
        timeObj.seconds = '59'
        timeObj.minutes = timeObj.minutes - 1
        if (timeObj.minutes < 0){
            timeObj.minutes = '59'
            timeObj.hours = timeObj.hours -1
            if(timeObj.hours < 0){
                timeObj.hours = 23
                timeObj.days = timeObj.days -1
            }
        }
    }
    if(indicator === true){
        daysTime.innerText = addLeadingZero(timeObj.days)
        hoursTime.innerText = addLeadingZero(timeObj.hours)
        minutesTime.innerText = addLeadingZero(timeObj.minutes)
        secondsTime.innerText = addLeadingZero(timeObj.seconds)
        indicator = false
    }
}

function addLeadingZero(str){
    str+=''
    return str.padStart(2, '0')
}