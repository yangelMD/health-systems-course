export const COUNTRIES = [
  { id: 'israel', flag: '🇮🇱', en: 'Israel', he: 'ישראל' },
  { id: 'germany', flag: '🇩🇪', en: 'Germany', he: 'גרמניה' },
  { id: 'uk', flag: '🇬🇧', en: 'United Kingdom', he: 'בריטניה' },
  { id: 'usa', flag: '🇺🇸', en: 'USA', he: 'ארצות הברית' },
  { id: 'australia', flag: '🇦🇺', en: 'Australia', he: 'אוסטרליה' },
  { id: 'singapore', flag: '🇸🇬', en: 'Singapore', he: 'סינגפור' },
  { id: 'japan', flag: '🇯🇵', en: 'Japan', he: 'יפן' },
  { id: 'netherlands', flag: '🇳🇱', en: 'Netherlands', he: 'הולנד' },
  { id: 'canada', flag: '🇨🇦', en: 'Canada', he: 'קנדה' },
]

export const CATEGORIES = [
  {
    id: 1,
    en: 'Universal/mandatory health insurance model – who is the insurer?',
    he: 'מהו מודל ביטוח הבריאות האוניברסלי/אובליגטורי ומי המבטח?',
  },
  {
    id: 2,
    en: 'Role of supplementary/complementary insurance',
    he: 'מה מקומם של ביטוחים נוספים?',
  },
  {
    id: 3,
    en: 'Is there long-term care insurance coverage?',
    he: 'האם קיים כיסוי ביטוחי ארוך טווח?',
  },
  {
    id: 4,
    en: 'Public financing model (taxes, earmarked funds, OOP, private insurance, health savings)',
    he: 'מהו מודל המימון הציבורי (מיסים כלליים, כסף ייעודי, הוצאה מהכיס, ביטוחים פרטיים, חיסכון בריאותי)?',
  },
  {
    id: 5,
    en: 'Who are the service providers?',
    he: 'מי הם ספקי השירות?',
  },
  {
    id: 6,
    en: 'How does primary care work?',
    he: 'כיצד פועלת הרפואה הראשונית?',
  },
  {
    id: 7,
    en: 'How does secondary care work?',
    he: 'כיצד פועלת הרפואה השניונית?',
  },
  {
    id: 8,
    en: 'How does tertiary care work?',
    he: 'כיצד פועלת הרפואה השלישונית?',
  },
  {
    id: 9,
    en: 'Which services are included in the public system?',
    he: 'אילו שירותים נכללים במערכת הציבורית?',
  },
  {
    id: 10,
    en: 'Which services are NOT included in the public system?',
    he: 'אילו שירותים אינם נכללים במערכת הציבורית?',
  },
  {
    id: 11,
    en: 'Role of private health services',
    he: 'מה מקומם של שירותי בריאות פרטיים?',
  },
  {
    id: 12,
    en: 'How is long-term care delivered?',
    he: 'כיצד מוענקים שירותי טיפולים ארוכי טווח?',
  },
  {
    id: 13,
    en: 'Health inputs: hospital beds, imaging equipment, workforce',
    he: 'תשומות הבריאות – שיעור המיטות, מכשירי הדמיה, כח אדם',
  },
  {
    id: 14,
    en: 'Outcomes: health expenditure and health indicators',
    he: 'תוצאים – הוצאה על בריאות ומדדי בריאות',
  },
  {
    id: 15,
    en: 'Unique characteristics of the system',
    he: 'מאפיינים ייחודיים למערכת',
  },
]

// Hints shown to students on demand (pre-written, no AI cost)
// Format: hints[categoryId][countryId] = { en, he }
export const HINTS: Record<number, Record<string, { en: string; he: string }>> = {
  1: {
    israel: {
      en: 'Think about the 1994 National Health Insurance Law. How many sick funds (kupot holim) exist? Is membership mandatory? Who sets the benefits basket?',
      he: 'חשבו על חוק ביטוח בריאות ממלכתי 1994. כמה קופות חולים קיימות? האם החברות חובה? מי קובע את סל השירותים?',
    },
    germany: {
      en: 'Germany invented social health insurance in 1883 under Bismarck. Think about statutory (GKV) vs. private (PKV) insurance, and who is obligated to join each.',
      he: 'גרמניה המציאה את ביטוח הבריאות הסוציאלי ב-1883 תחת ביסמארק. חשבו על ביטוח סטטוטורי (GKV) לעומת פרטי (PKV), ומי חייב להצטרף לכל אחד.',
    },
    uk: {
      en: 'The NHS was established in 1948 based on the Beveridge Report. It is a single-payer system funded through general taxation. Coverage is universal and free at point of use.',
      he: 'ה-NHS הוקם ב-1948 בהשראת דוח בוורידג\'. מדובר במערכת מממן יחיד הממומנת ממיסים כלליים. הכיסוי אוניברסלי וחינמי בנקודת השירות.',
    },
    usa: {
      en: 'The US has no universal coverage. Think about employer-sponsored insurance, Medicare (65+), Medicaid (low-income), ACA marketplace plans, and the uninsured population.',
      he: 'לארה"ב אין כיסוי אוניברסלי. חשבו על ביטוח מעסיק, Medicare (65+), Medicaid (הכנסה נמוכה), תוכניות ACA, והאוכלוסייה הלא מבוטחת.',
    },
    australia: {
      en: 'Australia\'s Medicare was established in 1984. It is a universal single-payer system funded by general taxes plus a 2% Medicare levy. Everyone is covered regardless of employment.',
      he: 'Medicare האוסטרלי הוקם ב-1984. מדובר במערכת אוניברסלית של מממן יחיד הממומנת ממיסים כלליים ומיסת Medicare בשיעור 2%. כל תושב מכוסה ללא קשר לתעסוקה.',
    },
    singapore: {
      en: 'Singapore uses the "3Ms": Medisave (mandatory savings in CPF), MediShield Life (catastrophic insurance), and Medifund (safety net for the very poor). Individual responsibility is central.',
      he: 'סינגפור משתמשת ב"3M": Medisave (חיסכון חובה ב-CPF), MediShield Life (ביטוח קטסטרופלי) ו-Medifund (רשת ביטחון לעניים). האחריות האישית היא מרכזית.',
    },
    japan: {
      en: 'Japan has had universal health insurance since 1961. There are two main schemes: Employee Health Insurance (EHI) for workers and their dependents, and National Health Insurance (NHI) for the self-employed and others.',
      he: 'ליפן יש ביטוח בריאות אוניברסלי מאז 1961. קיימות שתי תוכניות עיקריות: ביטוח בריאות לעובדים (EHI) ועובדיהם ומשפחותיהם, וביטוח בריאות לאומי (NHI) לעצמאיים ואחרים.',
    },
    netherlands: {
      en: 'The Netherlands uses regulated competition among private insurers. Every resident must purchase basic insurance (basisverzekering) from a private insurer. Community rating means premiums cannot vary by health status.',
      he: 'הולנד משתמשת בתחרות מוסדרת בין מבטחים פרטיים. כל תושב חייב לרכוש ביטוח בסיסי (basisverzekering) ממבטח פרטי. תעריף קהילתי אומר שפרמיות אינן יכולות להשתנות לפי מצב בריאות.',
    },
    canada: {
      en: 'Canada\'s system is called Medicare, established by the Canada Health Act 1984. It is publicly funded but provincially administered across 13 provinces/territories. Each province runs its own plan within federal principles.',
      he: 'המערכת הקנדית נקראת Medicare, הוקמה בחוק הבריאות הקנדי 1984. היא ממומנת ציבורית אך מנוהלת ברמה מחוזית ב-13 פרובינציות/טריטוריות. כל פרובינציה מנהלת את תוכניתה במסגרת עקרונות פדרליים.',
    },
  },
  2: {
    israel: {
      en: 'Consider two layers: supplementary insurance (Shaban) sold by the sick funds themselves, and commercial private insurance (Mushlam) sold by insurance companies. What does each add beyond the basic basket?',
      he: 'שקלו שני שכבות: ביטוח משלים (שב"ן) הנמכר על ידי קופות החולים עצמן, וביטוח מסחרי פרטי (מושלם) הנמכר על ידי חברות ביטוח. מה כל אחד מוסיף מעל הסל הבסיסי?',
    },
    germany: {
      en: 'Those in GKV can buy supplementary VHI for extras like private rooms, dental upgrades, or faster specialist access. Those who earn above the threshold can opt into full PKV instead.',
      he: 'מבוטחי GKV יכולים לרכוש VHI משלים לתוספות כמו חדרים פרטיים, שיפורי שיניים, או גישה מהירה לספציאליסטים. בעלי הכנסה מעל הסף יכולים לעבור ל-PKV מלא במקום.',
    },
    uk: {
      en: 'About 10.5% of the UK population has private health insurance, mainly employer-provided. It offers shorter waiting times, choice of specialist, and better hospital amenities — not access to different treatments.',
      he: 'כ-10.5% מאוכלוסיית בריטניה מחזיקים בביטוח בריאות פרטי, בעיקר מסופק על ידי המעסיק. הוא מציע זמני המתנה קצרים יותר, בחירת ספציאליסט ותנאי אשפוז טובים יותר.',
    },
    usa: {
      en: 'Supplementary insurance fills gaps in main coverage. Medigap covers Medicare cost-sharing; dental/vision riders are common. Many Americans carry multiple policies to patch coverage holes.',
      he: 'ביטוח משלים מכסה פערים בכיסוי הראשי. Medigap מכסה חלקי עלות של Medicare; נספחי שיניים/ראייה נפוצים. אמריקאים רבים מחזיקים פוליסות מרובות לסגירת פערי כיסוי.',
    },
    australia: {
      en: 'Private health insurance in Australia has two parts: hospital cover and extras cover (dental, optical, physio). Government policy incentivizes purchase through a 30% rebate and the Lifetime Health Cover loading.',
      he: 'ביטוח בריאות פרטי באוסטרליה כולל שני חלקים: כיסוי בית חולים וכיסוי תוספות (שיניים, ראייה, פיזיותרפיה). מדיניות ממשלתית מעודדת רכישה דרך החזר של 30% ו-Lifetime Health Cover loading.',
    },
    singapore: {
      en: 'Integrated Shield Plans (ISPs) are sold by private insurers and top up MediShield Life, allowing patients to access higher-class wards or private hospitals beyond the basic coverage.',
      he: 'תוכניות Integrated Shield (ISPs) נמכרות על ידי מבטחים פרטיים ומשלימות את MediShield Life, ומאפשרות לחולים לגשת למחלקות ברמה גבוהה יותר או לבתי חולים פרטיים מעבר לכיסוי הבסיסי.',
    },
    japan: {
      en: 'Japan\'s voluntary private insurance market is relatively small. It mainly covers income replacement during hospitalization and cost-sharing that falls outside the SHI benefit package.',
      he: 'שוק הביטוח הפרטי הרצוני ביפן קטן יחסית. הוא מכסה בעיקר החלפת הכנסה במהלך אשפוז ושיתוף עלויות שאינו נכלל בחבילת הביטוח הלאומי.',
    },
    netherlands: {
      en: 'About 80% of Dutch residents purchase aanvullende verzekering (complementary insurance) to cover services excluded from the basic package such as adult dental, physiotherapy, and glasses.',
      he: 'כ-80% מהתושבים ההולנדים רוכשים ביטוח משלים (aanvullende verzekering) לכיסוי שירותים שאינם בחבילה הבסיסית כמו שיניים למבוגרים, פיזיותרפיה ומשקפיים.',
    },
    canada: {
      en: 'About 65-70% of Canadians have supplementary private insurance, mostly employer-provided, covering prescription drugs, dental, vision, and other services excluded from provincial Medicare plans.',
      he: 'כ-65-70% מהקנדים מחזיקים בביטוח פרטי משלים, בעיקר מסופק על ידי המעסיק, המכסה תרופות מרשם, שיניים, ראייה ושירותים אחרים שאינם נכללים בתוכניות Medicare המחוזיות.',
    },
  },
  3: {
    israel: {
      en: 'Israel has a Long-Term Care Insurance Law (1988) administered by the National Insurance Institute (Bituach Leumi). It provides home-care services but is not comprehensive — nursing home costs are largely out of pocket.',
      he: 'לישראל יש חוק ביטוח סיעודי (1988) המנוהל על ידי המוסד לביטוח לאומי. הוא מספק שירותי סיעוד בבית אך אינו מקיף — עלויות בתי אבות גדולות מחוץ לכיס.',
    },
    germany: {
      en: 'Germany introduced mandatory long-term care insurance (Pflegeversicherung) in 1995, covering both home and residential care across 5 care levels. It is funded by payroll contributions separate from health insurance.',
      he: 'גרמניה הנהיגה ביטוח סיעודי חובה (Pflegeversicherung) ב-1995, המכסה טיפול בבית ובמוסד ב-5 רמות טיפול. הוא ממומן מדמי שכר בנפרד מביטוח הבריאות.',
    },
    uk: {
      en: 'Long-term care is NOT covered by the NHS. It is administered by local councils, means-tested, and heavily underfunded. This split between health (NHS) and social care (councils) is one of the UK system\'s biggest structural problems.',
      he: 'טיפול ארוך טווח אינו מכוסה על ידי ה-NHS. הוא מנוהל על ידי מועצות מקומיות, נבחן לפי אמצעים, ומתומן בחסר. הפיצול בין בריאות (NHS) לרווחה (מועצות) הוא אחת הבעיות המבניות הגדולות של המערכת.',
    },
    usa: {
      en: 'Medicare covers only short-term skilled nursing (up to 100 days). Long-term care is covered by Medicaid only for those who have spent down their assets. Private LTC insurance exists but is expensive and declining.',
      he: 'Medicare מכסה רק סיעוד מיומן לטווח קצר (עד 100 יום). טיפול ארוך טווח מכוסה על ידי Medicaid רק למי שמיצה את נכסיו. ביטוח LTC פרטי קיים אך יקר ובירידה.',
    },
    australia: {
      en: 'Australia has a dedicated Aged Care system, Commonwealth-funded, providing both home care packages (My Aged Care) and residential aged care. A means-tested contribution is required from recipients.',
      he: 'לאוסטרליה יש מערכת טיפול בקשישים ייעודית, ממומנת על ידי הממשלה הפדרלית, המספקת גם חבילות טיפול בבית (My Aged Care) וגם מוסדות לגיל הזהב. נדרש תשלום עצמי מבחינת אמצעים.',
    },
    singapore: {
      en: 'CareShield Life (mandatory since 2020 for those born 1980+) provides basic monthly payouts for severe disability. ElderShield covers older cohorts. Both are supplemented by private riders for enhanced coverage.',
      he: 'CareShield Life (חובה מ-2020 לנולדים אחרי 1980) מספק תשלומים חודשיים בסיסיים לנכות קשה. ElderShield מכסה קבוצות גיל מבוגרות יותר. שניהם מושלמים על ידי נספחים פרטיים לכיסוי מורחב.',
    },
    japan: {
      en: 'Japan introduced Long-Term Care Insurance (LTCI) in 2000 — a mandatory social insurance for all aged 40+, covering services for those 65+ (and 40-64 with age-related conditions). It is considered one of the world\'s best LTC systems.',
      he: 'יפן הנהיגה ביטוח סיעודי (LTCI) ב-2000 — ביטוח סוציאלי חובה לכל מי שגילו 40+, המכסה שירותים לגיל 65+ (ו-40-64 עם מצבים הקשורים לגיל). נחשב לאחד ממערכות הסיעוד הטובות בעולם.',
    },
    netherlands: {
      en: 'The Wet Langdurige Zorg (WLZ, Long-term Care Act, 2015) covers intensive, long-term residential and home care for those with chronic or severe needs. Lighter community support is handled by municipalities under the WMO.',
      he: 'חוק הטיפול ארוך הטווח (WLZ, 2015) מכסה טיפול מגורים ובית מאמיר לאנשים עם צרכים כרוניים או קשים. תמיכה קהילתית קלה יותר מטופלת על ידי עיריות במסגרת ה-WMO.',
    },
    canada: {
      en: 'Long-term care in Canada is provincially administered and a mix of public and private funding. The COVID-19 pandemic exposed severe underfunding and staffing shortages in nursing homes, triggering national reform discussions.',
      he: 'טיפול ארוך טווח בקנדה מנוהל ברמה מחוזית ומשלב מימון ציבורי ופרטי. מגפת COVID-19 חשפה מחסור חמור במימון ובכוח אדם בבתי אבות, מה שעורר דיונים ברפורמה לאומית.',
    },
  },
  4: {
    israel: {
      en: 'Funding comes from an earmarked health tax (mas bri\'ut) collected by the National Insurance Institute, general government transfers, and co-payments. Private out-of-pocket spending is significant (~25% of total).',
      he: 'המימון מגיע ממס בריאות ייעודי (מס בריאות) הנגבה על ידי המוסד לביטוח לאומי, העברות ממשלתיות כלליות, ותשלומים עצמיים. ההוצאה הפרטית מהכיס משמעותית (~25% מהסך הכולל).',
    },
    germany: {
      en: 'GKV is financed by payroll contributions (~14.6% of salary, split employer/employee) pooled into a central Gesundheitsfonds (health fund, since 2007). Government subsidies top up the fund. PKV members pay risk-based premiums.',
      he: 'GKV מממן על ידי תשלומי שכר (~14.6% מהשכר, מחולק בין מעסיק לעובד) המאוגמים לקרן בריאות מרכזית (Gesundheitsfonds, מאז 2007). סובסידיות ממשלתיות משלימות את הקרן. חברי PKV משלמים פרמיות מבוססות סיכון.',
    },
    uk: {
      en: 'The NHS is funded ~78% through general taxation, ~18% through National Insurance contributions. Out-of-pocket spending is about 15% of total health expenditure, mainly for prescriptions (flat fee), dental, and optical.',
      he: 'ה-NHS ממומן ~78% ממיסים כלליים, ~18% מדמי ביטוח לאומי. ההוצאה מהכיס היא כ-15% מסך ההוצאה לבריאות, בעיקר על מרשמים (תשלום קבוע), שיניים ועיניים.',
    },
    usa: {
      en: 'Highly fragmented: employer-sponsored premiums, federal/state taxes (Medicare/Medicaid), individual marketplace premiums, and the highest out-of-pocket costs in the OECD. Medical debt affects ~40% of Americans.',
      he: 'מאוד מפוצל: פרמיות מעסיק, מיסים פדרליים/ממלכתיים (Medicare/Medicaid), פרמיות שוק פרטני, ועלויות מהכיס הגבוהות ביותר ב-OECD. חוב רפואי פוגע בכ-40% מהאמריקאים.',
    },
    australia: {
      en: 'Medicare is funded by general taxation plus a 2% Medicare levy on taxable income. Government subsidizes private health insurance through a 30% rebate. OOP spending is moderate (~17% of total).',
      he: 'Medicare ממומן ממיסים כלליים בתוספת מיסת Medicare של 2% על הכנסה חייבת. הממשלה מסבסדת ביטוח בריאות פרטי דרך החזר של 30%. ההוצאה מהכיס מתונה (~17% מהסך הכולל).',
    },
    singapore: {
      en: 'Singapore relies heavily on individual savings (Medisave, mandatory CPF contributions of 8–10.5%), supplemented by insurance (MediShield Life premiums) and government subsidies. Out-of-pocket spending is high by design — to deter overuse.',
      he: 'סינגפור מסתמכת רבות על חיסכון אישי (Medisave, תשלומי CPF חובה של 8-10.5%), בתוספת ביטוח (פרמיות MediShield Life) וסובסידיות ממשלתיות. ההוצאה מהכיס גבוהה בכוונה — כדי למנוע שימוש יתר.',
    },
    japan: {
      en: 'About 50% is funded by public money (national + local taxes). The other 50% comes from insurance premiums (income-based) and co-payments: 30% for most patients, 10% for those 75+, 20% for ages 70-74.',
      he: 'כ-50% ממומן על ידי כספי ציבור (מיסים לאומיים + מקומיים). ה-50% האחרים מגיעים מדמי ביטוח (מבוססי הכנסה) ותשלומים עצמיים: 30% לרוב המטופלים, 10% לגיל 75+, 20% לגיל 70-74.',
    },
    netherlands: {
      en: 'Funded through nominal premiums (paid to private insurer, ~€1,800/year), income-related contributions via tax (paid to government), and an annual deductible (eigen risico, ~€385). The government runs a risk equalization fund to compensate insurers.',
      he: 'ממומן דרך פרמיות נומינליות (לגבות ממבטח פרטי, ~€1,800/שנה), תשלומי ביטוח מבוססי הכנסה דרך מס (לממשלה), ותשלום עצמי שנתי (eigen risico, ~€385). הממשלה מנהלת קרן איזון סיכונים לפצות מבטחים.',
    },
    canada: {
      en: 'Funded through general federal and provincial taxes. No user fees for medically necessary services (Canada Health Act prohibits them). However, significant OOP exists for excluded services (drugs, dental). Federal transfers to provinces are a constant political tension.',
      he: 'ממומן דרך מיסים פדרליים ומחוזיים כלליים. אין תשלומי משתמש לשירותים הכרחיים מבחינה רפואית (חוק הבריאות הקנדי אוסר עליהם). עם זאת, קיימת הוצאה מהכיס משמעותית לשירותים שאינם מכוסים (תרופות, שיניים). העברות פדרליות לפרובינציות מהוות מתח פוליטי מתמיד.',
    },
  },
  5: {
    israel: {
      en: 'The four sick funds (Clalit, Maccabi, Meuhedet, Leumit) own and operate most primary care clinics. Hospitals are a mix: government-owned, sick fund-owned (mainly Clalit), and private. Sick funds contract with private specialists.',
      he: 'ארבע קופות החולים (כללית, מכבי, מאוחדת, לאומית) הן הבעלים ומפעילות את רוב מרפאות הרפואה הראשונית. בתי החולים הם שילוב: בבעלות ממשלתית, בבעלות קופות חולים (בעיקר כללית) ופרטיים. קופות החולים מתקשרות עם ספציאליסטים פרטיים.',
    },
    germany: {
      en: 'GPs and specialists in ambulatory care are mostly private self-employed practitioners organized in regional Kassenärztliche Vereinigungen (KVs). Hospitals are a mix: public (~30%), non-profit (~35%), and private for-profit (~35%).',
      he: 'רופאי משפחה ומומחים בטיפול חוץ-בית-חולי הם בעיקר מטפלים עצמאיים פרטיים המאורגנים ב-Kassenärztliche Vereinigungen (KVs) אזוריים. בתי החולים הם שילוב: ציבוריים (~30%), ללא מטרות רווח (~35%), ופרטיים (~35%).',
    },
    uk: {
      en: 'GPs are independent contractors paid mainly by capitation. Hospital doctors are salaried NHS employees. The NHS employs ~1.3 million people and is one of the world\'s largest employers. Since 2019, GPs form about 1,300 Primary Care Networks.',
      he: 'רופאי GP הם קבלנים עצמאיים המשולמים בעיקר בגין קפיטציה. רופאי בתי חולים הם עובדי NHS במשכורת. ה-NHS מעסיק ~1.3 מיליון אנשים והוא אחד המעסיקים הגדולים בעולם. מאז 2019, רופאי GP מהווים כ-1,300 רשתות טיפול ראשוני.',
    },
    usa: {
      en: 'A highly pluralistic mix: private for-profit and non-profit hospitals, large integrated health systems (Kaiser, Mayo Clinic), independent physician practices, corporate-owned clinic chains, and government facilities (VA, community health centers).',
      he: 'שילוב פלורליסטי מאוד: בתי חולים פרטיים למטרות רווח וללא מטרות רווח, מערכות בריאות משולבות גדולות (Kaiser, Mayo Clinic), מרפאות רופאים עצמאיים, רשתות מרפאות בבעלות תאגידית, ומתקנים ממשלתיים (VA, מרכזי בריאות קהילתיים).',
    },
    australia: {
      en: 'GPs are private practitioners billing Medicare under the Medical Benefits Schedule (MBS). Public hospitals are state/territory run. Private hospitals coexist alongside. Allied health providers (physio, psychology) are also mainly private.',
      he: 'רופאי GP הם מטפלים פרטיים המחייבים את Medicare לפי לוח שכר הטבות רפואי (MBS). בתי חולים ציבוריים מנוהלים על ידי המדינה/טריטוריה. בתי חולים פרטיים קיימים במקביל. ספקי בריאות נלווית (פיזיותרפיה, פסיכולוגיה) הם גם בעיקר פרטיים.',
    },
    singapore: {
      en: 'A deliberate public-private mix: public hospitals provide subsidized care across ward classes (A, B1, B2, C). Private hospitals and GP clinics serve those who prefer or can afford to pay more. The government owns and manages major public hospitals.',
      he: 'שילוב ציבורי-פרטי מכוון: בתי חולים ציבוריים מספקים טיפול מסובסד במחלקות שונות (A, B1, B2, C). בתי חולים פרטיים ומרפאות GP משרתים את מי שמעדיפים או יכולים להרשות לעצמם לשלם יותר. הממשלה הבעלים ומנהלת את בתי החולים הציבוריים הגדולים.',
    },
    japan: {
      en: 'About 80% of hospitals and nearly all clinics are privately owned (mostly by individual physicians or medical corporations), yet publicly funded through the SHI system. The government sets all fees via a uniform national fee schedule.',
      he: 'כ-80% מבתי החולים וכמעט כל המרפאות הם בבעלות פרטית (בעיקר של רופאים בודדים או תאגידים רפואיים), אך ממומנים ציבורית דרך מערכת SHI. הממשלה קובעת את כל הדמים דרך לוח שכר לאומי אחיד.',
    },
    netherlands: {
      en: 'GPs (huisartsen) are independent private practitioners. Since 2006, hospitals are mostly private non-profit organizations competing for insurance contracts. Insurers negotiate prices and volumes with hospitals annually.',
      he: 'רופאי GP (huisartsen) הם מטפלים פרטיים עצמאיים. מאז 2006, בתי חולים הם בעיקר ארגונים פרטיים ללא מטרות רווח המתחרים על חוזי ביטוח. מבטחים מנהלים משא ומתן על מחירים ונפחים עם בתי חולים מדי שנה.',
    },
    canada: {
      en: 'Family physicians and specialists are mostly private self-employed practitioners billing provincial insurance plans (fee for service). Hospitals are predominantly private non-profit, publicly funded. True private-for-profit hospitals are rare for insured services.',
      he: 'רופאי משפחה ומומחים הם בעיקר מטפלים עצמאיים פרטיים המחייבים תוכניות ביטוח מחוזיות (תשלום עבור שירות). בתי חולים הם בעיקר ללא מטרות רווח פרטיים, ממומנים ציבורית. בתי חולים פרטיים למטרות רווח נדירים לשירותים המכוסים.',
    },
  },
  6: {
    israel: {
      en: 'Each sick fund operates its own network of primary care clinics staffed by employed or contracted family physicians. Patients register with a sick fund (not a specific doctor) and can change sick funds once a year.',
      he: 'כל קופת חולים מפעילה רשת משלה של מרפאות רפואה ראשונית המאוישות על ידי רופאי משפחה מועסקים או מקוצין. מטופלים נרשמים לקופת חולים (לא לרופא ספציפי) ויכולים לעבור קופה פעם בשנה.',
    },
    germany: {
      en: 'GPs (Hausärzte) practice independently in small outpatient practices. Patients can access GPs and specialists directly without a referral, though a GP-first approach is encouraged through small financial incentives.',
      he: 'רופאי GP (Hausärzte) עובדים בצורה עצמאית במרפאות חוץ-בית-חולי קטנות. מטופלים יכולים לגשת לרופאי GP ומומחים ישירות ללא הפניה, אם כי גישה דרך GP ראשון מעודדת דרך תמריצים כספיים קטנים.',
    },
    uk: {
      en: 'Patients register with a specific GP practice (not a hospital). GPs act as strict gatekeepers to all secondary care. Since 2019, practices are grouped into ~1,300 Primary Care Networks (PCNs) of 30,000–50,000 patients, enabling team-based care.',
      he: 'מטופלים נרשמים למרפאת GP ספציפית (לא לבית חולים). רופאי GP משמשים כשוערים קפדניים לכל הטיפול המשני. מאז 2019, מרפאות מקובצות לכ-1,300 רשתות טיפול ראשוני (PCNs) של 30,000-50,000 מטופלים, המאפשרות טיפול מבוסס צוות.',
    },
    usa: {
      en: 'Primary care is delivered by family physicians, internists, pediatricians, and nurse practitioners. There is no universal gatekeeping — access to specialists varies by insurance plan. Many Americans lack a regular primary care provider.',
      he: 'הטיפול הראשוני ניתן על ידי רופאי משפחה, מומחים לרפואה פנימית, רופאי ילדים ואחיות מומחיות. אין שמירת שער אוניברסלית — הגישה למומחים משתנה לפי תוכנית הביטוח. אמריקאים רבים חסרים ספק טיפול ראשוני קבוע.',
    },
    australia: {
      en: 'GPs serve as the first point of contact and coordinate all care. Bulk billing (no out-of-pocket charge to patient) is common but declining. GPs issue referrals to specialists. Enhanced Primary Care items on MBS support chronic disease management.',
      he: 'רופאי GP משמשים כנקודת הקשר הראשונה ומתאמים את כל הטיפול. חיוב כולל (ללא תשלום מהכיס למטופל) נפוץ אך בירידה. רופאי GP מנפיקים הפניות למומחים. פריטי טיפול ראשוני מורחב ב-MBS תומכים בניהול מחלות כרוניות.',
    },
    singapore: {
      en: 'Primary care is delivered by both public polyclinics (subsidized, staffed by salaried doctors) and private GP clinics (~80% of primary care visits). There is no mandatory GP gatekeeping, but the government actively promotes polyclinic use for cost control.',
      he: 'הטיפול הראשוני ניתן הן על ידי פוליקליניקות ציבוריות (מסובסדות, מאוישות על ידי רופאים שכירים) והן על ידי מרפאות GP פרטיות (~80% מביקורי הטיפול הראשוני). אין שמירת שער חובה של GP, אבל הממשלה מקדמת באופן פעיל שימוש בפוליקליניקה לשליטה בעלויות.',
    },
    japan: {
      en: 'Japan has no formal gatekeeping. Patients can directly access any clinic or hospital without a referral. Small clinics (19 beds or fewer) handle most primary care. This free choice contributes to very high utilization rates.',
      he: 'ליפן אין שמירת שער פורמלית. מטופלים יכולים לגשת ישירות לכל מרפאה או בית חולים ללא הפניה. מרפאות קטנות (19 מיטות או פחות) מטפלות ברוב הטיפול הראשוני. בחירה חופשית זו תורמת לשיעורי שימוש גבוהים מאוד.',
    },
    netherlands: {
      en: 'The GP (huisarts) is a strict gatekeeper — specialists cannot be accessed without a GP referral. GPs practice in small independent clinics or group practices. Out-of-hours GP cooperatives handle evenings and weekends. The Netherlands is known for one of the strongest primary care systems in the world.',
      he: 'ה-GP (huisarts) הוא שוער קפדני — לא ניתן לגשת למומחים ללא הפניה מ-GP. רופאי GP עובדים במרפאות עצמאיות קטנות או בפרקטיקות קבוצתיות. שיתופי פעולה של GP מחוץ לשעות העבודה מטפלים בערבים ובסופי שבוע. הולנד ידועה כאחת ממערכות הטיפול הראשוני החזקות בעולם.',
    },
    canada: {
      en: 'Family physicians are the main primary care providers, often acting as gatekeepers to specialist care. However, there are significant shortages — about 6 million Canadians lack a family doctor. Nurse practitioners and community health centers help fill gaps.',
      he: 'רופאי משפחה הם ספקי הטיפול הראשוני העיקריים, הפועלים לרוב כשוערים לטיפול מומחה. עם זאת, ישנם מחסורים משמעותיים — כ-6 מיליון קנדים חסרי רופא משפחה. אחיות מומחיות ומרכזי בריאות קהילתיים עוזרים למלא את הפערים.',
    },
  },
  7: {
    israel: {
      en: 'Secondary care is provided in hospitals and specialist outpatient clinics. Referral from a primary care physician is usually required for specialist visits and elective hospital admissions. Sick funds contract with both public and private hospitals.',
      he: 'הטיפול המשני ניתן בבתי חולים ובמרפאות מומחים חוץ-בית-חולי. הפניה מרופא ראשוני נדרשת בדרך כלל לביקורי מומחה ואשפוז אלקטיבי. קופות חולים מתקשרות הן עם בתי חולים ציבוריים והן עם פרטיים.',
    },
    germany: {
      en: 'Secondary care is divided between ambulatory specialist care (in private practices, separate from hospitals) and inpatient hospital care. Germany has a distinctive "sectorization" — ambulatory and hospital sectors are largely separate, which sometimes causes coordination gaps.',
      he: 'הטיפול המשני מחולק בין טיפול מומחה חוץ-בית-חולי (במרפאות פרטיות, נפרד מבתי חולים) ואשפוז בבית חולים. לגרמניה יש "פיצול מגזרי" ייחודי — מגזרי החוץ-בית-חולי ובית החולים מופרדים ברובם, מה שגורם לפעמים לפערי תיאום.',
    },
    uk: {
      en: 'Specialist care requires a GP referral. Delivered in district general hospitals (serving 150,000–200,000 people each) or outpatient clinics. NHS Trusts manage hospital services; Foundation Trusts have greater financial independence. Long waiting times are a persistent challenge.',
      he: 'טיפול מומחה דורש הפניה מ-GP. ניתן בבתי חולים מחוזיים כלליים (כל אחד משרת 150,000-200,000 אנשים) או במרפאות חוץ. NHS Trusts מנהלות שירותי בית חולים; Foundation Trusts נהנות מעצמאות כלכלית גדולה יותר. זמני המתנה ארוכים הם אתגר מתמיד.',
    },
    usa: {
      en: 'Secondary care is delivered in community hospitals and outpatient specialty clinics. Access depends heavily on insurance type. Integrated systems like Kaiser Permanente coordinate primary and secondary care within one network.',
      he: 'הטיפול המשני ניתן בבתי חולים קהילתיים ובמרפאות מומחים חוץ. הגישה תלויה מאוד בסוג הביטוח. מערכות משולבות כמו Kaiser Permanente מתאמות טיפול ראשוני ומשני בתוך רשת אחת.',
    },
    australia: {
      en: 'Public hospitals, funded by state/territory governments with federal contributions, provide most secondary care. Patients are admitted via GP referral (elective) or emergency. Private hospital patients can choose their specialist and have shorter waits.',
      he: 'בתי חולים ציבוריים, ממומנים על ידי ממשלות מדינה/טריטוריה עם תרומות פדרליות, מספקים את רוב הטיפול המשני. מטופלים מתקבלים דרך הפניה מ-GP (אלקטיבי) או חירום. מטופלים בבתי חולים פרטיים יכולים לבחור את המומחה שלהם ולהמתין פחות.',
    },
    singapore: {
      en: 'Public hospitals provide subsidized secondary and tertiary care. Patients may be admitted to different ward classes (A, B1, B2, C) with varying costs and amenities. Restructured government hospitals operate semi-autonomously to improve efficiency.',
      he: 'בתי חולים ציבוריים מספקים טיפול מסובסד משני ושלישוני. מטופלים עשויים להתאשפז במחלקות שונות (A, B1, B2, C) עם עלויות ושירותים שונים. בתי חולים ממשלתיים שאורגנו מחדש פועלים בצורה חצי-אוטונומית לשיפור היעילות.',
    },
    japan: {
      en: 'Hospitals (20+ beds) provide both outpatient and inpatient specialist care. Patients can self-refer directly to hospitals, though a small surcharge is applied to encourage clinic-first behavior. The outpatient/inpatient boundary is less strict than in many other countries.',
      he: 'בתי חולים (20+ מיטות) מספקים טיפול מומחה הן חוץ-בית-חולי והן באשפוז. מטופלים יכולים לפנות ישירות לבתי חולים, אם כי חיוב קטן נוסף מיושם כדי לעודד התנהגות של מרפאה-תחילה. הגבול חוץ-בית-חולי/אשפוז פחות קפדני מאשר במדינות רבות אחרות.',
    },
    netherlands: {
      en: 'Specialist care requires a GP referral. Specialists (medisch specialisten) work mainly in hospitals and receive income through hospital contracts or as private practitioners with contracts. Since 2012, insurers negotiate prices directly with hospitals.',
      he: 'טיפול מומחה דורש הפניה מ-GP. מומחים (medisch specialisten) עובדים בעיקר בבתי חולים ומקבלים הכנסה דרך חוזי בית חולים או כמטפלים פרטיים עם חוזים. מאז 2012, מבטחים מנהלים משא ומתן ישיר על מחירים עם בתי חולים.',
    },
    canada: {
      en: 'Specialists work mostly in hospitals or specialized outpatient clinics. GP referral is required in most provinces. Wait times for specialist appointments and elective procedures are among the longest in the OECD, a major ongoing policy concern.',
      he: 'מומחים עובדים בעיקר בבתי חולים או במרפאות מומחים חוץ-בית-חולי. הפניה מ-GP נדרשת ברוב הפרובינציות. זמני המתנה לפגישות מומחה ולהליכים אלקטיביים הם מהארוכים ב-OECD, דאגת מדיניות מרכזית ומתמשכת.',
    },
  },
  8: {
    israel: {
      en: 'Tertiary care is concentrated in large academic teaching hospitals (Hadassah, Ichilov, Rambam, Sheba). Patients are referred from secondary hospitals. These centers also drive most medical research in Israel.',
      he: 'הטיפול השלישוני מרוכז בבתי חולים אקדמיים גדולים (הדסה, איכילוב, רמב"ם, שיבא). מטופלים מופנים מבתי חולים משניים. מרכזים אלה גם מניעים את רוב המחקר הרפואי בישראל.',
    },
    germany: {
      en: 'University hospitals (Universitätsklinikum) provide highly specialized tertiary and quaternary care. Patients are usually referred from general hospitals. Germany has some of the world\'s leading centers for cancer, cardiac, and neurological care.',
      he: 'בתי חולים אוניברסיטאיים (Universitätsklinikum) מספקים טיפול שלישוני ורביעוני מיוחד ביותר. מטופלים מופנים בדרך כלל מבתי חולים כלליים. גרמניה מחזיקה בכמה ממרכזי הסרטן, הלב והנוירולוגיה המובילים בעולם.',
    },
    uk: {
      en: 'Regional and supra-regional teaching hospitals provide tertiary care — patients must be referred from secondary care. Specialist centers (e.g., Great Ormond Street for pediatrics, Royal Marsden for cancer) serve national or supra-regional populations.',
      he: 'בתי חולים אזוריים ועל-אזוריים לימוד מספקים טיפול שלישוני — מטופלים חייבים להיות מופנים מהטיפול המשני. מרכזים מיוחדים (כמו Great Ormond Street לרפואת ילדים, Royal Marsden לסרטן) משרתים אוכלוסיות לאומיות או על-אזוריות.',
    },
    usa: {
      en: 'Academic Medical Centers (AMCs) and major health systems like Mayo Clinic, Cleveland Clinic, and Johns Hopkins provide the most complex tertiary and quaternary care. The US is also the global center of medical research and clinical trials.',
      he: 'מרכזים רפואיים אקדמיים (AMCs) ומערכות בריאות גדולות כמו Mayo Clinic, Cleveland Clinic ו-Johns Hopkins מספקים את הטיפול השלישוני והרביעוני המורכב ביותר. ארה"ב היא גם המרכז הגלובלי למחקר רפואי ולניסויים קליניים.',
    },
    australia: {
      en: 'Major public teaching hospitals in capital cities serve as tertiary and quaternary referral centers. They are state-funded and affiliated with universities. Patients from rural areas face significant distance barriers to tertiary care.',
      he: 'בתי חולים ציבוריים גדולים לימוד בערי הבירה משמשים כמרכזי הפניה שלישוניים ורביעוניים. הם ממומנים על ידי המדינה ומסונפים לאוניברסיטאות. מטופלים מאזורים כפריים מתמודדים עם מחסומי מרחק משמעותיים לטיפול שלישוני.',
    },
    singapore: {
      en: 'Singapore National University Hospital, Singapore General Hospital, and specialty centers like the National Cancer Centre provide advanced tertiary care. Singapore serves as a regional medical hub attracting patients from across Southeast Asia.',
      he: 'בית החולים האוניברסיטאי הלאומי של סינגפור, בית החולים הכללי של סינגפור ומרכזים מיוחדים כמו המרכז הלאומי לסרטן מספקים טיפול שלישוני מתקדם. סינגפור משמשת כמרכז רפואי אזורי המושך מטופלים מכל דרום מזרח אסיה.',
    },
    japan: {
      en: 'Designated Advanced Treatment Hospitals (特定機能病院, Tokutei Kino Byoin) provide highly specialized tertiary care with advanced technology and research. Referral is required but the system is looser than in Europe.',
      he: 'בתי חולים מיועדים לטיפול מתקדם (特定機能病院, Tokutei Kino Byoin) מספקים טיפול שלישוני מיוחד ביותר עם טכנולוגיה מתקדמת ומחקר. הפניה נדרשת אך המערכת יותר גמישה מאשר באירופה.',
    },
    netherlands: {
      en: 'Eight University Medical Centers (UMCs) affiliated with Dutch universities provide tertiary and quaternary care and conduct most medical research. Patients are referred from secondary hospitals. Some specialized care is nationally concentrated (e.g., pediatric surgery).',
      he: 'שמונה מרכזים רפואיים אוניברסיטאיים (UMCs) המסונפים לאוניברסיטאות הולנדיות מספקים טיפול שלישוני ורביעוני ומנהלים את רוב המחקר הרפואי. מטופלים מופנים מבתי חולים משניים. חלק מהטיפול המיוחד מרוכז ברמה לאומית (כמו ניתוחי ילדים).',
    },
    canada: {
      en: 'Academic Health Sciences Centers (AHSCs), affiliated with medical schools, provide tertiary and quaternary care. They also train physicians and conduct research. Inter-provincial referrals occur for rare conditions where only one or two centers in the country exist.',
      he: 'מרכזי מדעי הבריאות האקדמיים (AHSCs), המסונפים לאסכולות רפואיות, מספקים טיפול שלישוני ורביעוני. הם גם מכשירים רופאים ומנהלים מחקר. הפניות בין-פרובינציאליות מתרחשות למצבים נדירים שבהם קיים רק מרכז אחד או שניים בכל המדינה.',
    },
  },
  9: {
    israel: {
      en: 'The benefits basket (sal bri\'ut) is updated annually by a government committee. It includes hospital care, primary and specialist care, medications on the drug list, mental health services, and some dental care for children. Preventive services and vaccinations are included.',
      he: 'סל הבריאות מתעדכן מדי שנה על ידי ועדה ממשלתית. הוא כולל טיפול בבית חולים, טיפול ראשוני ומומחה, תרופות ברשימת התרופות, שירותי בריאות הנפש ושיניים מסוימים לילדים. שירותים מניעתיים וחיסונים כלולים.',
    },
    germany: {
      en: 'The Federal Joint Committee (G-BA) defines the comprehensive benefits catalog. Includes hospital care, ambulatory physician care, prescribed medications, dental care (basic), preventive services, mental health, maternity care, and medical devices.',
      he: 'הוועדה הפדרלית המשותפת (G-BA) מגדירה את קטלוג ההטבות המקיף. כולל טיפול בבית חולים, טיפול רפואה חוץ-בית-חולי, תרופות במרשם, טיפול שיניים (בסיסי), שירותים מניעתיים, בריאות הנפש, טיפול אמהות ומכשירים רפואיים.',
    },
    uk: {
      en: 'NHS covers: GP and hospital care, emergency services, most medications (via prescription charges), maternity, mental health, preventive services (screening, vaccinations), clinically necessary dental and optical, palliative care, rehabilitation, and assistive devices.',
      he: 'ה-NHS מכסה: טיפול GP ובית חולים, שירותי חירום, רוב התרופות (דרך דמי מרשם), אמהות, בריאות הנפש, שירותים מניעתיים (סקירות, חיסונים), שיניים ועיניים הנחוצים מבחינה קלינית, טיפול פליאטיבי, שיקום ועזרים.',
    },
    usa: {
      en: 'Coverage varies by plan. The ACA mandates 10 Essential Health Benefits (EHBs): ambulatory care, emergency, hospitalization, maternity, mental health/substance use, prescription drugs, rehabilitative services, lab tests, preventive services, and pediatric services.',
      he: 'הכיסוי משתנה לפי תוכנית. ה-ACA מחייב 10 הטבות בריאות חיוניות (EHBs): טיפול חוץ-בית-חולי, חירום, אשפוז, אמהות, בריאות הנפש/שימוש בחומרים, תרופות מרשם, שירותי שיקום, בדיקות מעבדה, שירותים מניעתיים ושירותי ילדים.',
    },
    australia: {
      en: 'Medicare covers all MBS items (GP, specialist, diagnostic imaging, pathology). The PBS subsidizes most prescription medications. Public hospital care is free. Preventive programs (cancer screening, immunization) are fully funded.',
      he: 'Medicare מכסה את כל פריטי MBS (GP, מומחה, הדמייה אבחונית, פתולוגיה). ה-PBS מסבסד את רוב תרופות המרשם. טיפול בבית חולים ציבורי הוא חינמי. תוכניות מניעה (סריקת סרטן, חיסון) ממומנות במלואן.',
    },
    singapore: {
      en: 'Public hospitals offer comprehensive inpatient and outpatient care with tiered subsidies. MediShield Life covers large hospital bills and selected outpatient treatments. CHAS (Community Health Assist Scheme) subsidizes primary care for lower-income groups.',
      he: 'בתי חולים ציבוריים מציעים טיפול מקיף לאשפוז ולחוץ-בית-חולי עם סובסידיות מדורגות. MediShield Life מכסה חשבונות בית חולים גדולים וטיפולים חוץ-בית-חולי נבחרים. CHAS מסבסד טיפול ראשוני לקבוצות הכנסה נמוכה.',
    },
    japan: {
      en: 'The SHI benefit package is very comprehensive, covering almost all medical services: physician visits, hospitalization, surgery, prescribed medications, dental (most), childbirth, mental health, and preventive health checkups (specific health checkups for those 40-74).',
      he: 'חבילת ההטבות של SHI מקיפה מאוד, כוללת כמעט את כל השירותים הרפואיים: ביקורי רופא, אשפוז, ניתוח, תרופות במרשם, שיניים (רוב), לידה, בריאות הנפש ובדיקות בריאות מניעתיות (בדיקות בריאות ספציפיות לגיל 40-74).',
    },
    netherlands: {
      en: 'The basic package (basisverzekering) is defined by the government and includes GP care, hospital care, specialist care, most medications, maternity care, mental health (GGZ), medical devices, and transport. Insurers must offer this identical package to all applicants.',
      he: 'החבילה הבסיסית (basisverzekering) מוגדרת על ידי הממשלה וכוללת טיפול GP, טיפול בבית חולים, טיפול מומחה, רוב התרופות, טיפול אמהות, בריאות הנפש (GGZ), מכשירים רפואיים והסעה. מבטחים חייבים להציע חבילה זהה זו לכל המבקשים.',
    },
    canada: {
      en: 'Medically necessary hospital and physician services are universally covered in all provinces per the Canada Health Act. Specific services vary by province but generally include inpatient care, surgery, diagnostic tests, and physician visits.',
      he: 'שירותי בית חולים ורופאים הכרחיים מבחינה רפואית מכוסים אוניברסלית בכל הפרובינציות לפי חוק הבריאות הקנדי. שירותים ספציפיים משתנים לפי פרובינציה אך בדרך כלל כוללים טיפול אשפוז, ניתוח, בדיקות אבחון וביקורי רופא.',
    },
  },
  10: {
    israel: {
      en: 'Dental care (except for children), most optical services, cosmetic procedures, fertility treatments beyond the first few cycles, long-term nursing home care, and many medications not on the drug list are not covered. Significant out-of-pocket costs result.',
      he: 'טיפול שיניים (מלבד לילדים), רוב שירותי הראייה, פרוצדורות קוסמטיות, טיפולי פוריות מעבר למספר הסבבים הראשונים, טיפול בבית אבות לטווח ארוך ותרופות רבות שאינן ברשימת התרופות אינם מכוסים. כתוצאה מכך נוצרות עלויות מהכיס משמעותיות.',
    },
    germany: {
      en: 'Cosmetic surgery, most non-prescription medications, advanced dental prosthetics (basic dental covered), most vision correction (glasses/contacts for adults), most homeopathy/alternative medicine, and upgrades to private hospital rooms.',
      he: 'ניתוחים קוסמטיים, רוב התרופות ללא מרשם, תותבות שיניים מתקדמות (שיניים בסיסיות מכוסות), רוב תיקוני הראייה (משקפיים/עדשות למבוגרים), רוב ההומאופתיה/רפואה אלטרנטיבית, ושדרוגים לחדרי בית חולים פרטיים.',
    },
    uk: {
      en: 'Long-term social care, most adult dental (beyond clinical need), adult optical (beyond clinical need), most prescription medications (a flat charge applies), cosmetic surgery, and many cutting-edge treatments not approved by NICE are excluded.',
      he: 'טיפול חברתי לטווח ארוך, רוב שיני מבוגרים (מעבר לצורך קליני), עיניים למבוגרים (מעבר לצורך קליני), רוב התרופות במרשם (חיוב קבוע חל), ניתוחים קוסמטיים וטיפולים חדשניים רבים שאינם מאושרים על ידי NICE אינם מכוסים.',
    },
    usa: {
      en: 'Dental, vision, and hearing aids are excluded from most plans (including Medicare). Long-term care is largely excluded. Many expensive brand-name drugs face high cost-sharing. Services not deemed "medically necessary" by insurers are routinely denied.',
      he: 'שיניים, ראייה ומכשירי שמיעה אינם כלולים ברוב התוכניות (כולל Medicare). טיפול ארוך טווח אינו מכוסה ברובו. תרופות יקרות עם שם מסחרי רבות מתמודדות עם שיתוף עלויות גבוה. שירותים שאינם נחשבים "הכרחיים מבחינה רפואית" על ידי מבטחים נדחים באופן שגרתי.',
    },
    australia: {
      en: 'Dental care for adults (limited Child Dental Benefits Scheme exists), most optical for adults, ambulance services (varies by state), over-the-counter medications, and cosmetic procedures are not covered by Medicare.',
      he: 'טיפול שיניים למבוגרים (קיים תוכנית הטבות שיניים מוגבלת לילדים), רוב שירותי הראייה למבוגרים, שירותי אמבולנס (משתנה לפי מדינה), תרופות ללא מרשם ופרוצדורות קוסמטיות אינן מכוסות על ידי Medicare.',
    },
    singapore: {
      en: 'Cosmetic surgery, most dental (except for subsidized polyclinic basic dental), traditional Chinese medicine (not covered in public hospitals), and many outpatient specialist visits require significant co-payments or full out-of-pocket payment.',
      he: 'ניתוחים קוסמטיים, רוב שיניים (מלבד שיניים בסיסיות בפוליקליניקה מסובסדת), רפואה סינית מסורתית (לא מכוסה בבתי חולים ציבוריים) וביקורי מומחה חוץ-בית-חולי רבים דורשים תשלומים עצמיים משמעותיים או תשלום מהכיס מלא.',
    },
    japan: {
      en: 'Most cosmetic procedures, some traditional medicine (though acupuncture and moxibustion are partially covered), advanced new treatments awaiting approval, some dental cosmetics, and non-medical amenities (private rooms beyond standard) are not covered.',
      he: 'רוב הפרוצדורות הקוסמטיות, חלק מהרפואה המסורתית (אם כי דיקור ומוקסיבוסציה מכוסים חלקית), טיפולים חדשים מתקדמים הממתינים לאישור, חלק מקוסמטיקת השיניים ושירותים שאינם רפואיים (חדרים פרטיים מעבר לסטנדרט) אינם מכוסים.',
    },
    netherlands: {
      en: 'Adult dental care (for those 18+), physiotherapy (only first 20 sessions of certain conditions), glasses and contact lenses for adults, cosmetic surgery, and many alternative/complementary therapies are excluded from the basic package.',
      he: 'טיפול שיניים למבוגרים (גיל 18+), פיזיותרפיה (רק 20 הפגישות הראשונות של מצבים מסוימים), משקפיים ועדשות מגע למבוגרים, ניתוחים קוסמטיים וטיפולים אלטרנטיביים/משלימים רבים אינם כלולים בחבילה הבסיסית.',
    },
    canada: {
      en: 'Prescription drugs (no national pharmacare until recently), dental, vision, ambulance, home care (variable by province), physiotherapy, psychology, and most long-term care costs are not covered under provincial Medicare plans.',
      he: 'תרופות מרשם (ללא Pharmacare לאומי עד לאחרונה), שיניים, ראייה, אמבולנס, טיפול בבית (משתנה לפי פרובינציה), פיזיותרפיה, פסיכולוגיה ורוב עלויות הטיפול ארוך הטווח אינם מכוסים תחת תוכניות Medicare המחוזיות.',
    },
  },
  11: {
    israel: {
      en: 'A large parallel private sector exists. About 25% of health spending is private. Patients can pay privately for faster specialist access, private surgical procedures, and non-basket services. Concerns exist about "two-tier" healthcare and equity.',
      he: 'קיים מגזר פרטי מקביל גדול. כ-25% מהוצאות הבריאות הן פרטיות. מטופלים יכולים לשלם בפרטי לגישה מהירה יותר למומחה, ניתוחים פרטיים ושירותים שאינם בסל. קיימות חששות לגבי מערכת בריאות "דו-שכבתית" ושוויון.',
    },
    germany: {
      en: 'PKV (fully private insurance) covers about 11% of the population, mostly self-employed and high earners. PKV patients generally receive faster specialist access and more amenities. A parallel private sector creates clear two-tier dynamics.',
      he: 'PKV (ביטוח פרטי מלא) מכסה כ-11% מהאוכלוסייה, בעיקר עצמאיים ובעלי הכנסה גבוהה. מטופלי PKV מקבלים בדרך כלל גישה מהירה יותר למומחה ושירותים טובים יותר. מגזר פרטי מקביל יוצר דינמיקה ברורה של שתי שכבות.',
    },
    uk: {
      en: 'Private care is used mainly for elective procedures to avoid NHS waiting lists. About 10.5% have private insurance. Private hospitals (e.g., BUPA, Nuffield) coexist with NHS. Some NHS consultants also work privately (dual practice).',
      he: 'טיפול פרטי משמש בעיקר לפרוצדורות אלקטיביות כדי להימנע מרשימות ההמתנה של NHS. לכ-10.5% יש ביטוח פרטי. בתי חולים פרטיים (כגון BUPA, Nuffield) קיימים לצד ה-NHS. חלק מהיועצים של NHS גם עובדים בפרטי (עבודה כפולה).',
    },
    usa: {
      en: 'Private healthcare dominates the US system — most hospitals are private, most physicians are in private practice, and for-profit insurance companies are major actors. The private sector drives innovation but also high costs and inequity.',
      he: 'שירותי הבריאות הפרטיים שולטים במערכת האמריקאית — רוב בתי החולים הם פרטיים, רוב הרופאים עובדים בפרקטיקה פרטית, וחברות ביטוח למטרות רווח הן שחקנים מרכזיים. המגזר הפרטי מניע חדשנות אך גם עלויות גבוהות וחוסר שוויון.',
    },
    australia: {
      en: 'Private healthcare is well-developed alongside Medicare. About 44% have private hospital insurance. Government subsidizes private insurance through rebates to maintain a strong private sector and reduce pressure on public hospitals.',
      he: 'שירותי הבריאות הפרטיים מפותחים היטב לצד Medicare. לכ-44% יש ביטוח בית חולים פרטי. הממשלה מסבסדת ביטוח פרטי דרך החזרים כדי לשמר מגזר פרטי חזק ולהפחית לחץ על בתי חולים ציבוריים.',
    },
    singapore: {
      en: 'The government deliberately maintains a strong private sector to promote competition, patient choice, and system efficiency. Private hospitals account for about 20% of inpatient beds. Private GP clinics handle ~80% of primary care visits.',
      he: 'הממשלה שומרת בכוונה על מגזר פרטי חזק כדי לקדם תחרות, בחירת מטופל ויעילות המערכת. בתי חולים פרטיים מהווים כ-20% מהמיטות לאשפוז. מרפאות GP פרטיות מטפלות בכ-80% מביקורי הטיפול הראשוני.',
    },
    japan: {
      en: 'Despite near-universal public funding, most healthcare is delivered by private providers. The distinction is less about public vs. private access and more about amenities (single rooms, choice of doctor). Direct payments for private amenities are common.',
      he: 'למרות המימון הציבורי הכמעט אוניברסלי, רוב הבריאות ניתנת על ידי ספקים פרטיים. ההבחנה פחות עוסקת בגישה ציבורית לעומת פרטית ויותר בשירותים (חדרים בודדים, בחירת רופא). תשלומים ישירים עבור שירותים פרטיים נפוצים.',
    },
    netherlands: {
      en: 'Most hospitals have been legally restructured as private non-profit entities since 2006, competing for insurance contracts. This blurs the public/private line. Specialist practices may operate privately. Supplementary insurance opens access to additional services.',
      he: 'רוב בתי החולים אורגנו מחדש מבחינה משפטית כגופים פרטיים ללא מטרות רווח מאז 2006, המתחרים על חוזי ביטוח. זה מטשטש את קו הציבורי/פרטי. פרקטיקות מומחים עשויות לפעול בצורה פרטית. ביטוח משלים פותח גישה לשירותים נוספים.',
    },
    canada: {
      en: 'The Canada Health Act technically allows private delivery of insured services but prohibits extra-billing. In practice, most insured services are publicly funded. However, a growing private sector operates for non-insured services (dental, physiotherapy, drugs), and a small parallel private market exists in some provinces.',
      he: 'חוק הבריאות הקנדי מאפשר מבחינה טכנית מתן פרטי של שירותים מבוטחים אך אוסר חיוב נוסף. בפועל, רוב השירותים המבוטחים ממומנים ציבורית. עם זאת, מגזר פרטי גדל פועל לשירותים שאינם מבוטחים (שיניים, פיזיותרפיה, תרופות), ושוק פרטי מקביל קטן קיים בחלק מהפרובינציות.',
    },
  },
  12: {
    israel: {
      en: 'The Long-Term Care Insurance Law (1988) provides home-based care services (nursing hours, bathing assistance) for eligible elderly. Sick funds manage the services. Nursing homes are largely private and expensive, with only partial public subsidy.',
      he: 'חוק הביטוח הסיעודי (1988) מספק שירותי טיפול ביתי (שעות סיעוד, עזרה ברחצה) לקשישים הזכאים. קופות החולים מנהלות את השירותים. בתי אבות הם ברובם פרטיים ויקרים, עם סובסידיה ציבורית חלקית בלבד.',
    },
    germany: {
      en: 'Pflegeversicherung (1995) covers home care, daycare, and residential care across 5 levels of need. Family caregivers also receive support (training, respite, pension credits). It is considered a model system, though benefits have not kept up with costs.',
      he: 'Pflegeversicherung (1995) מכסה טיפול בבית, מעון יום ובית אבות ב-5 רמות צורך. מטפלים בני משפחה גם מקבלים תמיכה (הכשרה, מנוחה, זיכויי פנסיה). הוא נחשב למערכת מודל, אם כי ההטבות לא עמדו בקצב העלויות.',
    },
    uk: {
      en: 'LTC is administered by local councils, not the NHS. It is means-tested: those with assets above ~£23,250 pay full costs. An ongoing national debate ("social care crisis") highlights the system\'s underfunding. Homecare and care homes are mainly private providers contracted by councils.',
      he: 'טיפול ארוך טווח מנוהל על ידי מועצות מקומיות, לא ה-NHS. הוא נבחן לפי אמצעים: מי שיש לו נכסים מעל ~£23,250 משלם עלויות מלאות. דיון לאומי שוטף ("משבר הסיעוד הסוציאלי") מדגיש את המימון החסר של המערכת. שירותי טיפול בבית ובתי אבות הם בעיקר ספקים פרטיים המתוקשרים על ידי מועצות.',
    },
    usa: {
      en: 'Medicare covers short-term skilled nursing only (up to 100 days post-hospitalization). Medicaid covers LTC for those with depleted assets. Private LTC insurance covers a small fraction. Most families pay out-of-pocket — LTC is the leading cause of personal bankruptcy for seniors.',
      he: 'Medicare מכסה סיעוד מיומן לטווח קצר בלבד (עד 100 יום לאחר אשפוז). Medicaid מכסה טיפול ארוך טווח למי שנכסיו ירדו. ביטוח LTC פרטי מכסה חלק קטן. רוב המשפחות משלמות מהכיס — טיפול ארוך טווח הוא הגורם המוביל לפשיטת רגל אישית של קשישים.',
    },
    australia: {
      en: 'The Commonwealth Government funds aged care through My Aged Care (the national access point). Home Care Packages (4 levels) support aging in place. Residential Aged Care provides nursing home-level care. A means-tested fee applies to residential care.',
      he: 'ממשלת חבר העמים מממנת טיפול בגיל הזהב דרך My Aged Care (נקודת הגישה הלאומית). חבילות טיפול בבית (4 רמות) תומכות בהזדקנות במקום. בית אבות מספק טיפול ברמת בית אבות. תשלום על בסיס אמצעים חל לגבי מגורים.',
    },
    singapore: {
      en: 'CareShield Life provides monthly cash payouts for severe disability. Aged care is delivered through community hospitals, nursing homes, and home-based care services funded partly by Medisave and subsidies. CHAS and ILTC (Intermediate and Long-Term Care) subsidies help lower-income residents.',
      he: 'CareShield Life מספק תשלומים חודשיים במזומן לנכות קשה. טיפול בגיל הזהב ניתן דרך בתי חולים קהילתיים, בתי אבות ושירותי טיפול ביתי הממומנים בחלקם על ידי Medisave וסובסידיות. סובסידיות CHAS ו-ILTC (טיפול ביניים וארוך טווח) עוזרות לתושבים בעלי הכנסה נמוכה.',
    },
    japan: {
      en: 'The LTCI (2000) is funded equally by insurance premiums (50%) and taxes (50%). Care recipients pay 10% co-payment. Services include in-home care, day services, short stays, and residential facilities. Care needs are assessed in 7 levels (support 1-2, care 1-5).',
      he: 'ה-LTCI (2000) ממומן בשווה על ידי דמי ביטוח (50%) ומיסים (50%). מקבלי טיפול משלמים 10% תשלום עצמי. השירותים כוללים טיפול בבית, שירותי יום, שהות קצרה ומתקני מגורים. צרכי הטיפול מוערכים ב-7 רמות (תמיכה 1-2, טיפול 1-5).',
    },
    netherlands: {
      en: 'WLZ covers intensive long-term residential care (nursing homes, disability care). WMO (municipal support) provides homecare and day activities for those with lighter needs. Both are means-tested for client contributions. The Netherlands was an early pioneer of personal budgets for LTC.',
      he: 'WLZ מכסה טיפול מגורים ארוך טווח מאמיר (בתי אבות, טיפול בנכות). WMO (תמיכה עירונית) מספק טיפול בבית ופעילויות יום לבעלי צרכים קלים יותר. שניהם נבחנים לפי אמצעים לתרומות לקוח. הולנד הייתה חלוצה מוקדמת של תקציבים אישיים לטיפול ארוך טווח.',
    },
    canada: {
      en: 'LTC is provincially administered with significant variation. It includes home care (variable), community support, and residential facilities (nursing homes/long-term care homes). Public funding covers part of the cost; residents pay means-tested co-payments. COVID-19 exposed catastrophic failures in many facilities.',
      he: 'טיפול ארוך טווח מנוהל ברמה מחוזית עם שונות משמעותית. הוא כולל טיפול בבית (משתנה), תמיכה קהילתית ומתקני מגורים (בתי אבות/מוסדות סיעוד). המימון הציבורי מכסה חלק מהעלות; התושבים משלמים תשלומים עצמיים על בסיס אמצעים. COVID-19 חשף כישלונות קטסטרופליים במתקנים רבים.',
    },
  },
  13: {
    israel: {
      en: 'Hospital beds: ~2.2/1,000 (below OECD average of ~4.3). Physicians: ~3.5/1,000 (OECD average). Nurses: ~5.2/1,000 (below OECD average). MRI units: moderate. Israel faces persistent bed and nurse shortages relative to demand.',
      he: 'מיטות בית חולים: ~2.2/1,000 (מתחת לממוצע OECD של ~4.3). רופאים: ~3.5/1,000 (ממוצע OECD). אחיות: ~5.2/1,000 (מתחת לממוצע OECD). מכשירי MRI: מתון. ישראל מתמודדת עם מחסורים מתמשכים של מיטות ואחיות ביחס לביקוש.',
    },
    germany: {
      en: 'Hospital beds: ~7.8/1,000 (well above OECD average — one of the highest). Physicians: ~4.5/1,000. Nurses: ~13/1,000 (high). MRI: ~35/million (high). Germany is among the most well-resourced systems in the OECD.',
      he: 'מיטות בית חולים: ~7.8/1,000 (גבוה משמעותית מממוצע OECD — אחד הגבוהים ביותר). רופאים: ~4.5/1,000. אחיות: ~13/1,000 (גבוה). MRI: ~35/מיליון (גבוה). גרמניה היא מהמערכות המשאביות ביותר ב-OECD.',
    },
    uk: {
      en: 'Hospital beds: ~2.4/1,000 (well below OECD average). Physicians: ~3.0/1,000. Nurses: ~8.4/1,000. MRI: ~7/million (low). The NHS faces chronic workforce shortages and has been heavily reliant on foreign-trained staff.',
      he: 'מיטות בית חולים: ~2.4/1,000 (נמוך משמעותית מממוצע OECD). רופאים: ~3.0/1,000. אחיות: ~8.4/1,000. MRI: ~7/מיליון (נמוך). ה-NHS מתמודד עם מחסורי כוח אדם כרוניים ונשען רבות על כוח אדם שהוכשר בחו"ל.',
    },
    usa: {
      en: 'Hospital beds: ~2.8/1,000 (below OECD average). Physicians: ~2.7/1,000. Nurses: ~12.7/1,000 (high). MRI: ~40/million (highest in OECD). High technology investment but relative bed shortage. 30 of the world\'s top 50 medical research institutions are in the US.',
      he: 'מיטות בית חולים: ~2.8/1,000 (מתחת לממוצע OECD). רופאים: ~2.7/1,000. אחיות: ~12.7/1,000 (גבוה). MRI: ~40/מיליון (הגבוה ביותר ב-OECD). השקעה טכנולוגית גבוהה אך מחסור יחסי במיטות. 30 מ-50 מוסדות המחקר הרפואי המובילים בעולם נמצאים בארה"ב.',
    },
    australia: {
      en: 'Hospital beds: ~3.8/1,000. Physicians: ~4.0/1,000. Nurses: ~12.6/1,000. MRI: ~16/million. Australia has a well-resourced system overall, though rural and remote areas face significant workforce shortages.',
      he: 'מיטות בית חולים: ~3.8/1,000. רופאים: ~4.0/1,000. אחיות: ~12.6/1,000. MRI: ~16/מיליון. לאוסטרליה מערכת משאבית היטב בסך הכל, אם כי אזורים כפריים ומרוחקים מתמודדים עם מחסורי כוח אדם משמעותיים.',
    },
    singapore: {
      en: 'Hospital beds: ~2.5/1,000. Physicians: ~2.5/1,000. Nurses: ~6.7/1,000. MRI: ~8/million. Singapore maintains lean hospital infrastructure by design, emphasizing efficiency and high bed occupancy rates. Technology adoption is rapid.',
      he: 'מיטות בית חולים: ~2.5/1,000. רופאים: ~2.5/1,000. אחיות: ~6.7/1,000. MRI: ~8/מיליון. סינגפור שומרת על תשתית בית חולים רזה בכוונה, תוך דגש על יעילות ושיעורי תפוסת מיטות גבוהים. אימוץ הטכנולוגיה הוא מהיר.',
    },
    japan: {
      en: 'Hospital beds: ~12.6/1,000 (highest in the OECD by far — over 3x the average). Physicians: ~2.6/1,000. Nurses: ~12/1,000. MRI: ~57/million (highest in OECD). Japan\'s very high bed count reflects long average lengths of stay.',
      he: 'מיטות בית חולים: ~12.6/1,000 (הגבוה ביותר ב-OECD בפער גדול — פי 3 מהממוצע). רופאים: ~2.6/1,000. אחיות: ~12/1,000. MRI: ~57/מיליון (הגבוה ביותר ב-OECD). ספירת המיטות הגבוהה מאוד ביפן משקפת ימי אשפוז ממוצעים ארוכים.',
    },
    netherlands: {
      en: 'Hospital beds: ~3.0/1,000. Physicians: ~3.7/1,000. Nurses: ~10.7/1,000. MRI: ~17/million. The Netherlands has maintained efficient hospital infrastructure through active managed-care contracting between insurers and providers.',
      he: 'מיטות בית חולים: ~3.0/1,000. רופאים: ~3.7/1,000. אחיות: ~10.7/1,000. MRI: ~17/מיליון. הולנד שמרה על תשתית בית חולים יעילה דרך חוזים פעילים של טיפול מנוהל בין מבטחים לספקים.',
    },
    canada: {
      en: 'Hospital beds: ~2.5/1,000 (below OECD average). Physicians: ~2.8/1,000. Nurses: ~10.4/1,000. MRI: ~11/million. Canada has relatively fewer physicians and longer wait times partly due to supply constraints.',
      he: 'מיטות בית חולים: ~2.5/1,000 (מתחת לממוצע OECD). רופאים: ~2.8/1,000. אחיות: ~10.4/1,000. MRI: ~11/מיליון. לקנדה יש פחות רופאים יחסית וזמני המתנה ארוכים יותר, בחלקם בגלל אילוצי היצע.',
    },
  },
  14: {
    israel: {
      en: 'Health expenditure: ~8.3% GDP, ~$3,800 per capita (below OECD average). Life expectancy: ~83 years (above OECD average). Infant mortality: ~3.1/1,000 live births. Israel achieves relatively good health outcomes at moderate spending.',
      he: 'הוצאה לבריאות: ~8.3% תמ"ג, ~$3,800 לנפש (מתחת לממוצע OECD). תוחלת חיים: ~83 שנים (מעל ממוצע OECD). תמותת תינוקות: ~3.1/1,000 לידות חי. ישראל משיגה תוצאות בריאות טובות יחסית בהוצאה מתונה.',
    },
    germany: {
      en: 'Health expenditure: ~12.7% GDP, ~$8,000 per capita (among highest in OECD). Life expectancy: ~81 years. Infant mortality: ~3.1/1,000. Good outcomes but some evidence of overuse of hospital care and inefficiency.',
      he: 'הוצאה לבריאות: ~12.7% תמ"ג, ~$8,000 לנפש (מהגבוהים ב-OECD). תוחלת חיים: ~81 שנים. תמותת תינוקות: ~3.1/1,000. תוצאות טובות אך ראיות מסוימות לשימוש יתר בטיפול בבית חולים וחוסר יעילות.',
    },
    uk: {
      en: 'Health expenditure: ~10.9% GDP, ~$5,500 per capita. Life expectancy: ~81 years. Infant mortality: ~3.7/1,000. The NHS achieves good equity of access but struggles with outcomes compared to similarly-funded European systems, partly due to underfunding and wait times.',
      he: 'הוצאה לבריאות: ~10.9% תמ"ג, ~$5,500 לנפש. תוחלת חיים: ~81 שנים. תמותת תינוקות: ~3.7/1,000. ה-NHS משיג שוויון טוב בגישה אך מתקשה עם תוצאות בהשוואה למערכות אירופיות ממומנות דומות, בחלקו בגלל מחסור במימון וזמני המתנה.',
    },
    usa: {
      en: 'Health expenditure: ~17.6% GDP, ~$12,500 per capita (by far the highest in the world). Life expectancy: ~77.5 years (below OECD average). Infant mortality: ~5.4/1,000 (above OECD average). The US spends the most and achieves the least among comparable wealthy nations.',
      he: 'הוצאה לבריאות: ~17.6% תמ"ג, ~$12,500 לנפש (הגבוה ביותר בעולם בפער גדול). תוחלת חיים: ~77.5 שנים (מתחת לממוצע OECD). תמותת תינוקות: ~5.4/1,000 (מעל ממוצע OECD). ארה"ב מוציאה הכי הרבה ומשיגה הכי פחות בין מדינות עשירות דומות.',
    },
    australia: {
      en: 'Health expenditure: ~10.7% GDP, ~$7,000 per capita. Life expectancy: ~83.5 years (among highest in OECD). Infant mortality: ~3.1/1,000. Australia achieves excellent health outcomes with high population satisfaction.',
      he: 'הוצאה לבריאות: ~10.7% תמ"ג, ~$7,000 לנפש. תוחלת חיים: ~83.5 שנים (מהגבוהים ב-OECD). תמותת תינוקות: ~3.1/1,000. אוסטרליה משיגה תוצאות בריאות מצוינות עם שביעות רצון גבוהה של האוכלוסייה.',
    },
    singapore: {
      en: 'Health expenditure: ~6.1% GDP, ~$3,500 per capita (extremely efficient). Life expectancy: ~84 years (among highest globally). Infant mortality: ~1.7/1,000 (lowest in the world). Singapore is consistently ranked as one of the world\'s most efficient health systems.',
      he: 'הוצאה לבריאות: ~6.1% תמ"ג, ~$3,500 לנפש (יעיל ביותר). תוחלת חיים: ~84 שנים (מהגבוהים בעולם). תמותת תינוקות: ~1.7/1,000 (הנמוכה בעולם). סינגפור מדורגת באופן עקבי כאחת ממערכות הבריאות היעילות בעולם.',
    },
    japan: {
      en: 'Health expenditure: ~11.5% GDP, ~$5,000 per capita. Life expectancy: ~84.3 years (highest in the OECD). Infant mortality: ~1.8/1,000 (among lowest). Japan achieves the best longevity outcomes in the world with moderate spending.',
      he: 'הוצאה לבריאות: ~11.5% תמ"ג, ~$5,000 לנפש. תוחלת חיים: ~84.3 שנים (הגבוהה ב-OECD). תמותת תינוקות: ~1.8/1,000 (מהנמוכות). יפן משיגה את תוצאות האריכות ימים הטובות בעולם בהוצאה מתונה.',
    },
    netherlands: {
      en: 'Health expenditure: ~13.2% GDP, ~$8,200 per capita (one of the highest in Europe). Life expectancy: ~82.3 years. Infant mortality: ~3.5/1,000. Good outcomes but rising costs from the regulated competition model are a concern.',
      he: 'הוצאה לבריאות: ~13.2% תמ"ג, ~$8,200 לנפש (אחד הגבוהים באירופה). תוחלת חיים: ~82.3 שנים. תמותת תינוקות: ~3.5/1,000. תוצאות טובות אך עלויות עולות ממודל התחרות המוסדרת מהוות חשש.',
    },
    canada: {
      en: 'Health expenditure: ~12.2% GDP, ~$7,000 per capita. Life expectancy: ~82.4 years. Infant mortality: ~4.5/1,000. Canada spends significantly more than the UK for comparable outcomes, mainly driven by high physician and drug costs.',
      he: 'הוצאה לבריאות: ~12.2% תמ"ג, ~$7,000 לנפש. תוחלת חיים: ~82.4 שנים. תמותת תינוקות: ~4.5/1,000. קנדה מוציאה הרבה יותר מבריטניה לתוצאות דומות, בעיקר בשל עלויות גבוהות של רופאים ותרופות.',
    },
  },
  15: {
    israel: {
      en: 'Israel\'s system is unique in combining a Bismarckian insurance structure with competing sick funds and a Beveridge-style defined benefits basket. The 1994 law transformed a voluntary system into universal coverage. Rapid technology adoption, strong primary care, and a small geography enabling coordination are notable strengths.',
      he: 'המערכת הישראלית ייחודית בשילוב מבנה ביטוח ביסמארקי עם קופות חולים מתחרות וסל שירותים מוגדר בסגנון בוורידג\'. חוק 1994 הפך מערכת רצונית לכיסוי אוניברסלי. אימוץ טכנולוגי מהיר, טיפול ראשוני חזק וגיאוגרפיה קטנה המאפשרת תיאום הם חוזקות בולטות.',
    },
    germany: {
      en: 'Germany invented social health insurance (1883) — the Bismarckian model adopted by many countries. The dual GKV/PKV system creates structural inequality. Germany has the most hospital beds in Western Europe and among the highest health spending. The G-BA\'s HTA role and the Gesundheitsfonds (central allocation fund) are distinctive.',
      he: 'גרמניה המציאה את ביטוח הבריאות הסוציאלי (1883) — המודל הביסמארקי שאומץ על ידי מדינות רבות. המערכת הכפולה GKV/PKV יוצרת אי-שוויון מבני. לגרמניה יש הכי הרבה מיטות בית חולים במערב אירופה ומהוצאות הבריאות הגבוהות ביותר. תפקיד ה-HTA של G-BA וה-Gesundheitsfonds (קרן הקצאה מרכזית) הם ייחודיים.',
    },
    uk: {
      en: 'The NHS (1948) is the world\'s most famous single-payer, publicly owned and operated health system. Its founding principle — healthcare free at the point of need, based on clinical need not ability to pay — remains intact. NICE\'s cost-effectiveness model (cost per QALY) is internationally influential. Persistent underfunding and waiting times are its central challenge.',
      he: 'ה-NHS (1948) הוא מערכת הבריאות הנסלית ובבעלות ציבורית המפורסמת בעולם. עקרונו המייסד — בריאות חינמית בנקודת הצורך, המבוססת על צורך קליני ולא על יכולת תשלום — נשאר שלם. מודל עלות-תועלת של NICE (עלות ל-QALY) משפיע ברמה הבינלאומית. מחסור מתמיד במימון וזמני המתנה הם האתגר המרכזי שלו.',
    },
    usa: {
      en: 'The US is the only wealthy democracy without universal coverage. It spends by far the most of any nation on healthcare yet achieves middling outcomes — the "American healthcare paradox." It leads globally in medical research, pharmaceutical innovation, and technology, but high costs, medical debt, and coverage gaps are defining features.',
      he: 'ארה"ב היא הדמוקרטיה העשירה היחידה ללא כיסוי אוניברסלי. היא מוציאה בפער גדול הכי הרבה מכל מדינה על בריאות אך משיגה תוצאות בינוניות — "הפרדוקס הבריאותי האמריקאי". היא מובילה עולמית במחקר רפואי, חדשנות פרמצבטית וטכנולוגיה, אך עלויות גבוהות, חוב רפואי ופערי כיסוי הם תכונות מגדירות.',
    },
    australia: {
      en: 'Australia\'s dual public-private design is distinctive — Medicare covers everyone while government policy actively sustains a large private sector through rebates and loading penalties. The federal/state funding split creates governance complexity. The PBS drug subsidy system is considered a model for affordable pharmaceuticals.',
      he: 'עיצוב ציבורי-פרטי כפול של אוסטרליה הוא ייחודי — Medicare מכסה את כולם בעוד מדיניות ממשלתית מקיימת באופן פעיל מגזר פרטי גדול דרך החזרים ועמלות טעינה. הפיצול בין המימון הפדרלי/ממלכתי יוצר מורכבות ממשל. מערכת סובסידיית התרופות PBS נחשבת למודל לתרופות בנות-השגה.',
    },
    singapore: {
      en: 'Singapore\'s 3M model is globally unique — built on individual responsibility, mandatory savings, and government subsidies rather than insurance solidarity. It is the most efficient health system in the world by spending-to-outcomes ratio. The tiered ward system (A/B1/B2/C) and deliberate co-payment design to control demand are distinctive features.',
      he: 'מודל 3M של סינגפור הוא ייחודי עולמית — בנוי על אחריות אישית, חיסכון חובה וסובסידיות ממשלתיות במקום סולידריות ביטוחית. הוא מערכת הבריאות היעילה ביותר בעולם לפי יחס הוצאה-תוצאות. מערכת המחלקות המדורגת (A/B1/B2/C) ועיצוב תשלום-עצמי מכוון לשליטה בביקוש הם תכונות ייחודיות.',
    },
    japan: {
      en: 'Japan achieved universal coverage in 1961. Its uniform national fee schedule (set by government every 2 years) applies to all providers — a powerful cost-control lever. The world\'s highest life expectancy and most hospital beds are defining features. Rapid population aging is its greatest structural challenge.',
      he: 'יפן השיגה כיסוי אוניברסלי ב-1961. לוח השכר הלאומי האחיד שלה (נקבע על ידי הממשלה כל שנתיים) חל על כל הספקים — מנוף עוצמתי לשליטה בעלויות. תוחלת החיים הגבוהה ביותר בעולם ומספר המיטות הגדול ביותר בבית חולים הם תכונות מגדירות. הזדקנות אוכלוסייה מהירה היא האתגר המבני הגדול ביותר שלה.',
    },
    netherlands: {
      en: 'The Netherlands uses regulated competition among private insurers — a rare "third way" between pure public systems and unregulated markets. The risk equalization fund prevents cherry-picking. Community rating ensures solidarity. GP gatekeeping is extremely strong. The system is considered one of Europe\'s best but is also one of the most expensive.',
      he: 'הולנד משתמשת בתחרות מוסדרת בין מבטחים פרטיים — "דרך שלישית" נדירה בין מערכות ציבוריות טהורות ושווקים לא מוסדרים. קרן איזון הסיכונים מונעת בחירת דובדבנים. תעריף קהילתי מבטיח סולידריות. שמירת השער של GP חזקה ביותר. המערכת נחשבת לאחת הטובות באירופה אך היא גם אחת היקרות ביותר.',
    },
    canada: {
      en: 'Canada\'s "Medicare" is a federal-provincial partnership — publicly funded but provincially administered, creating 13 distinct systems under one national framework. The Canada Health Act prohibits extra-billing, maintaining equity. The absence of national pharmacare (until recently) and long wait times are defining weaknesses alongside strong primary care equity.',
      he: 'ה-"Medicare" הקנדי הוא שותפות פדרלית-מחוזית — ממומן ציבורית אך מנוהל מחוזית, ויוצר 13 מערכות נפרדות תחת מסגרת לאומית אחת. חוק הבריאות הקנדי אוסר חיוב נוסף, ושומר על שוויון. היעדר Pharmacare לאומי (עד לאחרונה) וזמני המתנה ארוכים הם חולשות מגדירות לצד שוויון חזק בטיפול הראשוני.',
    },
  },
}
