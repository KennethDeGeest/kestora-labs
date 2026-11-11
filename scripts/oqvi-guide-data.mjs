const PLANTNET = { label: 'Pl@ntNet — Identification workflow', url: 'https://docs.plantnet.org/en/cookbook/plantnet-s-main-features/' };
const UMN_TREE = { label: 'University of Minnesota Extension — Beginner tree identification', url: 'https://extension.umn.edu/news/what-tree-beginners-guide-tree-id-your-neighborhood' };
const PENN_LEAF = { label: 'Penn State Extension — Hardwood identification', url: 'https://extension.psu.edu/from-the-woods-ten-important-hardwoods' };

export default [
  {
    slug:'best-plant-identification-apps', title:'Best Plant Identification Apps for iPhone', h1:'The best plant identifier fits what happens after the answer',
    description:'Compare plant identification apps for iPhone by scope, privacy, collection tools and price model, including Oqvi, Pl@ntNet, Seek and Apple Visual Look Up.',
    lead:'A name is useful. The better question is whether you want a quick lookup, a public nature community or a private record of what you found.', french:'/fr/oqvi/identificateur-plantes/',
    quickAnswer:{question:'Which plant identification app is the best fit?',answer:'Choose Oqvi for a private iPhone field collection covering plants, trees, leaves, flowers, bark and wood. Choose another option for unlimited free community identification, wider wildlife coverage or an occasional built-in lookup.'},
    sections:[
      {id:'options',toc:'Four options',title:'Four strong options for different jobs',table:{headers:['Option','Best for','Tradeoff'],rows:[['Oqvi','Private multi-material collection, follow-up questions and notes','One free identification, then subscription'],['Pl@ntNet','Free collaborative plant identification','Community-oriented workflow and account features'],['Seek by iNaturalist','Free nature exploration beyond plants','Less focused on a private botanical collection'],['Apple Visual Look Up','Occasional lookup from Photos','Availability and supported results vary']]}},
      {id:'criteria',toc:'What to compare',title:'Compare the experience after identification',prompts:[['Scope','Plants only, broader wildlife, or bark and wood too?'],['Evidence','Can you keep several photos and field notes together?'],['Privacy','Is an account required and where is the collection stored?'],['Follow-up','Can you ask questions or compare another feature?'],['Price','Free, limited allowance, subscription or built-in feature?']]},
      {id:'fit',toc:'When Oqvi fits',title:'When Oqvi is—and is not—the fit',paragraphs:['Oqvi fits repeated private discoveries on iPhone: identify a candidate, ask a follow-up question and keep photos, notes, favorites and optional places together. Choose another option when you need unlimited no-cost identification, a public community, Android support or wildlife coverage beyond botanical materials.'],note:'Disclosure: Kestora Labs makes Oqvi. App listings and offers change; verify current features, pricing and privacy information before choosing.'},
      {id:'uncertainty',toc:'Verify results',title:'Treat every result as a suggestion',paragraphs:['Photo identification can narrow possibilities but cannot certify identity, safety or suitability. Compare several independent features with a regional key or qualified expert when the answer matters.']}
    ],
    sources:[PLANTNET,{label:'Seek by iNaturalist',url:'https://www.inaturalist.org/pages/seek_app'},{label:'Apple — Visual Look Up',url:'https://support.apple.com/en-gb/104962'}],
    related:[{title:'Plant identifier apps for iPhone',url:'../plant-identifier-app-for-iphone/'},{title:'How to identify plants',url:'../how-to-identify-plants/'}]
  },
  {
    slug:'free-plant-identification-app', title:'Free Plant Identification Apps: What “Free” Really Means', h1:'Free should describe the whole experience',
    description:'Compare free plant identification options for iPhone and understand trials, limits, accounts and privacy before choosing an app.',
    lead:'A free download can mean unlimited identification, one free result, a trial or a built-in phone feature. Here is how to tell the difference.', french:'/fr/oqvi/application-identification-plantes/',
    quickAnswer:{question:'Is Oqvi a free plant identifier?',answer:'Oqvi is free to download and includes one free identification. Additional photo identifications and AI questions use a monthly or yearly auto-renewable subscription.'},
    sections:[
      {id:'models',toc:'Four free models',title:'Four meanings of “free”',prompts:[['Unlimited free','Identification remains available without payment.'],['Free allowance','A small number of results is included before payment.'],['Timed trial','Paid access starts after a trial unless cancelled.'],['Built-in feature','The phone supplies occasional supported lookups without another app.']]},
      {id:'check',toc:'Before subscribing',title:'Check these details before tapping subscribe',list:['How many identifications remain free?','Does the trial renew automatically?','Can you still view saved discoveries without paying?','Is an account required?','What data is uploaded for identification?','Can you export or delete your collection?']},
      {id:'oqvi',toc:'Oqvi pricing',title:'Oqvi’s model, plainly',paragraphs:['Oqvi includes one free identification. Continued photo identification and AI follow-up questions require a monthly or yearly subscription. Your storefront shows the current price and renewal terms before purchase.']},
      {id:'choose',toc:'Choose by use',title:'Choose around your real use',paragraphs:['For occasional supported photos, start with Apple Visual Look Up. For unlimited community identification, consider Pl@ntNet or Seek. Choose Oqvi when a private, organized field collection and botanical follow-up questions justify the paid path.']}
    ],
    sources:[{label:'Pl@ntNet — Getting started',url:'https://docs.plantnet.org/en/get-started/'},{label:'iNaturalist — Difference between iNaturalist and Seek',url:'https://help.inaturalist.org/en/support/solutions/articles/151000169914-what-is-the-difference-between-inaturalist-and-seek-by-inaturalist-'},{label:'Apple — Visual Look Up',url:'https://support.apple.com/en-gb/104962'}],
    related:[{title:'Best plant identification apps',url:'../best-plant-identification-apps/'},{title:'Plant identifier apps for iPhone',url:'../plant-identifier-app-for-iphone/'}]
  },
  {
    slug:'how-to-identify-a-tree', title:'How to Identify a Tree: A Repeatable Field Method', h1:'Identify the tree by building a case',
    description:'Identify a tree step by step using region, overall form, leaves, bark, buds, fruit and a regional key.',
    lead:'Good field identification is not a lucky match. It is a sequence of observations that makes the possibilities smaller and the uncertainty visible.',
    quickAnswer:{question:'What is the best way to identify a tree?',answer:'Start with region and overall form, then compare leaves, twigs, bark and seasonal structures. Keep the candidate uncertain until several independent features agree.'},
    sections:[
      {id:'method',toc:'Seven-step method',title:'A seven-step tree identification method',list:['Record the region, habitat and whether the tree appears planted.','Step back for size, crown shape and branching habit.','Check whether leaves or twigs are opposite, alternate or whorled.','Describe simple versus compound leaves, margin, veins and texture.','Photograph bark as a repeating pattern, not only a color.','Look for buds, flowers, fruit, cones or seeds.','Compare the full evidence with a regional key.']},
      {id:'record',toc:'Record evidence',title:'Keep observations separate from conclusions',table:{headers:['Observation','Interpretation'],rows:[['Leaves opposite on twig','Narrows the candidate group'],['Deep ridges repeat up trunk','A bark feature to compare'],['Tree beside a planted path','May be cultivated rather than locally wild']]}},
      {id:'season',toc:'Revisit by season',title:'Revisit the same tree',paragraphs:['Leaves, flowers, fruit, buds and bark become useful at different times. A return visit can turn an uncertain suggestion into a stronger identification without forcing certainty from one season.']},
      {id:'expert',toc:'When expertise matters',title:'Know when a professional answer is needed',paragraphs:['Use a qualified arborist, botanist or relevant authority for tree health, hazard assessment, legal questions, poisoning risk or any decision involving consumption or treatment.']}
    ], sources:[UMN_TREE], related:[{title:'Identify a tree by its leaf',url:'../identify-tree-by-leaf/'},{title:'Tree bark identifier guide',url:'../tree-bark-identifier/'}]
  },
  {
    slug:'how-to-identify-plants', title:'How to Identify Plants from Photos and Field Clues', h1:'Name the clues before you name the plant',
    description:'Learn a repeatable plant identification method using growth habit, leaves, stems, flowers, fruit, habitat and several clear photos.',
    lead:'Identification improves when you record what is actually present before accepting a suggestion.', french:'/fr/oqvi/identifier-plante-photo/',
    quickAnswer:{question:'What photos help identify a plant?',answer:'Photograph the whole plant, leaf attachment, both leaf surfaces and any flower or fruit. Record region, habitat, season and whether it appears cultivated.'},
    safety:'Never eat, touch, treat, burn or give a plant to a person or animal based only on a photo-app result. Use a qualified local expert or poison service when safety is involved.',
    sections:[
      {id:'observe',toc:'Observe first',title:'Observe from large to small',prompts:[['Growth habit','Tree, shrub, vine, grass-like plant or herb?'],['Leaves','Arrangement, shape, margin, veins, texture and attachment.'],['Stem','Round or square, smooth or hairy, woody or soft.'],['Flowers and fruit','Number of petals, clusters, color, structure and maturity.'],['Context','Region, habitat, season and cultivated or wild setting.']]},
      {id:'photos',toc:'Photo sequence',title:'Build a useful photo set',list:['Photograph the whole plant in its setting.','Show how leaves attach to the stem.','Capture upper and lower leaf surfaces.','Add a sharp flower or fruit view.','Include a size reference without damaging the plant.']},
      {id:'compare',toc:'Compare evidence',title:'Compare, do not merely match',paragraphs:['Use the app result as a candidate. Compare several independent features with a regional flora, key or trusted reference. Look actively for differences, not only similarities.']},
      {id:'record',toc:'Save the record',title:'Save a field record, not just a result',paragraphs:['Keep the photos, date, habitat, observed features and uncertainty beside the candidate name. That makes the discovery useful even when the identification changes later.']}
    ], sources:[PLANTNET], related:[{title:'Identify a flower by photo',url:'../identify-flower-by-photo/'},{title:'Best plant identification apps',url:'../best-plant-identification-apps/'}]
  },
  {
    slug:'identify-flower-by-photo', title:'How to Identify a Flower by Photo', h1:'The flower is the headline. The plant holds the rest of the story',
    description:'Take better flower identification photos by capturing the bloom, side profile, leaves, stem and whole plant without losing context.',
    lead:'A perfect bloom close-up can still hide the leaves, stem and growth habit that separate lookalikes. Build a short photo sequence instead.', french:'/fr/oqvi/identifier-fleur-photo/',
    quickAnswer:{question:'What photos identify a flower best?',answer:'Take the flower face, side profile, leaf and whole plant. Include the stem, leaf attachment and growing context, and avoid filters that change color or erase detail.'},
    safety:'Do not use a flower-photo result to decide whether a plant is edible, medicinal, safe to touch or safe for pets. Confirm safety-critical identities with a qualified local expert.',
    sections:[
      {id:'sequence',toc:'Five useful views',title:'A five-view flower record',prompts:[['Flower face','Petal number, symmetry, markings and center.'],['Side profile','Flower depth, tube, sepals and attachment.'],['Leaf','Shape, margin, veins and surface.'],['Stem','Hair, color, shape and leaf arrangement.'],['Whole plant','Growth habit, size and habitat context.']]},
      {id:'light',toc:'Accurate color',title:'Keep color useful',list:['Use open shade or soft daylight.','Avoid digital filters and portrait blur.','Tap to focus on the flower center.','Take a second exposure when petals are very pale or dark.']},
      {id:'alternatives',toc:'Compare candidates',title:'Expect more than one plausible name',paragraphs:['Flowers often share color and general shape. Compare leaves, stem, fruit, habitat, season and geography before choosing among candidates. Keep uncertainty visible.']},
      {id:'record',toc:'Keep context',title:'Turn the bloom into a field memory',paragraphs:['Save the wider plant and habitat beside the close flower view. A candidate name without context is harder to verify later.']}
    ], sources:[PLANTNET], related:[{title:'How to identify plants',url:'../how-to-identify-plants/'},{title:'Plant identifier apps for iPhone',url:'../plant-identifier-app-for-iphone/'}]
  },
  {
    slug:'identify-tree-by-leaf', title:'How to Identify a Tree by Its Leaf', h1:'Read the leaf from the twig outward',
    description:'Identify a tree by leaf shape, arrangement, margin, veins, texture and attachment, then confirm with bark, buds and fruit.',
    lead:'Shape gets attention, but attachment and arrangement often reveal more. Keep the twig in frame before moving closer to the blade.', french:'/fr/oqvi/identifier-arbre-feuille/',
    quickAnswer:{question:'Which leaf features identify a tree?',answer:'Begin with simple versus compound and opposite versus alternate arrangement. Then record margin, lobes, veins, texture, tip and base before confirming with bark, buds, fruit and tree form.'},
    sections:[
      {id:'key',toc:'Beginner leaf key',title:'A practical leaf key for beginners',prompts:[['Attachment','Simple blade or compound leaf with leaflets?'],['Arrangement','Opposite, alternate or whorled on the twig?'],['Margin','Smooth, toothed, double-toothed or lobed?'],['Venation','Pinnate, palmate or parallel?'],['Surface','Hairy, waxy, leathery, rough or soft?'],['Shape','Tip, base, symmetry and overall outline.']]},
      {id:'photos',toc:'Three photos',title:'Three photos that preserve the evidence',list:['Twig view showing several attachments.','Flat upper and lower leaf surfaces.','Whole tree, bark or seasonal structure for context.']},
      {id:'season',toc:'Beyond leaves',title:'Do not stop when leaves fall',paragraphs:['Winter buds, twig color, leaf scars, bark, fruit and branching habit can identify a tree when leaves are absent or damaged.']},
      {id:'confirm',toc:'Confirm the name',title:'Confirm the candidate with independent clues',paragraphs:['A leaf suggests a candidate; agreement across bark, buds, fruit, range and tree form makes it stronger. Use a regional key and keep uncertain records labelled as such.']}
    ], sources:[PENN_LEAF,{label:'US Forest Service — Hardwood key',url:'https://www.srs.fs.usda.gov/pubs/gtr/gtr_so015.pdf'},UMN_TREE], related:[{title:'How to identify a tree',url:'../how-to-identify-a-tree/'},{title:'Tree bark identifier guide',url:'../tree-bark-identifier/'}]
  },
  {
    slug:'plant-identifier-app-for-iphone', title:'Plant Identifier Apps for iPhone: Built-In Lookup or Field App?', h1:'Your iPhone can name a plant. A field app helps you remember it',
    description:'Choose a plant identifier app for iPhone by comparing Apple Visual Look Up with dedicated field apps and private collection tools.',
    lead:'Apple already offers a useful photo lookup. Dedicated apps become valuable when you want more evidence, questions, notes and a collection.', french:'/fr/oqvi/application-identificateur-plantes-iphone/',
    quickAnswer:{question:'Do you need a separate plant identifier app?',answer:'Start with the tool already on your iPhone. Add a dedicated app when you need repeated discoveries, several botanical materials, notes, favorites, questions or optional places.'},
    sections:[
      {id:'visual',toc:'Visual Look Up',title:'Try Apple Visual Look Up first',list:['Open a supported photo in Photos.','Look for the information button with visual stars.','Tap the identified subject to review suggestions.','Remember that availability varies by region, language, device and photo.']},
      {id:'dedicated',toc:'Dedicated apps',title:'When a dedicated plant identifier earns its place',prompts:[['Multiple views','Keep the whole plant and detail photos together.'],['Field notes','Record habitat, season and uncertainty.'],['Collection','Return to discoveries instead of losing them in Photos.'],['Follow-up','Ask about a feature or compare another material.']]},
      {id:'photos',toc:'Better photos',title:'Take a better identification set',paragraphs:['Capture the whole subject, attachment details and reproductive structures when present. Avoid relying on one dramatic close-up.']},
      {id:'privacy',toc:'Privacy model',title:'Read the privacy model, not just the feature list',paragraphs:['Check whether an account is required, what is uploaded for processing, whether places are optional and how saved discoveries can be deleted or exported.']}
    ], sources:[{label:'Apple — Visual Look Up',url:'https://support.apple.com/en-gb/104962'},PLANTNET,{label:'Seek by iNaturalist',url:'https://www.inaturalist.org/pages/seek_app'}], related:[{title:'Best plant identification apps',url:'../best-plant-identification-apps/'},{title:'Free plant identification apps',url:'../free-plant-identification-app/'}]
  },
  {
    slug:'tree-bark-identifier', title:'Tree Bark Identifier: Photograph Pattern, Age and Context', h1:'Bark is a pattern, not a paint sample',
    description:'Use bark texture, pattern, color, age and nearby tree clues for a stronger tree bark identification from photos.',
    lead:'Color alone shifts with light, moisture and age. Photograph the repeating structure, the whole trunk and any leaves, buds or fruit you can safely reach.', french:'/fr/oqvi/identifier-ecorce-arbre/',
    quickAnswer:{question:'Can bark identify a tree?',answer:'Bark is strongest as one clue in a full tree record. Capture a sharp close-up, a wider repeating pattern and the full trunk, then add leaves, buds, fruit or crown shape.'},
    sections:[
      {id:'features',toc:'Five bark features',title:'Five bark features worth naming',prompts:[['Texture','Smooth, flaky, fibrous, scaly, corky or deeply furrowed.'],['Pattern','Ridges, plates, diamonds, strips or horizontal marks.'],['Depth','Shallow lines or deep furrows and raised ridges.'],['Color range','Describe several tones rather than one paint-chip color.'],['Age change','Young branch, middle trunk and mature base may differ.']]},
      {id:'photos',toc:'Photo sequence',title:'Photograph bark for identification',list:['Take a square close-up in even light.','Step back to show the repeating pattern.','Photograph the full trunk and branching form.','Add leaves, buds, fruit or fallen material without damaging the tree.','Record region, habitat and whether it appears planted.']},
      {id:'limits',toc:'Bark-only limits',title:'Why bark-only identification is difficult',paragraphs:['Bark changes with age, damage, moisture, light and growing conditions. Different species can converge on similar patterns, while one species can look different across the trunk.']},
      {id:'record',toc:'Keep clues together',title:'Keep the bark with the tree',paragraphs:['Store bark views beside the whole tree and seasonal clues. A later leaf or fruit photograph may resolve what a winter bark image could not.']}
    ], sources:[PENN_LEAF], related:[{title:'How to identify a tree',url:'../how-to-identify-a-tree/'},{title:'Tree identification app guide',url:'../tree-identification-app/'}]
  },
  {
    slug:'tree-identification-app', title:'Tree Identification Apps: Use More Than One Clue', h1:'A tree is more than a single leaf',
    description:'Learn how to use a tree identification app with photos of the whole tree, leaves, bark, buds, fruit and surrounding habitat.',
    lead:'The strongest identification combines silhouette, branching, leaves, bark, buds, fruit and location—not one overloaded photo.', french:'/fr/oqvi/identificateur-arbres/',
    quickAnswer:{question:'What should you photograph for a tree identification app?',answer:'Photograph the whole tree and at least two close details. Leaves are an easy starting point, while bark, buds, fruit, branch arrangement and seasonal context separate lookalikes.'},
    sections:[
      {id:'sequence',toc:'Six-photo record',title:'A six-photo tree record',prompts:[['Whole tree','Crown, height and branching habit.'],['Twig','Opposite, alternate or whorled attachment.'],['Leaf','Upper and lower surface with scale.'],['Bark','Close texture and wider repeating pattern.'],['Seasonal clue','Bud, flower, fruit, cone or seed.'],['Habitat','Ground, neighboring vegetation and growing context.']]},
      {id:'why',toc:'Combine clues',title:'Why one clue is rarely enough',paragraphs:['Leaf shape can overlap, bark changes with age and fruit may be absent. Independent clues reduce the chance that one misleading feature controls the result.']},
      {id:'record',toc:'One discovery',title:'Build one discovery from several views',paragraphs:['Keep every view, field note and candidate inside one record. Add another season later instead of creating a disconnected identification.']},
      {id:'confirm',toc:'Seek confirmation',title:'When to seek confirmation',paragraphs:['Use a regional key or qualified expert for management, pruning, disease, hazards, conservation, legality, food or poisoning questions.']}
    ], sources:[UMN_TREE], related:[{title:'Identify a tree by its leaf',url:'../identify-tree-by-leaf/'},{title:'Tree bark identifier guide',url:'../tree-bark-identifier/'}]
  },
  {
    slug:'wood-species-identifier', title:'Wood Species Identifier: Photograph the Anatomy, Not Only the Color', h1:'Wood identification begins at the end grain',
    description:'Learn which wood surfaces and anatomical clues matter for photo identification, and why grain and color alone cannot confirm a species.',
    lead:'Color and face grain are memorable but variable. A clean transverse surface can reveal pores, rings, rays and resin canals that carry stronger evidence.', french:'/fr/oqvi/identifier-bois-photo/',
    quickAnswer:{question:'What photo is most useful for wood identification?',answer:'Photograph a clean end-grain surface plus face and edge grain. Record source, region, odor and density separately. A photo cannot certify species, grade, toxicity or suitability.'},
    safety:'Do not use a photo-app result to decide structural grade, load-bearing use, toxicity, burning safety, food contact, allergen risk or legal provenance. Use a qualified wood specialist or laboratory when the answer matters.',
    sections:[
      {id:'surfaces',toc:'Three surfaces',title:'Three surfaces reveal different clues',prompts:[['End grain','Pores, growth rings, rays, parenchyma and resin canals.'],['Face grain','Figure, color variation and longitudinal vessel pattern.'],['Edge grain','Ring orientation and another longitudinal view.']]},
      {id:'photo',toc:'Prepare the photo',title:'Prepare a useful photograph',list:['Make a clean, flat transverse cut when safe and appropriate.','Use sharp focus and even light.','Include a ruler or scale.','Photograph all three surfaces.','Record source, region, odor, weight and finishing history separately.']},
      {id:'limits',toc:'Identification limits',title:'Why an app cannot certify a wood species',paragraphs:['Finish, age, lighting, stain and weathering change appearance. Closely related woods may require microscopic anatomy, chemical testing or provenance information. Photo matching is a candidate-generating step.']},
      {id:'expert',toc:'When to use a specialist',title:'Use a specialist when the answer matters',paragraphs:['Seek professional identification for structural work, protected species, customs, high-value trade, restoration, toxicity, burning or food-contact decisions.']}
    ], sources:[{label:'USDA Forest Products Laboratory — Identifying wood with a hand lens',url:'https://www.fpl.fs.usda.gov/documnts/fplgtr/fpl_gtr228.pdf'},{label:'USDA Forest Products Laboratory — Wood Handbook',url:'https://www.fpl.fs.usda.gov/documnts/fplgtr/fplgtr282/fpl_gtr282.pdf'}], related:[{title:'Tree bark identifier guide',url:'../tree-bark-identifier/'},{title:'How to identify a tree',url:'../how-to-identify-a-tree/'}]
  }
];
