var visor = document.querySelector('.timer')
var pomodoroState = document.querySelector('.state')
var pomodoroRunning = false
var pomodoroBreak = false
var audio = new Audio('alarm.mp3')

function operation(minutesSet, state) {
  /* choose another time set while running*/
  document.querySelector('#submit').addEventListener('click', () => {
    clearInterval(pomodoroStart)
  })
  /*------------------------------------------------------------ */

  this.minutesSet = minutesSet
  this.state = state
  seconds = 59
  minutesSet = Number(minutesSet.replace(/(:00)/, '')) - 1

  pomodoroState.innerHTML = state
  var pomodoroStart = setInterval(() => {
    visor.innerHTML = minutesSet + ':' + seconds
    var divider = visor.innerHTML.split('')
    if (minutesSet < 10) {
      divider.unshift(0)
      visor.innerHTML = divider.join('')
    }

    if (seconds < 10) {
      findDividerIndex = divider.indexOf(':') + 1
      divider.splice(findDividerIndex, 0, 0)

      visor.innerHTML = divider.join('')
    }
    if (seconds == 0) {
      minutesSet--
      seconds = 59
    }
    seconds--

    if (minutesSet == 0 && seconds == 0) {
      pomodoroBreak = !pomodoroBreak
      clearInterval(pomodoroStart)
      audio.play()
      visor.innerHTML = ''
      return
    }
    return
  }, 1200)
}

function pomodoroWork(minutesToWork, minutesToRest) {
  this.minutesToWork = minutesToWork
  this.minutesToRest = minutesToRest

  operation(minutesToWork, 'WORK')
  document.body.style.background = 'rgb(255, 106, 106)'
  var push = setInterval(() => {
    if (pomodoroBreak == false) {
      return
    } else if (pomodoroBreak == true) {
      clearInterval(push)
      operation(minutesToRest, 'REST')
      document.body.style.background = 'rgb(2, 82, 2)'
    }
  }, 400)
}

function sendData() {
  pomodoroRunning = true
  minutesToWork = document.getElementById('minutesW').value
  minutesToRest = document.getElementById('minutesR').value

  pomodoroWork(minutesToWork, minutesToRest)
}

function formatTime(time) {
  if (time < 10) {
    time = '0' + time
  }
  return time
}

function refreshTime() {
  if (pomodoroRunning == false) {
    const h = new Date()
    var hour = h.getHours()
    var minutes = h.getMinutes()
    var seconds = h.getSeconds()

    hour = formatTime(hour)
    minutes = formatTime(minutes)
    seconds = formatTime(seconds)

    visor.innerHTML = hour + ':' + minutes + ':' + seconds
  } else {
    clearInterval(realTime)
  }
}

var realTime = setInterval(refreshTime, 1000)
