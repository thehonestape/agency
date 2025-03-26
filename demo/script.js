document.addEventListener('DOMContentLoaded', function() {
    // AI Assistant Button
    const aiButton = document.querySelector('.ai-assistant-button');
    let isAssistantOpen = false;
    
    if (aiButton) {
        aiButton.addEventListener('click', function() {
            if (!isAssistantOpen) {
                openAIAssistant();
            } else {
                closeAIAssistant();
            }
            isAssistantOpen = !isAssistantOpen;
        });
    }
    
    function openAIAssistant() {
        // Create assistant chat interface
        const assistantChat = document.createElement('div');
        assistantChat.className = 'ai-assistant-chat';
        assistantChat.innerHTML = `
            <div class="ai-chat-header">
                <div class="ai-avatar-small"></div>
                <h4>Brand AI Assistant</h4>
                <div class="close-chat">×</div>
            </div>
            <div class="ai-chat-messages">
                <div class="ai-message">
                    <div class="ai-avatar-tiny"></div>
                    <div class="message-content">
                        <p>Hello! I'm your Brand AI Assistant. How can I help you with your brand today?</p>
                    </div>
                </div>
            </div>
            <div class="ai-chat-input">
                <input type="text" placeholder="Ask about your brand...">
                <button><i class="fas fa-paper-plane"></i></button>
            </div>
        `;
        document.body.appendChild(assistantChat);
        
        // Add animation class after a small delay
        setTimeout(() => {
            assistantChat.classList.add('open');
        }, 10);
        
        // Close button functionality
        const closeButton = assistantChat.querySelector('.close-chat');
        closeButton.addEventListener('click', function() {
            closeAIAssistant();
            isAssistantOpen = false;
        });
        
        // Handle input
        const inputField = assistantChat.querySelector('input');
        const sendButton = assistantChat.querySelector('button');
        
        function sendMessage() {
            const userInput = inputField.value.trim();
            if (userInput) {
                addUserMessage(userInput);
                inputField.value = '';
                
                // Simulate AI response after a delay
                setTimeout(() => {
                    const responses = [
                        "Based on your current brand positioning, I recommend focusing on sustainability messaging for your upcoming campaign.",
                        "I've analyzed your recent social media engagement, and your audience responds best to authentic storytelling content.",
                        "Your brand consistency has improved by 12% in the last month. The new visual identity system is performing well.",
                        "I've detected a trend in your industry toward more minimal design aesthetics. Would you like me to suggest some adaptation strategies?",
                        "Your competitor just launched a new campaign focused on innovation. Here's how we can differentiate your messaging.",
                        "I've prepared some AI-generated content options for your next email campaign. Would you like to see them?"
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addAIMessage(randomResponse);
                }, 1000);
            }
        }
        
        sendButton.addEventListener('click', sendMessage);
        inputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    function closeAIAssistant() {
        const assistantChat = document.querySelector('.ai-assistant-chat');
        if (assistantChat) {
            assistantChat.classList.remove('open');
            setTimeout(() => {
                assistantChat.remove();
            }, 300);
        }
    }
    
    function addUserMessage(text) {
        const messagesContainer = document.querySelector('.ai-chat-messages');
        const messageEl = document.createElement('div');
        messageEl.className = 'user-message';
        messageEl.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
        messagesContainer.appendChild(messageEl);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function addAIMessage(text) {
        const messagesContainer = document.querySelector('.ai-chat-messages');
        const messageEl = document.createElement('div');
        messageEl.className = 'ai-message';
        messageEl.innerHTML = `
            <div class="ai-avatar-tiny"></div>
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
        messagesContainer.appendChild(messageEl);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Dashboard navigation
    const dashboardNavItems = document.querySelectorAll('.dashboard-nav li');
    
    if (dashboardNavItems.length > 0) {
        dashboardNavItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                dashboardNavItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');
            });
        });
    }
    
    // Add additional styles for the AI assistant chat
    const style = document.createElement('style');
    style.textContent = `
        .ai-assistant-chat {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 350px;
            height: 450px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform: translateY(20px);
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
            z-index: 1000;
        }
        
        .ai-assistant-chat.open {
            transform: translateY(0);
            opacity: 1;
        }
        
        .ai-chat-header {
            display: flex;
            align-items: center;
            padding: 15px;
            background-color: #222222;
            color: white;
        }
        
        .ai-avatar-small {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #ff4d4d;
            margin-right: 10px;
            position: relative;
        }
        
        .ai-avatar-small:before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 15px;
            height: 15px;
            background-color: white;
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }
        
        .ai-avatar-tiny {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: #ff4d4d;
            margin-right: 10px;
            position: relative;
            flex-shrink: 0;
        }
        
        .ai-avatar-tiny:before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 12px;
            height: 12px;
            background-color: white;
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }
        
        .close-chat {
            margin-left: auto;
            font-size: 24px;
            cursor: pointer;
            line-height: 1;
        }
        
        .ai-chat-messages {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .ai-message, .user-message {
            display: flex;
            max-width: 80%;
        }
        
        .ai-message {
            align-self: flex-start;
        }
        
        .user-message {
            align-self: flex-end;
            flex-direction: row-reverse;
        }
        
        .message-content {
            padding: 10px 15px;
            border-radius: 15px;
            font-size: 14px;
        }
        
        .ai-message .message-content {
            background-color: #f1f1f1;
        }
        
        .user-message .message-content {
            background-color: #ff4d4d;
            color: white;
        }
        
        .ai-chat-input {
            display: flex;
            padding: 10px;
            border-top: 1px solid #eee;
        }
        
        .ai-chat-input input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 20px;
            margin-right: 10px;
            outline: none;
        }
        
        .ai-chat-input button {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
        }
        
        @media (max-width: 480px) {
            .ai-assistant-chat {
                width: 90%;
                left: 5%;
                right: 5%;
            }
        }
    `;
    document.head.appendChild(style);
}); 