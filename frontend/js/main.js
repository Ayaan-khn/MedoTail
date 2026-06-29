// ===========================================
// MODULE 1 - BUTTON NAVIGATION
// ===========================================

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        window.location.href = "login.html";
    });
}

if (signupBtn) {
    signupBtn.addEventListener("click", () => {
        window.location.href = "signup.html";
    });
}

// ===========================================
// MODULE 2 - WEATHER
// ===========================================

const API_KEY = "da7934e02c05c8ef0da0eaeb7f325599";

const temperature = document.getElementById("temperature");
const city = document.getElementById("city");
const time = document.getElementById("time");
const updated = document.getElementById("updated");
let lastUpdated = null;

function updateTime() {
    const now = new Date();

    if (time) {
        time.textContent = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    }
}

updateTime();
function updateLastUpdated() {

    if (!lastUpdated) return;

    const now = new Date();
    const seconds = Math.floor((now - lastUpdated) / 1000);

    if (seconds <= 5) {
        updated.textContent = "Updated just now";
    }

    else if (seconds < 60) {
        updated.textContent = `Updated ${seconds} sec ago`;
    }

    else if (seconds < 3600) {

        const minutes = Math.floor(seconds / 60);

        updated.textContent = `Updated ${minutes} min${minutes > 1 ? "s" : ""} ago`;
    }

    else if (seconds < 86400) {

        const hours = Math.floor(seconds / 3600);

        updated.textContent = `Updated ${hours} hour${hours > 1 ? "s" : ""} ago`;
    }

    else {

        const days = Math.floor(seconds / 86400);

        updated.textContent = `Updated ${days} day${days > 1 ? "s" : ""} ago`;
    }

}
setInterval(updateTime, 1000);
setInterval(updateLastUpdated, 1000);

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {

            temperature.textContent = Math.round(data.main.temp) + "°C";
            city.textContent = data.name;
            lastUpdated = new Date();
            updateLastUpdated();

        })
        .catch(() => {

            temperature.textContent = "Unknown Temp";
            city.textContent = "Unknown Location";
            lastUpdated = new Date();
            updateLastUpdated();

        });
}

function error() {

    temperature.textContent = "Unknown Temp";
    city.textContent = "Unknown Location";
    lastUpdated = new Date();
    updateLastUpdated();

}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    error();
}

// ===========================================
// MODULE 3 - CHAT DATA
// ===========================================

const chatFeed = document.getElementById("chatFeed");

const messages = [
    { user: "Mike", text: "Hey everyone" },
    { user: "Sarah", text: "Ready for tomorrow?" },
    { user: "Medo AI", text: "Rain expected tomorrow." },
    { user: "Alex", text: "Meet at 7 PM!" },
    { user: "Emily", text: "Can't wait." },
    { user: "David", text: "Joining in 5 mins." },
    { user: "Medo AI", text: "All systems online." }
];

// ===========================================
// MODULE 4 - CHAT DISPLAY
// ===========================================

let index = 0;

function updateChat() {

    if (!chatFeed) return;

    chatFeed.innerHTML = "";

    for (let i = 0; i < 4; i++) {

        const current = messages[(index + i) % messages.length];

        const message = document.createElement("div");
        message.className = "message";

        if (current.user === "Medo AI") {
            message.classList.add("ai");
        }

        message.innerHTML = `
            <span class="user">${current.user}</span>
            <p>${current.text}</p>
        `;

        chatFeed.appendChild(message);
    }

    index++;
}

updateChat();
setInterval(updateChat, 3000);

// ===========================================
// MODULE 5 - STATS
// ===========================================

const statNumbers = document.querySelectorAll(".stat h2");

const finalNumbers = [
    1842,
    25000,
    42,
    24
];

statNumbers.forEach((stat, index) => {

    let count = 0;
    const target = finalNumbers[index];
    const speed = target / 100;

    const timer = setInterval(() => {

        count += speed;

        if (count >= target) {
            count = target;
            clearInterval(timer);
        }

        if (index === 1) {
            stat.innerText = Math.floor(count).toLocaleString() + "+";
        }
        else if (index === 3) {
            stat.innerText = "24/7";
        }
        else {
            stat.innerText = Math.floor(count).toLocaleString();
        }

    }, 20);

});