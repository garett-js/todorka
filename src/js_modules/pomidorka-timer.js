// const pomodirkaTimer = document.querySelector('.pomidorka-timer')
// const form = document.forms.config
// const fulltime = form.elements.fulltime

// let time = pomodirkaTimer.querySelector('.time')
// time.innerHTML = `${fulltime.value}:00`

// const startTimer = pomodirkaTimer.querySelector('.btn-start')
// const pauseTimer = pomodirkaTimer.querySelector('.btn-pause')
// const stopTimer  = pomodirkaTimer.querySelector('.btn-end')

// let id_timer = null

// startTimer.addEventListener('click', (event) => {
//     visibilityHandler(event.target, pauseTimer)
//     id_timer = setInterval(tickPomidorka, 1000)  
//     fulltime.setAttribute("disabled", "disabled")  
// })
// pauseTimer.addEventListener('click', (event) => {
//     visibilityHandler(event.target, startTimer)
//     clearInterval(id_timer)
// })
// stopTimer.addEventListener('click', () => {
//     clearInterval(id_timer)
//     addValueToElement(`25:00`, time)
//     fulltime.removeAttribute("disabled")
// })

// function tickPomidorka() {
//     let time_list = time.innerHTML.split(':')
//     let min = time_list[0]
//     let sec = time_list[1]

//     if (sec == 0) {
//         if (min == 0) { 
//             addValueToElement(`25:00`, time)
//             visibilityHandler(pauseTimer, startTimer)
//             fulltime.removeAttribute("disabled")
//             clearInterval(id_timer)
//             return   
//         }
//         min--
//         if (min < 10) { min = "0" + min }
//         sec = 59
//     } else sec--
//     if (sec < 10) { sec = "0" + sec }
 
//     addValueToElement(`${min}:${sec}`, time)  
// }

// function visibilityHandler(toHideElement, toShowElement) {
//     hideElement(toHideElement)
//     showElement(toShowElement)
// }
// function hideElement(el) {
//     el.classList.add('hide')
// }
// function showElement(el) {
//     el.classList.remove('hide')
// }
// function addValueToElement(value, el) {
//     el.innerHTML = value
// }



// form.elements.fulltime.addEventListener('change', (event) => {

//     if (event.target.value.length > 2 || event.target.value > 60) {
//         alert('Не больше 60 минут')
//         event.target.value = '10'
//     }
//     if (event.target.value != 0) {
//         if (!parseInt(event.target.value)) {
//             alert('Это что за дичь тут мне подсунули!?')
//             event.target.value = '10'
//         }
//     }
//     if (event.target.value == 0) {
//         event.target.value = '00'
//     }
//     if (event.target.value < 0) {
//         alert('Это как так???')
//         event.target.value = '10'
//     }

//     time.textContent = `${event.target.value}:00`
// })
