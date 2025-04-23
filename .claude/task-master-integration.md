# Task Master 整合詳細指南

本文檔提供了使用 Claude AI 和 Task Master 工具管理專案開發任務的詳細指南。

## 一、Task Master 概念介紹

Task Master 是一個由 Anthropic 開發的任務管理工具，專為 AI 驅動的軟體開發工作流程設計。它能夠：

1. 自動從需求文檔解析任務
2. 將複雜任務拆分為更小的子任務
3. 與 Claude AI 和 Cursor 編輯器深度整合
4. 跟踪任務狀態和進度
5. 生成進度報告和更新

## 二、準備工作

### 目錄結構

確保在專案根目錄中存在以下文件結構：

```
.claude/
  ├── settings.json    # Claude AI 設置
  ├── task-list.json   # 任務列表
  └── feature-roadmap.md  # 功能路線圖
```

### 專案文檔

確保 README.md 或其他產品需求文檔(PRD)包含足夠詳細的信息，以便 Task Master 能夠提取有意義的任務。

## 三、基於當前環境的整合方式

由於當前環境尚未安裝 Node.js，我們將採用無需 Task Master CLI 的方式進行整合。主要通過 Cursor AI 直接操作：

### 1. 手動任務管理方式

1. 編輯 `.claude/task-list.json` 文件，按照以下格式添加任務：

```json
[
  {
    "id": "unique-task-id",
    "title": "任務標題",
    "description": "詳細任務描述",
    "priority": "high|medium|low",
    "status": "todo|in_progress|done",
    "files": ["相關文件路徑1", "相關文件路徑2"]
  }
]
```

2. 在 Cursor 中啟動 Claude AI，使用以下提示語引導 Claude 了解任務：

```
請查看 .claude/task-list.json 中的任務列表，幫我實現 [任務ID] 的功能。
```

3. 定期更新 task-list.json 中的任務狀態。

### 2. 使用 Claude AI 自動化任務管理

1. 讓 Claude 分析 README.md 並提取任務：

```
分析 README.md 文件，識別所有需要實現的功能和任務，並以 JSON 格式輸出，格式應包含 id、title、description、priority 和 status 字段。
```

2. 讓 Claude 將提取的任務寫入到 `.claude/task-list.json`。

3. 讓 Claude 根據任務優先級排序並推薦下一步執行計劃：

```
查看 .claude/task-list.json 中的任務，按優先級排序，並推薦接下來應該執行的三個任務。
```

## 四、AI 驅動的工作流程

以下是使用 Cursor AI 和 task-list.json 進行開發的推薦工作流程：

### 1. 規劃階段

1. 讓 Claude 分析 README.md 並提取任務
2. 審核並完善任務列表
3. 讓 Claude 幫助優先排序

### 2. 開發階段

1. 選擇一個優先級高的任務
2. 要求 Claude 幫助了解任務需求：

```
請詳細解釋 [任務ID] 的需求，並提供實現此功能的技術方案和步驟。
```

3. 讓 Claude 協助實現代碼：

```
幫我實現 [任務ID] 的功能，專注於 [相關文件] 的部分。
```

4. 實現後更新任務狀態

### 3. 測試與審查階段

1. 要求 Claude 審查實現的代碼：

```
請審查我為完成 [任務ID] 編寫的代碼，特別關注 [具體關注點]。
```

2. 讓 Claude 生成測試案例：

```
為 [任務ID] 實現的功能生成測試案例，確保覆蓋主要場景和邊界條件。
```

## 五、Task Master CLI 命令參考

當環境中安裝了 Node.js 後，可以使用以下 Task Master CLI 命令：

```bash
# 安裝 Task Master
npm install -g @anthropic-ai/claude-task-master

# 初始化專案
task-master init --project AqiveLife

# 從需求文檔解析任務
task-master parse --source README.md --output .claude/tasks

# 列出所有任務
task-master list

# 創建新任務
task-master create --title "任務標題" --description "任務描述" --priority high

# 更新任務狀態
task-master update <task-id> --status in_progress

# 生成報告
task-master report
```

## 六、整合到現有工具和流程

### 與版本控制整合

1. 定期提交 `.claude/task-list.json` 的變更
2. 在提交信息中引用任務 ID

```
git commit -m "完成任務 #task-id: 實現XXX功能"
```

### 與團隊協作

1. 分享 `.claude/task-list.json` 給所有團隊成員
2. 在團隊會議中審查任務進度
3. 使用任務 ID 在溝通中指代具體功能

## 七、最佳實踐與提示

1. **保持任務粒度適中**：既不要太大難以追蹤，也不要太小增加管理負擔
2. **使用前綴標識任務類型**：如 `feature-`、`bug-`、`test-` 等
3. **定期清理已完成任務**：將完成的任務歸檔，保持活躍任務列表清晰
4. **記錄任務依賴關係**：在描述中註明依賴的其他任務
5. **與 Claude 保持一致的交流方式**：使用明確的指令和一致的格式

## 八、疑難解答

### 常見問題及解決方案

1. **Claude 不能識別任務上下文**
   - 確保在對話中明確引用任務 ID
   - 提供更多背景信息和相關文件路徑

2. **任務優先級衝突**
   - 使用明確的數字優先級而不是模糊的高/中/低
   - 定期重新審視優先級

3. **跨文件任務難以追蹤**
   - 在任務描述中列出所有相關文件
   - 創建子任務分別處理不同文件的變更 