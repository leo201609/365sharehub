import Link from 'next/link';
import { Mail, MessageCircle, Clock, ShieldQuestion } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] py-20 px-4">
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">您有任何疑问吗？</h1>
          <p className="text-lg text-slate-500">我们的客服团队随时为您提供支持。请通过以下方式联系我们。</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 mb-8">
          <div className="grid gap-8">
            
            {/* 工作时间 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-[#0078D4]" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">客服服务时间</h3>
                <p className="text-slate-500 mt-1">周一至周五，欧洲中部时间 (CET) 9:00 - 18:00</p>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Email 联系 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-[#0078D4]" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">电子邮件</h3>
                <p className="text-slate-500 mt-1 mb-2">一般咨询与账单问题，我们将在 24 小时内回复。</p>
                <a href="mailto:support@365sharehub.com" className="text-[#0078D4] font-semibold hover:underline">
                  support@365sharehub.com
                </a>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Telegram 快捷通道 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-[#0078D4]" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Telegram 在线客服 (推荐)</h3>
                <p className="text-slate-500 mt-1 mb-2">获取最快的人工响应速度。</p>
                <a href="https://t.me/your_telegram_bot" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#0078D4] font-semibold hover:underline">
                  @365ShareHub_Support
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* 引导工单的高亮区块 */}
        <div className="bg-amber-50 rounded-3xl p-8 border border-amber-200 text-center flex flex-col items-center">
          <ShieldQuestion className="w-10 h-10 text-amber-500 mb-4" />
          <h3 className="text-xl font-bold text-amber-900 mb-2">需要技术支持或账号故障？</h3>
          <p className="text-amber-800 mb-6 max-w-md">
            如果您在共享账号登录时遇到密码失效或设备限制问题，请直接在控制面板提交工单，技术团队会优先为您重置。
          </p>
          <Link href="/dashboard" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-amber-200 active:scale-95">
            进入控制面板提交工单
          </Link>
        </div>

      </div>
    </div>
  );
}