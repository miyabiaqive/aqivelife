// 首頁特定JavaScript

// 更新當前日期
document.addEventListener('DOMContentLoaded', () => {
    const dateElement = document.querySelector('.date');
    if (dateElement) {
        const now = new Date();
        
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        
        const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
        const weekday = weekdays[now.getDay()];
        
        dateElement.textContent = `${year}年${month}月${day}日 週${weekday}`;
    }
    
    // 設置產品下拉選單的事件監聽
    const productDropdown = document.querySelector('.product-dropdown');
    if (productDropdown) {
        productDropdown.addEventListener('change', function() {
            const selectedProduct = this.value;
            updateProductTip(selectedProduct);
        });
    }
});

// 根據選擇的產品更新提示
function updateProductTip(productName) {
    const tipText = document.querySelector('.tip-text');
    
    if (!tipText) return;
    
    if (productName === '無') {
        tipText.textContent = '搭配 Aqive 系列產品使用，可以顯著提升調頻效果。選擇一個產品開始體驗吧！';
    } else if (productName === '撓定') {
        tipText.textContent = '嘗試在使用「撓定」時配合深呼吸，每次吸氣5秒，呼氣6秒，可以加強調頻效果。';
    } else if (productName === '撓氣源寶') {
        tipText.textContent = '撓氣源寶最適合放置在安靜環境中使用，建議在睡前30分鐘開始調頻，有助於改善睡眠品質。';
    } else if (productName === '盒炁') {
        tipText.textContent = '使用盒炁時，可以嘗試將其放置在工作桌上，幫助提升工作專注力和創造力。';
    } else if (productName === '炁環') {
        tipText.textContent = '炁環佩戴在手腕上時，每天輕輕旋轉三次，能夠激活能量場，提升全天的活力。';
    } else if (productName === '晶炁') {
        tipText.textContent = '晶炁在陽光下充能15分鐘後使用，效果會更加顯著，特別適合在早晨使用。';
    }
    
    console.log(`選擇了產品: ${productName}`);
} 