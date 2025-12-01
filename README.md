# H&Z Couple Space - 情侣纪念互动平台

## 项目简介

H&Z Couple Space 是一个为情侣设计的独特、浪漫、个性化的回忆与互动平台。旨在增强情侣之间的亲密感，创造浪漫的互动方式，并长期保存珍贵的回忆。

## 功能特性

*   **情侣回忆时间线**: 以时间轴形式展示情侣间的特别回忆，支持上传照片、视频。
*   **情侣私密信箱**: 互相发送可设定解锁日期的私密信件，充满期待与神秘感。
*   **情感指数**: 根据情侣互动（留言、上传照片、写日记等）计算情感指数，反映感情状态。
*   **情侣任务与奖励**: 共同设定目标，完成后获得虚拟奖励。
*   **虚拟宠物**: 宠物随情侣互动而成长或改变外观，情绪反映关系状态。
*   **回忆时光机**: 回顾过去回忆，自动推荐重要时刻。
*   **一起成长的心愿树**: 许下共同愿望，心愿树随完成的心愿而成长。
*   **情侣配对音乐**: 推荐定制音乐播放列表。
*   **时光胶囊**: 封存视频、语音或文字，设定未来日期解锁。

## 快速开始

### 1. 安装依赖

请确保您已安装 [Node.js](https://nodejs.org/) 和 [pnpm](https://pnpm.io/)。

```bash
# 如果您没有安装 pnpm，可以通过 npm 安装
npm install -g pnpm
# 或者如果您更喜欢 npm
# npm install
# 或者如果您更喜欢 yarn
# yarn install
```

然后，在项目根目录运行：

```bash
pnpm install
```

### 2. 运行开发服务器

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看。

### 3. 登录密码

首次进入应用，您需要输入纪念日密码：`1201`

### 4. 数据持久化

本项目原型使用浏览器本地存储（Local Storage）进行数据持久化。这意味着您添加的回忆、信件、任务等数据会在您的浏览器上保存，关闭浏览器后数据不会丢失。

**注意**:
*   这仅用于原型演示，不是一个安全的或可扩展的生产级数据存储方案。
*   清除浏览器缓存或在不同浏览器、设备上访问将不会保留数据。

## 部署

您可以使用 [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) 轻松部署您的 Next.js 应用程序。

查看 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying) 获取更多详细信息。