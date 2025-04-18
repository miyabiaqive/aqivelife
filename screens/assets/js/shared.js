// 更新狀態欄時間
function updateStatusBarTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeElement = document.querySelector('.status-bar-time');
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}`;
    }
}

// 初始化頁面
function initPage() {
    // 更新狀態欄時間
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 60000);

    // 設置活動選項卡
    const currentPath = window.location.pathname;
    const filename = currentPath.split('/').pop();
    
    const tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href.includes(filename)) {
            item.classList.add('active');
        }
    });
}

// 初始化圖表 (用於數據視覺化頁面)
function initCharts() {
    if (typeof Chart === 'undefined') return;
    
    // 使用情況圖表
    const usageCtx = document.getElementById('usageChart');
    if (usageCtx) {
        new Chart(usageCtx, {
            type: 'bar',
            data: {
                labels: ['一', '二', '三', '四', '五', '六', '日'],
                datasets: [{
                    label: '使用次數',
                    data: [2, 1, 3, 2, 4, 3, 2],
                    backgroundColor: '#007AFF'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5
                    }
                }
            }
        });
    }
    
    // 情緒變化圖表
    const moodCtx = document.getElementById('moodChart');
    if (moodCtx) {
        new Chart(moodCtx, {
            type: 'line',
            data: {
                labels: ['一', '二', '三', '四', '五', '六', '日'],
                datasets: [
                    {
                        label: '焦慮指數',
                        data: [7, 6, 5, 4, 3, 4, 3],
                        borderColor: '#FF3B30',
                        backgroundColor: 'rgba(255, 59, 48, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: '專注指數',
                        data: [4, 5, 6, 7, 8, 7, 8],
                        borderColor: '#5856D6',
                        backgroundColor: 'rgba(88, 86, 214, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: '睡眠品質',
                        data: [5, 6, 7, 7, 8, 8, 7],
                        borderColor: '#34C759',
                        backgroundColor: 'rgba(52, 199, 89, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10
                    }
                }
            }
        });
    }
}

// 加載完頁面時執行
document.addEventListener('DOMContentLoaded', () => {
    initPage();
    initCharts();
});

// 儀式相關功能 (用於儀式模式頁面)
let ritualTimer;
let ritualSeconds = 0;

function startRitual() {
    const timerElement = document.getElementById('ritualTimer');
    const startButton = document.getElementById('startRitual');
    const stopButton = document.getElementById('stopRitual');
    
    if (!timerElement || !startButton || !stopButton) return;
    
    startButton.style.display = 'none';
    stopButton.style.display = 'block';
    
    ritualTimer = setInterval(() => {
        ritualSeconds++;
        const minutes = Math.floor(ritualSeconds / 60);
        const seconds = ritualSeconds % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopRitual() {
    if (ritualTimer) {
        clearInterval(ritualTimer);
        window.location.href = 'feedback.html';
    }
}

// 表情評分 (用於儀式結束評分頁面)
function selectMood(mood) {
    const moods = document.querySelectorAll('.mood-option');
    moods.forEach(item => {
        item.classList.remove('selected');
    });
    
    const selectedMood = document.querySelector(`.mood-${mood}`);
    if (selectedMood) {
        selectedMood.classList.add('selected');
    }
}

// 進度條更新 (用於引導頁面)
function updateProgress(step, total) {
    const progressBar = document.querySelector('.progress-bar-inner');
    if (progressBar) {
        const percentage = (step / total) * 100;
        progressBar.style.width = `${percentage}%`;
    }
} 