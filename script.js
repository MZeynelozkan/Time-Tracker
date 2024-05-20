let currentButton;

const typeChooseDiv = document.querySelector(".typeChoose");
const typeChooseButtons = document.querySelectorAll(".liEl");

typeChooseDiv.addEventListener("click", async function (e) {
  currentButton = e.target.closest(".liEl");

  if (!currentButton) return;

  const data = await fetchData();

  typeChooseButtons.forEach((mov) => mov.classList.remove("active"));
  currentButton.classList.add("active");

  const daily = currentButton.classList.contains("daily");
  const weekly = currentButton.classList.contains("weekly");
  const monthly = currentButton.classList.contains("monthly");

  if (daily) {
    contentChanger(data, "daily");
  } else if (weekly) {
    contentChanger(data, "weekly");
  } else if (monthly) {
    contentChanger(data, "monthly");
  }
});

function contentChanger(data, type) {
  data.forEach((item) => {
    const cardClass = `${item.title.toLowerCase().replace(/ /g, "-")}-card`;
    console.log("Looking for card with class:", cardClass);
    const card = document.querySelector(`.${cardClass}`);
    if (card) {
      console.log("Found card:", card);
      card.querySelector(
        ".hrs"
      ).textContent = `${item.timeframes[type].current}hrs`;
      card.querySelector(".low").textContent = `Last ${
        type.charAt(0).toUpperCase() + type.slice(1)
      } - ${item.timeframes[type].previous}hrs`;
    } else {
      console.warn("Card not found for item:", item);
    }
  });
}

async function fetchData() {
  const response = await fetch("data.json");
  const data = await response.json();
  console.log(data);
  return data;
}
