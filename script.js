// Fetch cards from the API based on the search query
function searchCards() {
  const searchInput = document.getElementById("searchInput").value.trim();

  if (searchInput !== "") {
    fetch(`https://api.pokemontcg.io/v2/cards?q=name:${encodeURIComponent(searchInput)}`)
      .then(response => response.json())
      .then(data => displayCards(data.data))
      .catch(error => console.error(error));
  }
}

// Display the cards on the webpage
function displayCards(cards) {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  cards.forEach(card => {
    const cardElement = createCardElement(card);
    cardContainer.appendChild(cardElement);
  });
}

// Create a card element
function createCardElement(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const imageElement = document.createElement("img");
  imageElement.src = card.images.small;
  imageElement.alt = card.name;
  cardElement.appendChild(imageElement);

  const nameElement = document.createElement("p");
  nameElement.textContent = card.name;
  cardElement.appendChild(nameElement);

  const actionsElement = document.createElement("div");
  actionsElement.classList.add("actions");
  cardElement.appendChild(actionsElement);

  const addButton = document.createElement("button");
  addButton.innerHTML = "+";
  addButton.addEventListener("click", () => selectCard(cardElement, card));
  actionsElement.appendChild(addButton);

  cardElement.addEventListener("click", () => selectCard(cardElement, card));

  return cardElement;
}

// Select a card and add it to the card set
function selectCard(cardElement, card) {
  if (cardElement.classList.contains("selected-card")) {
    cardElement.classList.remove("selected-card");
    removeCardFromSet(card);
  } else {
    if (getSelectedCardsCount() >= 60) {
      alert("You can only select up to 60 cards.");
      return;
    }
    cardElement.classList.add("selected-card");
    addCardToSet(card);
  }
}

// Add a card to the card set
function addCardToSet(card) {
  const cardSet = document.getElementById("cardSet");

  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const imageElement = document.createElement("img");
  imageElement.src = card.images.small;
  imageElement.alt = card.name;
  cardElement.appendChild(imageElement);

  const nameElement = document.createElement("p");
  nameElement.textContent = card.name;
  cardElement.appendChild(nameElement);

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "x";
  deleteButton.addEventListener("click", () => removeCardFromSet(cardElement, card));
  cardElement.appendChild(deleteButton);

  cardSet.appendChild(cardElement);
}

// Remove a card from the card set
function removeCardFromSet(cardElement, card) {
  const cardSet = document.getElementById("cardSet");
  cardSet.removeChild(cardElement);
}

// Get the count of selected cards
function getSelectedCardsCount() {
  const cardSet = document.getElementById("cardSet");
  return cardSet.getElementsByClassName("card").length;
}
