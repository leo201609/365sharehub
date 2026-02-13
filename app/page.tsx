import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* 1. 顶部导航栏 */}
      <nav className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight">365ShareHub</div>
          <div className="space-x-4">
            <Link href="#" className="text-gray-600 hover:text-black">登录</Link>
            <Link href="#pricing" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
              立即订阅
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero 区域 (大标题) */}
      <section className="py-20 text-center px-4">
        <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          解锁全球顶尖 AI 生产力
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          一站式管理您的 GPT-4, Claude 3, Midjourney 等订阅。
          <br />以官方价格的 1/10 享受同等服务。
        </p>
        <Link href="#pricing" className="inline-block bg-blue-600 text-white text-lg px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          查看超值方案 &rarr;
        </Link>
      </section>

      {/* 3. 价格表区域 */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">灵活的订阅方案</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* 月付卡片 */}
            <div className="border rounded-2xl p-8 hover:border-blue-500 transition shadow-sm hover:shadow-md bg-white relative overflow-hidden">
              <div className="text-xl font-semibold mb-2">月付尝鲜</div>
              <div className="text-4xl font-bold mb-4">¥29.9<span className="text-lg text-gray-500 font-normal">/月</span></div>
              <p className="text-gray-500 mb-6">适合短期使用或临时项目</p>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center">✅ 包含 GPT-4 & Claude 3</li>
                <li className="flex items-center">✅ 无限次绘画生成</li>
                <li className="flex items-center">✅ 专属客服支持</li>
              </ul>
              <button className="w-full py-3 rounded-lg border-2 border-black font-semibold hover:bg-black hover:text-white transition">
                选择月付
              </button>
            </div>

            {/* 年付卡片 (推荐) */}
            <div className="border-2 border-blue-600 rounded-2xl p-8 shadow-xl bg-white relative transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                最受欢迎
              </div>
              <div className="text-xl font-semibold mb-2 text-blue-600">年度会员</div>
              <div className="text-4xl font-bold mb-4">¥299<span className="text-lg text-gray-500 font-normal">/年</span></div>
              <p className="text-gray-500 mb-6">每天不到 1 块钱，彻底释放生产力</p>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-center">✅ <strong>包含月付所有功能</strong></li>
                <li className="flex items-center">✅ 优先使用新功能</li>
                <li className="flex items-center">✅ 赠送私有知识库额度</li>
              </ul>
              <button className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg">
                立即订阅 (省 20%)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 页脚 */}
      <footer className="py-8 text-center text-gray-400 text-sm">
        © 2024 365ShareHub. All rights reserved.
      </footer>
    </div>
  );
}