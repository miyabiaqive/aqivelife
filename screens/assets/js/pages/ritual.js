// 調頻頁面 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 初始化變數
    const timerDisplay = document.querySelector('.timer-display');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const breathingText = document.querySelector('.breathing-text');
    const circleLarge = document.querySelector('.breathing-circle-large');
    const circleMedium = document.querySelector('.breathing-circle-medium');
    const circleSmall = document.querySelector('.breathing-circle-small');
    
    let timerInterval;
    let isActive = false;
    let remainingSeconds = 15 * 60; // 15分鐘
    let breathingState = 'ready'; // ready, inhale, exhale
    
    // 更新計時器顯示
    function updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    // 開始計時器
    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        
        timerInterval = setInterval(() => {
            remainingSeconds--;
            
            if (remainingSeconds <= 0) {
                clearInterval(timerInterval);
                completeSession();
                return;
            }
            
            updateTimerDisplay(remainingSeconds);
        }, 1000);
    }
    
    // 停止計時器
    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // 開始呼吸練習
    function startBreathing() {
        isActive = true;
        startBtn.style.display = 'none';
        stopBtn.style.display = 'flex';
        
        // 啟動呼吸循環
        breathingCycle();
        
        // 開始計時
        startTimer();
    }
    
    // 呼吸循環
    function breathingCycle() {
        if (!isActive) return;
        
        // 吸氣階段
        breathingState = 'inhale';
        breathingText.textContent = '吸氣';
        
        setTimeout(() => {
            if (!isActive) return;
            
            // 呼氣階段
            breathingState = 'exhale';
            breathingText.textContent = '呼氣';
            
            setTimeout(() => {
                if (isActive) breathingCycle();
            }, 5000); // 呼氣5秒
        }, 5000); // 吸氣5秒
    }
    
    // 停止呼吸練習
    function stopBreathing() {
        isActive = false;
        startBtn.style.display = 'flex';
        stopBtn.style.display = 'none';
        
        // 停止計時
        stopTimer();
        
        // 重置文字
        breathingText.textContent = '吸氣';
        breathingState = 'ready';
        
        // 重置計時器
        remainingSeconds = 15 * 60;
        updateTimerDisplay(remainingSeconds);
    }
    
    // 完成呼吸練習
    function completeSession() {
        stopBreathing();
        alert('恭喜您完成了調頻！');
    }
    
    // 事件綁定
    startBtn.addEventListener('click', startBreathing);
    stopBtn.addEventListener('click', stopBreathing);
    
    // 初始化界面
    stopBtn.style.display = 'none';
    updateTimerDisplay(remainingSeconds);
}); 