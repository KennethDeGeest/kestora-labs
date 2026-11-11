import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import migraLoomGuides from './migraloom-guide-data.mjs';
import oqviGuides from './oqvi-guide-data.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function bumpEchoArticle(config) {
  return {
    app: 'Bump Echo',
    appSlug: 'bumpecho',
    appIcon: '/assets/bumpecho.png',
    kicker: config.kicker || 'Bump Echo guide',
    published: '2026-11-05',
    modified: '2026-11-11',
    author: 'Kestora Labs, the maker of Bump Echo',
    socialImage: `/assets/guides/bumpecho-${config.slug}.png`,
    languages: [
      { code: 'en', label: 'English', short: 'EN', url: `/bumpecho/guides/${config.slug}/` },
      { code: 'fr', label: 'Français', short: 'FR', url: config.french }
    ],
    appCallout: {
      kicker: 'A private pregnancy Soundbook',
      title: 'Keep the voices, not just the timeline.',
      text: 'Bump Echo keeps messages, songs and meaningful everyday sounds together on your iPhone. It is a keepsake app—not a medical device or health-monitoring tool.',
      url: `https://apps.apple.com/app/apple-store/id6812684414?pt=128911414&mt=8&ct=bumpecho_${config.slug.replaceAll('-', '_')}_inline`
    },
    ...config
  };
}

function migraLoomArticle(config) {
  return {
    app: 'MigraLoom', appSlug: 'migraloom', appIcon: '/assets/migraloom.png',
    kicker: config.kicker || 'MigraLoom guide', published: '2026-11-05', modified: '2026-11-11',
    author: 'Kestora Labs, the maker of MigraLoom', appStoreId: '6811065580',
    smartBannerCampaign: `migraloom_${config.slug.replaceAll('-', '_')}`,
    socialImage: `/assets/guides/migraloom-${config.slug}.png`,
    about: ['migraine diary', 'headache tracking', 'appointment preparation'],
    languages: [{ code: 'en', label: 'English', short: 'EN', url: `/migraloom/guides/${config.slug}/` }, ...(config.french ? [{ code: 'fr', label: 'Français', short: 'FR', url: config.french }] : [])],
    appCallout: { kicker: 'A calm, private migraine diary', title: 'Record now. Add detail when you can.', text: 'MigraLoom keeps your migraine history on your iPhone, requires no account and creates a structured report from what you recorded.', url: `https://apps.apple.com/app/apple-store/id6811065580?pt=128911414&mt=8&ct=migraloom_${config.slug.replaceAll('-', '_')}_inline` },
    footerNote: 'MigraLoom is a personal migraine diary. It does not diagnose, treat or provide medical advice. Seek qualified medical care for health concerns.',
    sourceNote: 'This guide is general information, not medical advice. It was reviewed against the sources below. A diary can support a healthcare conversation; it cannot determine a diagnosis or treatment.',
    ...config
  };
}

function oqviArticle(config) {
  return {
    app: 'Oqvi', appSlug: 'oqvi', appIcon: '/assets/treeidentifier.png',
    kicker: config.kicker || 'Oqvi field guide', published: '2026-11-05', modified: '2026-11-11',
    author: 'Kestora Labs, the maker of Oqvi', appStoreId: '6815273355',
    smartBannerCampaign: `oqvi_${config.slug.replaceAll('-', '_')}`,
    socialImage: `/assets/guides/oqvi-${config.slug}.png`,
    about: ['plant identification', 'tree identification', 'field observation'],
    languages: [{ code: 'en', label: 'English', short: 'EN', url: `/oqvi/guides/${config.slug}/` }, ...(config.french ? [{ code: 'fr', label: 'Français', short: 'FR', url: config.french }] : [])],
    appCallout: { kicker: 'A private botanical field collection', title: 'Keep the evidence with the discovery.', text: 'Oqvi identifies plants, trees, leaves, flowers, bark and wood, then keeps photos, notes, favorites and optional places together on your iPhone.', url: `https://apps.apple.com/app/apple-store/id6815273355?pt=128911414&mt=8&ct=oqvi_${config.slug.replaceAll('-', '_')}_inline` },
    footerNote: 'Oqvi provides identification suggestions for education and record-keeping. It cannot certify identity, edibility, toxicity, treatment, structural suitability or safety.',
    sourceNote: 'This field guide is educational information. Photo identification produces candidates, not certainty. The article was reviewed against the sources below; use an appropriate regional reference or qualified expert when the answer matters.',
    ...config
  };
}

const articles = [{
  app: 'Bump Echo',
  appSlug: 'bumpecho',
  slug: 'baby-heartbeat-apps-explained',
  appIcon: '/assets/bumpecho.png',
  title: 'Baby Heartbeat Apps: What a Phone Can and Cannot Do',
  h1: 'Baby heartbeat apps: what a phone can and cannot do',
  description: 'Learn what baby heartbeat apps can and cannot do, why phone audio is not fetal monitoring, and when to contact your maternity care team instead.',
  kicker: 'Bump Echo safety guide',
  lead: 'A phone microphone may capture many body and room sounds. It cannot reliably tell you that a sound is a fetal heartbeat, measure wellbeing or replace assessment by a trained professional.',
  published: '2026-11-05',
  modified: '2026-11-11',
  author: 'Kestora Labs, the maker of Bump Echo',
  socialImage: '/assets/guides/bumpecho-heartbeat-apps.png',
  about: ['pregnancy keepsakes', 'fetal heartbeat apps', 'phone audio recording'],
  languages: [
    { code: 'en', label: 'English', short: 'EN', url: '/bumpecho/guides/baby-heartbeat-apps-explained/' },
    { code: 'fr', label: 'Français', short: 'FR', url: '/fr/bumpecho/enregistrer-battement-bebe-telephone/' }
  ],
  quickAnswer: {
    question: 'Can a phone app reliably check a baby’s heartbeat?',
    answer: 'No. A phone recording should not be used to check fetal wellbeing. Sounds can be misidentified, and hearing something that seems like a heartbeat cannot show that a baby is well.'
  },
  safety: 'If your baby is moving less than usual, stops moving or the usual pattern changes, seek maternity advice immediately. Do not wait for an app, recording or home device to reassure you.',
  sections: [
    {
      id: 'difference',
      toc: 'Recording vs monitoring',
      title: 'Microphone recording and fetal monitoring are different',
      paragraphs: ['A phone microphone records pressure waves that reach the device. It may capture your own pulse, digestion, movement, clothing, voices and background noise. It does not know which sound came from where. Clinical fetal-heart assessment uses appropriate equipment, trained interpretation and the wider clinical picture.'],
      comparison: {
        can: ['Record voices, songs and meaningful everyday sounds', 'Preserve audio as a private personal keepsake', 'Play back the recording you captured'],
        cannot: ['Confirm that a sound is a fetal heartbeat', 'Measure fetal heart rate, movement or wellbeing', 'Replace advice or assessment from a maternity professional']
      }
    },
    {
      id: 'doppler',
      toc: 'Home Dopplers',
      title: 'What about a home Doppler?',
      paragraphs: ['The US Food and Drug Administration says over-the-counter fetal heartbeat monitoring systems should be used only by trained healthcare providers when medically necessary, because untrained use may involve prolonged exposure or incorrect interpretation. The NHS similarly warns that even hearing a heartbeat with a home Doppler does not mean a baby is well.'],
      citations: [
        { label: 'FDA guidance', url: 'https://www.fda.gov/radiation-emitting-products/medical-imaging/ultrasound-imaging' },
        { label: 'NHS guidance', url: 'https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/' }
      ]
    },
    {
      id: 'use',
      toc: 'Safe keepsake use',
      title: 'What a keepsake app can safely promise',
      paragraphs: ['An audio keepsake can record your voice, a loved one’s message, a song or meaningful everyday sounds. It should be honest about being a memory tool. Bump Echo does not isolate a fetal heartbeat, measure heart rate, monitor movement, diagnose a condition or assess pregnancy or fetal wellbeing.']
    },
    {
      id: 'help',
      toc: 'When to seek care',
      title: 'When to contact care',
      paragraphs: ['Use the instructions from your own maternity team. NHS guidance says to call immediately when movement is less than usual, cannot be felt or changes from the usual pattern, and not to wait until the next day. If you believe there is an emergency, use your local emergency service.'],
      citations: [{ label: 'NHS: your baby’s movements', url: 'https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/' }]
    }
  ],
  sources: [
    { label: 'NHS — Your baby’s movements', url: 'https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/' },
    { label: 'Newcastle Hospitals NHS — Reduced fetal movements and phone apps', url: 'https://www.newcastle-hospitals.nhs.uk/services/maternity/during-pregnancy/maternity-assessment-unit/reduced-fetal-movements/' },
    { label: 'US FDA — Ultrasound imaging and fetal heartbeat monitors', url: 'https://www.fda.gov/radiation-emitting-products/medical-imaging/ultrasound-imaging' },
    { label: 'University College London Hospitals — Your baby’s movements', url: 'https://www.uclh.nhs.uk/patients-and-visitors/patient-information-pages/your-babys-movements-easy-read' }
  ],
  appCallout: {
    kicker: 'A private pregnancy Soundbook',
    title: 'Keep the voices, not just the timeline.',
    text: 'Bump Echo keeps messages, songs and meaningful everyday sounds together on your iPhone. It is a keepsake app—not a medical device or health-monitoring tool.',
    url: 'https://apps.apple.com/app/apple-store/id6812684414?pt=128911414&mt=8&ct=bumpecho_heartbeat_apps_inline'
  },
  related: [
    { title: 'Pregnancy journal ideas for every trimester', url: '../pregnancy-journal/' },
    { title: 'Pregnancy memory book ideas beyond photos', url: '../pregnancy-memory-book/' }
  ]
}, bumpEchoArticle({
  slug: 'best-pregnancy-journal-apps',
  title: 'Best Pregnancy Journal Apps for iPhone',
  h1: 'The best pregnancy journal app is the one you will keep using',
  description: 'Compare pregnancy journal apps by format, privacy, effort and payment model. See when a private audio journal like Bump Echo is the better fit.',
  lead: 'Choose the format around the memory you want to preserve—not the longest feature list. Here is a transparent way to compare pregnancy journal apps.',
  spanish: '/es/bumpecho/app-embarazo/',
  french: '/fr/bumpecho/application-journal-grossesse/',
  quickAnswer: {
    question: 'Which pregnancy journal app is best?',
    answer: 'The best choice is the format you can use consistently. Choose Bump Echo when voices and meaningful sounds matter most; choose another format when text, medical tracking or printed books are the priority.'
  },
  sections: [
    {
      id: 'formats', toc: 'Journal formats', title: 'Four journal formats worth comparing', paragraphs: ['No single format is best for every kind of memory. Compare what each tool preserves well and what it leaves out.'],
      table: { headers: ['Format', 'Best for', 'Tradeoff'], rows: [
        ['Bump Echo', 'Private voice notes, songs, family messages and a focused audio keepsake', 'Not a medical tracker, calendar or photo-book service'],
        ['Writing-first journal app', 'Long reflections, prompts and searchable text', 'May not preserve the sound of a voice'],
        ['Pregnancy tracker with journal', 'Weekly development content plus notes in one place', 'Journaling may be secondary; account and data models vary'],
        ['Printed memory book', 'A tactile finished object with photos and handwriting', 'Harder to capture audio and edit over time']
      ] }
    },
    {
      id: 'questions', toc: 'Questions to ask', title: 'Five questions before you commit', paragraphs: ['A feature list is less useful than understanding how the journal fits your real routine, privacy expectations and preferred memory format.'],
      list: ['Which memory format matters? Text, photos, audio and timelines serve different purposes.', 'Can you use it on a tired day? Test the shortest possible entry flow.', 'Where does personal data live? Read the current privacy policy and account requirements.', 'What is the payment model? Confirm whether continued use requires a subscription or one-time purchase.', 'Can you keep or share individual memories? Understand export and backup behavior before building a long history.']
    },
    {
      id: 'fit', toc: 'When Bump Echo fits', title: 'When Bump Echo is—and is not—the fit',
      paragraphs: ['Bump Echo is the strongest fit when you want to preserve voices without building a public feed or another account. It records ordinary microphone audio, adds titles and notes, and lets you share an individual memory only when you choose.', 'Choose another tool if your priority is medical information, fetal monitoring, weekly development estimates, symptom tracking, photo-book printing or Android support. Bump Echo is a keepsake, not a health tool.'],
      note: 'Disclosure: Kestora Labs makes Bump Echo. This guide explains the criteria that favor it and the situations where another format is the better choice.'
    }
  ],
  related: [{ title: 'Pregnancy memory book ideas beyond photos', url: '../pregnancy-memory-book/' }, { title: 'How to start a pregnancy audio journal', url: '../pregnancy-audio-journal/' }]
}), bumpEchoArticle({
  slug: 'how-to-record-pregnancy-memories',
  title: 'How to Record Pregnancy Memories on iPhone',
  h1: 'Record pregnancy memories before they become hard to name',
  description: 'Record meaningful pregnancy memories on your iPhone with a simple audio workflow for clean sound, useful titles, private storage and intentional sharing.',
  lead: 'You do not need professional equipment. A quiet-enough room, one clear idea and a useful title are enough to turn a short iPhone recording into a lasting keepsake.',
  spanish: '/es/bumpecho/recuerdos-del-embarazo/', french: '/fr/bumpecho/souvenirs-grossesse/',
  quickAnswer: { question: 'How do you record pregnancy memories on an iPhone?', answer: 'Choose a quiet-enough space, make a short test and record one idea at a time. Save it with a descriptive title, date and one line of context.' },
  sections: [
    { id: 'routine', toc: 'Five-step routine', title: 'A reliable five-step recording routine', list: ['Pick one moment: a message, song, story or room sound—not “the entire trimester.”', 'Reduce obvious noise: pause the television, move away from fans and close the door if practical.', 'Make a ten-second test and listen for volume, fabric rubbing and distance.', 'Record naturally. Speak toward the phone without holding it directly against clothing.', 'Name it immediately. Include the person or moment plus a useful note.'] },
    { id: 'sound', toc: 'Clear-enough sound', title: 'Good sound is clear enough, not perfect', paragraphs: ['A keepsake should sound like life. Removing every room sound can erase context; leaving a roaring fan can hide the voice. Aim for intelligibility. If the message can be understood comfortably at normal volume, the recording has done its job.'] },
    { id: 'privacy', toc: 'Private storage', title: 'Store and share with intention', paragraphs: ['Understand where the app stores recordings, whether a device backup may include them and how export works. Share one selected memory rather than an entire private library. If another person appears in a recording, ask before publishing it.'] },
    { id: 'next', toc: 'What to record next', title: 'What to record next', paragraphs: ['Try a letter read aloud, a family voice message or one small weekly ritual. The most useful prompt is usually specific enough to begin and open enough to sound like you.'] }
  ],
  related: [{ title: 'Baby heartbeat apps explained', url: '../baby-heartbeat-apps-explained/' }, { title: 'Best pregnancy journal apps', url: '../best-pregnancy-journal-apps/' }]
}), bumpEchoArticle({
  slug: 'letters-to-unborn-baby',
  title: 'Letters to Your Unborn Baby: Prompts & Examples',
  h1: 'Write the letter only you can write',
  description: 'Write a meaningful letter to your unborn baby with gentle prompts, a simple structure and ideas for recording the letter in your own voice.',
  lead: 'A letter to your unborn baby does not need to predict the future. It can simply hold who you are today, what this season feels like and the welcome you want to offer.',
  spanish: '/es/bumpecho/carta-a-mi-bebe/', french: '/fr/bumpecho/lettre-a-mon-bebe/',
  quickAnswer: { question: 'How do you start a letter to an unborn baby?', answer: 'Begin with a concrete present-tense detail: where you are, how far along the pregnancy is or what happened today. Specific details remove the pressure to sound profound.' },
  sections: [
    { id: 'structure', toc: 'A simple structure', title: 'A gentle three-part structure', list: ['Here is where we are. Describe today in a few honest details.', 'Here is what I hope. Share a value, feeling or wish without deciding who the child must become.', 'Here is your welcome. End with the words you want them to hear from you.'] },
    { id: 'prompts', toc: 'Writing prompts', title: 'Prompts that leave room for your story', prompts: [
      ['Today', 'The weather is… The room sounds like… The person beside me just said…'], ['This season', 'I keep thinking about… I did not expect… One small thing that changed me is…'], ['Our people', 'Someone waiting to meet you is… A story from our family I want you to know is…'], ['For later', 'If you ever hear this when… I hope you remember… You never have to be…']
    ] },
    { id: 'aloud', toc: 'Read it aloud', title: 'Read the letter aloud', paragraphs: ['The written letter keeps the exact words. A recording keeps how you said them. Read naturally, include the stumbled sentence and do not chase a studio-quality result. The recognizable voice is the keepsake.'] }
  ],
  related: [{ title: 'Voice messages for your future baby', url: '../voice-messages-for-baby/' }, { title: 'How to start a pregnancy audio journal', url: '../pregnancy-audio-journal/' }]
}), bumpEchoArticle({
  slug: 'pregnancy-audio-journal',
  title: 'How to Start a Pregnancy Audio Journal',
  h1: 'A pregnancy journal in the voices that lived it',
  description: 'Start a private pregnancy audio journal with simple prompts for messages, songs and family voices. Learn what to record and how to keep it organized.',
  lead: 'An audio journal turns tiny recordings into a story you can replay. It works especially well for moments where the sound—not just the fact—is what you want to keep.',
  spanish: '/es/bumpecho/frases-embarazo/', french: '/fr/bumpecho/journal-audio-grossesse/',
  quickAnswer: { question: 'What is a pregnancy audio journal?', answer: 'It is a dated collection of spoken memories and meaningful sounds from pregnancy: reflections, partner messages, family greetings, songs, stories and ordinary moments.' },
  safety: 'A pregnancy audio journal captures ordinary microphone audio. It does not detect a fetal heartbeat, assess fetal wellbeing or replace any part of prenatal care.',
  sections: [
    { id: 'begin', toc: 'Seven recordings', title: 'Seven recordings to begin with', list: ['The story of the day you found out.', 'A short introduction from each parent or caregiver.', 'A grandparent or loved one saying hello.', 'A favorite song sung imperfectly and honestly.', 'The sounds of a room you are preparing.', 'A message from a day that felt difficult or important.', 'A final note during the weeks of waiting.'] },
    { id: 'names', toc: 'Name recordings', title: 'Name recordings for the memory, not the file', paragraphs: ['“Voice memo 17” tells you nothing later. Use a human title such as “Dad’s story after dinner,” then add a sentence of context. Dates help build the timeline; titles help you recognize the moment.'] },
    { id: 'audience', toc: 'Choose the audience', title: 'Decide who the journal is for', paragraphs: ['A private journal allows a different kind of honesty from content prepared for social media. Choose whether each recording is for you, your partner, your future child or a wider family circle. Share only the individual moments that belong outside the private collection.'] }
  ],
  related: [{ title: 'Pregnancy scrapbook ideas', url: '../pregnancy-scrapbook-ideas/' }, { title: 'Voice messages for your future baby', url: '../voice-messages-for-baby/' }]
}), bumpEchoArticle({
  slug: 'pregnancy-diary',
  title: 'How to Keep a Pregnancy Diary Without Pressure',
  h1: 'Your pregnancy diary does not need a perfect streak',
  description: 'Keep a pregnancy diary without daily pressure. Use a flexible weekly method, honest prompts and audio notes for the moments words do not quite hold.',
  lead: 'A diary works when it lowers the effort of remembering. Build a gentle habit that welcomes short entries, missed weeks and the full range of how pregnancy actually feels.',
  spanish: '/es/bumpecho/diario-embarazo-semana-a-semana/', french: '/fr/bumpecho/journal-grossesse-semaine-par-semaine/',
  quickAnswer: { question: 'How often should you write in a pregnancy diary?', answer: 'There is no required schedule. Weekly works well for many people because it captures change without creating daily pressure. Let quiet weeks remain quiet.' },
  sections: [
    { id: 'routine', toc: 'Three-minute routine', title: 'A three-minute weekly diary routine', list: ['Date the entry and note the pregnancy week if you know it.', 'Finish three lines: “Today felt…”, “I noticed…” and “I want to remember…”', 'Add one photo, voice note or physical detail only if it adds meaning.', 'Stop. Consistency grows when each entry has a clear finish.'] },
    { id: 'honest', toc: 'Write honestly', title: 'Make room for the honest version', paragraphs: ['A pregnancy diary is not promotional copy. Excitement, uncertainty, boredom, discomfort and gratitude can exist on the same page. If an entry is private, write what you actually want to remember—not what you think a pregnancy journal should sound like.'] },
    { id: 'prompts', toc: 'Gentle prompts', title: 'Prompts for the days when nothing feels important', prompts: [['The room', 'Where are you sitting, and what can you hear right now?'], ['The change', 'What became easier, harder or simply different this week?'], ['The person', 'Who showed up for you, and what did they say?'], ['The future', 'What small scene are you imagining about life after birth?']] },
    { id: 'speaking', toc: 'Try speaking', title: 'When speaking is easier than writing', paragraphs: ['Some entries arrive more naturally as speech. Record the thought as it is, then add a short title so you can find it later. The pauses and tone that feel ordinary today may be the part you value most in a few years.'] }
  ],
  related: [{ title: 'How to start a pregnancy audio journal', url: '../pregnancy-audio-journal/' }, { title: 'Letters to your unborn baby', url: '../letters-to-unborn-baby/' }]
}), bumpEchoArticle({
  slug: 'pregnancy-journal',
  title: 'Pregnancy Journal Ideas for Every Trimester',
  h1: 'A pregnancy journal made of real moments',
  description: 'Start a pregnancy journal you will actually keep with trimester prompts, audio ideas and a simple routine for preserving the moments that matter.',
  lead: 'A useful pregnancy journal does not need a perfect daily entry. It needs small, honest pieces of the story—written, photographed or heard in the voices you love.',
  spanish: '/es/bumpecho/diario-de-embarazo/', french: '/fr/bumpecho/journal-grossesse/',
  quickAnswer: { question: 'What should you put in a pregnancy journal?', answer: 'Record the things your future self may want back: ordinary routines, questions, changing hopes, family reactions and the voices around you. A short weekly entry is often enough.' },
  sections: [
    { id: 'rhythm', toc: 'A sustainable rhythm', title: 'Start with a rhythm you can keep', paragraphs: ['A blank book can make every entry feel important. That pressure is usually the enemy. Pick one small ritual—Sunday evening, after an appointment or whenever a new week begins—and capture one thing that changed, one thing you noticed and one thing you want to remember.'], list: ['Keep entries small. A sentence, photo caption or 20-second voice note counts.', 'Date the moment. Context becomes surprisingly valuable later.', 'Write what is true today. You do not need to make every entry cheerful or polished.', 'Mix formats. Text remembers facts; audio remembers pace, laughter and tone.'] },
    { id: 'trimester-prompts', toc: 'Trimester prompts', title: 'Pregnancy journal prompts by trimester', prompts: [['First trimester', 'How did you find out? Who knew first? What are you quietly hoping for?'], ['Second trimester', 'What changes feel real now? Which name, song or family story keeps returning?'], ['Third trimester', 'What are you preparing? What do you want to remember about waiting?'], ['After birth', 'What surprised you? Which pregnancy details already feel far away?']] },
    { id: 'audio', toc: 'Why add audio', title: 'Why add audio to a pregnancy journal?', paragraphs: ['Written entries preserve meaning. Audio preserves presence. A grandparent’s greeting, a partner reading a story or your own unedited thoughts can carry details that a transcript cannot. The goal is not a performance; it is a recognizable piece of a real day.'] }
  ],
  related: [{ title: 'Best pregnancy journal apps', url: '../best-pregnancy-journal-apps/' }, { title: 'How to keep a pregnancy diary', url: '../pregnancy-diary/' }]
}), bumpEchoArticle({
  slug: 'pregnancy-memory-book',
  title: 'Pregnancy Memory Book Ideas Beyond Photos',
  h1: 'A pregnancy memory book you can hear',
  description: 'Create a pregnancy memory book with photos, small notes, timelines and voice recordings. Use these simple sections and prompts to make it personal.',
  lead: 'The strongest memory books do more than document milestones. They preserve the atmosphere around them: the voice, the story and the ordinary details that made the season yours.',
  spanish: '/es/bumpecho/album-embarazo/', french: '/fr/bumpecho/album-grossesse/',
  quickAnswer: { question: 'What belongs in a pregnancy memory book?', answer: 'Start with a timeline, then add family reactions, appointment-day thoughts, name ideas, photos of ordinary life, letters and voice recordings. Meaning matters more than completeness.' },
  sections: [
    { id: 'sections', toc: 'Six useful sections', title: 'Six sections that create a real story', prompts: [['The beginning', 'How you found out, where you were and what the next hour felt like.'], ['The people', 'Reactions, family stories, messages and the names of people waiting with you.'], ['The everyday', 'Meals, songs, walks, rooms and routines that defined this season.'], ['The changes', 'What shifted in your body, plans, relationship or view of the future.'], ['The preparation', 'Lists, little purchases, the nursery or the bag by the door.'], ['The voices', 'A first hello, a story, a song or a message meant to be replayed later.']] },
    { id: 'medium', toc: 'Choose the medium', title: 'Use each medium for what it remembers best', paragraphs: ['A photo captures appearance. A caption supplies context. A longer entry records thought. Audio keeps timing, accent, hesitation and laughter. A physical object adds touch. You do not need every format for every milestone—choose the one that carries the most meaning.'] },
    { id: 'finish', toc: 'Keep it manageable', title: 'How to avoid an unfinished memory book', list: ['Create the sections first and fill them out of order.', 'Let blank spaces remain blank instead of inventing a perfect narrative.', 'Keep a small “inbox” of photos, notes and recordings to organize later.', 'Choose one monthly moment to curate, not an entire month to reconstruct.'] }
  ],
  related: [{ title: 'How to keep a pregnancy diary', url: '../pregnancy-diary/' }, { title: 'Pregnancy scrapbook ideas', url: '../pregnancy-scrapbook-ideas/' }]
}), bumpEchoArticle({
  slug: 'pregnancy-scrapbook-ideas',
  title: 'Pregnancy Scrapbook Ideas That Feel Personal',
  h1: 'Pregnancy scrapbook ideas beyond the usual milestones',
  description: 'Use these pregnancy scrapbook ideas to combine photos, notes, tactile keepsakes and QR-linked audio memories in a story that feels genuinely yours.',
  lead: 'A scrapbook becomes personal when it includes the unremarkable details: the receipt, the playlist, the sentence someone said and the room as it sounded that afternoon.',
  spanish: '/es/bumpecho/ideas-fotos-embarazo/', french: '/fr/bumpecho/idees-photos-grossesse/',
  quickAnswer: { question: 'What can you put in a pregnancy scrapbook?', answer: 'Mix milestone photos with handwritten notes, name lists, small receipts, fabric, playlists, letters and links to private audio recordings. Choose meaningful context over clutter.' },
  sections: [
    { id: 'pages', toc: 'Ten page ideas', title: 'Ten pages that tell more than a timeline', prompts: [['The day before we knew', 'A snapshot of ordinary life just before the story changed.'], ['The first reactions', 'A line from each person who heard the news.'], ['What was playing', 'Songs, podcasts or stories that filled the background.'], ['Our neighborhood', 'The walk, café or view that belonged to this season.'], ['Names we almost chose', 'The serious, sentimental and wonderfully unlikely options.'], ['Voices waiting for you', 'A private family recording and a note explaining why it matters.']] },
    { id: 'sound', toc: 'Add sound safely', title: 'Add sound without turning the book into technology', paragraphs: ['Keep the physical page simple: title the audio memory, write why it matters and add a private QR code or short retrieval note only if your storage method supports it safely. Test any link periodically; printed links can outlive the service behind them.'] },
    { id: 'recipe', toc: 'A repeatable recipe', title: 'A repeatable page recipe', list: ['Choose one object or photo.', 'Add the date or pregnancy stage.', 'Write two sentences of context.', 'Add one optional “listen” element.', 'Leave open space—the page does not need to prove how much happened.'] }
  ],
  related: [{ title: 'Letters to your unborn baby', url: '../letters-to-unborn-baby/' }, { title: 'How to record pregnancy memories', url: '../how-to-record-pregnancy-memories/' }]
}), bumpEchoArticle({
  slug: 'voice-messages-for-baby',
  title: 'Voice Messages for Your Future Baby',
  h1: 'A voice message can carry a whole family',
  description: 'Record voice messages for your future baby with prompts for parents, grandparents, siblings and friends. Make each message personal and easy to keep.',
  lead: 'Invite the people you love to record one small, specific welcome. Their natural voices are the point—no script, microphone or polished performance required.',
  spanish: '/es/bumpecho/mensajes-para-bebe-en-el-embarazo/', french: '/fr/bumpecho/messages-pour-bebe-grossesse/',
  quickAnswer: { question: 'What should you say in a voice message to a future baby?', answer: 'Introduce yourself, explain how you are connected to the family, share one short story and end with a simple welcome. Thirty to ninety seconds is plenty.' },
  sections: [
    { id: 'prompts', toc: 'Prompts for everyone', title: 'Prompts for the people waiting', prompts: [['Parent or caregiver', 'What changed when you learned about the pregnancy? What ordinary day do you want to remember?'], ['Grandparent', 'Which family story or tradition would you like to pass forward?'], ['Sibling', 'What are you excited to show, teach or do together?'], ['Friend', 'What do you hope this child eventually understands about their family?']] },
    { id: 'natural', toc: 'Keep it natural', title: 'How to keep the message natural', list: ['Record somewhere quiet enough to hear, but not so formal that everyone freezes.', 'Give the person one prompt instead of a full script.', 'Keep the laughter, pause or second attempt if it feels like them.', 'Add their name, relationship and the date in the title or note.'] },
    { id: 'permission', toc: 'Ask permission', title: 'Ask before keeping and sharing', paragraphs: ['Tell each person what the recording is for and who may hear it. A family keepsake is still someone else’s voice. Do not publish or broadly share it without clear permission.'] }
  ],
  related: [{ title: 'How to record pregnancy memories', url: '../how-to-record-pregnancy-memories/' }, { title: 'Pregnancy journal ideas', url: '../pregnancy-journal/' }]
}), ...migraLoomGuides.map(migraLoomArticle), ...oqviGuides.map(oqviArticle)];

const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const prettyDate = value => new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));
const absolute = value => value.startsWith('http') ? value : `https://kestoralabs.com${value}`;

function plainText(article) {
  return [article.h1, article.lead, article.quickAnswer.question, article.quickAnswer.answer, article.safety || '',
    ...article.sections.flatMap(section => [section.title, ...(section.paragraphs || []), ...(section.list || []), ...(section.prompts || []).flat(), ...(section.table?.rows || []).flat(), ...(section.comparison ? [...section.comparison.can, ...section.comparison.cannot] : [])])
  ].join(' ');
}

function renderCitations(citations = []) {
  if (!citations.length) return '';
  return `<p class="inline-citations">${citations.map(item => `<a class="inline-source" href="${escapeHtml(item.url)}" rel="noopener">${escapeHtml(item.label)} ↗</a>`).join(' · ')}</p>`;
}

function renderComparison(comparison) {
  if (!comparison) return '';
  const card = (label, items, className = '') => `<div class="capability-card ${className}"><span>${escapeHtml(label)}</span><ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>`;
  return `<div class="capability-grid" aria-label="What a phone recording can and cannot do">${card('A phone can', comparison.can)}${card('A phone cannot', comparison.cannot, 'cannot')}</div>`;
}

function renderSectionExtras(section) {
  const list = section.list ? `<ul class="paper-list">${section.list.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : '';
  const prompts = section.prompts ? `<div class="prompt-grid">${section.prompts.map(([title, text]) => `<div class="prompt-card"><strong>${escapeHtml(title)}</strong><p>${escapeHtml(text)}</p></div>`).join('')}</div>` : '';
  const table = section.table ? `<div class="comparison-scroll"><table class="comparison"><thead><tr>${section.table.headers.map(header => `<th>${escapeHtml(header)}</th>`).join('')}</tr></thead><tbody>${section.table.rows.map(row => `<tr>${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : '';
  const note = section.note ? `<aside class="section-note"><p>${escapeHtml(section.note)}</p></aside>` : '';
  return `${list}${prompts}${table}${note}`;
}

function renderArticle(article) {
  const canonicalPath = `/${article.appSlug}/guides/${article.slug}/`;
  const canonical = absolute(canonicalPath);
  const words = plainText(article).trim().split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.ceil(words / 200));
  const alternates = article.languages.map(language => `  <link rel="alternate" hreflang="${escapeHtml(language.code)}" href="${escapeHtml(absolute(language.url))}">`).join('\n');
  const languageLinks = article.languages.filter(language => language.code !== 'en').map(language => `<a href="${escapeHtml(language.url)}" lang="${escapeHtml(language.code)}" hreflang="${escapeHtml(language.code)}" aria-label="Read in ${escapeHtml(language.label)}">${escapeHtml(language.short)}</a>`).join('');
  const toc = article.sections.map(section => `<a href="#${escapeHtml(section.id)}">${escapeHtml(section.toc)}</a>`).join('');
  const sourceToc = article.sources?.length ? '<a href="#sources">Sources</a>' : '';
  const sections = article.sections.map(section => `<h2 id="${escapeHtml(section.id)}">${escapeHtml(section.title)}</h2>${(section.paragraphs || []).map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}${renderCitations(section.citations)}${renderComparison(section.comparison)}${renderSectionExtras(section)}`).join('');
  const safetyLink = article.appSlug === 'bumpecho' && article.sources?.length ? ' <a class="inline-source" href="https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/" rel="noopener">NHS guidance ↗</a>' : '';
  const safety = article.safety ? `<aside class="safety-note"><p><strong>Important:</strong> ${escapeHtml(article.safety)}${safetyLink}</p></aside>` : '';
  const sources = article.sources?.length ? `<div class="review-note"><p><strong>Editorial note:</strong> ${escapeHtml(article.sourceNote || `This guide is general information, not medical advice. It was reviewed against the official sources below on ${prettyDate(article.modified)}. Always follow advice from your own qualified maternity care team.`)}</p></div><h2 id="sources">Official sources</h2><ul class="source-list">${article.sources.map(source => `<li><a href="${escapeHtml(source.url)}" rel="noopener">${escapeHtml(source.label)} ↗</a></li>`).join('')}</ul>` : '';
  const schema = {
    '@context': 'https://schema.org', '@type': 'Article', headline: article.title, description: article.description,
    image: absolute(article.socialImage), datePublished: article.published, dateModified: article.modified,
    author: { '@type': 'Organization', name: 'Kestora Labs' }, publisher: { '@type': 'Organization', name: 'Kestora Labs', url: 'https://kestoralabs.com/' },
    mainEntityOfPage: canonical, articleSection: `${article.app} guides`, about: article.about || ['pregnancy memories', 'pregnancy journaling', 'audio keepsakes'],
    citation: (article.sources || []).map(source => source.url), isPartOf: { '@type': 'WebSite', name: 'Kestora Labs', url: 'https://kestoralabs.com/' }
  };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Kestora Labs', item: 'https://kestoralabs.com/' },
    { '@type': 'ListItem', position: 2, name: article.app, item: absolute(`/${article.appSlug}/`) },
    { '@type': 'ListItem', position: 3, name: 'Guides', item: absolute(`/${article.appSlug}/guides/`) },
    { '@type': 'ListItem', position: 4, name: article.title, item: canonical }
  ] };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(article.title)} | ${escapeHtml(article.app)}</title>
  <meta name="description" content="${escapeHtml(article.description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="theme-color" content="#fafafa">
  <meta name="apple-itunes-app" content="app-id=${escapeHtml(article.appStoreId || '6812684414')}, affiliate-data=pt=128911414&amp;ct=${escapeHtml(article.smartBannerCampaign || 'bumpecho_heartbeat_apps')}">
  <link rel="canonical" href="${canonical}">
${alternates}
  <link rel="alternate" hreflang="x-default" href="${canonical}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(article.title)}">
  <meta property="og:description" content="${escapeHtml(article.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${escapeHtml(absolute(article.socialImage))}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="${escapeHtml(article.appIcon)}">
  <link rel="stylesheet" href="/guide-article.css?v=20261111-3">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
</head>
<body>
  <a class="skip-link" href="#article">Skip to article</a>
  <header class="site-header">
    <a class="wordmark" href="/" aria-label="Kestora Labs app portfolio home"><span class="wordmark-name">Kestora Labs</span><span class="wordmark-label">Independent Apps</span></a>
    <nav aria-label="Main navigation"><a href="/${article.appSlug}/">${escapeHtml(article.app)}</a><a href="/${article.appSlug}/guides/">All guides</a>${languageLinks}</nav>
  </header>
  <main class="article-main">
    <a class="article-back" href="/${article.appSlug}/guides/">← Back to ${escapeHtml(article.app)} guides</a>
    <article class="article-shell" id="article">
      <header class="article-hero">
        <div><p class="article-kicker">${escapeHtml(article.kicker)}</p><h1>${escapeHtml(article.h1)}</h1><p class="article-lead">${escapeHtml(article.lead)}</p><p class="article-byline">Published by ${escapeHtml(article.author)} · Updated <time datetime="${article.modified}">${prettyDate(article.modified)}</time> · ${readingMinutes} minute read</p></div>
        <aside class="article-summary" aria-label="Quick answer"><span>Quick answer</span><strong>${escapeHtml(article.quickAnswer.question)}</strong><p>${escapeHtml(article.quickAnswer.answer)}</p></aside>
      </header>
      <div class="article-layout">
        <details class="article-toc" open><summary>On this page</summary><div>${toc}${sourceToc}</div></details>
        <div class="article-content">
          ${safety}
          ${sections}
          ${sources}
          <section class="app-callout" aria-labelledby="app-callout-title"><img src="${escapeHtml(article.appIcon)}" width="320" height="320" alt="${escapeHtml(article.app)} app icon"><div><p class="article-kicker">${escapeHtml(article.appCallout.kicker)}</p><h2 id="app-callout-title">${escapeHtml(article.appCallout.title)}</h2><p>${escapeHtml(article.appCallout.text)}</p><a class="button" href="${escapeHtml(article.appCallout.url)}">View ${escapeHtml(article.app)} on the App Store ↗</a></div></section>
          <h2>Continue reading</h2><div class="related-grid">${article.related.map(item => `<a class="related-card" href="${escapeHtml(item.url)}"><span>Related guide</span><strong>${escapeHtml(item.title)}</strong></a>`).join('')}</div>
        </div>
      </div>
      <div class="article-note"><p>${escapeHtml(article.footerNote || `${article.app} is an audio keepsake app. It is not a medical device and does not monitor, identify or assess fetal heartbeat, movement, pregnancy or wellbeing.`)}</p></div>
    </article>
  </main>
  <footer class="article-footer"><p>© <span id="year"></span> Kestora Labs</p><nav aria-label="Footer navigation"><a href="/${article.appSlug}/">${escapeHtml(article.app)}</a><a href="/${article.appSlug}/guides/">Guides</a><a href="/${article.appSlug}/privacy.html">Privacy</a><a href="/${article.appSlug}/terms.html">Terms</a><a href="/${article.appSlug}/support.html">Support</a><a href="/privacy.html">Website privacy</a>${article.languages.filter(language => language.code !== 'en').map(language => `<a href="${escapeHtml(language.url)}" lang="${escapeHtml(language.code)}" hreflang="${escapeHtml(language.code)}">${escapeHtml(language.label)}</a>`).join('')}</nav></footer>
  <script>document.querySelector('#year').textContent = new Date().getFullYear();const toc=document.querySelector('.article-toc');const tocBreakpoint=matchMedia('(max-width: 860px)');const syncToc=()=>{if(tocBreakpoint.matches)toc.removeAttribute('open');else toc.setAttribute('open','');};syncToc();tocBreakpoint.addEventListener('change',syncToc);</script>
</body>
</html>`;
}

for (const article of articles) {
  const output = path.join(root, article.appSlug, 'guides', article.slug, 'index.html');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${renderArticle(article).replace(/[ \t]+$/gm, '')}\n`);
  console.log(`${article.appSlug}/${article.slug}: generated`);
}
