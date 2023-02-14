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
let selectedDate, secondsTimer, timeObj;
startCountDown.disabled = true



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (currentDate > selectedDates[0]){
            alert('Please choose a date in the future')
            return
        }
        if(currentDate < selectedDates[0]){
            startCountDown.disabled = false;
            selectedDate = selectedDates[0];
        }
    },
};

flatpickr(date, options)

startCountDown.addEventListener('click', startTimer)


function startTimer(){
    timeObj = convertMs(selectedDate-currentDate)
    console.log(selectedDate-currentDate);
    console.log(timeObj);
    clearInterval(secondsTimer);
    secondsTimer = setInterval(minusOne, 1000)
    daysTime.innerText = addLeadingZero(timeObj.days)
    hoursTime.innerText = addLeadingZero(timeObj.hours)
    minutesTime.innerText = addLeadingZero(timeObj.minutes)
    secondsTime.innerText = addLeadingZero(timeObj.seconds)
}




function minusOne(){
    secondsTime = document.querySelector(`[data-seconds]`)
    secondsTime.innerText = addLeadingZero(secondsTime.innerText-1)
    if(daysTime.innerText == 0 && hoursTime.innerText == 0 && minutesTime.innerText == 0 && secondsTime.innerText == 0){
        secondsTime.innerText = '00';
        minutesTime.innerText = '00';
        hoursTime.innerText = '00';
        daysTime.innerText = '00'
        clearInterval(secondsTimer)
        alert('Time is up')
    }
    if(secondsTime.innerText < 0){
        secondsTime.innerText = '59'
        minutesTime.innerText = addLeadingZero(minutesTime.innerText - 1)
        if (minutesTime.innerText < 0){
            minutesTime.innerText = '59'
            hoursTime.innerText = addLeadingZero(minutesTime.innerText -1)
            if(hoursTime.innerText < 0){
                hoursTime.innerText = 23
                daysTime.innerText = addLeadingZero(daysTime.innerText -1)
            }
        }
    }
}

function addLeadingZero(str){
    str+=''
    return str.padStart(2, '0')
}