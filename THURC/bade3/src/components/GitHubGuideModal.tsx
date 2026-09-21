import React, { useState } from 'react';
import { X, Github, Copy, Check, Terminal, ExternalLink, BookOpen, Layers } from 'lucide-react';
import { useMedia } from '../context/MediaContext';

export const GitHubGuideModal: React.FC = () => {
  const { openGitHubModal, setOpenGitHubModal } = useMedia();
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!openGitHubModal) return null;

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const gitCommands = `# 1. 建立 Git 儲存庫並加入檔案
git init
git add .
git commit -m "feat: 八德三號 排水接管工程實錄互動網頁"

# 2. 關聯到您的 GitHub 儲存庫 (請替換為您的倉庫網址)
git branch -M main
git remote add origin https://github.com/您的帳號/bade3-drainage.git

# 3. 推送原始碼到 GitHub
git push -u origin main`;

  const deployCommands = `# 安裝依賴並測試建置
npm install
npm run build

# 本地預覽建置成果
npm run preview`;

  const ghPagesConfig = `// vite.config.ts (若使用 GitHub Pages 子路徑，請確保設定 base):
export default defineConfig({
  base: './', // 確保靜態檔案以相對路徑解析
  // ...
});`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 text-left overflow-hidden">
        {/* Top Gradient */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800 text-white">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                GitHub 上架與發布指引
              </h3>
              <p className="text-xs text-slate-400">
                整理成現代化 Vite + React 專案，可直接上傳 GitHub 或發布為 GitHub Pages
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpenGitHubModal(false)}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-1 custom-scrollbar">
          {/* Step 1: File placement in public/ */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-mono">
                1
              </span>
              <span>雲端檔案放置至 public/ 目錄</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              請先從 Google 雲端硬碟下載全部 12 個圖影檔案，放入專案的{' '}
              <code className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">
                public/
              </code>{' '}
              目錄下：
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 font-mono text-[11px] text-slate-300 space-y-1">
              <div>📁 public/</div>
              <div className="pl-4 text-slate-400">├── 投影片1.JPG (Hero 主視覺)</div>
              <div className="pl-4 text-slate-400">├── 投影片2.JPG (第一區塊 戶內通管)</div>
              <div className="pl-4 text-slate-400">├── 投影片3.JPG & 投影片3.mp4 (共管水刀洗管)</div>
              <div className="pl-4 text-slate-400">├── 投影片4.JPG, 投影片4_3F.JPG, 投影片4_4F.JPG, 投影片4_5F.JPG (3D疊圖)</div>
              <div className="pl-4 text-slate-400">├── 投影片5.mp4 & 投影片6.mp4 (明管規劃設計模擬)</div>
              <div className="pl-4 text-slate-400">├── 投影片11.mp4 (完工驗收大水量實錄)</div>
              <div className="pl-4 text-slate-400">└── 投影片12.mp4 (社區全景空拍片尾彩蛋)</div>
            </div>
          </div>

          {/* Step 2: Git push commands */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-mono">
                  2
                </span>
                <span>推送到 GitHub 儲存庫指令</span>
              </h4>
              <button
                onClick={() => copyToClipboard(gitCommands, 'git')}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-mono"
              >
                {copiedSection === 'git' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'git' ? '已複製指令' : '複製指令'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed">
              {gitCommands}
            </pre>
          </div>

          {/* Step 3: Build & GitHub Pages */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-mono">
                  3
                </span>
                <span>部署為 GitHub Pages 免費靜態展示網站</span>
              </h4>
              <button
                onClick={() => copyToClipboard(deployCommands, 'deploy')}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-mono"
              >
                {copiedSection === 'deploy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'deploy' ? '已複製指令' : '複製指令'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-300 mb-2 leading-relaxed">
              在 GitHub 倉庫的 <strong>Settings ➔ Pages</strong> 中：
              Source 選擇 <strong>GitHub Actions</strong>，即可使用預設的 Vite / Static HTML 工作流程自動部署上線！
            </p>
            <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto">
              {deployCommands}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end">
          <button
            onClick={() => setOpenGitHubModal(false)}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};
