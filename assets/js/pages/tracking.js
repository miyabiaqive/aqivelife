// 在頁面載入時設置當前日期
document.addEventListener('DOMContentLoaded', function() {
    // 設置今天的日期
    setCurrentDate();
    
    // 初始化滑塊事件
    initSliders();
    
    // 初始化行事曆
    initCalendar();
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
    // 焦慮滑桿
    const anxietySlider = document.getElementById('anxiety-slider');
    const anxietyValue = document.getElementById('anxiety-value');
    
    anxietySlider.addEventListener('input', function() {
        anxietyValue.textContent = this.value;
    });
    
    // 專注力滑桿
    const focusSlider = document.getElementById('focus-slider');
    const focusValue = document.getElementById('focus-value');
    
    focusSlider.addEventListener('input', function() {
        focusValue.textContent = this.value;
    });
    
    // 睡眠品質滑桿
    const sleepSlider = document.getElementById('sleep-slider');
    const sleepValue = document.getElementById('sleep-value');
    
    sleepSlider.addEventListener('input', function() {
        sleepValue.textContent = this.value;
    });
}

// 初始化行事曆
function initCalendar() {
    const today = new Date();
    renderCalendar(today);
    
    // 上個月按鈕事件
    document.getElementById('prev-month').addEventListener('click', function() {
        const currentMonth = document.getElementById('current-month').dataset.month;
        const currentYear = document.getElementById('current-month').dataset.year;
        
        let newDate = new Date(currentYear, currentMonth - 1);
        newDate.setMonth(newDate.getMonth() - 1);
        renderCalendar(newDate);
    });
    
    // 下個月按鈕事件
    document.getElementById('next-month').addEventListener('click', function() {
        const currentMonth = document.getElementById('current-month').dataset.month;
        const currentYear = document.getElementById('current-month').dataset.year;
        
        let newDate = new Date(currentYear, currentMonth - 1);
        newDate.setMonth(newDate.getMonth() + 1);
        renderCalendar(newDate);
    });
}

// 渲染行事曆
function renderCalendar(date) {
    const calendarDays = document.getElementById('calendar-days');
    const monthElement = document.getElementById('current-month');
    
    // 清空行事曆
    calendarDays.innerHTML = '';
    
    // 設置月份標題
    const monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    monthElement.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    monthElement.dataset.month = date.getMonth() + 1;
    monthElement.dataset.year = date.getFullYear();
    
    // 獲取當月第一天
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    
    // 獲取當月最後一天
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    // 計算上個月需要顯示的天數
    const firstDayOfWeek = firstDay.getDay() || 7; // 轉換星期日為7，符合星期一為第一天
    const prevMonthDays = firstDayOfWeek - 1;
    
    // 獲取上個月的最後幾天
    const prevMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    
    // 添加上個月的天數
    for (let i = prevMonthDays; i > 0; i--) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day', 'other-month');
        dayElement.textContent = prevMonthLastDay - i + 1;
        calendarDays.appendChild(dayElement);
    }
    
    // 添加當月的天數
    const today = new Date();
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = i;
        
        // 如果是今天，添加active類
        if (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            i === today.getDate()
        ) {
            dayElement.classList.add('active');
        }
        
        // 示例：假設有些日期有數據記錄
        if ([3, 7, 12, 18, 25].includes(i)) {
            dayElement.classList.add('has-data');
        }
        
        // 日期點擊事件
        dayElement.addEventListener('click', function() {
            // 移除所有active類
            document.querySelectorAll('.calendar-day').forEach(day => {
                day.classList.remove('active');
            });
            
            // 添加active類到當前點擊的日期
            this.classList.add('active');
            
            // 在這裡可以加載該日期的記錄數據
            // loadDayData(date.getFullYear(), date.getMonth() + 1, i);
        });
        
        calendarDays.appendChild(dayElement);
    }
    
    // 計算下個月需要顯示的天數
    const totalDaysShown = prevMonthDays + lastDay.getDate();
    const nextMonthDays = 7 - (totalDaysShown % 7);
    
    // 添加下個月的天數（如果需要）
    if (nextMonthDays < 7) {
        for (let i = 1; i <= nextMonthDays; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day', 'other-month');
            dayElement.textContent = i;
            calendarDays.appendChild(dayElement);
        }
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