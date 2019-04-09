// export class PomidorkaTimer {
//     constructor(id) {
//         this.$el = document.getElementById(id)
//         this.init()
//     }

//     init() {
//         this.id_timer = null

//         // const form = document.forms.config
//         // const fulltime = form.elements.fulltime

//         this.$time = this.$el.querySelector('.time')
//         this.$time.innerHTML = '15:00'//`${fulltime.value}:00`

//         this.$startTimer = this.$el.querySelector('.btn-start')
//         this.$pauseTimer = this.$el.querySelector('.btn-pause')
//         this.$stopTimer  = this.$el.querySelector('.btn-end')
//     }

//     startEventListening() {
//         this.$startTimer.addEventListener('click', clickStartHandler.bind(this))
//         this.$pauseTimer.addEventListener('click', clickPauseHandler.bind(this))
//         this.$stopTimer.addEventListener('click', clickStopHandler.bind(this))
//     }

// }

// // private
// function clickStartHandler(event) {
//     visibilityHandler(event.target, this.$pauseTimer)
//     this.$id_timer = setInterval(tickPomidorka.bind(this), 1000)
//     // fulltime.setAttribute("disabled", "disabled")
// }
// function clickPauseHandler(event) {
//     visibilityHandler(event.target, this.$startTimer)
//     clearInterval(this.$id_timer)
// }
// function clickStopHandler() {
//     clearInterval(this.$id_timer)
//     addValueToElement(`25:00`, this.$time)
//     // $fulltime.removeAttribute("disabled")
// }

// function tickPomidorka() {
//     console.log(this)

//     let time_list = this.$time.innerHTML.split(':')
//     let min = time_list[0]
//     let sec = time_list[1]

//     if (sec == 0) {
//         if (min == 0) {
//             addValueToElement(`25:00`, time)
//             visibilityHandler(this.$pauseTimer, this.$startTimer)

//             // fulltime.removeAttribute("disabled")

//             clearInterval(this.id_timer)
//             return
//         }
//         min--
//         if (min < 10) { min = "0" + min }
//         sec = 59
//     } else sec--
//     if (sec < 10) { sec = "0" + sec }

//     addValueToElement(`${min}:${sec}`, this.$time)
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


// // form.elements.fulltime.addEventListener('change', (event) => {

// //     if (event.target.value.length > 2 || event.target.value > 60) {
// //         alert('Не больше 60 минут')
// //         event.target.value = '10'
// //     }
// //     if (event.target.value != 0) {
// //         if (!parseInt(event.target.value)) {
// //             alert('Это что за дичь тут мне подсунули!?')
// //             event.target.value = '10'
// //         }
// //     }
// //     if (event.target.value == 0) {
// //         event.target.value = '00'
// //     }
// //     if (event.target.value < 0) {
// //         alert('Это как так???')
// //         event.target.value = '10'
// //     }

// //     time.textContent = `${event.target.value}:00`
// // })