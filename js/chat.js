function openChat(name) {
  const chatPopup = document.getElementById('chatPopup');
  const chatTitle = document.getElementById('chatTitle');
  chatTitle.textContent = 'Chat avec ' + name;
  chatPopup.style.display = 'block';
}

function closeChat() {
  const chatPopup = document.getElementById('chatPopup');
  chatPopup.style.display = 'none';
}

function sendMessage() {
  const textarea = document.getElementById('chatMessage');
  if(textarea.value.trim() === '') return;
  alert('Message envoyé : ' + textarea.value);
  textarea.value = '';
}
