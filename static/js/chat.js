/**
 * MedoChat AI Frontend Logic
 * Clean version - Ready for Flask Backend
 */
let currentConversationId = null;

document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // ELEMENTS
    // ==========================

    const sidebar = document.getElementById("sidebar");
    const collapseBtn = document.getElementById("collapseBtn");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");

    const rightPanel = document.getElementById("rightPanel");
    const collapsePanelBtn = document.getElementById("collapsePanelBtn");

    const modelSelector = document.getElementById("modelSelector");
    const panelModel = document.getElementById("panelModel");

    const welcomeScreen = document.getElementById("welcomeScreen");
    const messagesContainer = document.getElementById("messagesContainer");

    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");
    const newChatBtn = document.getElementById("newChatBtn");

    // ==========================
    // SIDEBAR
    // ==========================

    collapseBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
    });

    mobileMenuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });

    // ==========================
    // RIGHT PANEL
    // ==========================

    collapsePanelBtn.addEventListener("click", () => {
        rightPanel.classList.toggle("collapsed");
    });

    // ==========================
    // MODEL SELECTOR
    // ==========================

    modelSelector.addEventListener("change", () => {

        panelModel.innerText =
            modelSelector.options[modelSelector.selectedIndex].text;

    });

    // ==========================
    // AUTO RESIZE
    // ==========================

    window.autoResize = function (element) {

        element.style.height = "auto";
        element.style.height = element.scrollHeight + "px";

        if (element.value === "") {
            element.style.height = "auto";
        }

    };

    // ==========================
    // SEND MESSAGE
    // ==========================

    function handleSend() {

        const text = messageInput.value.trim();

        if (!text) return;

        welcomeScreen.classList.add("hidden");
        messagesContainer.classList.remove("hidden");

        appendMessage("user", text);

        messageInput.value = "";
        messageInput.style.height = "auto";

        sendMessage(text);

    }

    sendBtn.addEventListener("click", handleSend);
    messageInput.addEventListener("keydown", (e) => {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            handleSend();

        }

    });

    // ==========================
    // BACKEND FUNCTION
    // ==========================

    async function sendMessage(message) {

    sendBtn.disabled = true;

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                message: message,

                model: modelSelector.value

            })

        });

        const data = await response.json();

        appendMessage("ai", data.reply);

    }

    catch (error) {

        appendMessage("ai", "Unable to connect to backend.");

        console.error(error);

    }

    finally {

        sendBtn.disabled = false;

    }

}
    // ==========================
    // MESSAGE RENDERER
    // ==========================

    function appendMessage(role, content) {

        const messageDiv = document.createElement("div");

        messageDiv.className = `message ${role}`;

        const timestamp = new Date().toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit"

        });

        let html = "";

        if (role === "user") {

            html = `

                <div class="message-content">

                    ${escapeHtml(content)}

                </div>

                <div class="message-timestamp">

                    ${timestamp}

                </div>

            `;

        }

        else {

            html = `

                <div class="message-content">

                    ${parseMarkdown(content)}

                </div>

                <div class="message-timestamp">

                    ${timestamp}

                </div>

            `;

        }

        messageDiv.innerHTML = html;

        messagesContainer.appendChild(messageDiv);

        scrollToBottom();

    }

    // ==========================
    // SCROLL
    // ==========================

    function scrollToBottom() {

        const area = document.querySelector(".chat-area");

        area.scrollTop = area.scrollHeight;

    }

    // ==========================
    // HTML ESCAPE
    // ==========================

    function escapeHtml(text) {

        const map = {

            "&": "&amp;",

            "<": "&lt;",

            ">": "&gt;",

            "\"": "&quot;",

            "'": "&#039;"

        };

        return text.replace(/[&<>"']/g, m => map[m]);

    }

    // ==========================
    // MARKDOWN
    // ==========================

    function parseMarkdown(text) {

        let formatted = text;

        formatted = formatted.replace(

            /```([\s\S]*?)```/g,

            "<pre><code>$1</code></pre>"

        );

        formatted = formatted.replace(

            /`([^`]+)`/g,

            "<code>$1</code>"

        );

        formatted = formatted.replace(

            /\*\*(.*?)\*\*/g,

            "<strong>$1</strong>"

        );

        formatted = formatted.replace(

            /\n/g,

            "<br>"

        );

        return formatted;

    }

    // ==========================
    // SUGGESTION CARDS
    // ==========================

    window.startChat = function (suggestion) {

        messageInput.value = suggestion;

        autoResize(messageInput);

        handleSend();

    };
});

    // ==========================
    // NEW CHAT
    // ==========================

    window.startNewChat = async function () {

        try {

            const response = await fetch("/api/new_chat", {
                method: "POST"
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(data.error);
                return;
            }

            currentConversationId = data.conversation_id;

            console.log("Conversation Created:", currentConversationId);

            // Reset UI
            messagesContainer.innerHTML = "";

            messagesContainer.classList.add("hidden");
            welcomeScreen.classList.remove("hidden");

            messageInput.value = "";
            messageInput.style.height = "auto";
            messageInput.focus();

        }

        catch (error) {

            console.error("Unable to create conversation.", error);

        }

    };

    // ==========================
    // BUTTON EVENTS
    // ==========================

    newChatBtn.addEventListener("click", () => {
        window.startNewChat();
    });

    // ==========================
    // SUGGESTION CARDS
    // ==========================

    window.startChat = function (suggestion) {

        messageInput.value = suggestion;

        autoResize(messageInput);

        handleSend();

    };