import "./style.css";

const dateInput = document.getElementById("date-input");
const iframe = document.getElementById("frame");
const gps = document.getElementById("gps");
const imageContainer = document.getElementById("image-container");
const weatherButton = document.getElementById("weather");
const equipBtn = document.getElementById("equipBtn");
let check = 1;
const equip = document.getElementById("equipment");

// EVENTLISTENERS
weatherButton.addEventListener("click", toggleWeather);
gps.addEventListener("click", toggleGps);
equipBtn.addEventListener("click", toggleEquip);
// end of eventlisteners

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
  equip.style.visibility = "hidden";
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

function toggleWeather() {
  iframe.src = "https://mars.nasa.gov/layout/embed/image/mslweather/";
  if (iframe.style.visibility === "visible" && check === 2) {
    iframe.style.visibility = "hidden";
  } else {
    iframe.style.visibility = "visible";
    imageContainer.innerHTML = "";
    check = 2;
    equip.style.visibility = "hidden";
  }
}

function toggleGps() {
  iframe.src = "https://mars.nasa.gov/maps/location/?mission=MSL&site=NOW";
  if (iframe.style.visibility === "visible" && check === 1) {
    iframe.style.visibility = "hidden";
  } else {
    iframe.style.visibility = "visible";
    imageContainer.innerHTML = "";
    check = 1;
    equip.style.visibility = "hidden";
  }
}

function toggleEquip() {
  imageContainer.innerHTML = "";
  equip.style.visibility = "visible";
  iframe.style.visibility = "hidden";
}
