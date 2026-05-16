import React, { useState, useEffect, useMemo } from 'react';

// --- V1 AGRIPRO DIPM ---
// --- CRASH-PROOF INLINE ICONS (SCALED UP FOR READABILITY) ---
const Icon = ({ name, className }) => {
  const icons = {
    leaf: <path d="M11 20A7 7 0 0 1 14 6c7 0 7 7 7 7a7 7 0 0 1-7 7c-7 0-7-7-7-7"/>,
    bug: <><rect width="8" height="14" x="8" y="6" rx="4"/><path d="m19 7-3 2M5 7l3 2M19 19l-3-2M5 19l3-2M20 13h-4M4 13h4M10 4l1 2M14 4l-1 2"/></>,
    droplets: <path d="M7 16.3c0 2.6 2.24 4.7 5 4.7s5-2.1 5-4.7c0-2.4-2.24-5.3-5-8.8-2.76 3.5-5 6.4-5 8.8z" />,
    alert: <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
    calculator: <><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></>,
    link: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    rain: <><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    camera: <><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>,
    upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>,
    grid: <><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></>,
    list: <><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></>,
    'arrow-up': <><line x1="12" x2="12" y1="19" y2="5"/><polyline points="5 12 12 5 19 12"/></>,
    share: <><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></>,
    filter: <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></>,
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>,
    sunset: <><path d="M12 2v6"/><path d="M4.93 10.93l2.83 2.83"/><path d="M2 18h20"/><path d="M19.07 10.93l-2.83 2.83"/><path d="M8 18a4 4 0 0 1 8 0"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    dash: <line x1="5" y1="12" x2="19" y2="12" />,
    'chevron-down': <polyline points="6 9 12 15 18 9"/>,
    'chevron-up': <polyline points="18 15 12 9 6 15"/>,
    'book-open': <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>,
    'eye': <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    'lightbulb': <><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></>,
    'dot': <circle cx="12" cy="12" r="10"/>,
    'target': <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    'dollar-sign': <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
    'beaker': <><path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/></>
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {icons[name] || icons.info}
    </svg>
  );
};

// --- DATA ENRICHMENT: IPM, STAGE & PHOTOTAXIS TAGS ---
const ALL_PESTS = [
  // INSECTS - SAP SUCKERS & SCALES
  {
    id: 'thrips-nymph', category: 'Insects', common: 'Chilli Thrips (Nymph)', scientific: 'Scirtothrips dorsalis / Thrips palmi', genus: 'Scirtothrips / Thrips', family: 'Thripidae', target: 'Flower buds, young flush', part: 'Fruit/Flower', type: 'Rasping-sucking', hiding: 'Deep inside flower buds and tightly folded leaves', symptoms: 'Silvery scarring on leaves, flower abortion. Microscopic yellow/pale nymphs.', activity: 'Continuous',
    lifecycle: 'Extremely rapid lifecycle (14-20 days). Females insert up to 200 eggs directly into tender plant tissue. Populations can explode exponentially within a single week during hot, dry spells. High priority for immediate control before flowering fails.', symbiosis: 'None.', control: 'Bio-control: Isaria fumosorosea thrives in sun-exposed canopies. Deploy BLUE STICKY TRAPS nearby to catch emerging adults.',
    severity: 4, stages: ['Vegetative', 'Flowering'], ipm: ['Chemical', 'Biological']
  },
  {
    id: 'thrips-adult', category: 'Insects', common: 'Chilli Thrips (Winged Adult)', scientific: 'Scirtothrips dorsalis', genus: 'Scirtothrips', family: 'Thripidae', target: 'Flowers, young leaves, fruitlets', part: 'Fruit/Flower', type: 'Rasping-sucking', hiding: 'Flowers and canopy', symptoms: 'Fruit russeting, flower browning. Causes distinctive corky scars on durian skin.', activity: 'Diurnal',
    lifecycle: 'Adults are highly mobile and easily carried by wind across the orchard. They pupate in the soil/leaf litter before flying up to the canopy. Early detection via sticky traps is critical as they spread damage quickly.', symbiosis: 'Populations spike drastically in dry weather.', control: 'Deploy BLUE STICKY TRAPS (10 cards/tree) inside canopy. Bio-control: Isaria fumosorosea.',
    severity: 4, stages: ['Flowering', 'Fruiting'], ipm: ['Physical', 'Chemical', 'Biological']
  },
  {
    id: 'aphid-nymph', category: 'Insects', common: 'Black Citrus Aphid (Nymph)', scientific: 'Toxoptera aurantii', genus: 'Toxoptera', family: 'Aphididae', target: 'Very young shoots, flower buds', part: 'Leaves', type: 'Sap-sucking', hiding: 'Dense clusters on new terminals', symptoms: 'Curled and deformed new leaves. Heavy honeydew secretion leading to sooty mold.', activity: 'Continuous',
    lifecycle: 'Hyper-fast multipliers. Aphids reproduce via parthenogenesis (females give birth to live female clones without mating). A lifecycle takes only 5-7 days. A small cluster can turn into a massive, flush-destroying colony in under a week.', symbiosis: 'Farmed and protected by ants.', control: 'Control ant populations. Bio-control: Spray Lecanicillium lecanii to parasitize colonies. Deploy YELLOW STICKY TRAPS.',
    severity: 3, stages: ['Seedling', 'Vegetative'], ipm: ['Cultural', 'Chemical', 'Biological']
  },
  {
    id: 'aphid-adult', category: 'Insects', common: 'Black Citrus Aphid (Winged)', scientific: 'Toxoptera aurantii', genus: 'Toxoptera', family: 'Aphididae', target: 'New vegetative flushes', part: 'Leaves', type: 'Sap-sucking', hiding: 'Canopy terminals', symptoms: 'Swarming adults spreading the colony to new flush points.', activity: 'Diurnal',
    lifecycle: 'Winged adults are only produced when a colony becomes overcrowded or food quality drops. Their sudden appearance means the current flush is exhausted and they are actively flying to infect new, healthy trees. Act quickly.', symbiosis: 'Known vector for viral pathogens.', control: 'Deploy YELLOW STICKY TRAPS to intercept migrants. Bio-control: Lecanicillium lecanii. Apply systemic Flonicamid during peak flush.',
    severity: 3, stages: ['Vegetative'], ipm: ['Physical', 'Chemical', 'Biological']
  },
  {
    id: 'whitefly-nymph', category: 'Insects', common: 'Whitefly (Scale-like Nymph)', scientific: 'Bemisia tabaci', genus: 'Bemisia', family: 'Aleyrodidae', target: 'Underside of leaves', part: 'Leaves', type: 'Sap-sucking', hiding: 'Stationary on the underside of mature and young leaves', symptoms: 'Severe leaf yellowing. Copious honeydew production leading to thick sooty mold.', activity: 'Continuous',
    lifecycle: 'Completes a generation in 3-4 weeks. Nymphs are flat, stationary, and look like pale green scales. They are highly resistant to standard contact insecticides once settled. Requires systemic or suffocating oil treatments.', symbiosis: 'Honeydew attracts ants and fungi.', control: 'Bio-control: Isaria fumosorosea or Lecanicillium lecanii dissolves the cuticle. Horticultural oils, Buprofezin (IGR), or Spiromesifen.',
    severity: 3, stages: ['Vegetative'], ipm: ['Biological', 'Chemical']
  },
  {
    id: 'whitefly-adult', category: 'Insects', common: 'Whitefly (Winged Adult)', scientific: 'Bemisia tabaci', genus: 'Bemisia', family: 'Aleyrodidae', target: 'Canopy foliage', part: 'Leaves', type: 'Sap-sucking', hiding: 'Underside of leaves, fly up in white clouds when disturbed', symptoms: 'Clouds of tiny white moth-like insects. Vector for plant viruses.', activity: 'Diurnal',
    lifecycle: 'Females lay 100-300 eggs on the underside of leaves. Highly mobile and rapid breeders in warm, dry climates. Because adults fly away during spraying, repeated applications are often necessary to break the breeding cycle.', symbiosis: 'None.', control: 'Mass deploy YELLOW STICKY TRAPS. Bio-control: Isaria fumosorosea. Pyriproxyfen (IGR) to break the cycle.',
    severity: 3, stages: ['Vegetative'], ipm: ['Physical', 'Chemical', 'Biological']
  },
  {
    id: 'durian-pit-scale-crawler', category: 'Insects', common: 'Durian Pit Scale (Crawler)', scientific: 'Asterolecanium ungulatum', genus: 'Asterolecanium', family: 'Asterolecaniidae', target: 'Twigs, smaller branches, underside of leaves', part: 'Leaves', type: 'Sap-sucking', hiding: 'Moving along bark and leaf surfaces', symptoms: 'Microscopic yellow crawlers moving rapidly over bark or leaves before settling. Early sign of a new scale generation.', activity: 'Diurnal',
    lifecycle: 'This is the ONLY vulnerable stage of the scale. It lasts just 2-3 days before they permanently attach to the bark and secrete impenetrable wax armor. Spotting crawlers requires immediate contact insecticide application.', symbiosis: 'Highly susceptible to predators at this stage.', control: 'Optimal timing for contact insecticides (e.g., Buprofezin) or horticultural oils.',
    severity: 4, stages: ['Vegetative', 'Post-Harvest'], ipm: ['Chemical', 'Cultural']
  },
  {
    id: 'durian-pit-scale-adult', category: 'Insects', common: 'Durian Pit Scale (Armored Adult)', scientific: 'Asterolecanium ungulatum', genus: 'Asterolecanium', family: 'Asterolecaniidae', target: 'Twigs, smaller branches, fruit stalks, leaf veins', part: 'Leaves', type: 'Sap-sucking', hiding: 'Embedded in bark depressions or tightly along leaf midribs', symptoms: 'Forms craters in bark. On leaves, causes yellow chlorotic spots and premature leaf drop. Causes severe twig dieback.', activity: 'Continuous',
    lifecycle: 'Adult females live for several months permanently fixed in their pits. They reproduce under their heavy wax armor, laying hundreds of eggs. Chronic infestations slowly drain the tree\'s vigor over years, severely reducing yields.', symbiosis: 'Armor protects them from contact sprays.', control: 'Prune heavily infested twigs. Apply heavy horticultural white oils mixed with penetrative systemic insecticides.',
    severity: 5, stages: ['All Stages'], ipm: ['Physical', 'Chemical']
  },
  {
    id: 'soft-scale', category: 'Insects', common: 'Soft Brown Scale', scientific: 'Coccus hesperidum', genus: 'Coccus', family: 'Coccidae', target: 'Leaves, green twigs', part: 'Leaves', type: 'Sap-sucking', hiding: 'Underside of leaves along the main vein', symptoms: 'Unlike pit scales, these do not form craters. They produce massive amounts of honeydew causing heavy sooty mold.', activity: 'Continuous',
    lifecycle: 'Generations overlap continuously in the tropics (lifecycle is about 60 days). Females retain eggs inside their bodies until they hatch into live crawlers, meaning population buildup is steady and relentless if ants are present to protect them.', symbiosis: 'Vigorously farmed by ants.', control: 'Ant control is mandatory. Bio-control: Beauveria bassiana mixed with white oil. Systemic insecticides.',
    severity: 3, stages: ['Vegetative', 'Fruiting'], ipm: ['Biological', 'Chemical']
  },
  {
    id: 'psyllid-nymph', category: 'Insects', common: 'Durian Psyllid (Waxy Nymph)', scientific: 'Allocarsidara malayensis', genus: 'Allocarsidara', family: 'Psyllidae', target: 'Young leaves, flush shoots', part: 'Leaves', type: 'Sap-sucking', hiding: 'Clustered tightly on expanding leaves', symptoms: 'Nymphs exude long, white waxy threads. Severe leaf curling, premature leaf drop, stunted flush, heavy sooty mold.', activity: 'Continuous',
    lifecycle: 'Lifecycle closely synced with durian flushing. Eggs hatch in 3-5 days. Nymphs feed aggressively for 15-20 days. A heavy infestation can completely destroy a vegetative flush wave, setting the tree\'s growth back by months.', symbiosis: 'Produces copious honeydew. Attracts ants.', control: 'Bio-control: Lecanicillium lecanii targets the soft body. Spray systemic insecticides (e.g., Thiamethoxam) during active flush.',
    severity: 4, stages: ['Vegetative'], ipm: ['Chemical', 'Biological']
  },
  {
    id: 'psyllid-adult', category: 'Insects', common: 'Durian Psyllid (Winged Adult)', scientific: 'Allocarsidara malayensis', genus: 'Allocarsidara', family: 'Psyllidae', target: 'Canopy foliage', part: 'Leaves', type: 'Sap-sucking', hiding: 'Jumping and flying around the canopy', symptoms: 'Presence of small, active winged insects that jump or fly when disturbed. Cause feeding damage and lay eggs.', activity: 'Diurnal',
    lifecycle: 'Adults can live up to a month, continuously laying eggs in the midribs of young expanding leaves. They are strong jumpers and fliers, meaning they can rapidly spread from an unmanaged neighboring orchard into yours.', symbiosis: 'None.', control: 'YELLOW STICKY TRAPS (5-8 per tree) at flush height for monitoring. Foliar sprays targeting adults.',
    severity: 4, stages: ['Vegetative'], ipm: ['Physical', 'Chemical']
  },
  {
    id: 'green-leafhopper-nymph', category: 'Insects', common: 'Green Leafhopper (Nymph)', scientific: 'Empoasca flavescens', genus: 'Empoasca', family: 'Cicadellidae', target: 'Young leaves', part: 'Leaves', type: 'Sap-sucking', hiding: 'Underside of young leaves (scuttles sideways)', symptoms: 'Phytotoxic saliva causes "hopperburn": yellowing margins, leaf curling, necrosis at leaf tips. Nymphs run sideways.', activity: 'Continuous',
    lifecycle: 'Hatch in about a week. The wingless nymphs are voracious feeders. Their toxic saliva permanently damages the vascular tissue of the leaf margins. Populations explode immediately following heavy nitrogen fertilizer applications.', symbiosis: 'Populations spike following heavy nitrogen applications.', control: 'Avoid excess vegetative nitrogen. Apply insecticidal soaps or Neem oil.',
    severity: 3, stages: ['Vegetative'], ipm: ['Cultural', 'Biological']
  },
  {
    id: 'green-leafhopper-adult', category: 'Insects', common: 'Green Leafhopper (Winged)', scientific: 'Empoasca flavescens', genus: 'Empoasca', family: 'Cicadellidae', target: 'Young leaves', part: 'Leaves', type: 'Sap-sucking', hiding: 'Canopy foliage', symptoms: 'Swarming green insects that fly up when branches are shaken. Cause hopperburn and spread rapidly.', activity: 'Diurnal',
    lifecycle: 'Adults breed very rapidly in hot, dry weather. Entire lifecycles can be completed in 3 weeks. Swarms can move rapidly across large estates, causing widespread hopperburn in newly flushed canopies.', symbiosis: 'None.', control: 'Apply Dinotefuran or Pymetrozine. Yellow sticky traps for monitoring.',
    severity: 4, stages: ['Vegetative'], ipm: ['Chemical', 'Physical']
  },
  {
    id: 'durian-mealybug-crawler', category: 'Insects', common: 'Durian Mealybug (Crawler)', scientific: 'Exallomochlus hispidus', genus: 'Exallomochlus', family: 'Pseudococcidae', target: 'Twigs, leaves, moving towards fruit', part: 'Fruit/Flower', type: 'Sap-sucking', hiding: 'Crevices, carried actively by ants', symptoms: 'Tiny, highly mobile yellow/pinkish nymphs spreading rapidly across the tree. Early signs of honeydew.', activity: 'Diurnal',
    lifecycle: 'Crawlers are the highly mobile distribution phase. Without wax, they are vulnerable to sun and sprays. They only remain in this stage for a few days before settling. If ants are present, they will literally pick crawlers up and carry them directly to your premium developing fruits.', symbiosis: 'Actively transported and farmed by Weaver ants.', control: 'Best stage for contact insecticides. Apply horticultural oil or Buprofezin (IGR).',
    severity: 4, stages: ['Flowering', 'Fruiting'], ipm: ['Chemical', 'Biological']
  },
  {
    id: 'durian-mealybug-adult', category: 'Insects', common: 'Durian Mealybug (Waxed Adult)', scientific: 'Exallomochlus hispidus', genus: 'Exallomochlus', family: 'Pseudococcidae', target: 'Fruit husks, flower clusters, twigs', part: 'Fruit/Flower', type: 'Sap-sucking', hiding: 'Between thorns on fruit, branch axils', symptoms: 'Thick white powdery/cottony masses on fruit skin. Causes fruit deformity, fruit drop, and thick sooty mold.', activity: 'Continuous',
    lifecycle: 'Stationary females live for 30-40 days, laying massive egg masses (300-600 eggs) wrapped in cottony wax. They multiply relentlessly on expanding fruits, sucking nutrients and ruining the cosmetic grade of the durian husk for export.', symbiosis: 'Strong mutualistic relationship with Weaver ants.', control: 'Wax armor repels many sprays. Bio-control: Beauveria bassiana. Use systemic insecticides (Spirotetramat).',
    severity: 5, stages: ['Fruiting'], ipm: ['Cultural', 'Chemical', 'Biological']
  },
  {
    id: 'coffee-mealybug', category: 'Insects', common: 'Coffee Mealybug', scientific: 'Planococcus lilacinus', genus: 'Planococcus', family: 'Pseudococcidae', target: 'Roots, stems, leaves, fruit', part: 'Roots', type: 'Sap-sucking', hiding: 'Underside of leaves, roots', symptoms: 'Wilting, yellowing foliage, stunted growth, sooty mold.', activity: 'Continuous',
    lifecycle: 'Can complete a lifecycle in 25-30 days. Uniquely dangerous because they can colonize the root system underground as well as the canopy, making them incredibly difficult to eradicate with standard foliar sprays.', symbiosis: 'Farmed by soil and canopy ants.', control: 'Buprofezin (IGR) for crawlers. Systemic root drenches if root-based.',
    severity: 3, stages: ['Seedling', 'Vegetative'], ipm: ['Chemical', 'Cultural']
  },
  {
    id: 'leaf-footed-bug', category: 'Insects', common: 'Leaf-footed Bug', scientific: 'Leptoglossus spp.', genus: 'Leptoglossus', family: 'Coreidae', target: 'Young developing fruits', part: 'Fruit/Flower', type: 'Piercing-sucking', hiding: 'Resting on fruit husks or twigs', symptoms: 'Puncture marks on young durians. Causes localized necrosis, internal core browning, and premature fruit drop.', activity: 'Diurnal',
    lifecycle: 'Relatively slow breeders (lifecycle takes ~60 days), but individual adults are highly destructive. A single bug can puncture and ruin multiple young fruits in a single afternoon. Adults are strong flyers and migrate from weeds.', symbiosis: 'Puncture wounds invite secondary fungal infections.', control: 'Pyrethroid sprays (e.g., Lambda-cyhalothrin) during early fruit development. Orchard weed management.',
    severity: 4, stages: ['Fruiting'], ipm: ['Chemical', 'Cultural']
  },
  {
    id: 'stink-bug', category: 'Insects', common: 'Stink Bug', scientific: 'Halyomorpha halys', genus: 'Halyomorpha', family: 'Pentatomidae', target: 'Fruits, young shoots', part: 'Fruit/Flower', type: 'Piercing-sucking', hiding: 'Canopy, highly camouflaged', symptoms: 'Internal fruit discoloration, hardening of the durian aril (flesh), and fruit malformation. Emits foul odor when threatened.', activity: 'Diurnal',
    lifecycle: 'Females lay barrel-shaped eggs in clusters. Nymphs and adults both aggressively feed on fruit. They do not multiply as exponentially as aphids, but their phytotoxic saliva means even a low population will cause significant economic loss to fruit quality.', symbiosis: 'Saliva is highly phytotoxic to durian flesh.', control: 'Apply broad-spectrum insecticides if populations are high. Keep orchard weed-free to remove alternate hosts.',
    severity: 4, stages: ['Fruiting'], ipm: ['Physical', 'Chemical']
  },

  // INSECTS - ANTS & MUTUALISTS & OCCUPATIONAL HAZARDS
  {
    id: 'paper-wasp', category: 'Insects', common: 'Paper Wasp (Penyengat)', scientific: 'Polistes spp. / Ropalidia spp.', genus: 'Polistes', family: 'Vespidae', target: 'Lower canopy, leaves, branches', part: 'General', type: 'Occupational Hazard', hiding: 'Open, umbrella-shaped paper nests hanging under large durian leaves or branch forks.', symptoms: 'Workers getting stung while pruning or harvesting. Nests are small to medium, exposed, and attached via a single stalk.', activity: 'Diurnal',
    lifecycle: 'Relatively small colonies (dozens of wasps). Beneficial predators of leaf-eating caterpillars, but highly defensive if their specific leaf/branch is disturbed. Painful sting but usually non-lethal unless allergic.', symbiosis: 'Feeds on caterpillars.', control: 'Spot treat individual nests strictly at night with pyrethroid aerosols. Wear basic PPE during pruning. Leave alone if high up and not obstructing harvest.',
    severity: 3, stages: ['All Stages'], ipm: ['Physical', 'Chemical']
  },
  {
    id: 'hornet', category: 'Insects', common: 'Banded Hornet (Tebuan)', scientific: 'Vespa affinis / Vespa tropica', genus: 'Vespa', family: 'Vespidae', target: 'Main branches, high canopy, ground burrows', part: 'General', type: 'Severe Occupational Hazard', hiding: 'Massive enclosed teardrop/football-shaped paper nests high in the canopy, or hidden deep in tall grass/burrows.', symptoms: 'Highly aggressive, unprovoked swarming. Multiple stings can cause anaphylactic shock or kidney failure. Massive paper enclosed nests.', activity: 'Diurnal',
    lifecycle: 'Huge colonies (thousands of aggressive hornets). Territorial radius is large; they may attack workers just for walking near the tree. Extreme occupational hazard that can shut down harvest operations entirely.', symbiosis: 'Aggressively hunts honeybees and caterpillars.', control: 'Do NOT attempt daylight removal. Require full thick protective suit. Eradicate strictly at night using long-distance pyrethroid aerosols or fire/smoke. Clear ground brush to prevent soil nests.',
    severity: 5, stages: ['All Stages'], ipm: ['Physical', 'Chemical', 'Cultural']
  },
  {
    id: 'night-wasp', category: 'Insects', common: 'Night Wasp (Tebuan Malam)', scientific: 'Provespa barthelemyi', genus: 'Provespa', family: 'Vespidae', target: 'Canopy foliage, night operations', part: 'General', type: 'Severe Occupational Hazard', hiding: 'Enclosed paper nests hidden deep in dense foliage or tree hollows', symptoms: 'Swarms violently toward headlamps and machinery lights during night spraying. Highly aggressive after dark.', activity: 'Nocturnal',
    lifecycle: 'A unique, strictly nocturnal hornet. Because they navigate by low light, they are extremely phototactic (attracted to light). A worker switching on a headlamp near a nest will instantly draw the entire defensive swarm directly to their face.', symbiosis: 'N/A', control: 'REVERSE PROTOCOL: Do NOT attempt eradication at night. Mark nests at night, but destroy them strictly during the DAYLIGHT when the colony is sleeping and sluggish. Mandate red-filtered headlamps for night workers.',
    severity: 5, stages: ['All Stages'], ipm: ['Physical', 'Cultural', 'Chemical']
  },
  {
    id: 'weaver-ant', category: 'Insects', common: 'Weaver Ant (Kerengga)', scientific: 'Oecophylla smaragdina', genus: 'Oecophylla', family: 'Formicidae', target: 'Canopy, flush leaves', part: 'Leaves', type: 'Mutualist / Nuisance', hiding: 'Inside large nests made of green leaves stitched together', symptoms: 'Folds and stitches leaves together. Aggressively swarms and bites workers during harvest or pruning. Farms mealybugs on fruit stems.', activity: 'Diurnal',
    lifecycle: 'Mature colonies contain up to half a million ants and span multiple trees. The queen breeds continuously inside protected leaf nests. They do not damage the wood, but their aggressive defense of mealybugs/scales drives severe secondary pest outbreaks.', symbiosis: 'Protects mealybugs and scales from natural predators in exchange for honeydew.', control: 'Prune out and burn nests. Apply contact insecticides (e.g., Cypermethrin) or use slow-acting ant baits at the base of the tree.',
    severity: 3, stages: ['All Stages'], ipm: ['Cultural', 'Chemical']
  },
  {
    id: 'crazy-ant', category: 'Insects', common: 'Yellow Crazy Ant', scientific: 'Anoplolepis gracilipes', genus: 'Anoplolepis', family: 'Formicidae', target: 'Trunk, branches, soil', part: 'General', type: 'Mutualist / Scavenger', hiding: 'Soil crevices, leaf litter, base of the trunk', symptoms: 'Erratic, fast-moving yellow/brown ants swarming the trunk. Drives massive outbreaks of aphids and scales by fighting off beneficial ladybugs and wasps.', activity: 'Continuous',
    lifecycle: 'Highly invasive. Unlike normal ants, they form massive "supercolonies" with hundreds of queens spread across hectares of land. They multiply with terrifying speed and completely dominate the orchard ecosystem, ensuring permanent sap-sucker outbreaks until the ants are eradicated.', symbiosis: 'Obligate mutualism with honeydew-producing sap-suckers. Their presence guarantees a sap-sucker outbreak.', control: 'Deploy Borax-based sugar baits or Fipronil granules. Keep the orchard floor clean of debris to reduce nesting sites.',
    severity: 4, stages: ['All Stages'], ipm: ['Chemical', 'Cultural']
  },

  // INSECTS - BORERS & MAGGOTS
  {
    id: 'coconut-rhino-beetle-grub', category: 'Insects', common: 'Coconut Rhino Beetle (Grub)', scientific: 'Oryctes rhinoceros', genus: 'Oryctes', family: 'Scarabaeidae', target: 'Decaying plant matter, compost', part: 'Roots', type: 'Scavenging', hiding: 'Deep inside decaying organic matter or empty fruit bunches', symptoms: 'Does not feed on living trees, but large white C-shaped grubs found in compost/mulch indicate a breeding site.', activity: 'Continuous',
    lifecycle: 'Slow lifecycle. Grubs feed for 4 to 6 months inside rotting trunks or mulch before pupating. If you see grubs in your orchard compost, you have a 4-month countdown before a massive swarm of destructive adult beetles emerges to attack your young trees.', symbiosis: 'None.', control: 'Sanitize the orchard. Treat breeding sites with EM (Effective Microbes) to accelerate breakdown, and broadcast Metarhizium anisopliae to kill grubs.',
    severity: 3, stages: ['All Stages'], ipm: ['Cultural', 'Biological']
  },
  {
    id: 'coconut-rhino-beetle-adult', category: 'Insects', common: 'Coconut Rhino Beetle (Adult)', scientific: 'Oryctes rhinoceros', genus: 'Oryctes', family: 'Scarabaeidae', target: 'Young shoots, developing crowns', part: 'Trunk/Branches', type: 'Wood-boring', hiding: 'Inside the growing shoots or crowns', symptoms: 'Bores into growing shoots. High risk for farms near oil palm replanting sites. Leaves emerge with V-shaped cuts.', activity: 'Nocturnal',
    lifecycle: 'Adults live for 4-6 months, constantly flying from rotting breeding grounds to living trees to feed. A single beetle can destroy the growing apex of a young durian sapling overnight, stunting the tree by years or killing it outright.', symbiosis: 'Often co-infests with secondary bacterial rots entering the boreholes.', control: 'Deploy pheromone traps. Physically extract beetles from boreholes. Maintain orchard border hygiene.',
    severity: 5, stages: ['Seedling', 'Vegetative'], ipm: ['Physical', 'Biological']
  },
  {
    id: 'malaysian-rhino-beetle-adult', category: 'Insects', common: 'Malaysian Rhino Beetle', scientific: 'Oryctes gnu', genus: 'Oryctes', family: 'Scarabaeidae', target: 'Tree crowns, shoots', part: 'Trunk/Branches', type: 'Wood-boring', hiding: 'Inside plant shoots or decaying matter', symptoms: 'Similar boring damage to O. rhinoceros. Larger species, though much less common and rarely a significant pest.', activity: 'Nocturnal',
    lifecycle: 'Similar slow lifecycle to O. rhinoceros (up to a year per generation). Less prolific than its cousin, but the adult\'s larger size means individual boreholes are significantly more damaging to saplings.', symbiosis: 'None.', control: 'Controlled effectively using the same pheromone traps and orchard sanitation practices as the Coconut Rhino Beetle.',
    severity: 3, stages: ['Seedling', 'Vegetative'], ipm: ['Physical', 'Cultural']
  },
  {
    id: 'durian-fruit-borer-caterpillar', category: 'Insects', common: 'Durian Fruit Borer (Caterpillar)', scientific: 'Mudaria magniplaga', genus: 'Mudaria', family: 'Noctuidae', target: 'Fruit (husk and seed)', part: 'Fruit/Flower', type: 'Boring', hiding: 'Inside developing fruit', symptoms: 'Small entrance hole plugged with brown frass. Flesh and seeds eaten. Premature fruit drop.', activity: 'Continuous',
    lifecycle: 'Extremely fast and untreatable phase. Eggs hatch in just 3-5 days. The microscopic larva immediately bores straight into the fruit skin within hours of hatching. Once inside, no chemical spray can reach it. It feeds inside for 14-20 days.', symbiosis: 'None.', control: 'Bio-control: Nomuraea rileyi mummifies caterpillars on contact. Once deep inside, chemical control is impossible.',
    severity: 5, stages: ['Fruiting'], ipm: ['Physical', 'Biological', 'Cultural']
  },
  {
    id: 'durian-fruit-borer-moth', category: 'Insects', common: 'Durian Fruit Borer (Adult Moth)', scientific: 'Mudaria magniplaga', genus: 'Mudaria', family: 'Noctuidae', target: 'Developing fruit surface', part: 'Fruit/Flower', type: 'Egg-laying', hiding: 'Canopy during the day, active at night', symptoms: 'Brown/grey moths flying at night. Deposit small eggs directly onto the developing durian husks.', activity: 'Nocturnal',
    lifecycle: 'Moths emerge from soil pupae perfectly timed with the durian fruiting season. A single female moth flies at night and can lay clusters of eggs across dozens of young fruits in a single week. Preventative trapping is essential before moth flight peaks.', symbiosis: 'Attracted to orchard lights.', control: 'Deploy SOLAR INSECT KILLER LAMPS (UV/Blue spectrum) high in the canopy to mass-trap night-flying adult moths before they lay eggs. Strict collection of dropped fruit.',
    severity: 5, stages: ['Fruiting'], ipm: ['Physical', 'Chemical']
  },
  {
    id: 'durian-seed-borer-caterpillar', category: 'Insects', common: 'Durian Seed Borer (Caterpillar)', scientific: 'Mudaria luteileprosa', genus: 'Mudaria', family: 'Noctuidae', target: 'Fruit (specifically the seed)', part: 'Fruit/Flower', type: 'Boring', hiding: 'Deep inside the durian seed', symptoms: 'Almost no external signs. Seed is completely hollowed out and filled with frass upon opening.', activity: 'Continuous',
    lifecycle: 'Similar 1-month lifecycle to the Fruit Borer, but specifically targets the seed core early in fruit development. Moths lay eggs near the fruit stalk. Larvae pupate in the soil; dropped infected fruits left on the ground guarantee a massive moth swarm next season.', symbiosis: 'None.', control: 'Bio-control: Nomuraea rileyi. Strict orchard sanitation. Destroy dropped/rejected fruits.',
    severity: 5, stages: ['Fruiting'], ipm: ['Physical', 'Cultural', 'Biological']
  },
  {
    id: 'fruit-fly-maggot', category: 'Insects', common: 'Oriental Fruit Fly (Maggot)', scientific: 'Bactrocera dorsalis', genus: 'Bactrocera', family: 'Tephritidae', target: 'Ripening or cracked fruit', part: 'Fruit/Flower', type: 'Flesh-eating', hiding: 'Inside the durian flesh', symptoms: 'Flesh becomes mushy, rotten, and filled with wriggling white maggots. Usually enters through natural split or borer holes.', activity: 'Continuous',
    lifecycle: 'Hyper-aggressive multiplier. Eggs hatch into maggots in just 1-3 days. Maggots rapidly liquefy the premium durian flesh within a week before dropping to the soil to pupate. A single cracked fruit can produce hundreds of new flies.', symbiosis: 'Accelerates fruit rot via bacteria introduced by the mother fly.', control: 'Ensure fruits do not crack on the tree. Harvest promptly. Destroy infested fruits.',
    severity: 4, stages: ['Fruiting', 'Post-Harvest'], ipm: ['Cultural']
  },
  {
    id: 'fruit-fly-adult', category: 'Insects', common: 'Oriental Fruit Fly (Adult)', scientific: 'Bactrocera dorsalis', genus: 'Bactrocera', family: 'Tephritidae', target: 'Ripe/Cracked fruit', part: 'Fruit/Flower', type: 'Egg-laying', hiding: 'Canopy, attracted to ripe smells', symptoms: 'Adult flies hovering around ripening or fallen fruits to lay eggs.', activity: 'Diurnal',
    lifecycle: 'Extremely high reproductive capacity. Females can lay up to 3,000 eggs in their lifetime. They are attracted from miles away by the smell of ripening durian. While they cannot pierce intact durian husks, they will instantly exploit the tiniest crack or borer hole.', symbiosis: 'None.', control: 'Use YELLOW STICKY TRAPS combined with Methyl Eugenol pheromone lures. Ensure zero fruit cracks.',
    severity: 4, stages: ['Fruiting'], ipm: ['Physical', 'Biological', 'Chemical']
  },
  {
    id: 'sap-beetle', category: 'Insects', common: 'Sap Beetle (Nitidulid)', scientific: 'Carpophilus spp.', genus: 'Carpophilus', family: 'Nitidulidae', target: 'Cracked or over-ripe fruits', part: 'Fruit/Flower', type: 'Scavenging', hiding: 'Deep inside natural splits or borer holes in ripe fruit', symptoms: 'Tiny, fast-moving black beetles swarming into cracks of ripe durian at harvest. They feed directly on the sweet aril, ruining commercial value.', activity: 'Diurnal',
    lifecycle: 'Explosive breeders in dropped or rotting fruit. Lifecycles are completed in just 12-15 days in hot weather. They navigate entirely by smell, swarming natural splits on the tree within hours of the fruit cracking open.', symbiosis: 'Secondary pest; strictly relies on natural splitting, borer holes, or mechanical damage to access the flesh.', control: 'Bio-control: Beauveria bassiana for structural populations. Harvest fruits promptly upon natural drop. Clear all rotting, unmarketable fruits from the orchard floor.',
    severity: 3, stages: ['Fruiting', 'Post-Harvest'], ipm: ['Cultural', 'Biological', 'Physical']
  },
  {
    id: 'rind-borer', category: 'Insects', common: 'Durian Rind Borer', scientific: 'Tonica terrasella', genus: 'Tonica', family: 'Oecophoridae', target: 'Fruit husks (Rind)', part: 'Fruit/Flower', type: 'Surface Boring', hiding: 'Under webbed frass on the fruit skin', symptoms: 'Caterpillar chews shallow tunnels into the spines and skin of the fruit, covering the feeding site with silk and frass. Does not penetrate to the flesh, but causes severe cosmetic scarring.', activity: 'Nocturnal / Continuous',
    lifecycle: 'Moth lays eggs directly on the developing fruit. Caterpillars feed on the rind surface, causing thick, corky scar tissue to form as the fruit heals. Ruins the visual grade of premium fruits (e.g., Grade A Musang King).', symbiosis: 'None.', control: 'Bio-control: Nomuraea rileyi. Deploy SOLAR INSECT KILLER LAMPS for adult moths. Apply Spinetoram.',
    severity: 4, stages: ['Fruiting'], ipm: ['Physical', 'Chemical', 'Biological']
  },
  {
    id: 'peach-moth', category: 'Insects', common: 'Yellow Peach Moth', scientific: 'Conogethes punctiferalis', genus: 'Conogethes', family: 'Crambidae', target: 'Fruit clusters', part: 'Fruit/Flower', type: 'Webbing / Boring', hiding: 'Between fruits that are touching', symptoms: 'Caterpillars spin silk webs between clustered fruits and bore into the husks. Frass is often seen caught in the webbing between fruits.', activity: 'Nocturnal',
    lifecycle: 'A highly polyphagous pest with a fast lifecycle (~30 days). The adult moth specifically targets fruit clusters because the tight space between fruits provides a protected environment for the larvae to hatch and bore.', symbiosis: 'Webbing and wounds often invite secondary fungal fruit rots.', control: 'Bio-control: Nomuraea rileyi. Proper fruit thinning (culling) to ensure fruits do not touch. Deploy SOLAR INSECT LAMPS.',
    severity: 4, stages: ['Fruiting'], ipm: ['Cultural', 'Physical', 'Biological']
  },
  {
    id: 'mango-stem-borer-larva', category: 'Insects', common: 'Longhorn Stem Borer (Grub)', scientific: 'Batocera rufomaculata', genus: 'Batocera', family: 'Cerambycidae', target: 'Main trunk, large primary branches', part: 'Trunk/Branches', type: 'Wood-boring', hiding: 'Deep galleries inside the heartwood', symptoms: 'Large exit holes. Sawdust-like frass piling up at tree base. Severe branch dieback and hollowed trunks.', activity: 'Continuous',
    lifecycle: 'Incredibly slow lifecycle, but catastrophic individual damage. The massive grub lives *inside* the tree for 8 to 12 months, slowly eating away the vascular tissue and structural heartwood. By the time you see sawdust, severe internal damage has already occurred.', symbiosis: 'Entry wounds invite secondary fungal infections.', control: 'Inject Cypermethrin or Chlorpyrifos into *existing* insect boreholes and seal immediately with clay/wax to prevent rot. Avoid drilling new holes.',
    severity: 5, stages: ['All Stages'], ipm: ['Chemical', 'Physical']
  },
  {
    id: 'mango-stem-borer-adult', category: 'Insects', common: 'Longhorn Stem Borer (Beetle)', scientific: 'Batocera rufomaculata', genus: 'Batocera', family: 'Cerambycidae', target: 'Bark of branches', part: 'Trunk/Branches', type: 'Bark-chewing', hiding: 'Resting on trunks during the day', symptoms: 'Very large beetles with long antennae. Chew small slits in the bark to lay eggs. Cause minor bark damage.', activity: 'Nocturnal',
    lifecycle: 'Adults emerge during the rainy season, living for several months. Females chew horizontal slits in the bark to lay up to 200 eggs over their lifespan. Catching adults at night prevents years of future larval damage.', symbiosis: 'None.', control: 'Manual capture and destruction. Paint trunks with repellent whitewash/insecticide.',
    severity: 4, stages: ['All Stages'], ipm: ['Cultural', 'Chemical']
  },
  {
    id: 'pinhole-borer', category: 'Insects', common: 'Pinhole Borer', scientific: 'Platypus spp. / Crossotarsus spp.', genus: 'Platypus', family: 'Curculionidae (Platypodinae)', target: 'Mature trunks, weakened trees', part: 'Trunk/Branches', type: 'Wood-boring', hiding: 'Deep inside the xylem', symptoms: 'Tiny, dense "pinholes" in the bark. Fine, white, powdery frass expelled from holes. Severe vascular decline in older trees.', activity: 'Crepuscular',
    lifecycle: 'Adult beetles bore deep into the wood to cultivate ambrosia fungi to feed their larvae. They are heavily attracted to ethanol emitted by stressed, diseased, or over-watered trees. A primary cause of sudden tree death in mature orchards.', symbiosis: 'Cultivates and feeds exclusively on Ambrosia fungi.', control: 'Improve tree vigor. Bio-control: Beauveria bassiana. Treat trunks with systemic penetrants. Remove dead/dying trees immediately.',
    severity: 5, stages: ['All Stages'], ipm: ['Cultural', 'Chemical', 'Biological']
  },
  {
    id: 'ambrosia-beetle', category: 'Insects', common: 'Shot-hole Borer (Ambrosia Beetle)', scientific: 'Xyleborus fornicatus', genus: 'Xyleborus', family: 'Curculionidae', target: 'Trunk and branches', part: 'Trunk/Branches', type: 'Wood-boring', hiding: 'Intricate tunnels inside the xylem (wood)', symptoms: 'Tiny, perfectly round holes ("shot holes") in bark. Extrusion of compacted frass noodles ("toothpicks").', activity: 'Crepuscular',
    lifecycle: 'Rapid and highly specialized multiplier (30 days/generation). Females practice sibling mating inside the tree, meaning a single female can fly to a new tree and immediately start a massive new colony without finding a mate. Targets stressed or waterlogged trees.', symbiosis: 'Obligate mutualism with Ambrosia fungi. Vectors Phytophthora and Ceratocystis.', control: 'Bio-control: Beauveria bassiana. Maintain tree health/water status. Prune and burn infested wood. Apply bark penetrant fungicides.',
    severity: 5, stages: ['All Stages'], ipm: ['Cultural', 'Chemical', 'Biological']
  },
  {
    id: 'red-branch-borer', category: 'Insects', common: 'Red Branch Borer (Leopard Moth)', scientific: 'Zeuzera coffeae', genus: 'Zeuzera', family: 'Cossidae', target: 'Medium to small branches', part: 'Trunk/Branches', type: 'Wood-boring', hiding: 'Inside the pith of branches', symptoms: 'Sudden wilting and snapping of healthy-looking branches in the wind. A single round entrance hole on the branch, often with reddish frass pellets pushed out.', activity: 'Nocturnal',
    lifecycle: 'Moth lays eggs on young bark. Larva bores directly into the center of the branch, hollowing it out from the inside. The larval stage lasts several months. Pruning out the hollow, dying branches is the only effective control.', symbiosis: 'None.', control: 'Prune and destroy infested branches below the boring hole. Only inject *existing* boreholes with insecticide if on critical structural limbs.',
    severity: 4, stages: ['Vegetative', 'Fruiting'], ipm: ['Physical', 'Chemical']
  },
  {
    id: 'clearwing-moth', category: 'Insects', common: 'Clearwing Moth (Bark Borer)', scientific: 'Synanthedon spp.', genus: 'Synanthedon', family: 'Sesiidae', target: 'Bark and cambium', part: 'Trunk/Branches', type: 'Bark-boring', hiding: 'Shallow galleries just under the bark', symptoms: 'Localized swelling, cracking, and severe gummosis (sap oozing) on the trunk. Frass is mixed with sap. Often confused with Phytophthora canker.', activity: 'Diurnal',
    lifecycle: 'Adults look like small wasps. Larvae feed strictly in the cambium layer just beneath the bark, slowly girdling the tree. Their feeding wounds are prime entry points for severe fungal infections.', symbiosis: 'Creates entry wounds for Phytophthora and Fusicoccum.', control: 'Scrape bark to expose larvae and apply contact insecticide. Paint trunk with protective insecticidal pastes.',
    severity: 4, stages: ['All Stages'], ipm: ['Physical', 'Chemical']
  },
  {
    id: 'bark-eating-caterpillar', category: 'Insects', common: 'Bark-eating Caterpillar', scientific: 'Indarbela spp.', genus: 'Indarbela', family: 'Cossidae', target: 'Bark of mature trunks', part: 'Trunk/Branches', type: 'Bark-grazing', hiding: 'Inside silk webs covered with wood dust and frass on the trunk', symptoms: 'Ribbon-like feeding galleries made of silk and frass winding along the bark. Bark is eaten away, weakening branches.', activity: 'Nocturnal',
    lifecycle: 'Very slow multiplier (usually only 1 generation per year). The caterpillar hides in a short hole bored into the wood during the day, emerging at night to graze on the bark under its protective silk web. Chronic, slowly accumulating damage.', symbiosis: 'None.', control: 'Bio-control: Nomuraea rileyi. Remove frass galleries manually with a wire brush. Spot-spray or paint bark with Deltamethrin.',
    severity: 3, stages: ['Vegetative', 'Post-Harvest'], ipm: ['Physical', 'Biological', 'Chemical']
  },
  {
    id: 'subterranean-termite', category: 'Insects', common: 'Subterranean Termite', scientific: 'Coptotermes curvignathus', genus: 'Coptotermes', family: 'Rhinotermitidae', target: 'Living trunk, taproot, heartwood', part: 'Trunk/Branches', type: 'Wood-consuming', hiding: 'Underground nests, inside mud tubes on trunk', symptoms: 'Earthen mud tubes running up the exterior of the trunk. Canopy suddenly wilts and dies rapidly as heartwood is hollowed out.', activity: 'Continuous',
    lifecycle: 'Continuous, terrifyingly fast exponential breeding. A mature queen can lay thousands of eggs *every day*. A colony can reach millions of individuals and can completely hollow out and kill a mature living durian tree in a matter of months.', symbiosis: 'Cultivate gut protozoa to digest cellulose.', control: 'Destroy mud tubes. Soil drenching with Fipronil or Imidacloprid. Use termite baiting stations.',
    severity: 5, stages: ['All Stages'], ipm: ['Chemical', 'Biological']
  },

  // INSECTS - DEFOLIATORS
  {
    id: 'bagworm', category: 'Insects', common: 'Bagworm', scientific: 'Pteroma x pendula', genus: 'Pteroma', family: 'Psychidae', target: 'Leaves', part: 'Leaves', type: 'Chewing', hiding: 'Inside conical bags made of dead leaf fragments', symptoms: 'Small conical "bags" hanging from the underside of leaves. Leaves have irregular holes or are completely skeletonized during outbreaks.', activity: 'Continuous',
    lifecycle: 'Females are wingless and remain inside their bags for life. They lay thousands of eggs inside the bag. When larvae hatch, they spin a long silk thread and "balloon" on the wind to new trees. Can cause severe defoliation very quickly.', symbiosis: 'None.', control: 'Bio-control: Nomuraea rileyi. Apply Bacillus thuringiensis (Bt) or contact insecticides. Hand-picking is effective for small outbreaks.',
    severity: 4, stages: ['Vegetative'], ipm: ['Biological', 'Chemical']
  },
  {
    id: 'chafer-beetle-grub', category: 'Insects', common: 'Chafer Beetle (White Grub)', scientific: 'Apogonia cribricollis', genus: 'Apogonia', family: 'Scarabaeidae', target: 'Roots of seedlings and young trees', part: 'Roots', type: 'Root-chewing', hiding: 'Underground in soil and organic matter', symptoms: 'Seedlings mysteriously wilt, turn yellow, and die despite adequate watering. Roots are stripped or severed.', activity: 'Continuous',
    lifecycle: 'Slow multiplier. Grubs spend 3-6 months underground feeding on fine roots and heavy uncomposted manure. They cause slow, mysterious decline in nurseries before eventually pupating into defoliating adults.', symbiosis: 'Thrives in soil with heavy, uncomposted organic manure.', control: 'Apply systemic soil drenches (Imidacloprid) or broadcast entomopathogenic fungi (Metarhizium) into the soil.',
    severity: 4, stages: ['Seedling', 'Vegetative'], ipm: ['Biological', 'Chemical']
  },
  {
    id: 'chafer-beetle-adult', category: 'Insects', common: 'Night-flying Chafer Beetle', scientific: 'Apogonia cribricollis', genus: 'Apogonia', family: 'Scarabaeidae', target: 'Leaves of seedlings and young trees', part: 'Leaves', type: 'Chewing', hiding: 'Buried in soil or leaf litter during the day', symptoms: 'Leaves are heavily skeletonized overnight, leaving only the tough main veins behind. Massive defoliation.', activity: 'Nocturnal',
    lifecycle: 'Emergence is heavily synchronized with the first rains after a dry spell. Adults swarm at night in massive numbers to feed and mate, capable of completely skeletonizing young saplings overnight. They return to the soil before dawn.', symbiosis: 'None.', control: 'Install SOLAR INSECT LAMPS 1-2 meters above ground to intercept swarms. Spray foliage with contact insecticides (Cypermethrin) in the late evening.',
    severity: 4, stages: ['Seedling', 'Vegetative'], ipm: ['Physical', 'Chemical']
  },
  {
    id: 'rose-chafer', category: 'Insects', common: 'Rose Chafer (Leaf Beetle)', scientific: 'Adoretus spp.', genus: 'Adoretus', family: 'Scarabaeidae', target: 'Leaves', part: 'Leaves', type: 'Chewing', hiding: 'Soil during day, canopy at night', symptoms: 'Distinctive lace-like feeding pattern on leaves. They chew the soft tissue between the leaf veins, leaving a skeletonized net.', activity: 'Nocturnal',
    lifecycle: 'Similar night-swarming behavior to Adoretus, but often causes a more intricate "window-pane" damage pattern. Grubs live in the soil. Frequent pest of nursery stock.', symbiosis: 'None.', control: 'Nighttime foliar sprays of pyrethroids. Soil treatments to control grubs.',
    severity: 3, stages: ['Seedling', 'Vegetative'], ipm: ['Chemical']
  },
  {
    id: 'gold-dust-weevil-grub', category: 'Insects', common: 'Gold-dust Weevil (Root Grub)', scientific: 'Hypomeces squamosus', genus: 'Hypomeces', family: 'Curculionidae', target: 'Roots of seedlings', part: 'Roots', type: 'Root-chewing', hiding: 'Underground', symptoms: 'Seedling decline, damaged root system. Very similar damage profile to Chafer grubs.', activity: 'Continuous',
    lifecycle: 'Females drop eggs onto the soil surface. Larvae burrow down and feed exclusively on roots for several months. Often goes entirely undetected until the sapling shows severe stress.', symbiosis: 'None.', control: 'Soil drenching targeting the root zone.',
    severity: 3, stages: ['Seedling'], ipm: ['Chemical']
  },
  {
    id: 'gold-dust-weevil-adult', category: 'Insects', common: 'Gold-dust Weevil (Adult)', scientific: 'Hypomeces squamosus', genus: 'Hypomeces', family: 'Curculionidae', target: 'Mature and young leaves', part: 'Leaves', type: 'Chewing', hiding: 'Under canopy foliage during day', symptoms: 'Irregular, ragged, jagged edges chewed out of the leaf margins. Metallic greenish-gold beetles visible.', activity: 'Diurnal',
    lifecycle: 'Adults live for several weeks, climbing up the tree trunk to feed on foliage. They drop to the ground and play dead when disturbed. Slower multiplier than grasshoppers, but persistent leaf damage.', symbiosis: 'None.', control: 'Foliar application of Fipronil or synthetic pyrethroids.',
    severity: 3, stages: ['Vegetative'], ipm: ['Chemical']
  },
  {
    id: 'valanga-grasshopper-nymph', category: 'Insects', common: 'Valanga Grasshopper (Nymph)', scientific: 'Valanga nigricornis', genus: 'Valanga', family: 'Acrididae', target: 'Leaves of nursery stock', part: 'Leaves', type: 'Chewing', hiding: 'Lower canopy branches', symptoms: 'Wingless hoppers chewing large irregular chunks from leaves. Can quickly defoliate small saplings.', activity: 'Diurnal',
    lifecycle: 'Females lay egg pods 5-8cm deep in the soil. Nymphs hatch after a month and go through 6 molting stages (instars) over roughly 2 months. They are wingless but voracious, clustering together on lower saplings.', symbiosis: 'None.', control: 'Manual removal. Neem oil deterrent sprays on nursery stock.',
    severity: 3, stages: ['Seedling', 'Vegetative'], ipm: ['Physical', 'Biological']
  },
  {
    id: 'valanga-grasshopper-adult', category: 'Insects', common: 'Valanga Grasshopper (Adult)', scientific: 'Valanga nigricornis', genus: 'Valanga', family: 'Acrididae', target: 'Leaves of young trees', part: 'Leaves', type: 'Chewing', hiding: 'Camouflaged in dense canopy foliage', symptoms: 'Massive winged grasshoppers causing heavy localized defoliation, stripping leaves down to the midrib.', activity: 'Diurnal',
    lifecycle: 'Relatively slow breeders (1 or 2 generations per year depending on climate). Highly mobile fliers capable of moving from surrounding scrubland into the orchard. Adults live for months, causing sustained localized damage.', symbiosis: 'None.', control: 'Spot spray Cypermethrin in early morning when insects are cold and sluggish.',
    severity: 3, stages: ['Vegetative'], ipm: ['Chemical', 'Physical']
  },
  {
    id: 'durian-leafroller', category: 'Insects', common: 'Durian Leafroller Moth', scientific: 'Homona spp.', genus: 'Homona', family: 'Tortricidae', target: 'Young expanding leaves', part: 'Leaves', type: 'Chewing / Webbing', hiding: 'Inside rolled or folded leaves tied together with silk', symptoms: 'Young leaves are folded over or stitched together. Leaves are skeletonized from the inside out. Stunted flush growth.', activity: 'Nocturnal',
    lifecycle: 'Rapid flush-dependent breeders. Moths lay overlapping scale-like eggs on leaves. Caterpillars hatch in days, immediately spinning silk to tie leaves together to create a protected feeding nest. Pupates within the rolled leaf.', symbiosis: 'None.', control: 'Bio-control: Nomuraea rileyi mummifies caterpillars on contact. Pinch and destroy rolled leaves by hand.',
    severity: 3, stages: ['Vegetative'], ipm: ['Biological', 'Physical']
  },
  {
    id: 'tussock-moth', category: 'Insects', common: 'Hairy Tussock Moth', scientific: 'Calliteara horsfieldii', genus: 'Calliteara', family: 'Erebidae', target: 'Mature and young leaves', part: 'Leaves', type: 'Chewing', hiding: 'Underside of leaves or resting on bark', symptoms: 'Rapid defoliation. Caterpillars possess dense tufts of irritating hairs which cause severe skin rashes to orchard workers.', activity: 'Nocturnal',
    lifecycle: 'Medium speed breeder (generation takes 4-6 weeks). Moths lay hairy egg masses. The caterpillars are highly polyphagous and travel quickly across the canopy. They pose a significant occupational health hazard to farm workers due to stinging hairs.', symbiosis: 'None.', control: 'Bio-control: Nomuraea rileyi. Avoid touching bare-handed. Apply target-specific lepidopteran sprays like Indoxacarb.',
    severity: 4, stages: ['Vegetative'], ipm: ['Biological', 'Chemical']
  },
  {
    id: 'durian-hawk-moth', category: 'Insects', common: 'Durian Hawk Moth', scientific: 'Daphnusa ocellaris', genus: 'Daphnusa', family: 'Sphingidae', target: 'Mature and young leaves', part: 'Leaves', type: 'Chewing', hiding: 'Camouflaged among green foliage', symptoms: 'Complete consumption of leaves including veins. Very large green caterpillars (up to 8cm) with a distinctive tail horn.', activity: 'Nocturnal',
    lifecycle: 'Slow breeders, very low population density. A single caterpillar, however, eats massive quantities of foliage daily due to its gigantic size. They drop to the soil to pupate for several weeks. Seldom reaches outbreak levels.', symbiosis: 'None.', control: 'Hand-picking is usually sufficient due to low populations but massive size.',
    severity: 2, stages: ['Vegetative'], ipm: ['Physical']
  },

  // MITES & NEMATODES
  {
    id: 'african-red-mite', category: 'Mites/Nematodes', common: 'African Red Mite', scientific: 'Eutetranychus africanus', genus: 'Eutetranychus', family: 'Tetranychidae', target: 'Upper surface of mature leaves', part: 'Leaves', type: 'Cell-sucking', hiding: 'Along the main leaf veins', symptoms: 'Stippling, dull gray/bronze leaf appearance. Severe premature leaf drop (bald canopy).', activity: 'Diurnal',
    lifecycle: 'Explosive reproduction rate. Completes a full lifecycle from egg to adult in just 4 to 7 days during hot, dry weather. A minor presence can turn into a catastrophic outbreak that bald-strips a canopy in less than two weeks. Wash off instantly with heavy rain.', symbiosis: 'Explodes in population during prolonged dry, dusty conditions.', control: 'Bio-control: Hirsutella thompsonii causes massive mite pandemics. Acaricides (Propargite). Maintain orchard humidity.',
    severity: 4, stages: ['Vegetative'], ipm: ['Cultural', 'Biological', 'Chemical']
  },
  {
    id: 'oriental-red-mite', category: 'Mites/Nematodes', common: 'Oriental Red Mite', scientific: 'Eutetranychus orientalis', genus: 'Eutetranychus', family: 'Tetranychidae', target: 'Upper leaf surfaces', part: 'Leaves', type: 'Cell-sucking', hiding: 'Along the midrib and veins on the upper leaf surface', symptoms: 'Chlorotic pale spots, stippling, leading to a "dusty" or bronzed appearance. Heavy infestation leads to leaf drop.', activity: 'Diurnal',
    lifecycle: 'Extremely rapid in hot, dry conditions. Lifecycle from egg to adult can be as short as 8-10 days. Spreads via wind and crawling.', symbiosis: 'Populations explode during dry spells and low humidity.', control: 'Bio-control: Hirsutella thompsonii. Acaricides (Spiromesifen, Fenpyroximate). Increase humidity with misting.',
    severity: 4, stages: ['Vegetative'], ipm: ['Biological', 'Chemical', 'Cultural']
  },
  {
    id: 'broad-mite', category: 'Mites/Nematodes', common: 'Broad Mite', scientific: 'Polyphagotarsonemus latus', genus: 'Polyphagotarsonemus', family: 'Tarsonemidae', target: 'Apical meristem, very young leaves', part: 'Leaves', type: 'Cell-sucking', hiding: 'Deep in the crevices of new shoot tips', symptoms: 'Microscopic pest. New leaves emerge twisted, distorted, stunted. Often misdiagnosed as herbicide drift.', activity: 'Continuous',
    lifecycle: 'Ultra-fast multiplier. Completes lifecycle in just 4-6 days. Adult males actively pick up female pupae and carry them to fresh new shoots to expand the colony. Their highly toxic saliva deforms leaves long after the mite is gone.', symbiosis: 'Toxic saliva causes the severe growth distortion.', control: 'Bio-control: Hirsutella thompsonii. Apply Abamectin or Spiromesifen specifically to the new flushes.',
    severity: 4, stages: ['Vegetative'], ipm: ['Biological', 'Chemical']
  },
  {
    id: 'eriophyid-mite', category: 'Mites/Nematodes', common: 'Eriophyid Mite (Leaf Curl Mite)', scientific: 'Eriophyes spp.', genus: 'Eriophyes', family: 'Eriophyidae', target: 'Young leaves', part: 'Leaves', type: 'Cell-sucking', hiding: 'Inside leaf galls or dense hairy patches (erineum)', symptoms: 'Microscopic. Causes leaves to blister, curl, and form velvety/hairy patches (erineum) on the underside.', activity: 'Continuous',
    lifecycle: 'Very rapid lifecycle (1-2 weeks). They are wind-dispersed like dust particles. When they feed, their saliva alters the plant\'s DNA expression locally, forcing the leaf to grow protective "hairs" (erineum) which the mites then live and breed inside, shielding them from chemical sprays.', symbiosis: 'Saliva induces the plant to create the protective hairy galls.', control: 'Bio-control: Hirsutella thompsonii. Wettable Sulfur or Abamectin applied during early vegetative flush.',
    severity: 3, stages: ['Vegetative'], ipm: ['Biological', 'Chemical']
  },
  {
    id: 'root-knot-nematode', category: 'Mites/Nematodes', common: 'Root-knot Nematode', scientific: 'Meloidogyne incognita', genus: 'Meloidogyne', family: 'Heteroderidae', target: 'Feeder roots', part: 'Roots', type: 'Endoparasitic', hiding: 'Inside swollen root galls', symptoms: 'Stunted growth, nutrient deficiency symptoms (yellowing) despite fertilizing. Root galls visible upon excavation.', activity: 'Continuous',
    lifecycle: 'Completes a generation in 25-30 days. Microscopic juveniles enter roots and establish permanent feeding sites, causing the root to swell into massive galls. Females lay hundreds of eggs in gelatinous masses in the soil. Relentless, slow multiplier.', symbiosis: 'Breaks down root resistance, facilitating Phytophthora.', control: 'Pre-plant soil solarization. Bio-control: Purpureocillium lilacinum hunts and destroys eggs. Fosthiazate application.',
    severity: 4, stages: ['All Stages'], ipm: ['Biological', 'Cultural']
  },
  {
    id: 'lesion-nematode', category: 'Mites/Nematodes', common: 'Lesion Nematode', scientific: 'Pratylenchus spp.', genus: 'Pratylenchus', family: 'Pratylenchidae', target: 'Feeder roots', part: 'Roots', type: 'Endoparasitic', hiding: 'Inside and around root cortex', symptoms: 'Stunted tree growth, yellowing canopy, poor response to fertilizers. Roots show dark necrotic lesions and slough off.', activity: 'Continuous',
    lifecycle: 'Lifecycle is 3-4 weeks. Unlike Root-knot nematodes, these are migratory. They continuously tunnel through the root tissue, eating cells, laying eggs, and moving on, creating massive necrotic wounds that instantly invite lethal fungal rots.', symbiosis: 'Lesions provide entry points for Phytophthora and Pythium root rots.', control: 'Bio-control: Purpureocillium lilacinum explicitly hunts nematodes. Apply Trichoderma. Pre-plant soil treatment with Fosthiazate.',
    severity: 4, stages: ['All Stages'], ipm: ['Biological', 'Chemical']
  },

  // FUNGI & PATHOGENS
  {
    id: 'phytophthora', category: 'Fungi/Pathogens', common: 'Patch Canker / Root Rot', scientific: 'Phytophthora palmivora', genus: 'Phytophthora', family: 'Oomycete', target: 'Roots, collar, trunk, fruit', part: 'Trunk/Branches', type: 'Pathogen', hiding: 'Waterlogged soil, weeping bark cankers', symptoms: 'Dark, weeping sap on trunk. Feeder root decay. Pre- and post-harvest brown fruit rot.', activity: 'N/A',
    lifecycle: 'Hyper-aggressive spreader in wet conditions. Produces millions of motile zoospores that physically "swim" through soil water and rain splash. Can infect a healthy tree and cause massive visible rot within 3 to 5 days of heavy rainfall. Treat as an absolute emergency.', symbiosis: 'Vectored by ambrosia beetles and dirty pruning tools.', control: 'Strict drainage. Bio-control: Trichoderma harzianum, Pseudomonas fluorescens & EM soil drenches to parasitize and outcompete rots. Use Systemic Phosphorous Acid.',
    severity: 5, stages: ['All Stages'], ipm: ['Chemical', 'Biological', 'Cultural']
  },
  {
    id: 'black-mildew', category: 'Fungi/Pathogens', common: 'Black Mildew', scientific: 'Meliola durionis', genus: 'Meliola', family: 'Meliolaceae', target: 'Leaves', part: 'Leaves', type: 'Pathogen', hiding: 'Upper surface of mature leaves', symptoms: 'Dense, velvety, dark black fungal colonies on the leaf surface. Unlike Sooty Mold, this fungus parasitizes the leaf directly and does not easily wash off.', activity: 'N/A',
    lifecycle: 'Obligate plant parasite. Spores germinate in high humidity and send specialized feeding structures (haustoria) directly into the leaf cells. While rarely killing the tree, severe infections drastically reduce the photosynthetic area, weakening the tree over time.', symbiosis: 'Does NOT require insect honeydew (unlike Sooty Mold).', control: 'Ensure proper canopy pruning. Bio-control: Bacillus subtilis foliar spray. Copper-based fungicides.',
    severity: 3, stages: ['Vegetative', 'Post-Harvest'], ipm: ['Cultural', 'Biological', 'Chemical']
  },
  {
    id: 'fusicoccum-canker', category: 'Fungi/Pathogens', common: 'Fusicoccum Branch Canker', scientific: 'Fusicoccum spp.', genus: 'Fusicoccum', family: 'Botryosphaeriaceae', target: 'Upper branches, main stems', part: 'Trunk/Branches', type: 'Pathogen', hiding: 'Bark cracks, pruning wounds, sunscald areas', symptoms: 'Bark cracking and peeling on branches, often accompanied by dark gummy exudate. Causes severe branch dieback and leaf wilting above the canker. Often mistaken for Phytophthora but usually occurs higher up in the canopy rather than the collar.', activity: 'N/A',
    lifecycle: 'An opportunistic wound pathogen that rapidly exploits stressed trees (from drought, sunscald, or heavy fruiting). Spores are dispersed by wind and rain splash. Once inside the vascular tissue, it aggressively girdles and kills the branch. Can remain latent inside healthy-looking wood until tree immunity drops.', symbiosis: 'Enters through insect borer holes or unpainted pruning cuts.', control: 'Prune infected branches. Bio-control: Paint wounds with Streptomyces bio-paste to melt fungal cells. Sterilize tools.',
    severity: 4, stages: ['Vegetative', 'Post-Harvest'], ipm: ['Cultural', 'Biological', 'Chemical']
  },
  {
    id: 'twig-blight', category: 'Fungi/Pathogens', common: 'Phomopsis Twig Blight / Dieback', scientific: 'Phomopsis durionis / Diaporthe spp.', genus: 'Phomopsis', family: 'Diaporthaceae', target: 'Young twigs, terminal shoots', part: 'Trunk/Branches', type: 'Pathogen', hiding: 'Dead twigs attached to the canopy', symptoms: 'Leaves on young terminal twigs suddenly turn brown and die, but stubbornly remain attached to the stem. The twig itself shrivels, turns black, and dies back from the tip downwards.', activity: 'N/A',
    lifecycle: 'Spores are spread by wind and rain splash, heavily targeting soft, unhardened vegetative flushes. The fungus colonizes the terminal shoots and quickly kills the vascular tissue, cutting off water to the leaves. Extremely common during prolonged rainy seasons.', symbiosis: 'Frequently exploits twigs that have been previously weakened or pierced by sap-sucking insects (like scales or leafhoppers).', control: 'Sanitation is key: prune off and burn dead twigs. Apply foliar sprays of broad-spectrum fungicides like Mancozeb or Difenoconazole.',
    severity: 3, stages: ['Vegetative'], ipm: ['Cultural', 'Chemical']
  },
  {
    id: 'pythium-rot', category: 'Fungi/Pathogens', common: 'Pythium Root Rot', scientific: 'Pythium complectens', genus: 'Pythium', family: 'Oomycete', target: 'Feeder roots, seedlings', part: 'Roots', type: 'Pathogen', hiding: 'Saturated soil, nursery polybags', symptoms: 'Damping off in nurseries. Sloughing off of the outer root cortex layer in mature trees.', activity: 'N/A',
    lifecycle: 'Extremely fast acting in waterlogged conditions (hours to days). Like Phytophthora, it relies on swimming zoospores. It specifically targets fine feeder roots and seedlings, causing sudden collapse (damping off) within 24 hours of infection in saturated nursery bags.', symbiosis: 'Often co-infects with Phytophthora.', control: 'Avoid over-watering. Bio-control: Trichoderma harzianum & Pseudomonas fluorescens drench. Soil drenches with Etridiazole.',
    severity: 4, stages: ['Seedling'], ipm: ['Cultural', 'Biological', 'Chemical']
  },
  {
    id: 'lasiodiplodia', category: 'Fungi/Pathogens', common: 'Stem Canker / Fruit Rot', scientific: 'Lasiodiplodia theobromae', genus: 'Lasiodiplodia', family: 'Botryosphaeriaceae', target: 'Trunks, branches, post-harvest fruit', part: 'Trunk/Branches', type: 'Pathogen', hiding: 'Wounds, cracked bark, infected pruning cuts', symptoms: 'Dieback of branches, dark oozing lesions on the trunk. Causes rapid black rotting of fruit post-harvest.', activity: 'N/A',
    lifecycle: 'Opportunistic wound pathogen that acts extremely fast under high heat and humidity. Spores land on fresh pruning cuts or sunscald wounds and can begin decaying wood or post-harvest fruit within 48 hours. Can lay dormant inside wood for months until tree gets stressed.', symbiosis: 'Often enters through sunscald, borer holes, or mechanical damage.', control: 'Sanitize pruning tools. Paint pruning wounds with Streptomyces or fungicide. Post-harvest prochloraz dips.',
    severity: 4, stages: ['Post-Harvest', 'All Stages'], ipm: ['Cultural', 'Biological', 'Chemical']
  },
  {
    id: 'ceratocystis', category: 'Fungi/Pathogens', common: 'Sudden Wilt Disease', scientific: 'Ceratocystis fimbriata', genus: 'Ceratocystis', family: 'Ceratocystidaceae', target: 'Vascular system (Xylem)', part: 'Trunk/Branches', type: 'Pathogen', hiding: 'Deep inside the vascular tissue', symptoms: 'Rapid wilting of the entire canopy. Leaves dry up but remain attached. Dark streaks/staining in the wood under the bark.', activity: 'N/A',
    lifecycle: 'Devastating vascular multiplier. Spores enter through wounds and multiply rapidly inside the tree\'s water-conducting vessels (xylem). It literally clogs the tree\'s plumbing. A completely healthy-looking mature tree can suddenly wilt and die entirely within 2 to 4 weeks.', symbiosis: 'Strongly vectored by Ambrosia beetles (Shot-hole borers).', control: 'Control borer insects. Bio-control: Streptomyces soil drench/paint. Bark-penetrant systemic fungicides (Propiconazole).',
    severity: 5, stages: ['All Stages'], ipm: ['Chemical', 'Biological', 'Cultural']
  },
  {
    id: 'white-root-disease', category: 'Fungi/Pathogens', common: 'White Root Disease', scientific: 'Rigidoporus microporus', genus: 'Rigidoporus', family: 'Basidiomycete', target: 'Main taproot, structural roots', part: 'Roots', type: 'Pathogen', hiding: 'Underground, spreading root-to-root', symptoms: 'Foliage suddenly yellows and drops. White, thread-like rhizomorphs tightly adhering to roots.', activity: 'N/A',
    lifecycle: 'Slow, silent, but lethal underground spreader. Does not rely heavily on spores; instead, thick white fungal threads (rhizomorphs) literally grow through the soil from infected dead wood to living durian roots. Can spread several meters a year underground undetected.', symbiosis: 'Common in orchards cleared from old rubber plantations.', control: 'Trenching to isolate infected trees. Bio-control: Trichoderma harzianum & Streptomyces bio-drench. Apply Hexaconazole.',
    severity: 5, stages: ['All Stages'], ipm: ['Physical', 'Biological', 'Chemical']
  },
  {
    id: 'pink-disease', category: 'Fungi/Pathogens', common: 'Pink Disease', scientific: 'Erythricium salmonicolor', genus: 'Erythricium', family: 'Corticiaceae', target: 'Bark of branches and forks', part: 'Trunk/Branches', type: 'Pathogen', hiding: 'Shaded, highly humid branch crotches', symptoms: 'Cobweb-like white mycelium turning into a pink/salmon-colored crust on bark. Causes branch girdling and dieback ("flagging").', activity: 'N/A',
    lifecycle: 'Rapid spreader during continuous monsoon rains. Spores are splashed by rain into dense, unpruned branch forks. The fungus grows a pink crust over the bark that girdles and kills the branch within weeks. Goes dormant during the dry season.', symbiosis: 'Thrives in overgrown, unpruned canopies.', control: 'Prune for airflow. Scrape affected bark and paint with Bordeaux mixture or Copper Hydroxide.',
    severity: 4, stages: ['Vegetative'], ipm: ['Cultural', 'Chemical']
  },
  {
    id: 'anthracnose', category: 'Fungi/Pathogens', common: 'Anthracnose', scientific: 'Colletotrichum zibethinum', genus: 'Colletotrichum', family: 'Glomerellaceae', target: 'Leaves, young shoots', part: 'Leaves', type: 'Pathogen', hiding: 'Dead leaves and twigs on orchard floor', symptoms: 'Brown necrotic spots on leaves with distinctive concentric rings or yellow halos. Leaf edge blights.', activity: 'N/A',
    lifecycle: 'Spreads rapidly when free water (dew or rain) is left standing on leaves. Spores require 12-24 hours of continuous leaf wetness to germinate. Can sweep through a flush wave in a matter of days if conditions remain overcast and wet.', symbiosis: 'Attacks trees weakened by stress or other pests.', control: 'Bio-control: Bacillus subtilis foliar spray creates a resilient shield. Foliar sprays of Azoxystrobin or Mancozeb.',
    severity: 3, stages: ['Vegetative'], ipm: ['Cultural', 'Biological', 'Chemical']
  },
  {
    id: 'leaf-blight', category: 'Fungi/Pathogens', common: 'Rhizoctonia Leaf Blight', scientific: 'Rhizoctonia solani', genus: 'Rhizoctonia', family: 'Ceratobasidiaceae', target: 'Seedlings, lower canopy leaves', part: 'Leaves', type: 'Pathogen', hiding: 'Soil surface, splashing onto lower leaves', symptoms: 'Irregular water-soaked lesions that rapidly expand, drying out to paper-like textures. Leaves may mat together.', activity: 'N/A',
    lifecycle: 'Extremely fast moving in dense, humid environments. Does not produce spores; spreads via physical mycelial growth over overlapping leaves. Can destroy a tightly packed polybag nursery in less than 3 days if untreated.', symbiosis: 'High risk in closely packed nurseries.', control: 'Elevate polybags off the soil. Preventative: Spray Bacillus velezensis & B. amyloliquefaciens. Outbreak: Synthetic knockdown (Pencycuron/Thifluzamide).',
    severity: 4, stages: ['Seedling'], ipm: ['Cultural', 'Chemical', 'Biological']
  },
  {
    id: 'bacterial-leaf-spot', category: 'Fungi/Pathogens', common: 'Bacterial Leaf Spot', scientific: 'Xanthomonas campestris', genus: 'Xanthomonas', family: 'Xanthomonadaceae', target: 'Leaves', part: 'Leaves', type: 'Bacterial', hiding: 'Leaf surface, splashing water', symptoms: 'Small, angular, water-soaked lesions on leaves that turn black with a yellow halo. Severe leaf drop in nurseries.', activity: 'N/A',
    lifecycle: 'Bacteria multiply exponentially (doubling every 20-30 minutes) in warm, wet weather. Spread heavily by overhead sprinkler irrigation and wind-driven rain. Enters the leaf through natural stomata or micro-wounds from wind whipping.', symbiosis: 'Enters through natural stomata or insect wounds.', control: 'Bio-control: Pseudomonas fluorescens & Bacillus subtilis foliar spray. Copper-based bactericides.',
    severity: 3, stages: ['Seedling', 'Vegetative'], ipm: ['Cultural', 'Biological', 'Chemical']
  },
  {
    id: 'algal-leaf-spot', category: 'Fungi/Pathogens', common: 'Algal Leaf Spot (Red Rust)', scientific: 'Cephaleuros virescens', genus: 'Cephaleuros', family: 'Algae', target: 'Mature leaves', part: 'Leaves', type: 'Parasitic Algae', hiding: 'Surface of older canopy leaves', symptoms: 'Raised, velvety, orange to rust-red circular spots on the upper surface of older leaves.', activity: 'N/A',
    lifecycle: 'Slow developer. Actually a parasitic green algae (turns orange when producing spores). Needs highly humid, stagnant air and weak tree vitality to establish. Wind and rain disperse the flagellated swimming spores. Rarely lethal, but chronically reduces photosynthesis.', symbiosis: 'N/A', control: 'Prune canopy to improve air circulation. Copper-based fungicide sprays provide excellent control.',
    severity: 2, stages: ['Vegetative', 'Post-Harvest'], ipm: ['Cultural', 'Chemical']
  },
  {
    id: 'sooty-mold', category: 'Fungi/Pathogens', common: 'Sooty Mold', scientific: 'Capnodium spp.', genus: 'Capnodium', family: 'Capnodiaceae', target: 'Leaves, fruit, stems', part: 'Leaves', type: 'Secondary Fungus', hiding: 'Covering plant surfaces coated in honeydew', symptoms: 'Thick, black, crusty or powdery soot covering the upper surface of leaves. Blocks sunlight, reducing photosynthesis and stunting growth.', activity: 'N/A',
    lifecycle: 'Multiplies instantly whenever sugary honeydew is present. The fungus itself DOES NOT infect the plant; it only feeds on the insect waste. It will continue to spread rapidly as long as aphids, whiteflies, or scales are producing honeydew.', symbiosis: 'Directly linked to infestations of aphids, mealybugs, whiteflies, or soft scales.', control: 'Eradicate sap-sucking insects. Bio-control: Lecanicillium lecanii actively feeds on the honeydew directly.',
    severity: 2, stages: ['Vegetative', 'Fruiting'], ipm: ['Chemical', 'Biological', 'Cultural']
  },

  // VERTEBRATES (WILDLIFE)
  {
    id: 'civet', category: 'Verteater', common: 'Asian Palm Civet (Musang)', scientific: 'Paradoxurus hermaphroditus', genus: 'Paradoxurus', family: 'Viverridae', target: 'Ripe fruits on the tree', part: 'Fruit/Flower', type: 'Scavenging', hiding: 'Canopy, adjacent forests', symptoms: 'A nocturnal raider that targets premium ripe fruits (e.g., Musang King). Chews precise holes into the husk to eat the aril.', activity: 'Nocturnal',
    lifecycle: 'Breeds year-round with 2-4 young per litter. The primary threat isn\'t sheer numbers, but learned behavior. A civet is highly intelligent and will habitually return to the exact same high-value trees every single night once the fruit scent peaks.', symbiosis: 'N/A', control: 'Install zinc trunk wraps to prevent climbing. Nocturnal guard dogs.',
    severity: 5, stages: ['Fruiting'], ipm: ['Physical']
  },
  {
    id: 'macaque', category: 'Verteater', common: 'Long-tailed Macaque', scientific: 'Macaca fascicularis', genus: 'Macaca', family: 'Cercopithecidae', target: 'Fruit, whole branches', part: 'Fruit/Flower', type: 'Destructive', hiding: 'Adjacent forest borders', symptoms: 'Broken branches, half-eaten fruits thrown to the ground, severe mechanical damage to the tree architecture.', activity: 'Diurnal',
    lifecycle: 'Live in highly social, learned troops of 20-50 individuals. Reproduction is slow (1 infant per female annually), but their collective intelligence makes them a severe threat. They communicate weaknesses in orchard defenses and raid systematically during the day.', symbiosis: 'N/A', control: 'High-voltage agricultural perimeter electric fencing. Guard dogs. Active human wardens during harvest.',
    severity: 5, stages: ['Fruiting'], ipm: ['Physical']
  },
  {
    id: 'plantain-squirrel', category: 'Verteater', common: 'Plantain Squirrel', scientific: 'Callosciurus notatus', genus: 'Callosciurus', family: 'Sciuridae', target: 'Maturing / Ripe Fruit', part: 'Fruit/Flower', type: 'Chewing', hiding: 'Upper canopy, tree hollows', symptoms: 'Circular holes chewed directly into the durian husk to extract the sweet aril and seeds. Total fruit loss.', activity: 'Diurnal',
    lifecycle: 'Breeds constantly throughout the year (litters of 2-4). Extremely agile and persistent. Populations can build up significantly if adjacent jungle is disturbed or if the orchard lacks natural predators like raptors or snakes.', symbiosis: 'N/A', control: 'Wrap trunks with 1-meter wide smooth zinc/aluminum sheets to prevent climbing.',
    severity: 4, stages: ['Fruiting'], ipm: ['Physical']
  },
  {
    id: 'porcupine', category: 'Verteater', common: 'Malayan Porcupine', scientific: 'Hystrix brachyura', genus: 'Hystrix', family: 'Hystricidae', target: 'Bark of young trees, roots', part: 'Trunk/Branches', type: 'Gnawing', hiding: 'Underground burrows, active at night', symptoms: 'Gnawing damage around the base of young trunks, often girdling and killing the sapling. Digging around roots.', activity: 'Nocturnal',
    lifecycle: 'Slow breeders (1-2 young per year). Solitary or small family groups. They forage at night by smell. While numbers remain low, a single foraging porcupine can effectively kill several expensive saplings in one night by ring-barking them.', symbiosis: 'N/A', control: 'Heavy-duty wire mesh wraps around the base of young trees. Sturdy perimeter fencing.',
    severity: 4, stages: ['Seedling', 'Vegetative'], ipm: ['Physical']
  },
  {
    id: 'wild-boar', category: 'Verteater', common: 'Wild Boar', scientific: 'Sus scrofa', genus: 'Sus', family: 'Suidae', target: 'Fallen fruit, roots, saplings', part: 'Roots', type: 'Scavenging', hiding: 'Dense underbrush, ravines', symptoms: 'Deep rooting damage around the base of trees. Consumption of valuable fallen fruits.', activity: 'Nocturnal',
    lifecycle: 'Prolific breeders for large mammals. Sows can have 2 litters a year of up to 10 piglets. Massive population spikes occur during the durian fruiting season. Their deep rooting destroys surface feeder roots and invites fungal rot.', symbiosis: 'Rooting damage exposes roots to Phytophthora infections.', control: 'Stout, buried chain-link fencing or heavy gauge pig-wire. Perimeter trenching.',
    severity: 4, stages: ['All Stages'], ipm: ['Physical']
  },
  {
    id: 'elephant', category: 'Verteater', common: 'Asian Elephant', scientific: 'Elephas maximus', genus: 'Elephas', family: 'Elephantidae', target: 'Whole trees, saplings, infrastructure', part: 'General', type: 'Destructive', hiding: 'Deep forest reserves', symptoms: 'Catastrophic structural damage. Trunks snapped, saplings uprooted, irrigation pipes crushed.', activity: 'Nocturnal',
    lifecycle: 'Extremely slow breeders, but travel in herds. The threat is based on historic migratory corridors. If your durian orchard blocks a traditional jungle path, a passing herd will inflict catastrophic, permanent structural damage to trees and infrastructure in minutes.', symbiosis: 'N/A', control: 'Heavy-duty electric elephant fencing (high voltage). Deep perimeter trenches. Department of Wildlife intervention.',
    severity: 5, stages: ['All Stages'], ipm: ['Physical']
  },
  {
    id: 'field-rat', category: 'Verteater', common: 'Field Rat', scientific: 'Rattus tiomanicus', genus: 'Rattus', family: 'Muridae', target: 'Fallen fruit, seeds', part: 'Fruit/Flower', type: 'Gnawing', hiding: 'Weed thickets, underbrush', symptoms: 'Chewed husks on the ground, contamination of harvest collection areas.', activity: 'Nocturnal',
    lifecycle: 'Explosive multipliers. A female can have 4-6 litters a year with up to 10 pups each. Populations surge rapidly just as the fruit starts to drop. Without baiting or natural predators (owls/snakes), rats will consume or contaminate a massive percentage of dropped fruit.', symbiosis: 'Attracts snakes into the orchard.', control: 'Maintain clean orchard floor. Deploy rodenticide bait stations inside PVC pipes.',
    severity: 3, stages: ['Fruiting'], ipm: ['Cultural', 'Chemical']
  },
  {
    id: 'sun-bear', category: 'Verteater', common: 'Malayan Sun Bear', scientific: 'Helarctos malayanus', genus: 'Helarctos', family: 'Ursidae', target: 'Ripe Fruit, Tree Trunks', part: 'Trunk/Branches', type: 'Tearing', hiding: 'Deep primary/secondary forest', symptoms: 'Massive claw marks carved into the trunk. Husks violently torn apart.', activity: 'Nocturnal',
    lifecycle: 'Very slow breeders (1 cub every few years) and highly solitary. Extremely rare, but highly motivated by the smell of ripe durian. Their massive claws cause deep, permanent wounds to mature trunks as they climb up to rip fruits down.', symbiosis: 'N/A', control: 'Electric fencing. Totally protected species under Perhilitan (Do not trap/shoot).',
    severity: 4, stages: ['Fruiting'], ipm: ['Physical']
  },

  // MOLLUSCS
  {
    id: 'giant-african-snail', category: 'Molluscs', common: 'Giant African Snail', scientific: 'Lissachatina fulica', genus: 'Lissachatina', family: 'Achatinidae', target: 'Seedlings, tender bark, lower leaves', part: 'Leaves', type: 'Rasping', hiding: 'Under damp leaf litter', symptoms: 'Large, irregular holes chewed in lower leaves. Bark rasped off young saplings. Distinctive slime trails.', activity: 'Nocturnal',
    lifecycle: 'Hermaphroditic and incredibly prolific. A single snail lays up to 1,200 eggs per year. They estivate (sleep) deep in soil during dry weather and erupt in massive swarms after heavy monsoon rains, capable of stripping young saplings bare overnight.', symbiosis: 'Carrier of plant pathogens.', control: 'Hand-picking at night. Clear weed thickets. Apply Metaldehyde or Iron Phosphate slug pellets.',
    severity: 3, stages: ['Seedling'], ipm: ['Cultural', 'Chemical']
  },
  {
    id: 'slugs', category: 'Molluscs', common: 'Orchard Slugs', scientific: 'Deroceras spp.', genus: 'Deroceras', family: 'Agriolimacidae', target: 'Seedlings, low foliage', part: 'Leaves', type: 'Rasping', hiding: 'Under mulch, damp soil', symptoms: 'Similar to snails but no shell. Irregular holes in leaves of young saplings, shiny slime trails.', activity: 'Nocturnal',
    lifecycle: 'Fast breeders in persistent wet conditions. Lays 30-50 eggs at a time in damp soil crevices. They emerge only at night or during heavy overcast rain. Heavy organic mulch placed directly against the trunk guarantees a massive population explosion.', symbiosis: 'N/A', control: 'Reduce heavy mulching directly against the trunk. Apply Metaldehyde or Iron Phosphate bait.',
    severity: 2, stages: ['Seedling'], ipm: ['Cultural', 'Chemical']
  },

  // WEEDS & EPIPHYTES
  {
    id: 'dragons-scale-fern', category: 'Weeds/Epiphytes', common: "Dragon's Scale Fern (Pokok Duit-Duit)", scientific: 'Pyrrosia piloselloides', genus: 'Pyrrosia', family: 'Polypodiaceae', target: 'Main trunks and large branches', part: 'Trunk/Branches', type: 'Epiphyte', hiding: 'Creeping tightly along the bark', symptoms: 'Thick, coin-shaped fleshy leaves creeping along branches. Traps moisture against the bark, creating a perfect breeding ground for Phytophthora and Pink Disease. Hides borer holes.', activity: 'Continuous',
    lifecycle: 'Spreads via wind-blown spores and creeping rhizomes. It is an epiphyte (uses the tree for support, not to suck sap), but a heavy infestation suffocates the bark and adds massive water weight during heavy rains, potentially snapping structural branches.', symbiosis: 'Traps moisture, directly facilitating Phytophthora, Pink Disease, and hiding borer damage.', control: 'Manual removal using a wire brush or high-pressure water jet. Do NOT use systemic herbicides on the bark. After scraping, spray/paint the bark with a heavy Copper Fungicide wash to kill remaining rhizomes and sanitize the bark.',
    severity: 2, stages: ['Vegetative', 'Post-Harvest'], ipm: ['Physical', 'Chemical']
  },
  {
    id: 'green-trunk-algae', category: 'Weeds/Epiphytes', common: 'Green Trunk Algae', scientific: 'Pleurococcus spp.', genus: 'Pleurococcus', family: 'Pleurococcaceae', target: 'Main trunks, shaded bark', part: 'Trunk/Branches', type: 'Epiphyte / Algae', hiding: 'Damp, heavily shaded sides of the tree trunk', symptoms: 'Thick, powdery or crusty bright green layer coating the bark. Turns vibrant green immediately after rain.', activity: 'Continuous',
    lifecycle: 'Thrives in overgrown orchards with poor canopy airflow and dense shade. While it is non-parasitic, it acts like a permanent wet sponge against the trunk. This trapped moisture softens the bark and creates the ultimate breeding ground for deadly Phytophthora Patch Canker.', symbiosis: 'Directly Raw moisture, facilitating Phytophthora and bark decay fungi by keeping the wood permanently wet.', control: 'Prune the canopy for sunlight. Lightly brush thick layers. Paint/spray the trunk with Copper Oxychloride OR apply biological microbes (Bacillus velezensis / B. amyloliquefaciens) to organically break down and outcompete the algae.',
    severity: 2, stages: ['All Stages'], ipm: ['Cultural', 'Physical', 'Chemical', 'Biological']
  }
];

// --- MOA DATA ENRICHMENT (IRAC & FRAC CODES) ---
const PEST_MOA_MAPPING = {
  'paper-wasp': 'IRAC 3A (Aerosol Pyrethroids) 🔄 Physical (Long Pole Knockdown)',
  'hornet': 'Physical (Smoke/Fire) 🔄 IRAC 3A (Aerosol Pyrethroids) 🔄 Physical (Yellow Sticky Board) 🔄 Cultural (Brush Clearing)',
  'night-wasp': 'Physical (Daytime Eradication) 🔄 IRAC 3A (Aerosol Pyrethroids) 🔄 Physical (Red-Filter Lights)',
  'thrips-nymph': 'IRAC 5 (Spinosyns) 🔄 IRAC 6 (Avermectins) 🔄 IRAC 4A+3A (Premix) 🔄 Bio (I. fumosorosea)',
  'thrips-adult': 'IRAC 5 (Spinosyns) 🔄 IRAC 6 (Avermectins) 🔄 IRAC 4A+3A (Premix) 🔄 Bio (I. fumosorosea)',
  'aphid-nymph': 'IRAC 4A+3A (Premix) 🔄 IRAC 29 (Flonicamid) 🔄 Bio (L. lecanii) 🔄 IRAC UN (Neem Oil)',
  'aphid-adult': 'IRAC 4A+3A (Premix) 🔄 IRAC 29 (Flonicamid) 🔄 Bio (L. lecanii) 🔄 IRAC 4C (Sulfoxaflor)',
  'whitefly-nymph': 'IRAC 7C (Pyriproxyfen) 🔄 IRAC 16 (Buprofezin) 🔄 Bio (I. fumosorosea) 🔄 IRAC 23 (Spirotetramat)',
  'whitefly-adult': 'IRAC 7C (Pyriproxyfen) 🔄 Bio (I. fumosorosea) 🔄 IRAC 23 (Spiromesifen) 🔄 IRAC UN (White Oil)',
  'durian-pit-scale-crawler': 'IRAC 16 (Buprofezin) 🔄 IRAC 23 (Spirotetramat) 🔄 Bio (B. bassiana) 🔄 IRAC UN (White Oil)',
  'durian-pit-scale-adult': 'IRAC 23 (Spirotetramat) 🔄 IRAC 16 (Buprofezin) 🔄 Bio (B. bassiana) 🔄 IRAC UN (White Oil)',
  'soft-scale': 'IRAC 16 (Buprofezin) 🔄 IRAC 23 (Spirotetramat) 🔄 Bio (B. bassiana) 🔄 IRAC UN (Neem Oil)',
  'psyllid-nymph': 'IRAC 4A (Thiamethoxam) 🔄 Bio (L. lecanii) 🔄 IRAC 23 (Spirotetramat) 🔄 IRAC UN (White Oil)',
  'psyllid-adult': 'IRAC 4A (Thiamethoxam) 🔄 IRAC 3A (Pyrethroids) 🔄 Bio (L. lecanii) 🔄 IRAC 9B (Pymetrozine)',
  'green-leafhopper-nymph': 'IRAC 4A+3A (Premix) 🔄 IRAC 9B (Pymetrozine) 🔄 Bio (L. lecanii) 🔄 IRAC UN (Insecticidal Soap)',
  'green-leafhopper-adult': 'IRAC 4A+3A (Premix) 🔄 IRAC 9B (Pymetrozine) 🔄 IRAC 3A (Pyrethroids) 🔄 Bio (L. lecanii)',
  'durian-mealybug-crawler': 'IRAC 16 (Buprofezin) 🔄 IRAC 23 (Spirotetramat) 🔄 Bio (B. bassiana) 🔄 IRAC UN (White Oil)',
  'durian-mealybug-adult': 'IRAC 23 (Spirotetramat) 🔄 Bio (B. bassiana) 🔄 IRAC 4A (Imidacloprid) 🔄 IRAC UN (White Oil)',
  'coffee-mealybug': 'IRAC 16 (Buprofezin) 🔄 Bio (B. bassiana) 🔄 IRAC 4A (Acetamiprid) 🔄 IRAC UN (Neem Oil)',
  'leaf-footed-bug': 'IRAC 3A + FRAC 11 (Tank-Mix) 🔄 IRAC 4A+3A (Premix) 🔄 IRAC 4C (Sulfoxaflor) 🔄 IRAC 28 (Diamides)',
  'stink-bug': 'IRAC 3A (Pyrethroids) 🔄 IRAC 4A+3A (Premix) 🔄 IRAC 4C (Sulfoxaflor) 🔄 IRAC 28 (Diamides)',
  'weaver-ant': 'IRAC 3A (Cypermethrin) 🔄 IRAC 2B (Fipronil) 🔄 IRAC 20B (Hydramethylnon) 🔄 IRAC 4A (Imidacloprid)',
  'crazy-ant': 'IRAC 2B (Fipronil) 🔄 IRAC 20B (Hydramethylnon) 🔄 IRAC 3A (Cypermethrin) 🔄 IRAC 4A (Imidacloprid)',
  'coconut-rhino-beetle-grub': 'Bio (Metarhizium) 🔄 IRAC 3A (Cypermethrin) 🔄 IRAC 4A (Imidacloprid) 🔄 IRAC 28 (Diamides)',
  'coconut-rhino-beetle-adult': 'Bio (Metarhizium) 🔄 IRAC 3A (Cypermethrin) 🔄 IRAC 4A (Imidacloprid) 🔄 IRAC 28 (Diamides)',
  'malaysian-rhino-beetle-adult': 'Bio (Metarhizium) 🔄 IRAC 3A (Cypermethrin) 🔄 IRAC 4A (Imidacloprid) 🔄 IRAC 28 (Diamides)',
  'durian-fruit-borer-caterpillar': 'IRAC 5 (Spinetoram) 🔄 IRAC 28 (Diamides) 🔄 IRAC 28+4A (Premix) 🔄 Bio (N. rileyi)',
  'durian-fruit-borer-moth': 'IRAC 5 (Spinetoram) 🔄 IRAC 3A (Cypermethrin) 🔄 IRAC 28 (Diamides) 🔄 Bio (B. bassiana)',
  'durian-seed-borer-caterpillar': 'IRAC 5 (Spinetoram) 🔄 IRAC 28 (Diamides) 🔄 IRAC 28+4A (Premix) 🔄 Bio (N. rileyi)',
  'fruit-fly-maggot': 'IRAC 28 (Cyantraniliprole) 🔄 IRAC 5 (Spinosad) 🔄 IRAC 3A (Pyrethroids) 🔄 IRAC UN (Neem)',
  'fruit-fly-adult': 'IRAC 28 (Cyantraniliprole) 🔄 IRAC 5 (Spinosad Bait) 🔄 IRAC 3A (Pyrethroids) 🔄 Bio (B. bassiana)',
  'sap-beetle': 'IRAC 3A (Pyrethroids) 🔄 Bio (B. bassiana) 🔄 IRAC 5 (Spinetoram) 🔄 IRAC 22A (Indoxacarb)',
  'rind-borer': 'IRAC 5 (Spinetoram) 🔄 IRAC 22A (Indoxacarb) 🔄 IRAC 28 (Diamides) 🔄 Bio (N. rileyi)',
  'peach-moth': 'IRAC 28 (Diamides) 🔄 IRAC 22A (Indoxacarb) 🔄 IRAC 5 (Spinetoram) 🔄 Bio (N. rileyi)',
  'mango-stem-borer-larva': 'IRAC 28+4A (Premix) 🔄 IRAC 28 (Chlorantraniliprole) 🔄 IRAC 4A (Imidacloprid) 🔄 IRAC 3A (Cypermethrin)',
  'mango-stem-borer-adult': 'IRAC 28+4A (Premix) 🔄 Bio (B. bassiana) 🔄 IRAC 28 (Chlorantraniliprole) 🔄 IRAC 3A (Cypermethrin)',
  'pinhole-borer': 'FRAC 3 + IRAC 3A (Tank-Mix) 🔄 Bio (B. bassiana) 🔄 IRAC 4A+3A (Premix) 🔄 IRAC 28 (Cyantraniliprole)',
  'ambrosia-beetle': 'FRAC 3 + IRAC 28 (Tank-Mix) 🔄 Bio (B. bassiana) 🔄 IRAC 3A (Pyrethroids) 🔄 IRAC 4A+3A (Premix)',
  'red-branch-borer': 'IRAC 3A (Cypermethrin) 🔄 IRAC 28 (Chlorantraniliprole) 🔄 IRAC 5 (Spinetoram) 🔄 Bio (B. bassiana)',
  'clearwing-moth': 'IRAC 3A + FRAC P07 (Tank-Mix) 🔄 Bio (B. bassiana) 🔄 IRAC 28 (Diamides) 🔄 FRAC M01 (Copper Paint)',
  'bark-eating-caterpillar': 'IRAC 3A (Deltamethrin) 🔄 IRAC 5 (Spinosad) 🔄 Bio (N. rileyi) 🔄 Bio (B. bassiana)',
  'subterranean-termite': 'IRAC 2B (Fipronil) 🔄 IRAC 4A (Imidacloprid) 🔄 IRAC 3A (Bifenthrin) 🔄 Bio (Metarhizium)',
  'bagworm': 'Bio (N. rileyi) 🔄 IRAC 5 (Spinetoram) 🔄 IRAC 28 (Diamides) 🔄 IRAC 4A+3A (Premix)',
  'chafer-beetle-grub': 'IRAC 4A (Imidacloprid) 🔄 IRAC 2B (Fipronil) 🔄 IRAC 3A (Bifenthrin) 🔄 Bio (Metarhizium)',
  'chafer-beetle-adult': 'IRAC 4A+3A (Premix) 🔄 IRAC 4A (Neonics) 🔄 Bio (B. bassiana) 🔄 IRAC 22A (Indoxacarb)',
  'rose-chafer': 'IRAC 4A+3A (Premix) 🔄 Bio (B. bassiana) 🔄 IRAC 5 (Spinetoram) 🔄 IRAC 22A (Indoxacarb)',
  'gold-dust-weevil-grub': 'IRAC 4A (Imidacloprid) 🔄 IRAC 2B (Fipronil) 🔄 Bio (Metarhizium) 🔄 IRAC 3A (Bifenthrin)',
  'gold-dust-weevil-adult': 'IRAC 4A+3A (Premix) 🔄 Bio (B. bassiana) 🔄 IRAC 4A (Neonics) 🔄 IRAC 22A (Indoxacarb)',
  'valanga-grasshopper-nymph': 'IRAC UN (Azadirachtin) 🔄 IRAC 3A (Pyrethroids) 🔄 IRAC 5 (Spinosad) 🔄 Bio (Bt)',
  'valanga-grasshopper-adult': 'IRAC 4A+3A (Premix) 🔄 IRAC 22A (Indoxacarb) 🔄 IRAC 5 (Spinosad) 🔄 Bio (B. bassiana)',
  'durian-leafroller': 'Bio (N. rileyi) 🔄 IRAC 5 (Spinetoram) 🔄 IRAC 28 (Diamides) 🔄 IRAC 28+4A (Premix)',
  'tussock-moth': 'IRAC 22A (Indoxacarb) 🔄 Bio (N. rileyi) 🔄 IRAC 5 (Spinetoram) 🔄 Bio (B. bassiana)',
  'durian-hawk-moth': 'IRAC 22A (Indoxacarb) 🔄 Bio (Bt) 🔄 IRAC 5 (Spinetoram) 🔄 IRAC 28+4A (Premix)',
  'african-red-mite': 'IRAC 21A (Fenpyroximate) 🔄 IRAC 23 (Spiromesifen) 🔄 Bio (H. thompsonii) 🔄 IRAC 6 (Abamectin)',
  'oriental-red-mite': 'IRAC 21A (Fenpyroximate) 🔄 IRAC 23 (Spiromesifen) 🔄 Bio (H. thompsonii) 🔄 IRAC 6 (Abamectin)',
  'broad-mite': 'IRAC 6 (Abamectin) 🔄 Bio (H. thompsonii) 🔄 IRAC 21A (Fenpyroximate) 🔄 IRAC 12A (Propargite)',
  'eriophyid-mite': 'IRAC UN (Wettable Sulfur) 🔄 IRAC 6 (Abamectin) 🔄 Bio (H. thompsonii) 🔄 IRAC 21A (Fenpyroximate)',
  'root-knot-nematode': 'IRAC 30 (Fluopyram) 🔄 Bio (P. lilacinum) 🔄 IRAC 6 (Abamectin) 🔄 Bio (Trichoderma)',
  'lesion-nematode': 'IRAC 30 (Fluopyram) 🔄 Bio (P. lilacinum) 🔄 IRAC 6 (Abamectin) 🔄 Bio (Trichoderma)',
  'phytophthora': 'FRAC P07 (Phosphonates) 🔄 Bio (P. fluorescens) 🔄 FRAC 21 (Cyazofamid) 🔄 FRAC 4+M03 (Metalaxyl+Mancozeb)',
  'black-mildew': 'FRAC 11+3 (Azoxystrobin+Difenoconazole) 🔄 Bio (B. subtilis) 🔄 FRAC M01 (Copper) 🔄 FRAC M03 (Mancozeb)',
  'fusicoccum-canker': 'FRAC 3 (Tebuconazole) 🔄 Bio (Streptomyces) 🔄 FRAC M01 (Copper) 🔄 FRAC M03 (Mancozeb)',
  'twig-blight': 'FRAC M03 (Mancozeb) 🔄 Bio (B. subtilis) 🔄 FRAC 11 (Azoxystrobin) 🔄 FRAC M01 (Copper)',
  'pythium-rot': 'FRAC P07 (Phosphonates) 🔄 Bio (P. fluorescens) 🔄 FRAC 14 (Etridiazole) 🔄 FRAC 28 (Propamocarb)',
  'lasiodiplodia': 'FRAC 3 (Prochloraz) 🔄 Bio (Streptomyces) 🔄 FRAC 11+3 (Premix) 🔄 FRAC M01 (Copper)',
  'ceratocystis': 'FRAC 3 (Propiconazole) 🔄 Bio (Streptomyces) 🔄 FRAC 11+3 (Premix) 🔄 FRAC M03 (Mancozeb)',
  'white-root-disease': 'FRAC 3 (Hexaconazole) 🔄 Bio (Streptomyces) 🔄 FRAC 11+3 (Premix) 🔄 FRAC M01 (Copper)',
  'pink-disease': 'FRAC M01 (Copper Hydroxide) 🔄 Bio (B. subtilis) 🔄 FRAC 11+3 (Premix) 🔄 FRAC M03 (Mancozeb)',
  'anthracnose': 'FRAC 11+3 (Azoxystrobin+Difenoconazole) 🔄 Bio (B. subtilis) 🔄 FRAC M01 (Copper) 🔄 FRAC M03 (Mancozeb)',
  'leaf-blight': 'FRAC 20 (Pencycuron) 🔄 FRAC 7 (Thifluzamide) 🔄 Bio (B. velezensis) 🔄 Bio (B. amyloliquefaciens)',
  'bacterial-leaf-spot': 'FRAC M01 (Copper) 🔄 Antibiotic (Kasugamycin) 🔄 Bio (P. fluorescens) 🔄 Bio (B. subtilis)',
  'algal-leaf-spot': 'FRAC M01 (Copper) 🔄 Bio (B. subtilis) 🔄 FRAC 11+3 (Premix) 🔄 FRAC 11 (Azoxystrobin)',
  'sooty-mold': 'FRAC M01 (Copper) 🔄 Bio (L. lecanii) 🔄 IRAC 16 (Buprofezin) 🔄 IRAC UN (White Oil)',
  'field-rat': 'RRAC (Bromadiolone) 🔄 RRAC (Brodifacoum) 🔄 RRAC (Cholecalciferol) 🔄 RRAC (Zinc Phosphide)',
  'giant-african-snail': 'Molluscicide (Metaldehyde) 🔄 Iron Phosphate 🔄 Niclosamide 🔄 Physical (Copper Tape)',
  'slugs': 'Molluscicide (Metaldehyde) 🔄 Iron Phosphate 🔄 Niclosamide 🔄 Physical (Copper Tape)',
  'dragons-scale-fern': 'Physical (Wire Brush) 🔄 High-Pressure Water 🔄 FRAC M01 (Copper Wash)',
  'green-trunk-algae': 'Cultural (Sunlight) 🔄 Bio (B. velezensis) 🔄 FRAC M01 (Copper Wash) 🔄 Bio (B. amyloliquefaciens)'
};

// --- SPRAY TARGET ENRICHMENT ---
const PEST_APPLICATION_MAPPING = {
  'paper-wasp': 'Direct Nest Spray (Strictly at Night)',
  'hornet': 'Heavy Aerosol/Smoke (Strictly at Night with PPE)',
  'night-wasp': 'Direct Nest Spray (Strictly during DAYLIGHT)',
  'thrips-nymph': 'Foliar Spray (Canopy & Flower Buds)',
  'thrips-adult': 'Foliar Spray (Canopy & Flower Clusters)',
  'aphid-nymph': 'Foliar Spray (New Shoots & Terminals)',
  'aphid-adult': 'Foliar Spray (New Flushes)',
  'whitefly-nymph': 'Foliar Spray (Strictly Underside of Leaves)',
  'whitefly-adult': 'Foliar Spray (Canopy & Undersides)',
  'durian-pit-scale-crawler': 'Foliar Spray (Twigs & Leaf Veins)',
  'durian-pit-scale-adult': 'Trunk/Branch Heavy Spray + Penetrant',
  'soft-scale': 'Foliar Spray (Underside of Leaves)',
  'psyllid-nymph': 'Foliar Spray (Target Expanding Leaves)',
  'psyllid-adult': 'Foliar Spray (Canopy Perimeter)',
  'green-leafhopper-nymph': 'Foliar Spray (Young Leaf Margins)',
  'green-leafhopper-adult': 'Foliar Spray (Broad Canopy)',
  'durian-mealybug-crawler': 'Foliar/Branch Spray (Focus on Crevices)',
  'durian-mealybug-adult': 'Targeted Fruit Husk & Branch Axil Spray',
  'coffee-mealybug': 'Soil Drench & Lower Canopy Spray',
  'leaf-footed-bug': 'Targeted Developing Fruit Spray',
  'stink-bug': 'Foliar & Fruit Cluster Spray',
  'weaver-ant': 'Targeted Nest Spray & Trunk Base',
  'crazy-ant': 'Trunk Base Spray & Ground Bait Stations',
  'coconut-rhino-beetle-grub': 'Compost/Mulch Soil Drench',
  'coconut-rhino-beetle-adult': 'Crown/Shoot Spray',
  'malaysian-rhino-beetle-adult': 'Crown/Shoot Spray',
  'durian-fruit-borer-caterpillar': 'Targeted Fruit Spray (Early Stage Only)',
  'durian-fruit-borer-moth': 'High Canopy Spray',
  'durian-seed-borer-caterpillar': 'Targeted Fruit Spray (Early Stage)',
  'fruit-fly-maggot': 'Ground Sanitation / No Spray',
  'fruit-fly-adult': 'Protein Bait Spray (Orchard Perimeter Trunks)',
  'sap-beetle': 'Targeted Split/Cracked Fruit',
  'rind-borer': 'Targeted Fruit Husk Spray',
  'peach-moth': 'Targeted Fruit Cluster Spray',
  'mango-stem-borer-larva': 'Direct Injection into Boreholes + Bark Paint',
  'mango-stem-borer-adult': 'Trunk & Branch Bark Spray',
  'pinhole-borer': 'Systemic Trunk/Bark Spray',
  'ambrosia-beetle': 'Systemic Trunk/Bark Spray',
  'red-branch-borer': 'Direct Injection into Boreholes',
  'clearwing-moth': 'Trunk Bark Scrape & Spray/Paint',
  'bark-eating-caterpillar': 'Spot Spray on Frass Galleries',
  'subterranean-termite': 'Heavy Soil Drench at Trunk Base',
  'bagworm': 'Foliar Spray (Full Canopy)',
  'chafer-beetle-grub': 'Root Zone Soil Drench',
  'chafer-beetle-adult': 'Foliar Spray (Late Evening Application)',
  'rose-chafer': 'Foliar Spray (Late Evening Application)',
  'gold-dust-weevil-grub': 'Root Zone Soil Drench',
  'gold-dust-weevil-adult': 'Foliar Spray (Canopy)',
  'valanga-grasshopper-nymph': 'Lower Canopy Foliar Spray',
  'valanga-grasshopper-adult': 'Foliar Spray (Early Morning)',
  'durian-leafroller': 'Foliar Spray (Focus on Folded Leaves)',
  'tussock-moth': 'Foliar Spray (Broad Canopy)',
  'durian-hawk-moth': 'Foliar Spray (Broad Canopy)',
  'african-red-mite': 'Foliar Spray (Upper Surface of Leaves)',
  'oriental-red-mite': 'Foliar Spray (Upper Surface of Leaves)',
  'broad-mite': 'Foliar Spray (Apical Meristem / Shoot Tips)',
  'eriophyid-mite': 'Foliar Spray (New Flush/Galls)',
  'root-knot-nematode': 'Root Zone Soil Drench',
  'lesion-nematode': 'Root Zone Soil Drench',
  'phytophthora': 'Systemic Trunk Spray & Soil Drench',
  'black-mildew': 'Foliar Spray (Canopy & Mature Leaves)',
  'fusicoccum-canker': 'Pruning Wound Paint & Branch Spray',
  'twig-blight': 'Foliar & Twig Spray',
  'pythium-rot': 'Nursery Polybag / Root Zone Drench',
  'lasiodiplodia': 'Trunk Wound Paint & Post-Harvest Dip',
  'ceratocystis': 'High-Pressure Trunk Bark Spray (No Drilling)',
  'white-root-disease': 'Root Trenching & Deep Soil Drench',
  'pink-disease': 'Branch Crotch Spray/Paint',
  'anthracnose': 'Foliar Spray (Broad Canopy)',
  'leaf-blight': 'Lower Canopy / Seedling Foliar Spray',
  'bacterial-leaf-spot': 'Foliar Spray (Canopy)',
  'algal-leaf-spot': 'Foliar Spray (Older Canopy Leaves)',
  'sooty-mold': 'Foliar Spray (Target underlying insects)',
  'field-rat': 'Bait Stations (Orchard Floor)',
  'giant-african-snail': 'Soil Broadcast (Pellets around base)',
  'slugs': 'Soil Broadcast (Pellets around base)',
  'dragons-scale-fern': 'Trunk Bark Scrape & Wash',
  'green-trunk-algae': 'Trunk Bark Wash / Paint'
};

// Inject MOA and Application into existing database safely
ALL_PESTS.forEach(pest => {
  pest.moa = PEST_MOA_MAPPING[pest.id] || 'N/A';
  pest.application = PEST_APPLICATION_MAPPING[pest.id] || 'Targeted Application';
});

// --- DT50 CHEMICAL LIFESPAN DATABASE ---
const DT50_DATABASE = [
  // Insecticides & Acaricides
  { name: 'Abamectin', moa: 'IRAC 6', foliar: '< 1 Day', soil: '14 - 28 Days', notes: 'Highly sensitive to UV. Must be sprayed late evening or with a UV-protectant adjuvant.', type: 'Insecticide' },
  { name: 'Acetamiprid', moa: 'IRAC 4A', foliar: '2 - 3 Days', soil: '1 - 8 Days', notes: 'Fastest degrading Neonicotinoid. Much safer for soil accumulation than Imidacloprid.', type: 'Insecticide' },
  { name: 'Bifenthrin', moa: 'IRAC 3A', foliar: '5 - 7 Days', soil: '70 - 120 Days', notes: 'Longest lasting pyrethroid in soil. Excellent for termite/chafer grub soil drenches.', type: 'Insecticide' },
  { name: 'Buprofezin', moa: 'IRAC 16', foliar: '4 - 7 Days', soil: '20 - 50 Days', notes: 'Stable vapor-phase chemical. Vapor action helps kill hidden nymphs.', type: 'Insecticide' },
  { name: 'Cartap hydrochloride', moa: 'IRAC 4', foliar: '3 - 5 Days', soil: '3 - 10 Days', notes: 'Highly systemic. Short environmental persistence, but highly toxic to aquatic life.', type: 'Insecticide' },
  { name: 'Chlorantraniliprole', moa: 'IRAC 28', foliar: '10 - 15 Days', soil: '100 - 300+ Days', notes: 'Highly Persistent. Do not use continuously as a soil drench to avoid permanent buildup.', type: 'Insecticide' },
  { name: 'Cyantraniliprole', moa: 'IRAC 28', foliar: '3 - 5 Days', soil: '14 - 60 Days', notes: 'Faster acting and faster degrading than Chlorantraniliprole. Better for foliar applications.', type: 'Insecticide' },
  { name: 'Cypermethrin', moa: 'IRAC 3A', foliar: '3 - 5 Days', soil: '14 - 30 Days', notes: 'Rapid knockdown, but degrades quickly in sunlight.', type: 'Insecticide' },
  { name: 'Deltamethrin', moa: 'IRAC 3A', foliar: '1 - 3 Days', soil: '10 - 40 Days', notes: 'Extremely fast knockdown. Degrades rapidly under UV. Highly toxic to bees.', type: 'Insecticide' },
  { name: 'Diafenthiuron', moa: 'IRAC 12A', foliar: '1 - 3 Days', soil: '1 - 2 Days', notes: 'Vapor action. It is a pro-insecticide that converts to its toxic form under sunlight.', type: 'Insecticide' },
  { name: 'Fipronil', moa: 'IRAC 2B', foliar: '1 - 2 Days', soil: '30 - 120 Days', notes: 'Breaks down rapidly in sunlight but binds tightly to soil organic matter for long-term termite control.', type: 'Insecticide' },
  { name: 'Flonicamid', moa: 'IRAC 29', foliar: '1 - 3 Days', soil: '1 - 3 Days', notes: 'Rapid degradation. Excellent for quick aphid control close to harvest.', type: 'Insecticide' },
  { name: 'Flupyradifurone', moa: 'IRAC 4D', foliar: '3 - 7 Days', soil: '60 - 120 Days', notes: 'Fast acting systemic. Generally safer profile for foraging bees compared to older Neonicotinoids.', type: 'Insecticide' },
  { name: 'Imidacloprid', moa: 'IRAC 4A', foliar: '3 - 5 Days', soil: '40 - 200+ Days', notes: 'Highly Persistent. Excellent systemic flow, but overusing as a soil drench will sterilize soil biology over time.', type: 'Insecticide' },
  { name: 'Indoxacarb', moa: 'IRAC 22A', foliar: '3 - 6 Days', soil: '14 - 30 Days', notes: 'Binds tightly to leaf wax. Highly rainfast once dried.', type: 'Insecticide' },
  { name: 'Lambda-cyhalothrin', moa: 'IRAC 3A', foliar: '2 - 4 Days', soil: '20 - 60 Days', notes: 'Broad-spectrum contact killer. Acts as a strong repellent to incoming pests.', type: 'Insecticide' },
  { name: 'Lufenuron', moa: 'IRAC 15', foliar: '14 - 21 Days', soil: '10 - 30 Days', notes: 'Chitin inhibitor. Highly rainfast and persistent on foliage for long-term caterpillar control.', type: 'Insecticide' },
  { name: 'Propargite', moa: 'IRAC 12A', foliar: '3 - 5 Days', soil: '40 - 70 Days', notes: 'Fumes in high heat (vapor action) to kill mites on leaf undersides.', type: 'Insecticide' },
  { name: 'Pymetrozine', moa: 'IRAC 9B', foliar: '2 - 4 Days', soil: '2 - 10 Days', notes: 'Breaks down rapidly in both plant and soil.', type: 'Insecticide' },
  { name: 'Pyriproxyfen', moa: 'IRAC 7C', foliar: '7 - 14 Days', soil: '10 - 30 Days', notes: 'Highly stable IGR. Long-lasting residual effect on eggs and pupae.', type: 'Insecticide' },
  { name: 'Spinetoram', moa: 'IRAC 5', foliar: '1 - 5 Days', soil: '20 - 30 Days', notes: 'More UV stable than Spinosad, giving longer caterpillar control in the canopy.', type: 'Insecticide' },
  { name: 'Spinosad', moa: 'IRAC 5', foliar: '0.5 - 2 Days', soil: '9 - 17 Days', notes: 'Degrades extremely fast in sunlight. Spray only at dusk.', type: 'Insecticide' },
  { name: 'Spiromesifen', moa: 'IRAC 23', foliar: '3 - 5 Days', soil: '5 - 10 Days', notes: 'Excellent translaminar movement before degrading.', type: 'Insecticide' },
  { name: 'Spirotetramat', moa: 'IRAC 23', foliar: '< 1 Day', soil: '14 - 21 Days', notes: 'Degrades instantly inside the leaf into an active enol, which flows systemically for weeks.', type: 'Insecticide' },
  { name: 'Sulfoxaflor', moa: 'IRAC 4C', foliar: '1 - 3 Days', soil: '1 - 4 Days', notes: 'Very rapid breakdown. Designed as a safer alternative to older Neonicotinoids.', type: 'Insecticide' },
  { name: 'Thiamethoxam', moa: 'IRAC 4A', foliar: '3 - 5 Days', soil: '25 - 100 Days', notes: 'More mobile in plant sap than Imidacloprid, but still relatively persistent in soil.', type: 'Insecticide' },
  
  // Fungicides & Bactericides
  { name: 'Azoxystrobin', moa: 'FRAC 11', foliar: '11 - 17 Days', soil: '50 - 100 Days', notes: 'Moves systemically. Good residual control against Anthracnose.', type: 'Fungicide' },
  { name: 'Benomyl', moa: 'FRAC 1', foliar: '1 - 2 Days', soil: '< 1 Day', notes: 'Degrades rapidly into Carbendazim. High resistance risk. Broad systemic action.', type: 'Fungicide' },
  { name: 'Bordeaux mixture', moa: 'FRAC M01', foliar: 'Infinite', soil: 'Infinite', notes: 'Traditional copper sulfate and lime mix. Very alkaline. Inorganic, accumulates permanently in soil.', type: 'Fungicide' },
  { name: 'Carbendazim', moa: 'FRAC 1', foliar: '3 - 7 Days', soil: '30 - 90 Days', notes: 'Common systemic fungicide. Very high risk of resistance if used without rotation.', type: 'Fungicide' },
  { name: 'Copper (Oxychloride/Hydroxide)', moa: 'FRAC M01', foliar: 'Infinite', soil: 'Infinite', notes: 'Inorganic Heavy Metal. Does NOT degrade. Washes off leaves and accumulates permanently. Can cause root toxicity.', type: 'Fungicide' },
  { name: 'Cyazofamid', moa: 'FRAC 21', foliar: '5 - 10 Days', soil: '3 - 6 Days', notes: 'Degrades quickly in soil. Safe for targeted Phytophthora/Pythium drenches.', type: 'Fungicide' },
  { name: 'Difenoconazole', moa: 'FRAC 3', foliar: '7 - 14 Days', soil: '50 - 150 Days', notes: 'Strong systemic. Persists well in woody tissue to stop cankers.', type: 'Fungicide' },
  { name: 'Etridiazole', moa: 'FRAC 14', foliar: 'N/A', soil: '10 - 20 Days', notes: 'Used strictly as a soil drench for Pythium. Volatilizes rapidly if left on soil surface.', type: 'Fungicide' },
  { name: 'Fosetyl-Aluminium', moa: 'FRAC P07', foliar: 'Variable', soil: '< 1 Day', notes: 'True two-way systemic. Rapidly degrades into phosphite in soil, triggering plant immunity.', type: 'Fungicide' },
  { name: 'Hexaconazole', moa: 'FRAC 3', foliar: '10 - 20 Days', soil: '50 - 150 Days', notes: 'Highly persistent in woody tissues. Excellent for treating White Root Disease.', type: 'Fungicide' },
  { name: 'Mancozeb', moa: 'FRAC M03', foliar: '1 - 3 Days', soil: '< 1 Day', notes: 'Contact only. Degrades extremely fast into ETU. Must be reapplied after heavy rains.', type: 'Fungicide' },
  { name: 'Metalaxyl-M (Mefenoxam)', moa: 'FRAC 4', foliar: '3 - 5 Days', soil: '15 - 40 Days', notes: 'Highly systemic upward. Target specific to Oomycetes (Phytophthora/Pythium).', type: 'Fungicide' },
  { name: 'Pencycuron', moa: 'FRAC 20', foliar: '3 - 7 Days', soil: '50 - 100 Days', notes: 'Strictly contact fungicide, specific to Rhizoctonia. Long lasting in soil.', type: 'Fungicide' },
  { name: 'Phosphonates (Phosphorous Acid)', moa: 'FRAC P07', foliar: 'Variable', soil: 'Variable', notes: 'Uniquely moves both up and down the tree. Is eventually oxidized by microbes into natural Phosphate fertilizer.', type: 'Fungicide' },
  { name: 'Prochloraz', moa: 'FRAC 3', foliar: '5 - 10 Days', soil: '10 - 40 Days', notes: 'Very fast-acting. Often used as a post-harvest fruit dip because it degrades relatively quickly.', type: 'Fungicide' },
  { name: 'Propiconazole', moa: 'FRAC 3', foliar: '7 - 14 Days', soil: '40 - 70 Days', notes: 'Fast systemic absorption, preventing wash-off by rain.', type: 'Fungicide' },
  { name: 'Propineb', moa: 'FRAC M03', foliar: '1 - 3 Days', soil: '15 - 30 Days', notes: 'Zinc-containing contact fungicide. Excellent for broad spectrum prevention.', type: 'Fungicide' },
  { name: 'Tebuconazole', moa: 'FRAC 3', foliar: '10 - 15 Days', soil: '50 - 100 Days', notes: 'Broad-spectrum systemic, highly effective on branch cankers (Fusicoccum).', type: 'Fungicide' },

  // Botanicals, Biologicals & Molluscicides
  { name: 'Azadirachtin (Neem Oil)', moa: 'Botanical', foliar: '1 - 2.5 Days', soil: '1 - 2 Days', notes: 'Highly sensitive to UV light and alkaline water. Will completely degrade within 48 hours.', type: 'Bio/Other' },
  { name: 'Bacillus spp.', moa: 'Biological', foliar: 'Weeks/Months', soil: 'Indefinite', notes: 'Living organism. Colonizes the plant/soil and can multiply, indefinitely extending its protective lifespan if conditions are right.', type: 'Bio/Other' },
  { name: 'Metarhizium / Trichoderma', moa: 'Biological', foliar: 'Weeks/Months', soil: 'Indefinite', notes: 'Spores require UV protection to germinate. Once established, they reproduce and persist naturally.', type: 'Bio/Other' },
  { name: 'Metaldehyde (Snail Bait)', moa: 'Molluscicide', foliar: 'N/A', soil: '3 - 10 Days', notes: 'Breaks down rapidly into acetic acid (vinegar) in damp soil. Highly sensitive to heat and moisture.', type: 'Bio/Other' },
  { name: 'Iron Phosphate', moa: 'Molluscicide', foliar: 'N/A', soil: 'Weeks', notes: 'Breaks down into natural iron and phosphate fertilizer. Very safe for the environment.', type: 'Bio/Other' }
];

// --- ACTIVITY ICON HELPER ---
const getActivityIcon = (act) => {
  if (!act || act === 'N/A') return 'dash';
  if (act.includes('Diurnal')) return 'sun';
  if (act.includes('Nocturnal')) return 'moon';
  if (act.includes('Crepuscular')) return 'sunset';
  if (act.includes('Continuous')) return 'clock';
  return 'info';
};

// --- MOBILITY TAG HELPER ---
const getMobilityTag = (code) => {
  // NEW: Detection for Physical and Cultural methodologies (Non-Chemical IPM)
  if (code.match(/(Physical|Sticky|Trap|Lamp|Zinc|Fence|Manual|Brush|Water|Smoke|Fire|Tape)/i)) 
    return { label: 'PHYSICAL METHOD', color: 'bg-sky-100 text-sky-800 border-sky-200' };
  if (code.match(/(Cultural|Pruning|Sanitation|Sunlight|Clearing|Slashing)/i)) 
    return { label: 'CULTURAL METHOD', color: 'bg-amber-100 text-amber-800 border-amber-200' };

  if (code.includes('+') || code.includes('Mix')) return { label: 'Mixed Mobility', color: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200' };
  if (code.match(/(23|P07)/i)) return { label: 'Two-Way Systemic', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' };
  if (code.match(/(4A|4C|28|29|9B|30|FRAC 3|FRAC 1\b|FRAC 7\b|Antibiotic)/i)) return { label: 'Systemic (Upward)', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
  if (code.match(/(IRAC 5|IRAC 6|FRAC 11|7C)/i)) return { label: 'Translaminar', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
  if (code.match(/(RRAC|Bait|Iron Phosphate)/i)) return { label: 'Bait / Barrier', color: 'bg-orange-100 text-orange-800 border-orange-200' };
  if (code.match(/(3A|1B|2B|20B|22A|21A|12A|16|M01|M03|FRAC 20|FRAC 14|Oil|Soap|Neem|Bt|Sulfur|Biological|Molluscicide|Niclosamide|Bio)/i)) return { label: 'Contact / Surface', color: 'bg-rose-100 text-rose-800 border-rose-200' };
  
  return { label: 'Action Tag', color: 'bg-slate-100 text-slate-700 border-slate-200' };
};

// --- 3-PHASE IPM PARSER ---
const getPhaseInfo = (phase, category) => {
  if (category === 'Fungi/Pathogens') {
      if (phase === 1) return { title: 'Phase 1: Eradicant', desc: 'Active Outbreak. Burn out active fungal lesions and halt sporulation instantly.', color: 'red' };
      if (phase === 2) return { title: 'Phase 2: Systemic Shield', desc: 'Consolidation. Absorb into vascular tissue to protect new flushes from internal spread.', color: 'amber' };
      if (phase === 3) return { title: 'Phase 3: Protectant', desc: 'Maintenance. Coat leaf surface with contact barriers or competitive bio-agents.', color: 'emerald' };
  }
  // Default Insects/Mites/Others
  if (phase === 1) return { title: 'Phase 1: Knockdown', desc: 'Red Alert. Instant population knockdown of active adults/swarms (Fast LT₅₀).', color: 'red' };
  if (phase === 2) return { title: 'Phase 2: Consolidation', desc: 'Orange Alert. Break the lifecycle, target hidden nymphs/eggs via systemics or IGRs.', color: 'amber' };
  if (phase === 3) return { title: 'Phase 3: Preventative', desc: 'Green Alert. Low population. Protect beneficials and establish biological barriers.', color: 'emerald' };
};

const categorizeMoa = (moaString, category) => {
  if (!moaString || moaString === 'N/A') return null;
  const items = moaString.split(' 🔄 ');
  const phases = { 1: [], 2: [], 3: [] };
  
  items.forEach(item => {
      if (item.match(/(Bio|Oil|Soap|Neem|Bt|Sulfur|Physical|Cultural|Molluscicide|M01|M03|Bait|Wash|Sunlight|Brush)/i)) {
          phases[3].push(item);
      } else if (category === 'Fungi/Pathogens') {
          if (item.match(/(FRAC 11|FRAC 3|Premix|P07|FRAC 21|FRAC 14|FRAC 20|FRAC 7)/i)) phases[1].push(item);
          else phases[2].push(item);
      } else {
          if (item.match(/(3A|1B|2B|5|6|22A|Premix|RRAC|Iron Phosphate)/i)) phases[1].push(item);
          else if (item.match(/(4A|4C|23|28|29|16|7C|9B|12A|21A|30|20B|Antibiotic)/i)) phases[2].push(item);
          else phases[1].push(item);
      }
  });

  // Fallbacks for better UI distribution if a phase is empty but we have multiple items
  if (phases[1].length === 0 && phases[2].length > 0) { phases[1].push(phases[2].shift()); }
  if (phases[2].length === 0 && phases[1].length > 1) { phases[2].push(phases[1].pop()); }
  if (phases[3].length === 0 && phases[2].length > 1) { phases[3].push(phases[2].pop()); }
  if (phases[3].length === 0 && phases[1].length > 1) { phases[3].push(phases[1].pop()); }
  
  return phases;
};

// --- SEVERITY DOTS COMPONENT ---
const SeverityDots = ({ rating }) => {
  return (
    <div className="flex items-center gap-1.5" title={`Severity Rating: ${rating} / 5`}>
      {[1, 2, 3, 4, 5].map((dot) => (
        <Icon 
          key={dot} 
          name="dot" 
          className={`w-4 h-4 transition-colors ${dot <= rating ? (rating >= 4 ? 'text-red-500 fill-red-500' : 'text-amber-500 fill-amber-500') : 'text-slate-200 fill-slate-200'}`} 
        />
      ))}
    </div>
  );
};

// --- VISUAL TRAPPING GUIDE COMPONENT ---
const TrappingGuide = () => (
  <div className="bg-white border-2 border-emerald-100 rounded-2xl p-6 mt-4 mb-4 shadow-md animate-in fade-in slide-in-from-top-4">
    <p className="text-lg text-slate-600 font-medium mb-6">
      Visual sticky traps exploit the specific color frequencies that diurnal (day-flying) insects are naturally attracted to for feeding or mating.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-12 bg-yellow-400 rounded-md border-2 border-yellow-600 shadow-sm flex-shrink-0"></div>
          <h4 className="font-bold text-xl text-slate-800">Yellow Sticky Cards<br/><span className="text-sm text-slate-500 font-medium">(The All-Rounder)</span></h4>
        </div>
        <p className="text-slate-600 mb-4 leading-relaxed flex-1">
          Mimics light reflectance of high-nitrogen young shoots. Best for <strong>Psyllids, Aphids, Whiteflies, and Fruit Flies</strong>. <br/><br/><span className="text-sm font-medium text-amber-700">⚠️ <em>Extra-large, high-strength yellow boards are also highly effective at trapping foraging <strong>Orchard Wasps/Hornets</strong>.</em></span>
        </p>
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 mt-auto">
          <strong className="text-yellow-800 block mb-2 uppercase tracking-wider text-xs">Placement:</strong>
          <p className="text-yellow-900 font-bold text-sm">Hang at the height of the new flush, or near orchard perimeters for wasps.</p>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-12 bg-blue-400 rounded-md border-2 border-blue-600 shadow-sm flex-shrink-0"></div>
          <h4 className="font-bold text-xl text-slate-800">Blue Sticky Cards<br/><span className="text-sm text-slate-500 font-medium">(Thrips Specialist)</span></h4>
        </div>
        <p className="text-slate-600 mb-4 leading-relaxed flex-1">
          Thrips are highly attracted to the specific wavelength of blue. Best for <strong>Chilli Thrips Adults</strong>. Use during flowering to prevent fruit scarring.
        </p>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 mt-auto">
          <strong className="text-blue-800 block mb-2 uppercase tracking-wider text-xs">Placement:</strong>
          <p className="text-blue-900 font-bold text-sm">Place inside the canopy near flower clusters.</p>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-12 bg-slate-100 rounded-md border-2 border-slate-300 shadow-sm flex-shrink-0"></div>
          <h4 className="font-bold text-xl text-slate-800">White Sticky Cards<br/><span className="text-sm text-slate-500 font-medium">(Beetles/Bugs)</span></h4>
        </div>
        <p className="text-slate-600 mb-4 leading-relaxed flex-1">
          Attracts specific types of plant bugs and small beetles. Less common for durian but useful for general orchard biodiversity monitoring.
        </p>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-auto">
          <strong className="text-slate-800 block mb-2 uppercase tracking-wider text-xs">Placement:</strong>
          <p className="text-slate-900 font-bold text-sm">Trunk-level or mid-canopy forks.</p>
        </div>
      </div>
    </div>
    
    <div className="mt-6 p-4 bg-emerald-900 text-emerald-50 rounded-xl flex items-center gap-4 border border-emerald-950 shadow-inner">
      <Icon name="info" className="w-6 h-6 text-emerald-400 flex-shrink-0" />
      <span className="text-sm font-medium"><strong>Pro Tip:</strong> Mass trapping (5-10 cards/tree) can reduce insect populations by up to 40% without using chemicals. Replace when 50% covered.</span>
    </div>
  </div>
);

// --- NOCTURNAL LIGHT TRAPPING GUIDE COMPONENT ---
const LightTrappingGuide = () => (
  <div className="bg-white border-2 border-amber-100 rounded-2xl p-6 mt-4 mb-4 shadow-md animate-in fade-in slide-in-from-top-4">
    <p className="text-lg text-slate-600 font-medium mb-6">
      Based on recent Malaysian entomology studies, <strong>Solar Insect Killer lamps</strong> use specific UV and multi-wavelength LEDs to exploit the positive phototaxis (light attraction) of devastating nocturnal pests, stopping them before they mate or lay eggs.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-100 p-2.5 rounded-lg text-amber-600 shadow-sm flex-shrink-0"><Icon name="arrow-up" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800">High-Canopy Traps<br/><span className="text-sm text-slate-500 font-medium">(Fruit Borer Moths)</span></h4>
        </div>
        <p className="text-slate-600 mb-4 leading-relaxed flex-1">
          Targets the adult <strong>Durian Fruit Borer Moth</strong> (<em>Mudaria magniplaga</em>) before it lays eggs on developing fruits. Crucial during the early fruit-set to rapid expansion phases.
        </p>
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 mt-auto">
          <strong className="text-amber-800 block mb-2 uppercase tracking-wider text-xs">Placement:</strong>
          <p className="text-amber-900 font-bold text-sm">Hang 3-5 meters high in the upper canopy, clearing foliage so the light is visible from afar.</p>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-100 p-2.5 rounded-lg text-amber-600 shadow-sm flex-shrink-0"><Icon name="chevron-down" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800">Low-Level Traps<br/><span className="text-sm text-slate-500 font-medium">(Night-flying Beetles)</span></h4>
        </div>
        <p className="text-slate-600 mb-4 leading-relaxed flex-1">
          Targets emerging <strong>Chafer Beetles</strong> and <strong>Rhinoceros Beetles</strong> as they rise from the soil or compost to feed on young saplings and shoots.
        </p>
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 mt-auto">
          <strong className="text-amber-800 block mb-2 uppercase tracking-wider text-xs">Placement:</strong>
          <p className="text-amber-900 font-bold text-sm">Mount on poles 1-1.5 meters above the ground, especially near nurseries and thick mulch.</p>
        </div>
      </div>
    </div>
    
    <div className="mt-6 p-5 bg-amber-950 text-amber-50 rounded-xl flex items-start gap-4 border border-amber-900 shadow-inner">
      <Icon name="alert" className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
      <span className="text-sm font-medium leading-relaxed">
        <strong className="text-amber-300 block mb-1 uppercase tracking-wider">⚠️ Pollinator Protection Warning:</strong> 
        During Anthesis (Full Bloom), durian flowers are pollinated at night by Cave Nectar Bats and specific nocturnal moths. <strong>Turn off all solar light traps during the peak bloom window</strong> to avoid disrupting or killing essential pollinators.
      </span>
    </div>
  </div>
);

// --- TANK MIXING & SYNERGY GUIDE COMPONENT ---
const TankMixGuide = () => (
  <div className="bg-white border-2 border-violet-100 rounded-2xl p-6 mt-4 mb-4 shadow-md animate-in fade-in slide-in-from-top-4">
    <p className="text-lg text-slate-600 font-medium mb-8 leading-relaxed">
      Improper chemical loading can destroy active ingredients, clog equipment, and burn your crop. Follow the professional <strong>WALES</strong> sequence and agronomy rules to ensure maximum efficacy and safety.
    </p>

    <div className="space-y-8">
      {/* 1. PROFESSIONAL MIXING SEQUENCE (WALES) */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
        <h4 className="font-extrabold text-2xl text-slate-800 flex items-center gap-3 mb-6">
          <Icon name="list" className="w-8 h-8 text-violet-600" />
          Professional WALES Loading Sequence
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8">
          <div className="bg-white p-5 rounded-xl border-2 border-violet-100 flex flex-col items-center text-center shadow-sm relative group">
            <span className="text-4xl font-black text-violet-600 mb-2">W</span>
            <strong className="text-xs uppercase tracking-wider text-slate-800 mb-1 leading-tight">Wettable Powders</strong>
            <p className="text-[10px] text-slate-500 font-bold uppercase">WP, WG, DF, SG</p>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden md:block text-slate-300">
              <Icon name="chevron-right" className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border-2 border-violet-100 flex flex-col items-center text-center shadow-sm relative">
            <span className="text-4xl font-black text-violet-600 mb-2">A</span>
            <strong className="text-xs uppercase tracking-wider text-slate-800 mb-1 leading-tight">Agitation / Buffers</strong>
            <p className="text-[10px] text-slate-500 font-bold uppercase">pH Water Conditioners</p>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden md:block text-slate-300">
              <Icon name="chevron-right" className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border-2 border-violet-100 flex flex-col items-center text-center shadow-sm relative">
            <span className="text-4xl font-black text-violet-600 mb-2">L</span>
            <strong className="text-xs uppercase tracking-wider text-slate-800 mb-1 leading-tight">Soluble & Flowable Liquids</strong>
            <p className="text-[10px] text-slate-500 font-bold uppercase">SL, SC, SE, CS</p>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden md:block text-slate-300">
              <Icon name="chevron-right" className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border-2 border-violet-100 flex flex-col items-center text-center shadow-sm relative">
            <span className="text-4xl font-black text-violet-600 mb-2">E</span>
            <strong className="text-xs uppercase tracking-wider text-slate-800 mb-1 leading-tight">Emulsifiables</strong>
            <p className="text-[10px] text-slate-500 font-bold uppercase">EC, EW, ME, OD</p>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden md:block text-slate-300">
              <Icon name="chevron-right" className="w-5 h-5" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border-2 border-violet-100 flex flex-col items-center text-center shadow-sm relative">
            <span className="text-4xl font-black text-violet-600 mb-2">S</span>
            <strong className="text-xs uppercase tracking-wider text-slate-800 mb-1 leading-tight">Surfactants</strong>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Oils, Spreaders, Stickers</p>
          </div>
        </div>

        {/* CRITICAL WARNING: TANK OVERLOAD */}
        <div className="bg-rose-900 text-white p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 border-4 border-rose-950 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
             <Icon name="alert" className="w-32 h-32" />
          </div>
          <div className="bg-rose-800 p-4 rounded-full flex-shrink-0 border-2 border-rose-700 shadow-lg z-10">
            <Icon name="alert" className="w-12 h-12 text-amber-400" />
          </div>
          <div className="text-center md:text-left z-10">
            <strong className="text-2xl font-black uppercase tracking-tight block mb-2 text-amber-300">⚠️ CRITICAL: The Tank Overload Rule</strong>
            <p className="text-lg font-bold leading-relaxed text-rose-50">
              Never mix more than <strong>3 active ingredients</strong> in a single tank.
            </p>
            <p className="text-sm font-medium mt-3 opacity-95 leading-relaxed">
              Mixing too many chemical types creates a "Cocktail Disaster." You risk <strong>Phytotoxicity</strong> (burning the entire canopy) or <strong>Chemical Neutralization</strong>. If the chemicals cancel each other out, you are <strong>wasting 40-60% of your budget</strong> while potentially caking your nozzles with non-dissolved sludge.
            </p>
          </div>
        </div>
      </div>

      {/* pH Section */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h4 className="font-bold text-xl text-slate-800 flex items-center gap-3 mb-4">
          <Icon name="droplets" className="w-6 h-6 text-blue-500" />
          The Golden pH Rule (Alkaline Hydrolysis)
        </h4>
        <p className="text-slate-600 mb-4 leading-relaxed">
          If your farm water is highly alkaline (pH 7.5+), it will literally tear apart modern pesticides (like Pyrethroids) in the tank within 20 minutes. Always test and buffer your water first!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
             <strong className="text-blue-800 block mb-1">Standard Chemicals:</strong>
             <span className="text-blue-900 font-bold text-lg">Target pH 5.5 - 6.5</span>
             <p className="text-sm text-blue-700 mt-1">Use a buffering agent in your water *before* adding the chemical.</p>
           </div>
           <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
             <strong className="text-rose-800 block mb-1">⚠️ COPPER EXCEPTION:</strong>
             <span className="text-rose-900 font-bold text-lg">Target pH 7.0+ (Neutral)</span>
             <p className="text-sm text-rose-700 mt-1">Never put Copper in acidic water. It will dissolve rapidly and burn your canopy!</p>
           </div>
        </div>
      </div>

      {/* Synergy Section */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h4 className="font-bold text-xl text-slate-800 flex items-center gap-3 mb-4">
          <Icon name="beaker" className="w-6 h-6 text-violet-500" />
          Proven Synergistic Cocktails (1 + 1 = 3)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-violet-50 p-4 rounded-xl border border-violet-200">
             <strong className="text-violet-900 block mb-1 text-sm uppercase tracking-wider">The Enzyme Blocker</strong>
             <p className="font-bold text-violet-950 mb-2">PBO + Pyrethroids (IRAC 3A)</p>
             <p className="text-sm text-violet-800 leading-relaxed">Insects use enzymes to survive poison. PBO shuts down the enzyme, making the Pyrethroid up to 10x more lethal against resistant borers.</p>
          </div>
          <div className="bg-fuchsia-50 p-4 rounded-xl border border-fuchsia-200">
             <strong className="text-fuchsia-900 block mb-1 text-sm uppercase tracking-wider">Energy & Shield Breaker</strong>
             <p className="font-bold text-fuchsia-950 mb-2">FRAC 11 + FRAC 3</p>
             <p className="text-sm text-fuchsia-800 leading-relaxed">Azoxystrobin (stops fungal breathing) mixed with Difenoconazole (stops cell building). Ultimate combo for Anthracnose.</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
             <strong className="text-indigo-900 block mb-1 text-sm uppercase tracking-wider">The "Flush & Kill"</strong>
             <p className="font-bold text-indigo-950 mb-2">IRAC 3A + IRAC 4A</p>
             <p className="text-sm text-indigo-800 leading-relaxed">Pyrethroids irritate and flush hidden pests out of leaf folds directly into the systemic Neonicotinoid layer. Perfect for outbreaks.</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
             <strong className="text-amber-900 block mb-1 text-sm uppercase tracking-wider">The Physical Breach</strong>
             <p className="font-bold text-amber-950 mb-2">White Oil + IRAC 23</p>
             <p className="text-sm text-amber-800 leading-relaxed">Oil acts as a physical solvent, melting the wax armor of the Pit Scale and pulling the systemic Spirotetramat directly into the insect.</p>
          </div>
        </div>
      </div>

      {/* Chemical Antagonism & Timing Section */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h4 className="font-bold text-xl text-slate-800 flex items-center gap-3 mb-4">
          <Icon name="x" className="w-6 h-6 text-red-500" />
          Dangerous Mixes & Timing (The Copper Rules)
        </h4>
        <div className="space-y-4">
          <div className="bg-red-50 p-5 rounded-xl border-2 border-red-200 flex flex-col md:flex-row gap-4 items-start shadow-inner">
            <div className="bg-red-100 p-2.5 rounded-full flex-shrink-0 mt-1">
              <Icon name="alert" className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <strong className="text-red-900 block mb-1 text-lg uppercase tracking-wider">The Copper "Loner" Rule</strong>
              <p className="font-bold text-red-950 mb-2">Copper (FRAC M01) + Synthetic Organics (e.g., Pencycuron)</p>
              <p className="text-sm text-red-800 leading-relaxed font-medium">
                Never mix heavy metal fungicides (Copper Oxychloride / Hydroxide) with synthetic organic chemicals. The highly reactive copper ions bind to organic molecules, causing them to separate and sink to the bottom of the tank as a chalky sludge (flocculation). This destroys the chemical's efficacy and severely burns the tree (phytotoxicity). <strong>Copper must always be sprayed alone!</strong>
              </p>
            </div>
          </div>

          <div className="bg-amber-50 p-5 rounded-xl border-2 border-amber-200 flex flex-col md:flex-row gap-4 items-start shadow-inner">
            <div className="bg-amber-100 p-2.5 rounded-full flex-shrink-0 mt-1">
              <Icon name="alert" className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <strong className="text-amber-900 block mb-1 text-lg uppercase tracking-wider">The "Zero Copper Window" (Anthesis)</strong>
              <p className="font-bold text-amber-950 mb-2">Copper applied during Matchstick or Full Bloom</p>
              <p className="text-sm text-amber-800 leading-relaxed font-medium">
                <strong>Never apply copper during flowering!</strong> The highly reactive copper ions will instantly burn the delicate stigma and desiccate the pollen, causing massive flower abortion. Furthermore, the metallic residue repels vital nocturnal pollinators (like Cave Nectar Bats) and is highly toxic to the gut biome of pollinating insects. Switch entirely to soft biologicals (like <em>Bacillus subtilis</em>) during this phase.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LT50 Section */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h4 className="font-bold text-xl text-slate-800 flex items-center gap-3 mb-4">
          <Icon name="target" className="w-6 h-6 text-rose-500" />
          Understanding LT₅₀ (Lethal Time) & Knockdowns
        </h4>
        <p className="text-slate-600 mb-4 leading-relaxed">
          While DT₅₀ measures environmental lifespan, <strong>LT₅₀</strong> measures how fast the insect actually dies. Agronomists mix fast and slow LT₅₀ chemicals to create the ultimate defense:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <strong className="text-rose-800 block mb-1 text-sm uppercase tracking-wider">Fast LT₅₀ (Knockdown)</strong>
             <p className="font-bold text-rose-950 mb-1">Contact Killers (e.g., Pyrethroids)</p>
             <p className="text-sm text-slate-600 leading-relaxed">Kills in minutes. Insects drop from the canopy instantly upon physical contact.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <strong className="text-indigo-800 block mb-1 text-sm uppercase tracking-wider">Slow LT₅₀ (Systemic)</strong>
             <p className="font-bold text-indigo-950 mb-1">IGRs & Systemics (e.g., Spirotetramat)</p>
             <p className="text-sm text-slate-600 leading-relaxed">Takes 3-7 days. Pests stop feeding immediately but remain on the leaf as harmless "walking dead."</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm">
             <strong className="text-emerald-800 block mb-1 text-sm uppercase tracking-wider">The Perfect Mix</strong>
             <p className="font-bold text-emerald-950 mb-1">Fast + Slow (Flush & Kill)</p>
             <p className="text-sm text-emerald-900 leading-relaxed">Fast chemicals knock down the current swarm, while slow systemics protect against new hatchlings days later.</p>
          </div>
        </div>
      </div>

      {/* Chemical Mobility Section */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h4 className="font-bold text-xl text-slate-800 flex items-center gap-3 mb-4">
          <Icon name="activity" className="w-6 h-6 text-fuchsia-500" />
          Chemical Mobility: How the Poison Moves
        </h4>
        <p className="text-slate-600 mb-4 leading-relaxed">
          The Mode of Action (IRAC/FRAC) dictates biological death, but <strong>Mobility</strong> dictates exactly <em>how</em> you must spray the tree to reach the pest:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <strong className="text-fuchsia-800 block mb-1 text-sm uppercase tracking-wider flex items-center gap-1.5"><Icon name="shield" className="w-4 h-4"/> Contact (Surface)</strong>
             <p className="font-bold text-fuchsia-950 mb-1">e.g., IRAC 3A, FRAC M01</p>
             <p className="text-sm text-slate-600 leading-relaxed">Stays exactly where it lands. Washes off in rain. You must physically hit the insect or completely cover the leaf surface.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <strong className="text-indigo-800 block mb-1 text-sm uppercase tracking-wider flex items-center gap-1.5"><Icon name="leaf" className="w-4 h-4"/> Translaminar</strong>
             <p className="font-bold text-indigo-950 mb-1">e.g., IRAC 6, FRAC 11</p>
             <p className="text-sm text-slate-600 leading-relaxed">Absorbs into the leaf but doesn't flow through the sap. Spray the top canopy, and it kills pests hiding on the underside (Mites/Whiteflies).</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm">
             <strong className="text-emerald-800 block mb-1 text-sm uppercase tracking-wider flex items-center gap-1.5"><Icon name="arrow-up" className="w-4 h-4"/> Systemic (Xylem)</strong>
             <p className="font-bold text-emerald-950 mb-1">e.g., IRAC 4A, FRAC 3</p>
             <p className="text-sm text-emerald-900 leading-relaxed"><strong>Upward Only.</strong> Flows up the plant's water pipes. Good for top-canopy flushes, but useless for root pests if sprayed on the leaves.</p>
          </div>
          <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-200 shadow-sm">
             <strong className="text-cyan-800 block mb-1 text-sm uppercase tracking-wider flex items-center gap-1.5"><Icon name="droplets" className="w-4 h-4"/> True Systemic (Phloem)</strong>
             <p className="font-bold text-cyan-950 mb-1">e.g., IRAC 23, FRAC P07</p>
             <p className="text-sm text-cyan-900 leading-relaxed"><strong>Two-Way Flow.</strong> Highly engineered. Travels down the food pipes to the roots and hidden bark crevices. Essential for deep, hidden pests.</p>
          </div>
        </div>
      </div>

      {/* DT50 & MRL Section */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h4 className="font-bold text-xl text-slate-800 flex items-center gap-3 mb-4">
          <Icon name="clock" className="w-6 h-6 text-teal-500" />
          Extending Half-Life (DT₅₀) & Adjuvants
        </h4>
        <p className="text-slate-600 mb-4 leading-relaxed">
          Tropical sun and rain degrade chemicals quickly. You can extend the active life of your sprays by tank-mixing with specific adjuvants:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <strong className="text-teal-800 block mb-1 text-sm uppercase tracking-wider">The UV Shield</strong>
             <p className="font-bold text-teal-950 mb-1">UV Protectants</p>
             <p className="text-sm text-slate-600 leading-relaxed">Prevents sunlight from destroying UV-sensitive chemicals like Abamectin and Bt.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <strong className="text-cyan-800 block mb-1 text-sm uppercase tracking-wider">The Rain-Lock</strong>
             <p className="font-bold text-cyan-950 mb-1">Synthetic Stickers (Pinolene)</p>
             <p className="text-sm text-slate-600 leading-relaxed">Creates a waterproof polymer film over the leaf, preventing monsoon wash-off.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <strong className="text-emerald-800 block mb-1 text-sm uppercase tracking-wider">Evaporation Blocker</strong>
             <p className="font-bold text-emerald-950 mb-1">Horticultural Oils</p>
             <p className="text-sm text-slate-600 leading-relaxed">Coats the chemical to slow evaporation, giving systemic liquids more time to absorb.</p>
          </div>
        </div>
        
        {/* MRL WARNING CAUTION BOX */}
        <div className="bg-rose-50 p-5 rounded-xl border-2 border-rose-200 flex flex-col md:flex-row gap-4 items-start shadow-inner">
          <div className="bg-rose-100 p-2.5 rounded-full flex-shrink-0">
            <Icon name="alert" className="w-8 h-8 text-rose-600" />
          </div>
          <div>
            <strong className="text-rose-900 block mb-2 text-lg uppercase tracking-wider">⚠️ Critical Warning: The MRL Trap</strong>
            <p className="text-rose-800 leading-relaxed font-medium">
              <strong>DO NOT</strong> use DT₅₀ extenders (Stickers/UV Blockers) during the <strong className="text-rose-950">Maturation Stage</strong>! Artificially extending chemical life near harvest guarantees your fruits will fail export <strong>MRL (Maximum Residue Limit)</strong> tests at customs. Stop using these adjuvants at least 30-45 days before harvest to allow natural degradation.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- BIOLOGICAL WARFARE GUIDE COMPONENT ---
const BioControlGuide = () => (
  <div className="bg-white border-2 border-lime-100 rounded-2xl p-6 mt-4 mb-4 shadow-md animate-in fade-in slide-in-from-top-4">
    <p className="text-lg text-slate-600 font-medium mb-6">
      Using beneficial bacteria like <strong>Bacillus velezensis</strong> and <strong>Bacillus amyloliquefaciens</strong> is one of the most effective countermeasures against aggressive fungal blights (like <em>Rhizoctonia solani</em>). Here is how they win the microscopic war:
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-rose-100 p-2 rounded-lg text-rose-600 shadow-sm flex-shrink-0"><Icon name="shield" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800">Lipopeptide Warfare</h4>
        </div>
        <p className="text-slate-600 mb-4 leading-relaxed flex-1">
          These bacteria synthesize powerful natural antifungal compounds (Iturin, Surfactin, Fengycin) that literally tear holes in the fungal lipid membranes, causing the fungal cells to leak and die instantly.
        </p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-sky-100 p-2 rounded-lg text-sky-600 shadow-sm flex-shrink-0"><Icon name="target" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800">Competitive Exclusion</h4>
        </div>
        <p className="text-slate-600 mb-4 leading-relaxed flex-1">
          Instead of spreading via spores, blights spread via physical web-like growth. The <em>Bacillus</em> microbes are hyper-aggressive colonizers that physically cover the leaf surface, starving the fungus of space and nutrients.
        </p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-lime-100 p-2 rounded-lg text-lime-600 shadow-sm flex-shrink-0"><Icon name="activity" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800">Systemic Resistance (ISR)</h4>
        </div>
        <p className="text-slate-600 mb-4 leading-relaxed flex-1">
          Like a vaccine for your trees. When the bacteria colonize the plant, they send chemical signals into the tissue that trigger the plant's immune system, naturally hardening its cell walls against future attacks.
        </p>
      </div>
    </div>
    
    <div className="mt-6 p-4 bg-lime-50 text-lime-900 rounded-xl flex items-center gap-4 border border-lime-200 shadow-inner">
      <Icon name="info" className="w-8 h-8 text-lime-600 flex-shrink-0" />
      <span className="text-sm font-medium"><strong>Pro-Tip for Outbreaks:</strong> Because leaf blight moves incredibly fast in wet conditions, biologicals work best <strong>preventatively</strong>. For an active outbreak, use a synthetic knockdown (like Pencycuron or Thifluzamide) first, then apply Bacillus a week later to protect new growth and prevent recurrence.</span>
    </div>
  </div>
);

// --- THE BIG 15 MICROBES GUIDE COMPONENT ---
const MicrobeGuide = () => (
  <div className="bg-white border-2 border-teal-100 rounded-2xl p-6 mt-4 mb-4 shadow-md animate-in fade-in slide-in-from-top-4">
    <p className="text-lg text-slate-600 font-medium mb-6">
      <strong>Probiotic Agronomy</strong> uses living microbes as biological weapons and soil synthesizers. By introducing these 15 elite organisms into your rotation, you establish a self-sustaining, organic defense grid in your orchard:
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-teal-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-teal-100 p-2.5 rounded-lg text-teal-600 shadow-sm"><Icon name="bug" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">Beauveria bassiana</h4>
        </div>
        <p className="text-sm font-extrabold text-teal-800 mb-3 uppercase tracking-wider">The White Muscardine</p>
        <p className="text-slate-700 text-sm leading-relaxed font-medium">A contact-killing fungus that penetrates insect exoskeletons and drains nutrients, turning them into fuzzy white mummies. Best mixed with light oil. <br/><br/><strong className="text-slate-900">Targets:</strong> Mealybugs, Scales, Sap Beetles, Borers.</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-emerald-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-emerald-100 p-2.5 rounded-lg text-emerald-600 shadow-sm"><Icon name="target" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">Metarhizium anisopliae</h4>
        </div>
        <p className="text-sm font-extrabold text-emerald-800 mb-3 uppercase tracking-wider">The Green Muscardine</p>
        <p className="text-slate-700 text-sm leading-relaxed font-medium">A soil-dwelling assassin fungus that specifically infects and consumes hard-shelled beetles and grubs, leaving behind a hard green crust on the dead host. <br/><br/><strong className="text-slate-900">Targets:</strong> Rhino Beetles, Chafer Grubs, Termites.</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-violet-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-violet-100 p-2.5 rounded-lg text-violet-600 shadow-sm"><Icon name="activity" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">Nomuraea rileyi</h4>
        </div>
        <p className="text-sm font-extrabold text-violet-800 mb-3 uppercase tracking-wider">The Caterpillar Stalker</p>
        <p className="text-slate-700 text-sm leading-relaxed font-medium">Turns caterpillars into rigid, mummified statues covered in pale-green spores on contact. Excellent for aggressive foliar and fruit borers. <br/><br/><strong className="text-slate-900">Targets:</strong> Fruit Borers, Bagworms, Leafrollers.</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-sky-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-sky-100 p-2.5 rounded-lg text-sky-600 shadow-sm"><Icon name="leaf" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">Lecanicillium lecanii</h4>
        </div>
        <p className="text-sm font-extrabold text-sky-800 mb-3 uppercase tracking-wider">The Sap-Sucker Assassin</p>
        <p className="text-slate-700 text-sm leading-relaxed font-medium">Thrives in highly humid canopies, explicitly melting the cuticles of soft-bodied insects. Uniquely, it actively feeds on honeydew, instantly curing Sooty Mold. <br/><br/><strong className="text-slate-900">Targets:</strong> Aphids, Whiteflies, Psyllids.</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-yellow-400 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-yellow-100 p-2.5 rounded-lg text-yellow-600 shadow-sm"><Icon name="sun" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">Isaria fumosorosea</h4>
        </div>
        <p className="text-sm font-extrabold text-yellow-800 mb-3 uppercase tracking-wider">The Canopy Sweeper</p>
        <p className="text-slate-700 text-sm leading-relaxed font-medium">Highly resilient to temperature fluctuations and sun exposure compared to other fungi. Perfect for upper canopy pests, covering them in a pinkish-grey fuzz. <br/><br/><strong className="text-slate-900">Targets:</strong> Chilli Thrips, Whiteflies, Aphids.</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-pink-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-pink-100 p-2.5 rounded-lg text-pink-600 shadow-sm"><Icon name="target" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">Hirsutella thompsonii</h4>
        </div>
        <p className="text-sm font-extrabold text-pink-800 mb-3 uppercase tracking-wider">The Mite Destroyer</p>
        <p className="text-slate-700 text-sm leading-relaxed font-medium">Hyper-specialized to hunt arachnids. Penetrates the mite cuticle and produces a paralyzing toxin. Capable of causing massive "fungal pandemics" in mite colonies. <br/><br/><strong className="text-slate-900">Targets:</strong> Red Mites, Broad Mites, Eriophyid Mites.</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-amber-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-amber-100 p-2.5 rounded-lg text-amber-600 shadow-sm"><Icon name="shield" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">Bacillus subtilis</h4>
        </div>
        <p className="text-sm font-extrabold text-amber-800 mb-3 uppercase tracking-wider">The Resilient Shield</p>
        <p className="text-slate-700 text-sm leading-relaxed font-medium">A tough, spore-forming bacterium highly resilient to UV light. Produces powerful natural antibiotics (iturin) to suppress broad-spectrum foliage diseases. Also acts as a powerful bio-filter using EPS to neutralize toxic heavy metals in the soil.<br/><br/><strong className="text-slate-900">Targets:</strong> Anthracnose, Mildews, Leaf Spots, Copper Toxicity.</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-indigo-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-indigo-100 p-2.5 rounded-lg text-indigo-600 shadow-sm"><Icon name="droplets" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">Pseudomonas fluorescens</h4>
        </div>
        <p className="text-sm font-extrabold text-indigo-800 mb-3 uppercase tracking-wider">The Iron Thief</p>
        <p className="text-slate-700 text-sm leading-relaxed font-medium">An aggressive root/soil bacterium that outcompetes fungal pathogens for iron in the soil (using siderophores), starving them out while boosting tree immunity. <br/><br/><strong className="text-slate-900">Targets:</strong> Phytophthora, Pythium.</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-rose-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-rose-100 p-2.5 rounded-lg text-rose-600 shadow-sm"><Icon name="activity" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">Streptomyces spp.</h4>
        </div>
        <p className="text-sm font-extrabold text-rose-800 mb-3 uppercase tracking-wider">The Bio-Antibiotic</p>
        <p className="text-slate-700 text-sm leading-relaxed font-medium">Soil bacteria famous for producing natural antibiotics. They secrete volatile organic compounds that literally melt the cell walls of highly aggressive wood rots. <br/><br/><strong className="text-slate-900">Targets:</strong> Fusicoccum, Ceratocystis, White Root.</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-fuchsia-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-fuchsia-100 p-2.5 rounded-lg text-fuchsia-600 shadow-sm"><Icon name="x" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">Purpureocillium lilacinum</h4>
        </div>
        <p className="text-sm font-extrabold text-fuchsia-800 mb-3 uppercase tracking-wider">The Nematode Hunter</p>
        <p className="text-slate-700 text-sm leading-relaxed font-medium">A highly specialized fungus that actively hunts nematodes. Its spores parasitize nematode eggs and females, dissolving them and breaking the generational cycle. <br/><br/><strong className="text-slate-900">Targets:</strong> Root-knot & Lesion Nematodes.</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-orange-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-orange-100 p-2.5 rounded-lg text-orange-600 shadow-sm"><Icon name="calculator" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">Penicillium bilaiae</h4>
        </div>
        <p className="text-sm font-extrabold text-orange-800 mb-3 uppercase tracking-wider">The Phosphorus Unlocker</p>
        <p className="text-slate-700 text-sm leading-relaxed font-medium">A beneficial root fungus that secretes organic acids to dissolve bound-up phosphorus in the soil. Massively boosts root mass, directly preventing stress-induced rots. <br/><br/><strong className="text-slate-900">Targets:</strong> Root Stress, Nutrient Lockout.</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-lime-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-lime-100 p-2.5 rounded-lg text-lime-600 shadow-sm"><Icon name="activity" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">Trichoderma harzianum</h4>
        </div>
        <p className="text-sm font-extrabold text-lime-800 mb-3 uppercase tracking-wider">The Fungal Parasite</p>
        <p className="text-slate-700 text-sm leading-relaxed font-medium">A hyper-aggressive beneficial fungus that practices mycoparasitism. It literally tracks down pathogenic fungi, coils around them, and secretes enzymes to dissolve and eat their cell walls. <br/><br/><strong className="text-slate-900">Targets:</strong> Phytophthora, Pythium, Rhizoctonia.</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-cyan-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-cyan-100 p-2.5 rounded-lg text-cyan-600 shadow-sm"><Icon name="shield" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">Bacillus velezensis</h4>
        </div>
        <p className="text-sm font-extrabold text-cyan-800 mb-3 uppercase tracking-wider">The Lipopeptide Warrior</p>
        <p className="text-slate-700 text-sm leading-relaxed font-medium">Synthesizes powerful natural antifungal compounds (Iturin, Surfactin) that instantly tear holes in fungal lipid membranes, causing rapid cell death in aggressive blights. <br/><br/><strong className="text-slate-900">Targets:</strong> Rhizoctonia Leaf Blight, Pathogenic Fungi.</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-fuchsia-300 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-fuchsia-100 p-2.5 rounded-lg text-fuchsia-600 shadow-sm"><Icon name="target" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">B. amyloliquefaciens</h4>
        </div>
        <p className="text-sm font-extrabold text-fuchsia-800 mb-3 uppercase tracking-wider">The Competitive Colonizer</p>
        <p className="text-slate-700 text-sm leading-relaxed font-medium">Works synergistically with B. velezensis. A hyper-aggressive colonizer that rapidly covers the leaf surface (phyllosphere), starving invading blight mycelium of space and nutrients. <br/><br/><strong className="text-slate-900">Targets:</strong> Rhizoctonia, Bacterial Leaf Spot.</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col hover:border-blue-300 transition-colors shadow-sm lg:col-span-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600 shadow-sm"><Icon name="rain" className="w-6 h-6"/></div>
          <h4 className="font-bold text-xl text-slate-800 leading-tight">Effective Microbes (EM)</h4>
        </div>
        <p className="text-sm font-extrabold text-blue-800 mb-3 uppercase tracking-wider">The Soil Synthesizer</p>
        <p className="text-slate-700 text-sm leading-relaxed font-medium">A consortium of lactic acid bacteria, yeast, and phototrophic bacteria. Rapidly ferments dead mulch into nutrients and aggressively outcompetes anaerobic rot environments. <br/><br/><strong className="text-slate-900">Targets:</strong> Soil toxicity (Heavy Metals), Breeding Grounds.</p>
      </div>
    </div>

    {/* HEAVY METAL DETOXIFICATION INFO BOX */}
    <div className="mt-8 p-6 bg-emerald-950 text-emerald-50 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-5 border-2 border-emerald-800 shadow-lg">
      <div className="bg-emerald-900 p-4 rounded-full flex-shrink-0 border border-emerald-700 shadow-inner">
        <Icon name="shield" className="w-8 h-8 text-emerald-400" />
      </div>
      <div>
        <strong className="text-emerald-300 block mb-2 text-lg uppercase tracking-widest font-black">Hidden Benefit: Heavy Metal Detoxification (Bioremediation)</strong>
        <p className="text-sm font-medium leading-relaxed text-emerald-100/90">
          Decades of using chemical fertilizers and <strong className="text-white">Copper-based fungicides</strong> (FRAC M01) causes toxic heavy metal buildup in the soil, which eventually poisons the tree's feeder roots (Copper Toxicity). Microbes like <strong>Bacillus subtilis</strong>, <strong>Pseudomonas</strong>, <strong>Trichoderma</strong>, and <strong>EM</strong> act as natural bio-filters. They secrete biosurfactants, EPS (sticky polymers), and enzymes that actively bind, neutralize, and lock away excess heavy metals in the soil, saving the root system from chemical burn.
        </p>
      </div>
    </div>
  </div>
);

// --- DT50 LIFESPAN REFERENCE GUIDE COMPONENT ---
const DT50Guide = () => {
  const getFoliarColor = (val) => {
    if (val.includes('Infinite')) return 'bg-red-100 text-red-800 border-red-200';
    if (val.includes('Weeks') || val.includes('Variable')) return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    if (val === 'N/A') return 'bg-slate-100 text-slate-500 border-slate-200';
    const num = parseFloat(val.match(/\d+(\.\d+)?/)?.[0] || 0);
    if (val.includes('<') && num <= 1) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (num <= 3) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (num <= 7) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getSoilColor = (val) => {
    if (val.includes('Infinite') || val.includes('100 -')) return 'bg-red-100 text-red-800 border-red-200';
    if (val.includes('Indefinite') || val.includes('Variable') || val.includes('Weeks')) return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    const num = parseFloat(val.match(/\d+(\.\d+)?/)?.[0] || 0);
    if (val.includes('<') && num <= 1) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (num <= 30) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (num <= 70) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl p-0 mt-4 mb-4 shadow-md animate-in fade-in slide-in-from-top-4 overflow-hidden">
      
      {/* Intro Header */}
      <div className="bg-sky-50 p-6 border-b border-sky-100">
        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3 mb-3">
          <Icon name="clock" className="w-7 h-7 text-sky-600" />
          Chemical Environmental Lifespan (DT₅₀)
        </h3>
        <p className="text-slate-700 font-medium leading-relaxed">
          <strong>DT₅₀ (Degradation Time 50%)</strong> is the time required for half of the active ingredient to break down.
          <br/><strong className="text-sky-700">Foliar DT₅₀ (Photolysis):</strong> Lifespan on the leaf under UV sunlight. Dictates harvest safety and MRLs.
          <br/><strong className="text-amber-700">Soil DT₅₀:</strong> Lifespan in the ground. Highly persistent chemicals ({'>'}100 days) accumulate and harm soil ecology.
        </p>
      </div>

      {/* MRL Warning Box */}
      <div className="bg-rose-50 p-5 border-b-2 border-rose-200 flex flex-col md:flex-row gap-4 items-start shadow-inner">
        <div className="bg-rose-100 p-2.5 rounded-full flex-shrink-0 mt-1">
          <Icon name="alert" className="w-6 h-6 text-rose-600" />
        </div>
        <div>
          <strong className="text-rose-900 block mb-1 text-lg uppercase tracking-wider">Agronomist Pro-Tip: MRL & Exporting</strong>
          <p className="text-sm text-rose-800 leading-relaxed font-medium">
            If you are exporting your durians, any chemical with a <strong>Foliar DT₅₀ greater than 7 days</strong> (e.g., Chlorantraniliprole, Azoxystrobin) must be completely cut from your spray program <strong>at least 30 to 45 days before harvest</strong>. Stick to fast-degrading chemicals (Foliar DT₅₀ {'<'} 3 days) or purely biologicals during the final maturation stage to pass customs residue testing.
          </p>
        </div>
      </div>

      {/* Data Table Container */}
      <div className="p-0 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="bg-slate-100 border-b-2 border-slate-200 text-slate-600 text-[11px] uppercase tracking-wider">
              <th className="px-3 py-2.5 font-bold w-1/5">Active Ingredient</th>
              <th className="px-2 py-2.5 font-bold text-center w-24">MoA</th>
              <th className="px-2 py-2.5 font-bold text-center w-28">Foliar DT₅₀ (UV)</th>
              <th className="px-2 py-2.5 font-bold text-center w-28">Soil DT₅₀</th>
              <th className="px-3 py-2.5 font-bold">Agronomic Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {['Insecticide', 'Fungicide', 'Bio/Other'].map(type => (
              <React.Fragment key={type}>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <td colSpan="5" className="px-3 py-2 font-black text-slate-800 text-xs uppercase tracking-wider">
                    {type === 'Bio/Other' ? 'Botanicals, Biologicals & Molluscicides' : `${type}s`}
                  </td>
                </tr>
                {DT50_DATABASE.filter(item => item.type === type).map((chem, idx) => (
                  <tr key={idx} className="hover:bg-sky-50/50 transition-colors">
                    <td className="px-3 py-2.5">
                      <span className="font-extrabold text-slate-800 block text-sm leading-tight">{chem.name}</span>
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md border border-slate-200 whitespace-nowrap">
                        {chem.moa}
                      </span>
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold border whitespace-nowrap shadow-sm ${getFoliarColor(chem.foliar)}`}>
                        {chem.foliar}
                      </span>
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold border whitespace-nowrap shadow-sm ${getSoilColor(chem.soil)}`}>
                        {chem.soil}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-[13px] text-slate-600 font-medium leading-snug">
                      {chem.notes}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};


// --- LEAF CURL DIAGNOSTIC DIAGRAMS (inline SVG, no network) ---
// Hand-drawn botanical diagrams that show the actual mechanism of each curl pattern.
// Two variants keyed by id: 'downward_curl' and 'upward_curl'.
const AIIllustration = ({ id, alt }) => {
  if (id === 'downward_curl') {
    return (
      <div className="relative mb-4 w-full h-48 rounded-xl border-2 border-slate-200 shadow-sm bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <svg viewBox="0 0 680 240" className="w-full h-full" role="img" aria-label={alt} xmlns="http://www.w3.org/2000/svg">
          <title>Downward leaf curl diagnostic</title>
          {/* Upper leaf surface (convex green) */}
          <path d="M 100 90 Q 340 20, 580 90 Q 575 105, 570 112 Q 340 48, 110 112 Q 105 105, 100 90 Z"
                fill="#639922" stroke="#3B6D11" strokeWidth="1"/>
          {/* Underside (concave, where pests hide) */}
          <path d="M 110 112 Q 340 48, 570 112 L 540 180 Q 340 110, 140 180 L 110 112 Z"
                fill="#97C459" stroke="#3B6D11" strokeWidth="0.5" opacity="0.95"/>
          {/* Curling edges */}
          <path d="M 100 90 Q 95 160, 140 180" fill="none" stroke="#3B6D11" strokeWidth="1.2"/>
          <path d="M 580 90 Q 585 160, 540 180" fill="none" stroke="#3B6D11" strokeWidth="1.2"/>
          {/* Midrib */}
          <path d="M 110 112 Q 340 48, 570 112" fill="none" stroke="#27500A" strokeWidth="1.5" opacity="0.6"/>
          {/* Lateral veins */}
          <path d="M 200 105 Q 240 135, 260 175" fill="none" stroke="#27500A" strokeWidth="0.5" opacity="0.4"/>
          <path d="M 280 90 Q 300 125, 310 170" fill="none" stroke="#27500A" strokeWidth="0.5" opacity="0.4"/>
          <path d="M 400 90 Q 380 125, 370 170" fill="none" stroke="#27500A" strokeWidth="0.5" opacity="0.4"/>
          <path d="M 480 105 Q 440 135, 420 175" fill="none" stroke="#27500A" strokeWidth="0.5" opacity="0.4"/>
          {/* Pest dots clustered along the underside */}
          <g fill="#4A1B0C" opacity="0.85">
            <circle cx="220" cy="155" r="3"/><circle cx="235" cy="160" r="2.5"/>
            <circle cx="250" cy="165" r="3"/><circle cx="265" cy="160" r="2"/>
            <circle cx="290" cy="155" r="3"/><circle cx="310" cy="160" r="2.5"/>
            <circle cx="340" cy="155" r="3.5"/><circle cx="370" cy="160" r="2.5"/>
            <circle cx="395" cy="155" r="3"/><circle cx="420" cy="160" r="2"/>
            <circle cx="440" cy="165" r="3"/><circle cx="460" cy="160" r="2.5"/>
          </g>
          {/* Downward curl arrows */}
          <path d="M 100 50 Q 105 35, 130 45" fill="none" stroke="#D85A30" strokeWidth="2" strokeLinecap="round"/>
          <polygon points="125,40 138,46 130,53" fill="#D85A30"/>
          <path d="M 580 50 Q 575 35, 550 45" fill="none" stroke="#D85A30" strokeWidth="2" strokeLinecap="round"/>
          <polygon points="555,40 542,46 550,53" fill="#D85A30"/>
          {/* Inline annotations */}
          <text x="60" y="65" fontFamily="sans-serif" fontSize="11" fill="#27500A" fontWeight="600">Upper</text>
          <text x="60" y="78" fontFamily="sans-serif" fontSize="9" fill="#3B6D11" opacity="0.8">(convex)</text>
          <text x="540" y="205" fontFamily="sans-serif" fontSize="11" fill="#4A1B0C" fontWeight="600">Pests</text>
          <text x="540" y="218" fontFamily="sans-serif" fontSize="9" fill="#993C1D">on underside</text>
        </svg>
        <div className="absolute bottom-1.5 right-2 bg-white/90 text-slate-700 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm pointer-events-none">
          Diagnostic
        </div>
      </div>
    );
  }

  if (id === 'upward_curl') {
    return (
      <div className="relative mb-4 w-full h-48 rounded-xl border-2 border-slate-200 shadow-sm bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <svg viewBox="0 0 680 240" className="w-full h-full" role="img" aria-label={alt} xmlns="http://www.w3.org/2000/svg">
          <title>Upward leaf curl diagnostic</title>
          {/* Healthy green center (concave, cupped up) */}
          <path d="M 140 110 Q 340 160, 540 110 L 545 140 Q 340 190, 135 140 L 140 110 Z"
                fill="#639922" stroke="#3B6D11" strokeWidth="1"/>
          {/* Left crispy dead edge curling up */}
          <path d="M 60 50 Q 100 30, 140 60 L 140 110 Q 100 105, 60 90 L 60 50 Z"
                fill="#854F0B" stroke="#633806" strokeWidth="0.5"/>
          <path d="M 70 55 Q 90 52, 110 60" fill="none" stroke="#412402" strokeWidth="0.6" opacity="0.7"/>
          <path d="M 65 70 Q 95 68, 125 78" fill="none" stroke="#412402" strokeWidth="0.6" opacity="0.7"/>
          <path d="M 68 85 Q 100 84, 130 98" fill="none" stroke="#412402" strokeWidth="0.6" opacity="0.5"/>
          <path d="M 60 50 L 55 45 L 62 42 L 58 36 L 66 38 L 64 30" fill="none" stroke="#633806" strokeWidth="0.8"/>
          {/* Right crispy dead edge curling up */}
          <path d="M 620 50 Q 580 30, 540 60 L 540 110 Q 580 105, 620 90 L 620 50 Z"
                fill="#854F0B" stroke="#633806" strokeWidth="0.5"/>
          <path d="M 610 55 Q 590 52, 570 60" fill="none" stroke="#412402" strokeWidth="0.6" opacity="0.7"/>
          <path d="M 615 70 Q 585 68, 555 78" fill="none" stroke="#412402" strokeWidth="0.6" opacity="0.7"/>
          <path d="M 612 85 Q 580 84, 550 98" fill="none" stroke="#412402" strokeWidth="0.6" opacity="0.5"/>
          <path d="M 620 50 L 625 45 L 618 42 L 622 36 L 614 38 L 616 30" fill="none" stroke="#633806" strokeWidth="0.8"/>
          {/* Transition (yellow-brown) zones */}
          <path d="M 140 60 L 140 110 L 135 140 Q 142 125, 142 90 L 140 60 Z" fill="#BA7517" opacity="0.5"/>
          <path d="M 540 60 L 540 110 L 545 140 Q 538 125, 538 90 L 540 60 Z" fill="#BA7517" opacity="0.5"/>
          {/* Bright green midrib */}
          <path d="M 140 135 Q 340 175, 540 135" fill="none" stroke="#173404" strokeWidth="2.5"/>
          <path d="M 140 135 Q 340 175, 540 135" fill="none" stroke="#639922" strokeWidth="1.5"/>
          {/* Lateral veins */}
          <path d="M 220 125 Q 240 145, 250 160" fill="none" stroke="#27500A" strokeWidth="0.5" opacity="0.5"/>
          <path d="M 290 130 Q 305 150, 310 165" fill="none" stroke="#27500A" strokeWidth="0.5" opacity="0.5"/>
          <path d="M 390 130 Q 375 150, 370 165" fill="none" stroke="#27500A" strokeWidth="0.5" opacity="0.5"/>
          <path d="M 460 125 Q 440 145, 430 160" fill="none" stroke="#27500A" strokeWidth="0.5" opacity="0.5"/>
          {/* Upward curl arrows */}
          <path d="M 90 18 Q 95 5, 110 12" fill="none" stroke="#D85A30" strokeWidth="2" strokeLinecap="round"/>
          <polygon points="105,8 117,14 110,21" fill="#D85A30"/>
          <path d="M 590 18 Q 585 5, 570 12" fill="none" stroke="#D85A30" strokeWidth="2" strokeLinecap="round"/>
          <polygon points="575,8 563,14 570,21" fill="#D85A30"/>
          {/* Labels */}
          <text x="60" y="155" fontFamily="sans-serif" fontSize="11" fill="#633806" fontWeight="600">Crispy</text>
          <text x="60" y="168" fontFamily="sans-serif" fontSize="9" fill="#854F0B">brown edge</text>
          <text x="555" y="155" fontFamily="sans-serif" fontSize="11" fill="#633806" fontWeight="600">Crispy</text>
          <text x="555" y="168" fontFamily="sans-serif" fontSize="9" fill="#854F0B">brown edge</text>
          <text x="340" y="215" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fill="#3B6D11" fontWeight="600">Center vein stays green</text>
        </svg>
        <div className="absolute bottom-1.5 right-2 bg-white/90 text-slate-700 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm pointer-events-none">
          Diagnostic
        </div>
      </div>
    );
  }

  // Fallback for any other id (shouldn't happen with current usage)
  return null;
};

export default function App() {
  const [activeTab, setActiveTab] = useState('database'); 
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [filterPart, setFilterPart] = useState('All');
  const [filterSeverity, setFilterSeverity] = useState('All'); 
  const [filterStage, setFilterStage] = useState('All Stages'); 
  const [viewMode, setViewMode] = useState('list'); 
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showTrappingGuide, setShowTrappingGuide] = useState(false);
  const [showLightGuide, setShowLightGuide] = useState(false);
  const [showDiagGuide, setShowDiagGuide] = useState(false);
  const [showMixGuide, setShowMixGuide] = useState(false);
  const [showBioGuide, setShowBioGuide] = useState(false);
  const [showMicrobeGuide, setShowMicrobeGuide] = useState(false);
  const [showDT50Guide, setShowDT50Guide] = useState(false);
  const [customImages, setCustomImages] = useState({});
  const [uploadModal, setUploadModal] = useState({ isOpen: false, pestId: null });
  const [tempFileUrl, setTempFileUrl] = useState(null);
  const [tempCredit, setTempCredit] = useState('');

  // --- N-CALCULATOR STATE ---
  const [showNCalc, setShowNCalc] = useState(false);
  const [calcNPercent, setCalcNPercent] = useState(15);
  const [calcBagWeight, setCalcBagWeight] = useState(25);
  const [calcTreesPerBag, setCalcTreesPerBag] = useState(25);

  const calculatedNPerTree = useMemo(() => {
    if (!calcBagWeight || !calcTreesPerBag || !calcNPercent) return 0;
    return ((calcNPercent / 100) * calcBagWeight) / calcTreesPerBag;
  }, [calcNPercent, calcBagWeight, calcTreesPerBag]);

  // --- SIMULATOR STATE ---
  const [stage, setStage] = useState('vegetative'); 
  const [nitrogen, setNitrogen] = useState(0.4); 
  const [rain, setRain] = useState('low');
  const [humidity, setHumidity] = useState(70);
  const [dryDays, setDryDays] = useState(3);
  const [nearForest, setNearForest] = useState(false);
  const [risks, setRisks] = useState({ sapSuckers: 0, borers: 0, fungal: 0, wildlife: 0 });

  // Add logic to determine if the current stage is critical for formulations
  const isCriticalStage = useMemo(() => {
    const criticalStages = ['pre-flowering', 'flower-bud', 'matchstick', 'full-bloom', 'early-fruit', 'wave-1-culling', 'wave-2-flush', 'rapid-expansion', 'maturation'];
    return criticalStages.includes(stage);
  }, [stage]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const sapStages = ['seedling', 'vegetative', 'wave-2-flush', 'post-harvest'];
    const borerStages = ['early-fruit', 'wave-1-culling', 'wave-2-flush', 'rapid-expansion', 'maturation'];
    const wildlifeStages = ['rapid-expansion', 'maturation'];

    let sap = (sapStages.includes(stage) ? 40 : 10) + (nitrogen * 30) + (dryDays > 4 ? 20 : 0);
    let bor = (borerStages.includes(stage) ? 60 : 10) + (rain === 'moderate' ? 10 : 0);
    let fun = (rain === 'high' ? 50 : (rain === 'moderate' ? 20 : 0)) + (humidity > 80 ? 30 : 0);
    let wild = (nearForest ? 50 : 0) + (wildlifeStages.includes(stage) ? 40 : 0);

    setRisks({
      sapSuckers: Math.min(100, Math.round(sap)),
      borers: Math.min(100, Math.round(bor)),
      fungal: Math.min(100, Math.round(fun)),
      wildlife: Math.min(100, Math.round(wild))
    });
  }, [stage, nitrogen, rain, humidity, dryDays, nearForest]);

  const filteredPests = useMemo(() => {
    return ALL_PESTS.filter(pest => {
      const matchCat = filterCat === 'All' || pest.category === filterCat;
      const matchPart = filterPart === 'All' || pest.part === filterPart || pest.part === 'General';
      const matchSearch = pest.common.toLowerCase().includes(search.toLowerCase()) || 
                          pest.scientific.toLowerCase().includes(search.toLowerCase());
      
      let matchSeverity = true;
      if (filterSeverity === 'Critical') matchSeverity = pest.severity >= 4;
      if (filterSeverity === 'Moderate') matchSeverity = pest.severity <= 3;

      let matchLifeStage = true;
      if (filterCat === 'All' || filterCat === 'Insects') {
         if (filterStage === 'Juveniles') {
             matchLifeStage = /(Nymph|Grub|Crawler|Caterpillar|Maggot|Larva)/i.test(pest.common);
         } else if (filterStage === 'Adults') {
             if (pest.category === 'Insects') {
                 matchLifeStage = !/(Nymph|Grub|Crawler|Caterpillar|Maggot|Larva)/i.test(pest.common);
             }
         }
      }

      return matchCat && matchPart && matchSearch && matchSeverity && matchLifeStage;
    });
  }, [search, filterCat, filterPart, filterSeverity, filterStage]);

  const openUploadModal = (pestId) => {
    const existing = customImages[pestId];
    setTempFileUrl(existing ? existing.url : null);
    setTempCredit(existing ? existing.credit : '');
    setUploadModal({ isOpen: true, pestId });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          // Cap maximum dimensions to maintain visual quality but drastically reduce file size
          const MAX_WIDTH = 1200; 
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to JPEG format at 80% quality (saves massive space in localStorage)
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setTempFileUrl(compressedDataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = () => {
    if (uploadModal.pestId) {
      setCustomImages(prev => ({
        ...prev,
        [uploadModal.pestId]: { url: tempFileUrl, credit: tempCredit }
      }));
    }
    setUploadModal({ isOpen: false, pestId: null });
  };

  const activePestTitle = useMemo(() => {
    if (!uploadModal.pestId) return '';
    return ALL_PESTS.find(p => p.id === uploadModal.pestId)?.common || 'Pest';
  }, [uploadModal.pestId]);

  const getWhatsAppUrl = (pest) => {
    let text = `AgriPro IPM Alert\n\nPest/Disease: ${pest.common}\nScientific: ${pest.scientific}\nSeverity Level: ${pest.severity}/5\nActivity: ${pest.activity}\n\nSymptoms: ${pest.symptoms}\n\nTarget Areas: ${pest.target}\n\nProtocol Summary: ${pest.control}`;
    
    if (pest.application && pest.application !== 'N/A' && !['Vertebrates'].includes(pest.category)) {
      text += `\n\nSpray Target: ${pest.application}`;
    }

    if (pest.moa && pest.moa !== 'N/A' && !['Vertebrates'].includes(pest.category)) {
      const categorized = categorizeMoa(pest.moa, pest.category);
      if (categorized) {
        text += `\n\n3-Phase Execution Strategy:`;
        [1, 2, 3].forEach((phase, index) => {
          const info = getPhaseInfo(phase, pest.category);
          const items = categorized[phase];
          
          text += `\n[${info.title}] :`;
          if (items && items.length > 0) {
            text += `\n${items.join('\n -> ROTATE (4-7 Days) TO: ')}`;
          } else {
            text += `\nProceed to next phase`;
          }
          
          // Add extra newline between phases for readability, except after the last phase
          if (index < 2) {
            text += `\n`;
          }
        });
      }
    }
    
    // Universal link handles iOS, Android, and Desktop reliably. 
    // Custom 'whatsapp://' schemes are often blocked by iOS Safari in embedded environments.
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  const getRiskColor = (score) => score >= 70 ? 'bg-red-500' : score >= 40 ? 'bg-orange-500' : 'bg-emerald-500';
  const getRiskText = (score) => score >= 70 ? 'text-red-700' : score >= 40 ? 'text-orange-700' : 'text-emerald-700';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24 relative">
      
      {showTopBtn && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[90] bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8"
          title="Back to Top"
        >
          <Icon name="arrow-up" className="w-8 h-8" />
        </button>
      )}

      {uploadModal.isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 p-4 md:p-6 animate-in fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setUploadModal({ isOpen: false, pestId: null }); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[95vh]">
            <div className="flex justify-between items-center p-5 md:p-6 border-b border-slate-200 bg-slate-50 flex-shrink-0">
              <h3 className="font-bold text-xl md:text-2xl text-slate-900 truncate pr-4">Upload Photo: {activePestTitle}</h3>
              <button onClick={() => setUploadModal({ isOpen: false, pestId: null })} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-600 flex-shrink-0">
                <Icon name="x" className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>
            
            <div className="p-5 md:p-8 space-y-6 md:space-y-8 overflow-y-auto">
              <div className="w-full h-56 md:h-72 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center relative overflow-hidden group">
                {tempFileUrl ? (
                  <img src={tempFileUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-slate-500">
                    <Icon name="image" className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 opacity-50" />
                    <span className="text-lg md:text-xl font-medium">No image selected</span>
                  </div>
                )}
                
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
                  <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" onChange={handleFileChange} />
                  {tempFileUrl && (
                    <div className="bg-slate-900/80 text-white px-4 py-2 md:px-5 md:py-3 rounded-full text-base md:text-lg font-bold flex items-center gap-2 md:gap-3 opacity-90 md:opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <Icon name="upload" className="w-4 h-4 md:w-5 md:h-5" /> Tap to Replace
                    </div>
                  )}
                </div>
              </div>

              {!tempFileUrl && (
                <div className="relative block w-full py-3 md:py-4 bg-emerald-100 text-emerald-800 text-center font-bold text-lg md:text-xl rounded-xl cursor-pointer hover:bg-emerald-200 transition-colors overflow-hidden">
                  <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" onChange={handleFileChange} />
                  Choose File from Device
                </div>
              )}

              <div className="space-y-2 md:space-y-3">
                <label className="text-lg md:text-xl font-bold text-slate-800 block">Copyright / Image Credit</label>
                <input 
                  type="text" 
                  placeholder="© Wikipedia/Photo by" 
                  value={tempCredit}
                  onChange={(e) => setTempCredit(e.target.value)}
                  className="w-full p-3 md:p-4 text-lg md:text-xl bg-white border-2 border-slate-300 rounded-xl outline-none focus:ring-4 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="p-5 md:p-6 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 md:gap-4 flex-shrink-0">
              <button onClick={() => setUploadModal({ isOpen: false, pestId: null })} className="px-5 py-2.5 md:px-6 md:py-3 font-bold text-lg md:text-xl text-slate-700 hover:bg-slate-200 rounded-xl transition-colors">Cancel</button>
              <button onClick={handleSaveImage} className="px-6 py-2.5 md:px-8 md:py-3 font-bold text-lg md:text-xl bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors shadow-md">Save Photo</button>
            </div>
          </div>
        </div>
      )}


      <header className="bg-emerald-900 text-white shadow-md sticky top-0 z-40">
        {/* Force Row layout for brand and tabs across all screen sizes to achieve "Top Right" requirement */}
        <div className="max-w-[90rem] mx-auto px-4 py-4 flex flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-emerald-800 p-1.5 md:p-2 rounded-lg border border-emerald-700 flex items-center justify-center">
              <Icon name="leaf" className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight leading-none text-white text-left">AGRIPRO DIPM</h1>
            </div>
          </div>
          
          {/* Tabs switch positioned top right */}
          <div className="flex bg-emerald-950 p-1 rounded-lg border border-emerald-800">
            <button 
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 md:px-5 md:py-2 rounded-md text-[11px] md:text-sm font-bold flex items-center gap-1.5 md:gap-2 transition-all ${activeTab === 'simulator' ? 'bg-emerald-600 text-white shadow-md' : 'text-emerald-400 hover:text-white'}`}
            >
              <Icon name="activity" className="w-3.5 h-3.5 md:w-4 md:h-4" /> <span className="hidden sm:inline">Risk Engine</span><span className="sm:hidden">Risk</span>
            </button>
            <button 
              onClick={() => setActiveTab('database')}
              className={`px-3 py-1.5 md:px-5 md:py-2 rounded-md text-[11px] md:text-sm font-bold flex items-center gap-1.5 md:gap-2 transition-all ${activeTab === 'database' ? 'bg-emerald-600 text-white shadow-md' : 'text-emerald-400 hover:text-white'}`}
            >
              <Icon name="search" className="w-3.5 h-3.5 md:w-4 md:h-4" /> <span className="hidden sm:inline">Database</span><span className="sm:hidden">DB</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[90rem] mx-auto mt-8 px-6">
        
        {/* --- TAB 1: RISK ENGINE --- */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-300">
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
                <div className="bg-slate-100 p-6 border-b border-slate-200 flex items-center gap-3">
                  <Icon name="settings" className="w-8 h-8 text-slate-700" />
                  <h2 className="font-bold text-2xl text-slate-900">Orchard Conditions</h2>
                </div>
                
                <div className="p-8 space-y-8">
                  <div className="space-y-4">
                    <label className="text-xl font-bold text-slate-800 flex items-center gap-3">
                      <Icon name="leaf" className="w-6 h-6 text-emerald-600"/> Growth Stage
                    </label>
                    <select value={stage} onChange={(e) => setStage(e.target.value)} className="w-full p-4 text-xl bg-slate-50 border-2 border-slate-300 rounded-xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all">
                      <option value="seedling">1. Seedling / Transplant</option>
                      <option value="vegetative">2. Vegetative (Flushing)</option>
                      <option value="pre-flowering">3. Pre-Flowering & Induction</option>
                      <option value="flower-bud">4. Flower Bud (Crab Eyes)</option>
                      <option value="matchstick">5. Matchstick Elongation</option>
                      <option value="full-bloom">6. Full Bloom (Anthesis)</option>
                      <option value="early-fruit">7. Early Fruit Set (0-10 DAA)</option>
                      <option value="wave-1-culling">8. 1st Wave: Embryo Culling (10-25 DAA)</option>
                      <option value="wave-2-flush">9. 2nd Wave: Flush Competition (35-50 DAA)</option>
                      <option value="rapid-expansion">10. Rapid Expansion</option>
                      <option value="maturation">11. Maturation & Natural Split</option>
                      <option value="post-harvest">12. Post-harvest Recovery</option>
                    </select>
                  </div>

                  <div className="space-y-4 border-t border-slate-200 pt-6">
                    <div className="flex justify-between items-center">
                      <label className="text-xl font-bold text-slate-800 flex items-center gap-3"><Icon name="activity" className="w-6 h-6 text-blue-600"/> Nitrogen (kg/tree)</label>
                      <div className="flex items-center gap-4">
                        <button onClick={() => setShowNCalc(!showNCalc)} className="text-sm font-bold text-blue-600 hover:text-blue-800 underline flex items-center gap-1">
                          <Icon name="calculator" className="w-4 h-4" /> Calculator
                        </button>
                        <span className="text-blue-700 font-extrabold bg-blue-100 px-3 py-1 rounded-lg text-xl">{nitrogen.toFixed(2)}</span>
                      </div>
                    </div>
                    <input type="range" min="0" max="1.5" step="0.05" value={nitrogen} onChange={(e) => setNitrogen(Number(e.target.value))} className="w-full h-3 accent-blue-600 rounded-lg"/>
                    
                    {showNCalc && (
                      <div className="bg-blue-50/50 p-6 rounded-2xl border-2 border-blue-200 mt-4 animate-in fade-in zoom-in-95">
                         <h4 className="font-extrabold text-blue-900 flex items-center gap-2 mb-4 text-lg"><Icon name="calculator" className="w-6 h-6"/> Element N Bag Calculator</h4>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">N value (%)</label>
                              <input type="number" value={calcNPercent} onChange={e=>setCalcNPercent(e.target.value === '' ? '' : Number(e.target.value))} onFocus={(e) => e.target.select()} className="w-full p-4 rounded-xl border-2 border-slate-300 mt-2 text-xl font-bold text-slate-800 focus:border-blue-500 outline-none" />
                            </div>
                            <div>
                              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Bag Weight (kg)</label>
                              <input type="number" value={calcBagWeight} onChange={e=>setCalcBagWeight(e.target.value === '' ? '' : Number(e.target.value))} onFocus={(e) => e.target.select()} className="w-full p-4 rounded-xl border-2 border-slate-300 mt-2 text-xl font-bold text-slate-800 focus:border-blue-500 outline-none" />
                            </div>
                            <div>
                              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Trees Per Bag</label>
                              <input type="number" value={calcTreesPerBag} onChange={e=>setCalcTreesPerBag(e.target.value === '' ? '' : Number(e.target.value))} onFocus={(e) => e.target.select()} className="w-full p-4 rounded-xl border-2 border-slate-300 mt-2 text-xl font-bold text-slate-800 focus:border-blue-500 outline-none" />
                            </div>
                         </div>
                         <div className="flex flex-col md:flex-row justify-between items-center bg-blue-100 p-5 rounded-xl mt-6 border border-blue-200 gap-4">
                           <div>
                             <span className="block text-sm text-blue-800 font-bold uppercase tracking-wider">Total N in bag: {(Number(calcNPercent||0)/100 * Number(calcBagWeight||0)).toFixed(2)} kg</span>
                             <span className="block text-2xl font-black text-blue-950 mt-1">Element N/tree: {calculatedNPerTree.toFixed(2)} kg</span>
                           </div>
                           <button onClick={() => { setNitrogen(parseFloat(calculatedNPerTree.toFixed(2))); setShowNCalc(false); }} className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-lg rounded-xl transition-colors shadow-md">Apply to Slider</button>
                         </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 border-t border-slate-200 pt-6">
                    <label className="text-xl font-bold text-slate-800 flex items-center gap-3"><Icon name="rain" className="w-6 h-6 text-cyan-600"/> Weather Pattern</label>
                    <div className="grid grid-cols-2 gap-4">
                      <select value={rain} onChange={(e) => setRain(e.target.value)} className="p-4 border-2 border-slate-300 rounded-xl text-xl bg-slate-50">
                        <option value="low">Dry Season</option>
                        <option value="moderate">Intermittent</option>
                        <option value="high">Monsoon / Wet</option>
                      </select>
                      <input type="number" placeholder="Dry Days" value={dryDays} onChange={(e) => setDryDays(e.target.value === '' ? '' : Number(e.target.value))} onFocus={(e) => e.target.select()} className="p-4 border-2 border-slate-300 rounded-xl text-xl bg-slate-50" title="Consecutive dry days" />
                    </div>
                    <div className="pt-4">
                       <label className="text-lg font-semibold text-slate-600 flex justify-between mb-3">Humidity <span>{humidity}%</span></label>
                       <input type="range" min="40" max="100" value={humidity} onChange={(e) => setHumidity(Number(e.target.value))} className="w-full h-3 accent-cyan-600 rounded-lg"/>
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-slate-200 pt-6">
                    <label className="flex items-center gap-4 p-5 bg-amber-50 border-2 border-amber-200 rounded-xl cursor-pointer hover:bg-amber-100 transition-colors">
                      <input type="checkbox" checked={nearForest} onChange={(e) => setNearForest(e.target.checked)} className="w-6 h-6 accent-amber-600"/>
                      <span className="text-xl font-bold text-amber-900 flex items-center gap-3"><Icon name="leaf" className="w-6 h-6"/> Orchard borders jungle/forest</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div><h3 className="font-extrabold text-slate-900 text-2xl">Sap-Sucking Insects</h3><p className="text-lg text-slate-600 mt-1">Leafhoppers, Pit Scale, Psyllids</p></div>
                    <Icon name="bug" className={`w-10 h-10 ${getRiskText(risks.sapSuckers)}`} />
                  </div>
                  <div className="flex items-end gap-4 mt-6">
                    <span className={`text-6xl font-black ${getRiskText(risks.sapSuckers)}`}>{risks.sapSuckers}%</span>
                    <div className="flex-1 pb-2"><div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${getRiskColor(risks.sapSuckers)} transition-all duration-500`} style={{width: `${risks.sapSuckers}%`}}/></div></div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div><h3 className="font-extrabold text-slate-900 text-2xl">Tissue Borers</h3><p className="text-lg text-slate-600 mt-1">Fruit Borer, Termites, Ambrosia</p></div>
                    <Icon name="bug" className={`w-10 h-10 ${getRiskText(risks.borers)}`} />
                  </div>
                  <div className="flex items-end gap-4 mt-6">
                    <span className={`text-6xl font-black ${getRiskText(risks.borers)}`}>{risks.borers}%</span>
                    <div className="flex-1 pb-2"><div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${getRiskColor(risks.borers)} transition-all duration-500`} style={{width: `${risks.borers}%`}}/></div></div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div><h3 className="font-extrabold text-slate-900 text-2xl">Fungal Pathogens</h3><p className="text-lg text-slate-600 mt-1">Phytophthora, White Root, Algae</p></div>
                    <Icon name="droplets" className={`w-10 h-10 ${getRiskText(risks.fungal)}`} />
                  </div>
                  <div className="flex items-end gap-4 mt-6">
                    <span className={`text-6xl font-black ${getRiskText(risks.fungal)}`}>{risks.fungal}%</span>
                    <div className="flex-1 pb-2"><div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${getRiskColor(risks.fungal)} transition-all duration-500`} style={{width: `${risks.fungal}%`}}/></div></div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div><h3 className="font-extrabold text-slate-900 text-2xl">Wildlife Intrusion</h3><p className="text-lg text-slate-600 mt-1">Macaques, Squirrels, Boars</p></div>
                    <Icon name="alert" className={`w-10 h-10 ${getRiskText(risks.wildlife)}`} />
                  </div>
                  <div className="flex items-end gap-4 mt-6">
                    <span className={`text-6xl font-black ${getRiskText(risks.wildlife)}`}>{risks.wildlife}%</span>
                    <div className="flex-1 pb-2"><div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${getRiskColor(risks.wildlife)} transition-all duration-500`} style={{width: `${risks.wildlife}%`}}/></div></div>
                  </div>
                </div>
              </div>

              {/* TIERED ACTION PLAN - LIGHT THEME */}
              <div className="bg-white text-slate-900 rounded-2xl shadow-md overflow-hidden mt-8 border-2 border-slate-200">
                <div className="p-6 bg-slate-100 border-b border-slate-200 flex items-center gap-3">
                  <Icon name="alert" className="w-8 h-8 text-amber-500" />
                  <h3 className="font-extrabold text-2xl text-slate-900">Tiered Action Plan (IPM)</h3>
                </div>
                <div className="p-8 space-y-6">
                  <div className={`flex gap-5 text-xl p-5 rounded-xl border-2 transition-colors ${risks.sapSuckers >= 70 ? 'bg-red-50 border-red-200 text-red-900' : risks.sapSuckers >= 40 ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                    <span className={`font-black w-40 flex-shrink-0 uppercase tracking-tighter ${risks.sapSuckers >= 70 ? 'text-red-700' : risks.sapSuckers >= 40 ? 'text-amber-700' : 'text-emerald-700'}`}>SAP SUCKERS:</span>
                    <span className="leading-relaxed font-semibold">
                      {risks.sapSuckers >= 70 ? "Outbreak conditions. Apply Imidacloprid/Acetamiprid late afternoon. Check twigs for Pit Scale craters." :
                       risks.sapSuckers >= 40 ? "Population growing. Apply Neem oil (1%) or insecticidal soap. Avoid applying high Nitrogen to reduce tender flush." :
                       "Preventative: Deploy yellow sticky traps for monitoring. Maintain beneficial insect habitats (ladybugs/lacewings)."}
                    </span>
                  </div>

                  <div className={`flex gap-5 text-xl p-5 rounded-xl border-2 transition-colors ${risks.borers >= 70 ? 'bg-red-50 border-red-200 text-red-900' : risks.borers >= 40 ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                    <span className={`font-black w-40 flex-shrink-0 uppercase tracking-tighter ${risks.borers >= 70 ? 'text-red-700' : risks.borers >= 40 ? 'text-amber-700' : 'text-emerald-700'}`}>BORERS/WOOD:</span>
                    <span className="leading-relaxed font-semibold">
                      {risks.borers >= 70 ? "Critical risk. Deploy High-Canopy Solar Light Traps immediately to intercept night-flying borer moths. Check trunks for termite mud tubes or ambrosia beetle frass." :
                       risks.borers >= 40 ? "Fruit development starting. Activate Solar Light Traps (High-Canopy) from dusk to midnight to block moth egg-laying. Ensure low-level traps are on for Chafer Beetles." :
                       "Preventative: Clear fallen branches and rotting fruits from orchard floor. Inspect living trunks for termite activity."}
                    </span>
                  </div>

                  <div className={`flex gap-5 text-xl p-5 rounded-xl border-2 transition-colors ${risks.fungal >= 70 ? 'bg-red-50 border-red-200 text-red-900' : risks.fungal >= 40 ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                    <span className={`font-black w-40 flex-shrink-0 uppercase tracking-tighter ${risks.fungal >= 70 ? 'text-red-700' : risks.fungal >= 40 ? 'text-amber-700' : 'text-emerald-700'}`}>FUNGAL:</span>
                    <span className="leading-relaxed font-semibold">
                      {risks.fungal >= 70 ? (
                        ['flower-bud', 'matchstick', 'full-bloom', 'early-fruit'].includes(stage) ? 
                          <span>High moisture alert! <strong className="text-red-700 uppercase">⚠️ Zero Copper Window Active!</strong> Do NOT use copper sprays or you will instantly abort the flowers. Apply a Phosphonate soil drench and spray <em>Bacillus subtilis</em> on the canopy immediately.</span> :
                          "High moisture alert. Ensure drainage channels are clear to prevent Phytophthora collar rot. Apply Phosphonate drench immediately."
                      ) : risks.fungal >= 40 ? (
                        ['flower-bud', 'matchstick', 'full-bloom', 'early-fruit'].includes(stage) ? 
                          <span>Conditions favorable for spores. <strong className="text-amber-800 uppercase">⚠️ Zero Copper Window Active!</strong> Do NOT spray copper fungicides preventatively. Switch to soft biologicals like <em>Bacillus subtilis</em> to protect delicate flowers.</span> :
                          "Conditions favorable for spores. Apply Trichoderma around tree base. Spray copper fungicides preventatively."
                      ) : 
                       `Preventative: ${stage === 'post-harvest' ? 'Ideal time for major structural canopy pruning to maximize airflow and sunlight for the next season.' : 'Perform only minor sanitary pruning (remove dead/diseased twigs); save major structural pruning for post-harvest to avoid fruit/flower drop.'}`}
                    </span>
                  </div>

                  <div className={`flex gap-5 text-xl p-5 rounded-xl border-2 transition-colors ${risks.wildlife >= 70 ? 'bg-red-50 border-red-200 text-red-900' : risks.wildlife >= 40 ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                    <span className={`font-black w-40 flex-shrink-0 uppercase tracking-tighter ${risks.wildlife >= 70 ? 'text-red-700' : risks.wildlife >= 40 ? 'text-amber-700' : 'text-emerald-700'}`}>WILDLIFE:</span>
                    <span className="leading-relaxed font-semibold">
                      {risks.wildlife >= 70 ? "High intrusion risk. Energize perimeter fences. Use zinc wraps to stop Civets. Apply slug pellets if Slugs spotted." :
                       risks.wildlife >= 40 ? "Attraction increasing. Clear forest brush near orchard edges. Guard dogs on active patrol." :
                       "Preventative: Conduct monthly checks on perimeter fences and repair any gaps. Secure waste bins."}
                    </span>
                  </div>

                  <div className="flex gap-5 text-xl p-5 rounded-xl border-2 transition-colors bg-indigo-50 border-indigo-200 text-indigo-900 mt-2">
                    <span className="font-black w-40 flex-shrink-0 uppercase tracking-tighter text-indigo-700 flex flex-col gap-1">
                      <span className="flex items-center gap-2"><Icon name="dollar-sign" className="w-5 h-5"/> FORMULATION:</span>
                      <span className="text-sm font-bold text-indigo-500">Cost Control</span>
                    </span>
                    <span className="leading-relaxed font-semibold">
                      {!isCriticalStage ? 
                        <span><strong className="text-emerald-700">Cost-Saving Mode Active:</strong> You are in a non-critical vegetative or recovery stage. To lower operational costs, prioritize generic <strong>Powder formulations (WP, SP, WG)</strong>. They are highly cost-effective and perfectly adequate for broad canopy maintenance.</span> :
                        <span><strong className="text-amber-700">Premium Protection Active:</strong> You are in a highly sensitive flowering/fruiting stage. Switch to <strong>Liquid formulations (EC, SC, SL, OD)</strong>. Though more expensive, they offer faster absorption, better rainfastness, and significantly lower the risk of burning delicate flowers or leaving chalky residues on premium fruit husks.</span>
                      }
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: FULL PEST DATABASE WITH CUSTOM UPLOADS --- */}
        {activeTab === 'database' && (
          <div className="animate-in fade-in duration-300">
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-col gap-5">
              
              <div className="flex flex-col xl:flex-row gap-4 w-full">
                <div className="relative flex-1">
                  <Icon name="search" className="w-6 h-6 absolute left-4 top-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search for..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-14 pr-6 py-3.5 text-lg font-medium bg-slate-50 border-2 border-slate-300 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
                  <div className="relative w-full md:w-64 flex-shrink-0">
                    <Icon name="filter" className="w-5 h-5 absolute left-4 top-4.5 text-slate-400" />
                    <select 
                      value={filterPart}
                      onChange={(e) => setFilterPart(e.target.value)}
                      className="w-full pl-12 pr-6 py-3.5 text-lg font-bold bg-slate-50 border-2 border-slate-300 rounded-xl outline-none focus:border-emerald-500 transition-all text-slate-700"
                    >
                      <option value="All">Target: All Areas</option>
                      <option value="Leaves">Leaves & Flushes</option>
                      <option value="Trunk/Branches">Trunks & Branches</option>
                      <option value="Roots">Roots & Soil</option>
                      <option value="Fruit/Flower">Fruits & Flowers</option>
                    </select>
                  </div>

                  <div className="relative w-full md:w-56 flex-shrink-0">
                    <Icon name="shield" className="w-5 h-5 absolute left-4 top-4.5 text-slate-400" />
                    <select 
                      value={filterSeverity}
                      onChange={(e) => setFilterSeverity(e.target.value)}
                      className="w-full pl-12 pr-6 py-3.5 text-lg font-bold bg-slate-50 border-2 border-slate-300 rounded-xl outline-none focus:border-emerald-500 transition-all text-slate-700"
                    >
                      <option value="All">Severity: All</option>
                      <option value="Critical">Critical (4-5 ●)</option>
                      <option value="Moderate">Moderate (1-3 ●)</option>
                    </select>
                  </div>

                  <div className="flex bg-slate-100 p-1 rounded-xl border-2 border-slate-200 w-full md:w-48 flex-shrink-0 h-[56px]">
                    <button 
                      onClick={() => setViewMode('list')}
                      className={`flex-1 flex items-center justify-center gap-2 rounded-lg font-bold transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-emerald-700 border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      <Icon name="list" className="w-5 h-5" /> <span className="hidden md:block">List</span>
                    </button>
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`flex-1 flex items-center justify-center gap-2 rounded-lg font-bold transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-emerald-700 border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      <Icon name="grid" className="w-5 h-5" /> <span className="hidden md:block">Grid</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 overflow-x-auto w-full pb-2 md:pb-0 hide-scrollbar pt-2 border-t border-slate-100">
                {['All', 'Insects', 'Fungi/Pathogens', 'Mites/Nematodes', 'Vertebrates', 'Molluscs', 'Weeds/Epiphytes'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => { setFilterCat(cat); setFilterStage('All Stages'); }} 
                    className={`px-5 py-2.5 rounded-full text-base font-bold whitespace-nowrap transition-colors ${filterCat === cat ? 'bg-slate-800 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {(filterCat === 'All' || filterCat === 'Insects') && (
                <div className="flex items-center gap-3 overflow-x-auto w-full pb-2 md:pb-0 hide-scrollbar pt-3 border-t border-slate-100 animate-in fade-in">
                  <Icon name="clock" className="w-5 h-5 text-slate-400 flex-shrink-0 hidden md:block" />
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap hidden md:block">Insect Stage:</span>
                  {[
                    { id: 'All Stages', label: 'All Stages' },
                    { id: 'Juveniles', label: '🐛 Juveniles (Nymphs/Grubs)' },
                    { id: 'Adults', label: '🦋 Adults (Winged/Moths)' }
                  ].map(stage => (
                    <button 
                      key={stage.id}
                      onClick={() => setFilterStage(stage.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border-2 ${filterStage === stage.id ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                      {stage.label}
                    </button>
                  ))}
                </div>
              )}

            </div>

            {(filterCat === 'All' || filterCat === 'Insects' || filterCat === 'Mites/Nematodes') && (filterPart === 'All' || filterPart === 'Leaves') && (
              <div className="max-w-4xl mx-auto mb-8 flex flex-col gap-4">
                
                <div>
                  <button 
                    onClick={() => setShowDiagGuide(!showDiagGuide)}
                    className="w-full bg-indigo-50 border-2 border-indigo-100 hover:border-indigo-300 text-indigo-900 p-4 rounded-2xl flex justify-between items-center transition-all shadow-sm group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-indigo-100 p-2.5 rounded-xl text-indigo-600 group-hover:bg-indigo-200 transition-colors">
                        <Icon name="book-open" className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                        <span className="block font-extrabold text-xl leading-tight">Field Diagnostics: Reading Leaf Curls</span>
                        <span className="block text-sm text-indigo-700 font-medium mt-0.5">Quickly identify pests by observing leaf shape deformations</span>
                      </div>
                    </div>
                    <Icon name={showDiagGuide ? "chevron-up" : "chevron-down"} className="w-8 h-8 text-indigo-400 group-hover:text-indigo-600 transition-colors flex-shrink-0" />
                  </button>

                  {showDiagGuide && (
                    <div className="bg-white border-2 border-indigo-100 rounded-2xl p-6 mt-4 shadow-md animate-in fade-in slide-in-from-top-4">
                      <p className="text-lg text-slate-600 font-medium mb-6">
                        Did you know the direction a leaf curls can help you identify the pest before you even see it? 
                        Here is a quick scouting guide based on leaf shape:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
                          <div className="flex items-center gap-3 mb-4">
                            <Icon name="chevron-down" className="w-8 h-8 text-amber-600" />
                            <h4 className="font-bold text-xl text-slate-800">Downward / Inward Curl<br/><span className="text-sm text-slate-500 font-medium">(Cupping Down)</span></h4>
                          </div>
                          
                          <AIIllustration 
                            id="downward_curl"
                            alt="Downward curling durian leaf — pests hide on the underside" 
                          />

                          <p className="text-slate-600 mb-4 leading-relaxed flex-1">
                            Pests are feeding aggressively on the <strong>underside</strong> of the leaf. Their toxic saliva halts cellular expansion on the bottom, while the top cells keep growing, forcing the leaf to bow downward like a tent.
                          </p>
                          <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <strong className="text-slate-800 block mb-2 uppercase tracking-wider text-xs">Common Culprits:</strong>
                            <ul className="list-disc pl-5 text-amber-700 font-bold text-sm space-y-1.5">
                              <li>Durian Psyllids</li>
                              <li>Black Citrus Aphids</li>
                              <li>Broad Mites</li>
                            </ul>
                          </div>
                          <p className="mt-4 text-sm font-bold text-indigo-600 flex items-center gap-2">
                            <Icon name="info" className="w-5 h-5 flex-shrink-0" /> Pro-Tip: Always flip these leaves over to find the colony.
                          </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
                          <div className="flex items-center gap-3 mb-4">
                            <Icon name="chevron-up" className="w-8 h-8 text-emerald-600" />
                            <h4 className="font-bold text-xl text-slate-800">Upward / Outward Curl<br/><span className="text-sm text-slate-500 font-medium">(Boat-Shaped)</span></h4>
                          </div>

                          <AIIllustration 
                            id="upward_curl"
                            alt="Upward curling durian leaf — crispy brown edges with green center vein" 
                          />

                          <p className="text-slate-600 mb-4 leading-relaxed flex-1">
                            Indicates severe vascular damage at the leaf margins or upper-surface feeding. The dead edges shrink and dry out, pulling the healthy green center of the leaf upward.
                          </p>
                          <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <strong className="text-slate-800 block mb-2 uppercase tracking-wider text-xs">Common Culprits:</strong>
                            <ul className="list-disc pl-5 text-emerald-700 font-bold text-sm space-y-1.5">
                              <li>Chilli Thrips</li>
                              <li>Green Leafhoppers (Hopperburn)</li>
                              <li>Eriophyid Mites</li>
                            </ul>
                          </div>
                          <p className="mt-4 text-sm font-bold text-indigo-600 flex items-center gap-2">
                            <Icon name="info" className="w-5 h-5 flex-shrink-0" /> Pro-Tip: Indicates highly mobile/flying pests.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <button 
                    onClick={() => setShowTrappingGuide(!showTrappingGuide)}
                    className="w-full bg-emerald-50 border-2 border-emerald-100 hover:border-emerald-300 text-emerald-900 p-4 rounded-2xl flex justify-between items-center transition-all shadow-sm group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600 group-hover:bg-emerald-200 transition-colors">
                        <Icon name="eye" className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                        <span className="block font-extrabold text-xl leading-tight">Visual Trapping & Diurnal IPM</span>
                        <span className="block text-sm text-emerald-700 font-medium mt-0.5">Using colors to manage and monitor insect outbreaks</span>
                      </div>
                    </div>
                    <Icon name={showTrappingGuide ? "chevron-up" : "chevron-down"} className="w-8 h-8 text-emerald-400 group-hover:text-emerald-600 transition-colors flex-shrink-0" />
                  </button>

                  {showTrappingGuide && <TrappingGuide />}
                </div>

                <div>
                  <button 
                    onClick={() => setShowLightGuide(!showLightGuide)}
                    className="w-full bg-amber-50 border-2 border-amber-100 hover:border-amber-300 text-amber-900 p-4 rounded-2xl flex justify-between items-center transition-all shadow-sm group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-amber-100 p-2.5 rounded-xl text-amber-600 group-hover:bg-amber-200 transition-colors">
                        <Icon name="lightbulb" className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                        <span className="block font-extrabold text-xl leading-tight">Nocturnal Light Trapping (Solar Lamps)</span>
                        <span className="block text-sm text-amber-700 font-medium mt-0.5">Targeting Fruit Borer Moths & Chafer Beetles at night</span>
                      </div>
                    </div>
                    <Icon name={showLightGuide ? "chevron-up" : "chevron-down"} className="w-8 h-8 text-amber-400 group-hover:text-amber-600 transition-colors flex-shrink-0" />
                  </button>

                  {showLightGuide && <LightTrappingGuide />}
                </div>

                <div>
                  <button 
                    onClick={() => setShowMixGuide(!showMixGuide)}
                    className="w-full bg-violet-50 border-2 border-violet-100 hover:border-violet-300 text-violet-900 p-4 rounded-2xl flex justify-between items-center transition-all shadow-sm group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-violet-100 p-2.5 rounded-xl text-violet-600 group-hover:bg-violet-200 transition-colors">
                        <Icon name="beaker" className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                        <span className="block font-extrabold text-xl leading-tight">Advanced Agronomy: Tank-Mixing & Synergy</span>
                        <span className="block text-sm text-violet-700 font-medium mt-0.5">Golden pH rules and creating 1+1=3 chemical cocktails</span>
                      </div>
                    </div>
                    <Icon name={showMixGuide ? "chevron-up" : "chevron-down"} className="w-8 h-8 text-violet-400 group-hover:text-violet-600 transition-colors flex-shrink-0" />
                  </button>

                  {showMixGuide && <TankMixGuide />}
                </div>

                <div>
                  <button 
                    onClick={() => setShowBioGuide(!showBioGuide)}
                    className="w-full bg-lime-50 border-2 border-lime-100 hover:border-lime-300 text-lime-900 p-4 rounded-2xl flex justify-between items-center transition-all shadow-sm group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-lime-100 p-2.5 rounded-xl text-lime-600 group-hover:bg-lime-200 transition-colors">
                        <Icon name="leaf" className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                        <span className="block font-extrabold text-xl leading-tight">Biological Warfare: Bacillus vs Fungi</span>
                        <span className="block text-sm text-lime-700 font-medium mt-0.5">How beneficial bacteria obliterate pathogens like Rhizoctonia</span>
                      </div>
                    </div>
                    <Icon name={showBioGuide ? "chevron-up" : "chevron-down"} className="w-8 h-8 text-lime-400 group-hover:text-lime-600 transition-colors flex-shrink-0" />
                  </button>

                  {showBioGuide && <BioControlGuide />}
                </div>

                <div>
                  <button 
                    onClick={() => setShowMicrobeGuide(!showMicrobeGuide)}
                    className="w-full bg-teal-50 border-2 border-teal-100 hover:border-teal-300 text-teal-900 p-4 rounded-2xl flex justify-between items-center transition-all shadow-sm group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-teal-100 p-2.5 rounded-xl text-teal-600 group-hover:bg-teal-200 transition-colors">
                        <Icon name="shield" className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                        <span className="block font-extrabold text-xl leading-tight">Probiotic Agronomy: The Elite 15 Microbes</span>
                        <span className="block text-sm text-teal-700 font-medium mt-0.5">Build a self-sustaining defense grid with advanced bio-agents</span>
                      </div>
                    </div>
                    <Icon name={showMicrobeGuide ? "chevron-up" : "chevron-down"} className="w-8 h-8 text-teal-400 group-hover:text-teal-600 transition-colors flex-shrink-0" />
                  </button>

                  {showMicrobeGuide && <MicrobeGuide />}
                </div>

                <div>
                  <button 
                    onClick={() => setShowDT50Guide(!showDT50Guide)}
                    className="w-full bg-sky-50 border-2 border-sky-100 hover:border-sky-300 text-sky-900 p-4 rounded-2xl flex justify-between items-center transition-all shadow-sm group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-sky-100 p-2.5 rounded-xl text-sky-600 group-hover:bg-sky-200 transition-colors">
                        <Icon name="clock" className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                        <span className="block font-extrabold text-xl leading-tight">Chemical Lifespan (DT₅₀) & MRLs</span>
                        <span className="block text-sm text-sky-700 font-medium mt-0.5">Database for environmental degradation times and export safety</span>
                      </div>
                    </div>
                    <Icon name={showDT50Guide ? "chevron-up" : "chevron-down"} className="w-8 h-8 text-sky-400 group-hover:text-sky-600 transition-colors flex-shrink-0" />
                  </button>

                  {showDT50Guide && <DT50Guide />}
                </div>

              </div>
            )}

            <div className={viewMode === 'list' ? "flex flex-col gap-8 max-w-4xl mx-auto" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"}>
              {filteredPests.map(pest => {
                const imgData = customImages[pest.id];
                const primaryName = pest.scientific.split('/')[0].split(',')[0].trim();
                
                let searchSuffix = "";
                const lowerCommon = pest.common.toLowerCase();
                if (lowerCommon.includes('crawler')) searchSuffix = " crawler";
                else if (lowerCommon.includes('nymph') || lowerCommon.includes('hopper')) searchSuffix = " nymph";
                else if (lowerCommon.includes('grub') || lowerCommon.includes('larva')) searchSuffix = " larva";
                else if (lowerCommon.includes('caterpillar') || lowerCommon.includes('maggot')) searchSuffix = " larva";
                else if (lowerCommon.includes('adult') || lowerCommon.includes('moth') || lowerCommon.includes('beetle')) searchSuffix = " adult";
                const searchQuery = `${primaryName}${searchSuffix}`;
                
                const isGrid = viewMode === 'grid';
                const categorizedMoa = categorizeMoa(pest.moa, pest.category);

                return (
                <div key={pest.id} className={`bg-white shadow-md border-2 border-slate-200 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 relative group ${isGrid ? 'rounded-2xl h-[520px]' : 'rounded-3xl'}`}>
                  
                  <div className={`relative w-full border-b-2 border-slate-200 flex-shrink-0 ${isGrid ? 'h-48' : 'h-80'} ${imgData && imgData.url ? 'bg-slate-900' : 'bg-slate-100'}`}>
                    {imgData && imgData.url ? (
                      <>
                        <img src={imgData.url} alt={pest.common} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/30 to-transparent pointer-events-none"></div>
                        {imgData.credit && !isGrid && (
                          <div className="absolute bottom-4 right-4 bg-black/70 text-white/95 text-sm font-medium px-3 py-1.5 rounded-md backdrop-blur-md pointer-events-none z-10">
                            {imgData.credit}
                          </div>
                        )}
                        <button onClick={() => openUploadModal(pest.id)} className="absolute top-4 right-4 bg-black/60 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90 shadow-xl backdrop-blur-md z-20" title="Edit Photo">
                          <Icon name="camera" className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center overflow-hidden relative">
                        <Icon name="image" className={`text-slate-200 absolute opacity-50 pointer-events-none ${isGrid ? 'w-24 h-24' : 'w-48 h-48'}`} />
                        <button onClick={() => openUploadModal(pest.id)} className={`absolute flex items-center gap-2 bg-white shadow-sm hover:shadow-md rounded-xl transition-all cursor-pointer border-2 border-slate-200 hover:border-emerald-400 text-slate-700 hover:text-emerald-700 z-20 ${isGrid ? 'top-3 right-3 p-2' : 'top-6 right-6 px-5 py-3'}`}>
                          <Icon name="camera" className={isGrid ? "w-5 h-5" : "w-6 h-6"} />
                          {!isGrid && <span className="text-lg font-extrabold">Add Photo</span>}
                        </button>
                      </div>
                    )}
                    
                    <div className={`absolute bottom-0 left-0 w-full pointer-events-none z-10 ${isGrid ? 'px-4 pb-3' : 'px-6 pb-4'}`}>
                      {!isGrid && (
                        <span className={`inline-block px-3 py-1 rounded-md text-xs uppercase font-bold tracking-wider mb-2 text-white shadow-sm ${
                          pest.category === 'Insects' ? 'bg-amber-600' : pest.category === 'Fungi/Pathogens' ? 'bg-blue-600' :
                          pest.category === 'Vertebrates' ? 'bg-orange-600' : pest.category === 'Molluscs' ? 'bg-pink-600' : 
                          pest.category === 'Weeds/Epiphytes' ? 'bg-teal-600' : 'bg-purple-600'
                        }`}>
                          {pest.category}
                        </span>
                      )}
                      <h3 className={`font-extrabold leading-tight ${isGrid ? 'text-2xl' : 'text-4xl'} ${imgData && imgData.url ? 'text-white drop-shadow-lg' : 'text-slate-900'}`}>
                        {pest.common}
                      </h3>
                      {!isGrid && (
                        <p className={`text-xl italic mt-2 font-medium ${imgData && imgData.url ? 'text-emerald-300 drop-shadow-md' : 'text-emerald-700'}`}>
                          {pest.scientific}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className={`flex-1 bg-white flex flex-col ${isGrid ? 'p-5 space-y-4' : 'p-8 space-y-6 text-xl text-slate-900'}`}>
                    
                    <div className="flex flex-col gap-3">
                       <div className="flex items-center justify-between gap-3">
                         <div className="flex items-center gap-3">
                           <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Severity</span>
                           <SeverityDots rating={pest.severity} />
                         </div>
                         {isGrid && pest.activity !== 'N/A' && (
                           <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 border border-slate-200 px-2 py-1 rounded-md bg-slate-50">
                             <Icon name={getActivityIcon(pest.activity)} className="w-3.5 h-3.5 text-indigo-500" />
                             {pest.activity}
                           </span>
                         )}
                       </div>
                       <div className="flex flex-wrap gap-2">
                         {pest.stages.map(s => (
                           <span key={s} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold uppercase rounded-md border border-slate-200">
                             {s}
                           </span>
                         ))}
                       </div>
                    </div>

                    {!isGrid && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-6 border-b-2 border-slate-100 mt-4">
                         <div>
                           <span className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Family</span>
                           <span className="font-extrabold text-slate-800 text-lg">{pest.family}</span>
                         </div>
                         <div>
                           <span className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Genus</span>
                           <span className="font-extrabold text-slate-800 text-lg italic">{pest.genus}</span>
                         </div>
                         <div>
                           <span className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Action/Type</span>
                           <span className="font-extrabold text-slate-800 text-lg">{pest.type}</span>
                         </div>
                         <div>
                           <span className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Activity</span>
                           <span className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
                             <Icon name={getActivityIcon(pest.activity)} className="w-5 h-5 text-indigo-500" />
                             {pest.activity}
                           </span>
                         </div>
                      </div>
                    )}

                    {!isGrid && (
                      <div>
                        <span className="flex items-center gap-2 text-lg font-bold text-slate-500 uppercase tracking-wider mb-2"><Icon name="leaf" className="w-5 h-5"/> Target Area</span>
                        <p className="font-medium leading-relaxed">{pest.target} ({pest.part})</p>
                      </div>
                    )}

                    <div>
                      {!isGrid && <span className="flex items-center gap-2 text-lg font-bold text-slate-500 uppercase tracking-wider mb-2"><Icon name="info" className="w-5 h-5"/> Symptoms & Hiding</span>}
                      <p className={isGrid ? "text-sm text-slate-600 line-clamp-4 leading-relaxed font-medium" : "mb-2 leading-relaxed"}>
                        {!isGrid && <strong className="text-slate-900 font-extrabold">Symptoms: </strong>}
                        {pest.symptoms}
                      </p>
                      {!isGrid && <p className="leading-relaxed"><strong className="text-slate-900 font-extrabold">Hiding:</strong> {pest.hiding}</p>}
                    </div>

                    {!isGrid && pest.lifecycle !== 'N/A' && (
                      <div className="bg-slate-50 p-5 rounded-xl border-2 border-slate-200 mt-6">
                        <span className="block text-lg font-bold text-slate-600 uppercase tracking-wider mb-2">Life Cycle / Interaction</span>
                        <p className="text-lg leading-relaxed font-medium text-slate-800">
                          {pest.lifecycle} 
                          {pest.symbiosis && !['None', 'None.', 'N/A'].includes(pest.symbiosis) && (
                            <span className="text-slate-600 italic ml-1">{pest.symbiosis}</span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className={`${isGrid ? 'p-5 border-t border-emerald-100 bg-emerald-50 mt-auto' : 'p-8 bg-emerald-50 border-t-2 border-emerald-100'}`}>
                    
                    {!isGrid && (
                      <div className="mb-4 flex flex-col gap-3">
                        <div className="flex flex-wrap gap-2">
                          {pest.ipm.map(tag => {
                            const tagColor = tag === 'Chemical' ? 'bg-rose-100 text-rose-800 border-rose-200' : 
                                             tag === 'Biological' ? 'bg-lime-100 text-lime-800 border-lime-200' : 
                                             tag === 'Physical' ? 'bg-sky-100 text-sky-800 border-sky-200' :
                                             'bg-indigo-100 text-indigo-800 border-indigo-200';
                            return <span key={tag} className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${tagColor}`}>IPM: {tag}</span>
                          })}
                        </div>
                        
                        {pest.application && !['Vertebrates'].includes(pest.category) && (
                          <div className="flex flex-wrap gap-2 items-center w-full bg-indigo-50/80 p-2.5 rounded-xl border border-indigo-200 mt-1 mb-2">
                            <span className="text-xs font-black text-indigo-800 uppercase tracking-wider flex items-center gap-1.5 mr-1">
                              <Icon name="target" className="w-4 h-4 text-indigo-600" /> Spray Target:
                            </span>
                            <span className="px-3 py-1 rounded-md text-xs font-bold bg-white text-indigo-900 border border-indigo-200 shadow-sm">
                              {pest.application}
                            </span>
                          </div>
                        )}

                        {/* NEW 3-PHASE EXECUTION STRATEGY (LIST VIEW ONLY) */}
                        {categorizedMoa && (
                          <div className="mt-2 mb-6">
                            <span className="flex items-center gap-2 font-black text-slate-800 uppercase tracking-wider mb-3 text-lg">
                              <Icon name="activity" className="w-6 h-6 text-indigo-500"/> 3-Phase Execution Strategy
                            </span>
                            
                            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3.5 rounded-xl mb-4 text-sm font-medium flex items-start gap-3 shadow-sm">
                              <Icon name="alert" className="w-5 h-5 flex-shrink-0 text-amber-600 mt-0.5" />
                              <p><strong className="font-black uppercase tracking-wider">Do Not Tank Mix:</strong> If a phase lists multiple chemicals, do not spray them together. Apply the top chemical, wait 4 to 7 days, then rotate to the bottom chemical to break resistance.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                              {[1, 2, 3].map(phase => {
                                const info = getPhaseInfo(phase, pest.category);
                                const items = categorizedMoa[phase];
                                const colorMap = {
                                   red: { bg: 'bg-red-50/80', border: 'border-red-200', text: 'text-red-700', textDesc: 'text-red-900', badge: 'bg-white text-red-700 border-red-200', icon: 'target' },
                                   amber: { bg: 'bg-amber-50/80', border: 'border-amber-200', text: 'text-amber-700', textDesc: 'text-amber-900', badge: 'bg-white text-amber-700 border-amber-200', icon: 'shield' },
                                   emerald: { bg: 'bg-emerald-50/80', border: 'border-emerald-200', text: 'text-emerald-700', textDesc: 'text-emerald-900', badge: 'bg-white text-emerald-700 border-emerald-200', icon: 'leaf' }
                                };
                                const theme = colorMap[info.color];
                                return (
                                  <div key={phase} className={`${theme.bg} p-4 rounded-xl border ${theme.border} shadow-sm flex flex-col h-full`}>
                                    <span className={`${theme.text} font-black text-[11px] uppercase tracking-wider mb-1.5 flex items-center gap-1.5`}>
                                       <Icon name={theme.icon} className="w-4 h-4"/> {info.title}
                                    </span>
                                    <span className={`${theme.textDesc} text-sm font-medium mb-4 flex-1`}>{info.desc}</span>
                                    <div className="flex flex-col gap-2 mt-auto">
                                      {items.length > 0 ? items.map((code, index) => {
                                         const tag = getMobilityTag(code);
                                         return (
                                           <React.Fragment key={code}>
                                              {index > 0 && (
                                                <div className="flex justify-center my-0.5 relative z-10">
                                                   <span className={`text-[9px] font-black uppercase tracking-wider bg-white px-2 py-0.5 rounded-full border shadow-sm ${theme.text} ${theme.border}`}>Rotate (4-7 Days Later)</span>
                                                </div>
                                              )}
                                              <div className="flex flex-col w-full">
                                                <span className={`${theme.badge} px-2 py-1.5 rounded-t-md text-xs font-bold shadow-sm text-center leading-tight border border-b-0`}>{code}</span>
                                                <span className={`${tag.color} text-[9px] uppercase tracking-wider px-2 py-1 rounded-b-md border font-black text-center shadow-sm`}>{tag.label}</span>
                                              </div>
                                           </React.Fragment>
                                         )
                                      }) : (
                                         <span className="text-xs font-bold opacity-50 italic text-center py-2">Proceed to next phase</span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* COMPACT ROTATION FOR GRID VIEW */}
                    {isGrid && pest.moa !== 'N/A' && !['Vertebrates'].includes(pest.category) && (
                       <div className="flex flex-wrap gap-2 items-stretch w-full bg-slate-100 p-2.5 rounded-xl border border-slate-200 mb-3">
                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1 py-1">
                           <Icon name="shield" className="w-3 h-3 text-amber-500" /> Rotate:
                         </span>
                         {pest.moa.split(' 🔄 ').slice(0, 2).map((code, idx) => {
                           return (
                             <div key={idx} className="flex flex-col flex-1 min-w-[80px]">
                               <span className="px-1.5 py-1 rounded-md text-[10px] font-bold bg-white text-amber-700 border border-amber-200 shadow-sm flex items-center gap-1 h-full truncate">
                                 <span className="bg-amber-100 text-amber-800 w-3 h-3 flex items-center justify-center rounded-full text-[8px] flex-shrink-0 font-black">{idx + 1}</span> 
                                 <span className="truncate">{code.split(' (')[0]}</span>
                               </span>
                             </div>
                           );
                         })}
                       </div>
                    )}

                    <span className={`flex items-center gap-2 font-black text-emerald-900 uppercase tracking-wider mb-3 ${isGrid ? 'text-sm' : 'text-lg border-t-2 border-emerald-200/50 pt-4'}`}>
                      <Icon name="info" className={isGrid ? "w-4 h-4" : "w-6 h-6"}/> Protocol Summary
                    </span>
                    
                    <p className={`text-emerald-950 font-medium ${isGrid ? 'text-sm line-clamp-3 mb-4' : 'text-xl leading-relaxed mb-6'}`}>
                      {pest.control}
                    </p>
                    
                    <div className={`flex gap-3 ${isGrid ? 'flex-col' : 'flex-col md:flex-row mt-4'}`}>
                      <a 
                        href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(searchQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-between font-bold text-emerald-600 hover:text-emerald-800 transition-all bg-white border-2 border-emerald-200 hover:border-emerald-400 shadow-sm hover:shadow-md group ${isGrid ? 'px-4 py-2.5 rounded-lg text-sm' : 'flex-col px-6 pt-4 pb-3 rounded-xl text-lg text-left'}`}
                      >
                        <span className={isGrid ? "truncate" : "pr-4 leading-tight w-full"}>{isGrid ? 'Image Search' : `Search images of ${searchQuery}`}</span>
                        <div className={isGrid ? "" : "w-full flex justify-end mt-2"}>
                          <Icon name="link" className={`${isGrid ? "w-4 h-4" : "w-6 h-6"} opacity-50 group-hover:opacity-100 transition-opacity`} />
                        </div>
                      </a>
                      
                      <a 
                        href={getWhatsAppUrl(pest)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all border-2 border-emerald-700 shadow-sm hover:shadow-md ${isGrid ? 'px-4 py-2.5 rounded-lg text-sm w-full' : 'px-6 py-4 rounded-xl text-lg'}`}
                        title="Share Alert to Field Team via WhatsApp"
                      >
                        <Icon name="share" className={isGrid ? "w-4 h-4" : "w-6 h-6"} />
                        {isGrid ? 'Share Alert' : 'Send Alert'}
                      </a>
                    </div>
                  </div>
                </div>
              )})}
            </div>

            {filteredPests.length === 0 && (
              <div className="text-center py-32 text-slate-500 bg-white rounded-3xl border-2 border-slate-200 shadow-sm">
                <Icon name="search" className="w-20 h-20 mx-auto text-slate-300 mb-6" />
                <h3 className="text-3xl font-extrabold text-slate-800">No pests found</h3>
                <p className="text-xl mt-2 font-medium">Try adjusting your Target Area or Category filter.</p>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}