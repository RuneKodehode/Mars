import "./style.css";

const dateInput = document.getElementById("date-input");
let count = 0;
dateInput.addEventListener("change", async (event) => {
  const date = event.target.value;
  const apiEndpoint = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=nbOcqt4gNqe7vaqXhEVlZ2Xu4rHfu2IK68Xdvgov`;

  const response = await fetch(apiEndpoint);
  const data = await response.json();
  const imageUrls = data.photos.map((photo) => photo.img_src);
  document.getElementById(
    "sol"
  ).textContent = `Martian Sol: ${data.photos[0].sol}`;

  const imageContainer = document.getElementById("image-container");
  imageContainer.innerHTML = "";

  imageUrls.forEach((url) => {
    const img = document.createElement("img");
    img.src = url;

    img.addEventListener("click", () => {
      img.classList.toggle("expanded");
    });
    imageContainer.appendChild(img);
  });
});

// ----------------------------------------
const SCALE = 3;
const SIZE = Math.min(window.innerWidth, window.innerHeight) / 4;
const LENSE_OFFSET_X = SIZE / 2.5;
const LENSE_OFFSET_Y = SIZE / 5;

document.documentElement.style.setProperty("--scale", SCALE);
document.documentElement.style.setProperty("--size", SIZE + "px");

const handle = document.createElement("div");
handle.classList.add("handle");

const magnifyingGlass = document.createElement("div");
magnifyingGlass.classList.add("magnifying-glass");
magnifyingGlass.style.top = LENSE_OFFSET_Y + "px";
magnifyingGlass.style.left = LENSE_OFFSET_X + "px";

handle.append(magnifyingGlass);

const magnifyButton = document.getElementById("magnify");
let on = false;
const addMagnifyingGlass = () => {
  if (on == false) {
    let bodyClone = document.body.cloneNode(true);
    bodyClone.classList.add("body-clone");
    bodyClone.style.top = "0";
    bodyClone.style.left = "0";
    magnifyingGlass.append(bodyClone);
    document.body.append(handle);
    let frame = document.getElementById("iframe");
    frame.style = "visibility:hidden";
    console.log(frame);
    on = true;
  } else if (on == true) {
    magnifyingGlass.children[0].remove();
    handle.remove();
    on = false;
  }
};
// I am so fucking tired at the moment.
magnifyButton.addEventListener("click", addMagnifyingGlass);

const moveMagnifyingGlass = (event) => {
  let pointerX = event.pageX;
  let pointerY = event.pageY;

  // Calculate the position of the magnifying glass relative to the mouse
  let glassX = pointerX - LENSE_OFFSET_X;
  let glassY = pointerY - LENSE_OFFSET_Y;

  handle.style.left = pointerX - SIZE / 2 + "px";
  handle.style.top = pointerY - SIZE / 1 + "px";
  if (magnifyingGlass.children[0]) {
    let offsetX = (SIZE * Math.pow(SCALE, 2)) / 1.5 - glassX * SCALE;
    let offsetY = (SIZE * Math.pow(SCALE, 2)) / 2 - glassY * SCALE;
    magnifyingGlass.children[0].style.left = offsetX + "px";
    magnifyingGlass.children[0].style.top = offsetY + "px";
  }
};
document.addEventListener("pointermove", moveMagnifyingGlass);

const removeMagnifiyingGlass = (event) => {
  magnifyingGlass.children[0].remove();
  handle.remove();
  on = false;
};

magnifyingGlass.addEventListener("dblclick", removeMagnifiyingGlass);

window.addEventListener("resize", () => {
  const newSize = Math.min(window.innerWidth, window.innerHeight) / 4;
  const newOffsetX = newSize / 2.5;
  const newOffsetY = newSize / 5;

  document.documentElement.style.setProperty("--size", newSize + "px");
  magnifyingGlass.style.top = newOffsetY + "px";
  magnifyingGlass.style.left = newOffsetX + "px";
});

const weatherButton = document.getElementById("weather");

weatherButton.addEventListener("click", toggleWeather);
const iframe = document.getElementById("frame");

const gps = document.getElementById("gps");

function toggleWeather() {
  iframe.src = "https://mars.nasa.gov/layout/embed/image/mslweather/";
  if (document.getElementById("frame").style.visibility == "visible") {
    document.getElementById("frame").style.visibility = "hidden";
  } else {
    iframe.src === "";

    document.getElementById("frame").style.visibility = "visible";
  }
}

gps.addEventListener("click", toggleGps);

function toggleGps() {
  iframe.src = "https://mars.nasa.gov/maps/location/?mission=MSL&site=NOW ";
  if (document.getElementById("frame").style.visibility == "visible") {
    document.getElementById("frame").style.visibility = "hidden";
  } else {
    document.getElementById("frame").style.visibility = "visible";
  }
}
