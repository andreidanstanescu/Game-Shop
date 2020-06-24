var dogs;
var ind=1;


var timer;
var timerStart;
var timeSpentOnSite = det_timp();


function det_timp(){
    timeSpentOnSite = parseInt(sessionStorage.getItem('timeSpentOnSite'));
    timeSpentOnSite = isNaN(timeSpentOnSite) ? 0 : timeSpentOnSite;
    return timeSpentOnSite;
}

function Haida(){
    timerStart = Date.now();
    timer = setInterval(function(){
        timeSpentOnSite = det_timp()+(Date.now()-timerStart);
        sessionStorage.setItem('timeSpentOnSite',timeSpentOnSite);
        timerStart = parseInt(Date.now());
        // Convert to seconds
        //console.log(parseInt(timeSpentOnSite/1000));
        document.getElementById("timpul").value=parseInt(timeSpentOnSite/1000/60)+" minute si "+parseInt(timeSpentOnSite/1000)%60+" secunde ";
    },1000);
}
//Haida();

var stopCountingWhenWindowIsInactive = true; 

if( stopCountingWhenWindowIsInactive ){

    if( typeof document.hidden !== "undefined" ){
        var hidden = "hidden", 
        visibilityChange = "visibilitychange", 
        visibilityState = "visibilityState";
    }else if ( typeof document.msHidden !== "undefined" ){
        var hidden = "msHidden", 
        visibilityChange = "msvisibilitychange", 
        visibilityState = "msVisibilityState";
    }
    var documentIsHidden = document[hidden];

    document.addEventListener(visibilityChange, function() {
        if(documentIsHidden != document[hidden]) {
            if( document[hidden] ){
                // Window is inactive
                clearInterval(timer);
            }else{
                // Window is active
                Haida();
            }
            documentIsHidden = document[hidden];
        }
    });
}


function myFunction() {
    var person = prompt("Cum te numesti ?","Ion");
    if (person != null) {
        var mesaj = "Salut " + person ;
        var oldTitle = document.title; 
        document.title = mesaj; 
        setTimeout(function() {document.title=oldTitle;}, 2000);
    }
}

function myFunction2() {
    alert("I am an alert box!");
}


var getDaysInMonth = function(month,year) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
   return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
  };

function getAge() {
    var dateString=document.getElementById("varsta").value;
    //alert(dateString);
    var year = Number(dateString.substr(6, 4));
    var month = Number(dateString.substr(3, 2));
    var day = Number(dateString.substr(0, 2));
    var today = new Date();
    //alert(day);
    //var data1=`${day}/${month}/${year}`;
    //alert(data1); 
    //const date1 = new Date(data1);
    //const date2 = new Date();
    //const diffTime = Math.abs(date2 - date1);
    //const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    //alert(diffDays);
    var days;
    var age = today.getFullYear() - year;
    if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
        age--;
        month=12-(moth-today.getMonth());
    }
    if(today.getDay() > day)
    {
        days=Math.abs(today.getDay()-day);
    }
    else
    {
        days=30-Math.abs(today.getDay()-day);
    }
    var hours=today.getHours();
    var minutes=today.getMinutes();
    var seconds=today.getSeconds();
    var rez=age+" ani "+month+" luni si "+days+" zile, "+hours+" ore "+minutes+" minute "+seconds+" secunde";
    document.getElementById("varsta2").value=rez;
    //alert(age+" ani "+month+" luni si "+days+" zile, "+hours+" ore "+minutes+" minute "+seconds+" secunde");
    //t=setTimeout(function(){alert(age+" ani "+month+" luni si "+days+" zile, "+hours+" ore "+minutes+" minute "+seconds+" secunde")},100);
    //return age;
}

var myVar = setInterval(getAge, 1000);

//setInterval(getAge(), 100);

function Post_Dog(){
    var img = document.getElementsByName("img")[0].value;
    document.getElementsByName("name")[0].style.color="red";
    var name = document.getElementsByName("name")[0].value;

    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.onerror = reqError;
    oReq.open('POST', 'http://localhost:3000/dogs', false);
    oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    let newDog = {
        "img" : img,
        "name": name,
        "id": ""
    }
    oReq.send(JSON.stringify(newDog));

    location.reload();
}


function Edit_Dog(){

    var img = document.getElementsByName("img")[0].value;
    var name = document.getElementsByName("name")[0].value;
    
    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.onerror = reqError;
    oReq.open('PUT', 'http://localhost:3000/dogs/'+dogs[ind]["id"], false);
    oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    let newDog = {
        "img" : img,
        "name": name,
        "id": ind
    }
    oReq.send(JSON.stringify(newDog));
    location.reload();
}

function prepareEditEntity(id){
    document.getElementsByName("name")[0].value = dogs[id]["name"];
    document.getElementsByName("img")[0].value = dogs[id]["img"];
    ind=id;
}



function deleteEntity(id){
    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.onerror = reqError;
    oReq.open('delete', 'http://localhost:3000/dogs/'+dogs[id]["id"], false);
    oReq.send();
    //
    location.reload();
    localStorage.removeItem(dogs[id]["name"]);
}


function Ascunde_imagini()
{
    if( document.getElementById("ascunde_poze").value=== "Ascunde Imagini"){
    var images = document.getElementsByTagName('img');
    //fara titlu
    for (i = 0; i < images.length;i++ ) {
        images[i].style.display = "none";
    }
    document.getElementById("ascunde_poze").value= "Afiseaza Imagini";
    }
    else
    {
        var images = document.getElementsByTagName('img');
        //fara titlu
        for (i = 0; i < images.length;i++ ) {
            images[i].style.display = "block";
        }
        document.getElementById("ascunde_poze").value= "Ascunde Imagini";
    }
}



function cumpar(id){
    if( cumpar.checked = true )
        cumpar.checked = false;
}


function reqListener() {
    dogs = JSON.parse(this.responseText);

    var ul = document.createElement("ul");
    var ul2 = document.createElement("ul");
    var ul3 = document.createElement("ul");

    console.log(dogs);
    for(var i=0;i<dogs.length;i++){
        var li = document.createElement("li");
        var p = document.createElement("p");
        var edit = document.createElement("d");
        var del = document.createElement("d");
        var cumpar = document.createElement("d");
        var p1 = document.createElement("p");
        var x = document.createElement("INPUT");

        var titlu=document.createElement("BUTTON");

        x.setAttribute("type", "radio");
        del.innerHTML = "<button onclick='deleteEntity("+i+")'>Sterge Joc</button>";
        edit.innerHTML = "<button onclick='prepareEditEntity("+i+")'>Editeaza Joc</button>";
        cumpar.innerHTML = `<button onclick='cumpar(${i})'>Adauga in cos</button>`;

        //cumpar.innerHTML = "<input onclick='cumpar("+i+")'>Adauga in cos</input>";
        cumpar.onclick = function() {
            if( cumpar.checked = false)
                cumpar.checked = true;
            else
                if( cumpar.checked = true)
                cumpar.checked = false;
        }

        titlu.innerText = dogs[i]["name"];
        titlu.style.color = "black";
        titlu.style.font = "italic bold 20px arial,serif";
        //dogs[i].name.fontcolor("blue");
        //p.innerText = dogs[i]["name"];
        var str="Adauga in cos !";
        //console.log(str);
        //p1.innerText = str;
        var img = document.createElement("img");

        img.style.height="170";
        img.style.widows="50";
        img.src = dogs[i]["img"];

        if( x.checked )
            localStorage.setItem(dogs[i]["name"],'In cos');
        
        if( x.checked == false)
            localStorage.removeItem(dogs[i]["name"]);

        p.appendChild(titlu);
        p.appendChild(del);
        p.appendChild(edit);
        p.appendChild(cumpar);
        p.appendChild(x);

        //cumpar.append(x);

        li.appendChild(p);
        li.appendChild(img);
        li.append(p1);
        
        if(i>=6)
            ul3.appendChild(li);
        else
            if(i>=3)
                ul.appendChild(li);
        else
            ul2.appendChild(li);
    }

    //document.getElementById("add_button")[0].appendChild(ul);
       document.getElementsByClassName("leftbox")[0].appendChild(ul);
       document.getElementsByClassName("rightbox")[0].appendChild(ul2);
       document.getElementsByClassName("rightrightbox")[0].appendChild(ul3);
}

function reqError(err) {
    console.log('Fetch Error :-S', err);
}

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.onerror = reqError;
oReq.open('get', 'http://localhost:3000/dogs', true);
oReq.send();

const CSS_COLOR_NAMES = [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "Green",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Ivory",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
];

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener("DOMContentLoaded", function(){
    Captcha();
})

function Captcha(){
    var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 
            '0','1','2','3','4','5','6','7','8','9');
    var i;
    for (i=0;i<=Math.random()%10;i++){
        var a = alpha[Math.floor(Math.random() * alpha.length)];
        var b = alpha[Math.floor(Math.random() * alpha.length)];
        var c = alpha[Math.floor(Math.random() * alpha.length)];
        var d = alpha[Math.floor(Math.random() * alpha.length)];
        var e = alpha[Math.floor(Math.random() * alpha.length)];
        var f = alpha[Math.floor(Math.random() * alpha.length)];
        var g = alpha[Math.floor(Math.random() * alpha.length)];
        }
        var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' '+ f + ' ' + g;
    document.getElementById("mainCaptcha").innerHTML = code;
    document.getElementById("mainCaptcha").value = code;
    document.getElementById("mainCaptcha").innerHTML = "";
    const letter = document.createElement("div");
    letter.innerText = code;
    letter.style.color = pickRandom(CSS_COLOR_NAMES);
    letter.style.transform = `rotate(${getRandomInt(-50, 50)}deg) skew(${getRandomInt(-10, 10)}deg) translate(0,${getRandomInt(-20, 20)}px)`;
    letter.style.fontSize = `${getRandomInt(200,300)/100}rem`;
    letter.style.fontWeight = "bold";
    letter.style.fontFamily = pickRandom(['Arial', 'Verdana', 'Comic Sans MS', 'Times New Roman']);
    letter.style.padding = 5;
    document.getElementById("mainCaptcha").insertAdjacentElement("beforeend", letter);
}

function ValidCaptcha(){
    var string1 = removeSpaces(document.getElementById('mainCaptcha').value);
    var string2 = removeSpaces(document.getElementById('txtInput').value);
    if (string1 == string2){
        document.getElementById("llogare").style.display="block";
           return true;
    }else{        
         Captcha();
         return false;
         }
}
function removeSpaces(string){
    return string.split(' ').join('');
}

function solve()
{
    if(ValidCaptcha()===true)
        document.getElementById("llogare").display="block";
}

//fetch('https://api.ipify.org/?format=json').then(response => response.json()).then(data => document.getElementById("userip").value=ipInfo);
fetch('https://api.ipify.org/?format=json').then(response => response.json()).then(data => document.getElementById("userip").value="Ip-ul este:"+data.ip);

