// 調頻頁面 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 獲取DOM元素
    const startButton = document.querySelector('.start-button');
    const stopButton = document.querySelector('.stop-button');
    const timerDisplay = document.querySelector('.timer-display');
    const progressBar = document.querySelector('.progress-bar');
    const progressValue = document.querySelector('.progress-value');
    const breathingInstruction = document.querySelector('.breathing-instruction');
    const breathingCircle = document.querySelector('.breathing-circle');
    
    // 設置變數
    let timerInterval;
    let totalTime = 15 * 60; // 15分鐘，單位為秒
    let remainingTime = totalTime;
    let isRunning = false;
    let breathingPhase = 'inhale'; // 吸氣或呼氣
    let breathingInterval;
    
    // 初始化頁面
    updateTimerDisplay(remainingTime);
    
    // 開始按鈕點擊事件
    if (startButton) {
        startButton.addEventListener('click', startRitual);
    }
    
    // 停止按鈕點擊事件
    if (stopButton) {
        stopButton.addEventListener('click', stopRitual);
    }
    
    // 開始調頻
    function startRitual() {
        if (isRunning) return;
        
        isRunning = true;
        
        // 啟動計時器
        timerInterval = setInterval(function() {
            remainingTime--;
            
            // 更新顯示
            updateTimerDisplay(remainingTime);
            
            // 更新進度條
            const progress = Math.floor(((totalTime - remainingTime) / totalTime) * 100);
            progressBar.style.width = progress + '%';
            progressValue.textContent = progress + '%';
            
            // 時間到
            if (remainingTime <= 0) {
                completeRitual();
            }
        }, 1000);
        
        // 啟動呼吸動畫控制
        startBreathingAnimation();
    }
    
    // 停止調頻
    function stopRitual() {
        if (!isRunning) return;
        
        // 確認是否停止
        if (confirm('確定要停止調頻嗎？進度將不會被保存。')) {
            clearInterval(timerInterval);
            clearInterval(breathingInterval);
            isRunning = false;
            
            // 重置狀態
            remainingTime = totalTime;
            updateTimerDisplay(remainingTime);
            progressBar.style.width = '0%';
            progressValue.textContent = '0%';
            breathingInstruction.textContent = '吸氣';
            
            // 重置呼吸動畫
            if (breathingCircle) {
                breathingCircle.style.animation = '';
                setTimeout(() => {
                    breathingCircle.style.animation = 'breathe 8s infinite';
                }, 10);
            }
        }
    }
    
    // 完成調頻
    function completeRitual() {
        clearInterval(timerInterval);
        clearInterval(breathingInterval);
        isRunning = false;
        
        // 轉到反饋頁面
        window.location.href = 'feedback.html';
    }
    
    // 更新時間顯示
    function updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        timerDisplay.textContent = `${padZero(minutes)}:${padZero(remainingSeconds)}`;
    }
    
    // 補零
    function padZero(number) {
        return number < 10 ? '0' + number : number;
    }
    
    // 控制呼吸動畫
    function startBreathingAnimation() {
        // 初始設置為吸氣
        breathingPhase = 'inhale';
        breathingInstruction.textContent = '吸氣';
        
        // 定時更改呼吸階段和指示
        breathingInterval = setInterval(function() {
            if (breathingPhase === 'inhale') {
                breathingPhase = 'exhale';
                breathingInstruction.textContent = '呼氣';
            } else {
                breathingPhase = 'inhale';
                breathingInstruction.textContent = '吸氣';
            }
        }, 4000); // 4秒切換一次，與CSS動畫保持一致
    }
    
    // 處理頁面關閉或重新整理
    window.addEventListener('beforeunload', function(e) {
        if (isRunning) {
            // 顯示確認訊息
            e.preventDefault();
            e.returnValue = '調頻還在進行中，確定要離開嗎？';
            return e.returnValue;
        }
    });
}); 