/**
 * Every string on the page lives here, in both languages.
 * Copy can be revised without touching a single component.
 */
export type Lang = "ar" | "en";

export const LANGS: Lang[] = ["ar", "en"];
export const DEFAULT_LANG: Lang = "ar";

export function isLang(value: unknown): value is Lang {
  return value === "ar" || value === "en";
}

export function dirOf(lang: Lang) {
  return lang === "ar" ? "rtl" : "ltr";
}

export const dict = {
  ar: {
    dir: "rtl",
    htmlLang: "ar",
    meta: {
      title: "قطاع التجزئة والتوريدات | جليد",
      description:
        "شراكات التجزئة والتوريد مع جليد — مياه غازية بدون سكر بنكهات فواكه منعشة. نتعاون مع تجار التجزئة والموزعين والموردين والمقاهي والمطاعم وقطاع الضيافة والشركات في المملكة.",
      ogAlt: "عبوات جليد للمياه الغازية بدون سكر",
    },
    header: {
      logoAlt: "جليد",
      skipToContent: "تخطَّ إلى المحتوى",
      switchTo: "English",
      switchLabel: "تغيير اللغة إلى الإنجليزية",
      langGroupLabel: "اللغة",
      cta: "تواصل معنا",
    },
    hero: {
      eyebrow: "قطاع الأعمال",
      title: "قطاع التجزئة والتوريدات",
      lede: "شراكة أقوى. توريد موثوق. وانتعاش يصل إلى عملائك.",
      body:
        "جليد تفتح أبوابها لشركاء جدد في السوق السعودي. نبحث عن تجار التجزئة والموزعين والموردين والمقاهي والمطاعم وشركات الضيافة والجهات المؤسسية الراغبين في إضافة مياه غازية بدون سكر بنكهات فواكه إلى قوائمهم ورفوفهم.",
      ctaPrimary: "تواصل معنا",
      ctaSecondary: "تصفّح المنتجات",
      scroll: "تابع الاستكشاف",
      imageAlt: "عبوات جليد للمياه الغازية على الثلج بنكهاتها الثلاث",
    },
    audience: {
      label: "نعمل مع",
      items: [
        "تجار التجزئة",
        "الموزعين",
        "الموردين",
        "المقاهي",
        "المطاعم",
        "قطاع الضيافة",
        "الشركات والجهات المؤسسية",
      ],
    },
    about: {
      eyebrow: "عن جليد",
      title: "جليد — انتعاش بطعم متقن",
      body:
        "جليد علامة سعودية تقدّم مياهًا غازية بدون سكر بنكهات فواكه مختارة بعناية. نركّز على الجودة والطعم المنعش لنمنح تجربة مختلفة في كل رشفة، بمشروبات منخفضة السعرات تناسب أسلوب الحياة العصري.",
      highlights: [
        { title: "بدون سكر", note: "محلّاة بالسكرالوز" },
        { title: "منخفض السعرات", note: "١٫٥ سعرة حرارية" },
        { title: "نكهات فواكه", note: "ثلاث نكهات" },
        { title: "منتج سعودي", note: "صُنع في المملكة" },
      ],
      imageAlt: "عبوات جليد الثلاث مرصوفة جنبًا إلى جنب",
      flavorsLabel: "النكهات المتاحة",
    },
    benefits: {
      eyebrow: "لماذا جليد؟",
      title: "شراكة مبنية على منتج يستحق مساحته على الرف",
      lede:
        "منتج عصري، تجربة متّسقة، وعلامة سعودية تنمو مع شركائها في التجزئة والتوريد.",
      items: [
        {
          title: "منتج عصري",
          body:
            "مشروبات غازية بدون سكر بنكهات فواكه تناسب أسلوب الحياة العصري وتلبّي طلبًا متزايدًا على البدائل الخفيفة.",
        },
        {
          title: "جودة وانتعاش",
          body:
            "تركيبة مصمّمة لتقديم تجربة منعشة بطعم متوازن، بجودة ثابتة في كل عبوة.",
        },
        {
          title: "علامة سعودية",
          body:
            "منتج سعودي مصمَّم للسوق المحلي، بهوية بصرية مميّزة تصنع حضورًا واضحًا عند نقطة البيع.",
        },
        {
          title: "فرصة نمو",
          body:
            "حل مناسب لشركاء التجزئة والتوريد الباحثين عن منتجات عصرية ومميّزة، بأحجام عبوات تناسب قنوات بيع مختلفة.",
        },
      ],
    },
    products: {
      eyebrow: "الكتالوج",
      title: "منتجات جليد",
      lede: "اكتشف مجموعة منتجات جليد المتاحة للتجزئة والتوريد",
      filterLabel: "تصفية حسب حجم العبوة",
      descriptor: "مياه غازية بدون سكر",
      all: "الكل",
      view: "اكتشف المنتج",
      viewAria: (name: string) => `اكتشف ${name} على متجر جليد`,
      externalNote: "تفتح صفحة المنتج على متجر جليد الرسمي",
      storeCta: "زيارة متجر جليد",
      empty: "لا توجد منتجات في هذا التصنيف.",
    },
    form: {
      eyebrow: "طلب شراكة",
      title: "تواصل معنا",
      lede:
        "هل تبحث عن منتجات مميزة لقطاع التجزئة أو التوريد؟ تواصل معنا وسيتواصل معك فريق جليد.",
      asideTitle: "قنوات التواصل المباشر",
      asideBody:
        "يسعد فريق جليد بمناقشة احتياجات عملك، أحجام الطلبات، وشروط التوريد المناسبة لقناتك.",
      points: [
        "رد خلال أيام العمل",
        "أحجام عبوات تناسب مختلف القنوات",
        "تعامل مباشر مع فريق جليد",
      ],
      emailLabel: "البريد الإلكتروني",
      phoneLabel: "الهاتف",
      whatsappLabel: "واتساب",
      fields: {
        phone: "رقم الجوال",
        phoneHint: "مثال: 05XXXXXXXX",
        email: "البريد الإلكتروني",
        company: "اسم الشركة",
        message: "رسالتك",
        messageHint: "اختياري — أخبرنا عن نشاطك وحجم الطلب المتوقع",
      },
      required: "مطلوب",
      optional: "اختياري",
      submit: "إرسال الطلب",
      submitting: "جارٍ الإرسال…",
      privacy: "بإرسالك الطلب توافق على تواصل فريق جليد معك بخصوص استفسارك.",
      errors: {
        phoneRequired: "يرجى إدخال رقم الجوال",
        phoneInvalid: "يرجى إدخال رقم جوال صحيح",
        emailRequired: "يرجى إدخال البريد الإلكتروني",
        emailInvalid: "يرجى إدخال بريد إلكتروني صحيح",
        companyRequired: "يرجى إدخال اسم الشركة",
        companyShort: "يرجى إدخال اسم شركة صحيح",
        messageLong: "الرسالة طويلة جدًا",
        summary: "يرجى تصحيح الحقول التالية",
      },
      success: {
        title: "تم إرسال طلبك بنجاح",
        body: "شكرًا لتواصلك مع جليد. سيتواصل معك فريقنا قريبًا.",
        again: "إرسال طلب آخر",
      },
      error: {
        title: "تعذّر إرسال الطلب",
        body: "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.",
        retry: "إعادة المحاولة",
      },
    },
    footer: {
      brand: "جليد",
      summary:
        "مياه غازية بدون سكر بنكهات فواكه منعشة، مصمّمة لتمنحك تجربة انتعاش مختلفة في كل رشفة.",
      socialTitle: "تابع جليد",
      contactTitle: "معلومات الاتصال",
      linksTitle: "روابط",
      storeLink: "زيارة متجر جليد",
      vat: "الرقم الضريبي",
      rights: "جميع الحقوق محفوظة.",
      backToTop: "العودة للأعلى",
      logoAlt: "جليد",
    },
  },

  en: {
    dir: "ltr",
    htmlLang: "en",
    meta: {
      title: "Retail & Supply Sector | Jaleed",
      description:
        "Retail and supply partnerships with Jaleed — sugar-free sparkling water with refreshing fruit flavors. We work with retailers, distributors, suppliers, cafés, restaurants, hospitality and corporate partners across Saudi Arabia.",
      ogAlt: "Jaleed sugar-free sparkling water cans",
    },
    header: {
      logoAlt: "Jaleed",
      skipToContent: "Skip to content",
      switchTo: "العربية",
      switchLabel: "Switch language to Arabic",
      langGroupLabel: "Language",
      cta: "Contact us",
    },
    hero: {
      eyebrow: "Business sector",
      title: "Retail & Supply Sector",
      lede: "Stronger partnerships. Reliable supply. Refreshment that reaches your customers.",
      body:
        "Jaleed is opening its doors to new partners across the Saudi market. We are looking for retailers, distributors, suppliers, cafés, restaurants, hospitality groups and corporate businesses ready to add sugar-free fruit-flavoured sparkling water to their shelves and menus.",
      ctaPrimary: "Contact us",
      ctaSecondary: "Browse products",
      scroll: "Keep exploring",
      imageAlt: "Jaleed sparkling water cans on ice across three flavours",
    },
    audience: {
      label: "We work with",
      items: [
        "Retailers",
        "Distributors",
        "Suppliers",
        "Cafés",
        "Restaurants",
        "Hospitality",
        "Corporate businesses",
      ],
    },
    about: {
      eyebrow: "About Jaleed",
      title: "Jaleed — refreshment, perfectly crafted",
      body:
        "Jaleed is a Saudi brand offering sugar-free sparkling water with carefully selected fruit flavors. We focus on quality and refreshing taste to deliver a different experience in every sip, with low-calorie drinks made for a modern lifestyle.",
      highlights: [
        { title: "Sugar free", note: "Sweetened with sucralose" },
        { title: "Low calorie", note: "1.5 kcal" },
        { title: "Fruit flavors", note: "Three flavors" },
        { title: "Saudi made", note: "Made in Saudi Arabia" },
      ],
      imageAlt: "Jaleed cans in all three flavours, stacked side by side",
      flavorsLabel: "Available flavors",
    },
    benefits: {
      eyebrow: "Why Jaleed?",
      title: "A partnership built on a product that earns its shelf space",
      lede:
        "A modern product, a consistent experience, and a Saudi brand that grows with its retail and supply partners.",
      items: [
        {
          title: "A modern product",
          body:
            "Sugar-free sparkling drinks with fruit flavors that suit a modern lifestyle and meet growing demand for lighter alternatives.",
        },
        {
          title: "Quality & refreshment",
          body:
            "A formula designed to deliver a refreshing experience with balanced taste, and consistent quality in every can.",
        },
        {
          title: "A Saudi brand",
          body:
            "A Saudi product designed for the local market, with a distinctive visual identity that stands out at the point of sale.",
        },
        {
          title: "Room to grow",
          body:
            "A strong fit for retail and supply partners looking for modern, distinctive products, in pack sizes that suit different sales channels.",
        },
      ],
    },
    products: {
      eyebrow: "Catalogue",
      title: "Jaleed products",
      lede: "Explore the Jaleed range available for retail and supply",
      filterLabel: "Filter by pack size",
      descriptor: "Sugar-free sparkling water",
      all: "All",
      view: "View product",
      viewAria: (name: string) => `View ${name} on the Jaleed store`,
      externalNote: "Opens the product page on the official Jaleed store",
      storeCta: "Visit the Jaleed store",
      empty: "No products in this category.",
    },
    form: {
      eyebrow: "Partnership enquiry",
      title: "Contact us",
      lede:
        "Looking for distinctive products for the retail or supply sector? Get in touch and the Jaleed team will contact you.",
      asideTitle: "Direct contact channels",
      asideBody:
        "The Jaleed team is happy to discuss your business needs, order volumes, and the supply terms that fit your channel.",
      points: [
        "Reply within business days",
        "Pack sizes for every channel",
        "Speak directly with the Jaleed team",
      ],
      emailLabel: "Email",
      phoneLabel: "Phone",
      whatsappLabel: "WhatsApp",
      fields: {
        phone: "Phone number",
        phoneHint: "e.g. 05XXXXXXXX",
        email: "Email address",
        company: "Company name",
        message: "Your message",
        messageHint: "Optional — tell us about your business and expected volume",
      },
      required: "Required",
      optional: "Optional",
      submit: "Submit Request",
      submitting: "Sending…",
      privacy: "By submitting, you agree that the Jaleed team may contact you about your enquiry.",
      errors: {
        phoneRequired: "Please enter your phone number",
        phoneInvalid: "Please enter a valid phone number",
        emailRequired: "Please enter your email address",
        emailInvalid: "Please enter a valid email address",
        companyRequired: "Please enter your company name",
        companyShort: "Please enter a valid company name",
        messageLong: "This message is too long",
        summary: "Please correct the following fields",
      },
      success: {
        title: "Your request has been sent",
        body: "Thank you for contacting Jaleed. Our team will be in touch shortly.",
        again: "Send another request",
      },
      error: {
        title: "Request could not be sent",
        body: "Something went wrong while sending your request. Please try again.",
        retry: "Try again",
      },
    },
    footer: {
      brand: "Jaleed",
      summary:
        "Sugar-free sparkling water with refreshing fruit flavors, crafted to give you a different kind of refreshment in every sip.",
      socialTitle: "Follow Jaleed",
      contactTitle: "Contact information",
      linksTitle: "Links",
      storeLink: "Visit the Jaleed store",
      vat: "VAT number",
      rights: "All rights reserved.",
      backToTop: "Back to top",
      logoAlt: "Jaleed",
    },
  },
} as const;

export type Dict = (typeof dict)[Lang];
