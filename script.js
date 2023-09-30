const postCard = document.getElementById("post");
const likesCount = document.getElementById("likes-count");

let likes = 0;

function createHeart({ offsetX, offsetY }) {
  const iconEl = document.createElement("i");
  iconEl.classList.add("fas", "fa-heart");
  iconEl.style.top = `${offsetY}px`;
  iconEl.style.left = `${offsetX}px`;
  return iconEl;
}

function insertHeart(element, { offsetX, offsetY }) {
  const heart = createHeart({
    offsetX,
    offsetY,
  });

  element.appendChild(heart);
  setTimeout(() => element.removeChild(heart), 1000);
}

function onDoubleClick(element, handler) {
  let taps = 0;
  let tapTimeout;

  const clearListener = () => {
    tapTimeout = setTimeout(() => {
      clearTimeout(tapTimeout);
      taps = 0;
    }, 500);
  };

  element.addEventListener("click", function (event) {
    taps += 1;
    if (taps === 2) handler?.(event);
    clearListener();
  });
}

onDoubleClick(postCard, function (event) {
  const area = document.createElement("div");
  area.classList.add("heart-area");
  postCard.appendChild(area);
  likes += 1;
  likesCount.innerText = likes;
  insertHeart(area, event);
});
