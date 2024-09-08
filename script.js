const nav = document.querySelector("nav");
const hambugerMenu = document.querySelector(".hamb-icon");
const backProjectBtn = document.querySelector(".bookmark-container button");
const rewardSelectors = document.querySelectorAll("main .pledge-container button");
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
const popupPledges = document.querySelectorAll(".popup article:first-child .pledge-container");
const statsContainer = document.querySelector(".stats-container");
const thankfulPopupButton = document.querySelector(".thank-popup button");

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



const standTypes = ["none","bamboo","black","mahogany"];
const standLefts = [101,64,0];
const standTypeInfos = {};

standTypeInfos[standTypes[0]] = false;
for(let i=1;i<popupPledges.length;i++){
	standTypeInfos[standTypes[i]] = {
		"rewardButton": rewardSelectors[i-1],
		"circleCheck": checkCircles[i],
		"left": standLefts[i-1],
		"minPledge":pledgeAmounts[i-1]
	};
	popupPledges[i].standType = standTypes[i];
	rewardSelectors[i-1].standType = standTypes[i];
	if(!standTypeInfos[rewardSelectors[i-1].standType]["left"]){
		//console.log(rewardSelectors[i-1]);
		popupPledges[i].classList.add("sellout");
		rewardSelectors[i-1].parentElement.parentElement.classList.add("sellout");
		rewardSelectors[i-1].textContent = "Out of stock";
	}
};

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
			if(!standTypeInfos[element.standType]["left"]){
				return;
			}
			const parentContainer = standTypeInfos[element.standType]["circleCheck"].parentElement.parentElement.parentElement;
			parentContainer.classList.add("active");
			lastChecked = element;
			lastCheckedContainer = parentContainer;
		}
		popup.classList.add("active");
	});
});

checkCircles.forEach(function(element){
	element.addEventListener("click",function(e){
		const parentContainer = e.currentTarget.parentElement.parentElement.parentElement;
		if(!standTypeInfos[parentContainer.standType]){
			let popupPledges = popup.querySelector("article.container");
			popupPledges.classList.add("hide");
			thankfulPopupButton.parentElement.parentElement.classList.add("active");
			popup.classList.add("flex");
			numberOfBackers += 1;
			let statistics = statsContainer.querySelectorAll("h2");
			statistics[1].textContent = numberOfBackers;
			return;
		}

		if(lastChecked !== e.currentTarget){
			if(lastChecked){
				lastCheckedContainer.classList.remove("active");
			}
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
		lastChecked = false;
		lastCheckedContainer = false;
	}
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

inputs.forEach(function(element){
	element.addEventListener("input",function(e){
		const userInput = e.currentTarget.value = e.currentTarget.value.trim();
		const minPledge = standTypeInfos[lastCheckedContainer.standType]["minPledge"];
		console.log("user input: ",userInput);
		console.log("min pledge : ",minPledge);
		if(!currentInput){
			currentInput = e.currentTarget;
		}
		else if(currentInput !== e.currentTarget){
			currentInput.value = "";
			currentInput = e.currentTarget;
		}
		
		if(/^\d+$/.test(userInput)){
			if(minPledge <= parseInt(userInput) && parseInt(userInput) <= maxAmountPossible){
				console.log("in between values,correct!");
				amountToAdd = parseInt(userInput);
			}
			else{
				console.log("should be 0");
				amountToAdd = 0;
			}
		}
	});
});

submitButtons.forEach(function(element){
	element.addEventListener("click",function(e){
		e.preventDefault();
		if(amountToAdd){
			currentAmount += amountToAdd;
			maxAmountPossible = objective - currentAmount;
			numberOfBackers += 1;
			standTypeInfos[lastCheckedContainer.standType]["left"] -= 1;
			//create function to update all UI elements with new values
			let leftovers = lastCheckedContainer.querySelectorAll(".left-and-reward b");
			let rewardSectionContainer = standTypeInfos[lastCheckedContainer.standType]["rewardButton"].parentElement.parentElement;
			let rewardLeftovers = rewardSectionContainer.querySelectorAll(".left-and-reward b");
			[...leftovers,...rewardLeftovers].forEach(function(element){
				element.textContent = standTypeInfos[lastCheckedContainer.standType]["left"];
			});
			let statistics = statsContainer.querySelectorAll("h2");
			statistics[0].textContent = currentAmount;
			statistics[1].textContent = numberOfBackers;
			statistics[2].textContent = daysLeft;
			console.log("statistics: ",statistics);
			fillingBar.style.width = `${(currentAmount / objective) * 100}%`;

			let popupPledges = popup.querySelector("article.container");
			popupPledges.classList.add("hide");
			thankfulPopupButton.parentElement.parentElement.classList.add("active");
			popup.classList.add("flex");
		}
	});
});

thankfulPopupButton.addEventListener("click",function(e){
	e.preventDefault;
	let popupPledges = popup.querySelector("article.container");
	popup.classList.remove("active");
	popup.classList.remove("flex");
	popupPledges.classList.remove("hide");
	thankfulPopupButton.parentElement.parentElement.classList.remove("active");

	if(lastChecked){
		lastCheckedContainer.classList.remove("active");
		lastChecked = false;
		lastCheckedContainer = false;
	}
});
