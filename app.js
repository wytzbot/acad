const TOOLS = [
    {id:'gpa',name:'GPA Calculator',icon:'📊',desc:'Calculate semester & cumulative GPA with accuracy'},
    {id:'citation',name:'Citation Generator',icon:'📝',desc:'APA, MLA, Chicago citations in seconds'},
    {id:'word',name:'Word Counter',icon:'🔤',desc:'Count words, characters, sentences instantly'},
    {id:'reading',name:'Reading Time',icon:'⏱️',desc:'Estimate reading time for any text'},
    {id:'pomodoro',name:'Pomodoro Timer',icon:'🍅',desc:'25/5 focus timer with notifications'},
    {id:'planner',name:'Study Planner',icon:'📅',desc:'Plan study sessions & track deadlines'},
    {id:'percent',name:'Percentage Calc',icon:'%',desc:'All percentage calculations solved'},
    {id:'unit',name:'Unit Converter',icon:'🔄',desc:'Convert between academic units'},
    {id:'topic',name:'Topic Generator',icon:'💡',desc:'Research topic ideas by subject'},
    {id:'title',name:'Title Generator',icon:'✨',desc:'Catchy assignment titles instantly'},
    {id:'plagiarism',name:'Plagiarism Check',icon:'🔍',desc:'Risk assessment & tips to stay original'},
    {id:'character',name:'Character Counter',icon:'📏',desc:'Count chars with/without spaces'}
];

const FACTS = ["Octopuses have three hearts and blue blood.","A day on Venus is longer than its year.","Bananas are berries, but strawberries aren't.","There are more trees on Earth than stars in the Milky Way.","Honey never spoils. Archaeologists found 3000-year-old edible honey.","A bolt of lightning is 5x hotter than the surface of the sun.","Wombat poop is cube-shaped to mark territory.","The human brain uses 20% of the body's total energy.","Sharks are older than trees by 200 million years.","Water can boil and freeze at the same time, called triple point.","Your stomach gets a new lining every 3-4 days.","A group of flamingos is called a flamboyance."];

function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),3000)}

function init(){
    console.log('ACAD starting...');
    renderTools();
    showFact();
    bindEvents();
    if(localStorage.getItem('acad_visited')==='true')document.getElementById('welcome').style.display='none';
    console.log('ACAD ready');
}

function renderTools(){
    const grid=document.getElementById('toolsGrid');
    grid.innerHTML=TOOLS.map(t=>`<div class="tool-card" data-tool="${t.id}"><div class="tool-icon">${t.icon}</div><h3>${t.name}</h3><p>${t.desc}</p></div>`).join('');
    console.log('Rendered',TOOLS.length,'tools');
}

function showFact(){document.getElementById('fact').textContent=FACTS[Math.floor(Math.random()*FACTS.length)]}

function bindEvents(){
    document.getElementById('enterBtn').onclick=()=>{const w=document.getElementById('welcome');w.style.opacity='0';w.style.transition='opacity 0.5s';setTimeout(()=>{w.style.display='none';localStorage.setItem('acad_visited','true')},500)};
    document.getElementById('backBtn').onclick=showHome;
    document.getElementById('resetBtn').onclick=()=>{if(confirm('Reset all data?')){localStorage.clear();location.reload()}};
    document.getElementById('faqLink').onclick=e=>{e.preventDefault();toast('Check console');console.log('ACAD: Free forever, no data collected, all local.')};
    document.getElementById('privacyLink').onclick=e=>{e.preventDefault();toast('Check console');console.log('Privacy: We collect nothing. Everything stays on your device.')};
    document.querySelectorAll('.tool-card').forEach(c=>c.onclick=()=>openTool(c.dataset.tool));
}

function openTool(id){
    document.getElementById('home').style.display='none';
    document.getElementById('backBtn').classList.add('show');
    document.getElementById('toolContainer').innerHTML=getToolHTML(id);
    window.scrollTo({top:0,behavior:'smooth'});
    const fn=window['init'+id.charAt(0).toUpperCase()+id.slice(1)];
    if(typeof fn==='function')setTimeout(fn,100);
}

function showHome(){
    document.getElementById('home').style.display='block';
    document.getElementById('toolContainer').innerHTML='';
    document.getElementById('backBtn').classList.remove('show');
    window.scrollTo({top:0,behavior:'smooth'});
}

function getToolHTML(id){
    const t=TOOLS.find(x=>x.id===id);
    const templates={
        gpa:`<div class="tool-view active"><div class="tool-header"><h2>📊 GPA Calculator</h2><p>4.0 Scale. Weighted & unweighted.</p></div><div class="card"><div id="courses"></div><button class="btn-secondary" onclick="addCourse()">+ Add Course</button><button class="btn-primary" onclick="calcGPA()">Calculate GPA</button><div id="gpaResult" class="result hidden"></div></div></div>`,
        citation:`<div class="tool-view active"><div class="tool-header"><h2>📝 Citation Generator</h2><p>APA 7th, MLA 9th, Chicago 17th</p></div><div class="card"><label>Source Type</label><select id="citeType"><option value="website">Website</option><option value="book">Book</option><option value="journal">Journal Article</option></select><label>Title</label><input id="citeTitle" placeholder="Article or Book Title"><label>Author(s)</label><input id="citeAuthor" placeholder="Last, First M."><label>Year</label><input id="citeYear" type="number" placeholder="2026"><label>URL (if website)</label><input id="citeUrl" placeholder="https://..."><button class="btn-primary" onclick="generateCitation()">Generate Citation</button><div id="citeResult" class="result hidden"></div></div></div>`,
        word:`<div class="tool-view active"><div class="tool-header"><h2>🔤 Word Counter</h2><p>Paste text for instant stats</p></div><div class="card"><textarea id="wordText" rows="14" placeholder="Paste or type your text here..."></textarea><div class="result"><p><strong>Words:</strong> <span id="wordCount">0</span></p><p><strong>Characters:</strong> <span id="charCount">0</span> | <strong>Without spaces:</strong> <span id="charNoSpace">0</span></p><p><strong>Sentences:</strong> <span id="sentCount">0</span> | <strong>Paragraphs:</strong> <span id="paraCount">0</span></p><p><strong>Reading Level:</strong> <span id="readLevel">-</span></p></div></div></div>`,
        reading:`<div class="tool-view active"><div class="tool-header"><h2>⏱️ Reading Time Calculator</h2><p>Average: 200-250 WPM</p></div><div class="card"><textarea id="readText" rows="14" placeholder="Paste your text here..."></textarea><label>Reading Speed (WPM)</label><input id="readSpeed" type="number" value="225" min="100" max="500"><button class="btn-primary" onclick="calcReadingTime()">Calculate Time</button><div id="readResult" class="result hidden"></div></div></div>`,
        pomodoro:`<div class="tool-view active"><div class="tool-header"><h2>🍅 Pomodoro Timer</h2><p>25 min focus, 5 min break.</p></div><div class="card" style="text-align:center"><div id="timerDisplay" style="font-size:5rem;font-weight:900;color:var(--green-dark);margin:24px 0">25:00</div><div id="timerStatus" style="font-size:1.3rem;margin-bottom:24px;color:var(--gray-600);font-weight:600">Ready to focus</div><button class="btn-primary" onclick="togglePomodoro()" id="pomodoroBtn">Start Focus</button><button class="btn-secondary" onclick="resetPomodoro()" style="margin-top:14px;width:100%">Reset</button><div class="result" style="margin-top:28px"><p><strong>Sessions Today:</strong> <span id="pomoCount">0</span></p></div></div></div>`,
        planner:`<div class="tool-view active"><div class="tool-header"><h2>📅 Study Planner</h2><p>Track tasks and deadlines</p></div><div class="card"><label>Task Name</label><input id="taskName" placeholder="e.g. Finish Chapter 5"><label>Due Date</label><input id="taskDate" type="date"><label>Priority</label><select id="taskPriority"><option>High</option><option>Medium</option><option>Low</option></select><button class="btn-primary" onclick="addTask()">Add Task</button><div id="taskList" style="margin-top:24px"></div></div></div>`,
        percent:`<div class="tool-view active"><div class="tool-header"><h2>% Percentage Calculator</h2><p>All percentage calculations</p></div><div class="card"><label>What is</label><input id="perc1" type="number" placeholder="25" style="width:30%;display:inline-block"><label> % of </label><input id="perc2" type="number" placeholder="200" style="width:30%;display:inline-block"><button class="btn-primary" onclick="calcPercent()">Calculate</button><div id="percResult" class="result hidden"></div><hr style="margin:24px 0;border:none;border-top:1px solid var(--gray-100)"><label>Is</label><input id="perc3" type="number" placeholder="50" style="width:30%;display:inline-block"><label> what % of </label><input id="perc4" type="number" placeholder="200" style="width:30%;display:inline-block"><button class="btn-primary" onclick="calcPercent2()">Calculate</button><div id="percResult2" class="result hidden"></div></div></div>`,
        unit:`<div class="tool-view active"><div class="tool-header"><h2>🔄 Unit Converter</h2><p>Length, Weight, Temperature</p></div><div class="card"><label>Convert</label><input id="unitInput" type="number" value="1"><label>From</label><select id="unitFrom"><option value="m">Meters</option><option value="km">Kilometers</option><option value="cm">Centimeters</option><option value="mm">Millimeters</option><option value="ft">Feet</option><option value="in">Inches</option><option value="mi">Miles</option></select><label>To</label><select id="unitTo"><option value="ft">Feet</option><option value="m">Meters</option><option value="km">Kilometers</option><option value="cm">Centimeters</option><option value="mm">Millimeters</option><option value="in">Inches</option><option value="mi">Miles</option></select><button class="btn-primary" onclick="convertUnit()">Convert</button><div id="unitResult" class="result hidden"></div></div></div>`,
        topic:`<div class="tool-view active"><div class="tool-header"><h2>💡 Topic Generator</h2><p>Research ideas by subject</p></div><div class="card"><label>Subject</label><select id="topicSubject"><option>History</option><option>Science</option><option>Literature</option><option>Psychology</option><option>Economics</option><option>Computer Science</option></select><button class="btn-primary" onclick="generateTopic()">Generate Topics</button><div id="topicResult" class="result hidden"></div></div></div>`,
        title:`<div class="tool-view active"><div class="tool-header"><h2>✨ Title Generator</h2><p>Catchy assignment titles</p></div><div class="card"><label>Your Topic</label><input id="titleTopic" placeholder="e.g. Climate Change"><label>Type</label><select id="titleType"><option>Essay</option><option>Research Paper</option><option>Presentation</option><option>Report</option></select><button class="btn-primary" onclick="generateTitle()">Generate Titles</button><div id="titleResult" class="result hidden"></div></div></div>`,
        plagiarism:`<div class="tool-view active"><div class="tool-header"><h2>🔍 Plagiarism Risk Check</h2><p>Tips to stay original</p></div><div class="card"><textarea id="plagText" rows="14" placeholder="Paste your text to check for risk factors..."></textarea><button class="btn-primary" onclick="checkPlagiarism()">Check Risk</button><div id="plagResult" class="result hidden"></div></div></div>`,
        character:`<div class="tool-view active"><div class="tool-header"><h2>📏 Character Counter</h2><p>With spaces, without spaces, limits</p></div><div class="card"><textarea id="charText" rows="14" placeholder="Type or paste text..."></textarea><div class="result"><p><strong>Total Characters:</strong> <span id="totalChar">0</span></p><p><strong>Without Spaces:</strong> <span id="noSpaceChar">0</span></p><p><strong>Twitter/X Left:</strong> <span id="twitterLeft">280</span></p><p><strong>SMS Count:</strong> <span id="smsCount">0</span></p></div></div></div>`
    };
    return templates[id]||`<div class="tool-view active"><div class="tool-header"><h2>${t?.icon} ${t?.name}</h2></div><div class="card"><p>Error loading tool.</p></div></div>`;
}

// Tool 1: GPA
let courseCount=0;
function initGpa(){courseCount=0;const d=document.getElementById('courses');if(d){d.innerHTML='';addCourse();addCourse();addCourse()}}
function addCourse(){courseCount++;const div=document.createElement('div');div.style.cssText='display:grid;grid-template-columns:2fr 1fr 1fr auto;gap:10px;margin-bottom:14px';div.innerHTML=`<input placeholder="Course name"><select><option value="4.0">A</option><option value="3.7">A-</option><option value="3.3">B+</option><option value="3.0">B</option><option value="2.7">B-</option><option value="2.3">C+</option><option value="2.0">C</option><option value="1.0">D</option><option value="0">F</option></select><input type="number" placeholder="Credits" value="3" min="0" step="0.5"><button class="btn-secondary" onclick="this.parentElement.remove()">×</button>`;document.getElementById('courses').appendChild(div)}
function calcGPA(){let tp=0,tc=0;document.querySelectorAll('#courses > div').forEach(d=>{const g=parseFloat(d.querySelector('select')?.value)||0;const c=parseFloat(d.querySelector('input[type=number]')?.value)||0;tp+=g*c;tc+=c});const gpa=tc?(tp/tc).toFixed(3):'0.000';const r=document.getElementById('gpaResult');if(r){r.innerHTML=`<h3>Your GPA: ${gpa}</h3><p>Total Credits: ${tc.toFixed(1)}</p><p>Quality Points: ${tp.toFixed(2)}</p>`;r.classList.remove('hidden')}}

// Tool 2: Citation
function initCitation(){}
function generateCitation(){const type=document.getElementById('citeType').value;const title=document.getElementById('citeTitle').value.trim();const author=document.getElementById('citeAuthor').value.trim();const year=document.getElementById('citeYear').value.trim();const url=document.getElementById('citeUrl').value.trim();if(!title||!author||!year){toast('Fill Title, Author, and Year');return}let apa=`${author} (${year}). <i>${title}</i>.`;let mla=`${author}. "${title}." ${year}.`;let chicago=`${author}. "${title}." ${year}.`;if(type==='website'&&url){apa+=` Retrieved from ${url}`;mla+=` Web. ${url}.`;chicago+=` ${url}.`}const r=document.getElementById('citeResult');r.innerHTML=`<p><strong>APA 7th:</strong><br>${apa}</p><p style="margin-top:14px"><strong>MLA 9th:</strong><br>${mla}</p><p style="margin-top:14px"><strong>Chicago 17th:</strong><br>${chicago}</p><button class="btn-secondary" onclick="navigator.clipboard.writeText('${apa.replace(/<[^>]*>/g,'').replace(/'/g,"\\'")}').then(()=>toast('Copied!'))" style="margin-top:14px;width:100%">Copy APA</button>`;r.classList.remove('hidden')}

// Tool 3: Word Counter
function initWord(){const t=document.getElementById('wordText');if(!t)return;t.oninput=e=>{const tx=e.target.value;const w=tx.trim()?tx.trim().split(/\s+/).filter(x=>x).length:0;document.getElementById('wordCount').textContent=w;document.getElementById('charCount').textContent=tx.length;document.getElementById('charNoSpace').textContent=tx.replace(/\s/g,'').length;document.getElementById('sentCount').textContent=tx.split(/[.!?]+/).filter(s=>s.trim()).length;document.getElementById('paraCount').textContent=tx.split(/\n\n+/).filter(p=>p.trim()).length;const avg=w?tx.replace(/\s/g,'').length/w:0;document.getElementById('readLevel').textContent=avg>5.5?'College':avg>4.5?'High School':'General'}}

// Tool 4: Reading Time
function initReading(){}
function calcReadingTime(){const text=document.getElementById('readText').value;const wpm=parseInt(document.getElementById('readSpeed').value)||225;const words=text.trim()?text.trim().split(/\s+/).filter(w=>w).length:0;const mins=Math.floor(words/wpm);const secs=Math.round((words/wpm*60)%60);const r=document.getElementById('readResult');r.innerHTML=`<h3>Estimated Reading Time: ${mins} min ${secs} sec</h3><p>Total Words: ${words}</p><p>At ${wpm} WPM</p><p>Speaking Time: ~${Math.ceil(words/130)} min</p><p>Pages (250 words/page): ~${(words/250).toFixed(1)}</p>`;r.classList.remove('hidden')}

// Tool 5: Pomodoro
let pomoInt,pomoSec=1500,pomoRun=false,pomoCnt=parseInt(localStorage.getItem('pomoCount')||'0');
function initPomodoro(){document.getElementById('pomoCount').textContent=pomoCnt;updatePomo()}
function togglePomodoro(){if(pomoRun){clearInterval(pomoInt);pomoRun=false;document.getElementById('pomodoroBtn').textContent='Resume';document.getElementById('timerStatus').textContent='Paused'}else{pomoRun=true;document.getElementById('pomodoroBtn').textContent='Pause';document.getElementById('timerStatus').textContent=pomoSec>300?'Focus Time':'Break Time';pomoInt=setInterval(()=>{pomoSec--;updatePomo();if(pomoSec<=0){clearInterval(pomoInt);pomoRun=false;beep();if(document.getElementById('timerStatus').textContent==='Focus Time'){pomoCnt++;localStorage.setItem('pomoCount',pomoCnt);document.getElementById('pomoCount').textContent=pomoCnt;pomoSec=300;document.getElementById('timerStatus').textContent='Break Time';toast('Focus complete! 5 min break.')}else{pomoSec=1500;document.getElementById('timerStatus').textContent='Ready to focus';toast('Break over!')}document.getElementById('pomodoroBtn').textContent='Start Focus';updatePomo()}},1000)}}
function resetPomodoro(){clearInterval(pomoInt);pomoRun=false;pomoSec=1500;updatePomo();document.getElementById('pomodoroBtn').textContent='Start Focus';document.getElementById('timerStatus').textContent='Ready to focus'}
function updatePomo(){const m=Math.floor(pomoSec/60);const s=pomoSec%60;const d=document.getElementById('timerDisplay');if(d)d.textContent=`${m}:${s.toString().padStart(2,'0')}`}
function beep(){try{const a=new(window.AudioContext||window.webkitAudioContext)();const o=a.createOscillator();const g=a.createGain();o.connect(g);g.connect(a.destination);o.frequency.value=800;g.gain.setValueAtTime(0.3,a.currentTime);g.gain.exponentialRampToValueAtTime(0.01,a.currentTime+0.5);o.start(a.currentTime);o.stop(a.currentTime+0.5)}catch(e){}}

// Tool 6: Study Planner
function initPlanner(){loadTasks()}
function addTask(){const name=document.getElementById('taskName').value.trim();const date=document.getElementById('taskDate').value;const prio=document.getElementById('taskPriority').value;if(!name){toast('Enter task name');return}const tasks=JSON.parse(localStorage.getItem('acad_tasks')||'[]');tasks.push({id:Date.now(),name,date,prio,done:false});localStorage.setItem('acad_tasks',JSON.stringify(tasks));document.getElementById('taskName').value='';document.getElementById('taskDate').value='';loadTasks();toast('Task added')}
function loadTasks(){const tasks=JSON.parse(localStorage.getItem('acad_tasks')||'[]');const list=document.getElementById('taskList');if(!list)return;if(tasks.length===0){list.innerHTML='<p style="color:var(--gray-600)">No tasks yet. Add one above.</p>';return}list.innerHTML=tasks.sort((a,b)=>new Date(a.date)-new Date(b.date)).map(t=>`<div class="task-item ${t.done?'done':''}"><input type="checkbox" ${t.done?'checked':''} onchange="toggleTask(${t.id})"><div style="flex:1"><strong>${t.name}</strong><br><small>Due: ${t.date||'No date'} | Priority: ${t.prio}</small></div><button class="btn-secondary" onclick="deleteTask(${t.id})" style="padding:8px 16px">Delete</button></div>`).join('')}
function toggleTask(id){const tasks=JSON.parse(localStorage.getItem('acad_tasks')||'[]');const task=tasks.find(t=>t.id===id);if(task){task.done=!task.done;localStorage.setItem('acad_tasks',JSON.stringify(tasks));loadTasks()}}
function deleteTask(id){const tasks=JSON.parse(localStorage.getItem('acad_tasks')||'[]').filter(t=>t.id!==id);localStorage.setItem('acad_tasks',JSON.stringify(tasks));loadTasks()}

// Tool 7: Percentage
function initPercent(){}
function calcPercent(){const a=parseFloat(document.getElementById('perc1').value);const b=parseFloat(document.getElementById('perc2').value);if(isNaN(a)||isNaN(b)){toast('Enter both numbers');return}const res=(a/100)*b;const r=document.getElementById('percResult');r.innerHTML=`<h3>${a}% of ${b} = ${res.toFixed(2)}</h3>`;r.classList.remove('hidden')}
function calcPercent2(){const a=parseFloat(document.getElementById('perc3').value);const b=parseFloat(document.getElementById('perc4').value);if(isNaN(a)||isNaN(b)||b===0){toast('Enter valid numbers');return}const res=(a/b)*100;const r=document.getElementById('percResult2');r.innerHTML=`<h3>${a} is ${res.toFixed(2)}% of ${b}</h3>`;r.classList.remove('hidden')}

// Tool 8: Unit Converter
function initUnit(){}
function convertUnit(){const val=parseFloat(document.getElementById('unitInput').value);const from=document.getElementById('unitFrom').value;const to=document.getElementById('unitTo').value;if(isNaN(val)){toast('Enter a number');return}const toM={m:1,km:1000,cm:0.01,mm:0.001,ft:0.3048,in:0.0254,mi:1609.34};const meters=val*toM[from];const result=meters/toM[to];const r=document.getElementById('unitResult');r.innerHTML=`<h3>${val} ${from} = ${result.toFixed(6)} ${to}</h3>`;r.classList.remove('hidden')}

// Tool 9: Topic Generator
function initTopic(){}
function generateTopic(){const subj=document.getElementById('topicSubject').value;const topics={History:['Impact of the printing press on Renaissance','Causes of World War I','Ancient Egyptian burial practices','Civil Rights Movement leaders','Industrial Revolution in Britain'],Science:['CRISPR gene editing ethics','Quantum computing applications','Climate change mitigation strategies','Antibiotic resistance solutions','Dark matter theories'],Literature:['Symbolism in The Great Gatsby','Shakespearean tragedy structure','Postcolonial themes in modern fiction','Feminist literature evolution','Dystopian novels as social commentary'],Psychology:['Cognitive bias in decision making','Social media impact on teen mental health','Nature vs nurture debate','Memory formation mechanisms','Groupthink in organizations'],Economics:['Universal basic income feasibility','Cryptocurrency market volatility','Globalization effects on local economies','Behavioral economics principles','Supply chain disruptions'],'Computer Science':['AI ethics in autonomous vehicles','Blockchain beyond cryptocurrency','Cybersecurity in IoT devices','Quantum algorithms complexity','Machine learning bias mitigation']};const list=topics[subj]||['Research topic 1','Research topic 2','Research topic 3'];const r=document.getElementById('topicResult');r.innerHTML=`<h3>${subj} Topic Ideas:</h3><ul style="margin-top:12px">${list.map(t=>`<li style="margin:8px 0">${t}</li>`).join('')}</ul>`;r.classList.remove('hidden')}

// Tool 10: Title Generator
function initTitle(){}
function generateTitle(){const topic=document.getElementById('titleTopic').value.trim();const type=document.getElementById('titleType').value;if(!topic){toast('Enter a topic');return}const templates={Essay:[`The Hidden Truth Behind ${topic}`,`Rethinking ${topic}: A Critical Analysis`,`${topic}: Perspectives and Implications`,`Why ${topic} Matters Today`,`Deconstructing ${topic}`],'Research Paper':[`An Empirical Study of ${topic}`,`${topic}: A Systematic Review`,`Quantitative Analysis of ${topic}`,`${topic} in the 21st Century`,`Methodological Approaches to ${topic}`],Presentation:[`${topic} Explained`,`The Future of ${topic}`,`Understanding ${topic}`,`${topic}: Key Insights`,`${topic} Demystified`],Report:[`${topic}: Current Status Report`,`Annual Review: ${topic}`,`${topic} Assessment 2026`,`Executive Summary: ${topic}`,`${topic} Performance Analysis`]};const list=templates[type]||[`Title for ${topic}`];const r=document.getElementById('titleResult');r.innerHTML=`<h3>${type} Titles for "${topic}":</h3><ul style="margin-top:12px">${list.map(t=>`<li style="margin:8px 0;cursor:pointer" onclick="navigator.clipboard.writeText('${t.replace(/'/g,"\\'")}').then(()=>toast('Copied!'))">${t}</li>`).join('')}</ul><p style="margin-top:12px;font-size:0.9rem;color:var(--gray-600)">Click any title to copy</p>`;r.classList.remove('hidden')}

// Tool 11: Plagiarism Check
function initPlagiarism(){}
function checkPlagiarism(){const text=document.getElementById('plagText').value.trim();if(!text){toast('Paste some text first');return}const words=text.split(/\s+/).filter(w=>w).length;const sentences=text.split(/[.!?]+/).filter(s=>s.trim()).length;const avgWordsPerSent=sentences?words/sentences:0;let risk='Low';let tips=[];if(text.includes('according to')||text.includes('studies show')){risk='Medium';tips.push('Add proper citations for "according to" and "studies show" phrases')}if(avgWordsPerSent>25){risk='Medium';tips.push('Very long sentences may match existing sources. Break them up.')}if(words<50){risk='High';tips.push('Text too short to assess. Add more original content.')}if(text.match(/\b(copy|paste|wikipedia|website)\b/i)){risk='High';tips.push('Avoid mentioning sources directly. Paraphrase and cite.')}if(risk==='Low')tips=['Good! Your text looks original.','Remember to cite any sources you used.','Run through Grammarly or Turnitin for final check.'];const r=document.getElementById('plagResult');r.innerHTML=`<h3>Risk Level: <span style="color:${risk==='Low'?'var(--green)':risk==='Medium'?'orange':'red'}">${risk}</span></h3><p><strong>Word Count:</strong> ${words} | <strong>Avg Sentence:</strong> ${avgWordsPerSent.toFixed(1)} words</p><h4 style="margin-top:16px">Tips to Stay Safe:</h4><ul style="margin-top:8px">${tips.map(t=>`<li style="margin:6px 0">${t}</li>`).join('')}</ul><p style="margin-top:16px;font-size:0.9rem;color:var(--gray-600)"><strong>Note:</strong> This is a basic check. Always use official plagiarism tools for assignments.</p>`;r.classList.remove('hidden')}

// Tool 12: Character Counter
function initCharacter(){const t=document.getElementById('charText');if(!t)return;t.oninput=e=>{const tx=e.target.value;const total=tx.length;document.getElementById('totalChar').textContent=total;document.getElementById('noSpaceChar').textContent=tx.replace(/\s/g,'').length;document.getElementById('twitterLeft').textContent=280-total;document.getElementById('smsCount').textContent=Math.ceil(total/160)}}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init)}else{init()}
