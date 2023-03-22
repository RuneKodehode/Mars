import "/style.css";
import axios from "axios";

const date = document.getElementById("dateInput");
const dateInputOne = document.getElementById("dateInputOne");
const dateInputTwo = document.getElementById("dateInputTwo");
const dateInputThree = document.getElementById("dateInputThree");
const submitBtn = document.getElementById("submitBtn");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const pic = document.getElementById("picture");
let imageNumber = 0;
let imageCounter = 0;
function setInputDate() {
  let dato =
    dateInputOne.value + "-" + dateInputTwo.value + "-" + dateInputThree.value;
  console.log(dato);
  axios
    .get(
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" +
        dato +
        "&camera=navcam&api_key=nbOcqt4gNqe7vaqXhEVlZ2Xu4rHfu2IK68Xdvgov"
    )
    .then((response) => {
      let imgUrl = response.data.photos[imageNumber].img_src;
      pic.src = imgUrl;

      imageCounter = response.data.photos.length;
      document.getElementById("navBar").innerHTML =
        imageNumber + 1 + "/" + imageCounter;

      //   return (imageCounter = response.data.photos.length);
    })

    .catch((error) => {
      console.log(error);
    });
}

submitBtn.addEventListener("click", function () {
  imageNumber = 0;

  setInputDate();
  console.log(imageCounter);
});

next.addEventListener("click", function () {
  imageNumber === imageCounter ? null : imageNumber++;
  setInputDate();
  console.log(imageNumber);
});
prev.addEventListener("click", function () {
  imageNumber === 0 ? null : imageNumber--;
  setInputDate();
  console.log(imageNumber);
});
