const arr=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
const arr1=['Q','W','E','R','T','Y','U','I','O','P'];
const arr2=['A','S','D','F','G','H','J','K','L'];
const arr3=['Z','X','C','V','B','N','M'];

const wordList=["OTHER","PIANO","VIDEO","ABOUT","LUNCH","ROBOT","APPLE","MANGO","EVERY","SHELF","EARTH","SOLID","SPACE","EIGHT","EXTRA"];
const cog=document.querySelector(".cog");

function getData(){
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function () {
    //   if (this.readyState == 4 && this.status == 200) {
    //     console.log(xhttp.responseText);
    //   }
    // };
    // xhttp.open("GET", "excel.json", true);
    // xhttp.send();
    // fetch('new.txt')
    // .then((response) => response.json())
    // .then((data) =>{
    //     console.log(data);
    // });    
}
cog.onclick=function(){
    getData();
}



var decider=Math.floor((Math.random() * 15) + 1);

const word=wordList[decider]

const guess=document.querySelectorAll('.guess');
const keyrow1=document.getElementById('keyrow1');
const keyrow2=document.getElementById('keyrow2');
const keyrow3=document.getElementById('keyrow3');

//INSERTING VALUES
for(let i=0;i<arr1.length;i++)
{
    keyrow1.innerHTML+=`<div class="key" id=${arr1[i]} >${arr1[i]}</div>`;
}
for(let i=0;i<arr2.length;i++)
{
    keyrow2.innerHTML+=`<div class="key" id=${arr2[i]}>${arr2[i]}</div>`
}
keyrow3.innerHTML+=`<div class="enter key">ENTER</div>`

for(let i=0;i<arr3.length;i++)
{
    keyrow3.innerHTML+=`<div class="key" id=${arr3[i]}>${arr3[i]}</div>`;
}
keyrow3.innerHTML+=`<div class="delete key">
                        <span class="material-icons"> backspace </span>
                    </div>`
for(let i=0;i<6;i++)
{
    for(let j=0;j<5;j++)
    {
        guess[i].innerHTML+=`<div type="text" class="box" id=${j}></div>`
    }
}
const enterKey=document.querySelector(".enter");
const backspace=document.querySelector(".delete");

const keyList=document.querySelectorAll(".key");

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var btn = document.querySelector(".question");


btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//LOGIC 
var c=0;
var str="";
var l=0;

function alertMessage()
{
    alert("Wohoo... you got it right");
    
}
function checkWord()
{
    var correct=0;
    for(let i=0;i<5;i++)
    {
        console.log(str.charAt(i))
        guess[l].childNodes[i].classList.remove("border")           
        if(word.includes(str.charAt(i)))
        {
            var o=str.charAt(i)
            console.log(`${o} is present in the word`)
            guess[l].childNodes[i].classList.add("orange");
            var letter=guess[l].childNodes[i].innerText;
            keyList.forEach((key)=>{
                if(letter==key.getAttribute('id'))
                {
                    if(!key.classList.contains("orange"))
                    {
                        key.classList.add("orange");

                    }
                }
            })
            if(str.charAt(i)==word.charAt(i))
            {
                console.log(`Wow...${o} is a match`)
                guess[l].childNodes[i].classList.add("green");
                keyList.forEach((key)=>{
                    if(letter==key.getAttribute('id'))
                    {
                        if(!key.classList.contains("green"))
                        {
                            key.classList.add("green");
    
                        }
                    }
                })
                correct+=1
            }
        }
        else{
            guess[l].childNodes[i].classList.add("gray");
            var letter=guess[l].childNodes[i].innerText;
            keyList.forEach((key)=>{
                if(letter==key.getAttribute('id'))
                {
                    if(!key.classList.contains("gray"))
                    {
                        key.classList.add("gray");

                    }
                }
            })
            
        }
    }
    if(correct==5)
    {

        console.log("Thats the right word!")
        setTimeout(alertMessage,500);
    }
    l+=1;
    str="";
    c=0;
}

function virtualKeyboard(){
    arr.map((item)=>{
        const i=document.getElementById(`${item}`);
        i.addEventListener('click',function(){
            console.log(`your key is ${i.getAttribute('id')}`)
            var p=i.getAttribute('id')
            if(c<5)
            {
                guess[l].childNodes[c].innerText=p  
                guess[l].childNodes[c].classList.add("border")          
                c+=1;
                str+=p;   
            }
        })
    });
    enterKey.addEventListener('click',(e)=>{
        console.log("You pressed enter");
        if(c==5)
            {
                e.preventDefault();
                console.log(str);
                checkWord();
            }
    });
    backspace.addEventListener('click',()=>{
        console.log("You pressed backspace");
        if(str.length >0)
        {
            str=str.slice(0,-1);
            c-=1;
            guess[l].childNodes[c].innerText=""  ;
            guess[l].childNodes[c].classList.remove("border")          
        }
    });
}
function keyboard(){
    document.addEventListener('keydown',(e)=>{
        const key=e.keyCode;
        if(e.keyCode===13)
        {
            if(c==5)
            {
                e.preventDefault();
                console.log(str);
                checkWord();
            }
        }
        else{
            if(key>=65 && key<=90)
            {
                var p=String.fromCharCode(key);
                console.log(guess[l].childNodes[c])
                guess[l].childNodes[c].classList.add("border")  
                guess[l].childNodes[c].innerText=p  
        
                c+=1;
                str+=p;
            }
            if(key==8)
            {
                if(str.length >0)
                {
                    str=str.slice(0,-1);
                    c-=1;
                    guess[l].childNodes[c].innerText="" 
                    guess[l].childNodes[c].classList.remove("border")           
                }
            }
        }

})}

keyboard();
virtualKeyboard();


