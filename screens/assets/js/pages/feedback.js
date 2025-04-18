// 調頻結束反饋頁面 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 獲取DOM元素
    const moodOptions = document.querySelectorAll('.mood-option');
    const saveButton = document.querySelector('.save-button');
    const commentsInput = document.querySelector('.comments-input');
    
    // 初始化變數
    let selectedMood = null;
    
    // 心情選項點擊事件
    moodOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除其他選項的選中狀態
            moodOptions.forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // 設置當前選項為選中狀態
            this.classList.add('selected');
            
            // 保存選中的心情
            selectedMood = this.getAttribute('data-mood');
            
            // 啟用保存按鈕
            if (saveButton) {
                saveButton.classList.add('active');
            }
        });
    });
    
    // 保存按鈕點擊事件
    if (saveButton) {
        saveButton.addEventListener('click', saveFeedback);
    }
    
    // 保存反饋函數
    function saveFeedback() {
        // 檢查是否選擇了心情
        if (!selectedMood) {
            alert('請選擇您當前的心情');
            return;
        }
        
        // 獲取評論內容
        const comments = commentsInput ? commentsInput.value : '';
        
        // 獲取會話摘要信息
        const sessionType = document.querySelector('.summary-item:nth-child(1) .summary-value').textContent;
        const sessionDuration = document.querySelector('.summary-item:nth-child(2) .summary-value').textContent;
        const completionTime = document.querySelector('.summary-item:nth-child(3) .summary-value').textContent;
        
        // 創建反饋數據對象
        const feedbackData = {
            sessionType: sessionType,
            sessionDuration: sessionDuration,
            completionTime: completionTime,
            mood: selectedMood,
            comments: comments,
            timestamp: new Date().toISOString()
        };
        
        // 將反饋數據存儲到本地存儲
        saveFeedbackToLocalStorage(feedbackData);
        
        // 顯示成功消息並返回首頁
        alert('感謝您的反饋！');
        window.location.href = 'home.html';
    }
    
    // 將反饋數據保存到本地存儲
    function saveFeedbackToLocalStorage(data) {
        // 從本地存儲獲取現有反饋數據
        let feedbackHistory = localStorage.getItem('feedbackHistory');
        
        if (feedbackHistory) {
            // 如果已有數據，解析並添加新數據
            feedbackHistory = JSON.parse(feedbackHistory);
            feedbackHistory.push(data);
        } else {
            // 如果沒有數據，創建新數組
            feedbackHistory = [data];
        }
        
        // 保存更新後的數據到本地存儲
        localStorage.setItem('feedbackHistory', JSON.stringify(feedbackHistory));
        
        // 更新用戶統計數據
        updateUserStats(data);
    }
    
    // 更新用戶統計數據
    function updateUserStats(feedbackData) {
        // 從本地存儲獲取現有用戶統計數據
        let userStats = localStorage.getItem('userStats');
        
        if (userStats) {
            userStats = JSON.parse(userStats);
        } else {
            // 初始化用戶統計數據
            userStats = {
                totalSessions: 0,
                totalDuration: 0, // 單位：分鐘
                moodDistribution: {
                    'very-relaxed': 0,
                    'relaxed': 0,
                    'neutral': 0,
                    'tense': 0,
                    'very-tense': 0
                },
                lastSessionDate: null
            };
        }
        
        // 更新統計數據
        userStats.totalSessions += 1;
        
        // 解析會話時長并添加到總時長
        const durationMatch = feedbackData.sessionDuration.match(/(\d+)/);
        if (durationMatch && durationMatch[1]) {
            userStats.totalDuration += parseInt(durationMatch[1]);
        }
        
        // 更新心情分佈
        if (feedbackData.mood && userStats.moodDistribution[feedbackData.mood] !== undefined) {
            userStats.moodDistribution[feedbackData.mood] += 1;
        }
        
        // 更新最後一次會話日期
        userStats.lastSessionDate = new Date().toISOString();
        
        // 保存更新後的統計數據
        localStorage.setItem('userStats', JSON.stringify(userStats));
    }
}); 