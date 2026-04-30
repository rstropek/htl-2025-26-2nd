import { LinkedList } from "./linkedList";

const list = new LinkedList();
list.insertAtBeginning("Smells Like Teen Spirit", "Nirvana");
list.insertAtBeginning("Billie Jean", "Michael Jackson");
list.insertAtBeginning("Bohemian Rhapsody", "Queen");

const playlistDiv = document.getElementById("playlist") as HTMLDivElement;
const titleInput = document.getElementById("title-input") as HTMLInputElement;
const artistInput = document.getElementById("artist-input") as HTMLInputElement;
const afterSelect = document.getElementById("after-select") as HTMLSelectElement;
const insertBtn = document.getElementById("insert-btn") as HTMLButtonElement;
const deleteSelect = document.getElementById("delete-select") as HTMLSelectElement;
const deleteBtn = document.getElementById("delete-btn") as HTMLButtonElement;
const errorMsg = document.getElementById("error-msg") as HTMLParagraphElement;

function render(): void {
  const songs = list.toArray();

  playlistDiv.innerHTML = "";

  if (songs.length === 0) {
    const nullSpan = document.createElement("span");
    nullSpan.className = "node null-node";
    nullSpan.textContent = "null";
    playlistDiv.appendChild(nullSpan);
  } else {
    for (const song of songs) {
      const nodeSpan = document.createElement("span");
      nodeSpan.className = "node";
      nodeSpan.textContent = `${song.title} – ${song.artist}`;
      playlistDiv.appendChild(nodeSpan);

      const arrowSpan = document.createElement("span");
      arrowSpan.className = "arrow";
      arrowSpan.textContent = "→";
      playlistDiv.appendChild(arrowSpan);
    }

    const nullSpan = document.createElement("span");
    nullSpan.className = "node null-node";
    nullSpan.textContent = "null";
    playlistDiv.appendChild(nullSpan);
  }

  afterSelect.length = 1;
  for (const song of songs) {
    const option = document.createElement("option");
    option.value = song.title;
    option.textContent = song.title;
    afterSelect.appendChild(option);
  }

  deleteSelect.innerHTML = "";
  for (const song of songs) {
    const option = document.createElement("option");
    option.value = song.title;
    option.textContent = `${song.title} – ${song.artist}`;
    deleteSelect.appendChild(option);
  }

  deleteBtn.disabled = songs.length === 0;
}

function showError(message: string): void {
  errorMsg.textContent = message;
  errorMsg.style.display = "block";
  setTimeout(() => {
    errorMsg.style.display = "none";
  }, 3000);
}

insertBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const artist = artistInput.value.trim();

  if (title === "" || artist === "") {
    showError("Please enter both a title and an artist.");
    return;
  }

  const afterValue = afterSelect.value;
  let success: boolean;

  if (afterValue === "") {
    success = list.insertAtBeginning(title, artist);
  } else {
    success = list.insertAfter(afterValue, title, artist);
  }

  if (!success) {
    showError(`A song titled "${title}" already exists in the playlist.`);
    return;
  }

  titleInput.value = "";
  artistInput.value = "";
  render();
});

deleteBtn.addEventListener("click", () => {
  const title = deleteSelect.value;
  list.delete(title);
  render();
});

render();
