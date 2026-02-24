const pokemonCache = {};
let currentPokemon = null;

const fetchBtn = document.getElementById("fetchBtn");
const addToTeamBtn = document.getElementById("addToTeamBtn");
const pokemonDisplay = document.getElementById("pokemonDisplay");
const teamDisplay = document.getElementById("teamDisplay");

fetchBtn.addEventListener("click", fetchPokemon);
addToTeamBtn.addEventListener("click", addToTeam);

function fetchPokemon() {
  const input = document.getElementById("pokemonInput").value.toLowerCase();

  if (!input) return;

  if (pokemonCache[input]) {
    displayPokemon(pokemonCache[input]);
    return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
    .then(response => {
      if (!response.ok) throw new Error("Pokemon not found");
      return response.json();
    })
    .then(data => {
      pokemonCache[input] = data; // cache response
      displayPokemon(data);
    })
    .catch(error => {
      pokemonDisplay.innerHTML = "<p>Error loading Pokémon.</p>";
      addToTeamBtn.disabled = true;
    });
}

function displayPokemon(data) {
  currentPokemon = data;
  addToTeamBtn.disabled = false;

  const moves = data.moves.map(m => m.move.name);

  pokemonDisplay.innerHTML = `
    <h2>${data.name}</h2>
    <img src="${data.sprites.front_default}" alt="${data.name}">
    <br><br>
    <audio controls src="${data.cries.latest}"></audio>

    <h3>Select Moves</h3>
    ${createMoveDropdowns(moves)}
  `;
}

function createMoveDropdowns(moves) {
  let html = "";
  for (let i = 1; i <= 4; i++) {
    html += `
      <select class="move-select">
        ${moves.map(move => `<option value="${move}">${move}</option>`).join("")}
      </select>
      <br><br>
    `;
  }
  return html;
}

function addToTeam() {
  const selectedMoves = Array.from(
    document.querySelectorAll(".move-select")
  ).map(select => select.value);

  const teamMember = document.createElement("div");
  teamMember.innerHTML = `
    <h3>${currentPokemon.name}</h3>
    <img src="${currentPokemon.sprites.front_default}">
    <ul>
      ${selectedMoves.map(move => `<li>${move}</li>`).join("")}
    </ul>
    <hr>
  `;

  teamDisplay.appendChild(teamMember);
}
