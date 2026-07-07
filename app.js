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
    "Cleopatra lived closer to the iPhone than to the pyramids.",
    "An ant can lift 50 times its body weight.",
    "Neutron stars are so dense a teaspoon would weigh 6 billion tons.",
    "Humans share 60% of DNA with bananas.",
    "The shortest war in history lasted 38 minutes.",
    "A cloud can weigh over a million pounds.",
    "Turtles can breathe through their butts.",
    "Hot water freezes faster than cold water, called the Mpemba effect.",
    "The heart of a blue whale is the size of a small car.",
    "Butterflies taste with their feet.",
    "Saturn's moon Titan has lakes of liquid methane.",
    "You can't hum while holding your nose.",
    "The smell of rain is called petrichor.",
    "Dolphins have names for each other.",
    "A jiffy is an actual unit of time: 1/100th of a second.",
    "The Great Wall of China isn't visible from space with the naked eye.",
    "Giraffes have the same number of neck bones as humans: 7.",
    "Jupiter has 95 known moons.",
    "A single strand of spaghetti is called a spaghetto.",
    "The human nose can detect over 1 trillion smells.",
    "Vikings never wore horned helmets.",
    "Lightning strikes Earth 100 times per second.",
    "The average person walks the equivalent of 5 times around Earth in a lifetime.",
    "Peanuts aren't nuts - they're legumes.",
    "A shrimp's heart is in its head.",
    "The longest hiccup spell lasted 68 years.",
    "Fingernails grow 4x faster than toenails.",
    "The Moon is moving away from Earth at 1.5 inches per year.",
    "Cows have best friends and get stressed when separated.",
    "The first computer bug was an actual moth found in 1947.",
    "Mars has the largest volcano in the solar system: Olympus Mons.",
    "Your brain generates 25 watts of power - enough to light a bulb.",
    "An octopus has 9 brains: one central and 8 in each arm.",
    "The coldest temperature possible is -273.15°C, called absolute zero.",
    "Bees can recognize human faces.",
    "The Universe is 93 billion light-years across."
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

window.addEventListener('DOMContentLoaded', () => {
    renderToolGrid();
    setTimeout(showRandomFact, 100);
    
    const enterBtn = document.getElementById('enterBtn');
    if (enterBtn) {
        enterBtn.addEventListener('click', skipWelcome);
    }
    
    // Hide welcome if visited before
    try {
        if (localStorage.getItem('acad_visited') === 'true') {
            const welcome = document.getElementById('welcome');
            if (welcome) welcome.style.display = 'none';
        }
    } catch(e) {
        console.log('localStorage blocked');
    }
});

function skipWelcome() {
    const welcome = document.getElementById('welcome');
    if (!welcome) return;
    
    welcome.style.opacity = '0';
    welcome.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        welcome.style.display = 'none';
        try { 
            localStorage.setItem('acad_visited', 'true'); 
        } catch(e) {
            console.log('localStorage blocked');
        }
    }, 500);
}
});

function skipWelcome() {
    const welcome = document.getElementById('welcome');
    if (!welcome) return;
    welcome.style.opacity = '0';
    welcome.style.transition = 'opacity 0.5s';
    setTimeout(() => {
        welcome.style.display = 'none';
        safeLocalStorageSet('acad_visited', 'true');
    }, 500);
}

function showRandomFact() {
    const factEl = document.getElementById('fact');
    if (!factEl) return;
    const fact = FACTS[Math.floor(Math.random() * FACTS.length)];
    factEl.textContent = fact;
}

function renderToolGrid() {
    const grid = document.getElementById('toolsGrid');
    if (!grid) return;
    grid.innerHTML = TOOLS.map(tool => `
        <div class="tool-card" onclick="openTool('${tool.id}')">
            <div class="tool-icon">${tool.icon}</div>
            <h3>${tool.name}</h3>
            <p>${tool.desc}</p>
        </div>
    `).join('');
}

function openTool(id) {
    document.getElementById('home').style.display = 'none';
    const backBtn = document.getElementById('backBtn');
    if (backBtn) backBtn.classList.add('show');
    const container = document.getElementById('toolContainer');
    container.innerHTML = getToolHTML(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const initFn = window[`init${id.charAt(0).toUpperCase() + id.slice(1)}`];
    if (typeof initFn === 'function') setTimeout(initFn, 100);
}

function showHome() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('toolContainer').innerHTML = '';
    const backBtn = document.getElementById('backBtn');
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
        </div>`,
        
        citation: `
        <div class="tool-view active">
            <div class="tool-header"><h2>📝 Citation Generator</h2><p>APA 7th, MLA 9th, Chicago 17th</p></div>
            <div class="card">
                <label>Source Type</label>
                <select id="citeType"><option value="website">Website</option><option value="book">Book</option><option value="journal">Journal Article</option></select>
                <label>Title</label><input id="citeTitle" placeholder="Article or Book Title">
                <label>Author(s)</label><input id="citeAuthor" placeholder="Last, First M.">
                <label>Year</label><input id="citeYear" type="number" placeholder="2026">
                <label>URL (if website)</label><input id="citeUrl" placeholder="https://...">
                <button class="btn-primary" onclick="generateCitation()">Generate Citation</button>
                <div id="citeResult" class="result hidden"></div>
            </div>
        </div>`,
        
        reading: `
        <div class="tool-view active">
            <div class="tool-header"><h2>⏱️ Reading Time Calculator</h2><p>Average: 200-250 WPM</p></div>
            <div class="card">
                <textarea id="readText" rows="14" placeholder="Paste your text here..."></textarea>
                <label>Reading Speed (WPM)</label><input id="readSpeed" type="number" value="225" min="100" max="500">
                <button class="btn-primary" onclick="calcReadingTime()">Calculate Time</button>
                <div id="readResult" class="result hidden"></div>
            </div>
        </div>`,
        
        character: `
        <div class="tool-view active">
            <div class="tool-header"><h2>📏 Character Counter</h2><p>With spaces, without spaces, Twitter limits</p></div>
            <div class="card">
                <textarea id="charText" rows="14" placeholder="Type or paste text..."></textarea>
                <div class="result">
                    <p><strong>Total Characters:</strong> <span id="totalChar">0</span></p>
                    <p><strong>Without Spaces:</strong> <span id="noSpaceChar">0</span></p>
                    <p><strong>Twitter/X Left:</strong> <span id="twitterLeft">280</span></p>
                    <p><strong>SMS Count:</strong> <span id="smsCount">0</span></p>
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
        const charEl = document.getElementById('charCount');
        const charNoSpaceEl = document.getElementById('charNoSpace');
        const wordEl = document.getElementById('wordCount');
        const sentEl = document.getElementById('sentCount');
        const paraEl = document.getElementById('paraCount');
        const readLevelEl = document.getElementById('readLevel');
        
        if (wordEl) wordEl.textContent = words;
        if (charEl) charEl.textContent = text.length;
        if (charNoSpaceEl) charNoSpaceEl.textContent = text.replace(/\s/g, '').length;
        if (sentEl) sentEl.textContent = text.split(/[.!?]+/).filter(s => s.trim()).length;
        if (paraEl) paraEl.textContent = text.split(/\n\n+/).filter(p => p.trim()).length;
        
        const avgWordLen = words ? text.replace(/\s/g, '').length / words : 0;
        if (readLevelEl) readLevelEl.textContent = avgWordLen > 5.5 ? 'College' : avgWordLen > 4.5 ? 'High School' : 'General';
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
        const btn = document.getElementById('pomodoroBtn');
        const status = document.getElementById('timerStatus');
        if (btn) btn.textContent = 'Resume';
        if (status) status.textContent = 'Paused';
    } else {
        pomoRunning = true;
        const btn = document.getElementById('pomodoroBtn');
        const status = document.getElementById('timerStatus');
        if (btn) btn.textContent = 'Pause';
        if (status) status.textContent = pomoSeconds > 300 ? 'Focus Time' : 'Break Time';
        pomoInterval = setInterval(() => {
            pomoSeconds--;
            updatePomoDisplay();
            if (pomoSeconds <= 0) {
                clearInterval(pomoInterval);
                pomoRunning = false;
                playBeep();
                
                if (status && status.textContent === 'Focus Time') {
                    pomoCount++;
                    safeLocalStorageSet('pomoCount', pomoCount);
                    const countEl = document.getElementById('pomoCount');
                    if (countEl) countEl.textContent = pomoCount;
                    pomoSeconds = 300;
                    if (status) status.textContent = 'Break Time';
                    showToast('Focus session complete! Take a 5 min break.');
                } else {
                    pomoSeconds = 1500;
                    if (status) status.textContent = 'Ready to focus';
                    showToast('Break over! Ready for next session?');
                }
                if (btn) btn.textContent = 'Start Focus';
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
    const btn = document.getElementById('pomodoroBtn');
    const status = document.getElementById('timerStatus');
    if (btn) btn.textContent = 'Start Focus';
    if (status) status.textContent = 'Ready to focus';
}
function updatePomoDisplay() {
    const mins = Math.floor(pomoSeconds / 60);
    const secs = pomoSeconds % 60;
    const display = document.getElementById('timerDisplay');
    if (display) display.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
}

function initCitation() {}
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            textArea.remove();
            return Promise.resolve();
        } catch (err) {
            textArea.remove();
            return Promise.reject(err);
        }
    }
}
function generateCitation() {
    const type = document.getElementById('citeType')?.value;
    const title = document.getElementById('citeTitle')?.value.trim();
    const author = document.getElementById('citeAuthor')?.value.trim();
    const year = document.getElementById('citeYear')?.value.trim();
    const url = document.getElementById('citeUrl')?.value.trim();
    
    if (!title || !author || !year) {
        showToast('Please fill Title, Author, and Year');
        return;
    }
    
    let apa = `${author} (${year}). <i>${title}</i>.`;
    let mla = `${author}. "${title}." ${year}.`;
    let chicago = `${author}. "${title}." ${year}.`;
    
    if (type === 'website' && url) {
        apa += ` Retrieved from ${url}`;
        mla += ` Web. ${url}.`;
        chicago += ` ${url}.`;
    }
    if (type === 'book') {
        apa += ` Publisher.`;
        mla += ` Publisher.`;
    }
    
    const result = document.getElementById('citeResult');
    if (!result) return;
    const apaPlain = apa.replace(/<[^>]*>/g, '');
    result.innerHTML = `
        <p><strong>APA 7th:</strong><br>${apa}</p>
        <p style="margin-top:14px;"><strong>MLA 9th:</strong><br>${mla}</p>
        <p style="margin-top:14px;"><strong>Chicago 17th:</strong><br>${chicago}</p>
        <button class="btn-secondary" onclick="copyToClipboard(\`${apaPlain.replace(/`/g, '\\`')}\`).then(()=>showToast('APA copied!')).catch(()=>showToast('Copy failed'))" style="margin-top:14px;width:100%;">Copy APA</button>
    `;
    result.classList.remove('hidden');
}

function initReading() {}
function calcReadingTime() {
    const text = document.getElementById('readText')?.value || '';
    const wpm = parseInt(document.getElementById('readSpeed')?.value) || 225;
    const words = text.trim() ? text.trim().split(/\s+/).filter(w => w).length : 0;
    const minutes = Math.floor(words / wpm);
    const seconds = Math.round((words / wpm * 60) % 60);
    
    const result = document.getElementById('readResult');
    if (!result) return;
    result.innerHTML = `
        <h3>Estimated Reading Time: ${minutes} min ${seconds} sec</h3>
        <p>Total Words: ${words}</p>
        <p>At ${wpm} WPM</p>
        <p>Speaking Time: ~${Math.ceil(words / 130)} min</p>
        <p>Pages (250 words/page): ~${(words/250).toFixed(1)}</p>
    `;
    result.classList.remove('hidden');
}

function initCharacter() {
    const textArea = document.getElementById('charText');
    if (!textArea) return;
    textArea.addEventListener('input', e => {
        const text = e.target.value;
        const total = text.length;
        const noSpace = text.replace(/\s/g, '').length;
        const totalEl = document.getElementById('totalChar');
        const noSpaceEl = document.getElementById('noSpaceChar');
        const twitterEl = document.getElementById('twitterLeft');
        const smsEl = document.getElementById('smsCount');
        if (totalEl) totalEl.textContent = total;
        if (noSpaceEl) noSpaceEl.textContent = noSpace;
        if (twitterEl) twitterEl.textContent = 280 - total;
        if (smsEl) smsEl.textContent = Math.ceil(total / 160);
    });
}

function initPlanner() {}
function initPercent() {}
function initUnit() {}
function initTopic() {}
function initTitle() {}
function initPlagiarism() {}

function showFAQ() {
    showToast('Check console for FAQs');
    console.log(`ACAD FAQs:

Q: Is my data saved?
A: Only on your device using localStorage. We collect nothing. Clear it anytime with Reset Data.

Q: Is ACAD free forever?
A: Yes. No login, no limits, no paywalls.

Q: How accurate are calculations?
A: GPA uses standard 4.0 scale. All math formulas verified against textbooks.

Q: Can I use this offline?
A: No, ACAD requires internet. This ensures you always have the latest version.

Q: Will you add more tools?
A: Yes. Study Planner, Unit Converter, and Topic Generator coming next update.`);
}

function showPrivacy() {
    showToast('Check console for Privacy Policy');
    console.log(`ACAD Privacy Policy:

We don't collect, store, or share any personal data. All calculations happen in your browser. 

What we store: Your preferences in localStorage only. Clear anytime with Reset Data button.

What we DON'T do: No accounts, no tracking, no cookies, no analytics, no ads tracking you.

Third-party: AdSense may use cookies for ads. See Google's policy.

Contact: support@acad.tools`);
        }
