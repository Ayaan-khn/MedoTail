/**
 * MedoChat AI Frontend Logic
 * Handles UI interactions, message rendering, and future API streaming preparation.
 */

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const collapseBtn = document.getElementById('collapseBtn');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const rightPanel = document.getElementById('rightPanel');
    const collapsePanelBtn = document.getElementById('collapsePanelBtn');
    const modelSelector = document.getElementById('modelSelector');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const messagesContainer = document.getElementById('messagesContainer');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const stopBtn = document.getElementById('stopBtn');

    let isStreaming = false;
    let abortController = null;

    // --- UI TOGGLES ---

    // Collapse/Expand Sidebar
    collapseBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Collapse Right Panel
    collapsePanelBtn.addEventListener('click', () => {
        rightPanel.classList.toggle('collapsed');
    });

    // Model Selector Update
    modelSelector.addEventListener('change', (e) => {
        const modelName = e.target.options[e.target.selectedIndex].text;
        document.getElementById('panelModel').innerText = modelName;
    });

    // --- CHAT LOGIC ---

    // Auto-resize Textarea
    window.autoResize = (element) => {
        element.style.height = 'auto';
        element.style.height = (element.scrollHeight) + 'px';
        // Reset if empty
        if(element.value === '') element.style.height = 'auto';
    };

    // Handle Send
    const handleSend = () => {
        const text = messageInput.value.trim();
        if (!text || isStreaming) return;

        // Hide Welcome Screen, Show Messages
        welcomeScreen.classList.add('hidden');
        messagesContainer.classList.remove('hidden');

        // Render User Message
        appendMessage('user', text);
        messageInput.value = '';
        messageInput.style.height = 'auto';
        sendBtn.disabled = true;

        // Start AI Simulation
        simulateAIResponse(text);
    };

    sendBtn.addEventListener('click', handleSend);
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    // --- MESSAGE RENDERER ---

    function appendMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let innerHtml = '';

        if (role === 'user') {
            innerHtml = `
                <div class="message-content">${escapeHtml(content)}</div>
                <div class="message-timestamp">${timestamp}</div>
            `;
        } else {
            // AI Markdown Support (Basic regex parsing for visual demo)
            const parsedContent = parseMarkdown(content);
            innerHtml = `
                <div class="message-content">${parsedContent}</div>
                <div class="message-timestamp">${timestamp}</div>
            `;
        }

        messageDiv.innerHTML = innerHtml;
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
        return messageDiv;
    }

    function appendTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message ai';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        messagesContainer.appendChild(indicator);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const el = document.getElementById('typingIndicator');
        if (el) el.remove();
    }

    // --- MOCK STREAMING LOGIC ---
    // This is designed to mimic a streaming response.
    // In production, you will replace this with a fetch() call to your Flask API
    // using a ReadableStream for true streaming.
    function simulateAIResponse(prompt) {
        isStreaming = true;
        sendBtn.disabled = true;
        stopBtn.classList.remove('hidden');
        appendTypingIndicator();

        // Mock API Delay
        setTimeout(() => {
            removeTypingIndicator();

            // Generate Mock Response based on prompt
            let response = "I'm Medo AI, your intelligent assistant. ";
            if (prompt.toLowerCase().includes('docker')) {
                response += "Docker is a platform that uses OS-level virtualization to deliver software in packages called containers. It's incredibly useful for ensuring your application runs the same way in development as it does in production.";
            } else if (prompt.toLowerCase().includes('python')) {
                response += "Here's a quick Python function to read a CSV file using Pandas:\n\n```python\nimport pandas as pd\n\ndf = pd.read_csv('data.csv')\nprint(df.head())\n```\n\nMake sure you have pandas installed using `pip install pandas`.";
            } else {
                response += "That's a great question! As an AI capable of file analysis and code generation, I can assist you with that. Could you provide more specific details so I can give you the most accurate guidance possible?";
            }

            const aiMessageEl = appendMessage('ai', response);

            // Simulate token streaming update effect (Just an example of how to update dynamically)
            let count = 0;
            const interval = setInterval(() => {
                if(count >= 3 || !isStreaming) {
                    clearInterval(interval);
                    return;
                }
                // In a real API, you would parse the stream here and append to aiMessageEl
                count++;
            }, 500);

            finishGeneration();

        }, 1000 + Math.random() * 1000);
    }

    function finishGeneration() {
        isStreaming = false;
        sendBtn.disabled = false;
        stopBtn.classList.add('hidden');
        scrollToBottom();
    }

    // --- UTILITY FUNCTIONS ---

    function scrollToBottom() {
        const chatArea = document.querySelector('.chat-area');
        chatArea.scrollTop = chatArea.scrollHeight;
    }

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    // Basic Markdown to HTML for demo purposes
    function parseMarkdown(text) {
        // Code blocks
        let formatted = text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        // Inline code
        formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
        // Bold
        formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        // Line breaks
        formatted = formatted.replace(/\n/g, '<br>');
        return formatted;
    }

    // --- WELCOME SCREEN SUGGESTIONS ---

    window.startChat = (suggestion) => {
        messageInput.value = suggestion;
        autoResize(messageInput);
        handleSend();
    };

    // --- STOP GENERATION ---
    stopBtn.addEventListener('click', () => {
        if (abortController) {
            abortController.abort();
            abortController = null;
        }
        isStreaming = false;
        removeTypingIndicator();
        finishGeneration();
    });

});