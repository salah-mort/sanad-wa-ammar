/*
 * فلسفة التصميم: "خيط السند" داخل دفتر ميداني تفاعلي.
 * الصفحة هنا فصل، والتنقل بينها فعل قراءة؛ لا نضيف زخرفة لا تخدم الحكاية.
 */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import {
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
  Download,
  FileText,
  Globe2,
  HeartHandshake,
  Mail,
  Menu,
  MessageCircle,
  Mic2,
  Moon,
  Play,
  Plus,
  Quote,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  UsersRound,
  Video,
  WalletCards,
  Waypoints,
  X,
} from "lucide-react";

const logoUrl = "/images/logo.svg";
const heroImage = "/images/hero-solidarity.png";
const communityImage = "/images/community-circle.jpg";
const mentorshipImage = "/images/mentorship-circle.png";

const tracks = [
  {
    id: "youth", number: "01", label: "للشباب والأزواج الجدد", title: "ديوان السند",
    description: "مساحة صادقة للشباب كي يتعلموا إدارة الضغط، الإصغاء، وتقاسم أعباء الحياة دون أن يفقدوا قوتهم.",
    overview: "ديوان السند مساحة نقاش مغلقة وآمنة للرجال والشباب والأزواج الجدد، بعيداً عن الحكم أو المقارنة، لتبادل الخبرات حول إدارة الضغوط النفسية الناتجة عن النزوح، والتعبير عن المشاعر دون خوف من فقدان الهيبة، وإعادة تعريف القيادة كقدوة ورحمة بدل القسوة أو الانسحاب.",
    activities: [
      "حوار الخيمة المفتوحة: جلسة ميدانية دورية يقودها ميسّر، تبدأ من سؤال يومي مباشر: ما الحمل الذي يمكنني تخفيفه اليوم؟",
      "تحدي الشريك الحقيقي: مهمة منزلية ملموسة واحدة (ماء، طبخ، رعاية طفل) ينفذها المشارك فعلياً، ويحكي تجربتها في الجلسة التالية بدل الاكتفاء بالنقاش النظري.",
      "تمهيد لسفراء السند: أبرز المشاركين يُرشَّحون في الأسبوع الثامن لتدريب يؤهلهم كسفراء ينقلون الأدوات داخل مجتمعاتهم بعد إغلاق المشروع.",
    ],
    outcome: "جلسات هذا المسار موزّعة على الأسابيع 3 و5 و7 من خطة العمل التنفيذية، ضمن الـ12 جلسة ميدانية في مراكز الإيواء والمساحات الآمنة.",
    icon: Waypoints, tone: "terracotta",
  },
  {
    id: "family", number: "02", label: "للأسرة كاملة", title: "أعمدة البيت",
    description: "أدوات عملية تساعد الآباء والأبناء على بناء مساحة أمان، والتعامل مع الخوف والتعب كعائلة واحدة.",
    overview: "أعمدة البيت جلسات إرشادية وتفاعلية تجمع الأسرة كاملة — الأب والأم والأبناء — لمناقشة آليات اتخاذ القرار المشترك، وتخفيف التوتر اليومي الناتج عن ظروف النزوح، وحماية فضاء البيت من التصدع الداخلي.",
    activities: [
      "ورش أمان الخيمة: تمرين جماعي يعيد توزيع المهام اليومية (الماء، الطعام، رعاية الأطفال) بين أفراد الأسرة بدل تركيزها على شخص واحد، وتُطلق ضمن الأسبوع الثالث من الخطة.",
      "لغة القدوة اليومية: أدوات عملية تجعل الأب نموذجاً مرئياً للرعاية أمام أبنائه، لا موجّهاً بالكلام فقط.",
      "مساحة أمان للحديث: وقت مخصص يترك فيه الطفل أو الشريكة مجالاً آمناً للتعبير دون مقاطعة أو حكم — وهي الممارسة الثالثة (احتواء) ضمن أدوات السند الأربع.",
    ],
    outcome: "يتقاطع هذا المسار مع حلقات الحملة الرقمية القصيرة (مثل «الماء مهمة مشتركة» و«أخي الصغير ليس عبئاً») ليصل أثره إلى بيوت لم تحضر الجلسات مباشرة.",
    icon: HeartHandshake, tone: "sage",
  },
  {
    id: "girls", number: "03", label: "للصبايا والفتيات", title: "شريكات الوعي",
    description: "منصة تصغي إلى رؤية الفتيات لمواصفات الرجل السند، وتضع خبرتهن في قلب تصميم المبادرة وتقييمها.",
    overview: "شريكات الوعي منصة تنسيقية وحوارية تُشرك الصبايا والقيادات النسوية كشريكات فعليات في تصميم المبادرة وتقييم أثرها، لا كجمهور متلقٍّ فقط — فهنّ من يضعن مواصفات «الرجل السند» ويراجعن مدى التزام المبادرة بها.",
    activities: [
      "منتدى معايير السند: جلسات تحدد فيها الصبايا، بلغتهن الخاصة، السلوكيات التي تجعل الرجولة داعمة فعلاً، لتصبح مرجعاً يُقاس عليه محتوى المبادرة، ويُطلق ضمن الأسبوع الرابع من الخطة.",
      "حملة صوت الحقيقة: مساحة رقمية آمنة لمشاركة الملاحظات والاقتراحات، والاحتفاء بمواقف داعمة حقيقية شهدنها في محيطهن — وهي أيضاً موضوع الحلقة الخامسة من الحملة الرقمية «صوتها جزء من القرار».",
      "دور تقييمي مباشر: مشاركة في قراءة استبيانات القياس القبلي والبعدي، بما يجعل مؤشر التحول السلوكي المستهدف (75%) انعكاساً لمعيار الصبايا أنفسهن لا تقدير الفريق وحده.",
    ],
    outcome: "بذلك لا تبقى شريكات الوعي جمهوراً متلقياً، بل شريكات في تصميم المبادرة وتقييم أثرها من أول جلسة إلى التقرير الختامي.",
    icon: UsersRound, tone: "dusk",
  },
];

const practices = [
  ["01", "إصغاء", "أن نسمع قبل أن نحكم، ونترك مكاناً للمشاعر الصعبة. تتدرب عليها جلسات ديوان السند عبر حوار الخيمة المفتوحة."],
  ["02", "شراكة", "أن نتقاسم العمل اليومي، لا أن نتركه على كتف واحد. تحدي الشريك الحقيقي يحوّلها من نية إلى مهمة أسبوعية محددة."],
  ["03", "احتواء", "أن نصنع للأطفال والنساء والرجال مساحة لا يخافون فيها من الكلام، كما في ورش أمان الخيمة ضمن مسار أعمدة البيت."],
  ["04", "قدوة", "أن نبدأ بالفعل الصغير الذي يراه من حولنا ويستطيع تكراره، وينقله سفراء السند العشرة بعد تدريبهم في الأسبوع الثامن."],
];

// نقاط الصفحات الافتتاحية: عنوان قصير + جملة واحدة، لا فقرات.
const problemPoints = [
  ["ضغط مركّب", "عجز عن تأمين الأساسيات، وضغط صورة الرجولة الصلبة في آنٍ واحد.", Clock3],
  ["بيت بلا مساحة أمان", "التوتر اليومي داخل الخيمة يتحول إلى صمت أو انفجار، لا إلى حوار.", ShieldCheck],
  ["العبء على كتف واحد", "المسؤولية كلها على شخص واحد، فينهار هو ومعه استقرار الأسرة.", UsersRound],
] as const;

const gapPoints = [
  ["الإغاثة تسدّ الجوع", "البرامج القائمة تغطي الاحتياج المادي، وهذا ضروري لكنه غير كافٍ.", HeartHandshake],
  ["الرجل خارج المعادلة", "الدعم النفسي-الاجتماعي نادراً ما يستهدف الرجل والشاب داخل الأسرة.", AlertTriangle],
  ["النتيجة", "يبقى التصدع الداخلي بلا تدخل، فيُهدر أثر المساعدات المادية نفسها.", TrendingUp],
] as const;

const solutionPoints = [
  ["نُدرِّب، لا نَعِظ", "الرعاية والإصغاء والشراكة مهارات تُتدرَّب في جلسات، لا شعارات تُقال."],
  ["ميدان + شاشة", "12 جلسة مباشرة لـ500 مستفيد، و10 مقاطع قصيرة تصل إلى 50,000."],
  ["أثر مُقاس", "استبيان قبلي وبعدي على المجموعة ذاتها، بمستهدف تحول 75%."],
  ["قدرة تبقى بعدنا", "10 سفراء شباب يواصلون العمل بعد إغلاق التمويل الأول."],
] as const;

// كفاءة التكلفة: أرقام مشتقة حسابياً من ميزانية 4,000$ ومؤشرات الأثر المستهدفة أعلاه.
const costEfficiency = [
  ["$8", "لكل مستفيد مباشر", "4,000$ ÷ 500 مستفيد مباشر — كلفة تشمل الجلسة والمواد التدريبية والتيسير والتقييم.", UsersRound],
  ["$0.08", "لكل وصول رقمي", "4,000$ ÷ 50,000 وصول مستهدف عبر الحملة الرقمية والمحتوى القصير.", Globe2],
  ["$333", "لكل جلسة ميدانية", "4,000$ ÷ 12 جلسة، شاملة المكان والتيسير والضيافة والمواد.", CalendarDays],
  ["$400", "لكل سفير سند", "4,000$ ÷ 10 سفراء يواصلون نقل الأدوات بعد إغلاق التمويل الأول.", Sparkles],
] as const;

// سجل المخاطر: البندان الأول والثاني مستمدان من بروتوكولات الحماية البديلة في مقترح الشراكة.
const risks = [
  ["تعذر التجمعات الميدانية", "مرتفع", "التحول الفوري إلى جلسات مصغرة (فردية أو عائلية) أو مجموعات تراسل مغلقة، مع الإبقاء على المحتوى والأهداف نفسها دون تأجيل البرنامج."],
  ["انقطاع الكهرباء والاتصال", "مرتفع", "إعداد المواد بصيغ قابلة للتنزيل والتداول دون إنترنت، وجدولة النشر مسبقاً، وتوزيع النسخ المطبوعة من الأدلة على الميسرين."],
  ["النزوح المتكرر للمشاركين", "متوسط", "الاعتماد على قوائم احتياطية في كل منطقة، وعلى سفراء محليين يتابعون المشاركين بعد انتقالهم بدل ربط النشاط بموقع واحد."],
  ["تقلب الأسعار وصعوبة التوريد", "متوسط", "مخصص طوارئ بقيمة 400$ ضمن الميزانية، وشراء المستلزمات على دفعات بدل دفعة واحدة لتقليل أثر التقلب."],
  ["حساسية مجتمعية تجاه الموضوع", "متوسط", "إشراك القيادات المحلية والوجهاء منذ الأسبوع الأول، واعتماد لغة محلية غير واعظة، وإبقاء جلسات ديوان السند مغلقة لبناء الثقة."],
  ["ضعف مشاركة الصبايا والنساء", "متوسط", "مسار «شريكات الوعي» بتوقيتات ومساحات آمنة تناسبهن، وتنسيق مسبق مع القيادات النسوية لضمان حضور فعلي لا شكلي."],
] as const;

const sustainabilityPillars = [
  ["سفراء السند", "قدرة بشرية باقية", "اختيار وتدريب 10 من قيادات الشباب المشاركين في الأسبوع الثامن، ليواصلوا نقل الأدوات والحوار داخل مجتمعاتهم بعد إغلاق المشروع رسمياً.", Sparkles],
  ["اللامركزية الميدانية", "استمرارية رغم الانقطاع", "الاعتماد على قادة محليين في كل منطقة بدل مركز تنسيق واحد، بما يضمن استمرار النشاط حتى في أوقات الانقطاع أو تعذر الوصول.", UsersRound],
  ["أصول معرفية قابلة لإعادة الاستخدام", "محتوى لا ينتهي بانتهاء التمويل", "الأدلة التدريبية والمقاطع العشرة تبقى متاحة بعد المشروع، ويمكن لأي جهة شريكة إعادة استخدامها أو تكرار النموذج في مناطق أخرى.", FileText],
  ["نموذج قابل للتوسع", "جاهز للمرحلة الثانية", "الخطة والمنهجية وأدوات القياس موثقة بالكامل، بما يتيح توسيع النموذج جغرافياً أو رفع عدد المستفيدين بتمويل مرحلة ثانية.", Waypoints],
] as const;

const partnershipTiers = [
  ["شريك مؤسس", "$4,000", "تمويل كامل", ["تمويل المبادرة بالكامل عبر بنودها الأربعة", "ظهور اسم الشريك وشعاره على كل المخرجات الميدانية والرقمية", "تقرير أثر مخصص مع الفواتير وبيانات القياس", "حق تبنّي المرحلة الثانية والتوسع الجغرافي"], "founding"],
  ["شريك المحور الرقمي", "$1,200", "تبنّي الحملة", ["تمويل إنتاج المقاطع العشرة والتصاميم البصرية والترويج", "ظهور الشريك على المحتوى الرقمي الواصل إلى 50,000 متابع", "تقرير تفصيلي بأرقام الوصول والتفاعل الفعلية"], "digital"],
  ["شريك التيسير الميداني", "$1,600", "تبنّي الجلسات", ["تمويل 12 جلسة ميدانية بمكافآت الميسرين وتجهيز المساحات الآمنة", "ارتباط مباشر بالأثر على 500 مستفيد مباشر", "توثيق مصوّر وقصص أثر من الجلسات الممولة"], "field"],
  ["شريك عيني أو استشاري", "دعم غير نقدي", "خبرة ومساحات", ["توفير مساحات آمنة أو تجهيزات أو خدمات إنتاج", "دعم استشاري في المحتوى النفسي-الاجتماعي أو التقييم", "الربط بشبكات مؤسسية وفرص تمويل لاحقة"], "inkind"],
] as const;

// لكل هدف مؤشر واحد: قيمة رقمية + وحدة + أداة التحقق، بدل تكرار الأرقام في شريط منفصل.
const objectives = [
  ["تخفيف الضغط الأسري", "إعادة توزيع المسؤوليات اليومية داخل الأسرة النازحة عبر الشراكة والاحتواء، بدل تركها على كتف واحد.", "500", "مستفيد مباشر", "كشوف حضور 12 جلسة ولقاءً وجاهياً", UsersRound],
  ["بناء وعي الشباب", "تمكين الشباب والصبايا من أدوات التواصل الفعّال وإدارة الضغوط النفسية في بيئة النزوح.", "10", "سفراء شباب", "قوائم التخرج في الأسبوع الثامن", Sparkles],
  ["صناعة محتوى داعم", "إنتاج مواد توعوية رقمية قصيرة تحاكي تفاصيل الحياة اليومية داخل الخيام والمساحات الآمنة.", "50,000", "وصول رقمي", "تحليلات المنصات الرقمية", Globe2],
  ["تحقيق التحول السلوكي", "ترسيخ ممارسات الإصغاء والشراكة كبدائل يومية للتوتر والصلابة الفردية.", "75%", "تحول سلوكي", "استبيان قبلي وبعدي على المجموعة ذاتها", Target],
] as const;

const episodes = [
  ["01", "حين يسأل الأب: كيف أساعدك؟", "موقف يومي", "45 ث"], ["02", "الماء مهمة مشتركة", "شراكة منزلية", "38 ث"], ["03", "للصمت نهاية آمنة", "إدارة الغضب", "52 ث"], ["04", "أخي الصغير ليس عبئاً", "رعاية الأطفال", "41 ث"], ["05", "صوتها جزء من القرار", "شريكات الوعي", "49 ث"], ["06", "لا عيب في طلب المساندة", "احتواء", "44 ث"], ["07", "نختلف دون أن نؤذي", "فض النزاعات", "55 ث"], ["08", "القدوة تبدأ من الخيمة", "أمان الأسرة", "47 ث"], ["09", "عشر دقائق للإصغاء", "حوار قصير", "36 ث"], ["10", "الخيط ينتقل", "دعوة للمشاركة", "50 ث"],
];

const budgets = [
  ["التيسير الميداني واللقاءات", 1600, "40%", "مكافآت الميسرين، تجهيز المساحات الآمنة، وضيافة 12 جلسة ميدانية", "budget-orange"],
  ["إنتاج الحملة الرقمية", 1200, "30%", "تصوير وإنتاج 10 مقاطع فيديو قصيرة، التصاميم البصرية والترويج", "budget-sage"],
  ["المواد التدريبية واللوجستيات", 800, "20%", "طباعة الأدلة الإرشادية، بطاقات التوعية وتأمين التنقلات الميدانية", "budget-blue"],
  ["التقييم والتوثيق والطوارئ", 400, "10%", "أدوات القياس والتقييم، توثيق الأثر، ومخصصات الطوارئ الميدانية", "budget-sand"],
] as const;

const weeks = [
  ["01", "التأسيس والإعداد الإداري", "مدير المبادرة + منسق البرامج", ["تشكيل الفريق التنفيذي وتوزيع الأدوار", "اعتماد المواد التدريبية للمسارات", "توقيع عقود الميسرين الميدانيين"], "اعتماد الأدلة وتشكيل فريق العمل"],
  ["02", "إطلاق الهوية والمنصة الرقمية", "مسؤول التقنية + فريق الإعلام", ["بدء تصميم وتطوير الموقع التفاعلي", "إعداد الهوية وحملة السوشيال ميديا", "حجز مساحات الجلسات"], "نسخة تجريبية للموقع وتصاميم الحملة"],
  ["03", "انطلاق الأنشطة الميدانية", "فريق التيسير الميداني", ["تنفيذ أول 3 جلسات لديوان السند", "إطلاق ورش أمان الخيمة", "بدء الترويج الرقمي"], "3 جلسات و100 مستفيد مباشر"],
  ["04", "الإنتاج المرئي والتغطية", "فريق الإنتاج الرقمي", ["تصوير الدفعة الأولى من المقاطع", "إطلاق منتدى شريكات الوعي", "جمع الاستبيانات القبلية والبعدية"], "نشر أول 3 فيديوهات وإطلاق المنتدى"],
  ["05", "توسيع النطاق الميداني", "فريق التيسير والمنصة", ["استكمال الجلسات 4 إلى 8", "تنفيذ مسابقات القدوة اليومية", "تفعيل الهاشتاج ونشر المقالات"], "5 جلسات إضافية وتجاوز 25,000 مشاهدة"],
  ["06", "الحملة الرقمية الكبرى", "فريق الإعلام الرقمي", ["نشر الدفعة الثانية من الفيديوهات", "تنظيم جلسة حوارية افتراضية", "تقييم مؤشرات الأثر الرقمي"], "4 فيديوهات جديدة وتحديث مؤشرات الوصول"],
  ["07", "استكمال الجلسات والتقييم", "المنسق الميداني + الخبير", ["إتمام الجلسات 9 إلى 12", "جمع الاستبيانات البعدية", "إعداد مسودة التقرير الختامي"], "اكتمال 12 جلسة وجمع 500 استبيان"],
  ["08", "إغلاق المبادرة ورفع التقارير", "مدير المبادرة + المحاسب", ["إطلاق النسخة النهائية والأرشيف", "تحليل البيانات وإعداد التقرير", "تسليم المخرجات للشركاء"], "التقرير الختامي الشامل وإغلاق المشروع"],
] as const;

const faqs = [
  ["هل المبادرة مخصصة للرجال فقط؟", "لا. الرجال والشباب أحد مساراتها الأساسية، لكن الأسرة والصبايا والفتيات شريكات في تصميم المعنى وتقييم الأثر عبر مسار «شريكات الوعي». الرجولة الإيجابية هنا مسؤولية مشتركة، لا مسار منفصل عن باقي أفراد الأسرة."],
  ["من يقود التنفيذ الميداني، وكيف تُوزَّع الأدوار؟", "فريق تنفيذي محدد الأدوار: مدير المبادرة ومنسق البرامج يتوليان التأسيس والاعتماد، مسؤول التقنية وفريق الإعلام يديران المنصة والحملة الرقمية، وفريق التيسير الميداني ينفذ الجلسات في مراكز الإيواء والمساحات الآمنة. كل أسبوع من الخطة له مالك واضح ومخرج محدد سلفاً."],
  ["كيف يمكن تنفيذ الجلسات في ظروف طارئة؟", "ينقل الجدول البديل الجلسات إلى مجموعات مصغرة أو منصات تراسل مغلقة عند تعذر التجمع، بالاعتماد على قادة محليين وسفراء السند في كل منطقة لضمان استمرار النشاط دون انقطاع. المرونة واللامركزية جزء أصيل من تصميم الخطة، وليستا استثناءً طارئاً."],
  ["ما الذي يجعلها مختلفة عن حملة توعوية عادية؟", "تجمع بين جلسات ميدانية مباشرة، محتوى رقمي قصير قابل للمشاركة، منصة رقمية تستقبل القصص، وقياس قبلي وبعدي موثق للوعي والسلوك — بحيث لا تبقى الفكرة كلاماً، بل تتحول إلى ممارسة يومية يمكن قياس أثرها بعد المشروع."],
  ["كيف تُستخدم ميزانية الـ4,000 دولار بالتفصيل؟", "40% (1,600$) للتيسير الميداني والجلسات، 30% (1,200$) لإنتاج الحملة الرقمية، 20% (800$) للمواد التدريبية واللوجستيات، و10% (400$) للتقييم والتوثيق ومخصصات الطوارئ. كل بند موثق برقم واضح، ويُختتم بتقرير مالي نهائي يُسلَّم للشركاء."],
  ["كيف تُقاس نتائج المبادرة فعلياً؟", "عبر استبيانات قياس قبلية وبعدية توزَّع على المستفيدين المباشرين في الأسبوع 7، تقيس التغيّر في الوعي والممارسة اليومية، وتُستهدف نسبة تحول وسلوك ورضا 75% فأكثر. تُلخَّص النتائج في تقرير ختامي شامل يُسلَّم للشركاء في الأسبوع 8 مرفقاً بالفواتير وبيانات الأثر."],
  ["ماذا يحدث بعد انتهاء الأسابيع الثمانية؟", "يتم اختيار وتدريب 10 من قيادات الشباب المشاركين ليكونوا سفراء السند، ويواصلوا نقل الأدوات والحوار داخل مجتمعاتهم بعد إغلاق المشروع رسمياً — بحيث لا يتوقف الأثر بانتهاء التمويل الأول."],
];

// تسلسل إقناع: مشكلة ← فجوة ← حل ← لمن ← كيف ← أثر ← كلفة ← ضمانات ← أسئلة ← طلب.
const pageTitles = [
  "الغلاف", "المشكلة", "الفجوة", "الحل", "المسارات الثلاثة", "المنهجية والخطة",
  "الأثر والقياس", "الكلفة والعائد", "الضمانات", "الأسئلة الشائعة", "الشراكة والتواصل",
];
const pageQuestions: Record<number, string> = {
  1: "ما الذي يحدث؟", 2: "لماذا لا تكفي البرامج القائمة؟", 3: "ما الذي نقدّمه؟", 4: "لمن؟",
  5: "كيف ومتى؟", 6: "ما الذي سيتغيّر، وكيف نتحقق؟", 7: "بكم؟", 8: "وماذا لو تغيّرت الظروف؟",
  9: "أسئلة الشركاء", 10: "ما المطلوب منكم؟",
};
const pageRoutes: Record<string, number> = {
  problem: 1, gap: 2, solution: 3, tracks: 4, plan: 5,
  impact: 6, budget: 7, assurance: 8, faq: 9, partnership: 10,
};
const pageSlugs: Record<number, string> = Object.fromEntries(Object.entries(pageRoutes).map(([slug, page]) => [page, slug]));

type ViewMode = "story" | "book" | "scroll";

const storyScenes = [
  { number: "01", label: "المشهد الأول", title: "في الخيمة، يبدأ السؤال", intro: "قبل أن نتحدث عن المبادرة، نبدأ من لحظة يعرفها كل بيت: شخص يحمل أكثر مما يستطيع، وآخر يحتاج أن يجد من يقترب.", prompt: "استمع إلى المشهد، ثم اقلب الصفحة.", page: 0, image: heroImage, caption: "ملاحظة ميدانية · حين تتشارك القوة", tone: "opening" },
  { number: "02", label: "المشهد الثاني", title: "حين يصبح الاهتمام لغة القوة", intro: "لا نريد شعارات جديدة؛ نريد لغة يومية تجعل الإصغاء والمشاركة والرحمة علامات قوة يمكن ممارستها.", prompt: "هنا تتغير زاوية النظر.", page: 1, image: communityImage, caption: "من البيت يبدأ التغيير الحقيقي", tone: "warm" },
  { number: "03", label: "المشهد الثالث", title: "البيت لا يحتاج بطلاً وحيداً", intro: "الوعد بسيط ومحدد: نخفف الضغط عن البيت، ونقيس ما يتغير حين تتحول الرعاية من عبء فردي إلى مسؤولية مشتركة.", prompt: "الأثر يبدأ من خطوة قابلة للملاحظة.", page: 2, image: mentorshipImage, caption: "من الحمل الفردي إلى الشراكة", tone: "blue" },
  { number: "04", label: "المشهد الرابع", title: "ثلاثة أبواب، طريق واحد", intro: "لكل شخص مدخله إلى الحكاية: شاب يريد أن يتعلم، أسرة تريد مساحة أمان، وصبايا يضعن معنى السند في قلب الحوار.", prompt: "اختر الباب الأقرب إلى قصتك.", page: 3, image: communityImage, caption: "ثلاثة مسارات · بيت واحد", tone: "sage" },
  { number: "05", label: "المشهد الخامس", title: "من الخيمة إلى الشاشة", intro: "حين تُحكى المواقف الصغيرة بصدق، تنتقل من بيت إلى بيت. لذلك يصبح المحتوى الرقمي جسراً للحوار، لا بديلاً عن الحياة.", prompt: "شاهد الفكرة وهي تتحرك بين الناس.", page: 4, image: heroImage, caption: "قصة قصيرة · أثر طويل", tone: "terracotta" },
  { number: "06", label: "المشهد السادس", title: "لا يكفي أن نحلم؛ نحتاج إلى موعد", intro: "القصة لا تبقى معلقة. هناك ثمانية أسابيع، فريق، جلسات، محتوى، وتقييم يحول النية إلى مسار يمكن متابعته.", prompt: "افتح الخطة، واعرف ما الذي يحدث ومتى.", page: 5, image: communityImage, caption: "ثمانية أسابيع · خطوة بعد خطوة", tone: "sand" },
  { number: "07", label: "المشهد السابع", title: "كل حركة تُقاس حين تصبح عادة", intro: "الإصغاء والشراكة والاحتواء والقدوة ليست كلمات معلقة؛ إنها أدوات يومية وميزانية شفافة لكل دولار فيها وظيفة.", prompt: "المعنى يصبح أقوى عندما نراه في الفعل.", page: 6, image: mentorshipImage, caption: "الأداة التي تصبح عادة", tone: "sage" },
  { number: "08", label: "المشهد الثامن", title: "نترك خيطاً يكمل بعدنا", intro: "الاستدامة ليست وعداً بعيداً. ندرّب سفراء، نجهز بدائل آمنة، ونوثق ما حدث كي تستطيع الحكاية أن تستمر.", prompt: "كل نهاية جيدة تترك شخصاً قادراً على الإكمال.", page: 7, image: communityImage, caption: "الخيط لا ينقطع عند آخر جلسة", tone: "blue" },
  { number: "09", label: "المشهد الأخير", title: "الدور الآن لك", intro: "لا تحتاج إلى منصة كبيرة كي تبدأ. اسمع شخصاً، شارك حملاً، اترك مساحة للكلام، وانقل الخيط إلى شخص آخر.", prompt: "أكمل القصة من المكان الذي تعرفه.", page: 8, image: mentorshipImage, caption: "هنا يبدأ الإصغاء", tone: "closing" },
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
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [modal, setModal] = useState<"guide" | "story" | "budget" | null>(null);
  const [turnDirection, setTurnDirection] = useState<"next" | "prev">("next");
  const touchStart = useRef<number | null>(null);

  // وضع القصة تسلسل مستقل من 9 مشاهد، بينما الدفتر 15 صفحة — لكل وضع حدّه الخاص.
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
          <SectionKicker>مقترح شراكة استراتيجية · قطاع غزة</SectionKicker>
          <h1>سند<br /><em>وعمار</em></h1>
          <p>نُدرِّب الرجال والشباب والأسر في غزة على الرعاية والشراكة، ونقيس ما يتغيّر.</p>
          <div className="cover-line" />
          <div className="cover-figures">
            <div><strong>500</strong><span>مستفيد مباشر</span></div>
            <div><strong>50,000</strong><span>وصول رقمي</span></div>
            <div><strong>08</strong><span>أسابيع</span></div>
            <div><strong>$4,000</strong><span>الميزانية</span></div>
          </div>
          <button className="notebook-primary" onClick={() => goPage(1)}>ابدأ من المشكلة <ArrowLeft size={17} /></button>
        </div>
        <div className="cover-visual">
          <img src={heroImage} alt="أب وطفل داخل مخيم نزوح في غزة" />
          <div className="cover-stamp"><span>الكلفة</span><strong>8$ للمستفيد</strong><i>✦</i></div>
          <small>مبادرة مجتمعية · قطاع غزة</small>
        </div>
      </div>
      <div className="cover-footer"><span>وثيقة موجهة للمؤسسات الشريكة والداعمة</span><span>سند وعمار / 2026</span></div>
    </article>;

    if (page === 1) return <article className="notebook-page page-problem">
      {pageMark(page)}
      <SectionKicker>المشكلة</SectionKicker>
      {pageAsk(page)}
      <h2 className="page-title">البيت النازح يحمل <em>أكثر مما يحتمل.</em></h2>
      <div className="point-list">{problemPoints.map(([title, text, Icon]) => <div key={title}><Icon size={18} /><div><strong>{title}</strong><p>{text}</p></div></div>)}</div>
      <blockquote className="context-quote"><Quote size={19} /><p>الرجولة في الظروف الطارئة ليست بمعزل عن الألم، بل هي القدرة على حمل المسؤولية بالرحمة.</p></blockquote>
      {nextLink(page)}
    </article>;

    if (page === 2) return <article className="notebook-page page-gap">
      {pageMark(page)}
      <SectionKicker>الفجوة</SectionKicker>
      {pageAsk(page)}
      <h2 className="page-title">الإغاثة تسدّ الجوع، <em>لا الصدع.</em></h2>
      <div className="point-list">{gapPoints.map(([title, text, Icon]) => <div key={title}><Icon size={18} /><div><strong>{title}</strong><p>{text}</p></div></div>)}</div>
      <div className="gap-callout"><strong>الخلاصة</strong><p>هناك فراغ نوعي في الاستجابة الإنسانية: لا أحد يعمل على الرجل والشاب داخل الأسرة النازحة. «سند وعمار» تملأ هذا الفراغ.</p></div>
      {nextLink(page)}
    </article>;

    if (page === 3) return <article className="notebook-page page-solution">
      {pageMark(page)}
      <SectionKicker>الحل</SectionKicker>
      {pageAsk(page)}
      <div className="solution-layout">
        <div>
          <h2 className="page-title">نُحوّل الرعاية <em>إلى مهارة تُدرَّب.</em></h2>
          <div className="point-list point-list--compact">{solutionPoints.map(([title, text]) => <div key={title}><Check size={16} /><div><strong>{title}</strong><p>{text}</p></div></div>)}</div>
        </div>
        <div className="page-photo"><img src={mentorshipImage} alt="جلسة دعم نفسي-اجتماعي داخل خيمة في غزة" /><span>جلسة دعم وتعافٍ · نموذج ميداني</span></div>
      </div>
      <button className="small-text-action" onClick={() => setModal("guide")}><Video size={14} /> محاور المقاطع العشرة</button>
      {nextLink(page)}
    </article>;

    if (page === 4) return <article className="notebook-page page-tracks">
      {pageMark(page)}
      <SectionKicker>المسارات الثلاثة</SectionKicker>
      {pageAsk(page)}
      <h2 className="page-title">ثلاث شرائح، <em>ثلاثة مداخل.</em></h2>
      <div className="notebook-track-list">{tracks.map((track) => { const Icon = track.icon; const open = activeTrack === track.id; return <div className={`notebook-track-card notebook-track-card--${track.tone} ${open ? "is-open" : ""}`} key={track.id}><div className="track-card-main"><span className="track-index">{track.number}</span><Icon size={24} /><div><small>{track.label}</small><h3>{track.title}</h3><p>{track.description}</p></div></div><button onClick={() => setActiveTrack(open ? null : track.id)} aria-expanded={open}>{open ? "أغلق" : "التفاصيل"}{open ? <ChevronDown size={15} /> : <Plus size={15} />}</button>{open && <div className="notebook-track-detail"><p className="track-detail-overview">{track.overview}</p><ul className="track-detail-activities">{track.activities.map((activity) => <li key={activity}><Check size={14} />{activity}</li>)}</ul><p className="track-detail-outcome">{track.outcome}</p></div>}</div>; })}</div>
      {nextLink(page)}
    </article>;

    if (page === 5) return <article className="notebook-page page-plan">
      {pageMark(page)}
      <SectionKicker>المنهجية والخطة</SectionKicker>
      {pageAsk(page)}
      <h2 className="page-title">أربع ممارسات، <em>ثمانية أسابيع.</em></h2>
      <div className="practice-chips">{practices.map(([num, title]) => <span key={num}><b>{num}</b>{title}</span>)}</div>
      <div className="notebook-plan-layout">
        <div className="notebook-week-tabs">{weeks.map((week, index) => <button className={activeWeek === index ? "is-active" : ""} onClick={() => setActiveWeek(index)} key={week[0]}><small>أسبوع</small><strong>{week[0]}</strong><i /></button>)}</div>
        <div className="notebook-week-detail">
          <div className="week-detail-top"><span>الأسبوع {weeks[activeWeek][0]} / 08</span><CalendarDays size={18} /></div>
          <h3>{weeks[activeWeek][1]}</h3>
          <small className="week-owner-note">المسؤول: {weeks[activeWeek][2]}</small>
          <div className="week-task-list">{weeks[activeWeek][3].map((task) => <span key={task}><Check size={14} />{task}</span>)}</div>
          <div className="week-output"><small>المخرج</small><strong>{weeks[activeWeek][4]}</strong></div>
          <div className="week-arrows"><button onClick={() => setActiveWeek((activeWeek + weeks.length - 1) % weeks.length)}><ArrowRight size={14} /> السابق</button><button onClick={() => setActiveWeek((activeWeek + 1) % weeks.length)}>التالي <ArrowLeft size={14} /></button></div>
        </div>
      </div>
      {nextLink(page)}
    </article>;

    if (page === 6) return <article className="notebook-page page-impact">
      {pageMark(page)}
      <SectionKicker>الأثر والقياس</SectionKicker>
      {pageAsk(page)}
      <h2 className="page-title">أربعة أهداف، <em>أربعة مؤشرات.</em></h2>
      <div className="objective-cards">{objectives.map(([goal, , value, unit, verification, Icon], index) => <div className="objective-card" key={goal}>
        <div className="objective-card-head"><span className="objective-index">{String(index + 1).padStart(2, "0")}</span><Icon size={17} /></div>
        <strong className="objective-title">{goal}</strong>
        <div className="objective-metric"><b>{value}</b><span>{unit}</span></div>
        <div className="objective-verify"><Check size={12} />{verification}</div>
      </div>)}</div>
      <div className="impact-page-aside"><BarChart3 size={18} /><span>قياس قبلي (الأسبوع 3) وبعدي (الأسبوع 7) على المجموعة ذاتها، وتقرير ختامي بالفواتير في الأسبوع 8.</span></div>
      {nextLink(page)}
    </article>;

    if (page === 7) return <article className="notebook-page page-budget">
      {pageMark(page)}
      <SectionKicker>الكلفة والعائد</SectionKicker>
      {pageAsk(page)}
      <h2 className="page-title">4,000 دولار، <em>وكلفة 8$ للمستفيد.</em></h2>
      <div className="cost-strip">{costEfficiency.slice(0, 3).map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
      <div className="budget-book budget-book--full">
        {budgets.map(([label, amount, percent, note, color]) => <div className="budget-book-row" key={label}><div><strong>{label}</strong><b>${amount.toLocaleString("en-US")}</b></div><div className="budget-meter"><span className={color} style={{ width: percent }} /></div><small>{note} · {percent}</small></div>)}
        <div className="budget-total-row"><strong>المجموع</strong><b>$4,000</b></div>
      </div>
      <button className="small-text-action" onClick={() => setModal("budget")}><Download size={14} /> تفاصيل الميزانية</button>
      {nextLink(page)}
    </article>;

    if (page === 8) return <article className="notebook-page page-assurance">
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

    if (page === 9) return <article className="notebook-page page-faq">
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
      <div className="partnership-cta">
        <div><HeartHandshake size={17} /><p>الاستثمار في الإنسان هو الضمانة الحقيقية لصمود المجتمع.</p></div>
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
          <SectionKicker>{currentPage === 0 ? "مبادرة مجتمعية لأهل غزة" : "قصة سند وعمار"}</SectionKicker>
          <span className="story-chapter-mark">{scene.number}</span>
          <h1>{scene.title}</h1>
          <p className="story-intro">{scene.intro}</p>
          <div className="story-rule" />
          <p className="story-prompt"><CircleDot size={15} />{scene.prompt}</p>
          <div className="story-actions">
            <button className="notebook-primary" onClick={() => goPage(currentPage + 1)} disabled={currentPage === storyScenes.length - 1}>{currentPage === storyScenes.length - 1 ? "هذه لحظتك" : "أكمل القصة"} <ArrowLeft size={17} /></button>
            {currentPage > 0 && <button className="notebook-quiet" onClick={() => goPage(currentPage - 1)}><ArrowRight size={16} /> المشهد السابق</button>}
            {currentPage > 0 && currentPage < storyScenes.length - 1 && <button className="story-detail-link" onClick={() => { setViewMode("book"); goPage(scene.page); }}>اقرأ التفاصيل <FileText size={14} /></button>}
          </div>
        </div>
        <div className="story-visual-wrap">
          <div className="story-visual-frame"><img src={scene.image} alt={scene.caption} /><span className="story-visual-index">مشهد {scene.number}</span><div className="story-caption"><span>{scene.caption}</span><i>✦</i></div></div>
          <div className="story-side-note"><span>الخيط النحاسي</span><strong>{currentPage === 0 ? "يبدأ من السؤال" : currentPage === storyScenes.length - 1 ? "ينتقل إليك" : "يمرّ من بيت إلى بيت"}</strong></div>
        </div>
      </div>
      <div className="story-scene-footer"><span>سند وعمار · الرجولة التي تسند، لا التي تثقل</span><span>{currentPage === storyScenes.length - 1 ? "النهاية التي تفتح باباً" : "الفصل التالي يضيف خيطاً جديداً"}</span></div>
      <div className="story-navigation"><button className="story-arrow" onClick={() => goPage(currentPage - 1)} disabled={currentPage === 0} aria-label="المشهد السابق"><ArrowRight size={18} /></button><div className="story-dots">{storyScenes.map((item, index) => <button key={item.number} className={index === currentPage ? "is-active" : ""} onClick={() => goPage(index)} aria-label={`الانتقال إلى ${item.label}`}><span>{item.number}</span></button>)}</div><button className="story-arrow" onClick={() => goPage(currentPage + 1)} disabled={currentPage === storyScenes.length - 1} aria-label="المشهد التالي"><ArrowLeft size={18} /></button></div>
      <div className="story-hint"><span>اسحب لمتابعة الحكاية</span><i>✦</i><span>أو استخدم الأسهم</span></div>
    </main>;
  };

  const renderModal = () => {
    if (modal === "guide") return <><div className="modal-symbol"><Video size={22} /></div><SectionKicker>الحملة الرقمية</SectionKicker><h2 id="modal-title">عشرة مقاطع<br /><em>أقل من دقيقة.</em></h2><p>محتوى قصير قابل للمشاركة يوسّع أثر الجلسات إلى بيوت لم تحضرها، بميزانية 1,200 دولار ومستهدف 50,000 وصول.</p><div className="modal-episode-list">{episodes.map(([number, title, type, duration]) => <div key={number}><span>{number}</span><strong>{title}</strong><small>{type} · {duration}</small></div>)}</div><button className="notebook-primary modal-button" onClick={() => setModal(null)}>إغلاق <X size={16} /></button></>;
    if (modal === "budget") return <><div className="modal-symbol"><WalletCards size={22} /></div><SectionKicker>شفافية التمويل</SectionKicker><h2 id="modal-title">ميزانية 4,000<br /><em>دولار، بندًا بندًا.</em></h2><p>كل دولار في هذه المبادرة له وظيفة محددة ومُوثقة، وتُختتم بتقرير مالي نهائي يُسلَّم للشركاء.</p><div className="modal-budget-list">{budgets.map(([label, amount, percent, note]) => <div key={label}><div><strong>{label}</strong><b>${amount.toLocaleString("en-US")}</b></div><span>{note} · {percent}</span></div>)}</div><button className="notebook-primary modal-button" onClick={() => setModal(null)}>فهمت، إغلاق <X size={16} /></button></>;
    return <><div className="modal-symbol"><MessageCircle size={22} /></div><SectionKicker>التواصل والشراكة</SectionKicker><h2 id="modal-title">لنبدأ<br /><em>حواراً مؤسسياً.</em></h2><p>أرسل استفسارك أو مستوى الشراكة الذي يناسب مؤسستك، ويتواصل معك فريق المبادرة بملف تفصيلي وخطة تنفيذ مقترحة.</p><form className="story-form" onSubmit={(event) => { event.preventDefault(); setModal(null); }}><label>الاسم والمؤسسة <input required placeholder="مثلاً: أحمد خالد · مؤسسة الأمل للتنمية" /></label><label>مستوى الشراكة المقترح <input placeholder="تمويل كامل، تبنّي محور، دعم عيني..." /></label><label>رسالتك <textarea required rows={3} placeholder="اكتب استفسارك أو ما تودّ مناقشته" /></label><button className="notebook-primary modal-button" type="submit">أرسل الطلب <Send size={17} /></button></form></>;
  };

  const bookClass = `notebook-app ${nightMode ? "notebook-app--night" : ""} ${viewMode === "scroll" ? "notebook-app--scroll" : viewMode === "story" ? "notebook-app--story" : "notebook-app--book"}`;
  return <div className={bookClass} dir="rtl">
    <header className="notebook-header"><button className="notebook-brand" onClick={() => { setViewMode("book"); goPage(0); }}><span><img src={logoUrl} alt="" /></span><b>سند وعمار</b><small>قصة الرجولة الإيجابية</small></button><div className="notebook-view-switch"><span>طريقة العرض</span><button className={viewMode === "story" ? "active" : ""} onClick={() => setViewMode("story")}><Play size={15} /> قصة</button><button className={viewMode === "book" ? "active" : ""} onClick={() => setViewMode("book")}><BookOpen size={15} /> دفتر</button><button className={viewMode === "scroll" ? "active" : ""} onClick={() => setViewMode("scroll")}><FileText size={15} /> تمرير</button><button className="night-switch" onClick={() => setNightMode(!nightMode)}>{nightMode ? <Sun size={15} /> : <Moon size={15} />} {nightMode ? "نهار" : "ليل"}</button></div><button className="notebook-menu-button" aria-label="فتح القائمة" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></header>
    {menuOpen && <nav className="notebook-menu"><button onClick={() => go("problem")}>المشكلة</button><button onClick={() => go("solution")}>الحل</button><button onClick={() => go("tracks")}>المسارات</button><button onClick={() => go("plan")}>المنهجية والخطة</button><button onClick={() => go("impact")}>الأثر والقياس</button><button onClick={() => go("budget")}>الكلفة</button><button onClick={() => go("faq")}>الأسئلة الشائعة</button><button onClick={() => go("partnership")}>الشراكة <ArrowLeft size={15} /></button></nav>}
    {viewMode === "story" ? renderStoryScene() : viewMode === "book" ? <><div className="notebook-controls"><button onClick={() => setContentsOpen(true)}><BookOpen size={15} /> الفهرس</button><button disabled={spreadOf(currentPage) === 0} onClick={stepBackward}><ArrowRight size={15} /> السابق</button><span>{pairStartOf(currentPage) === 0 ? "صفحة 1" : `صفحتا ${pairStartOf(currentPage) + 1}-${pairStartOf(currentPage) + 2}`} / {pageTitles.length}</span><button disabled={spreadOf(currentPage) === maxSpread} onClick={stepForward}>التالي <ArrowLeft size={15} /></button></div><main className={`book-stage ${pairStartOf(currentPage) !== 0 ? "book-stage--spread" : ""}`} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>{<div className={`page-turn page-turn--${turnDirection}`} key={pairStartOf(currentPage)}>{pairStartOf(currentPage) === 0 ? renderPage(0) : <div className="book-spread"><div className="book-spread-page">{renderPage(pairStartOf(currentPage))}</div><div className="book-spread-fold" /><div className="book-spread-page">{renderPage(pairStartOf(currentPage) + 1)}</div></div>}</div>}<div className="book-hint"><span>اسحب لقلب الصفحات</span><i>✦</i><span>أو استخدم الأسهم</span></div></main></> : <main className="scroll-stage">{pageTitles.map((_, index) => <section id={`scroll-${pageSlugs[index] ?? "cover"}`} key={index}>{renderPage(index)}</section>)}</main>}
    <footer className="notebook-footer"><span>صُنع بالاهتمام <HeartHandshake size={13} /></span><span>سند وعمار · غزة · 2026</span><button onClick={() => setModal("story")}><Mail size={13} /> تواصل معنا</button></footer>
    {contentsOpen && <div className="contents-overlay" onClick={() => setContentsOpen(false)}><div className="contents-card" onClick={(event) => event.stopPropagation()}><button className="contents-close" onClick={() => setContentsOpen(false)}><X size={17} /></button><SectionKicker>فهرس الدفتر</SectionKicker><h2>خيط واحد،<br /><em>فصول كثيرة.</em></h2><div>{pageTitles.map((title, index) => <button key={title} onClick={() => { setContentsOpen(false); goPage(index); }}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><ArrowLeft size={15} /></button>)}</div></div></div>}
    {modal && <div className="modal-backdrop" role="presentation" onClick={() => setModal(null)}><div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setModal(null)} aria-label="إغلاق"><X size={19} /></button>{renderModal()}</div></div>}
  </div>;
}
