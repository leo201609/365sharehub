import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface TrialEmailProps {
  email: string;
  planName: string;
  startDate: string;
  endDate: string;
  locale: string;
}

export async function sendTrialStartEmail({
  email,
  planName,
  startDate,
  endDate,
  locale = 'en'
}: TrialEmailProps) {
  
  // 1. 三语翻译字典
  const translations: any = {
    en: {
      subject: "🚀 Your 365ShareHub trial has started!",
      title: "Welcome aboard!",
      desc: "Your subscription is now active. Here are your plan details:",
      plan: "Subscription Plan",
      start: "Billing Start Date",
      end: "First Billing Date (End of Trial)",
      manage: "Go to Dashboard",
      footer: "If you cancel before the end date, you won't be charged."
    },
    zh: {
      subject: "🚀 您的 365ShareHub 试用已开启！",
      title: "欢迎加入！",
      desc: "您的订阅已成功激活，以下是您的套餐详情：",
      plan: "套餐类型",
      start: "账单开始日期",
      end: "首次扣费日期（试用结束）",
      manage: "进入控制面板",
      footer: "如果您在结束日期前取消订阅，我们将不会收取任何费用。"
    },
    de: {
      subject: "🚀 Ihr 365ShareHub-Testzeitraum hat begonnen!",
      title: "Willkommen an Bord!",
      desc: "Ihr Abonnement ist jetzt aktiv. Hier sind Ihre Tarifdetails:",
      plan: "Abonnement-Plan",
      start: "Beginn der Abrechnung",
      end: "Erster Abrechnungstermin (Ende des Tests)",
      manage: "Zum Dashboard",
      footer: "Wenn Sie vor dem Enddatum kündigen, wird Ihnen nichts berechnet."
    }
  };

  const t = translations[locale] || translations.en;

  // 2. 发送邮件
  return await resend.emails.send({
    from: '365ShareHub <support@365sharehub.com>',
    to: [email],
    subject: t.subject,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #334155;">
        <h2 style="color: #0078D4;">365ShareHub</h2>
        <h1 style="font-size: 24px; color: #0f172a;">${t.title}</h1>
        <p>${t.desc}</p>
        
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b;">${t.plan}</td>
              <td style="padding: 8px 0; text-align: right; font-weight: bold;">${planName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">${t.start}</td>
              <td style="padding: 8px 0; text-align: right;">${startDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #0078D4;">${t.end}</td>
              <td style="padding: 8px 0; text-align: right; color: #0078D4; font-weight: bold;">${endDate}</td>
            </tr>
          </table>
        </div>

        <p style="font-size: 13px; color: #94a3b8; text-align: center;">${t.footer}</p>

        <a href="https://365sharehub.com/dashboard" 
           style="display: block; background: #0078D4; color: white; text-align: center; padding: 14px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 24px;">
          ${t.manage}
        </a>
      </div>
    `
  });
}