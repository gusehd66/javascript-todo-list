const color = ["#F8F9B1", "#F6CEC8", "#B1E5F6", "#A5B8FB", "#E5C5FE"];
//#F8F9B1 #F6CEC8 #B1E5F6 #A5B8FB #E5C5FE
const chosenColor = color[Math.floor(Math.random() * color.length)];

const body = document.body;

body.style.backgroundColor = chosenColor;
