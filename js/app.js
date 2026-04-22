```javascript
// js/app.js

// ==========================================
// 🚨 老師設定區
// ==========================================
// 請填寫你最新部署的 Google Apps Script 網址
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw_h7rVev1VtAuPK4BFGR4i3lLMC2dGH_X6lkeB5IHZNHWPSBcQtFGNg0U9ZEteZMs/exec"; 

// 🟢 開啟 AI 手寫與鍵盤雙模輸入功能
const ENABLE_AI_HANDWRITING = true; 

const motivationalQuotes = [
    "未來的你，必定感激今天努力的自己。", "默默耕耘，總有收穫。", "答應自己，每天堅持多 1 分鐘。", "今天的累積，是明天的底氣。"
];

const fallbackConfigs = {
    'indices': { name: '指數定律', levels: [ { id: 'L1', title: '⭐ 程度 1', badge: 'S1', desc: '只有 1 個運算步驟<br>鞏固單一法則。' }, { id: 'L2', title: '⭐⭐ 程度 2', badge: 'S3', desc: '只有 2 個運算步驟<br>學習法則轉換。' }, { id: 'L3', title: '⭐⭐⭐ 程度 3', badge: 'S3、DSE', desc: '包含 2 個變數<br>嚴格只有 2 步。' } ] },
    'factorization': { name: '因式分解', levels: [ { id: 'L1', title: '⭐ 程度 1', badge: 'S2', desc: '提公因式<br>學習抽出共同因子。' }, { id: 'L2A', title: '⭐⭐ 程度 2A', badge: 'S2', desc: '一元二次公式分解<br>單一變數完全平方與平方差。' }, { id: 'L2B', title: '⭐⭐ 程度 2B', badge: 'S2', desc: '二元二次公式分解<br>雙變數完全平方與平方差。' }, { id: 'L3A', title: '⭐⭐⭐ 程度 3A', badge: 'S3、DSE', desc: '一元二次因式分解<br>單變數十字相乘法。' }, { id: 'L3B', title: '⭐⭐⭐ 程度 3B', badge: 'S3、DSE', desc: '二元二次因式分解<br>包含雙變數的十字相乘。' } ] },
    'rounding': { name: '近似值與捨入', levels: [ { id: 'L1', title: '⭐ 程度 1', badge: 'S1、DSE', desc: '基本捨入<br>小數點與有效數字的基本四捨五入。' }, { id: 'L2', title: '⭐⭐ 程度 2', badge: 'S1、DSE', desc: '上捨入與下捨入<br>進階要求：強制進位或捨去。' }, { id: 'L3', title: '⭐⭐⭐ 程度 3', badge: 'S1、DSE', desc: '綜合應用<br>包含前導零小數及大整數陷阱。' } ] },
    'identities': { name: '恆等式', levels: [ { id: 'L1', title: '⭐ 程度 1', badge: 'S2', desc: '展開與比較係數<br>基礎一元一次恆等式。' }, { id: 'L2', title: '⭐⭐ 程度 2', badge: 'S2、DSE', desc: '二次恆等式<br>進階代入與比較係數。' }, { id: 'L3', title: '⭐⭐⭐ 程度 3', badge: 'S2、DSE', desc: '比例問題<br>求取多個未知數的比例。' } ] },
    'fractions': { name: '通分母', levels: [ { id: 'L1', title: '⭐ 程度 1', badge: 'S2、DSE', desc: '分母為一元一次<br>分子為常數。' }, { id: 'L2', title: '⭐⭐ 程度 2', badge: 'S4', desc: '分母為一元二次<br>需先因式分解再通分母。' } ] },
    'binary': { name: '二進制', levels: [ { id: 'L1', title: '⭐ 程度 1', badge: 'S3、DSE', desc: '二進制轉十進制<br>只有加法。' }, { id: 'L2', title: '⭐⭐ 程度 2', badge: 'S3、DSE', desc: '十進制轉二進制<br>只有加法。' }, { id: 'L3', title: '⭐⭐⭐ 程度 3', badge: 'S3、DSE', desc: '綜合轉換<br>包含加法與減法。' } ] },
    'expansion': { name: '恆等式的展開', levels: [ { id: 'L1', title: '⭐ 程度 1', badge: 'S2', desc: '展開 (x+a)² 或 (x+a)(x-a)<br>基礎展開。' }, { id: 'L2', title: '⭐⭐ 程度 2', badge: 'S3、DSE', desc: '展開 (bx+a)² 或 (bx+a)(bx-a)<br>b 為正整數。' }, { id: 'L3', title: '⭐⭐⭐ 程度 3', badge: 'S3、DSE', desc: '展開 (bx+a)² 或 (bx+a)(bx-a)<br>a 與 b 皆可為負數。' } ] },
    'alg_frac_mul_div': { name: '代數分式的乘除法', levels: [ { id: 'L1', title: '⭐ 程度 1', badge: 'S2', desc: '單項式乘除法<br>指數定律約簡' }, { id: 'L2', title: '⭐⭐ 程度 2', badge: 'S2', desc: '二項式乘除法<br>提公因式與變號' }, { id: 'L3', title: '⭐⭐⭐ 程度 3', badge: 'S3、DSE', desc: '進階因式分解<br>平方差與完全平方' }, { id: 'L4', title: '⭐⭐⭐⭐ 程度 4', badge: 'S3、DSE', desc: '進階因式分解<br>十字相乘法' } ] },
    'triangle_area': { name: '三角形面積', levels: [ { id: 'L1', title: '⭐ 程度 1', badge: 'S3、DSE', desc: '包含 1/2absinC 及 希羅公式<br>考驗公式判別與計算。' } ] }
};

let questionBank = [];
let currentQuestionIndex = 0;
let score = 0;
let attemptsCount = 0; 
let currentLevelPref = 1; 
let currentTopic = 'indices'; 
let currentTopicName = '指數定律';
let totalQuestionsConfig = 3; 
let dynamicQuotes = [];
let dynamicTopicConfig = [];
let globalLeaderboard = []; 
let currentLeaderboardHash = ""; 
let isFetchingLock = false; 

let currentRecognizedLaTeX = "";

function getStoredData(key) { try { return localStorage.getItem(key) || ''; } catch (e) { return ''; } }
function setStoredData(key, value) { try { localStorage.setItem(key, value); } catch (e) {} }

async function fetchConfig(isSilent = false) {
    if (isFetchingLock) return; 
    try {
        if (GOOGLE_SCRIPT_URL && !GOOGLE_SCRIPT_URL.includes("請在此貼上")) {
            const cacheBusterUrl = GOOGLE_SCRIPT_URL + (GOOGLE_SCRIPT_URL.includes('?') ? '&' : '?') + 't=' + new Date().getTime();
            const response = await fetch(cacheBusterUrl);
            const data = await response.json();
            
            if (data && data.leaderboard) {
                const newHash = JSON.stringify(data.leaderboard);
                if (newHash !== currentLeaderboardHash) {
                    globalLeaderboard = data.leaderboard;
                    currentLeaderboardHash = newHash;
                    renderLeaderboards(); 
                }
            } else if (currentLeaderboardHash !== "empty") {
                globalLeaderboard = [];
                currentLeaderboardHash = "empty";
                renderLeaderboards();
            }
            if (data.topicConfig) dynamicTopicConfig = data.topicConfig;
            if (data.quotes) dynamicQuotes = data.quotes;
        }
    } catch (e) {
        if (!isSilent) console.warn("⚠️ 讀取設定失敗", e);
        if (currentLeaderboardHash === "") {
            globalLeaderboard = [];
            currentLeaderboardHash = "error";
            renderLeaderboards();
        }
    }
}

function renderLeaderboards(overrideClass = null, overrideNum = null) {
    const homeContainer = document.getElementById('leaderboard-home-container');
    const endContainer = document.getElementById('leaderboard-end-container');
    const myRankHome = document.getElementById('my-rank-home');
    const myRankEnd = document.getElementById('my-rank-end');

    if (!globalLeaderboard || globalLeaderboard.length === 0) {
        const emptyHtml = `<div class="col-span-full text-center py-6 text-slate-500 font-bold">目前尚無排名數據，或網路連線異常。</div>`;
        if (homeContainer) homeContainer.innerHTML = emptyHtml;
        if (endContainer) endContainer.innerHTML = emptyHtml;
        
        const myRankHtml = `<div class="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center text-sm text-slate-500 shadow-sm mb-4">💡 遞交成績後，即可顯示專屬排名狀態。</div>`;
        if (myRankHome) myRankHome.innerHTML = myRankHtml;
        if (myRankEnd) myRankEnd.innerHTML = myRankHtml;
        return;
    }
    
    const currentUserClass = String(overrideClass || getStoredData('dse_className')).toUpperCase().trim();
    const currentUserNum = String(overrideNum || getStoredData('dse_classNumber')).trim();

    let userRank = -1;
    let userScore = 0;
    let userMatched = false;

    globalLeaderboard.forEach((student, index) => {
        const sClass = String(student.className).toUpperCase().trim();
        const sNum = String(student.classNum).trim();
        if (sClass === currentUserClass && sNum === currentUserNum && !userMatched) {
            userRank = index + 1;
            userScore = student.totalScore;
            userMatched = true;
        }
    });

    // 🌟 雙欄排版 (Grid cols-2)
    let html = '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">';
    globalLeaderboard.slice(0, 20).forEach((student, index) => {
        let rankIcon = index === 0 ? '🥇' : (index === 1 ? '🥈' : (index === 2 ? '🥉' : `<span class="inline-block w-6 text-center text-slate-400 font-bold text-sm">${index + 1}.</span>`));
        const isHighestMe = (String(student.className).toUpperCase().trim() === currentUserClass && String(student.classNum).trim() === currentUserNum) && (index + 1 === userRank);

        const bgClass = isHighestMe ? 'bg-amber-100 border-amber-300 ring-2 ring-amber-200' : 'bg-white border-slate-100';
        const textClass = isHighestMe ? 'text-amber-900' : 'text-slate-700';
        const scoreClass = isHighestMe ? 'text-amber-700' : 'text-indigo-600';
        const highlightBadge = isHighestMe ? `<span class="ml-2 text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">你</span>` : '';

        html += `<div class="flex justify-between items-center ${bgClass} p-4 rounded-xl border shadow-sm transition-all hover:shadow-md"><div class="flex items-center gap-3">${rankIcon}<span class="font-bold ${textClass} text-base">${student.className} (${student.classNum}) ${student.studentName}${highlightBadge}</span></div><div class="${scoreClass} font-bold text-lg">${student.totalScore} 分</div></div>`;
    });
    html += '</div>';

    if (homeContainer) homeContainer.innerHTML = html;
    
    // 結算畫面緊湊單欄排版
    let endHtml = '<div class="space-y-2">';
    globalLeaderboard.slice(0, 20).forEach((student, index) => {
        let rankIcon = index === 0 ? '🥇' : (index === 1 ? '🥈' : (index === 2 ? '🥉' : `<span class="inline-block w-6 text-center text-slate-400 font-bold text-sm">${index + 1}.</span>`));
        const isHighestMe = (String(student.className).toUpperCase().trim() === currentUserClass && String(student.classNum).trim() === currentUserNum) && (index + 1 === userRank);

        const bgClass = isHighestMe ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300' : 'bg-white border-slate-100';
        const textClass = isHighestMe ? 'text-amber-800' : 'text-slate-700';
        const scoreClass = isHighestMe ? 'text-amber-700' : 'text-indigo-600';
        const highlightBadge = isHighestMe ? `<span class="ml-2 text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">你</span>` : '';

        endHtml += `<div class="flex justify-between items-center ${bgClass} p-3 rounded-lg border shadow-sm transition-all"><div class="flex items-center gap-2">${rankIcon}<span class="font-bold ${textClass}">${student.className} (${student.classNum}) ${student.studentName}${highlightBadge}</span></div><div class="${scoreClass} font-bold">${student.totalScore} 分</div></div>`;
    });
    endHtml += '</div>';
    if (endContainer) endContainer.innerHTML = endHtml;

    let myRankHtml = '';
    if (currentUserClass && currentUserNum) {
        if (userRank !== -1) {
            myRankHtml = `<div class="bg-amber-100 border-2 border-amber-300 p-4 rounded-xl flex justify-between items-center shadow-md mb-6"><span class="font-bold text-amber-800 text-lg">👉 你的目前排名：第 ${userRank} 名</span><span class="text-amber-700 font-bold text-xl">${userScore} 分</span></div>`;
        } else {
            myRankHtml = `<div class="bg-slate-100 border border-slate-300 p-3 rounded-lg flex justify-between items-center shadow-sm mb-4"><span class="font-bold text-slate-600">👉 你的目前排名：未上榜</span><span class="text-slate-500 font-bold text-sm">繼續刷題累積積分吧！</span></div>`;
        }
    }
    if (myRankHome) myRankHome.innerHTML = myRankHtml;
    
    if (myRankEnd) {
        if (currentUserClass && currentUserNum && userRank !== -1) {
            myRankEnd.innerHTML = `<div class="bg-amber-100 border border-amber-400 p-3 rounded-lg flex justify-between items-center shadow-sm mb-4"><span class="font-bold text-amber-800">👉 你的目前排名：第 ${userRank} 名</span><span class="text-amber-700 font-bold">${userScore} 分</span></div>`;
        } else if (currentUserClass && currentUserNum) {
            myRankEnd.innerHTML = `<div class="bg-slate-100 border border-slate-300 p-3 rounded-lg flex justify-between items-center shadow-sm mb-4"><span class="font-bold text-slate-600">👉 你的目前排名：未上榜</span><span class="text-slate-500 font-bold text-sm">繼續刷題累積積分吧！</span></div>`;
        }
    }
}

function setQuestionNum(num) {
    totalQuestionsConfig = num;
    document.querySelectorAll('.num-btn').forEach(btn => {
        btn.classList.remove('bg-indigo-600', 'text-white', 'shadow-md');
        btn.classList.add('bg-transparent', 'text-slate-600');
    });
    const activeBtn = document.getElementById('btn-num-' + num);
    if (activeBtn) { activeBtn.classList.remove('bg-transparent', 'text-slate-600'); activeBtn.classList.add('bg-indigo-600', 'text-white', 'shadow-md'); }
}

function showTopicScreen() {
    document.getElementById('topicScreen').classList.remove('hidden');
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('appContainer').classList.add('hidden');
    document.getElementById('endScreen').classList.add('hidden');
}

function backToLevelSelection() {
    document.getElementById('appContainer').classList.add('hidden');
    document.getElementById('endScreen').classList.add('hidden');
    if (currentTopic === 'global_mixed') showTopicScreen(); else selectTopic(currentTopic);
}

function backToLevelSelectionFromQuiz() { document.getElementById('confirmModal').classList.remove('hidden'); }
function closeConfirmModal() { document.getElementById('confirmModal').classList.add('hidden'); }
function confirmBackToLevelSelection() { closeConfirmModal(); backToLevelSelection(); }

// 🌟 核心：為所有題目動態賦予分數值
function assignQuestionScores() {
    questionBank.forEach(q => {
        let lvlStr = q.level || "";
        if (lvlStr.includes('4')) q.scoreVal = 15;
        else if (lvlStr.includes('3')) q.scoreVal = 12;
        else if (lvlStr.includes('2')) q.scoreVal = 8;
        else if (lvlStr.includes('1')) q.scoreVal = 5;
        else q.scoreVal = 10; // 防呆
    });
}

function selectTopic(topic) {
    currentTopic = topic;
    document.getElementById('topicScreen').classList.add('hidden');
    document.getElementById('startScreen').classList.remove('hidden');
    
    ['btnL1', 'btnL2', 'btnL3', 'btnL4', 'btnL2A', 'btnL2B', 'btnL3A', 'btnL3B'].forEach(id => {
        if (document.getElementById(id)) document.getElementById(id).classList.add('hidden');
    });

    let config = fallbackConfigs[topic];
    if (!config) return;
    currentTopicName = config.name;
    document.getElementById('levelTitle').textContent = config.name + ' - 請選擇難度';

    config.levels.forEach(lvl => {
        let title = lvl.title, badge = lvl.badge, desc = lvl.desc;
        
        if (typeof dynamicTopicConfig !== 'undefined' && dynamicTopicConfig.length > 0) {
            let custom = dynamicTopicConfig.find(c => c.topic === topic && c.levelId === lvl.id);
            if (custom) {
                if (custom.title) title = custom.title;
                if (custom.badge) badge = custom.badge;
                if (custom.desc) desc = custom.desc;
            }
        }
        
        let scoreVal = 5;
        if (lvl.id.includes('2')) scoreVal = 8;
        if (lvl.id.includes('3')) scoreVal = 12;
        if (lvl.id.includes('4')) scoreVal = 15;

        const btn = document.getElementById('btn' + lvl.id.toUpperCase());
        if (btn) {
            btn.classList.remove('hidden');
            let colorClass = lvl.id.includes('1') ? 'bg-green-100 text-green-700' : (lvl.id.includes('2') ? 'bg-blue-100 text-blue-700' : (lvl.id.includes('3') ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'));
            
            btn.querySelector('.font-bold').innerHTML = title + `<div class="mt-1"><span class="inline-block px-2 py-0.5 ${colorClass} text-xs rounded-md font-bold">${badge}</span></div>`;
            // 🌟 於難度選擇頁面清楚顯示配分
            btn.lastElementChild.innerHTML = desc + `<div class="mt-3 text-indigo-600 font-bold text-sm bg-indigo-50 inline-block px-3 py-1 rounded-full shadow-sm border border-indigo-100">🎯 答對得 ${scoreVal} 分</div>`;
        }
    });
}

function assignHandwriting(bank) {
    if (!ENABLE_AI_HANDWRITING) return; 
    let hwCount = 0;
    if (bank.length === 3) hwCount = 1;
    else if (bank.length === 5) hwCount = 2;
    else if (bank.length === 10) hwCount = 5;
    else if (bank.length > 0) hwCount = Math.floor(bank.length / 2);

    let indices = Array.from({length: bank.length}, (_, i) => i);
    indices = shuffleArray(indices).slice(0, hwCount);
    
    for (let i of indices) {
        if(bank[i]) { bank[i].isHandwriting = true; }
    }
}

function startGlobalMixed(level) {
    try {
        currentTopic = 'global_mixed';
        currentTopicName = '跨課題綜合挑戰';
        currentLevelPref = level;

        let topicsList = ['indices', 'factorization', 'rounding', 'identities', 'fractions', 'binary', 'expansion', 'alg_frac_mul_div', 'triangle_area'];
        let numQ = topicsList.length; // 確保涵蓋所有課題
        let selectedTopics = shuffleArray([...topicsList]);

        questionBank = [];
        selectedTopics.forEach((t, idx) => {
            let qArr = [];
            let lvl = String(level);
            
            // 防呆：確保各單元不會呼叫超出其設計的難度
            let supportedIds = fallbackConfigs[t].levels.map(l => l.id.toLowerCase());
            let maxSupported = supportedIds.some(id => id.includes('4')) ? 4 : (supportedIds.some(id => id.includes('3')) ? 3 : 2);
            if (parseInt(lvl) > maxSupported) lvl = String(maxSupported);
            
            try {
                if (t === 'indices') qArr = generateIndicesQuestions(1, lvl);
                else if (t === 'factorization') {
                    let fLvl = lvl;
                    // 因式分解需要加上 a/b 後綴
                    if (lvl === '2') fLvl = Math.random() > 0.5 ? '2a' : '2b';
                    if (lvl === '3' || lvl === '4') fLvl = Math.random() > 0.5 ? '3a' : '3b';
                    qArr = generateFactorizationQuestions(1, fLvl);
                }
                else if (t === 'rounding') qArr = generateRoundingQuestions(1, lvl);
                else if (t === 'identities') qArr = generateIdentitiesQuestions(1, lvl);
                else if (t === 'fractions') qArr = generateFractionsQuestions(1, lvl);
                else if (t === 'binary') qArr = generateBinaryQuestions(1, lvl);
                else if (t === 'expansion') qArr = generateExpansionQuestions(1, lvl);
                else if (t === 'alg_frac_mul_div') qArr = generateAlgFracMulDivQuestions(1, lvl);
                else if (t === 'triangle_area') qArr = generateTriangleAreaQuestions(1, lvl);
            } catch(e) {
                console.error(`Error generating ${t}:`, e);
            }

            if (qArr && qArr.length > 0) { 
                qArr[0].id = idx + 1; 
                questionBank.push(qArr[0]); 
            } else {
                // 萬一某個課題失敗，給予安全的基礎替代題防崩潰
                qArr = generateIndicesQuestions(1, "1");
                qArr[0].id = idx + 1;
                qArr[0].topic = fallbackConfigs[t].name + " (替代)";
                questionBank.push(qArr[0]);
            }
        });

        assignQuestionScores();
        assignHandwriting(questionBank);
        startQuizSession();
    } catch (error) { alert("🚨 系統錯誤！無法讀取跨課題題庫。\n原因：" + error.message); }
}

function startGame(levelPref) {
    try {
        if (currentTopic === 'global_mixed') return startGlobalMixed(levelPref);

        currentLevelPref = levelPref;
        
        if (currentTopic === 'indices') questionBank = generateIndicesQuestions(totalQuestionsConfig, currentLevelPref); 
        else if (currentTopic === 'factorization') questionBank = generateFactorizationQuestions(totalQuestionsConfig, currentLevelPref); 
        else if (currentTopic === 'rounding') questionBank = generateRoundingQuestions(totalQuestionsConfig, currentLevelPref);
        else if (currentTopic === 'identities') questionBank = generateIdentitiesQuestions(totalQuestionsConfig, currentLevelPref);
        else if (currentTopic === 'fractions') questionBank = generateFractionsQuestions(totalQuestionsConfig, currentLevelPref);
        else if (currentTopic === 'binary') questionBank = generateBinaryQuestions(totalQuestionsConfig, currentLevelPref);
        else if (currentTopic === 'expansion') questionBank = generateExpansionQuestions(totalQuestionsConfig, currentLevelPref);
        else if (currentTopic === 'alg_frac_mul_div') questionBank = generateAlgFracMulDivQuestions(totalQuestionsConfig, currentLevelPref);
        else if (currentTopic === 'triangle_area') questionBank = generateTriangleAreaQuestions(totalQuestionsConfig, currentLevelPref);
        
        assignQuestionScores();
        assignHandwriting(questionBank);
        startQuizSession();
    } catch (error) { alert("🚨 系統錯誤！無法讀取題庫。\n原因：" + error.message); }
}

function startQuizSession() {
    currentQuestionIndex = 0; score = 0; updateScoreDisplay();
    document.getElementById('topicScreen').classList.add('hidden');
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('endScreen').classList.add('hidden'); 
    document.getElementById('appContainer').classList.remove('hidden');
    
    const btn = document.getElementById('submitRecordBtn');
    btn.disabled = false; btn.textContent = "傳送成績";
    btn.classList.remove('bg-slate-400'); btn.classList.add('bg-green-600');
    document.getElementById('submitStatus').classList.add('hidden');

    loadQuestion();
}

// 🌟 雙模切換邏輯
window.switchInputMode = function(mode) {
    const drawZone = document.getElementById('draw-input-zone');
    const kbZone = document.getElementById('keyboard-input-zone');
    const tabDraw = document.getElementById('tab-draw');
    const tabKb = document.getElementById('tab-keyboard');
    
    if (mode === 'draw') {
        drawZone.classList.remove('hidden');
        kbZone.classList.add('hidden');
        tabDraw.className = "flex-1 py-2 text-sm font-bold rounded-md bg-white text-indigo-600 shadow-sm transition-all";
        tabKb.className = "flex-1 py-2 text-sm font-bold rounded-md text-slate-500 hover:text-slate-700 transition-all";
        setTimeout(() => { resizeCanvas(); }, 50); 
    } else {
        drawZone.classList.add('hidden');
        kbZone.classList.remove('hidden');
        tabKb.className = "flex-1 py-2 text-sm font-bold rounded-md bg-white text-indigo-600 shadow-sm transition-all";
        tabDraw.className = "flex-1 py-2 text-sm font-bold rounded-md text-slate-500 hover:text-slate-700 transition-all";
    }
};

// 🌟 跳過本題功能
window.skipQuestion = function() {
    if (confirm("確定要跳過這題嗎？\n(跳過本題將獲得 0 分，並會直接顯示正確解答供您參考)")) {
        let q = questionBank[currentQuestionIndex];
        let correctOpt = q.options.find(o => o.isCorrect);
        
        attemptsCount = 2; // 強制標記為已失敗兩次，不再給分
        
        showFeedback('incorrect', correctOpt.hint, true); 
        document.getElementById('feedbackMessage').insertAdjacentHTML('afterbegin', `<div class="mb-4 text-orange-600 font-bold text-lg sm:text-xl bg-orange-50 p-3 rounded-lg border border-orange-200 shadow-sm">⏭️ 你已選擇跳過本題 (獲得 0 分)</div>`);
        
        disableAllButtons();
        document.getElementById('skip-btn').disabled = true;
        document.getElementById('skip-btn').classList.add('opacity-50', 'cursor-not-allowed');

        if (q.isHandwriting) {
            document.getElementById('clear-btn').disabled = true;
            document.getElementById('recognize-btn').disabled = true;
            document.getElementById('kb-recognize-btn').disabled = true;
            document.getElementById('kb-clear-btn').disabled = true;
            document.getElementById('draw-container').classList.add('border-slate-300');
            document.getElementById('kb-container').classList.add('border-slate-300');
        }
    }
};

function loadQuestion() {
    attemptsCount = 0; 
    currentRecognizedLaTeX = ""; 
    
    const q = questionBank[currentQuestionIndex];
    document.getElementById('topicBadge').textContent = q.topic;
    document.getElementById('levelBadge').innerHTML = currentTopic === 'global_mixed' ? `綜合挑戰 (難度: ${currentLevelPref})` : `難度: ${q.level}`;
    document.getElementById('progressText').textContent = `完成 ${currentQuestionIndex}/${questionBank.length}`;
    hideFeedback();
    
    document.getElementById('skip-btn').disabled = false;
    document.getElementById('skip-btn').classList.remove('opacity-50', 'cursor-not-allowed');
    
    if (document.getElementById('hw-confirm-ui')) {
        document.getElementById('hw-confirm-ui').classList.add('hidden');
    }
    
    let typeLabel = q.isHandwriting ? `<span class="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-md text-sm font-bold align-middle mt-2 sm:mt-0 shadow-sm border border-amber-200">🤖 AI 輔助作答</span>` : "";
    document.getElementById('questionText').innerHTML = q.question + `<div class="mt-2 text-center">${typeLabel}</div>`;

    const optionsGrid = document.getElementById('optionsGrid');
    const hwArea = document.getElementById('handwritingArea');
    
    if (q.isHandwriting) {
        optionsGrid.classList.add('hidden');
        if (hwArea) {
            hwArea.classList.remove('hidden');
            
            document.getElementById('draw-container').classList.remove('border-green-500', 'border-red-400');
            document.getElementById('kb-container').classList.remove('border-green-500', 'border-red-400');
            document.getElementById('clear-btn').disabled = false;
            document.getElementById('recognize-btn').disabled = false;
            document.getElementById('kb-clear-btn').disabled = false;
            document.getElementById('kb-recognize-btn').disabled = false;
            document.getElementById('keyboard-math-input').value = ""; 

            switchInputMode('draw');
            setTimeout(() => { resizeCanvas(); initCanvas(); }, 50);
        }
    } else {
        optionsGrid.classList.remove('hidden');
        if (hwArea) hwArea.classList.add('hidden');
        optionsGrid.innerHTML = ''; 
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn relative p-3 sm:p-4 bg-white border-2 border-slate-200 rounded-xl text-base sm:text-lg text-slate-700 font-medium hover:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 flex items-center gap-3 text-left w-full overflow-hidden';
            btn.onclick = () => handleAnswer(opt, btn);
            btn.innerHTML = `<span class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm shrink-0">${opt.id}</span><span class="overflow-x-auto math-scroll max-w-full flex-1 py-1">${opt.text}</span>`;
            optionsGrid.appendChild(btn);
        });
    }
    renderMath();
}

function handleAnswer(selectedOption, buttonElement) {
    attemptsCount++;
    document.getElementById('skip-btn').disabled = true;
    document.getElementById('skip-btn').classList.add('opacity-50', 'cursor-not-allowed');

    if (selectedOption.isCorrect) {
        buttonElement.classList.add('border-green-500', 'bg-green-50');
        buttonElement.querySelector('span').classList.replace('bg-slate-100', 'bg-green-500');
        buttonElement.querySelector('span').classList.replace('text-slate-500', 'text-white');
        
        if (attemptsCount === 1) { 
            let q = questionBank[currentQuestionIndex];
            score += (q.scoreVal || 10); 
            updateScoreDisplay(); 
        }
        
        showFeedback('correct', selectedOption.hint, true);
        disableAllButtons();
    } else {
        buttonElement.classList.add('border-red-300', 'bg-red-50');
        buttonElement.disabled = true;
        showFeedback('incorrect', selectedOption.hint, false);
    }
}

function showFeedback(type, message, showNextBtn) {
    const fbArea = document.getElementById('feedbackArea');
    const fbBox = document.getElementById('feedbackBox');
    fbArea.classList.remove('hidden');
    fbBox.className = type === 'correct' ? 'p-4 rounded-xl border bg-green-50 border-green-200 w-full overflow-hidden shadow-sm' : 'p-4 rounded-xl border bg-orange-50 border-orange-200 w-full overflow-hidden shadow-sm';
    document.getElementById('feedbackMessage').innerHTML = message;
    
    const nextBtn = document.getElementById('nextBtn');
    if (showNextBtn) { nextBtn.classList.remove('hidden'); nextBtn.onclick = goToNext; } else { nextBtn.classList.add('hidden'); }
    renderMath();
}

function hideFeedback() { document.getElementById('feedbackArea').classList.add('hidden'); }
function disableAllButtons() { document.querySelectorAll('.option-btn').forEach(btn => { if (!btn.classList.contains('border-green-500')) btn.disabled = true; }); }
function goToNext() { currentQuestionIndex++; if (currentQuestionIndex < questionBank.length) loadQuestion(); else showEndScreen(); }

// ==========================================
// 🖌️ 畫布繪圖核心邏輯 (Canvas)
// ==========================================
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function initCanvas() {
    const canvas = document.getElementById('draw-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
}

function resizeCanvas() {
    const canvas = document.getElementById('draw-canvas');
    if (!canvas || !canvas.parentElement) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width; tempCanvas.height = canvas.height;
    if (canvas.width > 0 && canvas.height > 0) { tempCtx.drawImage(canvas, 0, 0); }
    
    canvas.width = rect.width; canvas.height = rect.height;
    initCanvas();
    if (tempCanvas.width > 0 && tempCanvas.height > 0) { canvas.getContext('2d').drawImage(tempCanvas, 0, 0, canvas.width, canvas.height); }
}

function getPos(e) {
    const canvas = document.getElementById('draw-canvas');
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
}

function startDrawing(e) { e.preventDefault(); isDrawing = true; const pos = getPos(e); lastX = pos.x; lastY = pos.y; }
function draw(e) { if (!isDrawing) return; e.preventDefault(); const pos = getPos(e); const ctx = document.getElementById('draw-canvas').getContext('2d'); ctx.beginPath(); ctx.moveTo(lastX, lastY); ctx.lineTo(pos.x, pos.y); ctx.stroke(); lastX = pos.x; lastY = pos.y; }
function stopDrawing() { isDrawing = false; }

function setupCanvasEvents() {
    const canvas = document.getElementById('draw-canvas');
    if (!canvas) return;
    canvas.addEventListener('mousedown', startDrawing); canvas.addEventListener('mousemove', draw); canvas.addEventListener('mouseup', stopDrawing); canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('touchstart', startDrawing, { passive: false }); canvas.addEventListener('touchmove', draw, { passive: false }); canvas.addEventListener('touchend', stopDrawing); canvas.addEventListener('touchcancel', stopDrawing);
    
    document.getElementById('clear-btn').addEventListener('click', () => { 
        initCanvas(); 
        document.getElementById('draw-container').classList.remove('border-green-500', 'border-red-400');
    });
    document.getElementById('recognize-btn').addEventListener('click', startRecognitionPhase);
    
    document.getElementById('kb-clear-btn').addEventListener('click', () => {
        document.getElementById('keyboard-math-input').value = "";
        document.getElementById('kb-container').classList.remove('border-green-500', 'border-red-400');
    });
    document.getElementById('kb-recognize-btn').addEventListener('click', startKeyboardRecognitionPhase);

    window.addEventListener('resize', resizeCanvas);
}

// ==========================================
// 🤖 全新連線架構：使用 Google Apps Script (美國伺服器)
// ==========================================
async function fetchWithRetry(url, options, maxRetries = 3) {
    let delays = [1000, 2000, 4000];
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP 錯誤: ${response.status}`);
            return await response.json();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delays[i]));
        }
    }
}

// 🌟 處理「手寫圖片」上傳
async function startRecognitionPhase() {
    const canvas = document.getElementById('draw-canvas');
    
    const MAX_WIDTH = 800; 
    let scale = 1;
    if (canvas.width > MAX_WIDTH) scale = MAX_WIDTH / canvas.width;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width * scale;
    tempCanvas.height = canvas.height * scale;
    const ctx = tempCanvas.getContext('2d');

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    ctx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);

    const dataURL = tempCanvas.toDataURL('image/jpeg', 0.8);
    const base64Image = dataURL.split(',')[1];
    
    const loadingDiv = document.getElementById('global-loading');
    document.getElementById('global-loading-text').innerHTML = "AI 正在將你的手寫筆跡轉換為數式...<br><span class='text-sm font-normal text-slate-500'>傳送至 Google 雲端處理中</span>";
    loadingDiv.classList.remove('hidden');
    
    document.getElementById('recognize-btn').disabled = true;
    document.getElementById('clear-btn').disabled = true;
    document.getElementById('draw-container').classList.remove('border-green-500', 'border-red-400');
    
    try {
        const formData = new URLSearchParams();
        formData.append('action', 'ai_ocr');
        formData.append('image', base64Image);

        const result = await fetchWithRetry(GOOGLE_SCRIPT_URL, { 
            method: 'POST', 
            body: formData
        });
        
        if (!result.success) throw new Error(result.message);

        if (result.latex === undefined) {
            throw new Error("後台未回傳數式！請確認您的 Google Apps Script 已部署了最新的 V43 代碼，並且部署時有選擇「建立新版本」。");
        }
        
        currentRecognizedLaTeX = result.latex;
        loadingDiv.classList.add('hidden');
        
        const confirmUI = document.getElementById('hw-confirm-ui');
        const mathDiv = document.getElementById('hw-confirm-math');

        let existingWarning = document.getElementById('model-warning-ocr');
        if (existingWarning) existingWarning.remove();

        if (result.usedModel && result.usedModel !== "gemini-2.5-pro") {
            const debugText = result.debugInfo ? `<br><span class="text-xs font-normal text-red-500 text-left block mt-1">🔍 偵錯紀錄: ${result.debugInfo}</span>` : "";
            const warningHtml = `<div id="model-warning-ocr" class="w-full max-w-sm bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-3 text-sm font-bold shadow-sm">⚠️ 注意：Gemini 2.5 Pro 呼叫失敗，已降級使用「${result.usedModel}」。${debugText}</div>`;
            mathDiv.insertAdjacentHTML('beforebegin', warningHtml);
        }

        mathDiv.innerHTML = `\\( \\displaystyle ${currentRecognizedLaTeX} \\)`;
        confirmUI.classList.remove('hidden');
        renderMath();
        
    } catch (err) {
        console.error(err);
        alert(`⚠️ 辨識失敗！\n\n詳細錯誤：${err.message}`);
        loadingDiv.classList.add('hidden');
        document.getElementById('recognize-btn').disabled = false;
        document.getElementById('clear-btn').disabled = false;
    }
}

// 🌟 處理「鍵盤文字」上傳
async function startKeyboardRecognitionPhase() {
    const kbInput = document.getElementById('keyboard-math-input').value.trim();
    if (!kbInput) {
        alert("請先輸入數學算式！");
        return;
    }
    
    const loadingDiv = document.getElementById('global-loading');
    document.getElementById('global-loading-text').innerHTML = "AI 正在將文字轉換為標準數式...<br><span class='text-sm font-normal text-slate-500'>傳送至 Google 雲端處理中</span>";
    loadingDiv.classList.remove('hidden');
    
    document.getElementById('kb-recognize-btn').disabled = true;
    document.getElementById('kb-clear-btn').disabled = true;
    document.getElementById('kb-container').classList.remove('border-green-500', 'border-red-400');
    
    try {
        const formData = new URLSearchParams();
        formData.append('action', 'ai_text_to_latex');
        formData.append('text', kbInput);

        const result = await fetchWithRetry(GOOGLE_SCRIPT_URL, { 
            method: 'POST', 
            body: formData
        });
        
        if (!result.success) throw new Error(result.message);

        if (result.latex === undefined) {
            throw new Error("後台未回傳數式！請確認您的 Google Apps Script 已部署了包含「鍵盤轉換」的最新 V43 代碼，並且部署時有選擇「建立新版本」。");
        }
        
        currentRecognizedLaTeX = result.latex;
        loadingDiv.classList.add('hidden');
        
        const confirmUI = document.getElementById('hw-confirm-ui');
        const mathDiv = document.getElementById('hw-confirm-math');

        let existingWarning = document.getElementById('model-warning-ocr');
        if (existingWarning) existingWarning.remove();

        if (result.usedModel && result.usedModel !== "gemini-2.5-pro") {
            const debugText = result.debugInfo ? `<br><span class="text-xs font-normal text-red-500 text-left block mt-1">🔍 偵錯紀錄: ${result.debugInfo}</span>` : "";
            const warningHtml = `<div id="model-warning-ocr" class="w-full max-w-sm bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-3 text-sm font-bold shadow-sm">⚠️ 注意：Gemini 2.5 Pro 呼叫失敗，已降級使用「${result.usedModel}」。${debugText}</div>`;
            mathDiv.insertAdjacentHTML('beforebegin', warningHtml);
        }

        mathDiv.innerHTML = `\\( \\displaystyle ${currentRecognizedLaTeX} \\)`;
        confirmUI.classList.remove('hidden');
        renderMath();
        
    } catch (err) {
        console.error(err);
        alert(`⚠️ 轉換失敗！\n\n詳細錯誤：${err.message}`);
        loadingDiv.classList.add('hidden');
        document.getElementById('kb-recognize-btn').disabled = false;
        document.getElementById('kb-clear-btn').disabled = false;
    }
}

window.rewriteHandwriting = function() {
    document.getElementById('hw-confirm-ui').classList.add('hidden');
    initCanvas(); 
    document.getElementById('recognize-btn').disabled = false;
    document.getElementById('clear-btn').disabled = false;
    document.getElementById('kb-recognize-btn').disabled = false;
    document.getElementById('kb-clear-btn').disabled = false;
};

window.confirmAndGrade = async function() {
    document.getElementById('hw-confirm-ui').classList.add('hidden');
    
    // 取消跳過功能
    document.getElementById('skip-btn').disabled = true;
    document.getElementById('skip-btn').classList.add('opacity-50', 'cursor-not-allowed');
    
    const loadingDiv = document.getElementById('global-loading');
    document.getElementById('global-loading-text').innerHTML = "AI 老師正在進行邏輯批改...<br><span class='text-sm font-normal text-slate-500'>比對等價性中</span>";
    loadingDiv.classList.remove('hidden');

    try {
        let q = questionBank[currentQuestionIndex];
        let correctOpt = q.options.find(o => o.isCorrect);
        
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = correctOpt.text;
        let standardAns = tempDiv.textContent || tempDiv.innerText;
        
        const formData = newSearchParams();
        formData.append('action', 'ai_grade');
        formData.append('studentLatex', currentRecognizedLaTeX);
        formData.append('standardAns', standardAns);

        const result = await fetchWithRetry(GOOGLE_SCRIPT_URL, { 
            method: 'POST', 
            body: formData
        });
        
        if (!result.success) throw new Error(result.message);
        
        loadingDiv.classList.add('hidden');
        attemptsCount++;
        
        let warningHtml = "";
        if (result.usedModel && result.usedModel !== "gemini-2.5-pro") {
            const debugText = result.debugInfo ? `<br><span class="text-xs font-normal text-red-500 mt-1 block text-left">🔍 偵錯紀錄: ${result.debugInfo}</span>` : "";
            warningHtml = `<div class="mt-3 text-red-700 font-bold border-t border-red-200 pt-3 bg-red-50 p-3 rounded-lg shadow-inner text-sm text-center">⚠️ 批改降級警告：Gemini 2.5 Pro 呼叫失敗，已降級使用「${result.usedModel}」。${debugText}</div>`;
        }

        let feedbackHtml = `<div class="mb-3 p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-slate-800 shadow-sm">
            <div class="font-bold text-indigo-700 mb-2">🤖 你的作答 (AI 辨識)：</div>
            <div class="text-xl sm:text-2xl font-bold text-indigo-700 overflow-x-auto math-scroll py-4 bg-white rounded-lg border border-white text-center whitespace-nowrap shadow-inner">\\( \\displaystyle ${currentRecognizedLaTeX} \\)</div>
            ${result.reason ? `<div class="mt-3 text-red-600 font-bold border-t border-indigo-100 pt-2">💡 老師點評：${result.reason}</div>` : ''}
            ${warningHtml}
        </div>`;
        
        let finalHint = feedbackHtml + correctOpt.hint;

        if (result.isCorrect) {
            if (attemptsCount === 1) { 
                score += (q.scoreVal || 10); 
                updateScoreDisplay(); 
            }
            showFeedback('correct', finalHint, true);
            document.getElementById('draw-container').classList.add('border-green-500');
            document.getElementById('kb-container').classList.add('border-green-500');
        } else {
            showFeedback('incorrect', finalHint, false);
            document.getElementById('draw-container').classList.add('border-red-400');
            document.getElementById('kb-container').classList.add('border-red-400');
            document.getElementById('recognize-btn').disabled = false;
            document.getElementById('clear-btn').disabled = false;
            document.getElementById('kb-recognize-btn').disabled = false;
            document.getElementById('kb-clear-btn').disabled = false;
            
            if (attemptsCount >= 2) {
                let giveUpHtml = `<div class="mt-4 text-center"><button onclick="giveUpHandwriting()" class="px-5 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-colors shadow-sm">放棄作答並看正確步驟</button></div>`;
                document.getElementById('feedbackMessage').innerHTML += giveUpHtml;
            }
        }
        
    } catch (err) {
        console.error(err);
        alert(`⚠️ 批改失敗！\n\n詳細錯誤：${err.message}\n\n(若顯示 GAS 崩潰，請確認已部署最新版 server.gs)`);
        loadingDiv.classList.add('hidden');
        document.getElementById('hw-confirm-ui').classList.remove('hidden');
    }
};

window.giveUpHandwriting = function() {
    let q = questionBank[currentQuestionIndex];
    let correctOpt = q.options.find(o => o.isCorrect);
    showFeedback('incorrect', correctOpt.hint, true); 
    document.getElementById('clear-btn').disabled = true;
    document.getElementById('recognize-btn').disabled = true;
    document.getElementById('kb-recognize-btn').disabled = true;
    document.getElementById('kb-clear-btn').disabled = true;
};

// ==========================================
// 結算畫面與成績儲存
// ==========================================
function showEndScreen() {
    document.getElementById('appContainer').classList.add('hidden');
    document.getElementById('endScreen').classList.remove('hidden');
    
    // 🌟 動態計算滿分並顯示
    let totalPossibleScore = questionBank.reduce((sum, q) => sum + (q.scoreVal || 10), 0);
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('totalQuestions').textContent = totalPossibleScore;
    
    let selectedQuote = { text: "今天的累積，是明天的底氣。" };
    let pool = dynamicQuotes.length > 0 ? dynamicQuotes : motivationalQuotes.map(q => ({text: q, weight: 1}));
    
    let totalWeight = pool.reduce((sum, q) => sum + (parseFloat(q.weight) || 1), 0);
    let randomNum = Math.random() * totalWeight;
    for (let q of pool) {
        let w = parseFloat(q.weight) || 1;
        if (randomNum < w) { selectedQuote = q; break; }
        randomNum -= w;
    }
    document.getElementById('motivationalQuote').textContent = selectedQuote.text;
    
    const savedClass = String(getStoredData('dse_className')).toUpperCase().trim();
    const savedNum = String(getStoredData('dse_classNumber')).trim();
    let oldScore = 0;
    if (savedClass && savedNum && globalLeaderboard && globalLeaderboard.length > 0) {
        let student = globalLeaderboard.find(s => String(s.className).toUpperCase().trim() === savedClass && String(s.classNum).trim() === savedNum);
        if (student) oldScore = student.totalScore;
    }
    
    let currentProgress = oldScore % 100;
    let nextThresholdDist = 100 - currentProgress;

    let rewardContainer = document.getElementById('rewardContainer');
    if (rewardContainer) {
        rewardContainer.classList.remove('hidden');
        rewardContainer.innerHTML = `
            <div id="rewardZone" class="w-full bg-white border-2 border-indigo-100 rounded-xl p-5 shadow-sm relative overflow-hidden transition-all duration-500">
                <div id="progressUI" class="block transition-opacity duration-500">
                    <div class="flex justify-between items-end mb-3">
                        <span class="font-bold text-slate-700 text-lg">🎁 刮刮卡解鎖進度</span>
                        <span class="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md" id="progressTextUI">${currentProgress} / 100</span>
                    </div>
                    <div class="w-full bg-slate-100 rounded-full h-5 mb-2 overflow-hidden border border-slate-200 shadow-inner relative">
                        <div id="progressBarFill" class="bg-gradient-to-r from-indigo-400 to-indigo-600 h-5 rounded-full transition-all duration-1000 ease-out relative" style="width: ${currentProgress}%">
                            <div class="absolute inset-0 bg-white/20 w-full h-full animate-[pulse_2s_infinite]"></div>
                        </div>
                    </div>
                    <div class="text-sm text-slate-500 text-center mt-3 font-medium" id="progressHint">
                        還差 <span class="text-indigo-600 font-bold">${nextThresholdDist} 分</span> 即可獲得抽獎機會！傳送成績後更新進度。
                    </div>
                </div>

                <div id="scratchUI" class="hidden opacity-0 transition-opacity duration-500">
                    <div class="relative w-full h-20 sm:h-24 rounded-xl overflow-hidden border-2 border-amber-200 shadow-sm" style="touch-action:none;">
                        <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-amber-50 to-orange-50 text-orange-600 font-bold px-4 text-center text-sm sm:text-base">🎁 <span id="rewardTextDisplay"></span></div>
                        <canvas id="scratchCanvas" class="absolute inset-0 w-full h-full z-10 cursor-pointer"></canvas>
                    </div>
                    <div class="text-xs sm:text-sm text-amber-600 mt-3 text-center font-bold animate-pulse">✨ 恭喜達成滿百目標，快刮開上方塗層看看！✨</div>
                </div>
            </div>
        `;
    }
}

function updateScoreDisplay() { document.getElementById('scoreDisplay').textContent = score; }

function submitToGoogleSheet() {
    const btn = document.getElementById('submitRecordBtn');
    const statusText = document.getElementById('submitStatus');
    const className = document.getElementById('className').value.trim();
    const classNumber = document.getElementById('classNumber').value.trim();
    const studentName = document.getElementById('studentName').value.trim();

    if (!className || !classNumber || !studentName) {
        statusText.textContent = "⚠️ 請填寫所有資料"; statusText.className = "text-center text-sm font-bold mt-3 text-red-500 block"; statusText.classList.remove('hidden'); return;
    }

    setStoredData('dse_className', className); setStoredData('dse_classNumber', classNumber); setStoredData('dse_studentName', studentName);

    btn.disabled = true; btn.textContent = "傳送中..."; btn.classList.add('opacity-50'); statusText.classList.add('hidden');
    
    let displayLevel = currentLevelPref === 'mixed' ? '綜合挑戰' : currentLevelPref.toString().toUpperCase();
    
    // 🌟 動態總分計算上傳
    let totalScoreVal = questionBank.reduce((sum, q) => sum + (q.scoreVal || 10), 0);
    let percentageVal = ((score / totalScoreVal) * 100).toFixed(0) + "%";

    const formData = new URLSearchParams();
    formData.append('className', className); formData.append('classNumber', classNumber); formData.append('studentName', studentName);
    formData.append('topic', currentTopicName); formData.append('level', `程度 ${displayLevel}`); formData.append('score', score);
    formData.append('totalScore', totalScoreVal); formData.append('percentage', percentageVal);

    fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                let backendNewTotal = parseInt(data.newTotalScore) || 0;
                let backendPlayCount = parseInt(data.playCountToday) || 1;
                let isCrossed = data.crossedThreshold;
                let officialName = data.officialName || studentName; 
                
                let student = globalLeaderboard.find(s => String(s.className).toUpperCase().trim() === className.toUpperCase() && String(s.classNum).trim() === classNumber);
                if (student) { student.totalScore = backendNewTotal; } 
                else { globalLeaderboard.push({className: className, classNum: classNumber, studentName: officialName, totalScore: backendNewTotal}); }
                renderLeaderboards();

                let pointsNeeded = 100 - (backendNewTotal % 100);
                if (pointsNeeded === 0) pointsNeeded = 100;
                
                let targetProgress = backendNewTotal % 100;
                if (isCrossed) targetProgress = 100; 
                
                const fill = document.getElementById('progressBarFill');
                const textUI = document.getElementById('progressTextUI');
                const hint = document.getElementById('progressHint');
                
                if (fill) fill.style.width = targetProgress + '%';
                if (textUI) textUI.textContent = isCrossed ? '100 / 100' : `${backendNewTotal % 100} / 100`;

                if (isCrossed) {
                    if (hint) hint.innerHTML = `<span class="text-amber-600 font-bold">🎉 恭喜達成滿百目標！正在解鎖刮刮卡...</span>`;
                    statusText.innerHTML = `✅ 成績傳送成功！(今日第 ${backendPlayCount} 次)<br>🎉 目前總分：${backendNewTotal} 分。邁向下一抽還差 <span class="text-indigo-600 font-bold">${100 - (backendNewTotal % 100)} 分</span>！`;
                    setTimeout(() => {
                        const progUI = document.getElementById('progressUI'); const scratchUI = document.getElementById('scratchUI'); const rewardZone = document.getElementById('rewardZone');
                        if (progUI && scratchUI && rewardZone) {
                            progUI.classList.add('opacity-0');
                            setTimeout(() => {
                                progUI.classList.add('hidden'); scratchUI.classList.remove('hidden'); void scratchUI.offsetWidth; scratchUI.classList.remove('opacity-0');
                                rewardZone.classList.replace('border-indigo-100', 'border-amber-300'); rewardZone.classList.replace('bg-white', 'bg-amber-50');
                                document.getElementById('rewardTextDisplay').textContent = data.reward && data.reward !== "無" ? data.reward : "再接再厲！";
                                renderScratchCard();
                            }, 500);
                        }
                    }, 1500);
                } else {
                    if (hint) hint.innerHTML = `還差 <span class="text-indigo-600 font-bold">${pointsNeeded} 分</span> 即可獲得抽獎機會！傳送成績後更新進度。`;
                    statusText.innerHTML = `✅ 成績傳送成功！(今日第 ${backendPlayCount} 次)<br>📊 目前總分：${backendNewTotal} 分。`;
                }
                
                statusText.className = "text-center text-sm font-bold mt-3 text-green-600 block leading-relaxed"; statusText.classList.remove('hidden');
                btn.textContent = "✅ 已成功傳送！"; btn.classList.replace('bg-green-600', 'bg-slate-400');
                setTimeout(() => { fetchConfig(true); }, 2000);
            } else {
                btn.disabled = false; btn.textContent = "重新傳送"; btn.classList.remove('opacity-50');
                statusText.textContent = data.message; statusText.className = "text-center text-sm font-bold mt-3 text-red-500 block"; statusText.classList.remove('hidden');
            }
        })
        .catch(err => {
            btn.disabled = false; btn.textContent = "重新傳送"; btn.classList.remove('opacity-50');
            statusText.textContent = "❌ 傳送失敗，請檢查網路連線。"; statusText.className = "text-center text-sm font-bold mt-3 text-red-500 block"; statusText.classList.remove('hidden');
        });
}

function renderScratchCard() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    ctx.fillStyle = '#cbd5e1'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 16px sans-serif'; ctx.fillStyle = '#64748b'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('✨ 刮開看獎勵 ✨', canvas.width / 2, canvas.height / 2);
    ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.lineWidth = 25; ctx.globalCompositeOperation = 'destination-out';
    let isDrawing = false;
    function getPos(e) { const rect = canvas.getBoundingClientRect(); const evt = e.touches ? e.touches[0] : e; return { x: evt.clientX - rect.left, y: evt.clientY - rect.top }; }
    canvas.onmousedown = (e) => { isDrawing = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); };
    canvas.onmousemove = (e) => { if (!isDrawing) return; const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); };
    window.onmouseup = () => isDrawing = false;
    canvas.ontouchstart = (e) => { e.preventDefault(); isDrawing = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); };
    canvas.ontouchmove = (e) => { e.preventDefault(); if (!isDrawing) return; const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); };
    canvas.ontouchend = () => isDrawing = false;
}

function renderMath() {
    if (typeof renderMathInElement !== 'undefined') {
        renderMathInElement(document.getElementById('main-wrapper'), { delimiters: [ {left: '$$', right: '$$', display: true}, {left: '\\[', right: '\\]', display: true}, {left: '\\(', right: '\\)', display: false} ], throwOnError: false });
    }
}

window.setQuestionNum = setQuestionNum; window.showTopicScreen = showTopicScreen; window.backToLevelSelection = backToLevelSelection; window.backToLevelSelectionFromQuiz = backToLevelSelectionFromQuiz; window.closeConfirmModal = closeConfirmModal; window.confirmBackToLevelSelection = confirmBackToLevelSelection; window.selectTopic = selectTopic; window.startGame = startGame; window.startGlobalMixed = startGlobalMixed; window.submitToGoogleSheet = submitToGoogleSheet;

window.onload = () => { 
    showTopicScreen(); fetchConfig(); setInterval(() => fetchConfig(true), 5000); 
    const savedClass = getStoredData('dse_className'); const savedNum = getStoredData('dse_classNumber'); const savedName = getStoredData('dse_studentName');
    if(savedClass) document.getElementById('className').value = savedClass; if(savedNum) document.getElementById('classNumber').value = savedNum; if(savedName) document.getElementById('studentName').value = savedName;
    setupCanvasEvents();
};


```
