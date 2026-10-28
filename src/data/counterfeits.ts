// Confirmed counterfeit / falsified products, taken from NAFDAC public alerts
// (https://nafdac.gov.ng/category/recalls-and-alerts/). Wording is copied from each notice;
// fields a notice doesn't give are left out rather than filled in.
import projeanilFront from '../assets/counterfeits/proguanil-projeanil-front.jpg'
import projeanilPack from '../assets/counterfeits/proguanil-projeanil-pack.jpg'
import regranilFront from '../assets/counterfeits/proguanil-regranil-front.jpg'
import regranilPack from '../assets/counterfeits/proguanil-regranil-pack.jpg'
import herceptin from '../assets/counterfeits/herceptin-counterfeit.jpg'
import mabthera from '../assets/counterfeits/mabthera-counterfeit.jpg'
import avastin from '../assets/counterfeits/avastin-counterfeit.jpg'
import tecentriq from '../assets/counterfeits/tecentriq-counterfeit.jpg'
import dermazinOriginal from '../assets/counterfeits/dermazin-original.jpg'
import dermazinCounterfeit from '../assets/counterfeits/dermazin-counterfeit.jpg'
import tavGenuineBatch from '../assets/counterfeits/tavanic-genuine-batch.jpg'
import tavFalsifiedBatch from '../assets/counterfeits/tavanic-falsified-batch.jpg'
import tavGenuineCloseup from '../assets/counterfeits/tavanic-genuine-batch-closeup.jpg'
import tavFalsifiedCloseup from '../assets/counterfeits/tavanic-falsified-batch-closeup.jpg'
import tavGenuineBlister from '../assets/counterfeits/tavanic-genuine-blister.jpg'
import tavFalsifiedBlister from '../assets/counterfeits/tavanic-falsified-blister.jpg'
import tavGenuineRecord from '../assets/counterfeits/tavanic-genuine-batch-record.jpg'
import tavFalsifiedOlder from '../assets/counterfeits/tavanic-falsified-older-batch.jpg'
import tavGenuineMas from '../assets/counterfeits/tavanic-genuine-mas.jpg'
import tavFalsifiedMas from '../assets/counterfeits/tavanic-falsified-mas.jpg'
import tavGenuineMas2 from '../assets/counterfeits/tavanic-genuine-mas-2.jpg'
import tavFalsifiedMas2 from '../assets/counterfeits/tavanic-falsified-mas-2.jpg'
import tavGenuineMas3 from '../assets/counterfeits/tavanic-genuine-mas-3.jpg'
import tavFalsifiedMas3 from '../assets/counterfeits/tavanic-falsified-mas-3.jpg'

export const NAFDAC_ALERTS_URL = 'https://nafdac.gov.ng/category/recalls-and-alerts/'

export type Category = 'medicine' | 'food'
export const categoryLabel: Record<Category, string> = { medicine: 'Pharmaceuticals', food: 'Packaged food' }

export type Photo = {
  src: string
  caption: string
  /** CSS object-position used when the photo is cropped into a square card */
  focus?: string
}

/** One line of the notice's product-details table. */
export type BatchRow = {
  product: string
  batch: string
  manufacturer?: string
  agent?: string
  mfg?: string
  exp?: string
  regNo?: string
}

/** A genuine-vs-fake comparison row (Tavanic, Dermazin). */
export type Comparison = {
  aspect: string
  genuine: string
  fake: string
  genuinePhotos?: Photo[]
  fakePhotos?: Photo[]
}

export type Counterfeit = {
  id: string
  alertNo: string
  /** Notice title without the "Public Alert No." prefix, used as the card summary */
  title: string
  noticeUrl: string
  /** Date the NAFDAC public alert was published */
  confirmedOn: string
  /** ISO date for sorting */
  confirmedIso: string
  product: string
  brand: string
  category: Category
  cover?: Photo
  photos: Photo[]
  /** How the counterfeit was found and confirmed */
  background: string[]
  /** Discrepancies listed in the notice */
  findings?: { intro?: string; items: string[] }
  comparison?: Comparison[]
  batches: BatchRow[]
  batchNotes?: string[]
  about?: string
  risk: string
  advice: string[]
}

// Advice lines repeated across notices (NAFDAC wording)
const vigilance =
  'Importers, distributors, retailers, healthcare professionals, and caregivers are hereby advised to exercise caution and vigilance within the supply chain to avoid the importation, distribution, sale, and use of counterfeit products. All medical products must be obtained from authorized/licensed suppliers. The products’ authenticity and physical condition should be carefully checked.'
const reportSuspicion =
  'Healthcare professionals and consumers are advised to report any suspicion of the sale of substandard and falsified medicines or medical devices to the nearest NAFDAC office, call NAFDAC on 0800-162-3322, or via email: sf.alert@nafdac.gov.ng'
const oncologyRisk =
  'Counterfeit oncology medicines may contain incorrect or no active ingredients, harmful contaminants, or incorrect dosage strength. This may result in treatment failure, disease progression, serious adverse events, or death'
const roche = 'Roche'

export const counterfeits: Counterfeit[] = [
  {
    id: 'augmentin-625mg-ac3n',
    alertNo: '024/2026',
    title: 'Alert on Counterfeit Augmentin 625mg Tablets (Batch No. AC3N) in Nigeria',
    noticeUrl: 'https://nafdac.gov.ng/public-alert-no-024-2026-alert-on-counterfeit-augmentin-625mg-tablets-batch-no-ac3n-in-nigeria/',
    confirmedOn: '30 Apr 2026',
    confirmedIso: '2026-04-30',
    product: 'Augmentin 625mg Tablets',
    brand: 'GSK',
    category: 'medicine',
    photos: [],
    background: [
      'The National Agency for Food and Drug Administration and Control (NAFDAC) is notifying healthcare providers and the public of the circulation of counterfeit or falsified Augmentin 625mg Tablets (2 x 7 tablets pack) with Batch No. AC3N in Nigeria.',
      'GSK evaluated and confirmed that the suspected product was counterfeit after reviewing documentary evidence, photographs, and a video from social media. Although the product shared the same batch number as authentic stock previously supplied to Nigeria, it exhibited inconsistent manufacturing and expiry dates, indicating that it had been falsified.',
    ],
    findings: {
      intro: 'Findings from Manufacturer’s Investigation',
      items: [
        'Batch AC3N was manufactured at Worthing, United Kingdom, on 23 August 2023.',
        'The batch was packed between 19 and 20 September 2023.',
        'No batch with the number AC3N was produced in September 2025.',
        'The manufacturing and expiry dates shown on the suspect sample (Manufacturing: September 2025 / Expiry: September 2028) are inconsistent with GSK production records and cannot be attributed to a GSK-produced batch.',
        'Packaging-level discrepancies, including textual errors and poor fin seal quality, were identified.',
        'Based on the evidence reviewed, the product was assessed as counterfeit.',
      ],
    },
    batches: [{ product: 'Augmentin 625mg Tablets (2 x 7 Tablets)', batch: 'AC3N', manufacturer: 'GlaxoSmithKline (GSK), Worthing Site, United Kingdom (genuine product)' }],
    about:
      'Augmentin (amoxicillin/clavulanic acid) is an antibiotic used for the treatment of bacterial infections. Any falsified version may contain incorrect amounts of active ingredients, no active ingredient, or harmful substances.',
    risk:
      'Counterfeit medicines pose serious risks to public health and safety. The use of counterfeit Augmentin 625mg Tablets may result in treatment failure, worsening of bacterial infections, development of antimicrobial resistance, adverse drug reactions due to unknown or harmful ingredients, and delay in receiving appropriate medical care.',
    advice: [
      'Consumers who have purchased or are currently using Augmentin 625mg Tablets suspected to be counterfeit should stop using the product immediately and consult a qualified healthcare professional.',
      'Importers, distributors, retailers, healthcare professionals, and consumers are advised to exercise caution and vigilance throughout the supply chain to avoid the purchase or use of the counterfeit Augmentin 625mg Tablets in circulation. All medical products must be obtained from authorized or licensed suppliers. The authenticity and physical condition of these products should be carefully checked before use.',
      'Healthcare professionals are advised to review the stocks in hospitals, clinics, and pharmacy stores, immediately quarantine the stock, and discontinue sale or distribution of any suspected counterfeit. Report any suspected falsified or compromised products (medicines or medical devices) to the nearest NAFDAC office, call NAFDAC on 0800-162-3322, or via email: sf.alert@nafdac.gov.ng',
    ],
  },
  {
    id: 'proguanil-projeanil-re-granil',
    alertNo: '023/2026',
    title: 'Alert on Counterfeit Brands of Proguanil (Projeanil and Re-granil) Tablet B.P 100mg with Fake NAFDAC Registration Number (04-6433) found in Nigeria',
    noticeUrl:
      'https://nafdac.gov.ng/public-alert-no-023-2026-alert-on-counterfeit-brands-of-proguanil-projeanil-and-re-granil-tablet-b-p-100mg-with-fake-nafdac-registration-number-04-6433-found-in-nigeria/',
    confirmedOn: '25 Mar 2026',
    confirmedIso: '2026-03-25',
    product: 'Projeanil and Re-Granil (Proguanil Tablet B.P 100mg)',
    brand: 'Projeanil, Re-Granil',
    category: 'medicine',
    cover: { src: projeanilFront, caption: 'Counterfeit Projeanil (Proguanil Tablets B.P 100mg)' },
    photos: [
      { src: projeanilFront, caption: 'Counterfeit Projeanil (Proguanil Tablets B.P 100mg)' },
      { src: projeanilPack, caption: 'Counterfeit Projeanil pack' },
      { src: regranilFront, caption: 'Counterfeit Re-Granil (Proguanil Tablets B.P 100mg)' },
      { src: regranilPack, caption: 'Counterfeit Re-Granil pack' },
    ],
    background: [
      'The National Agency for Food and Drugs Administration and Control (NAFDAC) is informing healthcare professionals and the general public of the circulation of counterfeit brands of Proguanil tablets, specifically Projeanil and Re-granil, both at 100 mg B.P.',
    ],
    findings: {
      items: [
        'The NAFDAC Registration Number (NRN) 04-6433 displayed on the products belongs to a different registered product Feroglobin B12 Capsules by Vitabiotics Nigeria.',
      ],
    },
    batches: [
      {
        product: 'Projeanil (Proguanil Tablet B.P 100mg)',
        manufacturer: 'Apple King Industry PVT 253, A/2 Shapujat, New Delhi, India',
        agent: 'Lifemore, 111 All Way, Ibadan',
        batch: 'BN600',
        mfg: '08/2024',
        exp: '09/2028',
        regNo: '04-6433 (fake)',
      },
      {
        product: 'Re-Granil (Proguanil Tablet B.P 100mg)',
        manufacturer: 'Jamila Export LAB. PVT LTD. 401 Indraluse Estate, Mumbai Batal, India',
        agent: 'Desmons Laboratory, 70 Ajibade Avenue, Ibadan',
        batch: 'BN600',
        mfg: '08/2022',
        exp: '09/2027',
        regNo: '04-6433 (fake)',
      },
    ],
    about:
      'Proguanil is an antimalarial medication, commonly used in combination with atovaquone (Malarone) or chloroquine to prevent and treat malaria, particularly Plasmodium falciparum.',
    risk:
      'Falsified, counterfeit, and unregistered medicines significantly threaten public health because they have not been evaluated in the lab, and their quality, safety, and efficacy cannot be assured.',
    advice: [
      'Distributors, retailers, healthcare professionals, and caregivers are advised to exercise caution and vigilance regarding the counterfeit products and to refrain from distributing, selling, or using them. All medical products must be obtained from authorized or licensed suppliers. The authenticity and physical condition of these products should be carefully checked before use.',
      'Healthcare professionals are advised to review stocks within hospitals, clinics, and pharmacy stores, report any suspected falsified or compromised products (medicines or medical devices) to the nearest NAFDAC office, call NAFDAC on 0800-162-3322, or via email: sf.alert@nafdac.gov.ng',
    ],
  },
  {
    id: 'cerelac-mixed-fruits-wheat',
    alertNo: '018/2026',
    title: 'Alert on Counterfeit and Unregistered Cerelac Found on Sale',
    noticeUrl: 'https://nafdac.gov.ng/public-alert-no-018-2026-alert-on-counterfeit-and-unregistered-cerelac-found-on-sale/',
    confirmedOn: '12 Mar 2026',
    confirmedIso: '2026-03-12',
    product: 'CERELAC Mixed Fruits and Wheat',
    brand: 'Nestlé',
    category: 'food',
    photos: [],
    background: [
      'Nestle Nigeria Plc, the genuine Marketing Authorization Holder for CERELAC Mixed Fruits and Wheat, received a complaint on the sale and distribution of suspected counterfeit CERELAC Mixed Fruits and Wheat, purportedly manufactured by Nestlé Spain, bearing Batch Code 308002910.',
      'According to Nestle Nigeria, the complainant reported that the counterfeit product emitted an odour suggestive of possible contact with fuel. Preliminary review of the product by Nestle Nigeria indicated that the product has expired despite the can displaying an expiry date of 10-2026, which suggests that the date coding has been tampered with (revalidated).',
      'On investigation, the Post Marketing Surveillance (PMS) Directorate Officers in Lagos State conducted a surveillance visit at Maxland Shopping Center, 193 Ago Palace Way, Okota, Lagos, where the product was purchased by the complainant. The suspected counterfeit and unregistered CERELAC Mixed Fruits and Wheat were found on sale at the premises and subsequently mopped up by the PMS officers.',
    ],
    findings: {
      intro: 'The key distinguishing feature is the date marking format.',
      items: [
        'The unregistered product uses a hyphen (-) to separate the day from the year.',
        'The registered product uses a slash (/) to separate the day from the year.',
      ],
    },
    batches: [{ product: 'CERELAC Mixed Fruits and Wheat', manufacturer: 'Nestlé Spain (purported)', batch: '308002910', mfg: 'Not available', exp: '10-2026', regNo: 'Nil' }],
    batchNotes: ['It is important to note that Nestle Nigeria is not aware of the channels through which the products are supplied into the country.'],
    about: 'Nestle Cerelac Mixed Fruits and Wheat is a nutritious infant cereal designed to be a delicious first food for infants.',
    risk:
      'Counterfeit formula often lacks essential nutrients, vitamins, and minerals, leading to stunted growth or developmental issues. They may also contain contaminants that may lead to severe health consequences to infants or even death.',
    advice: [
      'Distributors, retailers, healthcare professionals, and caregivers are hereby advised to exercise caution and vigilance within the supply chain to avoid the distribution, sale, and use of the SF product. All packaged food and medical products must be obtained from authorized/licensed suppliers. The products’ authenticity and physical condition should be carefully checked.',
      'Healthcare professionals and consumers are advised to report any suspicion of the sale of substandard and falsified regulated products to the nearest NAFDAC office, call NAFDAC on 0800-162-3322, or via email: sf.alert@nafdac.gov.ng',
      'Consumers are encouraged to report suspected availability of the Counterfeit CERELAC Mixed Fruits and Wheat to the nearest NAFDAC office.',
    ],
  },
  {
    id: 'herceptin-600mg-a8519b34',
    alertNo: '017/2026',
    title: 'Alert on Confirmed Counterfeit of Herceptin 600 mg in Nigeria',
    noticeUrl: 'https://nafdac.gov.ng/public-alert-no-017-2026-alert-on-confirmed-counterfeit-of-herceptin-600-mg-in-nigeria/',
    confirmedOn: '12 Mar 2026',
    confirmedIso: '2026-03-12',
    product: 'Herceptin 600 mg',
    brand: roche,
    category: 'medicine',
    cover: { src: herceptin, caption: 'Counterfeit Herceptin 600 mg, batch A8519B34', focus: '35% 50%' },
    photos: [{ src: herceptin, caption: 'Counterfeit Herceptin 600 mg, batch A8519B34' }],
    background: [
      'This alert follows official communications from Roche Nigeria confirming a counterfeit case of Herceptin 600 mg with batch number A8519B34 reported in Lagos state, Nigeria.',
      'The counterfeited batch of the product was said to have been offered to a customer by a pharmacist in Lagos at a significantly lower price of NGN 50,000 compared to the standard rate.',
    ],
    findings: {
      intro: 'The comparison revealed significant differences from genuine packaging material, which includes:',
      items: [
        'Wrong artwork,',
        'Wrong expiry date,',
        'Incorrect 2D matrix code.',
        'The lot tracing is not possible because the batch number A8519B34 is not a genuine Roche batch number for Herceptin.',
      ],
    },
    batches: [{ product: 'Herceptin 600 mg', manufacturer: 'F.Hoffmann-La Roche Ltd, Kaiseraugust, Switzerland', batch: 'A8519B34', mfg: '01/2024', exp: '11/2026' }],
    batchNotes: ['The genuine Herceptin 600 mg is manufactured by F. Hoffmann-La Roche Ltd in Basel, at the Kaiseraugust site in Switzerland.'],
    about:
      'Herceptin (trastuzumab) is a prescription drug used to treat certain types of breast cancer and stomach cancer. It works by inhibiting cancer cell growth and is administered via intravenous infusion or injection, often alongside chemotherapy',
    risk: oncologyRisk,
    advice: [vigilance, reportSuspicion],
  },
  {
    id: 'mabthera-500mg-n2110a09',
    alertNo: '016/2026',
    title: 'Alert on Confirmed Counterfeit of Mabthera 500mg/ 50ml in Nigeria',
    noticeUrl: 'https://nafdac.gov.ng/public-alert-no-016-2026-alert-on-confirmed-counterfeit-of-mabthera-500mg-50ml-in-nigeria/',
    confirmedOn: '12 Mar 2026',
    confirmedIso: '2026-03-12',
    product: 'Mabthera 500mg/50ml',
    brand: roche,
    category: 'medicine',
    cover: { src: mabthera, caption: 'Counterfeit Mabthera 500 mg/50 mL, batch N2110A09', focus: '12% 20%' },
    photos: [{ src: mabthera, caption: 'Counterfeit Mabthera 500 mg/50 mL, batch N2110A09' }],
    background: [
      'This alert follows official communications from Roche Nigeria confirming counterfeit cases of Mabthera 500mg/50ml with batch number N2110A09 reported in Kaduna and Gombe states of Nigeria.',
      'In both cases, the counterfeited batch of the product was brought in by patients in each location and reportedly sold at significantly lower prices between NGN 160,000 and NGN 275,000, respectively.',
    ],
    findings: {
      intro: 'Roche Nigeria’s investigation revealed clear evidence of counterfeit activities regarding the folding box. The following differences were detected:',
      items: [
        'The batch number does not exist in the Roche database.',
        'Wrong language (Turkish instead of English),',
        'Wrong placement of Braille text, and',
        'Incorrect tamper-evidence labels.',
        'In addition, several significant differences were detected on the labelled vial, including a non-existent batch number, wrong language (English instead of Turkish), a different glass vial (e.g., shape and dimensions), a different stopper (e.g., colour, dimensions), a different aluminium seal (e.g., dimensions), and a different flip-off cap (e.g., colour, shape).',
      ],
    },
    batches: [{ product: 'Mabthera 500 mg/50 mL', manufacturer: 'Genentech Inc., Hillsboro, ABD (stated place of production)', batch: 'N2110A09', mfg: 'Not provided in the pack', exp: '09/10/26' }],
    batchNotes: [
      'Note: The correct manufacturing site for genuine Mabthera 500 mg/50 mL is Made for F. Hoffmann-La Roche Ltd, Basel, Switzerland by Roche Diagnostics GmbH, Galenical Plant, Germany, Sandhofer Strasse 116, Mannheim 68305.',
    ],
    about:
      'Mabthera (rituximab) is an antibody injection used to treat blood cancers (non-Hodgkin’s lymphoma, chronic lymphocytic leukaemia), severe rheumatoid arthritis, and autoimmune diseases like pemphigus vulgaris and vasculitis. It destroys specific white blood cells (B-cells) that cause disease.',
    risk: oncologyRisk,
    advice: [vigilance, reportSuspicion],
  },
  {
    id: 'avastin-400mg-tecentriq-1200mg',
    alertNo: '015/2026',
    title: 'Alert on Confirmed Counterfeit of Avastin 400mg/ 16ml and Tecentriq 1200mg/20ml in Nigeria',
    noticeUrl:
      'https://nafdac.gov.ng/public-alert-no-015-2026-alert-on-confirmed-counterfeit-of-avastin-400mg-16ml-and-tecentriq-1200mg-20ml-in-nigeria/',
    confirmedOn: '12 Mar 2026',
    confirmedIso: '2026-03-12',
    product: 'Avastin 400mg/16ml and Tecentriq 1200mg/20ml',
    brand: roche,
    category: 'medicine',
    cover: { src: avastin, caption: 'Counterfeit Avastin 400mg/16ml', focus: '37% 50%' },
    photos: [
      { src: avastin, caption: 'Counterfeit Avastin 400mg/16ml' },
      { src: tecentriq, caption: 'Counterfeit Tecentriq 1200mg/20ml' },
    ],
    background: [
      'The National Agency for Food and Drug Administration and Control (NAFDAC) is notifying healthcare professionals and the public of confirmed counterfeit batches of Avastin® 400mg/16ml (Bevacizumab) and Tecentriq® 1200mg/20ml (Atezolizumab) circulating in Nigeria.',
      'The Marketing Authorization Holder (MAH) reported receiving complaints from healthcare professionals across Nigeria. In many instances, patients brought counterfeit products to healthcare facilities. These counterfeit items were reportedly sold at significantly lower prices, ranging from NGN 180,000 to NGN 350,000.',
    ],
    findings: {
      intro: 'The following differences were observed during investigation',
      items: [
        'Batch numbers do not correspond to genuine Roche batches.',
        'Differences in artwork and printing quality.',
        'Wrong placement of text.',
        'Incorrect variable data.',
        'Tamper-evident labels inconsistent with genuine Roche products.',
        'Serial numbers not corresponding to the genuine Roche serialisation system',
      ],
    },
    batches: [
      { product: 'Avastin 400mg/16ml', manufacturer: 'Made for F. Hoffmann-La Roche Ltd, Basel, Switzerland, by Roche Diagnostics GmbH, Mannheim, Germany', batch: 'H4239A70', mfg: '03/2024', exp: '10/2026' },
      { product: 'Avastin 400mg/16ml', manufacturer: 'Made for F. Hoffmann-La Roche Ltd, Basel, Switzerland, by Roche Diagnostics GmbH, Mannheim, Germany', batch: 'H2290A34', mfg: '08/2024', exp: '05/2027' },
      { product: 'Avastin 400mg/16ml', manufacturer: 'Made for F. Hoffmann-La Roche Ltd, Basel, Switzerland, by Roche Diagnostics GmbH, Mannheim, Germany', batch: 'A3508B02', mfg: '07/2024', exp: '12/2026' },
      { product: 'Tecentriq 1200mg/20ml', manufacturer: 'Production place : F. Hoffmann-La Roche Ltd, Kaiseraugst, Switzerland', batch: 'B3071A12', mfg: 'Not provided on pack', exp: '01/10/2026' },
    ],
    about:
      'AVASTIN (bevacizumab) is indicated for the treatment of recurrent glioblastoma in adults. It is a tumour-starving (anti-angiogenic) therapy. TECENTRIQ (atezolizumab) is a prescription immunotherapy used to treat several advanced cancers, including non-small cell lung cancer (NSCLC), extensive-stage small cell lung cancer (ES-SCLC), hepatocellular carcinoma (liver cancer), and melanoma.',
    risk: oncologyRisk,
    advice: [vigilance, reportSuspicion],
  },
  {
    id: 'phesgo-600mg',
    alertNo: '014/2026',
    title: 'Alert on Confirmed Counterfeits PHESGO 600mg With Batch Numbers B2346B16 and C3809C5',
    noticeUrl: 'https://nafdac.gov.ng/public-alert-no-014-2026-alert-on-confirmed-counterfeits-phesgo-600mg-with-batch-numbers-b2346b16-and-c3809c5/',
    confirmedOn: '08 Mar 2026',
    confirmedIso: '2026-03-08',
    product: 'Phesgo® 600mg/600mg/10mL',
    brand: roche,
    category: 'medicine',
    photos: [],
    background: [
      'The Marketing Authorization Holder (MAH), Roche, received these complaints from Lagos University Teaching Hospital (LUTH-NSIA) reporting suspected counterfeit Phesgo® 600mg with batch numbers B2346B16 and C3809C5. The batch C3809C5 vial volume was observed to be approximately 20mL instead of the expected 10mL. Both products were reported to be brought in by patients for administration.',
      'The batch number B2346B16 has been reported in four confirmed counterfeit complaints from multiple countries, including Turkey, Nigeria, and the Philippines. Each complaint featured the same fake batch number and false information as previously described.',
    ],
    findings: {
      intro: 'The investigation identified the following significant differences between the complaint sample pictures and the genuine materials, which confirmed the falsified status of the suspected counterfeit batches of Phesgo® 600mg;',
      items: [
        'A non-existent batch number in their database,',
        'Incorrect text',
        'Incorrect variable data',
        'The GTIN does not correspond to any genuine GTIN',
        'The tamper-evidence label was missing',
        'Significant differences in packaging material compared to the genuine product.',
      ],
    },
    batches: [
      { product: 'Phesgo® 600mg/600mg/10mL (Pertuzumab/Trastuzumab)', manufacturer: 'The manufacturing site is not visible in the photos provided.', batch: 'C3809C51', mfg: '01/2024', exp: '01/2026' },
      { product: 'Phesgo® 600mg/600mg/10mL (Pertuzumab/Trastuzumab)', manufacturer: 'The manufacturing site is not clear from the photos provided.', batch: 'B2346B16', mfg: '05/2024', exp: '05/2028' },
    ],
    batchNotes: ['Note: The correct manufacturing site for genuine Phesgo 600mg/600mg is F.Hoffman La Roche Limited, Wurmisweg, CH-4303, Kaiseraugst, Switzerland.'],
    about: 'Phesgo 600mg is used to treat breast cancer. It works by killing the cancer cells and preventing their further growth.',
    risk: 'The illegal marketing and distribution of counterfeit medicines risks people’s health, as they do not guarantee the safety, quality, and efficacy of the products due to non-compliance with regulatory standards.',
    advice: [vigilance, reportSuspicion],
  },
  {
    id: 'avastin-400mg-k1830t71-h0375b01',
    alertNo: '012/2026',
    title: 'Alert on Confirmed Counterfeit Batches of Avastin 400mg in Nigeria',
    noticeUrl: 'https://nafdac.gov.ng/public-alert-no-012-2026-alert-on-confirmed-counterfeit-batches-of-avastin-400mg-in-nigeria/',
    confirmedOn: '08 Mar 2026',
    confirmedIso: '2026-03-08',
    product: 'Avastin Vials 400 mg/16 ml',
    brand: roche,
    category: 'medicine',
    photos: [],
    background: [
      'The Marketing Authorization Holder (MAH), Roche, reported that an oncologist from a local hospital expressed concern about potentially counterfeit Avastin vials (400 mg/16 ml), batch numbers K1830T71 and H0375B01.',
      'According to the MAH, the complaint sample was compared to a genuine retain sample in the EFA (English, French, and Arabic) make-up presentation, because the GTIN (Global Trade Item Number) of the complaint sample folding box corresponded to the EFA make-up presentation.',
    ],
    findings: {
      intro: 'The following differences were observed during investigation',
      items: [
        'The batch number does not exist in the Roche database, making lot tracing impossible.',
        'The artwork contained incorrect text and spelling errors.',
        'Variable data was incorrect, and the placement was not consistent.',
        'The Tamper Evidence labels do not correspond to genuine Roche material.',
        'The complaint sample serial number does not correspond to any genuine Roche serial number.',
      ],
    },
    batches: [
      { product: 'Avastin Vials 400 mg/16 ml', manufacturer: 'F. Hoffmann- La Roche Ltd, Basel, Switzerland by Roche Diagnostics GmbH, Mannheim, Germany.', batch: 'K1830T71', mfg: '04/2025', exp: '05/2028' },
      { product: 'Avastin Vials 400 mg/16 ml', manufacturer: 'F. Hoffmann- La Roche Ltd, Basel, Switzerland by Roche Diagnostics GmbH, Mannheim, Germany.', batch: 'H0375B01', mfg: '02/2025', exp: '12/2027' },
    ],
    about: 'AVASTIN (bevacizumab) is indicated for the treatment of recurrent glioblastoma in adults. It is a tumour-starving (anti-angiogenic) therapy.',
    risk: 'The illegal marketing of medicines or counterfeit medicines poses a risk to people’s health because it does not guarantee the safety, quality, and efficacy of the products due to non-compliance with regulatory provisions.',
    advice: [vigilance, reportSuspicion],
  },
  {
    id: 'dostinex-0-5mg',
    alertNo: '07/2026',
    title: 'Alert on Surveillance and mop up of Counterfeit Dostinex (0.5mg) Tablets Found in Circulation',
    noticeUrl: 'https://nafdac.gov.ng/public-alert-no-07-2026-alert-on-surveillance-and-mop-up-of-counterfeit-dostinex-0-5mg-tablets-found-in-circulation/',
    confirmedOn: '13 Feb 2026',
    confirmedIso: '2026-02-13',
    product: 'Dostinex 0.5mg Tablet',
    brand: 'Pfizer',
    category: 'medicine',
    photos: [],
    background: [
      'The National Agency for Food and Drug Administration and Control (NAFDAC) is warning healthcare providers, patients, and the public about the falsification and parallel importation of three batches of a NAFDAC-registered product: Dostinex 0.5mg Tablets.',
      'Pfizer Nigeria Ltd, the Marketing Authorization Holder (MAH) of the products, has confirmed the presence of falsified and parallel unregistered imported versions of these products. According to Pfizer Nigeria Ltd, the legitimate product has been registered but has not yet been imported into Nigeria.',
    ],
    batches: [
      { product: 'Dostinex 0.5mg Tablet', manufacturer: 'Pfizer Italia S.R.L, Ascoli Piceno, Italy.', batch: 'GG3470', exp: 'June 2027', regNo: 'Nil' },
      { product: 'Dostinex 0.5mg Tablet', manufacturer: 'Pfizer Italia S.R.L, Ascoli Piceno, Italy.', batch: 'LG8659', exp: 'Jan. 2026', regNo: 'Nil' },
      { product: 'Dostinex 0.5mg Tablet', manufacturer: 'Pfizer Italia S.R.L, Ascoli Piceno, Italy.', batch: 'GG2440', exp: 'April 2026', regNo: 'Nil' },
    ],
    about: 'Dostinex 0.5 mg is a medication that reduces prolactin secretion, helping to alleviate symptoms caused by excess prolactin.',
    risk:
      'The potency of products is highly dependent on complying with regulatory requirements. Falsified, unlicensed, and unregistered medicines present significant risks to public health because these products have not been evaluated by NAFDAC. Therefore, the quality, safety, and efficacy of these products cannot be guaranteed.',
    advice: [
      'Distributors, retailers, healthcare professionals, and caregivers are hereby advised to note the discrepancies stated above, exercise caution and vigilance within the supply chain to avoid the distribution, sale, and use of the unregistered products. All medical products must be obtained from authorized/licensed suppliers. The products’ authenticity and physical condition should be carefully checked.',
      'Healthcare professionals are advised to review stocks within hospitals, clinics, and pharmacy stores, report any suspected falsified or compromised products (medicines or medical devices) to the nearest NAFDAC office, NAFDAC on 0800-162-3322, or via email: sf.alert@nafdac.gov.ng',
    ],
  },
  {
    id: 'dermazin-cream-mv5093',
    alertNo: '05/2026',
    title: 'Alert on the Mop-up of Counterfeit Dermazin (1% Silver Sulphadiazine) Cream',
    noticeUrl: 'https://nafdac.gov.ng/public-alert-no-05-2026-alert-on-the-mop-up-of-counterfeit-dermazin-1-silver-sulphadiazine-cream/',
    confirmedOn: '06 Feb 2026',
    confirmedIso: '2026-02-06',
    product: 'Dermazin (1% Silver Sulphadiazine) Cream',
    brand: 'Taylek Drugs',
    category: 'medicine',
    cover: { src: dermazinCounterfeit, caption: 'Counterfeit Dermazin Cream', focus: '25% 50%' },
    photos: [],
    background: [
      'The National Agency for Food and Drug Administration and Control (NAFDAC) is alerting healthcare providers and the public about the circulation of counterfeit Dermazin (1% Silver Sulphadiazine) Cream.',
      'NAFDAC received a complaint from the legitimate Marketing Authorization Holder, Taylek Drugs Company Limited, concerning the sale of this counterfeit product. The packaging of the falsified Dermazin Cream falsely claims that it is produced by Taylek Drugs Company Limited.',
    ],
    comparison: [
      {
        aspect: 'Batch number',
        genuine: 'PF6565',
        fake: 'MV5093',
      },
      {
        aspect: 'Manufacturing / expiry date',
        genuine: '11/2024 · 10/2027',
        fake: '05/2024 · 05/2027',
      },
      {
        aspect: 'Product photo',
        genuine: 'Original',
        fake: 'Counterfeit. Font Style is different from the original. The counterfeit shows a Bolder font stating DERMAZIN. The colours on the packaging are faded when compared to the original.',
        genuinePhotos: [{ src: dermazinOriginal, caption: 'Original Dermazin Cream' }],
        fakePhotos: [{ src: dermazinCounterfeit, caption: 'Counterfeit Dermazin Cream' }],
      },
    ],
    batches: [
      { product: 'Dermazin (1% Silver Sulphadiazine) Cream (counterfeit)', manufacturer: 'Salutas Pharma GmbH, 39171 Osterweddingen, Germany', batch: 'MV5093', mfg: '05/2024', exp: '05/2027' },
    ],
    risk:
      'The illegal marketing of medicinal products and counterfeit medicines is a significant health risk as it fails to ensure the safety, quality, and efficacy of these items, violating regulatory standards.',
    advice: [
      'Distributors, retailers, healthcare professionals, and caregivers are hereby advised to exercise caution and vigilance within the supply chain to avoid the distribution, sale, and use of counterfeit products. All medical products must be purchased from authorized or licensed suppliers. The products’ authenticity and physical condition should be carefully checked.',
      reportSuspicion,
    ],
  },
  {
    id: 'tavanic-500mg-4mw4c',
    alertNo: '01/2026',
    title: 'Sale of Falsified TAVANIC® 500mg Tablet in Nigeria',
    noticeUrl: 'https://nafdac.gov.ng/public-alert-no-01-2026-sale-of-falsified-tavanic-500mg-tablet-in-nigeria/',
    confirmedOn: '08 Jan 2026',
    confirmedIso: '2026-01-08',
    product: 'Tavanic® 500mg Tablet',
    brand: 'Sanofi',
    category: 'medicine',
    cover: { src: tavFalsifiedBatch, caption: 'Falsified Tavanic® 500mg carton, batch 4MW4C', focus: '50% 28%' },
    photos: [],
    background: [
      'NAFDAC received a report concerning suspected falsification of Tavanic® 500mg tablet labelled with batch 4MW4C (Manufacturing Date: 05/2024, Expiry date: 04/2027). Following a stakeholder engagement and preliminary investigations, samples of the suspected product were submitted to NAFDAC for assessment, with an additional sample forwarded to the manufacturer’s anti-counterfeiting laboratory for further analysis.',
      'Findings from the investigation revealed that the affected packs did not originate from the authorised supply chain. The falsified products were traced to purchases from the open drug market, Idumota, Lagos.',
    ],
    findings: {
      intro: 'Detailed examination of the suspect packs showed deliberate misrepresentation of the product identity, including relabelling and packaging inconsistencies:',
      items: [
        'The outer carton information falsely bears details consistent with a genuine batch (Batch No. 4MW4C, Manufacturing Date: 05/2024, Expiry date: 04/2027).',
        'The inner blister packs carry these details as removable stickers, with evidence of erasure of original batch information, indicating deliberate relabelling of an older (expired) product.',
        'Significant discrepancies were observed in the Mobile Authentication Service (MAS) label and print quality when compared with genuine retained samples.',
        'The MAS label on the falsified product (Mpdigree) differs from that of the genuine product (Sproxil)and does not correspond to the authorised distributor in Nigeria.',
      ],
    },
    comparison: [
      {
        aspect: 'Batch Number print quality',
        genuine: 'Uniform, high-quality printing',
        fake: 'Inconsistent print quality',
        genuinePhotos: [
          { src: tavGenuineBatch, caption: 'Genuine: carton batch print' },
          { src: tavGenuineCloseup, caption: 'Genuine: batch number close-up' },
        ],
        fakePhotos: [
          { src: tavFalsifiedBatch, caption: 'Falsified: carton batch print' },
          { src: tavFalsifiedCloseup, caption: 'Falsified: batch number close-up' },
        ],
      },
      {
        aspect: 'Inner Blister Pack Information',
        genuine: 'Batch number, manufacturing, and expiry date printed directly on blister – not peelable',
        fake: 'Batch number, manufacturing, and expiry date affixed as removable stickers',
        genuinePhotos: [{ src: tavGenuineBlister, caption: 'Genuine: blister' }],
        fakePhotos: [{ src: tavFalsifiedBlister, caption: 'Falsified: blister' }],
      },
      {
        aspect: 'Batch',
        genuine: 'Consistent with the declared batch',
        fake: 'Traced to an older expired batch (2PK3C, Expiry date: July 2025)',
        genuinePhotos: [{ src: tavGenuineRecord, caption: 'Genuine: declared batch' }],
        fakePhotos: [{ src: tavFalsifiedOlder, caption: 'Falsified: older expired batch' }],
      },
      {
        aspect: 'MAS Label (Mobile Authentication Service)',
        genuine: 'Reflects authorised distributor (Assene Laborex)',
        fake: 'MAS label text differs and does not correspond to authorised distributor',
        genuinePhotos: [
          { src: tavGenuineMas, caption: 'Genuine: MAS label' },
          { src: tavGenuineMas2, caption: 'Genuine: MAS label' },
          { src: tavGenuineMas3, caption: 'Genuine: MAS label' },
        ],
        fakePhotos: [
          { src: tavFalsifiedMas, caption: 'Falsified: MAS label' },
          { src: tavFalsifiedMas2, caption: 'Falsified: MAS label' },
          { src: tavFalsifiedMas3, caption: 'Falsified: MAS label' },
        ],
      },
    ],
    batches: [{ product: 'Tavanic® 500mg', manufacturer: 'Sanofi (stated)', batch: '4MW4C', mfg: '05/2024', exp: '04/2027' }],
    batchNotes: ['Source: Open market (unauthorised supply chain)'],
    risk:
      'Falsified medicines pose serious risks to public health. Such products may be ineffective, expired, or contain incorrect or substandard ingredients, potentially leading to treatment failure, adverse reactions, and increased risk of antimicrobial resistance.',
    advice: [
      'NAFDAC wishes to emphasize that genuine Tavanic® 500mg tablets supplied through the authorised distribution channel remain safe, effective, and of assured quality.',
      'Healthcare professionals and members of the public are advised to be vigilant and inspect medicines carefully before use.',
      'Any suspected falsified Tavanic® 500mg tablets should be reported immediately to the nearest NAFDAC Office.',
      'Medicines should be purchased only from licensed pharmacies and authorised distributors. In Nigeria, Assene Laborex Limited is the authorised distributor of Sanofi products, including Tavanic® 500mg.',
    ],
  },
]

// Only alerts whose NAFDAC notice includes a product photo are shown on the site.
// The others (Augmentin, Cerelac, PHESGO, Avastin K1830T71/H0375B01, Dostinex) stay above for when photos are available.
const shown = counterfeits.filter((c) => c.cover)

/** Newest first */
export const sortedCounterfeits = [...shown].sort((a, b) => b.confirmedIso.localeCompare(a.confirmedIso))

export const findCounterfeit = (id: string) => shown.find((c) => c.id === id)

/** Featured on the Alerts hero: the newest alert */
export const featuredCounterfeit = sortedCounterfeits[0]
