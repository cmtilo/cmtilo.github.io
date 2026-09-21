import React, { useState } from 'react';
import { X, Phone, Mail, CheckCircle2, MessageSquare, Send, Building } from 'lucide-react';
import { useMedia } from '../context/MediaContext';

export const ContactModal: React.FC = () => {
  const { openContactModal, setOpenContactModal } = useMedia();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    community: '八德周邊社區',
    serviceType: '外牆明管重構評估',
    notes: '',
  });

  if (!openContactModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // simulated auto-close
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 text-left overflow-hidden">
        {/* Decorative Top Gradient */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500" />

        {/* Close Button */}
        <button
          onClick={() => {
            setOpenContactModal(false);
            setSubmitted(false);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  免費預約現勘與工程諮詢
                </h3>
                <p className="text-xs text-slate-400">
                  八德三號工程團隊 • 內視鏡管檢 / 水刀洗管 / 明管規劃
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  聯絡人姓名 / 稱謂 <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="例：陳主委 / 林先生"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  聯絡電話 / 手機號碼 <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="例：0912-345-678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    社區或建物名稱
                  </label>
                  <input
                    type="text"
                    placeholder="例：八德區某某社區"
                    value={formData.community}
                    onChange={(e) => setFormData({ ...formData, community: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    諮詢項目
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 transition"
                  >
                    <option value="外牆明管重構評估">外牆明管重構評估</option>
                    <option value="超高壓水刀通管洗管">超高壓水刀通管洗管</option>
                    <option value="管道光纖內視鏡探檢">管道光纖內視鏡探檢</option>
                    <option value="低樓層逆流冒泡改善">低樓層逆流冒泡改善</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  現場問題簡述 (選填)
                </label>
                <textarea
                  rows={3}
                  placeholder="例：社區 2 樓浴室經常冒泡、陽台立管落水聲音很大..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 transition resize-none"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 transition active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>立即送出預約</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-[11px] text-slate-500">
                  亦可直接來電工程專線：<span className="text-cyan-400 font-mono">0800-888-333</span> 或加官方 LINE 預約現場評估。
                </p>
              </div>
            </form>
          </>
        ) : (
          <div className="py-8 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">預約資訊已成功送出！</h4>
            <p className="text-sm text-slate-300 max-w-xs mx-auto mb-6 leading-relaxed">
              八德三號工程團隊工務技師將於 24 小時內與您電話確認現場勘查時間。
            </p>
            <button
              onClick={() => {
                setOpenContactModal(false);
                setSubmitted(false);
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition"
            >
              關閉視窗
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
