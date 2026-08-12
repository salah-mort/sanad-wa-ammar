/*
 * فلسفة التصميم: "خيط السند" داخل دفتر ميداني تفاعلي.
 * الصفحة هنا فصل، والتنقل بينها فعل قراءة؛ لا نضيف زخرفة لا تخدم الحكاية.
 */
import { useEffect, useRef, useState } from "react";
import {
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
  UsersRound,
  Video,
  WalletCards,
  Waypoints,
  X,
} from "lucide-react";

const logoUrl = "/images/logo.svg";
const heroImage = "/images/hero-solidarity.jpg";
const communityImage = "/images/community-circle.jpg";
const mentorshipImage = "/images/mentorship-circle.jpg";

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

const steps = [
  ["01", "اسمع", "ما الحمل الذي يمكنني تخفيفه اليوم؟", "خطوة أولى"],
  ["02", "شارك", "اختر مهمة واحدة في البيت أو الحي وقم بها دون انتظار تصفيق.", "تطبيق يومي"],
  ["03", "احتوِ", "اترك وقتاً آمناً لطفل أو شريكة أو صديق كي يتكلم.", "مساحة أمان"],
  ["04", "انقل الخيط", "احكِ ما تعلمته لشخص آخر كي لا تبقى المبادرة حكاية فردية.", "أثر مستمر"],
];

const impactStats = [
  ["500", "+", "مستفيد مباشر", "شباب، أزواج، أسر وصبايا", UsersRound],
  ["50,000", "+", "وصول رقمي", "عبر الحملة والمحتوى القصير", Globe2],
  ["12", " جلسة", "جلسة ميدانية", "في مراكز الإيواء والمساحات الآمنة", CalendarDays],
  ["75", "%", "تحول مستهدف", "في الوعي والممارسة بعد التقييم", Target],
] as const;

const objectives = [
  ["تخفيف الضغط الأسري", "إعادة توزيع المسؤوليات اليومية داخل الأسرة النازحة عبر الشراكة والاحتواء، بدل تركها على كتف واحد.", "استفادة مباشرة لـ 500 فرد عبر الجلسات واللقاءات الوجاهية"],
  ["بناء وعي الشباب", "تمكين الشباب والصبايا من أدوات التواصل الفعّال وإدارة الضغوط النفسية في بيئة النزوح.", "تدريب 10 سفراء شباب لنقل المعرفة واستدامة الحوار"],
  ["صناعة محتوى داعم", "إنتاج مواد توعوية رقمية قصيرة تحاكي تفاصيل الحياة اليومية داخل الخيام والمساحات الآمنة.", "تحقيق أكثر من 50,000 وصول تفاعلي عبر المنصات الرقمية"],
  ["تحقيق التحول السلوكي", "ترسيخ ممارسات الإصغاء والشراكة كبدائل يومية للتوتر والصلابة الفردية.", "معدل رضا وتحول سلوكي 75% فأكثر بين المشاركين، مقاس قبل وبعد"],
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

const pageTitles = ["الغلاف", "الفكرة", "الوعد", "المسارات", "الحملة الرقمية", "خطة 8 أسابيع", "الممارسة والميزانية", "الاستدامة والأسئلة", "شارك الخيط"];
const pageRoutes: Record<string, number> = { manifesto: 1, impact: 2, tracks: 3, campaign: 4, plan: 5, practices: 6, faq: 7, start: 8, join: 8 };

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
  const [viewMode, setViewMode] = useState<ViewMode>("story");
  const [nightMode, setNightMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contentsOpen, setContentsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [modal, setModal] = useState<"guide" | "story" | "budget" | null>(null);
  const [turnDirection, setTurnDirection] = useState<"next" | "prev">("next");
  const touchStart = useRef<number | null>(null);

  const goPage = (page: number) => {
    const bounded = Math.max(0, Math.min(pageTitles.length - 1, page));
    setTurnDirection(bounded >= currentPage ? "next" : "prev");
    setCurrentPage(bounded);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const go = (key: string) => {
    setMenuOpen(false);
    if (viewMode !== "scroll") goPage(pageRoutes[key] ?? 0);
    else document.getElementById(`scroll-${key}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (viewMode === "scroll" || modal || contentsOpen) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowDown") goPage(currentPage + 1);
      if (event.key === "ArrowRight" || event.key === "ArrowUp") goPage(currentPage - 1);
      if (event.key === "Escape") { setContentsOpen(false); setModal(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentPage, viewMode, modal, contentsOpen]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => { touchStart.current = event.clientX; };
  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (touchStart.current === null || viewMode === "scroll") return;
    const delta = event.clientX - touchStart.current;
    if (Math.abs(delta) > 55) goPage(delta < 0 ? currentPage + 1 : currentPage - 1);
    touchStart.current = null;
  };

  const renderPage = (page: number) => {
    if (page === 0) return <article className="notebook-page notebook-cover"><div className="cover-label">دفتر المبادرة <span>2026</span></div><div className="cover-scribble">✦</div><div className="cover-layout"><div className="cover-copy"><SectionKicker>مبادرة مجتمعية لأهل غزة</SectionKicker><h1>سند<br /><em>وعمار</em></h1><p>مبادرة مجتمعية للرجولة الإيجابية والتماسك الأسري في غزة</p><div className="cover-line" /><span className="cover-prompt">اقلب الصفحة، وابدأ من السؤال الأول.</span><button className="notebook-primary" onClick={() => goPage(1)}>افتح الدفتر <ArrowLeft size={17} /></button></div><div className="cover-visual"><img src={heroImage} alt="أب وأطفال في لحظة تضامن وأمل" /><div className="cover-stamp"><span>القوة</span><strong>حين تتشارك</strong><i>✦</i></div><small>ملاحظة ميدانية 01 / الخيمة</small></div></div><div className="cover-footer"><span>الرجولة التي تسند، لا التي تثقل</span><span>سند وعمار / 01</span></div></article>;
    if (page === 1) return <article className="notebook-page page-idea"><div className="page-number">02 <span>/ 09</span></div><SectionKicker>الفكرة</SectionKicker><div className="idea-grid"><div><h2>مبادرة مجتمعية<br /><em>تعيد تعريف</em><br />الرجولة.</h2><p className="page-lead">سند وعمار مبادرة نفسية-اجتماعية مدتها ثمانية أسابيع، تعمل مع 500 مستفيد مباشر من الشباب والأسر والصبايا في غزة عبر جلسات ميدانية ومحتوى رقمي، لتحويل الرعاية والإصغاء والشراكة المنزلية إلى أدوات قوة يومية بدل الصلابة الفردية المنهكة.</p></div><div className="idea-side"><div className="page-photo"><img src={communityImage} alt="تعاون مجتمعي في مساحة مفتوحة" /><span>من البيت يبدأ التغيير الحقيقي</span></div><blockquote><Quote size={19} /><p>لا تقدّم المبادرة إغاثة مادية، بل تبني وعياً وسلوكاً يومياً يخفف العبء عن البيت النازح.</p></blockquote></div></div><div className="idea-context"><div><Clock3 size={17} /><strong>ضغط غير مسبوق</strong><p>النزوح المستمر ومراكز الإيواء يضاعفان العبء النفسي على الرجال والشباب، ويثقلان صورة الرجولة القائمة على الصلابة الفردية المطلقة.</p></div><div><ShieldCheck size={17} /><strong>فجوة في الاستجابة</strong><p>البرامج الإغاثية المعتادة تغطي الاحتياج المادي، وتترك فراغاً نوعياً في الدعم النفسي والاجتماعي للأسرة النازحة.</p></div><div><HeartHandshake size={17} /><strong>الفرصة</strong><p>تحويل الرعاية والإصغاء وتقاسم عبء الخيمة إلى ممارسة يومية تُعيد للبيت مساحة أمان متبادلة.</p></div></div><div className="page-bottom-note"><span>01 / 04</span><p>سند وعمار مساحة عملية للرجال والشباب والأسر والصبايا كي يصنعوا معاً معنى أكثر رحمة وشجاعة للرجولة، عبر ثلاثة مسارات وخطة تنفيذية من ثمانية أسابيع وميزانية شفافة قدرها 4,000 دولار.</p></div></article>;
    if (page === 2) return <article className="notebook-page page-impact"><div className="page-number">03 <span>/ 09</span></div><SectionKicker>الوعد والأثر</SectionKicker><div className="impact-page-heading"><h2>نخفف الضغط<br /><em>عن البيت.</em></h2><p>من المعيل الوحيد إلى الشريك الحقيقي؛ نتابع الحضور والوصول وتغير الوعي كي يستمر الأثر.</p></div><div className="impact-page-grid">{impactStats.map(([value, suffix, label, note, Icon]) => <div className="impact-page-stat" key={label}><Icon size={20} /><strong>{value}<small>{suffix}</small></strong><b>{label}</b><span>{note}</span></div>)}</div><div className="objectives-list">{objectives.map(([goal, description, indicator], index) => <div className="objectives-row" key={goal}><span>0{index + 1}</span><div><strong>{goal}</strong><p>{description}</p></div><div><p>{indicator}</p><b>مؤشر الأثر</b></div></div>)}</div><div className="impact-page-aside"><BarChart3 size={18} /><span>مؤشرات مستهدفة ضمن خطة العمل التنفيذية ذات الثمانية أسابيع.</span><span className="aside-mark">خيط واحد، قياس واضح</span></div></article>;
    if (page === 3) return <article className="notebook-page page-tracks"><div className="page-number">04 <span>/ 09</span></div><SectionKicker>المسارات الثلاثة</SectionKicker><div className="page-heading-row"><h2>لكل بيتٍ <em>باب.</em></h2><p>اختر المسار الأقرب لك، ثم افتح تفاصيله.</p></div><div className="notebook-track-list">{tracks.map((track) => { const Icon = track.icon; const open = activeTrack === track.id; return <div className={`notebook-track-card notebook-track-card--${track.tone} ${open ? "is-open" : ""}`} key={track.id}><div className="track-card-main"><span className="track-index">{track.number}</span><Icon size={24} /><div><small>{track.label}</small><h3>{track.title}</h3><p>{track.description}</p></div></div><button onClick={() => setActiveTrack(open ? null : track.id)} aria-expanded={open}>{open ? "أغلق" : "افتح المسار"}{open ? <ChevronDown size={15} /> : <Plus size={15} />}</button>{open && <div className="notebook-track-detail"><p className="track-detail-overview">{track.overview}</p><ul className="track-detail-activities">{track.activities.map((activity) => <li key={activity}><Check size={14} />{activity}</li>)}</ul><p className="track-detail-outcome">{track.outcome}</p></div>}</div>; })}</div><div className="page-margin-note">لكل حكاية مدخل، ولكل بيت فرصة للبدء.</div></article>;
    if (page === 4) return <article className="notebook-page page-campaign"><div className="page-number">05 <span>/ 09</span></div><SectionKicker>الحملة الرقمية</SectionKicker><div className="campaign-page-head"><div><h2>من الخيمة<br /><em>إلى الشاشة.</em></h2><p>عشرة مقاطع قصيرة، صادقة وقابلة للمشاركة، تضع الرجولة الإيجابية داخل مواقف يومية نعرفها.</p></div><div className="campaign-card-note"><Video size={20} /><strong>10</strong><span>مقاطع<br />أقل من دقيقة</span></div></div><div className="episode-book-grid">{episodes.map(([number, title, type, duration]) => <button className="episode-book-card" key={number} onClick={() => setModal("guide")}><span>{number}</span><i><Play size={11} fill="currentColor" /></i><strong>{title}</strong><small>{type} · {duration}</small></button>)}</div><div className="page-bottom-note"><span>#خيط_السند</span><p>المحتوى يفتح باباً للحوار، لا يقدّم وصفة مثالية للحياة.</p></div></article>;
    if (page === 5) return <article className="notebook-page page-plan"><div className="page-number">06 <span>/ 09</span></div><SectionKicker>خطة 8 أسابيع</SectionKicker><div className="page-heading-row"><h2>من الفكرة<br /><em>إلى الأثر.</em></h2><p>مساران متوازيان: عمل ميداني يستمع ويجرب، ومحتوى يوثق ويوسع الوصول.</p></div><div className="notebook-plan-layout"><div className="notebook-week-tabs">{weeks.map((week, index) => <button className={activeWeek === index ? "is-active" : ""} onClick={() => setActiveWeek(index)} key={week[0]}><small>أسبوع</small><strong>{week[0]}</strong><i /></button>)}</div><div className="notebook-week-detail"><div className="week-detail-top"><span>الأسبوع {weeks[activeWeek][0]} / 08</span><CalendarDays size={18} /></div><h3>{weeks[activeWeek][1]}</h3><small className="week-owner-note">{weeks[activeWeek][2]}</small><div className="week-task-list">{weeks[activeWeek][3].map((task) => <span key={task}><Check size={14} />{task}</span>)}</div><div className="week-output"><small>المخرج المتوقع</small><strong>{weeks[activeWeek][4]}</strong></div><div className="week-arrows"><button onClick={() => setActiveWeek((activeWeek + weeks.length - 1) % weeks.length)}><ArrowRight size={14} /> السابق</button><button onClick={() => setActiveWeek((activeWeek + 1) % weeks.length)}>التالي <ArrowLeft size={14} /></button></div></div></div></article>;
    if (page === 6) return <article className="notebook-page page-practice"><div className="page-number">07 <span>/ 09</span></div><SectionKicker>أدوات السند والشفافية</SectionKicker><div className="practice-budget-grid"><div><h2>أربع حركات<br /><em>تغيّر الجو.</em></h2><div className="practice-book-list">{practices.map(([num, title, text]) => <div key={num}><span>{num}</span><div><strong>{title}</strong><p>{text}</p></div><Check size={15} /></div>)}</div></div><div className="budget-book"><div className="budget-title"><span>شفافية التمويل</span><strong>$4,000</strong><small>كل دولار له وظيفة.</small></div>{budgets.map(([label, amount, percent, note, color]) => <div className="budget-book-row" key={label}><div><strong>{label}</strong><b>${amount.toLocaleString("en-US")}</b></div><div className="budget-meter"><span className={color} style={{ width: percent }} /></div><small>{note} · {percent}</small></div>)}<button className="small-text-action" onClick={() => setModal("budget")}><Download size={14} /> اطلب ملخص الميزانية</button></div></div></article>;
    if (page === 7) return <article className="notebook-page page-resilience"><div className="page-number">08 <span>/ 09</span></div><SectionKicker>الاستدامة والأسئلة</SectionKicker><div className="resilience-heading"><h2>نترك وراءنا<br /><em>أشخاصاً يكملون.</em></h2><p>نختار وندرب 10 من قيادات الشباب المشاركين ليكونوا سفراء السند، ونحافظ على المرونة والشفافية من أول جلسة إلى آخر تقرير، وفق بروتوكولات حماية بديلة تتكيف مع تقلبات الأوضاع الميدانية في غزة.</p></div><div className="resilience-notes"><div><Sparkles size={18} /><strong>10 سفراء للسند</strong><span>قيادات شبابية تنقل المعرفة</span></div><div><ShieldCheck size={18} /><strong>خطة بديلة آمنة</strong><span>جلسات مصغرة أو تواصل آمن عند الطوارئ</span></div><div><ClipboardCheck size={18} /><strong>تقرير موثق</strong><span>فواتير وبيانات وتقييم ختامي للشركاء</span></div><div><UsersRound size={18} /><div><strong>لامركزية ميدانية</strong><span>الاعتماد على قادة محليين وسفراء السند في كل منطقة يضمن استمرار النشاط حتى في أوقات الانقطاع، دون التوقف على مركز تنسيق واحد.</span></div></div></div><div className="faq-book-list">{faqs.map(([question, answer], index) => <div className={`faq-book-item ${activeFaq === index ? "is-open" : ""}`} key={question}><button onClick={() => setActiveFaq(activeFaq === index ? null : index)}>{question}{activeFaq === index ? <ChevronDown size={15} /> : <Plus size={15} />}</button>{activeFaq === index && <p>{answer}</p>}</div>)}</div><div className="page-margin-note">المرونة ليست استثناءً؛ إنها جزء من الخطة.</div></article>;
    return <article className="notebook-page page-join"><div className="page-number">09 <span>/ 09</span></div><div className="join-page-layout"><div><SectionKicker>شارك الخيط</SectionKicker><h2>ابدأ من المكان<br /><em>الذي تعرفه.</em></h2><p>شارك فكرة، اقترح جلسة، أو احكِ عن موقف جعل بيتك أكثر أماناً. المبادرة تكبر عندما تنتقل من الشاشة إلى الحياة.</p><p className="join-partner-note"><HeartHandshake size={15} /> للمؤسسات الشريكة: ندعوكم لدعم هذا المقترح عبر تمويل الميزانية، أو تبنّي محاور الحملة الرقمية، أو توفير الدعم الاستشاري.</p><div className="join-page-buttons"><button className="notebook-primary" onClick={() => setModal("story")}>اكتب لنا <Send size={16} /></button><button className="notebook-quiet" onClick={() => goPage(0)}>عد إلى الغلاف <ArrowUpLeft size={16} /></button></div></div><div className="join-page-visual"><img src={mentorshipImage} alt="دائرة حوار داعمة بين شباب وأفراد من المجتمع" /><div><Mic2 size={16} />هنا يبدأ الإصغاء</div></div></div><div className="steps-book-row">{steps.map(([number, title, text, tag]) => <div key={number}><span>{number} · {tag}</span><strong>{title}</strong><p>{text}</p></div>)}</div><div className="join-signoff">خيط واحد، بيوت كثيرة <HeartHandshake size={16} /></div></article>;
  };

  const renderStoryScene = () => {
    const scene = storyScenes[currentPage];
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
    if (modal === "guide") return <><div className="modal-symbol"><BookOpen size={22} /></div><SectionKicker>دليل السند</SectionKicker><h2 id="modal-title">الفكرة تبدأ<br /><em>من سؤال.</em></h2><p>ما الحمل الذي يمكنني تخفيفه اليوم؟ هذا السؤال مدخلنا إلى رجولة لا تقاس بالسيطرة، بل بالقدرة على الاقتراب، والمشاركة، وصناعة الأمان.</p><div className="modal-choices"><div><Check size={15} /> اسمع قبل أن تحكم</div><div><Check size={15} /> شارك العمل اليومي</div><div><Check size={15} /> اترك مساحة للكلام</div></div><button className="notebook-primary modal-button" onClick={() => { setModal(null); goPage(8); }}>ابدأ بخطوة صغيرة <ArrowLeft size={17} /></button></>;
    if (modal === "budget") return <><div className="modal-symbol"><WalletCards size={22} /></div><SectionKicker>شفافية التمويل</SectionKicker><h2 id="modal-title">ميزانية 4,000<br /><em>دولار، بندًا بندًا.</em></h2><p>كل دولار في هذه المبادرة له وظيفة محددة ومُوثقة، وتُختتم بتقرير مالي نهائي يُسلَّم للشركاء.</p><div className="modal-budget-list">{budgets.map(([label, amount, percent, note]) => <div key={label}><div><strong>{label}</strong><b>${amount.toLocaleString("en-US")}</b></div><span>{note} · {percent}</span></div>)}</div><button className="notebook-primary modal-button" onClick={() => setModal(null)}>فهمت، إغلاق <X size={16} /></button></>;
    return <><div className="modal-symbol"><MessageCircle size={22} /></div><SectionKicker>شارك الخيط</SectionKicker><h2 id="modal-title">ما معنى السند<br /><em>بالنسبة لك؟</em></h2><p>اكتب لنا عن موقف يومي، فكرة جلسة، أو طريقة يمكن أن تصل بها المبادرة إلى بيت أو حي جديد.</p><form className="story-form" onSubmit={(event) => { event.preventDefault(); setModal(null); }}><label>الاسم أو الصفة <input required placeholder="مثلاً: أب، شابة، متطوع..." /></label><label>رسالتك <textarea required rows={3} placeholder="اكتب ما تريد مشاركته هنا" /></label><button className="notebook-primary modal-button" type="submit">أرسل مشاركتك <Send size={17} /></button></form></>;
  };

  const bookClass = `notebook-app ${nightMode ? "notebook-app--night" : ""} ${viewMode === "scroll" ? "notebook-app--scroll" : viewMode === "story" ? "notebook-app--story" : "notebook-app--book"}`;
  return <div className={bookClass} dir="rtl">
    <header className="notebook-header"><button className="notebook-brand" onClick={() => { setViewMode("story"); goPage(0); }}><span><img src={logoUrl} alt="" /></span><b>سند وعمار</b><small>قصة الرجولة الإيجابية</small></button><div className="notebook-view-switch"><span>طريقة العرض</span><button className={viewMode === "story" ? "active" : ""} onClick={() => setViewMode("story")}><Play size={15} /> قصة</button><button className={viewMode === "book" ? "active" : ""} onClick={() => setViewMode("book")}><BookOpen size={15} /> دفتر</button><button className={viewMode === "scroll" ? "active" : ""} onClick={() => setViewMode("scroll")}><FileText size={15} /> تمرير</button><button className="night-switch" onClick={() => setNightMode(!nightMode)}>{nightMode ? <Sun size={15} /> : <Moon size={15} />} {nightMode ? "نهار" : "ليل"}</button></div><button className="notebook-menu-button" aria-label="فتح القائمة" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></header>
    {menuOpen && <nav className="notebook-menu"><button onClick={() => go("manifesto")}>الفكرة</button><button onClick={() => go("tracks")}>المسارات</button><button onClick={() => go("impact")}>الأثر</button><button onClick={() => go("plan")}>خطة 8 أسابيع</button><button onClick={() => go("faq")}>الأسئلة</button><button onClick={() => setModal("story")}>شارك الخيط <ArrowLeft size={15} /></button></nav>}
    {viewMode === "story" ? renderStoryScene() : viewMode === "book" ? <><div className="notebook-controls"><button onClick={() => setContentsOpen(true)}><BookOpen size={15} /> الفهرس</button><button disabled={currentPage === 0} onClick={() => goPage(currentPage - 1)}><ArrowRight size={15} /> السابق</button><span>صفحة {currentPage + 1} / {pageTitles.length}</span><button disabled={currentPage === pageTitles.length - 1} onClick={() => goPage(currentPage + 1)}>التالي <ArrowLeft size={15} /></button></div><main className="book-stage" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>{<div className={`page-turn page-turn--${turnDirection}`} key={currentPage}>{renderPage(currentPage)}</div>}<div className="book-hint"><span>اسحب لقلب الصفحات</span><i>✦</i><span>أو استخدم الأسهم</span></div></main></> : <main className="scroll-stage">{pageTitles.map((_, index) => <section id={`scroll-${index === 1 ? "manifesto" : index === 2 ? "impact" : index === 3 ? "tracks" : index === 4 ? "campaign" : index === 5 ? "plan" : index === 6 ? "practices" : index === 7 ? "faq" : index === 8 ? "join" : "cover"}`} key={index}>{renderPage(index)}</section>)}</main>}
    <footer className="notebook-footer"><span>صُنع بالاهتمام <HeartHandshake size={13} /></span><span>سند وعمار · غزة · 2026</span><button onClick={() => setModal("story")}><Mail size={13} /> تواصل معنا</button></footer>
    {contentsOpen && <div className="contents-overlay" onClick={() => setContentsOpen(false)}><div className="contents-card" onClick={(event) => event.stopPropagation()}><button className="contents-close" onClick={() => setContentsOpen(false)}><X size={17} /></button><SectionKicker>فهرس الدفتر</SectionKicker><h2>خيط واحد،<br /><em>فصول كثيرة.</em></h2><div>{pageTitles.map((title, index) => <button key={title} onClick={() => { setContentsOpen(false); goPage(index); }}><span>0{index + 1}</span><strong>{title}</strong><ArrowLeft size={15} /></button>)}</div></div></div>}
    {modal && <div className="modal-backdrop" role="presentation" onClick={() => setModal(null)}><div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setModal(null)} aria-label="إغلاق"><X size={19} /></button>{renderModal()}</div></div>}
  </div>;
}
