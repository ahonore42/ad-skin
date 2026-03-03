/**
 * Ad Content Module
 * Provides sample advertisement content to map onto 3D surfaces
 */

/**
 * Fisher-Yates shuffle algorithm
 * Shuffles array in place
 */
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Ad content with associated emojis - structured as objects
export const adContent = [
  { text: "Buy Now - Limited Offer!", emoji: "🛍️" },
  { text: "Your Data, Our Insights", emoji: "📊" },
  { text: "Sunk Cost Funnel™", emoji: "🛒" },
  { text: "Targeted Just for You", emoji: "🎯" },
  { text: "Privacy Policy? No Problem", emoji: "📟" },
  { text: "Click Here for Happiness", emoji: "🎰" },
  { text: "You Need This Product", emoji: "💝" },
  { text: "Surveillance Capitalism", emoji: "📲" },
  { text: "Digital Identity for Sale", emoji: "👤" },
  { text: "Authentic Self™ Available", emoji: "✨" },
  { text: "Personal Data Harvesting", emoji: "📈" },
  { text: "Cookie Consent Bypass", emoji: "💽" },
  { text: "Algorithmic Manipulation", emoji: "⚙️" },
  { text: "Behavioral Modification", emoji: "🧠" },
  { text: "Attention Economy Services", emoji: "📺" },
  { text: "We Know What You Want", emoji: "🔮" },
  { text: "Instant Gratification Here", emoji: "🔋" },
  { text: "Persistent Tracking Services", emoji: "📍" },
  { text: "Monetize Your Emotions", emoji: "❤️" },
  { text: "Free* (*Terms Apply)", emoji: "🎁" },
  { text: "Personalized Exploitation", emoji: "👤" },
  { text: "Dopamine Directive", emoji: "📲" },
  { text: "Information Brokerage", emoji: "🔐" },
  { text: "Reward Schedule Engineering", emoji: "🎮" },
  { text: "Conversion Pipeline™", emoji: "💸" },
  { text: "Ghost Profiles Included", emoji: "💽" },
  { text: "Biometric Data Mining", emoji: "🫀" },
  { text: "Psychological Targeting", emoji: "🧩" },
  { text: "Digital Twin Available", emoji: "👥" },
  { text: "Metadata Gold Mine", emoji: "🎯" },
  { text: "Predictive Analytics", emoji: "🔮" },
  { text: "Sentiment Analysis Pro", emoji: "🎭" },
  { text: "Location Always Tracked", emoji: "🌍" },
  { text: "Micro-Transaction Heaven", emoji: "💰" },
  { text: "Permanent Subscription", emoji: "♾️" },
  { text: "Social Credit Score", emoji: "⭐" },
  { text: "Neural Pattern Match", emoji: "🧠" },
  { text: "Behavioral Surplus™", emoji: "💹" },
  { text: "Engagement Maximizer", emoji: "🎰" },
  { text: "Enjoy Yourself™", emoji: "😃" },
  { text: "Dark Pattern Interface", emoji: "🔓" },
  { text: "Surveillance as Service", emoji: "📹" },
  { text: "Human Futures Market", emoji: "📉" },
  { text: "Weaponized Persuasion", emoji: "🎪" },
  { text: "Digital Panopticon™", emoji: "🏛️" },
  // Corporate Jargon NLP
  { text: "Synergize Your Pain Points!", emoji: "💥" },
  { text: "Leverage Core Competencies®", emoji: "💼" },
  { text: "Behavioral Throughput Gains", emoji: "⚙️" },
  { text: "Deep Dive Into Value", emoji: "🏊" },
  { text: "Move the Needle Forward!", emoji: "📊" },
  { text: "Think Outside the Box™", emoji: "📦" },
  { text: "Consent Framework Upgrade", emoji: "🕹️" },
  { text: "Low-Hanging Fruit Available", emoji: "🍎" },
  { text: "Paradigm Shift® Available", emoji: "🌀" },
  { text: "Best Practices* for You", emoji: "✨" },
  { text: "Value-Added Solutions™", emoji: "➕" },
  { text: "Reciprocal Obligation Model", emoji: "♻️" },
  { text: "Ownership Integration!", emoji: "🏢" },
  { text: "Automated Decision Support", emoji: "🎛️" },
  { text: "Align to Our Vision™", emoji: "👁️" },
  { text: "Unpack the Opportunity!", emoji: "📦" },
  { text: "Drive Meaningful Impact®", emoji: "🌟" },
  { text: "Cognitive Load Management", emoji: "🎚️" },
  { text: "Strategic Alignment", emoji: "🧭" },
  { text: "Scale Your Portfolio!", emoji: "📈" },
  { text: "Choice Architecture System™", emoji: "🏗️" },
  { text: "Data-Driven Decisions", emoji: "📉" },
  { text: "Streamlined Compliance", emoji: "🧠" },
  { text: "Synergistic Simulacra®", emoji: "🔗" },
  { text: "Disrupt Your Limits™", emoji: "🏭" },
  { text: "Preference Optimization™", emoji: "🎛️" },
  { text: "Stakeholder Engagement®", emoji: "🏦" },
  { text: "Metrics That Matter Most", emoji: "💵" },
  { text: "Conversion Optimization!", emoji: "🔀" },
  { text: "Agile Methodology", emoji: "⚡" },
  { text: "Perpetual Access Model*", emoji: "🔑" },
  { text: "AI-Powered Insights", emoji: "🧠" },
  { text: "Distributed Ledger Trust", emoji: "⛓️" },
  { text: "Digital Asset Oversight™", emoji: "🏦" },
  { text: "Obedience Pipeline Solutions", emoji: "🏭" },
  { text: "Customer-Centric Success", emoji: "🎯" },
  { text: "Vertical Integration™", emoji: "🌐" },
  { text: "Frictionless Experience®", emoji: "🎬" },
  { text: "Total Engagement Platform!", emoji: "🌐" },
  { text: "Bleeding-Edge Extraction™", emoji: "🔪" },
  { text: "Exotic Arbitrage Inc.", emoji: "🎱" },
  { text: "Thought Leadership!", emoji: "🏦" },
  { text: "Behavioral Economics Suite™", emoji: "📚" },
  { text: "Mission-Critical Success", emoji: "🎰" },
  { text: "Closed Ecosystem Benefits®", emoji: "🏰" },
  { text: "Seamless Connectivity!", emoji: "🔗" },
  { text: "User Retention Framework™", emoji: "🔒" },
  { text: "Compliance Automation", emoji: "💳" },
  // Self-Improvement NLP
  { text: "Be Your Best Self™", emoji: "🏭" },
  { text: "Unlock Your Potential!", emoji: "🔓" },
  { text: "Live Your Truth", emoji: "📺" },
  { text: "Own Your Journey*", emoji: "📱" },
  { text: "Manifest Abundance!", emoji: "🪄" },
  { text: "Discover Your Worth®", emoji: "💳" },
  { text: "Hyperreal Estate", emoji: "🏡" },
  { text: "Invest In Your Future™", emoji: "💰" },
  { text: "Growth Mindset® Unlocked", emoji: "🧩" },
  { text: "Neoliberal Financialization", emoji: "💵" },
  { text: "Transform Your Life", emoji: "♻️" },
  { text: "Elevate Your Value™", emoji: "📈" },
  // Pharmaceutical & Supplement NLP
  { text: "Baseline Correction System", emoji: "⚖️" },
  { text: "Micronutrient Intervention", emoji: "🌿" },
  { text: "Chemistry Rebalancing®", emoji: "⚗️" },
  { text: "Prescription Lifestyle℞", emoji: "💊" },
  { text: "Deficiency Remediation", emoji: "🩺" },
  { text: "Chronic Treatment Plans*", emoji: "📋" },
  { text: "Enhanced Biomarkers†", emoji: "🔬" },
  { text: "Clinical Intervention", emoji: "🏥" },
  { text: "Pharmaceutical Grade Self", emoji: "💉" },
  { text: "Dosage Optimization℞", emoji: "🧪" },
  { text: "Preventative Capsules", emoji: "💊" },
  { text: "Proprietary Blend", emoji: "⚕️" },
];

// Color schemes for different ad types - enhanced for maximum text visibility
export const adColors = [
  { bg: "#ff4757", text: "#ffffff" }, // Red with white
  { bg: "#2f3542", text: "#00ff00" }, // Dark with bright green
  { bg: "#5352ed", text: "#ffff00" }, // Blue with bright yellow
  { bg: "#ff6b35", text: "#000000" }, // Orange with black
  { bg: "#00d2d3", text: "#ff0000" }, // Cyan with red
  { bg: "#ff9ff3", text: "#000000" }, // Pink with black
  { bg: "#54a0ff", text: "#ffff00" }, // Light Blue with yellow
  { bg: "#5f27cd", text: "#00ff00" }, // Purple with green
  { bg: "#ff3838", text: "#ffffff" }, // Bright Red with white
  { bg: "#1e272e", text: "#00ffff" }, // Darker Gray with cyan
  { bg: "#3742fa", text: "#ffff00" }, // Royal Blue with yellow
  { bg: "#ff9500", text: "#000000" }, // Amber with black
  { bg: "#2bcbba", text: "#ff0066" }, // Teal with hot pink
  { bg: "#ee5a6f", text: "#ffffff" }, // Rose with white
  { bg: "#0073e6", text: "#ffff00" }, // Classic Blue with yellow
  { bg: "#8b13d9", text: "#00ff00" }, // Violet with green
  { bg: "#c44569", text: "#ffffff" }, // Magenta with white
  { bg: "#40407a", text: "#00ffff" }, // Navy with cyan
  { bg: "#006266", text: "#ffff00" }, // Dark Teal with yellow
  { bg: "#f53b57", text: "#ffffff" }, // Coral with white
  { bg: "#3c40c6", text: "#00ff00" }, // Indigo with green
  { bg: "#05c46b", text: "#ffffff" }, // Green with white
  { bg: "#ffc048", text: "#000000" }, // Yellow with black
  { bg: "#ff5722", text: "#00ffff" }, // Deep Orange with cyan
];

// Source URLs from the critical theory library (lib/sources.ts)
export const adUrls = [
  "https://dn720006.ca.archive.org/0/items/baudrillard.-1970.-the-consumer-society/Baudrillard.1981.Simulacra-and-Simulation.pdf",
  "https://monoskop.org/images/2/28/Baudrillard_Jean_The_system_of_objects_1996.pdf",
  "https://monoskop.org/images/d/de/Baudrillard_Jean_The_consumer_society_myths_and_structures_1970.pdf",
  "https://ia802302.us.archive.org/8/items/Baudrillard/Baudrillard.1976.Symbolic-Exchange-And-Death-Revised-Edition.pdf",
  "https://monoskop.org/images/0/07/Foster_Hal_ed_The_Anti-Aesthetic_Essays_on_Postmodern_Culture.pdf",
  "https://www.marxists.info/ebooks/marcuse/one-dimensional-man.pdf",
  "https://ia803407.us.archive.org/32/items/eros-and-civilization-a-philosophical-inquiry-into-freud-pdfdrive/Eros%20and%20Civilization%20_%20A%20Philosophical%20Inquiry%20into%20Freud%20%28%20PDFDrive%20%29.pdf",
  "http://www.marginalutility.org/wp-content/uploads/2011/10/aesthetic-dimension-_-marcuse.pdf",
  "https://monoskop.org/images/2/27/Marcuse_Herbert_Essay_on_Liberation.pdf",
  "https://monoskop.org/images/5/57/Marcuse_Herbert_Negations_Essays_in_Critical_Theory_2009.pdf",
  "https://theanarchistlibrary.org/library/david-graeber-bullshit-jobs",
  "https://files.libcom.org/files/David_Graeber-The_Utopia_of_Rules_On_Technology_St.pdf",
  "https://files.libcom.org/files/__Debt__The_First_5_000_Years.pdf",
  "https://docdrop.org/download_annotation_doc/The-Dawn-of-Everything-by-David-Graeber-David-Wengrow-z-lib.-zmbbo.pdf",
  "https://theanarchistlibrary.org/mirror/d/dg/david-graeber-direct-action.pdf",
  "https://ia802306.us.archive.org/16/items/bernays-edward-l.-propaganda-1928-1936_202107/Bernays%2C%20Edward%20L.%20-%20Propaganda%20%5B1928%5D%5B1936%5D.pdf",
  "https://www.agathonlibrary.com/wp-content/uploads/2024/07/Bernays-Edward-L.-Crystallizing-Public-Opinion-by-Edward-L.-Bernays-Gutenberg.org_.pdf",
  "https://dn720003.ca.archive.org/0/items/edward-bernays-texts/Bernays%2C%20Edward%20L._%20Cutler%2C%20Howard%20W.%20-%20The%20engineering%20of%20consent-Univ.%20of%20Oklahoma%20Press%20%281969%29_text.pdf",
  "https://files.libcom.org/files/1984.pdf",
  "https://files.libcom.org/files/animal_farm.pdf",
  "http://public-library.uk/ebooks/72/30.pdf",
  "https://files.libcom.org/files/wiganpier.pdf",
  "https://files.libcom.org/files/Homage%20to%20Catalonia%20-%20George%20Orwell.pdf",
  "https://cdn.oujdalibrary.com/books/43/43-the-sublime-object-of-ideology-second-edition-the-essential-zizek-(www.tawcer.com).pdf",
  "https://ia800106.us.archive.org/5/items/slavoj-zizek-pdf-archive/Slavoj%20Z%CC%8Ciz%CC%8Cek%20PDF%20Library%20%281989%20-%202023%29/2002%2C%20Welcome%20to%20the%20Desert%20of%20the%20Real.pdf",
  "https://dn721903.ca.archive.org/0/items/slavoj-zizek-pdf-archive/Slavoj%20Z%CC%8Ciz%CC%8Cek%20PDF%20Library%20%281989%20-%202023%29/2009%20-%20First%20as%20Tragedy%2C%20Then%20as%20Farce.pdf",
  "https://dn721903.ca.archive.org/0/items/slavoj-zizek-pdf-archive/Slavoj%20Z%CC%8Ciz%CC%8Cek%20PDF%20Library%20%281989%20-%202023%29/2008%20-%20Violence.pdf",
  "https://dn721903.ca.archive.org/0/items/slavoj-zizek-pdf-archive/Slavoj%20Z%CC%8Ciz%CC%8Cek%20PDF%20Library%20%281989%20-%202023%29/2010%2C%20Living%20in%20the%20End%20Times.pdf",
  "https://wappiepraat.com/wp-content/uploads/2023/01/blackmail-vol-1-by-whitney-webb.pdf",
  "https://dn710003.ca.archive.org/0/items/whitney-alyse-webb-one-nation-under-blackmail-vol.-2-trine-day-2022/Whitney%20Alyse%20Webb%20-%20One%20Nation%20Under%20Blackmail%20%E2%80%93%20Vol.%202-Trine%20Day%20%282022%29.pdf",
  "https://ia600701.us.archive.org/3/items/zuboff-shoshana.-the-age-of-surveillance-capitalism.-2019/Zuboff%2C%20Shoshana.The%20Age%20of%20Surveillance%20Capitalism.2019.pdf",
  "https://files.libcom.org/files/The%20Society%20of%20the%20Spectacle%20Annotated%20Edition.pdf",
  "https://files.libcom.org/files/Comments%20on%20the%20Society%20of%20the%20Spectacle.pdf",
  "https://monoskop.org/images/4/43/Foucault_Michel_Discipline_and_Punish_The_Birth_of_the_Prison_1977_1995.pdf",
  "https://pdfs.semanticscholar.org/22da/ea904df1fbb0dce89277d843e49e6e837fd7.pdf",
  "https://mirror.explodie.org/Foucault-Security-Territory-Population.pdf",
  "https://monoskop.org/images/4/40/Foucault_Michel_The_History_of_Sexuality_1_An_Introduction.pdf",
  "https://dn790007.ca.archive.org/0/items/the-anarchist-library-full-list-of-pdfs-nov-2020/gilles-deleuze-postscript-on-the-societies-of-control.pdf",
  "https://files.libcom.org/files/Anti-Oedipus.pdf",
  "https://sisu.ut.ee/wp-content/uploads/sites/204/max_horkheimer_theodor_adorno_gunzelin_noeri_eb-ok.org_.pdf",
  "https://irp.cdn-website.com/e401e78b/files/uploaded/adorno_culture_industry.pdf",
  "https://web.mit.edu/allanmc/www/benjamin.pdf",
  "https://dn710206.ca.archive.org/0/items/zines-misc/Theses_on_the_Philosophy_of_History.pdf",
  "https://robynbacken.com/text/nw_research.pdf",
  "https://www.marxists.org/archive/marx/works/download/pdf/Capital-Volume-I.pdf",
  "https://www.marxists.org/archive/marx/works/download/pdf/Capital-Volume-II.pdf",
  "https://www.marxists.org/archive/marx/works/download/pdf/Capital-Volume-III.pdf",
  "https://www.are.na/block/6062444",
  "https://dn720006.ca.archive.org/0/items/psychopolitics-neoliberalism-and-technologies-of-power-by-byung-chul-han-2017/Psychopolitics%EF%BC%9A%20Neoliberalism%20And%20Technologies%20Of%20Power%20by%20Byung%20Chul%20Han%20%282017%29.pdf",
  "https://dn721903.ca.archive.org/0/items/byung-chul-han-the-burnout-society-2015-stanford-briefs-libgen.lc/Byung-Chul%20Han%20-%20The%20Burnout%20Society%20%282015%2C%20Stanford%20Briefs%29%20-%20libgen.lc.pdf",
  "https://dn721802.ca.archive.org/0/items/fp_Naomi_Klein-The_Shock_Doctrine/Naomi_Klein-The_Shock_Doctrine.pdf",
  "https://files.libcom.org/files/No%20Logo%20-%20Klein,%20Naomi.pdf",
  "https://files.libcom.org/files/[Mark_Fisher]_Capitalist_Realism_Is_There_no_Alte(BookZZ.org).pdf",
  "https://ia600308.us.archive.org/20/items/cyclonopedia-negarestani-reza/The%20Weird%20and%20the%20Eerie%20-%20Mark%20Fisher.pdf",
  "https://monoskop.org/images/a/aa/Berardi_Franco_Bifo_The_Soul_at_Work_From_Alienation_to_Autonomy_2009.pdf",
  "https://files.libcom.org/files/AfterFuture.pdf",
  "https://files.libcom.org/files/Gramsci%20-%20Selections%20from%20the%20Prison%20Notebooks.pdf",
  "https://syllabus.pirate.care/library/Jodi%20Dean/Democracy%20and%20Other%20Neoliberal%20Fantasies_%20Communicative%20Capitalism%20&%20Left%20Politics%20(390)/Democracy%20and%20Other%20Neoliberal%20Fantasies_%20-%20Jodi%20Dean.pdf",
  "https://ia600204.us.archive.org/22/items/politicsDEEPWEB/The%20Communist%20Horizon%20-%20Jodi%20Dean.pdf",
  "https://ia801705.us.archive.org/4/items/Various_PDFs/NeilPostman-AmusingOurselvesToDeath.pdf",
  "https://ia601802.us.archive.org/27/items/235p-technopoly-neil-postman/235p%20technopoly-neil-postman.pdf",
  "https://epdf.pub/the-electronic-eye-the-rise-of-surveillance-society.html",
  "https://infodocks.wordpress.com/wp-content/uploads/2015/01/david_lyon_surveillance_as_social_sorting.pdf",
  "https://ia903203.us.archive.org/35/items/DarkMatters/Dark%20Matters_%20On%20the%20Surveillance%20of%20Black%20-%20Simone%20Browne.pdf",
  "https://ia800603.us.archive.org/12/items/fflch-livro-weapons-of-math-destruction-cathy-240826-220339/(FFLCH)%20LIVRO%20Weapons%20of%20Math%20Destruction%20-%20Cathy%20_240826_220339.pdf",
  "https://ratical.org/PandemicParallaxView/TheImagePseudoEventsInAmerica1961.pdf",
  "https://ia601604.us.archive.org/17/items/laibach-neue-slowenische-kunst/georg-wilhelm-friedrich-hegel-the-phenomenology-of-spirit-translated-by-peter-fuss-and-john-dobbins%20%282%29.pdf",
  "https://historyofeconomicthought.mcmaster.ca/hegel/right.pdf",
  "https://monoskop.org/images/0/05/Hegel_GWF_Aesthetics_Lectures_on_Fine_Art_Vol_1_1975.pdf",
  "https://ia800504.us.archive.org/35/items/24299993-thoreau-walden/24299993-Thoreau-Walden.pdf",
  "https://ia803208.us.archive.org/8/items/civil-disobedience/civil-disobedience.pdf",
  "https://edwardcurtin.com/wp-content/uploads/2025/11/LifeWithoutPrinciple_HDThoreau1863.pdf",
  "https://jpellegrino.com/teaching/ENGL2112/2112%20texts/001%20-%20Voltaire%20-%20Candide.pdf",
  "https://epub.us/wp-content/books/philosophical-dictionary-by-voltaire.pdf",
  "https://cdn.preterhuman.net/texts/thought_and_writing/philosophy/Voltaire/Voltaire%20-%20Letters%20on%20England.pdf",
  "https://www.docdroid.net/ntVn8e6/lacan-j-2005-ecrits-pdf",
  "https://www.docdroid.net/sBWNGMh/four-fundamentals-pdf",
  "https://emersoncentral.com/ebook/Self-Reliance.pdf",
  "https://emersoncentral.com/ebook/The-American-Scholar.pdf",
  "https://emersoncentral.com/ebook/Nature.pdf",
  "https://ia802303.us.archive.org/30/items/common-sense-thomas-paine-1776/Common%20Sense%20Thomas%20Paine%20%281776%29.pdf",
  "https://pinkmonkey.com/dl/library1/right.pdf",
  "https://thomaspainememorial.org/wp-content/uploads/simple-file-list/Thomas-Paine-Library/Works-by-Thomas-Paine/AGEofREA.pdf",
  "https://www.gutenberg.org/files/608/608-h/608-h.htm",
  "https://ia800509.us.archive.org/31/items/ParadiseLostByJohnMilton_201607/Paradise%20Lost%20by%20John%20%20Milton.pdf",
  "https://www.holybooks.com/wp-content/uploads/Dante-Alighieri-The-Divine-Comedy.pdf",
  "https://www.gutenberg.org/files/33896/33896-h/33896-h.htm",
  "https://www.gutenberg.org/cache/epub/1497/pg1497-images.html",
  "https://www.platonicfoundation.org/media/2025/11/phaedrus-david-horan-translation-7-nov-25.pdf",
  "https://www.gutenberg.org/files/1672/1672-h/1672-h.htm",
  "https://ia601907.us.archive.org/21/items/nietzsche-on-the-genealogy-of-morality/Nietzsche%20-%20On%20the%20Genealogy%20of%20Morality.pdf",
  "https://ia601400.us.archive.org/3/items/nietzsche-beyond-good-evil-penguin/Nietzsche%20-%20Beyond%20Good%20%26%20Evil%20%5BPenguin%5D.pdf",
  "https://www.holybooks.com/wp-content/uploads/The-Gay-Science-by-Friedrich-Nietzsche.pdf",
  "https://dn790002.ca.archive.org/0/items/thus_spoke_zarathustra/thus_spoke_zarathustra.pdf",
  "https://www.gutenberg.org/files/52263/52263-h/52263-h.htm",
  "https://gutenberg.org/cache/epub/600/pg600-images.html",
  "https://www.gutenberg.org/cache/epub/2554/pg2554-images.html",
  "https://www.gutenberg.org/files/28054/old/28054-pdf.pdf",
  "https://thephilosopher.net/dostoevskiyfyodor/wp-content/uploads/sites/304/2025/01/The-Possessed-The-Devils-Demons-By-Fyodor-Dostoevsky.pdf",
  "https://www.huxley.net/bnw.pdf",
  "https://www.huxley.net/bnw-revisited.pdf",
  "https://www.huxley.net/doors-of-perception/aldoushuxley-thedoorsofperception.pdf",
  "https://huxleyarchive.org/Non-fiction/BOOKS/Ends%20and%20Means.pdf",
];

// Shuffle all three arrays once when module loads
shuffleArray(adContent);
shuffleArray(adColors);
shuffleArray(adUrls);
