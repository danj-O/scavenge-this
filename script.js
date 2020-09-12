const massiveContainer = document.querySelector('.massive-container')
const hudCount = document.querySelector('.hud-found-count-box')
const hudTimer = document.querySelector('.hud-timer-box')
const boxOverlay = document.querySelector('.box-overlay')

let timer = 0
let dimention = 0;
const colorsArr = ['red', 'blue', 'green', 'orange', 'purple']
// massiveContainer.style.width = `${dimention}px`
// massiveContainer.style.height = `${dimention}px`

const idArr = [
  {
    'objectiveName' : 'start',
    'isCompleted' : false
  }, {
    'objectiveName' : 'obj1',
    'isCompleted' : false
  }, {
    'objectiveName' : 'obj2',
    'isCompleted' : false
  }, {
    'objectiveName' : 'obj3',
    'isCompleted' : false
  }, {
    'objectiveName' : 'obj4',
    'isCompleted' : false
  }, {
    'objectiveName' : 'obj5',
    'isCompleted' : false
  }
]
// for(i=0; i<idArr.length;i++){
//   createCells(idArr[i].objectiveName)
// }

function createCells(){
  for(i=0; i<idArr.length;i++){
    let id = idArr[i].objectiveName
    const scavengeCell = document.createElement("div")
    scavengeCell.innerHTML = `<button class='objective-btn' onclick="completeObjective(${id})">${id}</button>`
    scavengeCell.id = id
    scavengeCell.style.position = 'absolute'
    scavengeCell.style.top = `${getRandom(dimention)}px`
    scavengeCell.style.left = `${getRandom(dimention)}px`
    massiveContainer.appendChild(scavengeCell)
  }
}

function completeObjective(objectiveName) {
  for(i=0;i<idArr.length;i++){
    if (objectiveName.id === idArr[i].objectiveName){
      idArr[i].isCompleted = true
    } else {
    }
  }
  handleClickEffects()
  updateHud()
  //check if he has won
  isWinner()
}

function isWinner(){
  let count = 0
  for(i=0;i<idArr.length;i++){
    //if the obj is complete, add to count
    if (idArr[i].isCompleted === true){
      count++
    //if its false, not winning yet
    } else if(idArr[i].isCompleted === false){
    }
    //if count is the same as the length of the array, user has found them all! WINN
    // console.log(count, idArr.length)
    if (count >= idArr.length){
      console.log("YOU WINNN!!!")
      return true
    }
  }
  // console.log(idArr)
}

function getRandom(max){
  return Math.floor(Math.random() * Math.floor(max))
}

function updateHud(){
  let count = 0;
  idArr.map(obj => {
    if(obj.isCompleted){
      count++
    }
  })
  hudCount.innerHTML = `${count} / ${idArr.length} found`
}

function setTimer(){
  hudTimer.innerHTML = `${timer} sec`
  const x = setInterval(function() {
    hudTimer.innerHTML = `${timer} sec`
    if(isWinner()){
      clearInterval(x)
      setOverlay('win')
    } else {
      const randomNum = Math.floor(Math.random() * Math.floor(colorsArr.length))
      hudTimer.style.background = colorsArr[randomNum]
      timer++
    }
    }, 1000)
}

function setOverlay(boxSelect){
  if(boxSelect == 'win'){
    boxOverlay.innerHTML = `
      <p>YOU WIN!!</p>
      <p>YOU'R TIME WAS ${timer} SECONDS</p>
      <button onclick="location.reload()">Play Again</button>
    `
    boxOverlay.classList.add('show')
  } else if(boxSelect == 'start') {
    boxOverlay.innerHTML = `
      <p>FIND ALL OF THE BUTTONS!</p>
      <p>CHOOSE A DIFFICULTY</p>
      <button class="sizeBtn" onclick="startBtn(0)">MEH</button>
      <button class="sizeBtn" onclick="startBtn(1)">DOABLE</button>
      <button class="sizeBtn" onclick="startBtn(2)">HARD AS</button>
    `
    boxOverlay.classList.add('show')
  }

}

function startBtn(size){
  setSize(size)
  createCells()
  updateHud()
  setTimer()
  boxOverlay.classList.remove('show')
}

function handleClickEffects(){
  const randomNum = Math.floor(Math.random() * Math.floor(colorsArr.length))
  massiveContainer.style.background = colorsArr[randomNum]
}

function setSize(size) {
  if(size == 0){
    dimention = 10000
  } else if(size == 1){
    dimention = 25000
  } else if(size == 2){
    dimention = 50000
  }
  console.log(dimention)
  massiveContainer.style.width = `${dimention}px`
  massiveContainer.style.height = `${dimention}px`
}