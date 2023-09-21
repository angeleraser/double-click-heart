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

function setupHeartEffect(element) {
  const area = document.createElement("div");
  area.classList.add("heart-area");
  element.appendChild(area);

  function onDoubleClick(event) {
    insertHeart(area, event);
    likesCount.textContent = likes += 1;
  }

  element.addEventListener("dblclick", onDoubleClick);
  setupDoubleTap(postCard, onDoubleClick);
}

function setupDoubleTap(element, handler) {
  let taps = 0;
  let tapTimeout;

  const clearListener = () => {
    tapTimeout = setTimeout(() => {
      clearTimeout(tapTimeout);
      taps = 0;
    }, 300);
  };

  element.addEventListener(
    "click",
    function (event) {
      taps += 1;

      if (taps === 2) {
        clearListener();
        handler?.(event);
      }
    },
    { passive: true }
  );

  element.addEventListener("touchend", clearListener, { passive: true });
}

setupHeartEffect(postCard);
