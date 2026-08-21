/*
 * الأرقام المعتمدة لمبادرة «سَنَد وعَمّار».
 * مصدر واحد لكل رقم يظهر على الموقع، حتى لا يتناقض نص مع نص أو مع المستندات المسلَّمة للممول.
 * أي رقم لا يوجد هنا لا يُكتب في صفحة.
 */

export const N = {
  // الميدان
  fieldParticipants: 30,
  fieldMeetings: 11,
  phaseCount: 4,
  fieldCompleters: 24,
  fieldCompletionRate: "80%",

  // الرقمي
  platformUsers: 1200,
  platformSecondVisits: 500,
  digitalCompleters: 300,
  digitalReach: 20000,

  // الأثر المباشر
  // 330 = 30 مشاركاً ميدانياً + 300 مكمل رقمياً. لا تُجمع مع 24 (المكملين ميدانياً).
  directBeneficiaries: 330,
  costPerBeneficiary: "12.1",
  costPerReach: "0.20",
  commitments: 300,

  // المواد
  videos: 24,
  videosTeam: 16,
  videosAmbassadors: 8,
  cards: 24,
  articles: 6,
  ambassadors: 8,

  // المدة
  weeks: 8,
  startDate: "25/8/2026",
  endDate: "19/10/2026",

  // المال
  budgetTotal: 4000,
  budgetDigital: 2500,
  budgetField: 1000,
  budgetProtection: 500,
  inKind: 6300,
  totalValue: 10300,
  funderShare: "39%",
  hostingPerYear: 60,

  // الفريق
  teamSize: 8,
  womenDecisionRoles: 3,
} as const;

/** صيغ جاهزة للعرض داخل النص العربي، بفواصل آلاف لاتينية كما تُقرأ في الوثائق المالية. */
export const F = {
  digitalReach: N.digitalReach.toLocaleString("en-US"),
  platformUsers: N.platformUsers.toLocaleString("en-US"),
  budgetTotal: `$${N.budgetTotal.toLocaleString("en-US")}`,
  budgetDigital: `$${N.budgetDigital.toLocaleString("en-US")}`,
  budgetField: `$${N.budgetField.toLocaleString("en-US")}`,
  budgetProtection: `$${N.budgetProtection.toLocaleString("en-US")}`,
  inKind: `$${N.inKind.toLocaleString("en-US")}`,
  totalValue: `$${N.totalValue.toLocaleString("en-US")}`,
  costPerBeneficiary: `$${N.costPerBeneficiary}`,
} as const;

/** توزيع الميزانية: النسب مشتقة من المجموع، فلا يمكن أن تتفكك عن الأرقام أعلاه. */
export const budgetLines = [
  {
    label: "المنصة والمحتوى الرقمي",
    amount: N.budgetDigital,
    note: `بناء المنصة واستضافتها، إنتاج ${N.videos} مقطعًا و${N.cards} بطاقة و${N.articles} مقالات، والنشر المموّل`,
    color: "budget-sage",
  },
  {
    label: "المسار الميداني",
    amount: N.budgetField,
    note: `${N.fieldMeetings} لقاءً مع ${N.fieldParticipants} مشاركًا: التيسير والمساحة والضيافة والمواصلات`,
    color: "budget-orange",
  },
  {
    label: "الحماية والقياس",
    amount: N.budgetProtection,
    note: "مسار الإحالة مع الشريك المختص، أدوات القياس، وتدريب الفريق على الاستجابة الآمنة",
    color: "budget-blue",
  },
] as const;

export const budgetPercent = (amount: number) =>
  `${((amount / N.budgetTotal) * 100).toFixed(1).replace(/\.0$/, "")}%`;
