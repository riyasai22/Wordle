
const arr=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
const arr1=['Q','W','E','R','T','Y','U','I','O','P'];
const arr2=['A','S','D','F','G','H','J','K','L'];
const arr3=['Z','X','C','V','B','N','M'];

const wordList=["OTHER","PIANO","VIDEO","ABOUT","LUNCH","ROBOT","APPLE","MANGO","EVERY","SHELF","EARTH","SOLID","SPACE","EIGHT","EXTRA"];

var decider=Math.floor((Math.random() * 15) + 1);

const word=wordList[decider]

const guess=document.querySelectorAll('.guess');
const keyrow1=document.getElementById('keyrow1');
const keyrow2=document.getElementById('keyrow2');
const keyrow3=document.getElementById('keyrow3');

// const input = document.getElementById('input')

// input.addEventListener('change', () => {
//   readXlsxFile(input.files[0]).then((data) => {
//     // `data` is an array of rows
//     // each row being an array of cells.
//   })
// })

// console.log(keyrow1);


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
                // console.log("yeah"+letter)
                // console.log(key.getAttribute('id'));
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
               
                // var letter=guess[l].childNodes[i].innerText;
                keyList.forEach((key)=>{
                    // console.log("yeah"+letter)
                    // console.log(key.getAttribute('id'));
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
                // console.log("yeah"+letter)
                // console.log(key.getAttribute('id'));
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
        // console.log(i);
        i.addEventListener('click',function(){
            console.log(`your key is ${i.getAttribute('id')}`)
            var p=i.getAttribute('id')
            // console.log(c)
            if(c<5)
            {
                guess[l].childNodes[c].innerText=p  
                guess[l].childNodes[c].classList.add("border")          
                c+=1;
                str+=p;   
            }

            // guess[l].childNodes[c].innerText=p  
            // guess[l].childNodes[c].classList.add("border")          
            // c+=1;
            // str+=p;
        })
    });
    enterKey.addEventListener('click',(e)=>{
        console.log("You pressed enter");
        if(c==5)
            {
                e.preventDefault();
                console.log(str);
                checkWord();
                // l+=1;
                // str="";
                // c=0;
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
    // var c=0;
    // var str="";
    // var l=0;
    document.addEventListener('keydown',(e)=>{
        const key=e.keyCode;
        if(e.keyCode===13)
        {
            if(c==5)
            {
                e.preventDefault();
                console.log(str);
                // for(let i=0;i<5;i++)
                // {
                //     if(str.charAt(i)==word.charAt(i))
                //     {
                //         var o=str.charAt(i)
                //         console.log(`Wow...${o} is a match`)
                //     }
                // }

                //CHECK WORD LOGIC

                // var correct=0;
                // for(let i=0;i<5;i++)
                // {
                //     console.log(str.charAt(i))
                //     if(word.includes(str.charAt(i)))
                //     {
                //         var o=str.charAt(i)
                //         console.log(`${o} is present in the word`)
                //         guess[l].childNodes[i].classList.add("orange");
                //         if(str.charAt(i)==word.charAt(i))
                //         {
                //             console.log(`Wow...${o} is a match`)
                //             guess[l].childNodes[i].classList.add("green");
                //             correct+=1
                //         }
                //     }
                //     else{
                //         guess[l].childNodes[i].classList.add("gray");
                //     }
                // }
                // if(correct==5)
                // {
                //     console.log("Thats the right word!")
                // }

                checkWord();

                // console.log(guess[0].childNodes[1])
                // console.log(guess[0].childNodes[2])
                // console.log(guess[0].childNodes[3])
                // guess[0].childNodes[1].val=str.charAt(0);
                // guess[0].childNodes[2].val=str.charAt(1);
                // guess[0].childNodes[3].val=str.charAt(2);
                // guess[0].childNodes[4].val=str.charAt(3);
                // guess[0].childNodes[5].val=str.charAt(4);

                // for(let i=0;i<5;i++)
                // {
                //     console.log(guess[0].childNodes[0]);
                // }
                // for(let i=0;i<6;i++){
                //     for(let j=0;j<5;j++)
                //     {
                //     console.log(guess[i].childNodes.forEach((item)=>{
                //         console.log(item+" "+str.charAt(j));
                //         item.value=str.charAt(j);
                //     }));
                // }
                    // for(let j=0;j<5;j++)
                    // {
                    //     console.log(guess[i].childNodes);
                    // }

                    // l+=1;
                    // str="";
                    // c=0;
            }
        }
        else{
            // console.log(key);
            // var p=String.fromCharCode((96 <= key && key <= 105) ? key-48 : key)
            // console.log(guess[l].childNodes)
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
            // console.log(guess[l].childNodes[c]+" "+p)
        }
        // console.log(p,c,str);
})}
    // document.addEventListener("keyup",(e)=>{
    //     // console.log(c);
    //     if(e.keyCode===13 && c==6)
    //     {
    //         e.preventDefault();
    //         console.log(str);
    //     }
    //     else if(c<6){
    //         alert(`Add ${6-c} more characters`);
    //     }
    // })
keyboard();
virtualKeyboard();
// const p=apple();
// console.log(p)


