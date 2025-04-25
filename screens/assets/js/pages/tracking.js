// 在頁面載入時設置當前日期
document.addEventListener('DOMContentLoaded', function() {
    // 設置今天的日期
    setCurrentDate();
    
    // 初始化滑塊事件
    initSliders();
    
    // 初始化行事曆
    updateCalendar();
});

// 設置今天的日期顯示
function setCurrentDate() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const dateString = today.toLocaleDateString('zh-TW', options);
    document.getElementById('current-date').textContent = dateString;
}

// 初始化所有滑桿的事件
function initSliders() {
    const sliders = document.querySelectorAll('.tracking-slider');
    
    sliders.forEach(slider => {
        const valueDisplay = document.getElementById(`${slider.id.split('-')[0]}-value`);
        
        // 設置初始值
        if (valueDisplay) {
            valueDisplay.textContent = slider.value;
        }
        
        // 監聽值變化
        slider.addEventListener('input', function() {
            if (valueDisplay) {
                valueDisplay.textContent = this.value;
            }
        });
    });
}

// 更新日曆
function updateCalendar() {
    const currentMonthElement = document.getElementById('current-month');
    const today = new Date();
    
    // 設置當前月份顯示
    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    currentMonthElement.textContent = `${today.getFullYear()}年${monthNames[today.getMonth()]}`;
    
    // 日曆導航按鈕
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    prevMonthBtn.addEventListener('click', function() {
        navigateMonth(-1);
    });
    
    nextMonthBtn.addEventListener('click', function() {
        navigateMonth(1);
    });
    
    // 設置當前日期為選中狀態
    highlightCurrentDay();
    
    // 標記有記錄的日期
    markDaysWithData();
}

// 日曆月份導航
function navigateMonth(direction) {
    const currentMonthElement = document.getElementById('current-month');
    const currentText = currentMonthElement.textContent;
    
    // 解析當前顯示的年月
    const yearMonthMatch = currentText.match(/(\d+)年(\d+)月/);
    if (yearMonthMatch) {
        let year = parseInt(yearMonthMatch[1]);
        let month = parseInt(yearMonthMatch[2]) - 1; // 轉為0-11的月份
        
        // 計算新的月份
        month += direction;
        
        // 處理年份變更
        if (month < 0) {
            month = 11;
            year--;
        } else if (month > 11) {
            month = 0;
            year++;
        }
        
        // 更新顯示
        const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        currentMonthElement.textContent = `${year}年${monthNames[month]}`;
        
        // 重繪日曆
        renderCalendarDays(year, month);
    }
}

// 渲染日曆天數
function renderCalendarDays(year, month) {
    const calendarDays = document.querySelector('.calendar-days');
    if (!calendarDays) return;
    
    // 清空現有日期
    calendarDays.innerHTML = '';
    
    // 獲取當月第一天是星期幾
    const firstDay = new Date(year, month, 1).getDay();
    // 調整為週一為起始日 (0-星期一, 6-星期日)
    const firstDayAdjusted = firstDay === 0 ? 6 : firstDay - 1;
    
    // 獲取當月天數
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // 獲取上個月的末幾天
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    // 填充上個月的末幾天
    for (let i = firstDayAdjusted - 1; i >= 0; i--) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day other-month';
        dayElement.textContent = daysInPrevMonth - i;
        calendarDays.appendChild(dayElement);
    }
    
    // 填充當月天數
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    
    // 獲取有記錄的日期
    const daysWithData = getDaysWithData(year, month);
    
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = i;
        
        // 如果是今天，標記為活動
        if (isCurrentMonth && i === today.getDate()) {
            dayElement.classList.add('active');
        }
        
        // 如果有記錄，添加has-data類
        if (daysWithData.includes(i)) {
            dayElement.classList.add('has-data');
        }
        
        // 為日期添加點擊事件
        dayElement.addEventListener('click', function() {
            // 移除所有日期的選中狀態
            document.querySelectorAll('.calendar-day').forEach(day => {
                day.classList.remove('active');
            });
            
            // 為點擊的日期添加選中狀態
            this.classList.add('active');
            
            // 這裡可以添加載入選中日期數據的邏輯
            loadDayData(year, month, i);
        });
        
        calendarDays.appendChild(dayElement);
    }
    
    // 計算需要顯示的下個月天數
    const totalDaysDisplayed = firstDayAdjusted + daysInMonth;
    const remainingCells = 42 - totalDaysDisplayed; // 6行7列總共42格
    
    // 最多顯示6週，如果不到5週則只顯示到5週
    const rowsToShow = totalDaysDisplayed > 35 ? 6 : 5;
    const cellsToShow = rowsToShow * 7;
    const remainingToShow = cellsToShow - totalDaysDisplayed;
    
    // 填充下個月的前幾天
    for (let i = 1; i <= remainingToShow; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day other-month';
        dayElement.textContent = i;
        calendarDays.appendChild(dayElement);
    }
}

// 獲取有記錄的日期
function getDaysWithData(year, month) {
    // 從本地存儲獲取記錄數據
    const trackingHistory = JSON.parse(localStorage.getItem('trackingHistory')) || [];
    
    // 過濾出指定年月的記錄
    const filteredData = trackingHistory.filter(item => {
        const recordDate = new Date(item.date);
        return recordDate.getFullYear() === year && recordDate.getMonth() === month;
    });
    
    // 提取日期
    return filteredData.map(item => {
        const recordDate = new Date(item.date);
        return recordDate.getDate();
    });
}

// 高亮當前日期
function highlightCurrentDay() {
    const today = new Date();
    const currentDay = today.getDate();
    
    // 找到對應今天的日期元素
    const dayElements = document.querySelectorAll('.calendar-day:not(.other-month)');
    dayElements.forEach(dayElement => {
        if (parseInt(dayElement.textContent) === currentDay) {
            dayElement.classList.add('active');
        }
    });
}

// 標記有記錄的日期
function markDaysWithData() {
    const currentMonthElement = document.getElementById('current-month');
    const currentText = currentMonthElement.textContent;
    
    // 解析當前顯示的年月
    const yearMonthMatch = currentText.match(/(\d+)年(\d+)月/);
    if (yearMonthMatch) {
        const year = parseInt(yearMonthMatch[1]);
        const month = parseInt(yearMonthMatch[2]) - 1; // 轉為0-11的月份
        
        // 獲取有記錄的日期
        const daysWithData = getDaysWithData(year, month);
        
        // 標記有記錄的日期
        const dayElements = document.querySelectorAll('.calendar-day:not(.other-month)');
        dayElements.forEach(dayElement => {
            const day = parseInt(dayElement.textContent);
            if (daysWithData.includes(day)) {
                dayElement.classList.add('has-data');
            }
        });
    }
}

// 載入特定日期的數據
function loadDayData(year, month, day) {
    console.log(`載入 ${year}年${month+1}月${day}日 的數據`);
    
    // 從本地存儲獲取記錄數據
    const trackingHistory = JSON.parse(localStorage.getItem('trackingHistory')) || [];
    
    // 查找指定日期的記錄
    const dateString = `${year}-${month+1}-${day}`;
    const dayData = trackingHistory.find(item => item.date === dateString);
    
    // 如果找到數據，更新UI
    if (dayData) {
        const anxietySlider = document.getElementById('anxiety-slider');
        const focusSlider = document.getElementById('focus-slider');
        const sleepSlider = document.getElementById('sleep-slider');
        const notesInput = document.querySelector('.notes-input');
        
        if (anxietySlider) {
            anxietySlider.value = dayData.anxiety;
            document.getElementById('anxiety-value').textContent = dayData.anxiety;
        }
        
        if (focusSlider) {
            focusSlider.value = dayData.focus;
            document.getElementById('focus-value').textContent = dayData.focus;
        }
        
        if (sleepSlider) {
            sleepSlider.value = dayData.sleep;
            document.getElementById('sleep-value').textContent = dayData.sleep;
        }
        
        if (notesInput && dayData.notes) {
            notesInput.value = dayData.notes;
        }
    } else {
        // 如果沒有找到數據，重置表單
        resetForm();
    }
}

// 重置表單
function resetForm() {
    const anxietySlider = document.getElementById('anxiety-slider');
    const focusSlider = document.getElementById('focus-slider');
    const sleepSlider = document.getElementById('sleep-slider');
    const notesInput = document.querySelector('.notes-input');
    
    if (anxietySlider) {
        anxietySlider.value = 3;
        document.getElementById('anxiety-value').textContent = 3;
    }
    
    if (focusSlider) {
        focusSlider.value = 7;
        document.getElementById('focus-value').textContent = 7;
    }
    
    if (sleepSlider) {
        sleepSlider.value = 5;
        document.getElementById('sleep-value').textContent = 5;
    }
    
    if (notesInput) {
        notesInput.value = '';
    }
}

// 保存按鈕點擊事件
document.getElementById('save-button').addEventListener('click', function() {
    // 獲取滑桿值
    const anxietyValue = document.getElementById('anxiety-slider').value;
    const focusValue = document.getElementById('focus-slider').value;
    const sleepValue = document.getElementById('sleep-slider').value;
    const notesValue = document.getElementById('notes-input').value;
    
    // 在這裡添加保存數據的邏輯
    // saveData({ anxiety: anxietyValue, focus: focusValue, sleep: sleepValue, notes: notesValue });
    
    // 顯示保存成功的提示
    alert('狀態記錄已保存！');
});

// 回到首頁按鈕事件
document.getElementById('back-home-button').addEventListener('click', function() {
    window.location.href = 'home.html';
}); 