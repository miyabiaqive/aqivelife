// 調頻頁面 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 初始化變數
    const timerDisplay = document.querySelector('.timer-display');
    const controlBtn = document.getElementById('control-btn');
    const breathingText = document.querySelector('.breathing-text');
    const breathingPhase = document.querySelector('.breathing-phase');
    const circleLarge = document.querySelector('.breathing-circle-large');
    const circleMedium = document.querySelector('.breathing-circle-medium');
    const circleSmall = document.querySelector('.breathing-circle-small');
    const breathingContainer = document.getElementById('breathing-circle-container');
    const breathingProgress = document.querySelector('.breathing-progress');
    
    let timerInterval;
    let isActive = false;
    let remainingSeconds = 15 * 60; // 15分鐘
    let breathingState = 'ready'; // ready, inhale, exhale
    let breathingCycleInterval;
    
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
        controlBtn.innerHTML = '<i class="fas fa-pause"></i>';
        breathingContainer.classList.add('breathing-active');
        
        // 啟動呼吸循環
        breathingCycle();
        
        // 開始計時
        startTimer();
        
        // 添加觸覺反饋（如果瀏覽器支援）
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
    
    // 呼吸循環
    function breathingCycle() {
        if (!isActive) return;
        
        // 清除可能存在的計時器
        if (breathingCycleInterval) {
            clearInterval(breathingCycleInterval);
        }
        
        // 吸氣階段
        breathingState = 'inhale';
        breathingText.textContent = '吸氣';
        breathingPhase.textContent = '吸氣階段';
        breathingContainer.classList.add('inhale');
        breathingContainer.classList.remove('exhale');
        
        // 呼吸動畫
        animateBreathing('inhale');
        
        // 5秒後切換到呼氣
        setTimeout(() => {
            if (!isActive) return;
            
            // 呼氣階段
            breathingState = 'exhale';
            breathingText.textContent = '呼氣';
            breathingPhase.textContent = '呼氣階段';
            breathingContainer.classList.remove('inhale');
            breathingContainer.classList.add('exhale');
            
            // 呼吸動畫
            animateBreathing('exhale');
            
            // 添加觸覺反饋表示階段變化
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
            
            // 5秒後重新開始循環
            setTimeout(() => {
                if (isActive) breathingCycle();
            }, 5000); // 呼氣5秒
        }, 5000); // 吸氣5秒
    }
    
    // 呼吸動畫效果
    function animateBreathing(phase) {
        // 重置轉換
        circleLarge.style.transition = 'all 5s ease-in-out';
        circleMedium.style.transition = 'all 5s ease-in-out';
        circleSmall.style.transition = 'all 5s ease-in-out';
        
        if (phase === 'inhale') {
            // 吸氣時圓圈擴大
            circleLarge.style.transform = 'scale(1.15)';
            circleMedium.style.transform = 'scale(1.2)';
            circleSmall.style.transform = 'scale(1.15)';
            circleLarge.style.opacity = '0.7';
        } else {
            // 呼氣時圓圈縮小
            circleLarge.style.transform = 'scale(0.9)';
            circleMedium.style.transform = 'scale(0.92)';
            circleSmall.style.transform = 'scale(0.95)';
            circleLarge.style.opacity = '0.5';
        }
    }
    
    // 停止呼吸練習
    function stopBreathing() {
        isActive = false;
        controlBtn.innerHTML = '<i class="fas fa-play"></i>';
        breathingContainer.classList.remove('breathing-active', 'inhale', 'exhale');
        
        // 停止計時
        stopTimer();
        
        // 重置文字和動畫
        breathingText.textContent = '吸氣';
        breathingPhase.textContent = '準備開始';
        breathingState = 'ready';
        
        // 重置動畫效果
        circleLarge.style.transition = 'all 0.5s ease-in-out';
        circleMedium.style.transition = 'all 0.5s ease-in-out';
        circleSmall.style.transition = 'all 0.5s ease-in-out';
        circleLarge.style.transform = 'scale(1)';
        circleMedium.style.transform = 'scale(1)';
        circleSmall.style.transform = 'scale(1)';
        circleLarge.style.opacity = '1';
        
        // 重置計時器
        remainingSeconds = 15 * 60;
        updateTimerDisplay(remainingSeconds);
        
        // 清除呼吸循環計時器
        if (breathingCycleInterval) {
            clearInterval(breathingCycleInterval);
            breathingCycleInterval = null;
        }
    }
    
    // 完成呼吸練習
    function completeSession() {
        stopBreathing();
        alert('恭喜您完成了調頻！');
    }
    
    // 控制按鈕處理
    function handleControlButtonClick() {
        if (!isActive) {
            startBreathing();
        } else {
            stopBreathing();
        }
    }
    
    // 事件綁定
    controlBtn.addEventListener('click', handleControlButtonClick);
    
    // 初始化界面
    updateTimerDisplay(remainingSeconds);
}); 