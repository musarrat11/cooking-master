for (let index = 0; index < 8; index++) {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res=>res.json())
    .then(data=>showData(data.meals[0])) 
}
function showData(object) {
   const name=object.strMeal;//meals ekta element jeta ekta array hishebe ase. etar[0] te ekta objet ase setar ekta element hoilo strmeal
   const image=object.strMealThumb;
   const id= object.idMeal;
   const showCard=document.getElementById('cards');
   const div=document.createElement('div');
   const card=`
    <div onclick="showRecipe(${id})" class="card" >
  <img src="${image}" class="card-img-top" alt="...">
  <div class="card-body">
  <h6>${name}</h6>
  </div>
</div>
   `
   div.innerHTML=card;
   showCard.appendChild(div);
}

function displayDetails(){
const search=document.getElementById('search');
const likha= search.value;
search.value="";
const showCard=document.getElementById('cards1');
showCard.innerHTML=" ";
fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${likha}`)
    .then(res=>res.json())
    .then(data=>match(data.meals))  
}

function match(array) {
document.getElementById('cards').style.display="none";
if(array==null){
   const showCard=document.getElementById('no');
   showCard.style="block";
   showCard.innerHTML="no recipe found";
}
else{
   document.getElementById('no').style.display="none";
   const showCard=document.getElementById('cards1');
   for (let index = 0; index < array.length; index++) {
      const element = array[index];
      const name= element.strMeal;
      const id= element.idMeal;
   const image=element.strMealThumb;
   const div=document.createElement('div');
   const card=`
    <div onclick="showRecipe(${id})" class="card" id="${id}">
  <img src="${image}" class="card-img-top" alt="...">
  <div class="card-body">
  <h6>${name}</h6>
  </div>
</div>
   `
    div.innerHTML=card;
 showCard.appendChild(div);
   }
    }
   }

function showRecipe(id) {
   document.getElementById('cards').style.display="none";
   document.getElementById('cards1').style.display="none";
   document.getElementById('searching').style.display="none";
   const showCard= document.getElementById('showfull');
   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res=>res.json())
    .then(data=>{
       const name=data.meals[0].strMeal;
       const image=data.meals[0].strMealThumb;
       const div=document.createElement('div');
      const card=`
      <div class="list" >
    <img src="${image}" class="card-img-top" alt="...">
    <div class="card-body" id="one">
    <h5>${name}</h5>
    <ul id="khabar"></ul> 
    </div>
  </div>
     `
    div.innerHTML=card;
     showCard.appendChild(div);
     const ul=document.getElementById("khabar"); //{`id`}
     for (let index = 1; index <= 20; index++) { 
      const measure=(data.meals[0])[`strMeasure${index}`];
      const ingred=(data.meals[0])[`strIngredient${index}`];
      if((measure !== null) && (ingred !== "")){
         const line = document.createElement('li');
          line.innerText = (measure+" "+ingred);
          ul.appendChild(line);
      }
}
    })  
}

