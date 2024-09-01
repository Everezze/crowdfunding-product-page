const nav = document.querySelector("nav");
const hambugerMenu = document.querySelector(".hamb-icon");
const backProjectBtn = document.querySelector(".bookmark-container button");
const rewardSelectors = document.querySelectorAll(".pledge-container button");
const popup = document.querySelector(".popup");
const ctas = [backProjectBtn,...rewardSelectors];
const checkCircles = document.querySelectorAll(".circle-check-container");
const closeModalCross = document.querySelector(".close-modal");
const bookmarkButton = document.querySelector(".bookmark");
const progressBar = document.querySelector(".progress-bar");
const fillingBar = document.querySelector(".filling-bar");
const submitButtons = document.querySelectorAll(".cta button");
const inputs = document.querySelectorAll(".input-wrapper input");
const leftovers = document.querySelectorAll(".left-and-reward b");

const pledgeAmounts = [25,75,200];
const pledgesAndCircles = {};
let lastChecked = false;
let lastCheckedContainer = false;
let currentInput = false;
let validInput = false;

let currentAmount = 89_914;
let amountToAdd = 0;
const objective = 100_000;
let maxAmountPossible = objective - currentAmount;
let numberOfBackers = 5_007;
let daysLeft = 56;
//let bambooStandLeft = 101;
//let blackStandLeft =64;
//let mahoganyStandLeft = 0;
const StandtypeLeft = {
	25:101,
	75:64,
	200:0
};

//linking every pledge to a circle check so when user click it, the popup opens
//with the selected pledge UI already active 
for(let i=0; i<rewardSelectors.length;i++){
	rewardSelectors[i].pledgeAmount = pledgeAmounts[i];
	checkCircles[i+1].pledgeAmount = pledgeAmounts[i];
	pledgesAndCircles[pledgeAmounts[i]] = checkCircles[i];
};

//console.log(backProjectBtn);
//console.log(rewardSelectors);
//console.log(ctas);
//console.log(checkCircles);
console.log(submitButtons);

fillingBar.style.width = `${(currentAmount / objective) * 100}%`;

hambugerMenu.addEventListener("click",function(){
	console.log(this);
	nav.classList.toggle("active");
	if(nav.classList.contains("active")){
		this.setAttribute("src","images/icon-close-menu.svg");
	}
	else{
		this.setAttribute("src","images/icon-hamburger.svg");
	}
});

ctas.forEach(function(element){
	element.addEventListener("click",function(e){
		if(element !== backProjectBtn){
			const parentContainer = pledgesAndCircles[element.pledgeAmount].parentElement.parentElement.parentElement;
			parentContainer.classList.add("active");
			lastChecked = element;
			lastCheckedContainer = parentContainer;
		}
		popup.classList.add("active");
	});
});

checkCircles.forEach(function(element){
	element.addEventListener("click",function(e){
		if(lastChecked !== e.currentTarget){
			if(lastChecked){
				lastCheckedContainer.classList.remove("active");
			}
			const parentContainer = e.currentTarget.parentElement.parentElement.parentElement;
			parentContainer.classList.add("active");
			lastChecked = e.currentTarget;
			lastCheckedContainer = parentContainer;
		}
	});
});

closeModalCross.addEventListener("click",function(){
	popup.classList.remove("active");
	if(lastChecked){
		lastCheckedContainer.classList.remove("active");
	}
	lastChecked = false;
	lastCheckedContainer = false;
});

bookmarkButton.addEventListener("click",function(){
	const span = this.querySelector("span");
	this.classList.toggle("active");
	if(this.classList.contains("active")){
		span.textContent = "Bookmarked";
	}
	else{
		span.textContent = "Bookmark";
	}
});

inputs.addEventListener("input",function(e){
	const userInput = e.currentTarget.value = e.currentTarget.value.trim();
	const minPledge = lastCheckedContainer.querySelector(".circle-check-container").pledgeAmount;
	if(!currentInput){
		currentInput = e.currentTarget;
	}
	else if(currentInput !== e.currentTarget){
		currentInput.value = "";
		currentInput = e.currentTarget;
	}
	
	if(/^\d+$/.test(userInput)){
		if(minPledge <= parseInt(userInput) <= maxAmountPossible){
			amountToAdd = userInput;
		}
	}
});

submitButtons.addEventListener("click",function(e){
	e.preventDefault();
	if(amountToAdd){
		currentAmount += amountToAdd;
		maxAmountPossible = objective - currentAmount;
		numberOfBackers += 1;
		StandtypeLeft[lastCheckedContainer.querySelector(".circle-check-container").pledgeAmount] -= 1;
		//create function to update all UI elements with new values
		for(let i =0;i<leftovers.length;i++){
			leftovers[i].textContent = 
		}
	};
});
