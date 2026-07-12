# AI Chat Renkai

一个部署在公网服务器上的 AI 对话网站。

项目使用 Node.js、Express 和静态 HTML/CSS/JavaScript 开发，并通过 Xiaomi MiMo API 调用 `mimo-v2.5-pro` 模型。

## 在线地址

http://38.76.164.104:3007

## 项目功能

- 固定 AI 人设
- 支持多轮对话
- 支持等待状态
- 请求过程中禁止重复发送
- 新消息自动滚动
- 移动端适配
- API Key 仅保存在服务器 `.env` 中
- 使用 PM2 保持服务运行

## AI 人设

AI 以汉弗莱爵士的身份与用户交流，并称呼用户为“首相”或“首相阁下”。

角色关系：

- 汉弗莱爵士：内阁秘书
- 伯纳德：首相的私人秘书
- 用户：首相哈克

回答开头和结尾可以带有较长、正式、略带英国官僚幽默的表达，但真正回答问题时应直接、清楚，不说废话。

## 技术栈

- Node.js
- Express
- HTML
- CSS
- JavaScript
- Xiaomi MiMo API
- PM2

## 项目结构

```text
ai-chat-renkai/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md
```

## 环境变量

复制示例文件：

```bash
cp .env.example .env
```

然后在 `.env` 中填写自己的 MiMo API Key：

```env
MIMO_API_KEY=your_api_key_here
```

不要把真实 API Key 提交到 GitHub。

## 安装依赖

```bash
npm install
```

## 普通启动

```bash
npm start
```

服务监听：

```text
0.0.0.0:3007
```

## 使用 PM2 启动

```bash
npm run pm2
```

查看运行状态：

```bash
npx pm2 status
```

查看日志：

```bash
npx pm2 logs ai-chat-renkai
```

## API 接口

### POST `/api/chat`

请求示例：

```json
{
  "messages": [
    {
      "role": "user",
      "content": "你好"
    }
  ]
}
```

响应示例：

```json
{
  "reply": "首相阁下……"
}
```

## 安全说明

- `.env` 已加入 `.gitignore`
- 前端无法读取 API Key
- API 请求由 Express 后端转发
- 不在代码或仓库中保存真实密钥