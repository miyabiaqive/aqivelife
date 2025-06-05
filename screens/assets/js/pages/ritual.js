// 調頻頁面 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 初始化變數
    const timerDisplay = document.querySelector('.timer-display');
    const controlBtn = document.getElementById('control-btn');
    const circleLarge = document.querySelector('.breathing-circle-large');
    const circleMedium = document.querySelector('.breathing-circle-medium');
    const circleSmall = document.querySelector('.breathing-circle-small');
    const breathingContainer = document.getElementById('breathing-circle-container');
    const breathingProgress = document.querySelector('.breathing-progress');
    const breathingAudio = document.getElementById('breathing-audio');
    
    let timerInterval;
    let isActive = false;
    let remainingSeconds = 6 * 60; // 6分鐘
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
        
        // 播放音頻
        try {
            playAudio();
        } catch (e) {
            console.error('無法播放音頻:', e);
        }
        
        // 添加觸覺反饋（如果瀏覽器支援）
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
    
    // 播放音頻指引
    function playAudio() {
        breathingAudio.currentTime = 0;
        
        // 嘗試播放，考慮到瀏覽器的自動播放政策
        const playPromise = breathingAudio.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('自動播放被阻止:', error);
                // 用戶需要與頁面互動來允許播放
                // 這裡已經通過按鈕點擊觸發，應該可以播放
            });
        }
    }
    
    // 暫停音頻
    function pauseAudio() {
        breathingAudio.pause();
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
        breathingContainer.classList.add('inhale');
        breathingContainer.classList.remove('exhale');
        
        // 呼吸動畫
        animateBreathing('inhale');
        
        // 5秒後切換到呼氣
        setTimeout(() => {
            if (!isActive) return;
            
            // 呼氣階段
            breathingState = 'exhale';
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
        
        // 暫停音頻
        pauseAudio();
        
        // 重置狀態
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
        remainingSeconds = 6 * 60;
        updateTimerDisplay(remainingSeconds);
        
        // 清除呼吸循環計時器
        if (breathingCycleInterval) {
            clearInterval(breathingCycleInterval);
            breathingCycleInterval = null;
        }
    }
    
    // 完成呼吸練習
    function completeSession() {
        // 停止所有活動
        isActive = false;
        pauseAudio();
        
        // 清除所有計時器
        if (breathingCycleInterval) {
            clearInterval(breathingCycleInterval);
        }
        
        // 收集練習數據
        const sessionData = {
            mode: getModeFromTitle(),
            duration: "6分鐘",
            completedAt: getCurrentDateTime()
        };
        
        // 保存到會話存儲中
        try {
            localStorage.setItem('lastSessionData', JSON.stringify(sessionData));
        } catch (e) {
            console.error('無法保存會話數據', e);
        }
        
        // 顯示完成動畫
        showCompletionAnimation().then(() => {
            // 完成動畫後導向到 feedback 頁面
            window.location.href = 'feedback.html';
        });
    }
    
    // 從標題獲取練習模式
    function getModeFromTitle() {
        const titleElement = document.querySelector('.ritual-header h1');
        return titleElement ? titleElement.textContent : '氣定神閒模式';
    }
    
    // 獲取當前日期時間格式化字符串
    function getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        return `${year}/${month}/${day} ${hours}:${minutes}`;
    }
    
    // 顯示完成動畫
    function showCompletionAnimation() {
        return new Promise((resolve) => {
            // 創建完成提示元素
            const completionOverlay = document.createElement('div');
            completionOverlay.className = 'completion-overlay';
            completionOverlay.innerHTML = `
                <div class="completion-container">
                    <div class="completion-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="completion-message">調頻完成</div>
                    <div class="completion-submessage">即將進入狀態紀錄</div>
                </div>
            `;
            
            // 添加樣式
            const style = document.createElement('style');
            style.textContent = `
                .completion-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.5s ease;
                }
                .completion-container {
                    text-align: center;
                    color: white;
                    padding: 30px;
                }
                .completion-icon {
                    font-size: 80px;
                    color: #FF9D4D;
                    margin-bottom: 20px;
                    transform: scale(0);
                    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .completion-message {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 10px;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.5s ease 0.3s;
                }
                .completion-submessage {
                    font-size: 16px;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.5s ease 0.5s;
                }
            `;
            
            // 添加到 DOM
            document.body.appendChild(style);
            document.body.appendChild(completionOverlay);
            
            // 觸發動畫
            setTimeout(() => {
                completionOverlay.style.opacity = '1';
                
                setTimeout(() => {
                    const icon = completionOverlay.querySelector('.completion-icon');
                    const message = completionOverlay.querySelector('.completion-message');
                    const submessage = completionOverlay.querySelector('.completion-submessage');
                    
                    icon.style.transform = 'scale(1)';
                    message.style.opacity = '1';
                    message.style.transform = 'translateY(0)';
                    submessage.style.opacity = '1';
                    submessage.style.transform = 'translateY(0)';
                    
                    // 添加觸覺反饋
                    if (navigator.vibrate) {
                        navigator.vibrate([50, 100, 50]);
                    }
                    
                    // 2.5秒後完成動畫
                    setTimeout(() => {
                        completionOverlay.style.opacity = '0';
                        setTimeout(() => {
                            completionOverlay.remove();
                            style.remove();
                            resolve();
                        }, 500);
                    }, 2500);
                }, 100);
            }, 100);
        });
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
    
    // 檢查音頻檔案是否可用，顯示錯誤消息如果不可用
    breathingAudio.addEventListener('error', function() {
        console.error('音頻檔案加載失敗。請確保以下路徑存在：assets/audio/breathing-guide.m4a 或 assets/audio/breathing-guide.mp3');
        // 提示用戶需要上傳音頻文件
        alert('請上傳呼吸引導音頻到 assets/audio/ 目錄，支援 m4a 或 mp3 格式');
    });
}); 