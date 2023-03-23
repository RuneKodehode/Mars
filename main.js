import "./style.css";

const dateInput = document.getElementById("date-input");
let count = 0;
dateInput.addEventListener("change", async (event) => {
  const date = event.target.value;
  const apiEndpoint = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=nbOcqt4gNqe7vaqXhEVlZ2Xu4rHfu2IK68Xdvgov`;

  const response = await fetch(apiEndpoint);
  const data = await response.json();
  const imageUrls = data.photos.map((photo) => photo.img_src);

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
