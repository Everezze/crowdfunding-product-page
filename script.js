const nav = document.querySelector("nav");
const hambugerMenu = document.querySelector(".hamb-icon");
const backProjectBtn = document.querySelector(".bookmark-container button");
const rewardSelectors = document.querySelectorAll(".pledge-container button");
const popup = document.querySelector(".popup");
const ctas = [backProjectBtn,...rewardSelectors];

console.log(backProjectBtn);
console.log(rewardSelectors);
console.log(ctas);

hambugerMenu.addEventListener("click",function(){
	console.log(this);
	nav.classList.toggle("active");
});

ctas.forEach(function(element){
	element.addEventListener("click",function(){
		popup.classList.toggle("active");
	});
});
