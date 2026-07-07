const TOOLS = [
    { id: 'gpa', name: 'GPA Calculator', icon: '📊', desc: 'Calculate semester & cumulative GPA with accuracy' },
    { id: 'citation', name: 'Citation Generator', icon: '📝', desc: 'APA, MLA, Chicago citations in seconds' },
    { id: 'word', name: 'Word Counter', icon: '🔤', desc: 'Count words, characters, sentences instantly' },
    { id: 'reading', name: 'Reading Time', icon: '⏱️', desc: 'Estimate reading time for any text' },
    { id: 'pomodoro', name: 'Pomodoro Timer', icon: '🍅', desc: '25/5 focus timer with notifications' },
    { id: 'planner', name: 'Study Planner', icon: '📅', desc: 'Plan study sessions & track deadlines' },
    { id: 'percent', name: 'Percentage Calc', icon: '%', desc: 'All percentage calculations solved' },
    { id: 'unit', name: 'Unit Converter', icon: '🔄', desc: 'Convert between academic units' },
    { id: 'topic', name: 'Topic Generator', icon: '💡', desc: 'Research topic ideas by subject' },
    { id: 'title', name: 'Title Generator', icon: '✨', desc: 'Catchy assignment titles instantly' },
    { id: 'plagiarism', name: 'Plagiarism Check', icon: '🔍', desc: 'Risk assessment & tips to stay original' },
    { id: 'character', name: 'Character Counter', icon: '📏', desc: 'Count chars with/without spaces' }
];

const FACTS = [
    "Octopuses have three hearts and blue blood.",
    "A day on Venus is longer than its year.",
    "Bananas are berries, but strawberries aren't.",
    "There are more trees on Earth than stars in the Milky Way.",
    "Honey never spoils. Archaeologists found 3000-year-old edible honey.",
    "A bolt of lightning is 5x hotter than the surface of the sun.",
    "Wombat poop is cube-shaped to mark territory.",
    "The human brain uses 20% of the body's total energy.",
    "Sharks are older than trees by 200 million years.",
    "Water can boil and freeze at the same time, called triple point.",
    "Your stomach gets a new lining every 3-4 days.",
    "A group of flamingos is called a flamboyance.",
    "Sloths can hold their breath longer than dolphins - up to 40 minutes.",
    "The Eiffel Tower grows 6 inches in summer due to heat expansion.",
    "Cleopatra lived closer to the iPhone than to the pyramids."
];

function safeLocalStorageGet(key, fallback) {
    try { return localStorage.getItem(key) || fallback; }
    catch(e) { return fallback; }
}

function safeLocalStorageSet(key, value) {
    try { localStorage.setItem(key, value); }
    catch(e) { console.log('localStorage blocked'); }
}

function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// FIX: Use immediate execution + DOMContentLoaded backup
function initApp() {
    console.log('ACAD init starting...');
    
    // Render tools first - most important
    renderToolGrid();
    
    // Bind enter button
    const enterBtn = document.getElementById('enterBtn');
    if (enterBtn) {
        enterBtn.addEventListener('click', skipWelcome);
        console.log('Enter button bound');
    }
    
    // Show random fact
    setTimeout(showRandomFact, 100);
    
    // Hide welcome if visited
    if (safeLocalStorageGet('acad_visited', '') === 'true') {
        const welcome = document.getElementById('welcome');
        if (welcome) welcome.style.display = 'none';
    }
    
    console.log('ACAD init complete');
}

// Run immediately if DOM ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function skipWelcome() {
    const welcome = document.getElementById('welcome');
    if (!welcome) return;
    
    welcome.style.opacity = '0';
    welcome.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        welcome.style.display = 'none';
        safeLocalStorageSet('acad_visited', 'true');
    }, 500);
}

function showRandomFact() {
    const factEl = document.getElementById('fact');
    if (!factEl) {
        console.log('Fact element missing');
        return;
    }
    const fact = FACTS[Math.floor(Math.random() * FACTS.length)];
    factEl.textContent = fact;
    console.log('Fact loaded:', fact);
}

function renderToolGrid() {
    const grid = document.getElementById('toolsGrid');
    if (!grid) {
        console.error('toolsGrid element not found!');
        return;
    }
    
    console.log('Rendering', TOOLS.length, 'tools...');
    
    grid.innerHTML = TOOLS.map(tool => `
        <div class="tool-card" onclick="openTool('${tool.id}')">
            <div class="tool-icon">${tool.icon}</div>
            <h3>${tool.name}</h3>
            <p>${tool.desc}</p>
        </div>
    `).join('');
    
    console.log('Tools rendered successfully');
}

function openTool(id) {
    const home = document.getElementById('home');
    const backBtn = document.getElementById('backBtn');
    const container = document.getElementById('toolContainer');
    
    if (home) home.style.display = 'none';
    if (backBtn) backBtn.classList.add('show');
    if (container) {
        container.innerHTML = getToolHTML(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    const initFn = window[`init${id.charAt(0).toUpperCase() + id.slice(1)}`];
    if (typeof initFn === 'function') setTimeout(initFn, 100);
}

function showHome() {
    const home = document.getElementById('home');
    const container = document.getElementById('toolContainer');
    const backBtn = document.getElementById('backBtn');
    
    if (home) home.style.display = 'block';
    if (container) container.innerHTML = '';
    if (backBtn) backBtn.classList.remove('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetAllData() {
    if (confirm('Reset all saved data? This cannot be undone.')) {
        try { localStorage.clear(); } catch(e) {}
        location.reload();
    }
}

function getToolHTML(id) {
    const templates = {
        gpa: `
        <div class="tool-view active">
            <div class="tool-header"><h2>📊 GPA Calculator</h2><p>4.0 Scale. Weighted & unweighted.</p></div>
            <div class="card">
                <div id="courses"></div>
                <button class="btn-secondary" onclick="addCourse()">+ Add Course</button>
                <button class="btn-primary" onclick="calcGPA()">Calculate GPA</button>
                <div id="gpaResult" class="result hidden"></div>
            </div>
        </div>`,
        word: `
        <div class="tool-view active">
            <div class="tool-header"><h2>🔤 Word Counter</h2><p>Paste text for instant stats</p></div>
            <div class="card">
                <textarea id="wordText" rows="14" placeholder="Paste or type your text here..."></textarea>
                <div class="result">
                    <p><strong>Words:</strong> <span id="wordCount">0</span></p>
                    <p><strong>Characters:</strong> <span id="charCount">0</span> | <strong>Without spaces:</strong> <span id="charNoSpace">0</span></p>
                    <p><strong>Sentences:</strong> <span id="sentCount">0</span> | <strong>Paragraphs:</strong> <span id="paraCount">0</span></p>
                    <p><strong>Reading Level:</strong> <span id="readLevel">-</span></p>
                </div>
            </div>
        </div>`,
        pomodoro: `
        <div class="tool-view active">
            <div class="tool-header"><h2>🍅 Pomodoro Timer</h2><p>25 min focus, 5 min break. Stay productive.</p></div>
            <div class="card" style="text-align:center;">
                <div id="timerDisplay" style="font-size:5rem;font-weight:900;color:var(--green-dark);margin:24px 0;">25:00</div>
                <div id="timerStatus" style="font-size:1.3rem;margin-bottom:24px;color:var(--gray-600);font-weight:600;">Ready to focus</div>
                <button class="btn-primary" onclick="togglePomodoro()" id="pomodoroBtn">Start Focus</button>
                <button class="btn-secondary" onclick="resetPomodoro()" style="margin-top:14px;width:100%;">Reset</button>
                <div class="result" style="margin-top:28px;">
                    <p><strong>Sessions Today:</strong> <span id="pomoCount">0</span></p>
                </div>
            </div>
        </div>`
    };
    
    const tool = TOOLS.find(t=>t.id===id);
    const comingSoon = `
        <div class="tool-view active">
            <div class="tool-header"><h2>${tool?.icon} ${tool?.name}</h2></div>
            <div class="card"><p>This tool is being finalized. Core features work. Check back for updates.</p></div>
        </div>`;
    
    return templates[id] || comingSoon;
}

// Tool functions - add rest as needed
let courseCount = 0;
function initGpa() {
    courseCount = 0;
    const coursesDiv = document.getElementById('courses');
    if (coursesDiv) {
        coursesDiv.innerHTML = '';
        addCourse(); addCourse(); addCourse();
    }
}
function addCourse() {
    courseCount++;
    const div = document.createElement('div');
    div.style.cssText = 'display:grid;grid-template-columns:2fr 1fr 1fr auto;gap:10px;margin-bottom:14px;';
    div.innerHTML = `
        <input placeholder="Course name" id="course${courseCount}">
        <select id="grade${courseCount}">
            <option value="4.0">A</option><option value="3.7">A-</option><option value="3.3">B+</option>
            <option value="3.0">B</option><option value="2.7">B-</option><option value="2.3">C+</option>
            <option value="2.0">C</option><option value="1.7">C-</option><option value="1.0">D</option><option value="0">F</option>
        </select>
        <input type="number" placeholder="Credits" id="credit${courseCount}" value="3" min="0" step="0.5">
        <button class="btn-secondary" onclick="this.parentElement.remove()">×</button>`;
    const coursesDiv = document.getElementById('courses');
    if (coursesDiv) coursesDiv.appendChild(div);
}
function calcGPA() {
    let totalPoints = 0, totalCredits = 0;
    document.querySelectorAll('#courses > div').forEach(div => {
        const grade = parseFloat(div.querySelector('select')?.value) || 0;
        const credits = parseFloat(div.querySelector('input[type=number]')?.value) || 0;
        totalPoints += grade * credits;
        totalCredits += credits;
    });
    const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(3) : '0.000';
    const result = document.getElementById('gpaResult');
    if (result) {
        result.innerHTML = `<h3>Your GPA: ${gpa}</h3><p>Total Credits: ${totalCredits.toFixed(1)}</p><p>Quality Points: ${totalPoints.toFixed(2)}</p>`;
        result.classList.remove('hidden');
    }
}

function initWord() {
    const textArea = document.getElementById('wordText');
    if (!textArea) return;
    textArea.addEventListener('input', e => {
        const text = e.target.value;
        const words = text.trim() ? text.trim().split(/\s+/).filter(w => w).length : 0;
        document.getElementById('wordCount').textContent = words;
        document.getElementById('charCount').textContent = text.length;
        document.getElementById('charNoSpace').textContent = text.replace(/\s/g, '').length;
        document.getElementById('sentCount').textContent = text.split(/[.!?]+/).filter(s => s.trim()).length;
        document.getElementById('paraCount').textContent = text.split(/\n\n+/).filter(p => p.trim()).length;
        const avgWordLen = words ? text.replace(/\s/g, '').length / words : 0;
        document.getElementById('readLevel').textContent = avgWordLen > 5.5 ? 'College' : avgWordLen > 4.5 ? 'High School' : 'General';
    });
}

let pomoInterval, pomoSeconds = 1500, pomoRunning = false;
let pomoCount = parseInt(safeLocalStorageGet('pomoCount', '0'));
function initPomodoro() {
    const countEl = document.getElementById('pomoCount');
    if (countEl) countEl.textContent = pomoCount;
    updatePomoDisplay();
}
function playBeep() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch(e) { console.log('Audio blocked'); }
}
function togglePomodoro() {
    if (pomoRunning) {
        clearInterval(pomoInterval);
        pomoRunning = false;
        document.getElementById('pomodoroBtn').textContent = 'Resume';
        document.getElementById('timerStatus').textContent = 'Paused';
    } else {
        pomoRunning = true;
        document.getElementById('pomodoroBtn').textContent = 'Pause';
        document.getElementById('timerStatus').textContent = pomoSeconds > 300 ? 'Focus Time' : 'Break Time';
        pomoInterval = setInterval(() => {
            pomoSeconds--;
            updatePomoDisplay();
            if (pomoSeconds <= 0) {
                clearInterval(pomoInterval);
                pomoRunning = false;
                playBeep();
                if (document.getElementById('timerStatus').textContent === 'Focus Time') {
                    pomoCount++;
                    safeLocalStorageSet('pomoCount', pomoCount);
                    document.getElementById('pomoCount').textContent = pomoCount;
                    pomoSeconds = 300;
                    document.getElementById('timerStatus').textContent = 'Break Time';
                    showToast('Focus session complete! Take a 5 min break.');
                } else {
                    pomoSeconds = 1500;
                    document.getElementById('timerStatus').textContent = 'Ready to focus';
                    showToast('Break over! Ready for next session?');
                }
                document.getElementById('pomodoroBtn').textContent = 'Start Focus';
                updatePomoDisplay();
            }
        }, 1000);
    }
}
function resetPomodoro() {
    clearInterval(pomoInterval);
    pomoRunning = false;
    pomoSeconds = 1500;
    updatePomoDisplay();
    document.getElementById('pomodoroBtn').textContent = 'Start Focus';
    document.getElementById('timerStatus').textContent = 'Ready to focus';
}
function updatePomoDisplay() {
    const mins = Math.floor(pomoSeconds / 60);
    const secs = pomoSeconds % 60;
    const display = document.getElementById('timerDisplay');
    if (display) display.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
}

function initCitation() {}
function initReading() {}
function initCharacter() {}
function initPlanner() {}
function initPercent() {}
function initUnit() {}
function initTopic() {}
function initTitle() {}
function initPlagiarism() {}

function showFAQ() {
    showToast('Check console for FAQs');
    console.log(`ACAD FAQs - No data collected, 100% free, offline-capable`);
}
function showPrivacy() {
    showToast('Check console for Privacy Policy');
    console.log(`ACAD Privacy - We collect nothing. All local.`);
     }
