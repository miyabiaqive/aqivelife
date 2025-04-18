// 等待頁面加載完成後執行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化過濾器選項
    const filterOptions = document.querySelectorAll('.filter-option');
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            filterOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            updateCharts(this.dataset.period);
        });
    });

    // 設置當前日期
    const today = new Date();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    document.querySelector('.current-date').textContent = today.toLocaleDateString('zh-TW', dateOptions);

    // 初始化圖表
    initCharts();
    
    // 預設選擇「本週」
    document.querySelector('.filter-option[data-period="week"]').click();
});

function initCharts() {
    // 使用圖表配置
    initUsageChart();
    initMoodChart();
}

function updateCharts(period) {
    // 根據選擇的時段更新圖表數據
    // 這裡只是模擬，實際應用中應從API獲取數據
    updateUsageChart(period);
    updateMoodChart(period);
    updateSummaryCards(period);
}

function initUsageChart() {
    const ctx = document.getElementById('usageChart').getContext('2d');
    window.usageChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['週一', '週二', '週三', '週四', '週五', '週六', '週日'],
            datasets: [{
                label: '使用時間（分鐘）',
                data: [15, 20, 18, 25, 32, 20, 15],
                backgroundColor: 'rgba(66, 133, 244, 0.5)',
                borderColor: 'rgba(66, 133, 244, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false,
                        color: 'rgba(200, 200, 200, 0.15)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function updateUsageChart(period) {
    let labels, data;
    
    switch(period) {
        case 'week':
            labels = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];
            data = [15, 20, 18, 25, 32, 20, 15];
            break;
        case 'month':
            labels = ['第1週', '第2週', '第3週', '第4週'];
            data = [90, 120, 95, 150];
            break;
        case '3months':
            labels = ['1月', '2月', '3月'];
            data = [300, 350, 400];
            break;
        case '6months':
            labels = ['1月', '2月', '3月', '4月', '5月', '6月'];
            data = [300, 350, 400, 380, 420, 450];
            break;
        case 'year':
            labels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            data = [300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520];
            break;
        default:
            labels = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];
            data = [15, 20, 18, 25, 32, 20, 15];
    }
    
    window.usageChart.data.labels = labels;
    window.usageChart.data.datasets[0].data = data;
    window.usageChart.update();
}

function initMoodChart() {
    const ctx = document.getElementById('moodChart').getContext('2d');
    window.moodChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['週一', '週二', '週三', '週四', '週五', '週六', '週日'],
            datasets: [
                {
                    label: '焦慮程度',
                    data: [8, 7, 6, 5, 4, 3, 3],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: '專注程度',
                    data: [5, 6, 7, 7, 8, 8, 9],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: '睡眠品質',
                    data: [6, 6, 7, 8, 8, 9, 9],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    grid: {
                        drawBorder: false,
                        color: 'rgba(200, 200, 200, 0.15)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function updateMoodChart(period) {
    let labels, anxietyData, focusData, sleepData;
    
    switch(period) {
        case 'week':
            labels = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];
            anxietyData = [8, 7, 6, 5, 4, 3, 3];
            focusData = [5, 6, 7, 7, 8, 8, 9];
            sleepData = [6, 6, 7, 8, 8, 9, 9];
            break;
        case 'month':
            labels = ['第1週', '第2週', '第3週', '第4週'];
            anxietyData = [7, 6, 5, 4];
            focusData = [6, 7, 8, 8];
            sleepData = [6, 7, 8, 9];
            break;
        case '3months':
            labels = ['1月', '2月', '3月'];
            anxietyData = [7, 5, 3];
            focusData = [6, 7, 9];
            sleepData = [6, 8, 9];
            break;
        case '6months':
            labels = ['1月', '2月', '3月', '4月', '5月', '6月'];
            anxietyData = [8, 7, 6, 5, 4, 3];
            focusData = [5, 6, 7, 8, 8, 9];
            sleepData = [6, 6, 7, 8, 8, 9];
            break;
        case 'year':
            labels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            anxietyData = [8, 8, 7, 7, 6, 6, 5, 5, 4, 4, 3, 3];
            focusData = [5, 5, 6, 6, 7, 7, 8, 8, 8, 9, 9, 9];
            sleepData = [6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9];
            break;
        default:
            labels = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];
            anxietyData = [8, 7, 6, 5, 4, 3, 3];
            focusData = [5, 6, 7, 7, 8, 8, 9];
            sleepData = [6, 6, 7, 8, 8, 9, 9];
    }
    
    window.moodChart.data.labels = labels;
    window.moodChart.data.datasets[0].data = anxietyData;
    window.moodChart.data.datasets[1].data = focusData;
    window.moodChart.data.datasets[2].data = sleepData;
    window.moodChart.update();
}

function updateSummaryCards(period) {
    // 根據選擇的時間段更新摘要卡片
    // 這裡只是模擬，實際應用中應從API獲取數據
    let goalRate, consecutiveDays, anxietyReduction, totalMinutes;
    
    switch(period) {
        case 'week':
            goalRate = '85%';
            consecutiveDays = '5';
            anxietyReduction = '60%';
            totalMinutes = '145';
            break;
        case 'month':
            goalRate = '78%';
            consecutiveDays = '12';
            anxietyReduction = '50%';
            totalMinutes = '580';
            break;
        case '3months':
            goalRate = '72%';
            consecutiveDays = '21';
            anxietyReduction = '45%';
            totalMinutes = '1250';
            break;
        case '6months':
            goalRate = '68%';
            consecutiveDays = '34';
            anxietyReduction = '40%';
            totalMinutes = '2400';
            break;
        case 'year':
            goalRate = '65%';
            consecutiveDays = '48';
            anxietyReduction = '38%';
            totalMinutes = '4800';
            break;
        default:
            goalRate = '85%';
            consecutiveDays = '5';
            anxietyReduction = '60%';
            totalMinutes = '145';
    }
    
    document.getElementById('goalRate').textContent = goalRate;
    document.getElementById('consecutiveDays').textContent = consecutiveDays;
    document.getElementById('anxietyReduction').textContent = anxietyReduction;
    document.getElementById('totalMinutes').textContent = totalMinutes;
}

// 根據時間段獲取標籤
function getLabelsForPeriod(period) {
    const labels = [];
    const now = new Date();
    
    switch(period) {
        case 'week':
            // 本週的每一天
            const weekdays = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
            for (let i = 6; i >= 0; i--) {
                const date = new Date(now);
                date.setDate(now.getDate() - i);
                labels.push(weekdays[date.getDay()]);
            }
            break;
        case 'month':
            // 本月的每一週
            for (let i = 0; i < 4; i++) {
                labels.push(`第${i+1}週`);
            }
            break;
        case '3months':
            // 過去3個月的每個月
            const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
            for (let i = 2; i >= 0; i--) {
                const monthIndex = new Date(now.getFullYear(), now.getMonth() - i, 1).getMonth();
                labels.push(months[monthIndex]);
            }
            break;
        default:
            // 預設為本週
            const defaultWeekdays = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
            for (let i = 6; i >= 0; i--) {
                const date = new Date(now);
                date.setDate(now.getDate() - i);
                labels.push(defaultWeekdays[date.getDay()]);
            }
    }
    
    return labels;
}

// 生成隨機數據
function getRandomData(length, min, max, decimals = false) {
    const data = [];
    for (let i = 0; i < length; i++) {
        if (decimals) {
            data.push(parseFloat((Math.random() * (max - min) + min).toFixed(1)));
        } else {
            data.push(Math.floor(Math.random() * (max - min + 1) + min));
        }
    }
    return data;
} 