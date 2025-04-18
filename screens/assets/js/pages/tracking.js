// 在頁面載入時設置當前日期
document.addEventListener('DOMContentLoaded', function() {
    // 初始化滑塊事件
    initSliders();
    
    // 初始化行事曆
    initCalendar();
    
    // 初始化按鈕事件
    initButtons();
});

// 初始化所有滑桿的事件
function initSliders() {
    // 焦慮滑桿
    const anxietySlider = document.getElementById('anxiety-slider');
    const anxietyValue = document.getElementById('anxiety-value');
    
    if (anxietySlider && anxietyValue) {
        anxietySlider.addEventListener('input', function() {
            anxietyValue.textContent = this.value;
        });
    }
    
    // 專注力滑桿
    const focusSlider = document.getElementById('focus-slider');
    const focusValue = document.getElementById('focus-value');
    
    if (focusSlider && focusValue) {
        focusSlider.addEventListener('input', function() {
            focusValue.textContent = this.value;
        });
    }
    
    // 睡眠品質滑桿
    const sleepSlider = document.getElementById('sleep-slider');
    const sleepValue = document.getElementById('sleep-value');
    
    if (sleepSlider && sleepValue) {
        sleepSlider.addEventListener('input', function() {
            sleepValue.textContent = this.value;
        });
    }
}

// 初始化行事曆
function initCalendar() {
    // 日曆中的選擇日期
    const calendarDays = document.querySelectorAll('.calendar-day');
    
    calendarDays.forEach(day => {
        if (!day.classList.contains('calendar-day-header')) {
            day.addEventListener('click', function() {
                // 移除所有其他天的 active 類
                calendarDays.forEach(d => d.classList.remove('active'));
                
                // 為當前點擊的日期加上 active 類
                this.classList.add('active');
                
                // 這裡可以添加載入特定日期數據的邏輯
                // loadDayData(this.textContent);
            });
        }
    });
    
    // 上個月按鈕事件
    const prevMonthBtn = document.getElementById('prev-month');
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            // 這裡可以加載上個月的日曆
            navigateMonth(-1);
        });
    }
    
    // 下個月按鈕事件
    const nextMonthBtn = document.getElementById('next-month');
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            // 這裡可以加載下個月的日曆
            navigateMonth(1);
        });
    }
}

// 處理月份導航
function navigateMonth(direction) {
    const currentMonthEl = document.getElementById('current-month');
    const currentText = currentMonthEl.textContent; // 格式如 "2025年4月"
    
    // 解析當前顯示的年和月
    const matches = currentText.match(/(\d+)年(\d+)月/);
    if (!matches) return;
    
    const year = parseInt(matches[1]);
    const month = parseInt(matches[2]);
    
    // 計算新的日期
    let newDate = new Date(year, month - 1 + direction, 1);
    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth() + 1;
    
    // 更新顯示
    currentMonthEl.textContent = `${newYear}年${newMonth}月`;
    
    // 這裡可以添加更新日曆內容的邏輯
    // 實際應用中應該重新生成日曆日期
    // 但在這個示例中，我們僅更新月份顯示
}

// 初始化按鈕事件
function initButtons() {
    // 保存按鈕點擊事件
    const saveButton = document.querySelector('.save-button');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            // 獲取滑桿值
            const anxietyValue = document.getElementById('anxiety-slider').value;
            const focusValue = document.getElementById('focus-slider').value;
            const sleepValue = document.getElementById('sleep-slider').value;
            const notesValue = document.querySelector('.notes-input').value;
            
            // 收集數據
            const data = {
                date: new Date().toISOString().split('T')[0],
                anxiety: anxietyValue,
                focus: focusValue,
                sleep: sleepValue,
                notes: notesValue
            };
            
            // 在實際應用中，這裡應該發送數據到伺服器
            console.log('保存數據:', data);
            
            // 模擬保存成功
            showSaveSuccess();
        });
    }
    
    // 回到首頁按鈕事件
    const backHomeButton = document.querySelector('.back-home-button');
    if (backHomeButton) {
        backHomeButton.addEventListener('click', function() {
            window.location.href = 'home.html';
        });
    }
}

// 顯示保存成功的提示
function showSaveSuccess() {
    // 創建提示元素
    const toast = document.createElement('div');
    toast.className = 'save-toast';
    toast.innerHTML = '<i class="fas fa-check-circle"></i> 記錄已保存';
    
    // 設置樣式
    toast.style.position = 'fixed';
    toast.style.bottom = '80px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'var(--primary-color)';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '20px';
    toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    toast.style.zIndex = '1000';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '8px';
    
    // 添加到頁面
    document.body.appendChild(toast);
    
    // 設置動畫
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // 自動關閉
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 2500);
} 