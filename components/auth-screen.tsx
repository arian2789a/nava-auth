'use client';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
type Mode = 'login' | 'signup' | 'reset';
export default function AuthScreen({ mode }: { mode: Mode }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const signup = mode === 'signup';
  const reset = mode === 'reset';
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (signup && String(data.get('name') || '').trim().length < 2) {
      setMessage('نام کامل را با حداقل دو حرف وارد کنید.'); return;
    }
    setMessage(reset ? 'این فرم نمایشی است؛ ایمیل بازیابی ارسال نشده است.' : 'فرم معتبر است. این پروژه نمایشی است و حسابی ایجاد یا وارد نمی‌شود.');
  }
  return <main className="page"><div className="auth-shell">
    <section className="form-panel" aria-labelledby="page-title">
      <Link href="/login" className="brand" aria-label="نوا، صفحه ورود"><span className="brand-icon" aria-hidden="true">✦</span> نوا<span className="brand-dot">.</span></Link>
      <div className="form-content">
        <span className="eyebrow">فضایی برای ایده‌های تازه</span>
        <h1 id="page-title">{reset ? 'رمزت رو فراموش کردی؟' : signup ? 'شروع یک داستان تازه' : 'خوش برگشتی!'}</h1>
        <p className="subtitle">{reset ? 'ایمیل حسابت را برای نمایش فرم بازیابی وارد کن.' : signup ? 'حساب خودت را بساز و به جمع خلاق‌ها بپیوند.' : 'برای ادامهٔ مسیر، وارد حساب کاربری خودت شو.'}</p>
        <form onSubmit={submit} key={mode}>
          {signup && <div className="field"><label htmlFor="name">نام کامل</label><input id="name" name="name" autoComplete="name" placeholder="مثلاً سارا احمدی" required minLength={2} maxLength={80} /></div>}
          <div className="field"><label htmlFor="email">آدرس ایمیل</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" dir="ltr" required maxLength={254} /></div>
          {!reset && <div className="field"><label htmlFor="password">رمز عبور</label><div className="password-wrap"><input id="password" name="password" type={visible ? 'text' : 'password'} autoComplete={signup ? 'new-password' : 'current-password'} placeholder={signup ? 'حداقل ۸ کاراکتر' : 'رمز عبورت را وارد کن'} required minLength={signup ? 8 : 1} maxLength={128} /><button className="reveal" type="button" onClick={() => setVisible(!visible)} aria-label={visible ? 'پنهان‌کردن رمز عبور' : 'نمایش رمز عبور'} aria-pressed={visible}>{visible ? 'پنهان' : 'نمایش'}</button></div>{signup && <small>از یک رمز طولانی و منحصربه‌فرد استفاده کن.</small>}</div>}
          {!reset && <div className="options">{signup ? <label className="check"><input type="checkbox" required /> می‌دانم این فرم صرفاً یک نمونهٔ نمایشی است.</label> : <><label className="check"><input name="remember" type="checkbox" /> مرا به خاطر بسپار</label><Link href="/forgot-password">فراموشی رمز عبور</Link></>}</div>}
          <button className="primary" type="submit">{reset ? 'بررسی ایمیل' : signup ? 'ایجاد حساب کاربری' : 'ورود به حساب'}<span aria-hidden="true">←</span></button>
          <p className="status" role="status" aria-live="polite">{message}</p>
        </form>
        {!reset && <><div className="divider"><span>یا ادامه بده با</span></div><div className="socials"><button type="button" onClick={() => setMessage('ورود با گوگل در این نسخه متصل نیست.')}><b className="google" aria-hidden="true">G</b> گوگل</button><button type="button" onClick={() => setMessage('ورود با گیت‌هاب در این نسخه متصل نیست.')}><svg aria-hidden="true" viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.62 1.22 3.26.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.7.11 2.98.72.8 1.16 1.8 1.16 3.03 0 4.33-2.63 5.28-5.14 5.56.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z"/></svg> گیت‌هاب</button></div></>}
        <p className="switch">{reset ? 'رمزت را به یاد آوردی؟' : signup ? 'قبلاً حساب ساخته‌ای؟' : 'هنوز حساب کاربری نداری؟'} <Link href={signup || reset ? '/login' : '/signup'}>{signup || reset ? 'وارد شو' : 'ثبت‌نام کن'}</Link></p>
      </div>
      <footer className="form-footer"><span>© {new Date().getFullYear()} نوا</span><span>نسخهٔ نمایشی رابط کاربری</span></footer>
    </section>
    <aside className="art-panel" aria-label="تصویرسازی معماری آبی و سفید"><div className="art-copy"><span className="art-tag">از یک ایده شروع کن</span><h2>ایده‌های بزرگ،<br />با قدم‌های کوچک<br />ساخته می‌شوند.</h2><p>جایی برای ساختن، یاد گرفتن و خلق کردن.</p></div><div className="architecture" aria-hidden="true"><div className="sun"/><div className="pillar pillar-back"/><div className="arch"><div className="arch-hole"/></div><div className="stairs"><i/><i/><i/><i/><i/></div><div className="plant"><div className="leaves"/><div className="trunk"/><div className="pot"/></div><div className="ball"/></div><div className="art-bottom"><span>هر شروع، یک فرصت تازه است.</span><div className="dots"><i/><i/><i/></div></div></aside>
  </div></main>;
}
