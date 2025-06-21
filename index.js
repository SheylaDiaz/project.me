// Example: Dynamically load facts or toggle endangered animals

document.addEventListener("DOMContentLoaded", () => {
  const endangeredBox = document.querySelector(".box3");
  const dangerButton = document.createElement("button");

  dangerButton.textContent = "Show Endangered Species";
  endangeredBox.appendChild(dangerButton);

  dangerButton.addEventListener("click", () => {
    const list = document.createElement("ul");
    list.innerHTML = `
      <li>Vaquita (porpoise)</li>
      <li>Hawksbill Turtle</li>
      <li>Blue Whale</li>
      <li>Giant Manta Ray</li>
    `;
    endangeredBox.appendChild(list);
    dangerButton.disabled = true;
  });
});
