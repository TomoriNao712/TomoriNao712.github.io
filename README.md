# Tomori Nao · 放课后手记

公开网址：**https://tomorinao712.github.io/**

这个版本完全由 GitHub Pages 托管，不需要服务器、付费域名或 ChatGPT 登录。页面保留分区渐变、人物逐帧动画、几何曲面、随机音乐、Steam 游玩快照和旅行相册。已有的数学题解、书籍推荐等旧页面保持原路径；旧版首页保存在 `previous-home.html`。

## 日常更新（无需编程）

1. 在网页页脚进入「站主管理」，或打开 https://tomorinao712.github.io/manage.html 。
2. 修改资料、歌曲和游戏时长，选择要加入的旅行照片或音乐文件。
3. 点击「下载更新包」，解压得到 `content`、`photos`、`music` 等文件夹。
4. 使用自己的 GitHub 账号打开仓库上传入口，把**解压后的文件夹**拖进去；不要直接上传 ZIP。
5. 点击 **Commit changes**。等仓库 Actions 中的 `pages build and deployment` 成功，刷新网站即可。

管理页仅在当前浏览器中整理草稿，不包含写入令牌，也不会直接修改网站。发布权限由 GitHub 仓库控制，普通访客不能提交更新。离开管理页前记得下载草稿。

## 内容与文件

- `content/notebook.json`：当前公开资料、歌单、游戏和相册目录。可直接使用 GitHub 网页编辑器修改。
- `photos/`：公开照片。管理页会先缩小尺寸并重新编码，以移除定位等元数据。
- `music/`：自行上传的公开音频。
- `characters/`：呆唯与伊雷娜人物动画素材。
- `assets/`：已构建的前端代码与样式，无需手动编辑。

从相册中移除照片只会停止展示。若需删除原文件，请另外到仓库删除对应文件；Git 提交历史仍可能保留旧文件。

Steam 为静态快照，GitHub Pages 不提供服务器接口，原来的服务器同步功能和 ChatGPT 登录没有迁入。可在管理页手动更新游戏时长。播放器的外部音源是否可播放取决于原服务的可达性，也可上传自己的音频使用站内文件播放。

## 修改设计

`site-source/` 保存独立的 React + Vite 前端源码，不包含原 Sites 服务端、数据库、账户信息或密钥。

```sh
cd site-source
npm install
npm run build
```

将 `site-source/dist/` 中的文件复制到仓库根目录，提交即可。保留已有 `photos/`、`music/`、`content/` 及旧网页文件。构建会优先读取仓库根目录的 `content/notebook.json`。

当前 Pages 使用既有 `main` 分支根目录发布，`.nojekyll` 禁用 Jekyll 转换；无需额外配置 Actions 密钥或购买服务。
