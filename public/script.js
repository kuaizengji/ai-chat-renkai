const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages");
const statusText = document.getElementById("statusText");

const conversationHistory = [];

let isSending = false;

function addMessage(role, content) {
  const messageElement = document.createElement("div");
  messageElement.classList.add(
    "message",
    role === "user" ? "user-message" : "assistant-message"
  );

  const nameElement = document.createElement("div");
  nameElement.className = "message-name";
  nameElement.textContent =
    role === "user" ? "首相哈克" : "汉弗莱爵士";

  const contentElement = document.createElement("div");
  contentElement.className = "message-content";
  contentElement.textContent = content;

  messageElement.appendChild(nameElement);
  messageElement.appendChild(contentElement);

  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setSendingState(sending) {
  isSending = sending;

  sendButton.disabled = sending;
  messageInput.disabled = sending;

  sendButton.textContent = sending ? "思考中…" : "发送";
  statusText.textContent = sending
    ? "汉弗莱爵士正在组织一份在行政上无可挑剔的答复……"
    : "";
}

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (isSending) {
    return;
  }

  const userMessage = messageInput.value.trim();

  if (!userMessage) {
    return;
  }

  addMessage("user", userMessage);

  conversationHistory.push({
    role: "user",
    content: userMessage,
  });

  messageInput.value = "";
  setSendingState(true);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: conversationHistory,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "请求失败");
    }

    addMessage("assistant", data.reply);

    conversationHistory.push({
      role: "assistant",
      content: data.reply,
    });
  } catch (error) {
    console.error(error);

    addMessage(
      "assistant",
      "首相阁下，当前通信程序出现了一点技术性阻碍，请稍后再试。"
    );

    statusText.textContent = "发送失败，请稍后重试。";
  } finally {
    setSendingState(false);
    messageInput.focus();
  }
});

messageInput.addEventListener("keydown", (event) => {
  if (
    event.key === "Enter" &&
    !event.shiftKey &&
    !event.isComposing
  ) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});

messageInput.addEventListener("input", () => {
  messageInput.style.height = "auto";

  messageInput.style.height = `${Math.min(
    messageInput.scrollHeight,
    150
  )}px`;
});