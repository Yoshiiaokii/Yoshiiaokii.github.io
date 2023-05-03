function show(shown, hid1, hid2, hid3) {
  document.getElementById(shown).style.display = 'grid';
  document.getElementById(hid1).style.display = 'none';
  document.getElementById(hid2).style.display = 'none';
  document.getElementById(hid3).style.display = 'none';
}


//=====================================
//
//  
//
//=====================================

const region = './json/refregion.json';
const province = './json/refprovince.json';
const city = './json/refcitymun.json';
const barangay = './json/refbrgy.json';
const schoolcourses = './json/refschoolcourse.json';
const schooltracks = './json/refschooltrack.json';
const regOption = document.getElementById("regOption");
const sound1 = new Audio('./audio/InterfaceClick1.mp3');
const sound2 = new Audio('./audio/InterfaceClick2.mp3');
const sound3 = new Audio('./audio/InterfaceClick3.mp3');
const sound4 = new Audio('./audio/InterfaceError.wav');
const sound = [sound1,sound2,sound3,sound4];
var regCode = null;
var progenabled;
var progenabled1;

//=====================================
//
fetchRegData(region)
disable("provOption")
disable("cityOption")
disable("brgOption")
progenabled = false;
progenabled1 = false;
//
//=====================================

function playsoundclick(num) {
  var click = sound[num];
  click.volume = 0.1;
  click.play()
  click.currentTime=0;
}


function fetchRegData(path, isWhat) {
  console.log(`Inside ${arguments.callee.name}`) //logs function name
  var request = new XMLHttpRequest();
  request.open("GET", path, false);
  request.send(null);
  var my_JSON_object = JSON.parse(request.responseText);
  switch (isWhat) {
      case 1:
          loadData(my_JSON_object.RECORDS, "province");
          break;
      case 2:
          loadData(my_JSON_object.RECORDS, "city");
          break;
      case 3:
          loadData(my_JSON_object.RECORDS, "barangay");
          break;
      default:
          loadData(my_JSON_object.RECORDS, "region");
          break;
  }
}

function checkdreg() {

  //region disables
  reg = document.getElementById("regOption");
  prov = document.getElementById("provOption");
  citymuni = document.getElementById("cityOption");
  if (reg.options[reg.selectedIndex].text != "-Select Region-" || "") {
      enable("provOption");
      opt1 = document.createElement('option');
      opt1.text = '-Select Province-';
      opt1.value = "a";
      provOption.options.add(opt1);
  } else {
      disable("provOption");
      disable("cityOption");
      disable("brgOption");
  }
}

function checkprov() {
  //province disables
  if (prov.options[prov.selectedIndex].text != "-Select Province-" || "") {
      enable("cityOption");
      opt2 = document.createElement('option');
      opt2.text = '-Select City/Municipality-';
      cityOption.options.add(opt2);
  } else {
      disable("cityOption");
      disable("brgOption");
  }
}

function checkcity() {
  //city disables
  if (citymuni.options[citymuni.selectedIndex].text != "-Select City/Municipality-" || "") {
      enable("brgOption");
      opt3 = document.createElement('option');
      opt3.text = '-Select Barangay-';
      brgOption.options.add(opt3);
  } else {
      disable("brgOption");
  }
}

function disable(disablewho) {
  document.getElementById(disablewho).disabled = true;
}

function enable(enablewho) {
  document.getElementById(enablewho).disabled = false;
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function loadData(data, isWhatNext) {
  console.log(`Inside ${arguments.callee.name}`);
  switch (isWhatNext) {
      case "province":
          clear(provOption)
          clear(cityOption)
          clear(brgOption)
          break;
      case "city":
          clear(cityOption)
          clear(brgOption)
          break;
      case "barangay":
          clear(brgOption)
          break;
      default:
          break;
  }
  //+========================================================
  switch (isWhatNext) { //province option loader
      case "province":
          checkdreg();
          e = document.getElementById("regOption");
          text = e.options[e.selectedIndex].value;
          for (i = 0; i <= data.length - 1; i++) {
              if (text == data[i].regCode) {
                  opt1 = document.createElement('option');
                  opt1.text = data[i].provDesc;
                  opt1.value = data[i].provCode;
                  provOption.options.add(opt1);
              }
          }
          break;

      case "city": //city option loader
          checkprov()
          e = document.getElementById("provOption");
          text = e.options[e.selectedIndex].value;
          for (i = 0; i <= data.length - 1; i++) {
              if (text == data[i].provCode) {
                  opt2 = document.createElement('option');
                  opt2.text = data[i].citymunDesc;
                  opt2.value = data[i].citymunCode;
                  cityOption.options.add(opt2);
              }
          }
          break;

      case "barangay": //barangay option loader
          checkcity()
          e = document.getElementById("cityOption");
          text = e.options[e.selectedIndex].value;
          for (i = 0; i <= data.length - 1; i++) {
              if (text == data[i].citymunCode) {
                  opt3 = document.createElement('option');
                  opt3.text = data[i].brgyDesc;
                  brgOption.options.add(opt3);
              }
          }
          break;


      default:
          for (i = 0; i <= data.length - 1; i++) {
              opt = document.createElement('option');
              opt.text = data[i].regDesc;
              opt.value = data[i].regCode;
              regOption.options.add(opt);
          }
          break;
    } 

}

function clear(comboBox) {
  console.log(`Inside ${arguments.callee.name}`);
  while (comboBox.options.length > 0) {
      comboBox.remove(0);
  }
}

function setLabelReg() {
  e = document.getElementById("regOption");
  text = e.options[e.selectedIndex].text;
}

function setLabelProv() {
  e = document.getElementById("provOption");
  text = e.options[e.selectedIndex].text;
}

function setLabelCity() {
  e = document.getElementById("cityOption");
  text = e.options[e.selectedIndex].text;
}

function setLabelBrg() {
  e = document.getElementById("brgOption");
  text = e.options[e.selectedIndex].text;
}

//==================================================================
// NEXT PREV NAVIGATIONS
//==================================================================
var progress = 2;
setAddProgress();

document
  .getElementById("next")
  .addEventListener("click", incrementProgress);
document
  .getElementById("next")
  .addEventListener("click", incrementProgress);
document
  .getElementById("prev")
  .addEventListener("click", decrementProgress);
document
  .getElementById("prev")
  .addEventListener("click", decrementProgress);

function incrementProgress() {
  console.log(progenabled)
  try {
    if (progress == 1) {
      brg = document.getElementById("brgOption");
      if (brg.options[brg.selectedIndex].text != "-Select Barangay-" || "") {
          progenabled = true
      }
  }
  }
  catch(err) {
    playsoundclick(3);
  }
  
  if (progress == 2) {
      progenabled = progenabled1;
  }
  if (progress != 4) {
      if (progenabled) {
          playsoundclick(0)
          progress = progress + 1;
          progenabled = false;
          setAddProgress();

      }
      else {
        playsoundclick(3);
      }
  }
  
}

function decrementProgress() {

  if (progress != 1) {
      progress = progress - 1;
      setSubProgress();
  }

}

function setAddProgress() {

  switch (progress) {
      case 1:
          document.getElementById("loadingleft").style.animation = "load1 0.5s linear forwards";
          document.getElementById("prev").style.visibility = 'hidden';
          break;
      case 2:
          document.getElementById("prev").style.visibility = 'visible';
          document.getElementById("loadingleft").style.animation = "load2 0.5s linear forwards";
          break;
      case 3:
          document.getElementById("loadingright").style.animation = "load3 0.5s linear forwards";
          break;
      case 4:
          document.getElementById("loadingright").style.animation = "load4 0.5s linear forwards";
          break;
      default:
          break;
  }
  changeExplorepPage();
}

function setSubProgress() {

  switch (progress) {
      case 1:
          document.getElementById("prev").style.visibility = 'hidden';
          document.getElementById("loadingleft").style.animation = "load1s 0.5s linear forwards";
          break;
      case 2:
          document.getElementById("loadingright").style.animation = "load2s 0.5s linear backwards";

          break;
      case 3:
          document.getElementById("loadingright").style.animation = "load3s 0.5s linear forwards";
          break;
      default:
          break;
  }
  changeExplorepPage();
}




function changeExplorepPage() { //explore pages (next,prev)
  switch (progress) {
      case 1:
          document.getElementById("explore-page2").style.display = 'none';
          document.getElementById("explore-page1").style.display = 'grid';

          break;
      case 2:
          document.getElementById("explore-page1").style.display = 'none';
          document.getElementById("explore-page2").style.display = 'grid';

          break;
      case 3:
          break;
      default:
          break;
  }

}


function setTheme() {
  playsoundclick(0)
  if (document.getElementById("dark").checked == true) {
      document.body.style.setProperty('--mode', 'rgb(28, 31, 43)');
      document.body.style.setProperty('--fontmode', 'white');
      document.body.style.setProperty('--hlmode', 'rgb(38, 41, 36)');
  }

  if (document.getElementById("light").checked == true) {
      document.body.style.setProperty('--mode', 'white');
      document.body.style.setProperty('--fontmode', 'black');
      document.body.style.setProperty('--hlmode', 'lightgray');
  }
}


//======================================================================
// SEARCH INPUTS
//======================================================================
const searchInput = document.getElementById('search-input');
const autocompleteContainer = document.getElementById('autocomplete-container');
const selectedContainer = document.getElementById('selected-container');
checklevel()
let courses = [];

function checklevel() {
  level = document.getElementById("level-select");
  searchinp = document.getElementById("search-input");
  switch ((level.options[level.selectedIndex].value)) {
      case "default":
          searchinp.disabled = true;
          searchinp.placeholder = "";
          progenabled1 = false;
          break;
      case "Senior High School":
          searchinp.disabled = false
          searchinp.placeholder = "Search a Track..."
          progenabled1 = true;
          parsejsonct(schooltracks);
          break;
      case "College":
          searchinp.disabled = false
          searchinp.placeholder = "Search a Course..."
          progenabled1 = true;
          parsejsonct(schoolcourses);
          break;
      default:
          searchinp.disabled = true
          searchinp.placeholder = ""
          progenabled1 = true;
          break;
  }
}

function runsearch(data) {
  console.log(`Inside ${arguments.callee.name}`) //logs function name
  courses = [];
  for (var i in data) {
      courses.push([i, data, [i]]);
      courses = courses[0][1].COURSES1;
  }
  
}




function parsejsonct(path) {
  console.log(`Inside ${arguments.callee.name}`) //logs function name
  fetch(path)
      .then(response => response.json())
      .then(data => {
          runsearch(data); // the parsed JSON data
      });
}



let selectedcourses = [];


function checkCourseIfEmpty() {
  console.log(`Inside ${arguments.callee.name}`) //logs function name
  var searchinp = document.getElementById("level-select");
  if (selectedcourses.length != 0) {
    searchinp.disabled = true;
  }  
  else searchinp.disabled = false;
}



function showAutocompleteOptions(options) {
  autocompleteContainer.innerHTML = '';
  options.forEach(option => {
      if (!selectedcourses.includes(option)) {
          const optionDiv = document.createElement('div');
          optionDiv.classList.add('autocomplete-item');
          optionDiv.innerText = option;
          optionDiv.addEventListener('click', () => {
              selectOption(option);
          });
          autocompleteContainer.appendChild(optionDiv);
      }
  });
  autocompleteContainer.style.display = 'block';
}

function hideAutocompleteOptions() {
  autocompleteContainer.style.display = 'none';
}

function selectOption(option) {
  searchInput.value = '';
  hideAutocompleteOptions();
  addSelectedCourse(option);
}

function updateDropdown() {
  const inputValue = searchInput.value.trim().toLowerCase();
  const filteredCourses = courses.filter(course => course.toLowerCase().includes(inputValue));
  showAutocompleteOptions(filteredCourses);
  checkCourseIfEmpty()
}

function addSelectedCourse(course) {
  if (courses.includes(course) && !selectedcourses.includes(course)) {
      selectedcourses.push(course);
      const selectedBox = document.createElement('div');
      selectedBox.classList.add('selected-box');
      selectedBox.innerText = course;
      const removeBtn = document.createElement('span');
      removeBtn.classList.add('remove-btn');
      removeBtn.style.padding = '3vw';
      removeBtn.style.fontWeight = '900';
      removeBtn.innerText = 'x';
      removeBtn.addEventListener('click', () => {
          removeSelectedCourse(course);
          updateDropdown();
      });
      selectedBox.appendChild(removeBtn);
      selectedContainer.appendChild(selectedBox);
      updateDropdown();
  }
}

function removeSelectedCourse(course) {
  selectedcourses = selectedcourses.filter(selectedCourse => selectedCourse !== course);
  selectedContainer.innerHTML = '';
  selectedcourses.forEach(selectedCourse => {
      const selectedBox = document.createElement('div');
      selectedBox.classList.add('selected-box');
      selectedBox.innerText = selectedCourse;
      const removeBtn = document.createElement('span');
      removeBtn.classList.add('remove-btn');
      removeBtn.innerText = 'x';
      removeBtn.addEventListener('click', () => {
          removeSelectedCourse(selectedCourse);
          updateDropdown();
      });
      selectedBox.appendChild(removeBtn);
      selectedContainer.appendChild(selectedBox);
  });
  updateDropdown();
}

searchInput.addEventListener('click', () => {
  const inputValue = searchInput.value.trim().toLowerCase();
  console.log(courses)
  const filteredCourses = courses.filter(course => course.startsWith(inputValue));
  if (filteredCourses.length > 0) {
      showAutocompleteOptions(filteredCourses);
  } else {
      hideAutocompleteOptions();
  }
});

document.addEventListener('click', event => {
  const isClickInside = searchInput.contains(event.target) || autocompleteContainer.contains(event.target);
  if (!isClickInside) {
      hideAutocompleteOptions();
  }
});

searchInput.addEventListener('input', () => {
  const inputValue = searchInput.value.trim().toLowerCase();
  const filteredCourses = courses.filter(course => course.toLowerCase().includes(inputValue))
  if (filteredCourses.length > 0) {
      showAutocompleteOptions(filteredCourses);
  } else {
      autocompleteContainer.innerHTML = '';
      const notFoundDiv = document.createElement('div');
      notFoundDiv.classList.add('autocomplete-item');
      notFoundDiv.innerText = 'Course not found';
      autocompleteContainer.appendChild(notFoundDiv);
      autocompleteContainer.style.display = 'block';
  }
});

searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
      event.preventDefault();
      const inputValue = searchInput.value.trim().toLowerCase();
      if (inputValue !== '' && courses.includes(inputValue) && !selectedcourses.includes(inputValue)) {
          selectOption(inputValue);
      }
  }
});