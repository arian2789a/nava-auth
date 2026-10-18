import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'نوا | ورود و ثبت‌نام', description: 'رابط کاربری فارسی و راست‌چین ورود و ثبت‌نام، ساخته‌شده با Next.js' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fa" dir="rtl"><body>{children}</body></html>;
}
