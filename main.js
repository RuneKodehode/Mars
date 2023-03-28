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
    count++;
    document.getElementById("dateEnter").textContent = null;
    document.getElementById("counter").textContent = count + " Images";
    img.addEventListener("click", () => {
      img.classList.toggle("expanded");
    });
    imageContainer.appendChild(img);
  });
});

// ----------------------------------------

const SCALE = 3;
const SIZE = 300;
const LENSE_OFFSET_X = SIZE / 7;
const LENSE_OFFSET_Y = SIZE / 7;

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
    bodyClone.style.top = "0px";
    bodyClone.style.left = "0px";
    magnifyingGlass.append(bodyClone);
    document.body.append(handle);
    on = true;
  } else if (on == true) {
    magnifyingGlass.children[0].remove();
    handle.remove();
    on = false;
  }
};

magnifyButton.addEventListener("click", addMagnifyingGlass);

const moveMagnifyingGlass = (event) => {
  let pointerX = event.pageX;
  let pointerY = event.pageY;

  // Calculate the position of the magnifying glass relative to the mouse
  let glassX = pointerX - LENSE_OFFSET_X;
  let glassY = pointerY - LENSE_OFFSET_Y;

  handle.style.left = pointerX - SIZE / 1.8 + "px";
  handle.style.top = pointerY - SIZE / 1 + "px";
  if (magnifyingGlass.children[0]) {
    // Calculate the offset based on the position of the mouse relative to the magnifying glass
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
