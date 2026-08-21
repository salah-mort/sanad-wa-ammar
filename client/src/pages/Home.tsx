/*
 * فلسفة التصميم: "خيط السند" داخل دفتر ميداني تفاعلي.
 * الصفحة هنا فصل، والتنقل بينها فعل قراءة؛ لا نضيف زخرفة لا تخدم الحكاية.
 *
 * التموضع: الرجل في مواقع النزوح هو من يقف في الطابور ويؤمّن الماء ويحمل الخبر السيئ
 * ويخفيه عن أهل البيت، وقلّ أن يسأله أحد كيف حاله. لا نخاطبه بوصفه مصدر المشكلة.
 * كل رقم في هذا الملف مستورد من data/numbers.ts ولا يُكتب يدوياً.
 */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  BarChart3,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDot,
  ClipboardCheck,
  Clock3,
  Coffee,
  Download,
  FileText,
  GitBranch,
  Globe2,
  HeartHandshake,
  LifeBuoy,
  Lock,
  Mail,
  Menu,
  MessageCircle,
  MessagesSquare,
  Moon,
  Play,
  Plus,
  Quote,
  Repeat,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  UsersRound,
  Video,
  WalletCards,
  Waypoints,
  WifiOff,
  Wind,
  Wrench,
  X,
} from "lucide-react";
import { F, N, budgetLines, budgetPercent } from "@/data/numbers";

const logoUrl = "/images/logo.svg";
const heroImage = "/images/hero-solidarity.png";
const communityImage = "/images/community-circle.jpg";
const mentorshipImage = "/images/mentorship-circle.png";

/** الجملة التي لا تُحذف من أي صفحة تتحدث عن الضغط. من دونها يصير التموضع عذراً جماعياً. */
const PRESSURE_RULE =
  "الضغط يفسّر لماذا نفقد أعصابنا، ولا يبرر ما نفعله بعدها. والمسؤولية عمّا نفعله تبقى كاملة مهما كان الظرف.";

const CAMPAIGN_QUESTION = "مين بيسنِد السَنَد؟";

/* ===== المراحل الأربع: الترتيب هو التصميم ===== */
const phases = [
  {
    id: "zero", number: "00", label: "قبل الإطلاق · أسبوعان", title: "التهيئة",
    ask: "لا يُنشر شيء في هذه المرحلة",
    description: "كل ما يظهر لاحقاً يُبنى ويُختبر هنا، بعيداً عن الأنظار، حتى لا نطلب من أحد أن يجرّب شيئاً غير جاهز.",
    overview: `مرحلة إعداد كاملة قبل أي نشر: تُبنى المنصة وتُختبر على أجهزة فعلية، ويُثبَّت شريك الإحالة كتابياً لا شفهياً، وتُنتج الحزمة الأولى من المحتوى، ويُختار الـ${N.fieldParticipants} عبر شريك مجتمعي بدعوة شخصية لا بإعلان مفتوح.`,
    activities: [
      "بناء المنصة واختبارها على أجهزة حقيقية داخل مواقع النزوح، بما في ذلك سلوكها عند انقطاع الشبكة والكهرباء.",
      "تثبيت شريك الإحالة باتفاق مكتوب: من يستقبل، وخلال كم من الوقت، وبأي رمز، قبل أن يضغط أحد زر «محتاج مساعدة».",
      `اختيار ${N.fieldParticipants} مشاركاً، آباء وشبان مقبلون على الزواج، عبر شريك مجتمعي بدعوة شخصية، لا عبر إعلان مفتوح يجذب من يبحث عن مساعدة مادية.`,
    ],
    outcome: "لا يُنشر شيء في هذه المرحلة. الإطلاق يبدأ بعدها، وبمادة جاهزة لا بوعد.",
    icon: ClipboardCheck, tone: "dusk",
  },
  {
    id: "one", number: "01", label: "الأسبوعان 1 و2", title: `«${CAMPAIGN_QUESTION}» · الاعتراف`,
    ask: "ما نطلبه من الرجل: لا شيء",
    description: "لا تسجيل ولا حضور ولا التزام. مرحلة كاملة وظيفتها أن يُقال له إن ما يحمله مرئي، وأن يُسأل سؤالاً واحداً.",
    overview: "نبدأ من الاعتراف لا من الطلب. من يقف في الطابور ويؤمّن الماء ويحمل الخبر السيئ ويخفيه عن أهل البيت، ويبقى متماسكاً أمام أطفال يراقبون وجهه، وقلّ أن يسأله أحد كيف حاله. هذه المرحلة تسأل، ولا تطلب شيئاً في المقابل.",
    activities: [
      "سلسلة «كيفك إنت؟»: مقاطع قصيرة تبدأ من السؤال الذي لا يُسأل، وبطاقات «الحمل اللي ما بينشاف» تُقرأ في ثوانٍ وتبقى في الهاتف.",
      "مقال أول وبث واتساب أول، بلغة تحكي عن الحمل لا عن اللوم.",
      "قعدة مفتوحة داخل المخيم بلا عنوان تدريبي وبلا استمارات وبلا تصوير. شاي وحلقة وسؤال واحد.",
    ],
    outcome: "المؤشر هنا ليس عدد المتابعين، بل نوع التعليقات. إن كانت من رجال يقولون «هذا أنا» فالباب فُتح.",
    icon: Coffee, tone: "terracotta",
  },
  {
    id: "two", number: "02", label: "الأسبوعان 3 و4", title: "«شايل وما بتشتكي» · الأدوات",
    ask: "ما نطلبه: أن يجرّب أداة واحدة",
    description: "بعد أن فُتح الباب، نضع في الجيب شيئاً يعمل في اللحظة الصعبة نفسها، لا بعدها بيومين.",
    overview: "تُطلق المنصة هنا لأن الباب صار مفتوحاً. الفجوة ليست في المعرفة بل في المسافة بين ما نعرفه وبين اللحظة التي نفقد فيها أعصابنا، وهذه المسافة لا يغطيها منشور، يغطيها شيء يبقى في الجيب ويعمل دون إنترنت.",
    activities: [
      "إطلاق المنصة بشاشاتها السبع، تعمل بعد التحميل الأول حتى مع انقطاع الشبكة والكهرباء.",
      "سلسلة «ستين ثانية»: أداة واحدة في كل مقطع، قابلة للتجربة فوراً بلا تحضير.",
      `مجموعة واتساب تفاعلية، وجلستا «الضغط اللي بنحمله» ضمن اللقاءات الـ${N.fieldMeetings}.`,
    ],
    outcome: `المؤشر الحقيقي هنا ليس التحميل بل العودة الثانية إلى المنصة: ${N.platformSecondVisits} من ${F.platformUsers} يعودون، لأن من يعود عاد لأن الأداة نفعته.`,
    icon: Wrench, tone: "sage",
  },
  {
    id: "three", number: "03", label: "الأسبوعان 5 و6", title: "«القوة اللي بتسنِد» · البيت والعلاقة",
    ask: "ما نطلبه: أن يلتزم بسلوك واحد",
    description: "السؤال المحوري هنا: شو بيكسب الرجل من الشراكة؟ لا ماذا يجب عليه.",
    overview: "الآن فقط، وبعد أن جُرّبت أداة، يصير الحديث عن البيت والعلاقة ممكناً. ندخل من باب المكسب لا من باب الواجب: ما الذي يتغيّر في يومه، وفي نظرة أطفاله إليه، وفي البيت كله، حين تتحول الرعاية من عبء فردي إلى شراكة.",
    activities: [
      "مقابلات «أب مش بس معيل» وسلسلة «كلمة بتفرق»: جملة واحدة تُقال بدل جملة تُقال عادةً.",
      "إطلاق لعبة السيناريوهات: كل خيار يُظهر نتيجته بعد أسبوع بدل أن يُقيَّم صواباً أو خطأ.",
      "جلستان واللقاء العائلي، ولقاء منفصل للزوجات تيسّره امرأة، بلا تصوير وبلا اقتباس.",
    ],
    outcome: `${N.commitments} التزاماً مسجّلاً على المنصة، والتزام واحد لكل شخص لا قائمة التزامات. ${PRESSURE_RULE}`,
    icon: HeartHandshake, tone: "dusk",
  },
  {
    id: "four", number: "04", label: "الأسبوعان 7 و8", title: "«سَنَد لغيره» · التوسع",
    ask: "ما نطلبه: أن ينقل ما وصله",
    description: "آخر مرحلة لا تضيف محتوى جديداً من الفريق، بل تنقل الإنتاج إلى المشاركين أنفسهم.",
    overview: `من وصل إلى هنا لم يعد متلقياً. ${N.ambassadors} من المشاركين يُدرَّبون على التصوير بالهاتف وينتجون ${N.videosAmbassadors} مقاطع بأنفسهم، ويُنشر المنهج كاملاً في حزمة مفتوحة تتيح لأي جهة تنفيذ دورة ثانية دون البدء من الصفر.`,
    activities: [
      `تدريب ${N.ambassadors} سفراء على التصوير بالهاتف، ونشر ${N.videosAmbassadors} مقاطع من إنتاجهم هم.`,
      "تحدي «أسبوع بلا صوت عالي»: التزام جماعي قصير المدة يُحكى في المجموعة لا يُراقب من الفريق.",
      "«حكايات من عنا»: قصص المشاركين بأصواتهم، ثم الحزمة المفتوحة والتقرير الختامي.",
    ],
    outcome: "الحزمة المفتوحة هي المخرج الحقيقي: منهج وأدوات قياس ومحتوى يبقى بعد إغلاق التمويل الأول.",
    icon: Sparkles, tone: "terracotta",
  },
];

/* ===== المنصة: التدخّل نفسه، لا بروشور تعريفي ===== */
const platformScreens = [
  ["01", "كيفك اليوم؟", "ثلاثة أسئلة قصيرة تعطي نقطة بداية بلا تصنيف ولا تشخيص.", Activity],
  ["02", "خُد نفَس", "ستون ثانية تهدئة عند الشعور بالانفجار، ثم جملتان جاهزتان للنسخ.", Wind],
  ["03", "أدوات", "أدوات عملية قصيرة قابلة للتنزيل والطباعة: النوم، الضغط، التواصل.", Wrench],
  ["04", "شو بتعمل لو", "لعبة سيناريوهات قرار من مواقف حقيقية. كل خيار يُظهر نتيجته بعد أسبوع بدل أن يُقيَّم صواباً أو خطأ.", GitBranch],
  ["05", "حكايات من عنا", "قصص ومقابلات من المشاركين أنفسهم.", MessagesSquare],
  ["06", "التزام الأسبوع", "التزام واحد يُسجَّل وتذكير يومي يعمل دون شبكة.", ClipboardCheck],
  ["07", "محتاج مساعدة", "زر مباشر إلى مسار الإحالة برمز لا باسم، دون تسجيل أي بيانات.", LifeBuoy],
] as const;

const platformNotes = [
  ["تعمل دون إنترنت", "تُثبَّت على الهاتف وتشتغل بعد التحميل الأول حتى مع انقطاع الشبكة والكهرباء. في غزة هذا شرط وجود لا ميزة إضافية.", WifiOff],
  ["الخصوصية بالتصميم", "لا تُخزَّن أسماء ولا أرقام هواتف. الإحالة برمز لا باسم. زر ظاهر دائماً يمسح كل شيء من الجهاز فوراً. وكل المحتوى متاح مطبوعاً لمن لا يملك هاتفاً يعمل.", Lock],
] as const;

/* ===== نقاط الصفحات الافتتاحية: عنوان قصير + جملة واحدة، لا فقرات ===== */
const problemPoints = [
  ["الصورة النمطية", "صورة الرجل الذي لا ينكسر تجعل الاعتراف بالتعب هزيمة، فيبقى الحمل صامتاً.", ShieldCheck],
  ["الحمل اللي انورّثناه", "أنماط تعامل تعلّمناها في بيوتنا قبل أن نختارها، فنعيدها دون أن ننتبه.", Repeat],
  ["ضغط متراكم وحياة تغيّرت", "الطابور، والماء، والخبر السيئ الذي يحمله ويخفيه عن أهل البيت.", Clock3],
  ["أدوار جديدة بلا تدريب", "صار حاضراً في البيت طوال اليوم بعد أن كان خارجه، وبلا أدوات لهذا الدور.", UsersRound],
  ["غياب الباب والمساحة معاً", "قلّ أن يسأله أحد كيف حاله، وقلّ أن يجد باباً يطرقه لو أراد.", HeartHandshake],
] as const;

const gapPoints = [
  ["الإغاثة تسدّ الجوع", "البرامج القائمة تغطي الاحتياج المادي، وهذا ضروري لكنه غير كافٍ.", HeartHandshake],
  ["الرجل خارج المعادلة", "الدعم النفسي-الاجتماعي نادراً ما يصل إلى الرجل نفسه، رغم أنه يحمل ما يحمل.", AlertTriangle],
  ["الفجوة ليست في المعرفة", "أغلب الآباء يعرفون أن الصراخ لا ينفع. الفجوة في اللحظة، لا في المعلومة.", Clock3],
] as const;

const solutionPoints = [
  ["منصة تعمل دون إنترنت", "سبع شاشات تبقى في الجيب وتعمل بعد التحميل الأول بلا شبكة ولا كهرباء."],
  ["حملة بلغة تحترم الرجل", `${N.videos} مقطعاً و${N.cards} بطاقة و${N.articles} مقالات تبدأ من «${CAMPAIGN_QUESTION}» لا من اللوم.`],
  ["مسار ميداني مع 30 مشاركاً", `${N.fieldMeetings} لقاءً على ${N.phaseCount} مراحل، بدعوة شخصية عبر شريك مجتمعي.`],
  ["ترتيب لا يُقفز", "كل مرحلة تطلب أكثر من سابقتها، ولا تطلب شيئاً قبل أن تعطي."],
] as const;

/* ===== آلية العمل: الغرفة تصنع المادة، والمنصة توسّع مداها ===== */
const fieldArm = [
  [`${N.fieldMeetings} لقاءً على ${N.phaseCount} مراحل`, `مع ${N.fieldParticipants} مشاركاً: آباء وشبان مقبلون على الزواج، على مدى ${N.weeks} أسابيع.`],
  ["دعوة شخصية لا إعلان مفتوح", "الاختيار عبر شريك مجتمعي يعرف الناس، لا عبر استمارة تجذب من يبحث عن مساعدة مادية."],
  ["تبدأ بقعدة بلا استمارات", "لا عنوان تدريبي ولا تصوير في اللقاء الأول. شاي وحلقة وسؤال واحد."],
  ["اللقاء العائلي ولقاء الزوجات", "لقاء منفصل للزوجات تيسّره امرأة، بلا تصوير وبلا اقتباس."],
  [`${N.fieldCompleters} من ${N.fieldParticipants} يكملون`, `${N.fieldCompletionRate} إكمال هو المستهدف الواقعي في بيئة نزوح متكرر، لا 100%.`],
] as const;

const digitalArm = [
  ["المنصة، لا الموقع التعريفي", "سبع شاشات تعمل دون إنترنت، وهي التدخّل نفسه لا واجهة تشرحه."],
  [`${N.videos} مقطعاً`, `${N.videosTeam} من الفريق و${N.videosAmbassadors} من السفراء أنفسهم في المرحلة الرابعة.`],
  [`${N.cards} بطاقة و${N.articles} مقالات`, "بطاقات تُقرأ في ثوانٍ وتُطبع لمن لا يملك هاتفاً، ومقالات تبقى قابلة للإيجاد عبر البحث."],
  ["بث واتساب ومجموعة تفاعلية", "الوصول إلى من لا يفتح المنصات، بالقناة التي يستعملها فعلاً."],
  [`${F.digitalReach} حساب فريد`, `و${F.platformUsers} يدخلون المنصة، و${N.platformSecondVisits} يعودون مرة ثانية.`],
] as const;

const armBridge = [
  ["من الغرفة إلى الشاشة", "ما يُقال في اللقاء يتحول إلى مقطع ومقال وأداة على المنصة، بموافقة أصحابه ودون بيانات تدل عليهم."],
  ["من الشاشة إلى الغرفة", "المحتوى يفتح الباب لمن لا يستطيع الحضور، ويصل إلى بيوت لن تدخلها جلسة أبداً."],
] as const;

/* ===== كفاءة التكلفة: أرقام مشتقة حسابياً من الميزانية والمستهدفات المعتمدة ===== */
const costEfficiency = [
  [`$${N.costPerBeneficiary}`, "لكل مستفيد مباشر", `${F.budgetTotal} ÷ ${N.directBeneficiaries} مستفيداً مباشراً: ${N.fieldParticipants} ميدانياً و${N.digitalCompleters} رقمياً.`, UsersRound],
  [`$${N.costPerReach}`, "لكل حساب فريد", `${F.budgetTotal} ÷ ${F.digitalReach} حساب فريد عبر الحملة والمحتوى القصير.`, Globe2],
  [F.totalValue, "القيمة الكلية للمبادرة", `${F.budgetTotal} من الممول و${F.inKind} مساهمة عينية، فيغطي الممول ${N.funderShare}.`, WalletCards],
  [`$${N.hostingPerYear}`, "كلفة بقاء المنصة سنوياً", "بعد إغلاق التمويل الأول، تبقى المنصة تعمل بكلفة استضافة لا تتجاوز هذا الرقم.", Globe2],
] as const;

/* ===== سجل المخاطر ===== */
const risks = [
  ["تعذر اللقاءات الميدانية", "مرتفع", "التحول إلى مجموعات مصغرة أو مجموعة مغلقة، مع الإبقاء على الترتيب نفسه. المنصة تعمل بلا شبكة، فلا تتوقف المرحلة بتوقف التجمع."],
  ["انقطاع الكهرباء والاتصال", "مرتفع", "المنصة تُثبَّت على الهاتف وتعمل بعد التحميل الأول دون إنترنت، وكل المحتوى متاح مطبوعاً لمن لا يملك هاتفاً يعمل."],
  ["أن تُقرأ اللغة كعذر", "مرتفع", `${PRESSURE_RULE} الجملة مثبتة في كل مادة تتحدث عن الضغط، وكل ميسّر مدرَّب على قولها داخل الغرفة لا في المطبوعات وحدها.`],
  ["تعرّض الشريكة للخطر عند القياس", "متوسط", "لقاء الزوجات منفصل بلا تصوير وبلا اقتباس، وتُقرأ نتائجه كأنماط عامة لا كشهادات فردية يمكن ردّها إلى قائلتها."],
  ["النزوح المتكرر للمشاركين", "متوسط", `قائمة احتياطية في كل موقع، والمتابعة عبر السفراء لا عبر المكان. الالتزام مسجّل على جهاز المشارك لا على كشف حضور، فينتقل معه.`],
  ["حساسية مجتمعية تجاه الموضوع", "متوسط", "الدخول عبر شريك مجتمعي بدعوة شخصية، والمرحلة الأولى لا تطلب شيئاً، فلا يوجد ما يُرفض قبل أن تُبنى الثقة."],
] as const;

const sustainabilityPillars = [
  [`${N.ambassadors} سفراء`, "قدرة بشرية باقية", `ثمانية من المشاركين يُدرَّبون في المرحلة الرابعة على التصوير بالهاتف، وينتجون ${N.videosAmbassadors} مقاطع بأنفسهم قبل إغلاق المشروع.`, Sparkles],
  [`منصة بـ$${N.hostingPerYear} سنوياً`, "تبقى بعد التمويل", `المنصة تعمل بكلفة استضافة لا تتجاوز ${N.hostingPerYear} دولاراً في السنة، فبقاؤها لا يحتاج دورة تمويل ثانية.`, Globe2],
  ["مقالات قابلة للإيجاد", "وصول متجدد بلا إنفاق", `المقالات الستة تبقى في نتائج البحث، فيصل إليها من يبحث عن كلامه بعد انتهاء النشر المموّل.`, FileText],
  ["الحزمة المفتوحة", "جاهزة لدورة ثانية", "المنهج وأدوات القياس والمحتوى تُنشر مفتوحة، بحيث تستطيع أي جهة تنفيذ دورة ثانية دون البدء من الصفر.", Waypoints],
] as const;

const partnershipTiers = [
  ["شريك مؤسس", F.budgetTotal, "تمويل كامل", ["تغطية البنود الثلاثة كاملة: المنصة والميدان والحماية", "ظهور اسم الشريك على المنصة والمواد الرقمية والحزمة المفتوحة", "تقرير أثر بالفواتير وبيانات القياس لكل مرحلة", "حق تبنّي دورة ثانية عبر الحزمة المفتوحة"], "founding"],
  ["شريك المنصة", F.budgetDigital, "المحور الرقمي", [`بناء المنصة واستضافتها وإنتاج ${N.videos} مقطعاً و${N.cards} بطاقة و${N.articles} مقالات`, `ارتباط مباشر بـ${F.platformUsers} مستخدماً و${F.digitalReach} حساب فريد`, "تقرير بأرقام العودة الثانية، لا بأرقام التحميل وحدها"], "digital"],
  ["شريك المسار الميداني", F.budgetField, "اللقاءات", [`تمويل ${N.fieldMeetings} لقاءً مع ${N.fieldParticipants} مشاركاً على ${N.phaseCount} مراحل`, "المادة الخام التي تتغذى منها المنصة كلها", "قصص أثر من المشاركين أنفسهم وبموافقتهم"], "field"],
  ["شريك الحماية والقياس", F.budgetProtection, "الضمانة المهنية", ["تثبيت مسار الإحالة مع شريك مختص وتدريب الفريق عليه", "أدوات القياس ولقاء الزوجات المنفصل بشروطه الآمنة", "تقرير حدود القياس صريحاً لا انتقائياً"], "inkind"],
] as const;

/* ===== الأثر: مؤشر واحد لكل مرحلة، وما لا ندّعيه مكتوب صراحة ===== */
const impactIndicators = [
  ["المرحلة الأولى · الاعتراف", F.digitalReach, "حساب فريد", "المؤشر الحقيقي: نوع التعليقات لا عددها. إن كانت من رجال يقولون «هذا أنا» فالباب فُتح.", Globe2],
  ["المرحلة الثانية · الأدوات", String(N.platformSecondVisits), `عودة ثانية من ${F.platformUsers}`, "العودة الثانية هي المقياس، لأن من يعود عاد لأن الأداة نفعته لا لأننا وصلنا إليه.", Repeat],
  ["المرحلة الثالثة · البيت والعلاقة", String(N.commitments), "التزام مسجّل", `و${N.fieldCompleters} من ${N.fieldParticipants} يكملون المسار الميداني، أي ${N.fieldCompletionRate}.`, ClipboardCheck],
  ["المرحلة الرابعة · التوسع", String(N.ambassadors), `سفراء و${N.videosAmbassadors} مقاطع`, "مقاطع من إنتاجهم هم، لا من إنتاج الفريق. هذا هو الفرق بين المتلقي والناقل.", Sparkles],
  ["عبر المراحل · الحماية", "100%", "من الحالات المقبولة تُحال", "سجل الإحالة بالرمز مع الشريك المختص، دون اسم ودون بيانات تدل على صاحبها.", ShieldCheck],
] as const;

const measurementLimits =
  "أضعف أداة قياس هي تقرير الرجل عن نفسه، وأقوى أداة هي تقرير الشريكة، لكنه قد يعرّضها للخطر. لذلك يُصمَّم لقاء الزوجات المنفصل بلا تصوير وبلا اقتباس، وتُقرأ نتائجه كأنماط عامة لا كشهادات فردية.";

/* ===== مكتبة المحتوى: 24 مقطعاً و24 بطاقة و6 مقالات ===== */
const contentSeries = [
  ["كيفك إنت؟", "المرحلة الأولى", "6 مقاطع"],
  ["الحمل اللي ما بينشاف", "المرحلة الأولى", "8 بطاقات"],
  ["ستين ثانية", "المرحلة الثانية", "6 مقاطع"],
  ["الضغط اللي بنحمله", "المرحلة الثانية", "8 بطاقات"],
  ["أب مش بس معيل", "المرحلة الثالثة", "4 مقاطع"],
  ["كلمة بتفرق", "المرحلة الثالثة", "8 بطاقات"],
  ["حكايات من عنا", "المرحلة الرابعة", `${N.videosAmbassadors} مقاطع من السفراء`],
  ["مقالات الحملة", "عبر المراحل", `${N.articles} مقالات`],
] as const;

/* ===== الخطة: ثمانية أسابيع فوق أربع مراحل ===== */
const weeks = [
  ["01", `«${CAMPAIGN_QUESTION}» تنطلق`, "فريق المحتوى + الشريك المجتمعي", ["إطلاق سلسلة «كيفك إنت؟»", "نشر بطاقات «الحمل اللي ما بينشاف»", "أول بث واتساب ومقال الحملة الأول"], "أول موجة وصول، ولا طلب تسجيل من أحد"],
  ["02", "القعدة المفتوحة داخل المخيم", "فريق التيسير الميداني", ["قعدة بلا عنوان تدريبي وبلا استمارات وبلا تصوير", `تثبيت الـ${N.fieldParticipants} المختارين بدعوة شخصية`, "قراءة نوع التعليقات لا عددها"], "باب مفتوح ومجموعة ميدانية مكتملة"],
  ["03", "إطلاق المنصة", "مسؤولة التصميم والمحتوى البصري + التقنية", ["فتح المنصة بشاشاتها السبع", "بدء سلسلة «ستين ثانية»", "تشغيل مجموعة واتساب التفاعلية"], "منصة تعمل دون إنترنت على أجهزة المستخدمين"],
  ["04", "«الضغط اللي بنحمله»", "فريق التيسير + المنصة", ["جلستا الأدوات ضمن المسار الميداني", "الدفعة الثانية من «ستين ثانية»", "متابعة العودة الثانية إلى المنصة"], `${N.platformSecondVisits} عودة ثانية من ${F.platformUsers} دخول`],
  ["05", "«أب مش بس معيل»", "فريق الإنتاج + التيسير", ["تصوير مقابلات الآباء داخل المواقع", "نشر سلسلة «كلمة بتفرق»", "إطلاق لعبة السيناريوهات على المنصة"], "لعبة قرار تعمل، ومقابلات من داخل المخيم"],
  ["06", "اللقاء العائلي ولقاء الزوجات", "مسؤولة الحماية والإحالة + التيسير", ["جلستان ضمن مسار البيت والعلاقة", "اللقاء العائلي المشترك", "لقاء منفصل للزوجات تيسّره امرأة، بلا تصوير وبلا اقتباس"], `${N.commitments} التزاماً مسجّلاً على المنصة`],
  ["07", "تدريب السفراء", "فريق المحتوى + المتابعة والتقييم", [`تدريب ${N.ambassadors} سفراء على التصوير بالهاتف`, "إطلاق تحدي «أسبوع بلا صوت عالي»", "جمع «حكايات من عنا» بأصوات أصحابها"], `${N.ambassadors} سفراء جاهزون للإنتاج بأنفسهم`],
  ["08", "الحزمة المفتوحة والإغلاق", "مدير المبادرة + مسؤولة المتابعة والتقييم", [`نشر ${N.videosAmbassadors} مقاطع من إنتاج السفراء`, "إصدار الحزمة المفتوحة كاملة", "تسليم التقرير الختامي بالفواتير وبيانات القياس"], "حزمة مفتوحة تتيح لأي جهة تنفيذ دورة ثانية"],
] as const;

const faqs = [
  ["هل المبادرة تحمّل الرجل مسؤولية ما يحدث في البيت؟", `${PRESSURE_RULE} هذا مثبت في كل مادة نصدرها. لكن نقطة البداية مختلفة: نبدأ من الرجل الذي يقف في الطابور ويؤمّن الماء ويحمل الخبر السيئ ويخفيه عن أهل البيت، ويبقى متماسكاً أمام أطفال يراقبون وجهه، وقلّ أن يسأله أحد كيف حاله.`],
  ["لماذا 30 مشاركاً فقط في الميدان؟", `لأن العدد ليس الهدف. الثلاثون يُختارون عبر شريك مجتمعي بدعوة شخصية لا بإعلان مفتوح، ويكملون ${N.fieldMeetings} لقاءً على ${N.phaseCount} مراحل. والجلسة ليست النشاط، هي مصدر المادة: ما يُقال في الغرفة يتحول إلى مقطع ومقال وأداة على المنصة التي تصل إلى ${F.platformUsers} مستخدم و${F.digitalReach} حساب فريد.`],
  ["لماذا الترتيب مهم إلى هذه الدرجة؟", "لأن الترتيب هو التصميم. المرحلة الأولى لا تطلب شيئاً: لا تسجيل ولا حضور ولا التزام. الثانية تطلب تجربة أداة واحدة، والثالثة التزاماً واحداً، والرابعة أن ينقل ما وصله. من يبدأ بالمرحلة الثالثة لن يجد أحداً في القاعة."],
  ["ما الذي يجعل المنصة تدخّلاً لا بروشوراً؟", "الفجوة ليست في المعرفة. أغلب الآباء يعرفون أن الصراخ لا ينفع. الفجوة في المسافة بين ما يعرفونه وبين اللحظة التي يفقدون فيها أعصابهم: الجلسة انتهت الثلاثاء، والانفجار يأتي الجمعة. المنصة تبقى في الجيب وتعمل دون إنترنت، فتكون حاضرة في تلك اللحظة نفسها."],
  ["كيف تُنفق الميزانية بالضبط؟", `${F.budgetDigital} للمنصة والمحتوى الرقمي (${budgetPercent(N.budgetDigital)})، و${F.budgetField} للمسار الميداني (${budgetPercent(N.budgetField)})، و${F.budgetProtection} للحماية والقياس (${budgetPercent(N.budgetProtection)}). يضاف إليها مساهمة عينية بقيمة ${F.inKind}، فتصبح القيمة الكلية ${F.totalValue} ويغطي الممول ${N.funderShare} منها. الكلفة ${N.costPerBeneficiary} دولار لكل مستفيد مباشر.`],
  ["ماذا تقيسون فعلاً في ثمانية أسابيع؟", `ما يمكن إثباته فقط: ${F.digitalReach} حساب فريد ونوع التعليقات لا عددها، و${F.platformUsers} دخولاً إلى المنصة و${N.platformSecondVisits} عودة ثانية، و${N.commitments} التزاماً مسجّلاً، و${N.fieldCompleters} من ${N.fieldParticipants} يكملون، و100% من الحالات المقبولة تُحال. ${measurementLimits}`],
  ["كيف تحمون خصوصية المشاركين؟", "لا تُخزَّن أسماء ولا أرقام هواتف على المنصة. الإحالة برمز لا باسم، وزر ظاهر دائماً يمسح كل شيء من الجهاز فوراً. ولقاء الزوجات منفصل بلا تصوير وبلا اقتباس، وتُقرأ نتائجه كأنماط عامة لا كشهادات فردية."],
] as const;

const teamRoles = [
  ["الحماية والإحالة", "قرار الإحالة وشروط الأمان", ShieldCheck],
  ["المتابعة والتقييم", "ما يُقاس وما لا يُدّعى", BarChart3],
  ["التصميم والمحتوى البصري", "شكل المنصة ولغتها البصرية", Sparkles],
] as const;

/* ===== تسلسل إقناع: مشكلة ← فجوة ← حل ← آلية ← ترتيب ← أداة ← خطة ← أثر ← كلفة ← ضمانات ← أسئلة ← طلب ===== */
const pageTitles = [
  "الغلاف", "المشكلة", "الفجوة", "الحل", "آلية العمل", "المراحل الأربع", "المنصة",
  "الخطة الزمنية", "الأثر والقياس", "الكلفة والعائد", "الضمانات", "الأسئلة الشائعة", "الشراكة والتواصل",
];
const pageQuestions: Record<number, string> = {
  1: CAMPAIGN_QUESTION, 2: "لماذا لا يكفي ما هو قائم؟", 3: "ما الذي نقدّمه؟", 4: "كيف تعمل المبادرة؟",
  5: "بأي ترتيب؟", 6: "وماذا يبقى في الجيب؟", 7: "متى يحدث كل شيء؟", 8: "ما الذي نقيسه فعلاً؟",
  9: "أين يذهب كل دولار؟", 10: "وماذا لو تغيّرت الظروف؟", 11: "أسئلة الشركاء", 12: "ما المطلوب منكم؟",
};
const pageRoutes: Record<string, number> = {
  problem: 1, gap: 2, solution: 3, mechanism: 4, phases: 5, platform: 6, plan: 7,
  impact: 8, budget: 9, assurance: 10, faq: 11, partnership: 12,
};
const pageSlugs: Record<number, string> = Object.fromEntries(Object.entries(pageRoutes).map(([slug, page]) => [page, slug]));

type ViewMode = "story" | "book" | "scroll";

const storyScenes = [
  { number: "01", label: "المشهد الأول", title: CAMPAIGN_QUESTION, intro: "هو من يقف في الطابور، ويؤمّن الماء، ويحمل الخبر السيئ ويخفيه عن أهل البيت، ويبقى متماسكاً أمام أطفال يراقبون وجهه. وقلّ أن يسأله أحد كيف حاله.", prompt: "ابدأ من السؤال الذي لا يُسأل.", page: 0, image: heroImage, caption: "ملاحظة ميدانية · الحمل الذي لا يُرى", tone: "opening" },
  { number: "02", label: "المشهد الثاني", title: "الحمل اللي ما بينشاف", intro: "صورة الرجل الذي لا ينكسر تجعل الاعتراف بالتعب هزيمة. فيبقى الحمل صامتاً، ويخرج بعد ذلك من باب آخر.", prompt: "هنا تتغير زاوية النظر.", page: 1, image: communityImage, caption: "ما يُحمل في الصمت", tone: "warm" },
  { number: "03", label: "المشهد الثالث", title: "الضغط يفسّر ولا يبرر", intro: "الضغط يفسّر لماذا نفقد أعصابنا، ولا يبرر ما نفعله بعدها. والمسؤولية عمّا نفعله تبقى كاملة مهما كان الظرف. من دون هذه الجملة يصير كل ما نقوله عذراً.", prompt: "هذا هو الخط الذي لا نتجاوزه.", page: 1, image: mentorshipImage, caption: "تفسير، لا تبرير", tone: "blue" },
  { number: "04", label: "المشهد الرابع", title: "الفجوة ليست في المعرفة", intro: "أغلب الآباء يعرفون أن الصراخ لا ينفع. الفجوة في المسافة بين ما يعرفونه وبين اللحظة التي يفقدون فيها أعصابهم. الجلسة انتهت الثلاثاء، والانفجار يأتي الجمعة.", prompt: "هذه المسافة لا يغطيها منشور.", page: 2, image: communityImage, caption: "بين المعرفة واللحظة", tone: "sage" },
  { number: "05", label: "المشهد الخامس", title: "شيء يبقى في الجيب", intro: "منصة بسبع شاشات تعمل دون إنترنت وتُثبَّت على الهاتف. في غزة هذا شرط وجود لا ميزة إضافية، ولا تُخزَّن فيها أسماء ولا أرقام.", prompt: "افتح المنصة وشاهد ماذا تحوي.", page: 6, image: heroImage, caption: "التدخّل نفسه · لا واجهة تشرحه", tone: "terracotta" },
  { number: "06", label: "المشهد السادس", title: "الترتيب هو التصميم", intro: `أربع مراحل: الأولى لا تطلب شيئاً، والثانية تطلب تجربة أداة، والثالثة التزاماً واحداً، والرابعة أن ينقل ما وصله. من يبدأ بالمرحلة الثالثة لن يجد أحداً في القاعة.`, prompt: "اقرأ الترتيب كاملاً.", page: 5, image: communityImage, caption: `${N.phaseCount} مراحل · ${N.weeks} أسابيع`, tone: "sand" },
  { number: "07", label: "المشهد السابع", title: "الجلسة ليست النشاط", intro: "هي مصدر المادة. ما يُقال في الغرفة يتحول إلى مقطع ومقال وأداة على المنصة، فيصل إلى بيوت لن تدخلها جلسة أبداً.", prompt: "هكذا تتغذى الذراعان من بعضهما.", page: 4, image: mentorshipImage, caption: "من الغرفة إلى الشاشة", tone: "sage" },
  { number: "08", label: "المشهد الثامن", title: "ما لا ندّعيه", intro: `لا ندّعي إثبات ما لا يُثبَت في ${N.weeks} أسابيع. نقيس ما يمكن إثباته: العودة الثانية إلى المنصة، والالتزام المسجّل، ونوع التعليقات لا عددها.`, prompt: "الصدق في القياس جزء من التصميم.", page: 8, image: communityImage, caption: "مؤشر لكل مرحلة", tone: "blue" },
  { number: "09", label: "المشهد الأخير", title: "سَنَد لغيره", intro: `${N.ambassadors} سفراء ينتجون بأنفسهم، ومنصة تبقى بكلفة ${N.hostingPerYear} دولاراً سنوياً، وحزمة مفتوحة تتيح لأي جهة تنفيذ دورة ثانية. الدور الآن لكم.`, prompt: "أكمل الحكاية من المكان الذي تعرفه.", page: 12, image: mentorshipImage, caption: "ما يبقى بعد الأسبوع الثامن", tone: "closing" },
];

function SectionKicker({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`notebook-kicker ${light ? "notebook-kicker--light" : ""}`}><span />{children}<b>✦</b></div>;
}

export default function Home() {
  const [location, setLocation] = useLocation();
  const [viewMode, setViewMode] = useState<ViewMode>("book");
  const [nightMode, setNightMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contentsOpen, setContentsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => pageRoutes[location.replace(/^\//, "")] ?? 0);
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [modal, setModal] = useState<"guide" | "story" | "budget" | null>(null);
  const [turnDirection, setTurnDirection] = useState<"next" | "prev">("next");
  const touchStart = useRef<number | null>(null);

  // وضع القصة تسلسل مستقل من 9 مشاهد، بينما الدفتر 13 صفحة، فلكل وضع حدّه الخاص.
  const maxIndex = viewMode === "story" ? storyScenes.length - 1 : pageTitles.length - 1;

  const goPage = (page: number) => {
    const bounded = Math.max(0, Math.min(maxIndex, page));
    setTurnDirection(bounded >= currentPage ? "next" : "prev");
    setCurrentPage(bounded);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (viewMode !== "book") return;
    const path = pageSlugs[currentPage] ? `/${pageSlugs[currentPage]}` : "/";
    setLocation(path, { replace: true });
  }, [currentPage, viewMode, setLocation]);

  // عند التبديل إلى وضع القصة من صفحة دفتر متقدمة، أعِد المؤشر إلى آخر مشهد متاح.
  useEffect(() => {
    if (viewMode === "story" && currentPage > storyScenes.length - 1) setCurrentPage(storyScenes.length - 1);
  }, [viewMode, currentPage]);

  const go = (key: string) => {
    setMenuOpen(false);
    if (viewMode !== "scroll") goPage(pageRoutes[key] ?? 0);
    else document.getElementById(`scroll-${key}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Book mode shows pages in two-page spreads (page 0 = cover, then 1+2, 3+4, ...).
  const pairStartOf = (page: number) => (page === 0 ? 0 : page % 2 === 1 ? page : page - 1);
  const spreadOf = (page: number) => (page === 0 ? 0 : Math.ceil(page / 2));
  const maxSpread = Math.ceil((pageTitles.length - 1) / 2);
  const spreadToPage = (spread: number) => (spread === 0 ? 0 : spread * 2 - 1);

  const stepForward = () => {
    if (viewMode !== "book") { goPage(currentPage + 1); return; }
    goPage(spreadToPage(Math.min(maxSpread, spreadOf(currentPage) + 1)));
  };
  const stepBackward = () => {
    if (viewMode !== "book") { goPage(currentPage - 1); return; }
    goPage(spreadToPage(Math.max(0, spreadOf(currentPage) - 1)));
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (viewMode === "scroll" || modal || contentsOpen) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowDown") stepForward();
      if (event.key === "ArrowRight" || event.key === "ArrowUp") stepBackward();
      if (event.key === "Escape") { setContentsOpen(false); setModal(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentPage, viewMode, modal, contentsOpen]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => { touchStart.current = event.clientX; };
  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (touchStart.current === null || viewMode === "scroll") return;
    const delta = event.clientX - touchStart.current;
    if (Math.abs(delta) > 55) (delta < 0 ? stepForward : stepBackward)();
    touchStart.current = null;
  };

  // ترويسة موحّدة: رقم الصفحة + السؤال الذي تجيب عنه، فيبقى التسلسل مرئياً في كل صفحة.
  const pageMark = (page: number) => <div className="page-number">{String(page + 1).padStart(2, "0")} <span>/ {pageTitles.length}</span></div>;
  const pageAsk = (page: number) => pageQuestions[page] ? <div className="page-ask">{pageQuestions[page]}</div> : null;
  const nextLink = (page: number) => page >= pageTitles.length - 1 ? null
    : <button className="page-next-link" onClick={() => goPage(page + 1)}>التالي: {pageTitles[page + 1]} <ArrowLeft size={14} /></button>;

  const renderPage = (page: number) => {
    if (page === 0) return <article className="notebook-page notebook-cover">
      <div className="cover-label">مقترح شراكة <span>2026</span></div>
      <div className="cover-scribble">✦</div>
      <div className="cover-layout">
        <div className="cover-copy">
          <SectionKicker>مبادرة مجتمعية · قطاع غزة</SectionKicker>
          <h1>سَنَد<br /><em>وعَمّار</em></h1>
          <div className="cover-question">{CAMPAIGN_QUESTION}</div>
          <p>هو من يقف في الطابور، ويؤمّن الماء، ويحمل الخبر السيئ ويخفيه عن أهل البيت، ويبقى متماسكاً أمام أطفال يراقبون وجهه. وقلّ أن يسأله أحد كيف حاله.</p>
          <div className="cover-line" />
          <div className="cover-figures">
            <div><strong>{N.directBeneficiaries}</strong><span>مستفيدًا مباشرًا</span></div>
            <div><strong>{N.costPerBeneficiary}$</strong><span>للمستفيد</span></div>
            <div><strong>0{N.weeks}</strong><span>أسابيع</span></div>
          </div>
          <button className="notebook-primary" onClick={() => goPage(pageRoutes.platform)}>ادخل إلى المنصة <ArrowLeft size={17} /></button>
        </div>
        <div className="cover-visual">
          <img src={heroImage} alt="أب وطفل داخل مخيم نزوح في غزة" />
          <div className="cover-stamp"><span>الكلفة</span><strong>{N.costPerBeneficiary}$ للمستفيد</strong><i>✦</i></div>
          <small>مبادرة مجتمعية · قطاع غزة</small>
        </div>
      </div>
      <div className="cover-footer"><span>{N.startDate} إلى {N.endDate}</span><span>سَنَد وعَمّار / 2026</span></div>
    </article>;

    if (page === 1) return <article className="notebook-page page-problem">
      {pageMark(page)}
      <SectionKicker>المشكلة</SectionKicker>
      {pageAsk(page)}
      <h2 className="page-title">شايل، <em>وما بيشتكي.</em></h2>
      <div className="point-list point-list--compact">{problemPoints.map(([title, text, Icon]) => <div key={title}><Icon size={18} /><div><strong>{title}</strong><p>{text}</p></div></div>)}</div>
      <blockquote className="context-quote pressure-rule"><Quote size={19} /><p>{PRESSURE_RULE}</p></blockquote>
      {nextLink(page)}
    </article>;

    if (page === 2) return <article className="notebook-page page-gap">
      {pageMark(page)}
      <SectionKicker>الفجوة</SectionKicker>
      {pageAsk(page)}
      <h2 className="page-title">الإغاثة تسدّ الجوع، <em>ولا أحد يسأل كيف حاله.</em></h2>
      <div className="point-list">{gapPoints.map(([title, text, Icon]) => <div key={title}><Icon size={18} /><div><strong>{title}</strong><p>{text}</p></div></div>)}</div>
      <div className="gap-callout"><strong>الخلاصة</strong><p>الجلسة انتهت الثلاثاء، والانفجار يأتي الجمعة. الفراغ ليس في المعلومة ولا في الإغاثة، بل في وجود باب يطرقه الرجل ومساحة تسأله: كيفك إنت؟</p></div>
      {nextLink(page)}
    </article>;

    if (page === 3) return <article className="notebook-page page-solution">
      {pageMark(page)}
      <SectionKicker>الحل</SectionKicker>
      {pageAsk(page)}
      <div className="solution-layout">
        <div>
          <h2 className="page-title">ثلاثة أجزاء <em>متصلة.</em></h2>
          <div className="point-list point-list--compact">{solutionPoints.map(([title, text]) => <div key={title}><Check size={16} /><div><strong>{title}</strong><p>{text}</p></div></div>)}</div>
        </div>
        <div className="page-photo"><img src={mentorshipImage} alt="قعدة داخل مخيم نزوح في غزة" /><span>قعدة مفتوحة · بلا استمارات</span></div>
      </div>
      <div className="solution-pivot"><Waypoints size={16} /><p>الجلسة ليست النشاط، هي مصدر المادة. ما يُقال في الغرفة يتحول إلى مقطع ومقال وأداة على المنصة.</p></div>
      <button className="small-text-action" onClick={() => setModal("guide")}><Video size={14} /> مكتبة المحتوى: {N.videos} مقطعًا و{N.cards} بطاقة و{N.articles} مقالات</button>
      {nextLink(page)}
    </article>;

    if (page === 4) return <article className="notebook-page page-mechanism">
      {pageMark(page)}
      <SectionKicker>آلية العمل</SectionKicker>
      {pageAsk(page)}
      <h2 className="page-title">ذراعان تعملان <em>معًا.</em></h2>
      <div className="arms-grid">
        <div className="arm-card arm-card--field">
          <div className="arm-card-head"><UsersRound size={19} /><div><small>الذراع الأولى</small><strong>الغرفة · المسار الميداني</strong></div></div>
          <ul>{fieldArm.map(([title, text]) => <li key={title}><Check size={13} /><div><b>{title}</b><span>{text}</span></div></li>)}</ul>
        </div>
        <div className="arm-card arm-card--digital">
          <div className="arm-card-head"><Globe2 size={19} /><div><small>الذراع الثانية</small><strong>المنصة · الوصول الرقمي</strong></div></div>
          <ul>{digitalArm.map(([title, text]) => <li key={title}><Check size={13} /><div><b>{title}</b><span>{text}</span></div></li>)}</ul>
        </div>
      </div>
      <div className="arm-bridge">
        <div className="arm-bridge-head"><Waypoints size={16} /><strong>كيف تتغذى الذراعان من بعضهما</strong></div>
        <div className="arm-bridge-list">{armBridge.map(([title, text]) => <div key={title}><ArrowLeft size={13} /><div><b>{title}</b><span>{text}</span></div></div>)}</div>
      </div>
      {nextLink(page)}
    </article>;

    if (page === 5) return <article className="notebook-page page-phases">
      {pageMark(page)}
      <SectionKicker>المراحل الأربع</SectionKicker>
      {pageAsk(page)}
      <h2 className="page-title">كل مرحلة تطلب أكثر، <em>ولا تطلب قبل أن تعطي.</em></h2>
      <div className="notebook-track-list">{phases.map((phase) => { const Icon = phase.icon; const open = activePhase === phase.id; return <div className={`notebook-track-card notebook-track-card--${phase.tone} ${open ? "is-open" : ""}`} key={phase.id}>
        <div className="track-card-main"><span className="track-index">{phase.number}</span><Icon size={24} /><div><small>{phase.label}</small><h3>{phase.title}</h3><p>{phase.description}</p><span className="phase-ask">{phase.ask}</span></div></div>
        <button onClick={() => setActivePhase(open ? null : phase.id)} aria-expanded={open}>{open ? "أغلق" : "التفاصيل"}{open ? <ChevronDown size={15} /> : <Plus size={15} />}</button>
        {open && <div className="notebook-track-detail"><p className="track-detail-overview">{phase.overview}</p><ul className="track-detail-activities">{phase.activities.map((activity) => <li key={activity}><Check size={14} />{activity}</li>)}</ul><p className="track-detail-outcome">{phase.outcome}</p></div>}
      </div>; })}</div>
      <div className="phase-order-note"><Waypoints size={15} /><strong>الترتيب هو التصميم. من يبدأ بالمرحلة الثالثة لن يجد أحدًا في القاعة.</strong></div>
      <div className="pressure-rule pressure-rule--inline"><AlertTriangle size={15} /><p>{PRESSURE_RULE}</p></div>
      {nextLink(page)}
    </article>;

    if (page === 6) return <article className="notebook-page page-platform">
      {pageMark(page)}
      <SectionKicker>المنصة</SectionKicker>
      {pageAsk(page)}
      <h2 className="page-title">الفجوة ليست <em>في المعرفة.</em></h2>
      <p className="platform-lead">أغلب الآباء يعرفون أن الصراخ لا ينفع. الفجوة في المسافة بين ما يعرفونه وبين اللحظة التي يفقدون فيها أعصابهم. الجلسة انتهت الثلاثاء، والانفجار يأتي الجمعة. وهذه المسافة لا يغطيها منشور، يغطيها شيء يبقى في الجيب ويعمل دون إنترنت.</p>
      <div className="platform-screens">{platformScreens.map(([number, title, text, Icon]) => <div className="platform-screen" key={number}>
        <div className="platform-screen-top"><span>{number}</span><Icon size={17} /></div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>)}</div>
      <div className="platform-notes">{platformNotes.map(([title, text, Icon]) => <div key={title}><div><Icon size={16} /><strong>{title}</strong></div><p>{text}</p></div>)}</div>
      {nextLink(page)}
    </article>;

    if (page === 7) return <article className="notebook-page page-plan">
      {pageMark(page)}
      <SectionKicker>الخطة الزمنية</SectionKicker>
      {pageAsk(page)}
      <h2 className="page-title">{N.weeks} أسابيع، <em>{N.phaseCount} مراحل.</em></h2>
      <div className="practice-chips">{phases.filter((phase) => phase.id !== "zero").map((phase) => <span key={phase.id}><b>{phase.number}</b>{phase.title.replace(/ · .*/, "")}</span>)}</div>
      <div className="notebook-plan-layout">
        <div className="notebook-week-tabs">{weeks.map((week, index) => <button className={activeWeek === index ? "is-active" : ""} onClick={() => setActiveWeek(index)} key={week[0]}><small>أسبوع</small><strong>{week[0]}</strong><i /></button>)}</div>
        <div className="notebook-week-detail">
          <div className="week-detail-top"><span>الأسبوع {weeks[activeWeek][0]} / 0{N.weeks}</span><CalendarDays size={18} /></div>
          <h3>{weeks[activeWeek][1]}</h3>
          <small className="week-owner-note">المسؤول: {weeks[activeWeek][2]}</small>
          <div className="week-task-list">{weeks[activeWeek][3].map((task) => <span key={task}><Check size={14} />{task}</span>)}</div>
          <div className="week-output"><small>المخرج</small><strong>{weeks[activeWeek][4]}</strong></div>
          <div className="week-arrows"><button onClick={() => setActiveWeek((activeWeek + weeks.length - 1) % weeks.length)}><ArrowRight size={14} /> السابق</button><button onClick={() => setActiveWeek((activeWeek + 1) % weeks.length)}>التالي <ArrowLeft size={14} /></button></div>
        </div>
      </div>
      <div className="plan-budget-strip">
        {budgetLines.map((line) => <div key={line.label}><b>${line.amount.toLocaleString("en-US")}</b><span>{line.label}</span></div>)}
        <div className="plan-budget-inkind"><b>{F.inKind}</b><span>مساهمة عينية، فتصبح القيمة الكلية {F.totalValue} ويغطي الممول {N.funderShare}</span></div>
      </div>
      {nextLink(page)}
    </article>;

    if (page === 8) return <article className="notebook-page page-impact">
      {pageMark(page)}
      <SectionKicker>الأثر والقياس</SectionKicker>
      {pageAsk(page)}
      <h2 className="page-title">لا ندّعي <em>ما لا نستطيع إثباته.</em></h2>
      <p className="impact-disclaimer">لا ندّعي إثبات خفض العنف خلال ثمانية أسابيع. هذا ما نقيسه فعلًا: مؤشر واحد لكل مرحلة، وأداة تحقق واحدة لكل مؤشر.</p>
      <div className="objective-cards">{impactIndicators.map(([stage, value, unit, verification, Icon], index) => <div className="objective-card" key={stage}>
        <div className="objective-card-head"><span className="objective-index">{String(index + 1).padStart(2, "0")}</span><Icon size={17} /></div>
        <strong className="objective-title">{stage}</strong>
        <div className="objective-metric"><b>{value}</b><span>{unit}</span></div>
        <div className="objective-verify"><Check size={12} />{verification}</div>
      </div>)}</div>
      <div className="impact-limits"><BarChart3 size={16} /><div><strong>حدود القياس</strong><p>{measurementLimits}</p></div></div>
      {nextLink(page)}
    </article>;

    if (page === 9) return <article className="notebook-page page-budget">
      {pageMark(page)}
      <SectionKicker>الكلفة والعائد</SectionKicker>
      {pageAsk(page)}
      <h2 className="page-title">{N.budgetTotal.toLocaleString("en-US")} دولار، <em>وكلفة {N.costPerBeneficiary}$ للمستفيد.</em></h2>
      <div className="cost-strip">{costEfficiency.slice(0, 3).map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
      <div className="budget-book budget-book--full">
        {budgetLines.map((line) => <div className="budget-book-row" key={line.label}><div><strong>{line.label}</strong><b>${line.amount.toLocaleString("en-US")}</b></div><div className="budget-meter"><span className={line.color} style={{ width: budgetPercent(line.amount) }} /></div><small>{line.note} · {budgetPercent(line.amount)}</small></div>)}
        <div className="budget-total-row"><strong>المجموع</strong><b>{F.budgetTotal}</b></div>
      </div>
      <button className="small-text-action" onClick={() => setModal("budget")}><Download size={14} /> تفاصيل الميزانية والمساهمة العينية</button>
      {nextLink(page)}
    </article>;

    if (page === 10) return <article className="notebook-page page-assurance">
      {pageMark(page)}
      <SectionKicker>الضمانات</SectionKicker>
      {pageAsk(page)}
      <h2 className="page-title">المرونة مصمَّمة <em>داخل الخطة.</em></h2>
      <div className="risk-table">
        <div className="risk-head"><span>الخطر</span><span>الاحتمالية</span><span>إجراء التخفيف</span></div>
        {risks.slice(0, 4).map(([risk, level, mitigation]) => <div className="risk-row" key={risk}>
          <div className="risk-name"><AlertTriangle size={14} /><strong>{risk}</strong></div>
          <div><span className={`risk-level risk-level--${level === "مرتفع" ? "high" : "mid"}`}>{level}</span></div>
          <p>{mitigation}</p>
        </div>)}
      </div>
      <div className="assurance-strip">{sustainabilityPillars.slice(0, 3).map(([title, tag, , Icon]) => <div key={title}><Icon size={16} /><strong>{title}</strong><span>{tag}</span></div>)}</div>
      {nextLink(page)}
    </article>;

    if (page === 11) return <article className="notebook-page page-faq">
      {pageMark(page)}
      <SectionKicker>الأسئلة الشائعة</SectionKicker>
      {pageAsk(page)}
      <h2 className="page-title">أسئلة الشركاء <em>والإجابات.</em></h2>
      <div className="faq-book-list">{faqs.map(([question, answer], index) => <div className={`faq-book-item ${activeFaq === index ? "is-open" : ""}`} key={question}><button onClick={() => setActiveFaq(activeFaq === index ? null : index)}>{question}{activeFaq === index ? <ChevronDown size={15} /> : <Plus size={15} />}</button>{activeFaq === index && <p>{answer}</p>}</div>)}</div>
      {nextLink(page)}
    </article>;

    return <article className="notebook-page page-partnership">
      {pageMark(page)}
      <SectionKicker>الشراكة والتواصل</SectionKicker>
      {pageAsk(page)}
      <h2 className="page-title">أربع طرق <em>للشراكة.</em></h2>
      <div className="tiers-grid">{partnershipTiers.map(([name, amount, tag, benefits, tone]) => <div className={`tier-card tier-card--${tone}`} key={name}>
        <div className="tier-card-top"><small>{tag}</small><strong>{name}</strong><b>{amount}</b></div>
        <ul>{benefits.slice(0, 3).map((benefit) => <li key={benefit}><Check size={13} />{benefit}</li>)}</ul>
      </div>)}</div>
      <div className="team-note">
        <div className="team-note-head"><UsersRound size={15} /><strong>الفريق: {N.teamSize} أشخاص، {N.womenDecisionRoles} منهن نساء بأدوار قرار</strong></div>
        <div className="assurance-strip">{teamRoles.map(([role, scope, Icon]) => <div key={role}><Icon size={16} /><strong>{role}</strong><span>{scope}</span></div>)}</div>
      </div>
      <div className="partnership-cta">
        <div><HeartHandshake size={17} /><p>ما يبقى بعد الأسبوع الثامن: منصة تعمل بكلفة {N.hostingPerYear} دولارًا سنويًا، ومقالات تبقى قابلة للإيجاد عبر البحث، وحزمة مفتوحة تتيح لأي جهة تنفيذ دورة ثانية.</p></div>
        <div className="join-page-buttons">
          <button className="notebook-primary" onClick={() => setModal("story")}>تواصل معنا <Send size={16} /></button>
          <button className="notebook-quiet" onClick={() => goPage(0)}>عد إلى الغلاف <ArrowUpLeft size={16} /></button>
        </div>
      </div>
    </article>;
  };


  const renderStoryScene = () => {
    const scene = storyScenes[Math.min(currentPage, storyScenes.length - 1)];
    const progress = ((currentPage + 1) / storyScenes.length) * 100;
    return <main className={`story-stage story-stage--${scene.tone}`} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
      <div className="story-progress" aria-label={`المشهد ${scene.number} من ${storyScenes.length}`}><span style={{ width: `${progress}%` }} /></div>
      <div className="story-scene-meta"><span>{scene.label}</span><b>{scene.number} / 09</b></div>
      <div className="story-scene-grid">
        <div className="story-copy">
          <SectionKicker>{currentPage === 0 ? "مبادرة مجتمعية لأهل غزة" : "سَنَد وعَمّار"}</SectionKicker>
          <span className="story-chapter-mark">{scene.number}</span>
          <h1>{scene.title}</h1>
          <p className="story-intro">{scene.intro}</p>
          <div className="story-rule" />
          <p className="story-prompt"><CircleDot size={15} />{scene.prompt}</p>
          <div className="story-actions">
            <button className="notebook-primary" onClick={() => goPage(currentPage + 1)} disabled={currentPage === storyScenes.length - 1}>{currentPage === storyScenes.length - 1 ? "هذه لحظتكم" : "أكمل الحكاية"} <ArrowLeft size={17} /></button>
            {currentPage > 0 && <button className="notebook-quiet" onClick={() => goPage(currentPage - 1)}><ArrowRight size={16} /> المشهد السابق</button>}
            {currentPage > 0 && currentPage < storyScenes.length - 1 && <button className="story-detail-link" onClick={() => { setViewMode("book"); goPage(scene.page); }}>اقرأ التفاصيل <FileText size={14} /></button>}
          </div>
        </div>
        <div className="story-visual-wrap">
          <div className="story-visual-frame"><img src={scene.image} alt={scene.caption} /><span className="story-visual-index">مشهد {scene.number}</span><div className="story-caption"><span>{scene.caption}</span><i>✦</i></div></div>
          <div className="story-side-note"><span>الخيط النحاسي</span><strong>{currentPage === 0 ? "يبدأ من السؤال" : currentPage === storyScenes.length - 1 ? "ينتقل إليكم" : "يمرّ من بيت إلى بيت"}</strong></div>
        </div>
      </div>
      <div className="story-scene-footer"><span>سَنَد وعَمّار · {CAMPAIGN_QUESTION}</span><span>{currentPage === storyScenes.length - 1 ? "النهاية التي تفتح باباً" : "المشهد التالي يضيف خيطاً جديداً"}</span></div>
      <div className="story-navigation"><button className="story-arrow" onClick={() => goPage(currentPage - 1)} disabled={currentPage === 0} aria-label="المشهد السابق"><ArrowRight size={18} /></button><div className="story-dots">{storyScenes.map((item, index) => <button key={item.number} className={index === currentPage ? "is-active" : ""} onClick={() => goPage(index)} aria-label={`الانتقال إلى ${item.label}`}><span>{item.number}</span></button>)}</div><button className="story-arrow" onClick={() => goPage(currentPage + 1)} disabled={currentPage === storyScenes.length - 1} aria-label="المشهد التالي"><ArrowLeft size={18} /></button></div>
      <div className="story-hint"><span>اسحب لمتابعة الحكاية</span><i>✦</i><span>أو استخدم الأسهم</span></div>
    </main>;
  };

  const renderModal = () => {
    if (modal === "guide") return <><div className="modal-symbol"><Video size={22} /></div><SectionKicker>مكتبة المحتوى</SectionKicker><h2 id="modal-title">{N.videos} مقطعًا<br /><em>و{N.cards} بطاقة.</em></h2><p>{N.videosTeam} مقطعًا من الفريق و{N.videosAmbassadors} من السفراء أنفسهم، و{N.cards} بطاقة تُقرأ في ثوانٍ وتُطبع لمن لا يملك هاتفًا يعمل، و{N.articles} مقالات تبقى قابلة للإيجاد عبر البحث. كل سلسلة تنتمي إلى مرحلة، ولا تُنشر قبل موعدها.</p><div className="modal-episode-list">{contentSeries.map(([title, phase, count], index) => <div key={title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><small>{phase} · {count}</small></div>)}</div><button className="notebook-primary modal-button" onClick={() => setModal(null)}>إغلاق <X size={16} /></button></>;
    if (modal === "budget") return <><div className="modal-symbol"><WalletCards size={22} /></div><SectionKicker>شفافية التمويل</SectionKicker><h2 id="modal-title">ميزانية {N.budgetTotal.toLocaleString("en-US")}<br /><em>دولار، بندًا بندًا.</em></h2><p>يضاف إلى ما يطلبه المقترح مساهمة عينية بقيمة {F.inKind}، فتصبح القيمة الكلية {F.totalValue} ويغطي الممول {N.funderShare} منها. وتُختتم المبادرة بتقرير مالي بالفواتير.</p><div className="modal-budget-list">{budgetLines.map((line) => <div key={line.label}><div><strong>{line.label}</strong><b>${line.amount.toLocaleString("en-US")}</b></div><span>{line.note} · {budgetPercent(line.amount)}</span></div>)}<div><div><strong>مساهمة عينية</strong><b>{F.inKind}</b></div><span>مساحات وتيسير وخدمات إنتاج لا تُدفع نقدًا · القيمة الكلية {F.totalValue}</span></div></div><button className="notebook-primary modal-button" onClick={() => setModal(null)}>فهمت، إغلاق <X size={16} /></button></>;
    return <><div className="modal-symbol"><MessageCircle size={22} /></div><SectionKicker>التواصل والشراكة</SectionKicker><h2 id="modal-title">لنبدأ<br /><em>حوارًا مؤسسيًا.</em></h2><p>أرسل استفسارك أو مستوى الشراكة الذي يناسب مؤسستك، ويتواصل معك فريق المبادرة بملف تفصيلي وخطة تنفيذ مقترحة.</p><form className="story-form" onSubmit={(event) => { event.preventDefault(); setModal(null); }}><label>الاسم والمؤسسة <input required placeholder="مثلاً: أحمد خالد · مؤسسة الأمل للتنمية" /></label><label>مستوى الشراكة المقترح <input placeholder="تمويل كامل، شريك المنصة، شريك المسار الميداني..." /></label><label>رسالتك <textarea required rows={3} placeholder="اكتب استفسارك أو ما تودّ مناقشته" /></label><button className="notebook-primary modal-button" type="submit">أرسل الطلب <Send size={17} /></button></form></>;
  };

  const bookClass = `notebook-app ${nightMode ? "notebook-app--night" : ""} ${viewMode === "scroll" ? "notebook-app--scroll" : viewMode === "story" ? "notebook-app--story" : "notebook-app--book"}`;
  return <div className={bookClass} dir="rtl">
    <header className="notebook-header"><button className="notebook-brand" onClick={() => { setViewMode("book"); goPage(0); }}><span><img src={logoUrl} alt="" /></span><b>سَنَد وعَمّار</b><small>{CAMPAIGN_QUESTION}</small></button><div className="notebook-view-switch"><span>طريقة العرض</span><button className={viewMode === "story" ? "active" : ""} onClick={() => setViewMode("story")}><Play size={15} /> قصة</button><button className={viewMode === "book" ? "active" : ""} onClick={() => setViewMode("book")}><BookOpen size={15} /> دفتر</button><button className={viewMode === "scroll" ? "active" : ""} onClick={() => setViewMode("scroll")}><FileText size={15} /> تمرير</button><button className="night-switch" onClick={() => setNightMode(!nightMode)}>{nightMode ? <Sun size={15} /> : <Moon size={15} />} {nightMode ? "نهار" : "ليل"}</button></div><button className="notebook-menu-button" aria-label="فتح القائمة" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></header>
    {menuOpen && <nav className="notebook-menu"><button onClick={() => go("problem")}>المشكلة</button><button onClick={() => go("solution")}>الحل</button><button onClick={() => go("phases")}>المراحل الأربع</button><button onClick={() => go("platform")}>المنصة</button><button onClick={() => go("plan")}>الخطة الزمنية</button><button onClick={() => go("impact")}>الأثر والقياس</button><button onClick={() => go("budget")}>الكلفة</button><button onClick={() => go("faq")}>الأسئلة الشائعة</button><button onClick={() => go("partnership")}>الشراكة <ArrowLeft size={15} /></button></nav>}
    {viewMode === "story" ? renderStoryScene() : viewMode === "book" ? <><div className="notebook-controls"><button onClick={() => setContentsOpen(true)}><BookOpen size={15} /> الفهرس</button><button disabled={spreadOf(currentPage) === 0} onClick={stepBackward}><ArrowRight size={15} /> السابق</button><span>{pairStartOf(currentPage) === 0 ? "صفحة 1" : `صفحتا ${pairStartOf(currentPage) + 1}-${pairStartOf(currentPage) + 2}`} / {pageTitles.length}</span><button disabled={spreadOf(currentPage) === maxSpread} onClick={stepForward}>التالي <ArrowLeft size={15} /></button></div><main className={`book-stage ${pairStartOf(currentPage) !== 0 ? "book-stage--spread" : ""}`} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>{<div className={`page-turn page-turn--${turnDirection}`} key={pairStartOf(currentPage)}>{pairStartOf(currentPage) === 0 ? renderPage(0) : <div className="book-spread">{pairStartOf(currentPage) + 1 < pageTitles.length ? <><div className="book-spread-page">{renderPage(pairStartOf(currentPage))}</div><div className="book-spread-fold" /><div className="book-spread-page">{renderPage(pairStartOf(currentPage) + 1)}</div></> : <div className="book-spread-page book-spread-page--solo">{renderPage(pairStartOf(currentPage))}</div>}</div>}</div>}<div className="book-hint"><span>اسحب لقلب الصفحات</span><i>✦</i><span>أو استخدم الأسهم</span></div></main></> : <main className="scroll-stage">{pageTitles.map((_, index) => <section id={`scroll-${pageSlugs[index] ?? "cover"}`} key={index}>{renderPage(index)}</section>)}</main>}
    <footer className="notebook-footer"><span>صُنع بالاهتمام <HeartHandshake size={13} /></span><span>سَنَد وعَمّار · غزة · {N.startDate} إلى {N.endDate}</span><button onClick={() => setModal("story")}><Mail size={13} /> تواصل معنا</button></footer>
    {contentsOpen && <div className="contents-overlay" onClick={() => setContentsOpen(false)}><div className="contents-card" onClick={(event) => event.stopPropagation()}><button className="contents-close" onClick={() => setContentsOpen(false)}><X size={17} /></button><SectionKicker>فهرس الدفتر</SectionKicker><h2>خيط واحد،<br /><em>فصول كثيرة.</em></h2><div>{pageTitles.map((title, index) => <button key={title} onClick={() => { setContentsOpen(false); goPage(index); }}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><ArrowLeft size={15} /></button>)}</div></div></div>}
    {modal && <div className="modal-backdrop" role="presentation" onClick={() => setModal(null)}><div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setModal(null)} aria-label="إغلاق"><X size={19} /></button>{renderModal()}</div></div>}
  </div>;
}
