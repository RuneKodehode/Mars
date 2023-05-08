import "./style.css";

const dateInput = document.getElementById("date-input");
const iframe = document.getElementById("frame");
const gps = document.getElementById("gps");
const imageContainer = document.getElementById("image-container");
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
  iframe.style.visibility = "hidden";
  imageUrls.forEach((url) => {
    const img = document.createElement("img");
    img.src = url;

    img.addEventListener("click", () => {
      img.classList.toggle("expanded");
    });
    imageContainer.appendChild(img);
  });
});

const weatherButton = document.getElementById("weather");

weatherButton.addEventListener("click", toggleWeather);

console.log(iframe.style.visibility);

let check = 1;

function toggleWeather() {
  iframe.src = "https://mars.nasa.gov/layout/embed/image/mslweather/";
  if (iframe.style.visibility === "visible" && check === 2) {
    iframe.style.visibility = "hidden";
  } else {
    iframe.style.visibility = "visible";
    imageContainer.innerHTML = "";
    check = 2;
  }
}

gps.addEventListener("click", toggleGps);

function toggleGps() {
  iframe.src = "https://mars.nasa.gov/maps/location/?mission=MSL&site=NOW";
  if (iframe.style.visibility === "visible" && check === 1) {
    iframe.style.visibility = "hidden";
  } else {
    iframe.style.visibility = "visible";
    imageContainer.innerHTML = "";
    check = 1;
  }
}
