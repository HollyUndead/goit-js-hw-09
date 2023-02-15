function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise((resolve) =>{
      setTimeout(()=>{
        resolve({position:position, delay: delay})
      }, delay)
    })
  } else {
    return new Promise((res, reject)=>{
      setTimeout(()=>{
        reject({position:position, delay: delay})
      }, delay)
    })
  }
}

document.querySelector('button').addEventListener('click', (event)=>{
  event.preventDefault();
  const amount = document.querySelector('[name="amount"]').value
  const delay = document.querySelector('[name="delay"]').value
  const delayStep = document.querySelector('[name="step"]').value
  let currentDelay = Number(delay);
  const step = Number(delayStep)

  console.log(currentDelay);

  for(let i=1; i<=amount; i++){
      createPromise(i, currentDelay)
      .then(({ position, delay }) =>{console.log(`✅ Fulfilled promise ${position} in ${delay}ms`)})
      .catch(({ position, delay })=> {console.log(`❌ Rejected promise ${position} in ${delay}ms`);})
      currentDelay+=step
  }
})