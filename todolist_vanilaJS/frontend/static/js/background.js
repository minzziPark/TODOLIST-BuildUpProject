const images = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `static/img/${chosenImage}`;
document.body.appendChild(bgImage);
bgImage.classList.add("bgImage");
