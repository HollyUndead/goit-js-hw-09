
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('[data-start]')
const btnStop = document.querySelector('[data-stop]')


btnStart.addEventListener('click', startStopSwitch)
btnStop.addEventListener('click', startStopSwitch)
let timer;

function startStopSwitch(event){
    if(event.target.dataset.stop == undefined){
        document.querySelector('[data-start]').disabled = true;
        document.querySelector('[data-stop]').disabled = false;
        switchColor()
        timer = setInterval(switchColor, 1000)
    }
    if(event.target.dataset.start == undefined){
        document.querySelector('[data-stop]').disabled = true;
        document.querySelector('[data-start]').disabled = false;
        clearInterval(timer)
    }
}

function switchColor(){
    document.querySelector('body').style.backgroundColor = getRandomHexColor()
}