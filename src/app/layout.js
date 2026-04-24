import { Inter } from 'next/font/google';
import './globals.css'; // 引入 Tailwind CSS 全局样式

// 引入 Google 官方优化字体
const inter = Inter({ subsets: ['latin'] });

// --- 全局 SEO 元数据配置 (Server-side) ---
export const metadata = {
  title: 'Guangzhou Private Driver | English-Speaking Car Service',
  description: 'Hire a reliable English-speaking Guangzhou Private Driver. We offer seamless airport transfers, Canton Fair transport, and guided factory visits. Book today!',
  
  // 核心 SEO 关键词矩阵 (涵盖主词和长尾词)
  keywords: [
    'Guangzhou Private Driver', 
    'English speaking driver Guangzhou', 
    'Canton Fair car service', 
    'Guangzhou airport transfer', 
    'China factory visit driver',
    'Guangzhou business car rental',
    'hire driver in Guangzhou'
  ],
  
  // OpenGraph 协议配置 (当你的网站被分享到 WhatsApp、Facebook、Twitter 时，会自动显示漂亮的卡片)
  openGraph: {
    title: 'Guangzhou Private Driver | Premium English-Speaking Car Service',
    description: 'Hire a reliable English-speaking Guangzhou Private Driver. We offer seamless airport transfers, Canton Fair transport, and guided factory visits.',
    url: 'https://guangzhouprivatedriver.top', // 如果你有正式域名，请替换为你的真实域名
    siteName: 'Guangzhou Private Driver',
    type: 'website',
  },
  
  // 告诉搜索引擎这是英文网站，重点面向全球客户
  alternates: {
    canonical: 'https://guangzhouprivatedriver.top',
  }
};

export default function RootLayout({ children }) {
  return (
    // 强制声明 HTML 语言为英文，有利于外贸 SEO
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}