const monthsField = document.querySelector('.months')
const oneMonthField = document.querySelector('.month')
const moodColors = ['#bd3f00', '#bd9a00', '#2fbd00']
const weekDays = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"]
const months = Array.from({length: 12}, (item, i) => {
    return new Date(0, i).toLocaleString('en-US', {month: 'long'})
  });
let date = new Date();
let year = date.getFullYear()
let chosenColor = 'green';
let displayCurrentYear = function () {   
    const yearField = document.querySelector('.year')
    yearField.innerHTML = year;
}

let createWeekDays = function() {
    for (let j = 0; j < weekDays.length; j++) {
    let weekDay = document.createElement('div')
    weekDay.innerHTML+= weekDays[j];
    monthsField.appendChild(weekDay);
}
}


let displayMonths = function() {
    for (let i = 0; i < months.length; i++) {
    let month = document.createElement('div');
    month.className = months[i];
    month.classList.add("month");
   month.innerText = months[i];
   monthsField.appendChild(month);
   
    //createWeekDays()
    
   }
}

let getNumberOfDaysInMonth = function(month,year) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
   return new Date(year, month, 0).getDate();
  };

  let createDaysButtons = function(){
      for(let i = 0; i < months.length; i++) {
          let daysInMonth = getNumberOfDaysInMonth(i+1, year);
          let monthDiv = document.querySelector("." + months[i]);
              let daysDiv = document.createElement('div');
              monthDiv.appendChild(daysDiv);
          for(let j = 0; j < daysInMonth; j++) {
              
              let day = document.createElement('button');
              day.innerHTML = j+1;
              day.className = 'day-button';
              daysDiv.appendChild(day);
          }
          
      }
  }


  //let chosenColor = 'green';
  let createMoodButtons = function() {
      for(let i = 0; i < moodColors.length; i++) {
          let colorsField = document.querySelector('.color-picker')
          let button = document.createElement('button')
          button.className = 'mood-button';
          button.style.backgroundColor = moodColors[i];
          button.onclick = function(i) {
              buttonSizeOn = '35px';
              buttonSizeOff = '30px';
              chosenColor = button.style.backgroundColor;
              if (this.style.minHeight != buttonSizeOn) {
                  this.style.minWidth = buttonSizeOn;
            this.style.minHeight = buttonSizeOn;
              } else {
                this.style.minWidth = buttonSizeOff;
                this.style.minHeight = buttonSizeOff;
              }
            
          }
          colorsField.appendChild(button);

      }
  }

displayCurrentYear();
displayMonths();
createDaysButtons();
createMoodButtons();

let dayButton = document.querySelectorAll('.day-button');

let toggleButtonColors = function() {
    for(let i = 0; i < dayButton.length; i++) {

   dayButton[i].setAttribute('buttonPressed', false);
   
    dayButton[i].onclick = function() { 
        
        if (this.buttonPressed == true) {
            
            this.style.backgroundColor = 'transparent';
            this.buttonPressed = false;
        } else {
            this.style.backgroundColor = chosenColor;
            this.style.brightness = "50%";
            this.buttonPressed = true;
            localStorage.setItem(i, chosenColor)
        }
    
}
}
}



let displayStoredValues = function() {
    for(let i = 0; i < dayButton.length; i++) {
    if (window.localStorage.length > 0) {
        markedColor = localStorage.getItem(i)
        dayButton[i].style.backgroundColor = markedColor;
    }
    
}
}
toggleButtonColors()
displayStoredValues()