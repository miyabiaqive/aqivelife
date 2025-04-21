// 調頻頁面 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log("調頻頁面已載入");
    initRitualPage();
});

// 全局變量
let breathState = 'exhale';
let breathInterval;
let ritualTimer;
let ritualDuration = 300; // 默認5分鐘（300秒）
let currentTime = ritualDuration;
let isRitualActive = false;
let selectedRitualType = 'relax';
let breathingSpeed = 4000; // 呼吸速度（毫秒）

/**
 * 初始化調頻頁面
 */
function initRitualPage() {
    console.log("初始化調頻頁面");
    
    // 確保元素存在
    if (!document.getElementById('ritual-selection-container')) {
        console.error("找不到選擇容器元素");
        return;
    }
    
    // 初始化選擇區和活動區
    document.getElementById('ritual-selection-container').style.display = 'block';
    document.getElementById('ritual-active-container').style.display = 'none';
    
    // 初始化調頻類型選擇
    initRitualTypeSelection();
    
    // 設置按鈕事件
    document.getElementById('start-ritual-btn').addEventListener('click', startRitual);
    document.getElementById('end-ritual-btn').addEventListener('click', endRitual);
    document.getElementById('pause-ritual-btn').addEventListener('click', togglePauseRitual);
    
    // 初始化計時器顯示
    updateTimerDisplay();
    
    console.log("調頻頁面初始化完成");
}

/**
 * 初始化調頻類型選擇
 */
function initRitualTypeSelection() {
    console.log("初始化調頻類型選擇");
    const ritualOptions = document.querySelectorAll('.ritual-option');
    
    if (ritualOptions.length === 0) {
        console.error("找不到調頻選項元素");
        return;
    }
    
    ritualOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除所有選項的選中狀態
            ritualOptions.forEach(opt => opt.classList.remove('selected'));
            
            // 添加當前選項的選中狀態
            this.classList.add('selected');
            
            // 更新選中的調頻類型
            selectedRitualType = this.getAttribute('data-type');
            console.log("選擇調頻類型:", selectedRitualType);
            
            // 根據選中的類型設置持續時間和呼吸速度
            switch(selectedRitualType) {
                case 'relax':
                    ritualDuration = 300; // 5分鐘
                    breathingSpeed = 4000; // 4秒一次呼吸
                    break;
                case 'focus':
                    ritualDuration = 600; // 10分鐘
                    breathingSpeed = 3000; // 3秒一次呼吸
                    break;
                case 'sleep':
                    ritualDuration = 900; // 15分鐘
                    breathingSpeed = 5000; // 5秒一次呼吸
                    break;
                default:
                    ritualDuration = 300;
                    breathingSpeed = 4000;
            }
            
            // 重置計時器並更新顯示
            currentTime = ritualDuration;
            updateTimerDisplay();
        });
    });
    
    // 默認選中第一個選項
    if (ritualOptions.length > 0) {
        ritualOptions[0].click();
    }
}

/**
 * 開始調頻
 */
function startRitual() {
    console.log("開始調頻:", selectedRitualType);
    
    // 顯示活動區域，隱藏選擇區域
    document.getElementById('ritual-selection-container').style.display = 'none';
    document.getElementById('ritual-active-container').style.display = 'flex';
    
    isRitualActive = true;
    
    // 開始呼吸動畫
    startBreathingAnimation();
    
    // 開始計時器
    startTimer();
    
    // 更新暫停/繼續按鈕文本
    document.getElementById('pause-ritual-btn').innerHTML = '<i class="fas fa-pause"></i> 暫停';
    document.getElementById('pause-ritual-btn').classList.remove('secondary-button');
    document.getElementById('pause-ritual-btn').classList.add('primary-button');
    
    // 根據選中的類型設置背景和圓圈顏色
    applyRitualTheme();
}

/**
 * 根據選中的調頻類型應用主題
 */
function applyRitualTheme() {
    console.log("應用調頻主題:", selectedRitualType);
    const breathingCircle = document.querySelector('.breathing-circle');
    const body = document.body;
    
    // 移除先前的主題類
    body.classList.remove('theme-relax', 'theme-focus', 'theme-sleep');
    breathingCircle.classList.remove('theme-relax', 'theme-focus', 'theme-sleep');
    
    // 添加新的主題類
    body.classList.add(`theme-${selectedRitualType}`);
    breathingCircle.classList.add(`theme-${selectedRitualType}`);
    
    // 更新調頻標題和說明
    let title, description;
    switch(selectedRitualType) {
        case 'relax':
            title = '放鬆調頻';
            description = '慢節奏的深呼吸，幫助您放鬆身心';
            break;
        case 'focus':
            title = '專注調頻';
            description = '有節奏的呼吸，幫助您集中注意力';
            break;
        case 'sleep':
            title = '睡眠調頻';
            description = '漸進式放慢的呼吸，幫助您入睡';
            break;
    }
    
    document.getElementById('active-ritual-title').textContent = title;
    document.getElementById('active-ritual-description').textContent = description;
}

/**
 * 開始呼吸動畫
 */
function startBreathingAnimation() {
    console.log("開始呼吸動畫");
    const breathingCircle = document.querySelector('.breathing-circle');
    const breathingStatus = document.querySelector('.breathing-status');
    
    if (!breathingCircle || !breathingStatus) {
        console.error("找不到呼吸圓圈或狀態元素");
        return;
    }
    
    // 重置狀態
    breathState = 'exhale';
    breathingCircle.style.transform = 'scale(0.8)';
    breathingCircle.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    breathingCircle.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.2)';
    
    // 清除可能存在的先前間隔
    if (breathInterval) {
        clearInterval(breathInterval);
    }
    
    // 立即觸發第一次呼吸
    breathState = 'inhale';
    breathingStatus.textContent = '吸氣';
    breathingCircle.style.animation = `expand ${breathingSpeed/1000}s ease-in-out forwards`;
    
    // 開始新的呼吸循環
    breathInterval = setInterval(() => {
        if (breathState === 'exhale') {
            // 吸氣
            breathState = 'inhale';
            breathingStatus.textContent = '吸氣';
            
            // 使用CSS動畫
            breathingCircle.style.animation = 'none';
            void breathingCircle.offsetWidth; // 強制重繪
            breathingCircle.style.animation = `expand ${breathingSpeed/1000}s ease-in-out forwards`;
        } else {
            // 呼氣
            breathState = 'exhale';
            breathingStatus.textContent = '吐氣';
            
            // 使用CSS動畫
            breathingCircle.style.animation = 'none';
            void breathingCircle.offsetWidth; // 強制重繪
            breathingCircle.style.animation = `contract ${breathingSpeed/1000}s ease-in-out forwards`;
        }
    }, breathingSpeed);
    
    console.log("呼吸動畫已啟動");
}

/**
 * 開始計時器
 */
function startTimer() {
    console.log("開始計時器");
    // 清除可能存在的先前計時器
    if (ritualTimer) {
        clearInterval(ritualTimer);
    }
    
    // 開始新的計時器
    ritualTimer = setInterval(() => {
        currentTime--;
        updateTimerDisplay();
        
        // 如果時間到，結束調頻
        if (currentTime <= 0) {
            endRitual();
            showCompletionMessage();
        }
    }, 1000);
}

/**
 * 更新計時器顯示
 */
function updateTimerDisplay() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    
    // 格式化時間為兩位數
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
        timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
    }
}

/**
 * 暫停/繼續調頻
 */
function togglePauseRitual() {
    console.log("切換暫停/繼續調頻");
    const pauseButton = document.getElementById('pause-ritual-btn');
    
    if (isRitualActive) {
        // 暫停調頻
        isRitualActive = false;
        
        // 暫停呼吸動畫
        clearInterval(breathInterval);
        
        // 暫停計時器
        clearInterval(ritualTimer);
        
        // 更新按鈕文本
        pauseButton.innerHTML = '<i class="fas fa-play"></i> 繼續';
        pauseButton.classList.remove('primary-button');
        pauseButton.classList.add('secondary-button');
        
        console.log("調頻已暫停");
    } else {
        // 繼續調頻
        isRitualActive = true;
        
        // 繼續呼吸動畫
        startBreathingAnimation();
        
        // 繼續計時器
        startTimer();
        
        // 更新按鈕文本
        pauseButton.innerHTML = '<i class="fas fa-pause"></i> 暫停';
        pauseButton.classList.remove('secondary-button');
        pauseButton.classList.add('primary-button');
        
        console.log("調頻已繼續");
    }
}

/**
 * 結束調頻
 */
function endRitual() {
    console.log("結束調頻");
    // 停止呼吸動畫
    clearInterval(breathInterval);
    
    // 停止計時器
    clearInterval(ritualTimer);
    
    // 重置時間
    currentTime = ritualDuration;
    
    // 更新顯示
    updateTimerDisplay();
    
    // 顯示選擇區域，隱藏活動區域
    document.getElementById('ritual-selection-container').style.display = 'block';
    document.getElementById('ritual-active-container').style.display = 'none';
    
    // 重置狀態
    isRitualActive = false;
    
    // 重置呼吸圓圈
    const breathingCircle = document.querySelector('.breathing-circle');
    const breathingStatus = document.querySelector('.breathing-status');
    
    if (breathingCircle && breathingStatus) {
        breathingCircle.style.animation = 'none';
        breathingCircle.style.transform = 'scale(1)';
        breathingStatus.textContent = '靜止';
    }
}

/**
 * 顯示完成消息
 */
function showCompletionMessage() {
    console.log("顯示完成消息");
    // 這裡可以添加調頻完成後的動作，例如顯示一個彈出窗口
    alert('恭喜！您已完成此次調頻練習。');
}

// 窗口大小改變時調整呼吸圓圈
window.addEventListener('resize', function() {
    if (isRitualActive) {
        adjustBreathingForDevice();
    }
});