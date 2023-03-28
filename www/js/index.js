

function show(shown,hid1,hid2,hid3) {
    document.getElementById(shown).style.display='grid';
    document.getElementById(hid1).style.display='none';
    document.getElementById(hid2).style.display='none';
    document.getElementById(hid3).style.display='none';
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

const regOption = document.getElementById("regOption")

var regCode = null;

//=====================================
//
fetchRegData(region)
//
//=====================================



function fetchRegData(path,isWhat) {
    console.log(`Inside ${arguments.callee.name}`) //logs function name
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null);
    var my_JSON_object = JSON.parse(request.responseText);
    switch (isWhat) {
        case 1:
            loadData(my_JSON_object.RECORDS,"province");
            break;
        case 2:
            loadData(my_JSON_object.RECORDS,"city");
            break;
        case 3:
            loadData(my_JSON_object.RECORDS,"barangay");
            break;
        default:
            loadData(my_JSON_object.RECORDS,"region"); 
            break;
    }
}    
        

function loadData(data,isWhatNext) {
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

        switch (isWhatNext) {
            case "province":
                opt1 = document.createElement('option');
                opt1.text = '-Select Province-';
                provOption.options.add(opt1);
                
                e = document.getElementById("regOption");
                text = e.options[e.selectedIndex].value; 
                for (i=0;i<=data.length-1;i++){
                    if (text==data[i].regCode) {
                        opt1 = document.createElement('option');
                        opt1.text = data[i].provDesc;
                        opt1.value = data[i].provCode;
                        provOption.options.add(opt1);
                    }
                }
                break;
                
            case "city":
                opt2 = document.createElement('option');
                opt2.text = '-Select City/Municipality-';
                cityOption.options.add(opt2);
                e = document.getElementById("provOption");
                text = e.options[e.selectedIndex].value; 
                for (i=0;i<=data.length-1;i++){
                    if (text==data[i].provCode) {
                        opt2 = document.createElement('option');
                        opt2.text = data[i].citymunDesc;
                        opt2.value = data[i].citymunCode;
                        cityOption.options.add(opt2);
                    }
                }
                break;

            case "barangay":
                opt3 = document.createElement('option');
                opt3.text = '-Select Barangay-';
                brgOption.options.add(opt3);
                e = document.getElementById("cityOption");
                text = e.options[e.selectedIndex].value; 
                for (i=0;i<=data.length-1;i++){
                if (text==data[i].citymunCode) {
                    opt3 = document.createElement('option');
                    opt3.text = data[i].brgyDesc;
                    brgOption.options.add(opt3);
                    }
                }
                break;

            default:
                for (i=0;i<=data.length-1;i++){
                    opt = document.createElement('option');
                    opt.text = data[i].regDesc;
                    opt.value = data[i].regCode;
                    regOption.options.add(opt);
                }
                break;
            }

function clear(comboBox) {
    console.log(`Inside ${arguments.callee.name}`);
    while (comboBox.options.length > 0) {                
        comboBox.remove(0);
        }        
    }
}

function setLabelReg() {
    e = document.getElementById("regOption");
    text = e.options[e.selectedIndex].text; 
    var x = document.getElementById("lbl_1");
    if (text=="-Select Region-") {
    } else {
        x.innerHTML = "Region:      " + text;
    }
}

function setLabelProv(){
    e = document.getElementById("provOption");
    text = e.options[e.selectedIndex].text; 
    var x = document.getElementById("lbl_2");
    if (text=="-Select Province-") {
    } else {
        x.innerHTML = "Province:    " + text;
    }
}

function setLabelCity(){
    e = document.getElementById("cityOption");
    text = e.options[e.selectedIndex].text; 
    var x = document.getElementById("lbl_3");
    if (text=="-Select City/Municipality-") {
    } else {
        x.innerHTML = "City/Municipality:       " + text;
    }
}

function setLabelBrg(){
    e = document.getElementById("brgOption");
    text = e.options[e.selectedIndex].text; 
    var x = document.getElementById("lbl_4");
    if (text=="-Select Barangay-") {
    } else {
        x.innerHTML = "Barangay: " + text;
    }
}

//========================

var progress = 1;
setAddProgress();
document
  .getElementById("next")
  .addEventListener("click", incrementProgress);
document
  .getElementById("prev")
  .addEventListener("click", decrementProgress);

function incrementProgress() {
  if (progress != 4) {
    progress = progress + 1;
    console.log(progress);
    setAddProgress();
  }
}

function decrementProgress() {
  if (progress != 1) {
    progress = progress - 1;
    console.log(progress);
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
  }


function setTheme() {
    if (document.getElementById("dark").checked == true) {
        document.body.style.setProperty('--mode', 'rgb(22, 24, 21)');
        document.body.style.setProperty('--fontmode', 'white');
        document.body.style.setProperty('--hlmode', 'rgb(38, 41, 36)');
    }

    if (document.getElementById("light").checked == true) {
        document.body.style.setProperty('--mode', 'white');
        document.body.style.setProperty('--fontmode', 'black');
        document.body.style.setProperty('--hlmode', 'lightgray');
    }
}