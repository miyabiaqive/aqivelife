# 🎨 AqiveLife 卡片樣式設計指南

## 設計理念

基於 iOS Human Interface Guidelines 和現代 Material Design 原則，建立層次分明、語義清晰的卡片樣式系統。

## 🏗️ 卡片層級系統

### Level 1: 平面卡片 `.card-flat`
```css
/* 無陰影，僅用邊框分隔 */
border: 1px solid #F0F0F0;
```
**使用場景：**
- 背景區域分組
- 設定頁面的區塊分隔
- 不需要強調的內容容器

### Level 2: 輕微浮起 `.card-elevated`
```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
border: 1px solid #F0F0F0;
```
**使用場景：**
- 一般內容卡片
- 統計數據展示
- 列表項目

### Level 3: 中度浮起 `.card-raised`
```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
border: 1px solid #F0F0F0;
```
**使用場景：**
- 重要內容區塊
- 互動元素
- 產品選擇卡片

### Level 4: 高度浮起 `.card-floating`
```css
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
border: 1px solid #F0F0F0;
border-radius: 16px;
padding: 20px;
```
**使用場景：**
- 彈窗對話框
- 重要提示
- 模態視窗

## 🎯 特殊狀態卡片

### 選中狀態 `.card-selected`
```css
border: 2px solid #FF9D4D;
background-color: #FFF8F3;
box-shadow: 0 2px 8px rgba(255, 157, 77, 0.15);
```

### 互動狀態 `.card-interactive`
```css
cursor: pointer;
transition: all 0.2s ease;

/* Hover 效果 */
transform: translateY(-1px);
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
```

### 語義狀態卡片
- **警告** `.card-warning` - 品牌主橙色左邊框 `#FF9D4D`
- **成功** `.card-success` - 綠色左邊框 `#34C759`
- **資訊** `.card-info` - 品牌淺藍色左邊框 `#7FDEE3`

## 📏 尺寸變體

### 緊湊型 `.card-compact`
```css
padding: 12px;
border-radius: 8px;
```

### 寬敞型 `.card-spacious`
```css
padding: 24px;
border-radius: 16px;
```

## 🎨 顏色系統

### 邊框顏色統一
- **主要邊框：** `#F0F0F0` - 用於一般分隔
- **選中邊框：** `#FF9D4D` - 品牌主色
- **狀態邊框：** 根據語義使用對應顏色

### 狀態邊框顏色
- **警告狀態：** `#FF9D4D` - 品牌主橙色
- **成功狀態：** `#34C759` - 系統成功綠色
- **資訊狀態：** `#7FDEE3` - 品牌淺藍色

### 背景顏色
- **預設背景：** `white`
- **選中背景：** `#FFF8F3` - 溫暖的淺橙色
- **警告背景：** `#FFF8F3` - 與選中背景相同
- **成功背景：** `#F0FFF4` - 淺綠色
- **資訊背景：** `#F0FFFE` - 淺藍色

### 陰影透明度
- **輕微：** `rgba(0, 0, 0, 0.05)`
- **中等：** `rgba(0, 0, 0, 0.08)`
- **強烈：** `rgba(0, 0, 0, 0.12)`
- **品牌色陰影：** `rgba(255, 157, 77, 0.15)`

## 📱 使用範例

### 首頁統計卡片
```html
<div class="card-elevated">
    <div class="card-title">本週概況</div>
    <div class="card-body">統計內容...</div>
</div>
```

### 產品選擇卡片
```html
<div class="card-raised card-interactive" onclick="selectProduct()">
    <div class="card-body">產品內容...</div>
</div>

<!-- 選中狀態 -->
<div class="card-raised card-selected">
    <div class="card-body">已選中的產品...</div>
</div>
```

### 設定頁面區塊
```html
<div class="card-flat">
    <div class="card-title">帳戶設定</div>
    <div class="card-body">設定選項...</div>
</div>
```

### 重要提示
```html
<div class="card-floating card-warning">
    <div class="card-title">注意事項</div>
    <div class="card-body">重要提示內容...</div>
</div>
```

## 🔧 實施建議

### 1. 逐步遷移
- 優先更新主要頁面（首頁、產品選擇）
- 保持向後兼容性
- 逐步替換舊的內聯樣式

### 2. 組件化思維
- 每個卡片類型對應特定用途
- 避免混合使用不同層級
- 保持設計一致性

### 3. 響應式考量
- 在小螢幕上適當調整 padding
- 保持觸控友好的尺寸
- 考慮深色模式適配

## 📋 檢查清單

在實施新的卡片樣式時，請確認：

- [ ] 選擇了正確的卡片層級
- [ ] 使用了統一的邊框顏色
- [ ] 陰影透明度符合設計規範
- [ ] 互動狀態有適當的過渡效果
- [ ] 語義狀態使用了正確的顏色
- [ ] 內容結構使用了標準的 card-title、card-body 等類別

## 🎯 設計目標

通過這套卡片樣式系統，我們希望達到：

1. **視覺層次清晰** - 不同重要程度的內容有明確的視覺區分
2. **互動反饋明確** - 用戶能清楚知道哪些元素可以互動
3. **品牌一致性** - 所有卡片都體現 AqiveLife 的設計語言
4. **開發效率** - 開發者能快速選擇合適的卡片樣式
5. **維護便利** - 統一的樣式系統便於後續維護和更新 