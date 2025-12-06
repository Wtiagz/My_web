/* Tabs */
function opentab(tabname){
  var tablinks=document.getElementsByClassName("tab-links");
  var tabcontents=document.getElementsByClassName("tab-contents");
  for(let tablink of tablinks){ tablink.classList.remove("active-link"); }
  for(let tabcontent of tabcontents){ tabcontent.classList.remove("active-tab"); }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}


/* Mobile menu */
var sidemenu=document.getElementById("sidemenu");
function openmenu(){ sidemenu.style.right="0"; }
function closemenu(){ sidemenu.style.right="-200px"; }


/* Google Sheets form */
const scriptURL='https://script.google.com/macros/s/AKfycbxR3jLYd4ScoODVg9wBg32YLFrbqQVOUtPSy4BYg153L5C6NGOqYnEWz1TJC5uCmyBY/exec'
const form=document.forms['submit-to-google-sheet']
const msg=document.getElementById("msg")
form.addEventListener('submit', e=>{
  e.preventDefault()
  fetch(scriptURL, { method:'POST', body:new FormData(form)})
    .then(response=>{
      msg.innerHTML="Your message sent successfully!"
      msg.classList.add("show")
      setTimeout(()=>{ msg.classList.remove("show"); msg.innerHTML=""; },5000)
      form.reset()
    })
    .catch(error=>console.error('Error!', error.message))
})


/* Fade-in on scroll */
const faders=document.querySelectorAll('.fade-in');
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('show'); }
  });
});
faders.forEach(fade=>observer.observe(fade));


/* Active nav highlight */
const sections=document.querySelectorAll("div[id]");
const navLinks=document.querySelectorAll("nav ul li a");
window.addEventListener("scroll",()=>{
  let current="";
  sections.forEach(sec=>{
    const top=sec.offsetTop-150;
    if(pageYOffset>=top) current=sec.getAttribute("id");
  });
  navLinks.forEach(link=>{
    link.classList.remove("active-link");
    if(link.getAttribute("href").includes(current)){
      link.classList.add("active-link");
    }
  });
});


/* Typing effect */
const texts=["Wilrose","a Web Developer"];
let i=0,j=0,currentText="",isDeleting=false;
function typeEffect(){
  currentText=texts[i];
  document.querySelector(".typing").textContent=currentText.substring(0,j);
  if(!isDeleting && j<currentText.length){ j++; setTimeout(typeEffect,150);}
  else if(isDeleting && j>0){ j--; setTimeout(typeEffect,100);}
  else{
    isDeleting=!isDeleting;
    if(!isDeleting){ i=(i+1)%texts.length; }
    setTimeout(typeEffect,1000);
  }
}
typeEffect();