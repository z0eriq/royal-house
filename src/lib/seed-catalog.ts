import type { Category, Product } from "./catalog-types.ts";

export const seedCategories: readonly Category[] = [
  {
    slug: "sofas",
    name: "قنفات",
    blurb: "مقعدان، ثلاثة، أو زاوية على شكل الصالة.",
    description:
      "قنفات للجلوس اليومي. نحدد عدد المقاعد والعرض والعمق، وتختار القماش أو الجلد واللون قبل التنفيذ. الزاوية تُفصَّل على ضلعين إذا الغرفة تحتاجها.",
    image: "/images/sofas.jpg",
    imageAlt: "قنفة مخمل أخضر، صورة توضيحية للطراز",
    imagePosition: "center",
  },
  {
    slug: "chairs",
    name: "كراسي",
    blurb: "استقبال أو سفرة، بالمقاس والظهر المناسب.",
    description: "كراسي استقبال وكراسي سفرة. التنجيد والخشب وارتفاع الظهر نتفق عليها قبل الشغل.",
    image: "/images/chairs.jpg",
    imageAlt: "كرسي استقبال منجد بلون فاتح، صورة توضيحية للطراز",
    imagePosition: "center",
  },
  {
    slug: "custom-divan",
    name: "ديوان حسب الطلب",
    blurb: "يُفصَّل بالمتر على الجدار أو المجلس.",
    description:
      "ديوان عربي يُفصَّل على طول المكان. المخاد والعمق والارتفاع حسب المجلس، وليس مقاساً جاهزاً مفروضاً.",
    image: "/images/divan-majlis.jpg",
    imageAlt: "جلسة جلد داخل غرفة، صورة توضيحية لطراز الديوان",
    imagePosition: "center",
  },
  {
    slug: "iron-chairs",
    name: "كرسي حديد",
    blurb: "هيكل حديد للحديقة والجلسة الخارجية.",
    description:
      "كراسي بهيكل حديد للخارج أو للجلسات المكشوفة. نجهزه كرسياً مفرداً أو طقماً. تحدد العدد، لون الحديد، ونوع القاعدة: خشب أو تنجيد.",
    image: "/images/wire-chairs.jpg",
    imageAlt: "كراسي بهيكل معدني، صورة توضيحية للطراز",
    imagePosition: "bottom",
  },
  {
    slug: "sofa-sets",
    name: "تخم قنفات",
    blurb: "طقم جلسة كامل بقماش واحد.",
    description:
      "تخم القنفات يعني طقم الجلسة: القنفة والقطع المكملة لها. نوحد القماش واللون، وعدد القطع يتبع حجم الصالة.",
    image: "/images/sectional.jpg",
    imageAlt: "قنفة وكرسي في غرفة جلوس، صورة توضيحية لطراز التخم",
    imagePosition: "center",
  },
];

export const seedProducts: readonly Product[] = [
  {
    slug: "qanfa-velvet",
    name: "قنفة مخمل",
    category: "sofas",
    summary: "جلسة ناعمة للصالة، والقماش واللون حسب اختيارك.",
    description:
      "قنفة بقماش مخمل للصالة. نحدد العرض وعدد المقاعد وارتفاع الظهر قبل القص، واللون من العينات الموجودة بالمعمل أو من صورة ترسلها.",
    details: ["عدد المقاعد أو زاوية على ضلعين", "عرض القنفة وعمق القاعدة", "ارتفاع الظهر والذراعين", "لون المخمل وعدد المخاد"],
    image: "/images/sofas.jpg",
    imageAlt: "تفاصيل قنفة مخمل أخضر، صورة توضيحية للطراز",
    imagePosition: "center",
    featured: true,
  },
  {
    slug: "qanfa-leather",
    name: "قنفة جلد",
    category: "sofas",
    summary: "جلسة جلد للصالة أو المجلس.",
    description:
      "قنفة جلد. نوع الجلد واللون يتبينان قبل التنفيذ، والمقاس يتبع عرض الجدار حتى لا تزاحم الحركة في الغرفة.",
    details: ["طول الجدار المتاح", "لون الجلد", "مع مخاد أو بدون", "ارتفاع الذراع المناسب للجلوس"],
    image: "/images/sofa-loveseat.jpg",
    imageAlt: "قنفة جلد بلون جملي، صورة توضيحية للطراز",
    imagePosition: "bottom",
    featured: false,
  },
  {
    slug: "kursi-reception",
    name: "كرسي استقبال",
    category: "chairs",
    summary: "كرسي منجد للضيوف أو زاوية الجلوس.",
    description:
      "كرسي مبطن للاستقبال. ارتفاع القاعدة والظهر يُضبط حتى يكون الجلوس مريحاً، والقماش يمكن أن يطابق قماش القنفة.",
    details: ["العدد", "ارتفاع القاعدة", "شكل الظهر", "القماش واللون"],
    image: "/images/chairs.jpg",
    imageAlt: "كرسي استقبال منجد بأزرار، صورة توضيحية للطراز",
    imagePosition: "center",
    featured: true,
  },
  {
    slug: "kursi-dining",
    name: "كرسي سفرة",
    category: "chairs",
    summary: "كراسي خشب حول سفرة الطعام، بالعدد الذي تحتاجه.",
    description:
      "كراسي سفرة خشبية. العدد حسب الطاولة، والقعدة إما خشب ظاهر أو منجدة حتى لا يتعب الجلوس الطويل.",
    details: ["عدد الكراسي", "ارتفاع السفرة", "خشب ظاهر أو قعدة منجدة", "اللون"],
    image: "/images/chair-dining.jpg",
    imageAlt: "كرسي سفرة خشبي، صورة توضيحية للطراز",
    imagePosition: "center",
    featured: false,
  },
  {
    slug: "diwan",
    name: "ديوان حسب الطلب",
    category: "custom-divan",
    summary: "ديوان بالمتر على الجدار، أو جلسة مجلس بالمساحة المتوفرة.",
    description:
      "الديوان يُفصَّل على طول الجدار أو على مساحة المجلس، مع مخاد الظهر والمساند. إذا عندك الطول بالمتر وصورة المكان، نرتب الشكل قبل التنفيذ.",
    details: ["طول الجدار أو مساحة المجلس", "عمق الجلسة وارتفاعها", "عدد مخاد الظهر", "القماش واللون"],
    image: "/images/divan-majlis.jpg",
    imageAlt: "جلسة طويلة داخل غرفة، صورة توضيحية لطراز الديوان",
    imagePosition: "center",
    featured: true,
  },
  {
    slug: "kursi-hadid",
    name: "كرسي حديد",
    category: "iron-chairs",
    summary: "كرسي أو طقم بهيكل حديد للحديقة والجلسة الخارجية.",
    description:
      "هيكل حديد للاستخدام الخارجي أو الأماكن المكشوفة. نجهزه مفرداً أو طقماً بنفس القياس. لون الطلاء ونوع القاعدة، خشب أو تنجيد، يُتفق عليهما قبل الشغل.",
    details: ["استخدام داخلي أو خارجي", "كرسي مفرد أو عدد الطقم", "لون الهيكل", "القاعدة خشب أو منجدة"],
    image: "/images/wire-chairs.jpg",
    imageAlt: "كراسي بهيكل معدني ملون، صورة توضيحية للطراز",
    imagePosition: "bottom",
    featured: true,
  },
  {
    slug: "takhm",
    name: "تخم قنفات",
    category: "sofa-sets",
    summary: "طقم الجلسة بقماش واحد، وعدد القطع حسب الغرفة.",
    description:
      "تخم القنفات يجمع القنفة مع الكراسي أو القطع المكملة. لا نثبت عدد القطع هنا، لأنه يتبع حجم الصالة حتى لا يزيد الطقم على المكان.",
    details: ["مقاس الصالة", "عدد القطع", "قماش موحد", "توزيع القنفة والكراسي"],
    image: "/images/sectional.jpg",
    imageAlt: "قنفة وكرسي بقماش فاتح في غرفة جلوس، صورة توضيحية للطراز",
    imagePosition: "center",
    featured: true,
  },
];
