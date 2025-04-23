# Task Master 導入 AqiveLife 工作流程

## 專案背景
AqiveLife 是一款搭配 Aqive 系列氣機產品設計的數位輔助工具，採用 Next.js + Capacitor 混合 App 架構開發。主要功能包括儀式引導、每日狀態追蹤與資料視覺化，幫助用戶提升身心狀態。

## 工作流程整合

### 1. 專案結構準備
- 已建立 .claude 目錄，包含基本配置
- 建立 task-list.json 管理開發任務
- 使用 feature-roadmap.md 追蹤功能開發進度

### 2. 環境檢查與設置
在進行 Task Master 整合前，需確保開發環境符合要求：

- 檢查 Node.js 與 npm 安裝狀態
  ```bash
  node -v
  npm -v
  ```

- 如果未安裝 Node.js，請先安裝：
  - macOS：`brew install node`
  - Windows：從 https://nodejs.org 下載安裝
  - 或使用 nvm 管理 Node.js 版本

- 確認 Git 已安裝並配置
  ```bash
  git --version
  ```

### 3. Task Master 整合步驟
1. 安裝 Task Master 工具
   ```bash
   npm install -g @anthropic-ai/claude-task-master
   ```

2. 初始化 Task Master 並連接到專案
   ```bash
   task-master init --project AqiveLife
   ```

3. 從 PRD 自動生成任務
   ```bash
   task-master parse --source README.md --output .claude/tasks
   ```
   
4. 在 Cursor 中啟用 Task Master 功能
   ```bash
   task-master cursor --enable
   ```

### 4. 無 Node.js 環境的替代方案
如果無法安裝 Node.js，可採用以下替代方案：

1. 直接使用 Claude 和 Cursor AI：
   - 在 Cursor 中使用 Claude 助手
   - 手動將 task-list.json 加入到 Claude 的上下文

2. 使用 Docker 容器運行 Task Master：
   ```bash
   docker run -v $(pwd):/app -w /app node:16 npm install -g @anthropic-ai/claude-task-master
   docker run -v $(pwd):/app -w /app node:16 task-master init
   ```

3. 使用雲端開發環境，如 GitHub Codespaces 或 GitPod

### 5. 工作流程最佳實踐
- 使用 `claude commit` 生成有意義的提交訊息
- 使用 `claude "修復相關功能"` 進行特定任務處理
- 每個開發任務從 task-list.json 拆分為多個子任務
- 使用 `/init` 生成項目指南，確保團隊一致性

### 6. 自動化建議
- 將 PRD 更新自動同步到 Task Master
- 定期執行 `task-master status` 檢查任務完成情況
- 使用 `task-master prioritize` 根據截止日期排序任務
- 集成到 CI/CD 流程，在推送時自動檢查任務狀態

## 實用提示
- 複雜任務前使用「思考」或「深入思考」讓 Claude 更清晰規劃
- 使用 `/compact` 壓縮對話，提高效率
- 任務間使用 `/clear` 重置上下文減少混淆
- 為每個主要功能模組創建獨立任務組
- 如果只使用 Cursor AI，可以手動將任務列表導入對話中

## Cursor AI 工作流程
在不使用專門工具的情況下，可以通過以下流程在 Cursor 中高效使用 AI：

1. 使用一致的專案結構與命名規範
2. 將 task-list.json 手動添加到 Claude 對話中
3. 在複雜任務前，先讓 Claude 分析和理解整個專案
4. 使用明確的指令描述需要處理的任務
5. 定期更新和維護 CLAUDE.md 及相關配置文件

## 常用命令參考
- `task-master list`：列出所有當前任務
- `task-master create`：手動創建新任務
- `task-master assign`：分配任務給團隊成員
- `task-master complete <task-id>`：標記任務完成
- `task-master report`：生成進度報告 