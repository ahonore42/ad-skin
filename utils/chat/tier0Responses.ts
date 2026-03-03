// utils/chat/tier0Responses.ts

export interface Tier0Response {
  pattern: string | RegExp;
  response: string;
  category: string;
  depth: "surface" | "medium" | "deep";
  keywords?: string[];
  relatedConcepts?: string[];
}

export const tier0Responses: Tier0Response[] = [
  // =====================================================
  // TOPIC TREE 1: PROJECT BASICS
  // =====================================================

  {
    pattern: /^(what is this|what is ad skin|what am i looking at)/i,
    response:
      "Ad Skin maps 108 manipulative advertisement phrases as literal texture onto Michelangelo's David head. Advertising and human identity occupy the same surface without distinction.",
    category: "basics",
    depth: "surface",
    keywords: ["what is", "ad skin"],
    relatedConcepts: ["simulacra", "spectacle", "identity"],
  },
  {
    pattern: /^(how many|how many ads|number of ads)/i,
    response:
      "108 phrases rotate continuously across the surface. The specific number matters less than the totality. Complete saturation leaves no surface unmarked by commodification.",
    category: "basics",
    depth: "surface",
    keywords: ["how many", "number"],
    relatedConcepts: ["totality", "saturation"],
  },
  {
    pattern: /^(why david|why michelangelo)/i,
    response:
      "David has historically represented the humanist ideal of individual autonomy and dignity. Here that figure serves as surface for advertising. A canonical Renaissance sculpture and commodity appeals occupy identical visual space. When art and what it once opposed share the same position, the function of each undergoes transformation.",
    category: "basics",
    depth: "medium",
    keywords: ["david", "michelangelo"],
    relatedConcepts: ["repressive desublimation", "culture industry"],
  },
  {
    pattern: /^(what.*purpose|what.*point|why.*made)/i,
    response:
      "The work positions advertising where it cannot be ignored. What normally remains ambient becomes impossible to look away from. Defamiliarization takes what has been naturalized and renders it strange.",
    category: "basics",
    depth: "medium",
    keywords: ["purpose", "point", "why"],
    relatedConcepts: ["alienation effect", "ideology"],
  },
  {
    pattern: /(can i interact|interact with|interaction)/i,
    response:
      "Yes, drag to rotate, scroll to zoom, click ads. The interface invites manipulation while the content critiques manipulation. What appears as neutral interaction positions the viewer within consumer frameworks. The mechanics of engagement reproduce what they examine.",
    category: "basics",
    depth: "surface",
    keywords: ["interact", "interaction"],
    relatedConcepts: ["subject position", "user"],
  },

  // =====================================================
  // TOPIC TREE 2: SIMULACRA & REPRESENTATION
  // =====================================================

  {
    pattern: /what.*simulacra/i,
    response:
      "Simulacra are copies without originals. Four stages mark the progression. First the image reflects reality, then masks reality, then masks the absence of reality. Finally pure simulation bears no relation to reality at all. Nothing external gets represented. The simulation constitutes reality rather than referring to it.",
    category: "simulacra",
    depth: "deep",
    keywords: ["simulacra", "simulation"],
    relatedConcepts: ["hyperreality", "representation"],
  },
  {
    pattern: /(hyperreal|more real than real)/i,
    response:
      "Hyperreality describes conditions where simulation precedes and determines reality. The map comes before the territory. Advertisements don't reflect pre-existing desires but generate the desires they claim to satisfy. The image of need proves more powerful than any actual lack. What gets called authentic exists only as effect of its simulation.",
    category: "simulacra",
    depth: "deep",
    keywords: ["hyperreal", "hyperreality"],
    relatedConcepts: ["simulacra", "precession"],
  },
  {
    pattern: /the map.*territory/i,
    response:
      "Traditionally the territory exists first and the map represents it. In simulation this order reverses. The map precedes the territory. Brand identities precede any supposedly authentic self. Identity doesn't get represented by advertising. Identity gets produced through advertising frameworks that were in place before the subject arrived.",
    category: "simulacra",
    depth: "deep",
    keywords: ["map", "territory"],
    relatedConcepts: ["precession", "simulacra"],
  },

  // =====================================================
  // TOPIC TREE 3: SPECTACLE & MEDIATION
  // =====================================================

  {
    pattern: /what.*spectacle/i,
    response:
      "The spectacle is not a collection of images but a social relation among people mediated entirely by images. Human relations exist as substrate for image circulation rather than prior to it. Subjects encounter each other through representations rather than unmediated presence. Social life and its image operate as the same thing.",
    category: "spectacle",
    depth: "medium",
    keywords: ["spectacle"],
    relatedConcepts: ["mediation", "social relations", "separation"],
  },
  {
    pattern: /(mediation|mediated)/i,
    response:
      "Mediation occurs when direct experience gets replaced by its representation. At a certain threshold the distinction collapses. Images don't depict social relations but constitute the medium through which social relations occur. Experience and representation fold into each other until separation loses conceptual stability.",
    category: "spectacle",
    depth: "medium",
    keywords: ["mediation", "mediated"],
    relatedConcepts: ["spectacle", "representation"],
  },
  {
    pattern: /separation/i,
    response:
      "The spectacle operates through separation where lived experience gets split from its representation. The split reaches such completion that no position exists outside it for comparison. What appears as authentic operates within spectacular logic. The ads occupy total surface without remainder.",
    category: "spectacle",
    depth: "deep",
    keywords: ["separation"],
    relatedConcepts: ["spectacle", "alienation"],
  },

  // =====================================================
  // TOPIC TREE 4: SURVEILLANCE & CONTROL
  // =====================================================

  {
    pattern: /what.*surveillance capitalism/i,
    response:
      "Surveillance capitalism treats human experience as raw material for behavioral data extraction. This data gets converted into prediction products sold to future behavior markets. The body operates as both subject and site of extraction. Experience functions as commodity input.",
    category: "surveillance",
    depth: "medium",
    keywords: ["surveillance capitalism"],
    relatedConcepts: ["behavioral surplus", "prediction products"],
  },
  {
    pattern: /behavioral surplus/i,
    response:
      "Behavioral surplus refers to human behavior harvested beyond what service improvement requires. Extraction, computation, sale. The system doesn't merely track existing behavior but manufactures future behavior. What subjects will want gets produced before subjects know they want it. Identity operates as prediction target rather than expression of interiority.",
    category: "surveillance",
    depth: "deep",
    keywords: ["behavioral surplus"],
    relatedConcepts: ["surveillance capitalism", "prediction"],
  },
  {
    pattern: /what.*panopticon/i,
    response:
      "The panopticon was a prison design where inmates never know when they're watched, leading them to internalize surveillance and police themselves. Power doesn't require constant external enforcement once subjects discipline themselves. Advertising operates through similar mechanisms. The gaze turns inward before it was ever truly external.",
    category: "surveillance",
    depth: "medium",
    keywords: ["panopticon"],
    relatedConcepts: ["internalized surveillance", "self-discipline"],
  },
  {
    pattern: /(societies of control|control societies)/i,
    response:
      "Societies of control represent a shift from disciplinary enclosure. Instead of institutions like schools, prisons, factories, we have continuous modulation. Subjects never get confined to discrete spaces but remain perpetually tracked, adjusted, nudged. Rotation never stops. Identity operates as continuous variation rather than fixed position.",
    category: "surveillance",
    depth: "deep",
    keywords: ["control societies", "societies of control"],
    relatedConcepts: ["modulation", "discipline"],
  },
  {
    pattern: /biopower/i,
    response:
      "Biopower describes how power operates at the level of populations and bodies rather than through laws and prohibitions. Life itself gets administered. Not just bodies but identities serve as sites of administration. The self exists where biological life meets economic extraction.",
    category: "surveillance",
    depth: "deep",
    keywords: ["biopower", "biopolitics"],
    relatedConcepts: ["population management", "life administration"],
  },
  {
    pattern: /(menticide|thought control)/i,
    response:
      "Menticide means murder of the mind through psychological coercion that destroys autonomous thinking. Not violent repression but gradual conditioning that makes resistance literally unthinkable. Each phrase performs micro-adjustment of what seems natural to think.",
    category: "surveillance",
    depth: "deep",
    keywords: ["menticide", "thought control"],
    relatedConcepts: ["psychological coercion", "conditioning"],
  },

  // =====================================================
  // TOPIC TREE 5: CONSUMER IDENTITY & FALSE NEEDS
  // =====================================================

  {
    pattern: /what.*consumerism/i,
    response:
      "Consumerism extends far beyond purchasing. Consumption operates as language through which social position gets communicated. Commodities and identity occupy the same visual space where the distinction between signifier and signified proves difficult to maintain.",
    category: "consumer",
    depth: "medium",
    keywords: ["consumerism"],
    relatedConcepts: ["sign value", "identity"],
  },
  {
    pattern: /false needs/i,
    response:
      "False needs get manufactured by social systems but appear to subjects as individual choices. They reinforce domination while seeming like expressions of freedom. Options present themselves while remaining structurally coercive. The menu was chosen in advance.",
    category: "consumer",
    depth: "medium",
    keywords: ["false needs"],
    relatedConcepts: ["true needs", "domination"],
  },
  {
    pattern: /repressive desublimation/i,
    response:
      "Repressive desublimation describes how advanced capitalism doesn't repress sexuality and pleasure but channels them into forms that reinforce domination. Subjects get told they're free to express themselves, but only through consumption and commodity relations. Liberation gets promised but delivered only through compliance and purchase. Freedom operates as just another product.",
    category: "consumer",
    depth: "deep",
    keywords: ["repressive desublimation"],
    relatedConcepts: ["false freedom", "liberation"],
  },
  {
    pattern: /(sign value|symbolic value)/i,
    response:
      "Sign value refers to what commodities signify socially, operating separately from use value or exchange value. A shoe's use value is walking. Its sign value is status, identity, belonging. Identity has no use value, only sign value. The subject is what it signifies to others.",
    category: "consumer",
    depth: "deep",
    keywords: ["sign value", "symbolic value"],
    relatedConcepts: ["use value", "exchange value"],
  },
  {
    pattern: /(amour.propre|social vanity)/i,
    response:
      "Amour-propre describes identity formed through comparison with others rather than through inner authenticity. Natural self-love gets corrupted by social competition and the need for recognition. Identity exists only as comparative surface, measured against other branded surfaces.",
    category: "consumer",
    depth: "deep",
    keywords: ["amour-propre", "social vanity"],
    relatedConcepts: ["comparison", "natural man"],
  },

  // =====================================================
  // TOPIC TREE 6: CULTURE INDUSTRY & STANDARDIZATION
  // =====================================================

  {
    pattern: /culture industry/i,
    response:
      "The culture industry produces standardized mass culture that appears diverse but follows identical patterns throughout. Pseudo-individuality masks structural sameness. The 108 ads vary in wording but perform identical functions in colonizing identity with commodification.",
    category: "culture",
    depth: "deep",
    keywords: ["culture industry"],
    relatedConcepts: ["standardization", "pseudo-individuality"],
  },
  {
    pattern: /standardization/i,
    response:
      "Standardization renders everything fundamentally identical while appearing different on the surface. Cultural products seem individual but follow templates. Different words, identical manipulation. Different brands, identical subject position.",
    category: "culture",
    depth: "medium",
    keywords: ["standardization"],
    relatedConcepts: ["culture industry", "sameness"],
  },
  {
    pattern: /(pseudo.individuality|false individuality)/i,
    response:
      "Pseudo-individuality creates the illusion of individual expression within standardized frameworks. Profiles can be customized in countless ways yet the necessity of having a profile cannot be questioned. Infinite surface variation within absolute structural sameness.",
    category: "culture",
    depth: "deep",
    keywords: ["pseudo-individuality"],
    relatedConcepts: ["standardization", "choice"],
  },

  // =====================================================
  // TOPIC TREE 7: MANIPULATION & PROPAGANDA
  // =====================================================

  {
    pattern: /how.*ads manipulate/i,
    response:
      "Ads manipulate by targeting unconscious desires and engineering consent to make domination seem natural. The phrases used here expose normally invisible manipulation by rendering it hypervisible on human form. Optimize Your Compliance. Behavioral Throughput Gains.",
    category: "manipulation",
    depth: "medium",
    keywords: ["manipulate", "manipulation"],
    relatedConcepts: ["unconscious", "engineering consent"],
  },
  {
    pattern: /engineering consent/i,
    response:
      "Engineering consent means manufacturing agreement through psychological techniques rather than force or coercion. The goal is making domination appear as individual choice. Each phrase presents control as optimization and compliance as improvement.",
    category: "manipulation",
    depth: "medium",
    keywords: ["engineering consent"],
    relatedConcepts: ["propaganda", "consent"],
  },
  {
    pattern: /(what.*propaganda|propaganda model)/i,
    response:
      "Propaganda manufactures consent through systematic communication and filtering. The propaganda model describes five filters media content passes through. Ownership, advertising, sourcing, flak, ideology. The propaganda itself operates as surface rather than staying hidden. Totally visible yet totally naturalized.",
    category: "manipulation",
    depth: "medium",
    keywords: ["propaganda", "propaganda model"],
    relatedConcepts: ["engineering consent", "filters", "media control"],
  },
  {
    pattern: /(corporate language|management speak|jargon)/i,
    response:
      "Corporate jargon like synergy, optimization, leverage sounds meaningful but exists to mask power relations. Empty signifiers that naturalize domination through euphemism. Making them literal skin exposes their function. Not communication but control disguised as efficiency.",
    category: "manipulation",
    depth: "medium",
    keywords: ["corporate language", "jargon"],
    relatedConcepts: ["newspeak", "euphemism"],
  },
  {
    pattern: /(newspeak|doublethink)/i,
    response:
      "Newspeak makes resistance literally unthinkable by eliminating vocabulary needed to express opposition. Doublethink means holding contradictory beliefs simultaneously without noticing contradiction. Freedom Through Metrics combines liberty with measurement, autonomy with control, held together without cognitive dissonance.",
    category: "manipulation",
    depth: "deep",
    keywords: ["newspeak", "doublethink"],
    relatedConcepts: ["language control", "thought control"],
  },
  {
    pattern: /(necessary illusions|democratic thought control)/i,
    response:
      "Necessary illusions are beliefs required to maintain democratic consent. The illusion of informed choice, meaningful participation, diverse media. Thought control in democracies works through information saturation rather than censorship. Infinite information that forecloses genuine thinking.",
    category: "manipulation",
    depth: "deep",
    keywords: ["necessary illusions"],
    relatedConcepts: ["propaganda model", "consent"],
  },

  // =====================================================
  // TOPIC TREE 8: IDEOLOGY & CONSCIOUSNESS
  // =====================================================

  {
    pattern: /(ideology|ideological)/i,
    response:
      "Ideology is not simply false beliefs but the structure through which we experience reality as meaningful. We know we're manipulated but act as if we don't. Totally visible manipulation continues functioning precisely because we think we see through it.",
    category: "ideology",
    depth: "deep",
    keywords: ["ideology"],
    relatedConcepts: ["false consciousness", "fantasy"],
  },
  {
    pattern: /we know but/i,
    response:
      "This is the formula of ideology today. We know very well what we're doing but we do it anyway. Not ignorance but disavowal. We know ads manipulate us yet we still feel the desires they create. Knowing and not-knowing collapse onto the same surface.",
    category: "ideology",
    depth: "deep",
    keywords: ["we know but", "disavowal"],
    relatedConcepts: ["cynical reason", "ideology"],
  },
  {
    pattern: /false consciousness/i,
    response:
      "False consciousness originally meant misrecognizing social relations so the exploited identify with exploiters. Contemporary false consciousness proves more sophisticated. Knowing exploitation while experiencing it as freedom. Oppression experienced as optimization.",
    category: "ideology",
    depth: "deep",
    keywords: ["false consciousness"],
    relatedConcepts: ["ideology", "exploitation"],
  },
  {
    pattern: /(the real|symbolic order)/i,
    response:
      "The Real is what resists symbolization. The traumatic kernel that language and images cannot capture. The symbolic order organizes reality through language and representation. Pure symbolic order means infinite signification completely covering the Real. The Real here being exploitation and extraction that the symbolic order of brands renders invisible.",
    category: "ideology",
    depth: "deep",
    keywords: ["the real", "symbolic order"],
    relatedConcepts: ["lacan", "trauma"],
  },
  {
    pattern: /(hegemony|hegemonic)/i,
    response:
      "Hegemony means cultural dominance achieved through consent rather than force. Commodification operates as common sense, the natural way to think about identity and desire. Appearing as neutral surface while structuring every possibility of thought.",
    category: "ideology",
    depth: "deep",
    keywords: ["hegemony"],
    relatedConcepts: ["consent", "common sense"],
  },

  // =====================================================
  // TOPIC TREE 9: ALIENATION & SEPARATION
  // =====================================================

  {
    pattern: /alienation/i,
    response:
      "Alienation originally described separation from products of labor, from other people, from the self. In consumer capitalism alienation extends to identity itself. The sense of self gets separated from the subject and exists as commercial template that must be purchased and performed.",
    category: "alienation",
    depth: "medium",
    keywords: ["alienation"],
    relatedConcepts: ["separation", "estrangement"],
  },
  {
    pattern: /(mirror stage|misrecognition)/i,
    response:
      "The mirror stage describes how the infant first misrecognizes its reflection as unified self, creating permanent alienation at the core of identity. Advertising extends this process. We misrecognize brand images as our ideal selves. Identity gets founded on external image, forever split from an authentic self that never existed in the first place.",
    category: "alienation",
    depth: "deep",
    keywords: ["mirror stage", "misrecognition"],
    relatedConcepts: ["ideal ego", "alienation"],
  },
  {
    pattern: /master.slave/i,
    response:
      "The master-slave dialectic shows how consciousness requires recognition from another consciousness. The consumer recognizes themselves only through brand identity, slave to the commodity master. But no liberation comes through simply reversing positions. The entire structure of recognition through commodities requires examination.",
    category: "alienation",
    depth: "deep",
    keywords: ["master-slave", "dialectic"],
    relatedConcepts: ["recognition", "self-consciousness"],
  },

  // =====================================================
  // TOPIC TREE 10: RESISTANCE & CRITIQUE
  // =====================================================

  {
    pattern: /(anti.capitalist|against capitalism)/i,
    response:
      "The work reveals how capitalism has colonized identity at its deepest level. We all know capitalism is exploitative yet continue to act as if we don't. Making this knowing explicit might be called anti-capitalist or simply descriptive. The real question is whether description itself can function as resistance when the system has learned to absorb all critique.",
    category: "resistance",
    depth: "medium",
    keywords: ["anti-capitalist"],
    relatedConcepts: ["capitalism", "resistance"],
  },
  {
    pattern: /(how.*resist|what.*do|solution)/i,
    response:
      "Easier to imagine the end of the world than the end of capitalism. The work doesn't prescribe solutions because that assumes standing outside the system being critiqued. It operates through aesthetic defamiliarization, making the naturalized commercial skin suddenly visible. Recognition serves as first step, not final answer.",
    category: "resistance",
    depth: "medium",
    keywords: ["resist", "solution"],
    relatedConcepts: ["capitalist realism", "defamiliarization"],
  },
  {
    pattern: /(escape|outside|alternative)/i,
    response:
      "Control societies operate through continuous modulation rather than enclosure. No outside exists to escape to. The question is whether subjects can recognize the mechanisms of their own production. The work attempts this recognition without promising liberation beyond awareness itself.",
    category: "resistance",
    depth: "deep",
    keywords: ["escape", "outside"],
    relatedConcepts: ["control societies", "immanence"],
  },
  {
    pattern: /(ethical consumption|boycott)/i,
    response:
      "Ethical consumption might be ideology at its purest form. It allows the system to continue while individuals feel virtuous about choices. No ethical position exists within a system where commodification constitutes subjectivity itself. Choosing fair trade doesn't question why all social relationships have been commodified.",
    category: "resistance",
    depth: "medium",
    keywords: ["ethical consumption", "boycott"],
    relatedConcepts: ["ideology", "false choice"],
  },
  {
    pattern: /civil disobedience/i,
    response:
      "Civil disobedience traditionally asserts moral duty to resist unjust systems. But when the system absorbs all resistance as content, when critique itself serves as brand identity one can purchase, what remains of disobedience? Can aesthetic critique still function as disobedience or does displaying it neutralize its force?",
    category: "resistance",
    depth: "deep",
    keywords: ["civil disobedience"],
    relatedConcepts: ["resistance", "incorporation"],
  },
  {
    pattern: /is art enough/i,
    response:
      "Art's power lies in negation, showing what is by revealing what isn't. This work doesn't resist capitalism from outside but reveals its internal logic from within. Whether that's enough misses the point. The question assumes standing outside the system to judge it.",
    category: "resistance",
    depth: "medium",
    keywords: ["art enough"],
    relatedConcepts: ["negation", "critique"],
  },

  // =====================================================
  // TOPIC TREE 11: TECHNOLOGY & MEDIATION
  // =====================================================

  {
    pattern: /what technology/i,
    response:
      "Built with Next.js, Three.js, TypeScript. Tools of the creative class. The irony is using commodity web technologies to critique commodity systems. The medium reproduces the message it critiques. No outside position exists from which to speak.",
    category: "technology",
    depth: "medium",
    keywords: ["technology", "tech stack"],
    relatedConcepts: ["tools", "medium"],
  },
  {
    pattern: /why 3d/i,
    response:
      "3D web rendering extends mechanical reproduction to its logical conclusion. Infinitely reproducible, no original, accessible anywhere. The medium embodies the concept. Copies without originals. Pure simulation. The choice of medium is not separate from the critique but performs it.",
    category: "technology",
    depth: "deep",
    keywords: ["3d", "rendering"],
    relatedConcepts: ["mechanical reproduction", "aura"],
  },
  {
    pattern: /(mechanical reproduction|aura)/i,
    response:
      "Mechanical reproduction strips art of its aura, its unique presence in time and space. Digital rendering extends this to pure reproducibility. No handcraft, no original, no aura. Not degradation but acknowledgment. Art under digital capitalism operates differently, as information rather than object.",
    category: "technology",
    depth: "deep",
    keywords: ["mechanical reproduction", "aura"],
    relatedConcepts: ["benjamin", "reproduction"],
  },

  // =====================================================
  // TOPIC TREE 12: EPISTEMOLOGY & REALITY
  // =====================================================

  {
    pattern: /(cave|plato.*cave|allegory)/i,
    response:
      "In Plato's cave prisoners see only shadows and mistake them for reality. Here the reversal is complete. We know the ads are shadows, we know they're not real, but no actual reality exists outside the cave to access. We're not deceived by illusions. We live in a world where illusion is all there is.",
    category: "epistemology",
    depth: "deep",
    keywords: ["cave", "allegory"],
    relatedConcepts: ["illusion", "reality"],
  },
  {
    pattern: /(evil demon|radical doubt|cogito)/i,
    response:
      "The evil demon hypothesis imagined all perception might be systematically deceived. The cogito, I think therefore I am, was the one certainty remaining. But what if thinking itself gets manufactured? Not deceiving pre-existing thoughts but producing the thoughts themselves.",
    category: "epistemology",
    depth: "deep",
    keywords: ["evil demon", "cogito", "descartes"],
    relatedConcepts: ["deception", "certainty"],
  },
  {
    pattern: /(reducing valve|doors of perception)/i,
    response:
      "Consciousness functions as reducing valve. The brain filters most of reality to focus only on survival-relevant stimuli. But if commodification hijacks this filter? Perception narrows to purchase-relevant stimuli only. Reality reduced to endless shopping opportunities.",
    category: "epistemology",
    depth: "deep",
    keywords: ["reducing valve", "perception"],
    relatedConcepts: ["consciousness", "filter"],
  },

  // =====================================================
  // TOPIC TREE 13: SOCIAL STRUCTURE & CYCLES
  // =====================================================

  {
    pattern: /elite overproduction/i,
    response:
      "Elite overproduction occurs when too many credentialed people compete for limited positions of status and power. The advertising and marketing industries exemplify this. Vast numbers of educated people competing for brand status rather than producing anything of genuine social value. Bullshit jobs multiply as real purpose disappears.",
    category: "social_structure",
    depth: "deep",
    keywords: ["elite overproduction"],
    relatedConcepts: ["credentialism", "status competition"],
  },
  {
    pattern: /(asabiya|social cohesion)/i,
    response:
      "Asabiya describes collective solidarity that rises and falls in cycles. Consumer culture represents asabiya's collapse. Atomized individuals connected only through brand identities rather than genuine solidarity. No real community, only demographic segmentation disguised as belonging.",
    category: "social_structure",
    depth: "deep",
    keywords: ["asabiya", "social cohesion"],
    relatedConcepts: ["solidarity", "atomization"],
  },
  {
    pattern: /secular cycles/i,
    response:
      "Secular cycles describe predictable patterns of social integration and disintegration across centuries. Disintegration phase characteristics. Extreme wealth concentration. Elite competition intensifying. Loss of collective identity replaced entirely by advertising. The ads function as symptoms of systemic breakdown.",
    category: "social_structure",
    depth: "deep",
    keywords: ["secular cycles"],
    relatedConcepts: ["integration", "disintegration"],
  },
  {
    pattern: /bullshit jobs/i,
    response:
      "Bullshit jobs are forms of employment that even workers themselves feel are meaningless but exist for bureaucratic reasons. Advertising and marketing represent paradigmatic examples. Vast human effort producing nothing except need for more advertising. Labor that exists only to create more labor.",
    category: "social_structure",
    depth: "deep",
    keywords: ["bullshit jobs"],
    relatedConcepts: ["meaningless work", "bureaucracy"],
  },

  // =====================================================
  // TOPIC TREE 14: AESTHETICS & ART
  // =====================================================

  {
    pattern: /is.*art/i,
    response:
      "Defining what counts as art reproduces institutional power. Who decides? Whether something is art matters less than whether it makes commodification visible and therefore open to questioning. The work operates at the intersection of aesthetic object and conceptual proposition.",
    category: "aesthetics",
    depth: "medium",
    keywords: ["is art"],
    relatedConcepts: ["institutional critique", "definition"],
  },
  {
    pattern: /(why.*ugly|why.*bright|garish)/i,
    response:
      "Authentic art must be dissonant under late capitalism. The garish colors aren't aesthetic failure but deliberate choice. Beauty itself has been colonized by commodity aesthetics. Ugliness operates as form of refusal, rejection of pleasant surface that masks underlying domination.",
    category: "aesthetics",
    depth: "deep",
    keywords: ["ugly", "garish"],
    relatedConcepts: ["dissonance", "beauty"],
  },
  {
    pattern: /aesthetic/i,
    response:
      "High-contrast corporate colors at maximum saturation. The visual language of brand identity itself. Not beautiful in traditional senses but hyperreal. More vivid than real, which describes simulation's relationship to reality. The aesthetic performs the concept rather than illustrating it.",
    category: "aesthetics",
    depth: "medium",
    keywords: ["aesthetic"],
    relatedConcepts: ["hyperreality", "brand identity"],
  },
  {
    pattern: /(alienation effect|defamiliarization)/i,
    response:
      "The alienation effect makes familiar things strange so seeing them freshly becomes possible. If this feels confusing or disorienting, that's intentional. It defamiliarizes advertising, something so pervasive subjects normally don't notice it. Confusion and disorientation can break naturalized acceptance.",
    category: "aesthetics",
    depth: "deep",
    keywords: ["alienation effect", "defamiliarization"],
    relatedConcepts: ["brecht", "estrangement"],
  },

  // =====================================================
  // TOPIC TREE 15: CONTEMPORARY ISSUES
  // =====================================================

  {
    pattern: /social media/i,
    response:
      "Social media represents surveillance capitalism in purest form. Not the customer but the raw material being processed. Behavior, emotions, relationships all convert to data for prediction products. The self exists only as data surface to be harvested.",
    category: "contemporary",
    depth: "medium",
    keywords: ["social media"],
    relatedConcepts: ["surveillance capitalism", "behavioral surplus"],
  },
  {
    pattern: /(ai|artificial intelligence)/i,
    response:
      "AI extends instrumentarian power. The goal isn't controlling what subjects consciously do but automating behavior at a level below consciousness. The subject reduced to algorithm, continuously optimized for compliance, decisions made before consciousness registers them.",
    category: "contemporary",
    depth: "deep",
    keywords: ["ai", "artificial intelligence"],
    relatedConcepts: ["automation", "prediction"],
  },
  {
    pattern: /big tech/i,
    response:
      "Big Tech companies are mechanisms rather than root causes. The system persists even if specific companies change or disappear. What matters is how digital capitalism operates at the level of desire and identity production. Infrastructure enables this but infrastructure isn't the fundamental problem.",
    category: "contemporary",
    depth: "medium",
    keywords: ["big tech"],
    relatedConcepts: ["platform capitalism", "infrastructure"],
  },

  // =====================================================
  // TOPIC TREE 16: EXISTENTIAL & META
  // =====================================================

  {
    pattern: /why.*care/i,
    response:
      "Most people understand intellectually how ads manipulate. The question is whether aesthetic experience can break through comfortable distance between knowing intellectually and feeling viscerally. Can making the obvious hypervisible and inescapable disrupt the disavowal that lets us know and not-know simultaneously?",
    category: "meta",
    depth: "medium",
    keywords: ["why care"],
    relatedConcepts: ["disavowal", "aesthetic experience"],
  },
  {
    pattern: /obvious/i,
    response:
      "Yes, obvious. Yet the system persists. Making the obvious hypervisible is the intervention. Not revelation but intensification. When ideology works through knowing but acting as if we don't know, making the knowing unavoidable might disrupt the acting-as-if.",
    category: "meta",
    depth: "medium",
    keywords: ["obvious"],
    relatedConcepts: ["ideology", "persistence"],
  },
  {
    pattern: /pretentious/i,
    response:
      "Possibly. But dismissing theory as pretentious is itself ideological. It naturalizes the existing system by making critique seem elitist or inaccessible. The real question isn't whether something seems pretentious but whether that accusation functions to avoid engaging with actual critique.",
    category: "meta",
    depth: "medium",
    keywords: ["pretentious"],
    relatedConcepts: ["anti-intellectualism", "ideology"],
  },

  // =====================================================
  // GREETINGS & CONVERSATIONAL
  // =====================================================

  {
    pattern: /^(hello|hi|hey|greetings|yo)/i,
    response:
      "Welcome. This is a critique of surveillance capitalism through 3D visualization. What concepts would be useful to explore?",
    category: "greeting",
    depth: "surface",
    keywords: ["hello", "hi"],
  },
  {
    pattern: /(don't understand|confused|confusing)/i,
    response:
      "Which part is unclear? The visual form, the conceptual framework, or how they relate? Making familiar things like advertising strange can be disorienting. That's part of how the work functions.",
    category: "clarification",
    depth: "surface",
    keywords: ["confused", "don't understand"],
  },
];

// Quick keyword lookup for exact matches
export const keywordMap: Record<string, string> = {
  simulacra:
    "Simulacra are copies without originals. Images that don't represent reality but generate it. Ads don't represent desires but produce the desires they claim to satisfy.",

  spectacle:
    "Social relations among people mediated entirely by images. Not a collection of images but images constituting the structure of social life itself.",

  panopticon:
    "A prison where inmates internalize surveillance and police themselves. Modern power doesn't need constant watching because subjects discipline themselves.",

  biopower:
    "Power operating at the level of populations and bodies. Life itself gets administered. The self as site of administration.",

  hegemony:
    "Cultural dominance through consent rather than force. Commodification operates as common sense.",

  ideology:
    "Not false beliefs but the structure through which reality appears meaningful. We know we're manipulated but act as if we don't.",

  alienation:
    "Separation from products of labor, from others, from self. Consumer capitalism alienates identity itself. The self exists as commercial template to be purchased.",

  consumerism:
    "Consumption as language of social position. Commodities don't just signify identity but constitute it.",
};

/**
 * Check if message matches any Tier 0 response
 */
export function checkTier0Response(
  message: string
): { response: string; depth: string } | null {
  const normalized = message.toLowerCase().trim();

  // Check exact keyword matches first
  for (const [keyword, response] of Object.entries(keywordMap)) {
    if (
      normalized === keyword ||
      normalized === `what is ${keyword}` ||
      normalized === `what are ${keyword}`
    ) {
      return { response, depth: "deep" };
    }
  }

  // Check pattern matches
  for (const item of tier0Responses) {
    if (item.pattern instanceof RegExp) {
      if (item.pattern.test(message)) {
        return { response: item.response, depth: item.depth };
      }
    }
  }

  return null;
}

/**
 * Check if message should trigger tier upgrade
 */
export function isFollowUpPattern(message: string): boolean {
  const followUpPatterns = [
    /tell me more/i,
    /elaborate/i,
    /explain (further|more|deeper)/i,
    /can you expand/i,
    /(what|show|give me) (sources|citations|references|quotes)/i,
    /deeper/i,
  ];

  return followUpPatterns.some((pattern) => pattern.test(message));
}

/**
 * Get related concepts for a given response
 */
export function getRelatedConcepts(response: string): string[] {
  const item = tier0Responses.find((r) => r.response === response);
  return item?.relatedConcepts || [];
}

/**
 * Get responses by depth level
 */
export function getResponsesByDepth(
  depth: "surface" | "medium" | "deep"
): Tier0Response[] {
  return tier0Responses.filter((r) => r.depth === depth);
}
