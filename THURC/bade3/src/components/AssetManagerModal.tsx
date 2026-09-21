import React, { useRef, useState } from 'react';
import {
  X,
  FolderOpen,
  Upload,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileVideo,
  FileImage,
  RefreshCw,
  Copy,
  Check,
} from 'lucide-react';
import { useMedia } from '../context/MediaContext';

export const AssetManagerModal: React.FC = () => {
  const {
    openAssetModal,
    setOpenAssetModal,
    assets,
    batchUploadFiles,
    resetAllAssets,
    setCustomFile,
  } = useMedia();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadStatus, setUploadStatus] = useState<{
    matched: number;
    unmatched: string[];
  } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!openAssetModal) return null;

  const driveFolderUrl =
    'https://drive.google.com/drive/folders/178ro1pTRR2M7MwTDFp0l9I6BuSCrk-G7?usp=drive_link';

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const result = batchUploadFiles(e.target.files);
      setUploadStatus(result);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const result = batchUploadFiles(e.dataTransfer.files);
      setUploadStatus(result);
    }
  };

  const copyDriveLink = () => {
    navigator.clipboard.writeText(driveFolderUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 text-left overflow-hidden">
        {/* Top Gradient */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
              <FolderOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                專案素材與 Google 雲端檔案管理
              </h3>
              <p className="text-xs text-slate-400">
                對應八德三號 12 份投影片圖影，支援拖曳即時預覽與 GitHub 放行說明
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpenAssetModal(false)}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-1 custom-scrollbar">
          {/* Google Drive Link Box */}
          <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-cyan-300 font-mono">
                GOOGLE DRIVE 雲端硬碟連結：
              </span>
              <p className="text-xs text-slate-300 mt-0.5 break-all">
                {driveFolderUrl}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={copyDriveLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-slate-700 transition"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? '已複製' : '複製連結'}</span>
              </button>

              <a
                href={driveFolderUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition shadow-md shadow-cyan-500/20"
              >
                <span>前往雲端下載</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Drag and Drop Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-700 hover:border-cyan-400 bg-slate-950/60 rounded-2xl p-6 text-center cursor-pointer transition group"
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFiles}
            />

            <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <Upload className="w-6 h-6" />
            </div>

            <h4 className="text-sm font-bold text-white mb-1">
              拖曳下載好的投影片檔案到這裡，或點擊選取多個檔案
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              系統會自動依檔名匹配（例：<code className="text-cyan-300">投影片1.JPG</code>、
              <code className="text-cyan-300">投影片3.mp4</code>、
              <code className="text-cyan-300">投影片4_3F.JPG</code>...），並即刻於畫面上即時更新！
            </p>
          </div>

          {/* Upload Status Alert */}
          {uploadStatus && (
            <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-200">
                  成功匹配置換 <strong>{uploadStatus.matched}</strong> 個檔案！
                </span>
              </div>
              {uploadStatus.unmatched.length > 0 && (
                <span className="text-slate-400">
                  未匹配: {uploadStatus.unmatched.join(', ')}
                </span>
              )}
            </div>
          )}

          {/* Asset List Matrix */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">
                12 項指定素材清單與狀態
              </h4>
              <button
                onClick={resetAllAssets}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-300 transition"
              >
                <RefreshCw className="w-3 h-3" />
                <span>重置為預設路徑</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {Object.values(assets).map((item) => {
                const isCustom = Boolean(item.customUrl);
                const Icon = item.type === 'video' ? FileVideo : FileImage;

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="p-2 rounded-lg bg-slate-900 text-cyan-400 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-semibold text-white truncate">
                          {item.name}
                        </div>
                        <div className="font-mono text-[11px] text-slate-400 truncate">
                          {item.originalFileName}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isCustom ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono">
                          自訂已載入
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[10px] font-mono">
                          public/ 預設
                        </span>
                      )}

                      <label className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer transition">
                        <Upload className="w-3.5 h-3.5" />
                        <input
                          type="file"
                          accept={item.type === 'video' ? 'video/*' : 'image/*'}
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) setCustomFile(item.id, f);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* GitHub Deployment Instruction */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <h5 className="font-bold text-white mb-1.5 flex items-center gap-1.5">
              <span>💡 放上 GitHub 時的正確檔案路徑位置：</span>
            </h5>
            <p className="text-slate-400">
              將從 Google 雲端下載的 12 個檔案（<code className="text-cyan-300">投影片1.JPG</code>、
              <code className="text-cyan-300">投影片2.JPG</code>...）直接存放在本專案的{' '}
              <strong className="text-white font-mono">public/</strong> 資料夾根目錄中。
              建置（Build）與推送到 GitHub Pages 時，Vite 會自動將它們原封不動複製到輸出目錄，即可直接線上播放！
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end">
          <button
            onClick={() => setOpenAssetModal(false)}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
          >
            完成並返回瀏覽
          </button>
        </div>
      </div>
    </div>
  );
};
