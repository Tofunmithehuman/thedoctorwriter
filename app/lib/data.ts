const P =
  "https://images.squarespace-cdn.com/content/v1/6011c7c377c9ea623cf10599/";

export const SITE = {
  email: "hello@yourdomain.com", // ← replace with your real contact email
  amazon: "https://www.amazon.com/stores/author/B0BP7RSYBL",
  store: "https://store.thedoctorwriter.com",
  catalog: "https://heyzine.com/flip-book/8b26734b69.html",
  photography: "https://shop.thedoctorwriter.com/",
  socials: {
    facebook: "https://www.facebook.com/peju.simoyan",
    x: "https://twitter.com/pejune6",
    youtube: "https://www.youtube.com/channel/UCMsmi65-sUjUTPzTwaoQKyg",
    linkedin: "https://www.linkedin.com/in/olapeju-simoyan-8035165b/",
  },
};

// Images currently hosted on your Squarespace site. Download them into /public when you move off Squarespace.
export const IMG = {
  camera: P + "1615338647324-93UMK1SARKPBFLADZKO2/Olapeju-Simoyan-camera.jpg",
  uke: P + "b6d2751b-27a5-4e33-ab0c-9b5555be2e33/uke+garden+close+up.jpeg",
  rochester:
    P +
    "1744315988033-QG0YYC34QW74UP5SL49D/the%2Bdoctor%2Bwriter%2B-%2Bolapeju%2Bsimoyan%2B1%2B-%2Brochester%2B25.jpg",
  harvard:
    P +
    "1744315755269-SY7IPI99PVXB51RZ8BC9/olapeju%2Bsimoyan%2B2%2B-%2Bharvard%2B25.jpg",
  pennstate:
    P +
    "1744316033494-Q9LB5YU8JYTY2LA1929Q/olapeju%252Bsimoyan%252B1%252B-%252Bpenn%252Bstate%252B25.jpg",
};

/* ───────── BOOKS ───────── */
export type CatId =
  | "all"
  | "inspirational"
  | "behavioral"
  | "medical"
  | "growth"
  | "nature"
  | "travel";

export const categories: { id: CatId; label: string }[] = [
  { id: "all", label: "All books" },
  { id: "inspirational", label: "Inspirational" },
  { id: "behavioral", label: "Behavioral health" },
  { id: "medical", label: "Medical" },
  { id: "growth", label: "Personal growth" },
  { id: "nature", label: "Nature" },
  { id: "travel", label: "Travel" },
];

export type Book = {
  title: string;
  cat: Exclude<CatId, "all">;
  note?: string;
  blurb: string;
  href: string;
  href2?: { label: string; href: string };
  badge?: string;
  tone: string; // placeholder cover gradient (used when there is no image)
  ink: string;
  image?: string;
  wide?: boolean; // landscape cover
};

export const books: Book[] = [
  {
    title: "Sweet Land of Liberty",
    cat: "inspirational",
    blurb:
      "Discover America’s national symbols, from the Bald Eagle to the national motto, through full-color photographs taken by the author.",
    href: "https://www.amazon.com/dp/B0H2SJWL9V",
    tone: "from-brand-200 to-brand-600",
    ink: "text-brand-950",
  },
  {
    title: "Girls Become Doctors and Much More",
    cat: "inspirational",
    blurb:
      "The many paths open to women in medicine, from the arts and humanities to leadership, with stories of trailblazers, mentors and global colleagues.",
    href: "https://www.amazon.com/dp/B0FMQP83N5",
    tone: "from-brand-300 to-brand-700",
    ink: "text-white",
    image:
      P +
      "8e82e277-fd90-4bc8-ae92-73c123c3ea33/girls+become+doctors+final+cover.jpg",
  },
  {
    title: "I Played My Best for Him!",
    cat: "inspirational",
    blurb:
      "The history and stories behind 13 beloved Christmas songs, written as a companion to her album Peju Sings!",
    href: "https://www.amazon.com/dp/B0FYTM1Y8N",
    href2: {
      label: "Barnes & Noble",
      href: "https://www.barnesandnoble.com/w/i-played-my-best-for-him-olapeju-simoyan/1146449893",
    },
    badge: "2024 American Writing Awards finalist",
    tone: "from-brand-300 to-brand-500",
    ink: "text-brand-950",
    image:
      P +
      "2a19ec22-7fbc-4881-adec-827571c7263e/I+Played+My+Best+for+Him_ebook_cover+%282%29.jpg",
  },
  {
    title: "Heartfelt Offerings",
    cat: "inspirational",
    note: "A 25-day devotional",
    blurb:
      "Daily reflections, questions and activities based on the carols in I Played My Best for Him!, with mental health tips and wisdom pearls.",
    href: "https://www.amazon.com/dp/B0FYTM1Y8N",
    tone: "from-brand-400 to-brand-800",
    ink: "text-white",
  },
  {
    title: "Transformation & Recovery: Lessons from the Butterfly",
    cat: "behavioral",
    blurb:
      "The stages of personal change, explained through the life cycle of a butterfly. A hopeful, interactive guide for recovery.",
    href: "https://www.amazon.com/dp/B0BVF7PHQM",
    tone: "from-brand-200 to-brand-700",
    ink: "text-white",
    image: P + "064fc129-001a-4ff4-9922-93b51925bad6/COVER_V.png",
  },
  {
    title: "Navigating the Methadone Maze",
    cat: "medical",
    note: "A guide for patients and professionals",
    blurb:
      "A clear, practical guide to methadone treatment for opioid use disorder, answering common questions from patients and providers.",
    href: "https://www.amazon.com/dp/B0FB43V7WR",
    tone: "from-brand-800 to-brand-950",
    ink: "text-white",
  },
  {
    title: "Navigating the Buprenorphine Maze",
    cat: "medical",
    note: "With Dr. William Santoro",
    blurb:
      "A compassionate, easy-to-understand guide for people considering or receiving buprenorphine treatment for opioid use disorder.",
    href: "https://www.amazon.com/dp/B0H1MJ1JTK",
    tone: "from-brand-700 to-brand-900",
    ink: "text-white",
  },
  {
    title: "Living Foolproof! Wisdom for Daily Living",
    cat: "growth",
    note: "A 31-day devotional and journal",
    blurb:
      "An interactive 31-day journey of universal principles for self-discovery and positive change, whatever your faith or background.",
    href: "https://www.amazon.com/dp/B0BMSKL7WT",
    tone: "from-brand-100 to-brand-500",
    ink: "text-brand-950",
    image: P + "55ffe799-ec10-4e09-9eee-69a76a5562c7/COVER_V2.png",
  },
  {
    title: "Giraffes are Amazing!",
    cat: "nature",
    blurb:
      "Stunning photographs and easy-to-follow science about the world’s tallest land animals.",
    href: "https://www.amazon.com/dp/B0CCXKYR7M",
    tone: "from-brand-200 to-brand-500",
    ink: "text-brand-950",
    image: P + "b3a803a7-50b9-4e18-8035-08592c8c55c5/COVER_H.png",
    wide: true,
  },
  {
    title: "The Amazing World of Butterflies",
    cat: "nature",
    blurb:
      "A colorful photographic journey through the world of butterflies, their species and their delicate beauty.",
    href: "https://www.amazon.com/dp/B0BTBYSX6R",
    tone: "from-brand-300 to-brand-600",
    ink: "text-white",
    image: P + "0664ee8a-f1c9-43c2-864c-ac7915c9bad2/COVER_H2.png",
    wide: true,
  },
  {
    title: "Scranton, A Place to Call Home",
    cat: "travel",
    note: "The Electric City at a glance",
    blurb:
      "An expanded edition of the photographic book first made for Scranton’s 150th anniversary, tracing the city from its industrial roots to today.",
    href: "https://www.amazon.com/dp/B0CLHS52BH",
    tone: "from-brand-200 to-brand-800",
    ink: "text-white",
    image: P + "62738378-1808-418e-b2e5-0058777c0083/COVER_V3.png",
  },
];

export const reviews = [
  {
    quote: "A treat for music, holiday, and history lovers alike.",
    source: "Self-Publishing Reviews",
    book: "I Played My Best for Him!",
  },
  {
    quote: "A great book for all who love Christmas music.",
    source: "Reader’s Favorite",
    book: "I Played My Best for Him!",
  },
  {
    quote: "The butterfly life cycle analogy is beautifully used.",
    source: "eBookFair",
    book: "Transformation & Recovery",
  },
];

/* ───────── SPEAKING ───────── */
export const audiences = [
  {
    title: "Elementary school students",
    points: [
      "Her story as a doctor, writer and nature lover",
      "How science, the arts and nature go hand in hand",
      "A fun look at careers in healthcare, writing and exploring the outdoors",
    ],
  },
  {
    title: "Middle & high school students",
    points: [
      "Her path to becoming both a doctor and an artist",
      "How creative expression builds confidence and helps process emotions",
      "Practical ways to use writing and music to manage stress",
    ],
  },
  {
    title: "University students & professionals",
    points: [
      "How creativity supports well-being, communication and growth",
      "Creative expression and resilience in classrooms and clinics",
      "Strategies for bringing writing, music and the arts into mental health practice",
    ],
  },
];

export const pastTalks = [
  {
    venue: "University of Rochester",
    date: "March 2025",
    image: IMG.rochester,
  },
  { venue: "Harvard Medical School", date: "March 2025", image: IMG.harvard },
  { venue: "Penn State Health", date: "March 2025", image: IMG.pennstate },
];

/* ───────── MEDIA + MUSIC ───────── */
export type MediaType = "Podcast" | "Radio" | "Video" | "Article";
export type MediaItem = {
  title: string;
  source: string;
  date?: string;
  blurb: string;
  type: MediaType;
  href?: string;
};

export const media: MediaItem[] = [
  {
    title: "Uncovering the Origins of Your Favorite Christmas Carols",
    source: "WGCU Radio",
    date: "Dec 2025",
    blurb:
      "The history and meaning behind cherished Christmas songs, from her book I Played My Best for Him.",
    type: "Radio",
    href: "https://www.youtube.com/watch?v=MygMdzcpC3Y",
  },
  {
    title: "Randy Landreneau, Rhyen Staley, Dr. Olapeju Simoyan",
    source: "The Schilling Show",
    date: "Dec 2025",
    blurb:
      "Music, well-being and lighthearted stories, including singing carols in Nigeria before knowing the words.",
    type: "Radio",
    href: "https://share.transistor.fm/s/12778282",
  },
  {
    title: "Stories Behind Beloved Christmas Carols",
    source: "Entertaining Options",
    date: "Dec 2025",
    blurb:
      "How curiosity about “O Holy Night” grew into a book, a companion devotional and a trip to Austria.",
    type: "Article",
    href: "https://entertaining-options.com/2025/12/04/dr-olapeju-simoyan-shares-the-stories-behind-some-of-the-most-beloved-christmas-songs-in-i-played-my-best-for-him/",
  },
  {
    title: "Bridging Medicine and the Arts",
    source: "MPeterson Music Podcast",
    date: "Sep 2025",
    blurb:
      "Girls Become Doctors and Much More, and why science and the arts belong together.",
    type: "Podcast",
    href: "https://mpetersonmusic.com/podcast/episode217",
  },
  {
    title: "Greater Reading Public Eye",
    source: "BCTV",
    date: "Dec 2024",
    blurb:
      "A wide-ranging conversation about her work as a musician, photographer, author and physician.",
    type: "Video",
    href: "https://www.youtube.com/watch?v=wbeGIltkTcY",
  },
  {
    title: "ArtScene with Erika Funke",
    source: "WVIA Public Media",
    date: "Dec 2024",
    blurb:
      "Stories from her Christmas book, the accompanying album and her creative process.",
    type: "Radio",
    href: "https://soundcloud.com/wvia-public-media/olapeju-simoyan-december-03-2024",
  },
  {
    title: "Dr. Olapeju Simoyan Brings Healing Through Art",
    source: "B Inspired",
    date: "Nov 2024",
    blurb:
      "Her Christmas album, book and devotional, and how the butterfly life cycle guides her work in addiction medicine.",
    type: "Podcast",
    href: "https://podcasts.apple.com/us/podcast/dr-olapeju-simoyan-a-k-a-peju-brings-healing-through-art/id1501717601?i=1000677865301",
  },
  {
    title: "Music As Healthcare",
    source: "Choralosophy",
    date: "Nov 2024",
    blurb:
      "Music therapy for chronic pain, the neural links between learning and addiction, and healing through musical training.",
    type: "Podcast",
    href: "https://choralosophy.com/2024/11/08/episode-223-music-as-healthcare-with-dr-olapeju-simoyan/",
  },
  {
    title: "Bridge Over Troubled Water",
    source: "The Schemel Forum, University of Scranton",
    date: "Oct 2024",
    blurb:
      "A talk on harnessing music, art and the humanities for better physical and mental health.",
    type: "Video",
    href: "https://www.youtube.com/live/uAE63fWmEOM",
  },
  {
    title: "Medicine, Music, and Literature",
    source: "The Art of Medicine with Dr. Andrew Wilner",
    date: "Nov 2022",
    blurb:
      "How music and creative writing can enhance the practice of medicine, plus her piano and ukulele.",
    type: "Podcast",
    href: "https://andrewwilner.buzzsprout.com/945151/episodes/11567448-medicine-music-and-literature-an-interview-with-olapeju-simoyan-md-mph",
  },
  {
    title: "Stop Trying to Be Normal",
    source: "Natalie King",
    date: "May 2022",
    blurb:
      "Lessons from two doctorates, and why creativity balances the academia of medicine.",
    type: "Video",
    href: "https://www.youtube.com/watch?v=TBgeG49n380",
  },
  {
    title: "Healer Heal Yourself",
    source: "Dr. Hisla Bates",
    date: "Oct 2021",
    blurb:
      "How she found addiction medicine, and how she expresses her creativity.",
    type: "Podcast",
    href: "https://podcasts.apple.com/us/podcast/healer-heal-yourself-reduce-burnout-discover-your-creativity/id1585536948",
  },
  {
    title: "Do Creativity and Artistry Exist in Medicine?",
    source: "Financial Freedom for Physicians",
    date: "Aug 2021",
    blurb: "Using creativity and artistry to improve the patient experience.",
    type: "Video",
    href: "https://www.youtube.com/watch?v=RumQCl45S-E",
  },
  {
    title: "Reciting the Gettysburg Address",
    source: "The Address, a film by Ken Burns",
    date: "2014",
    blurb: "Dr. Simoyan reciting the Gettysburg Address for the PBS film.",
    type: "Video",
    href: "https://www.pbs.org/kenburns/the-address/about/overview/",
  },
  {
    title: "Living a Life of Service",
    source: "Northeast Pennsylvania Business Journal",
    date: "Mar 2015",
    blurb: "Featured as one of the 2015 Top 25 Women in Business.",
    type: "Article",
    href: "https://issuu.com/cngnewspapers/docs/ts0304_b01_comp/39",
  },
  {
    title: "Four Music & Medicine Leaders in Berlin",
    source: "AMWA",
    blurb:
      "A quartet of physicians plays to an international audience at a conference in Berlin.",
    type: "Article",
    href: "https://www.amwa-doc.org/news/amwa-on-tour-four-music-medicine-committee-members-impress-at-international-conference-in-berlin-germany/",
  },
];

export const music = [
  {
    title:
      "Peju Sings! America the Beautiful, The Star-Spangled Banner & My Country ’Tis of Thee",
    year: "2026",
    href: "https://www.youtube.com/playlist?list=PLwpGOFjEe6Q_pueOc2_NeENsYkXOYdHxM",
  },
  {
    title: "Peju Sings! The Little Drummer Boy and Other Christmas Favorites",
    year: "2023",
    href: "https://pejuthedoctorsinger.hearnow.com/",
  },
  {
    title: "Ola Christmas Melodies",
    year: "2020",
    href: "https://www.youtube.com/playlist?list=OLAK5uy_n1b20tFBIrG1wzIVpRIsBIclNwIP2oteU",
  },
];

/* ───────── ABOUT ───────── */
export const highlights = [
  "Founding Medical Director of Research, Caron Treatment Centers",
  "Founding faculty, Geisinger Commonwealth School of Medicine",
  "Program Director, Geisinger Marworth Addiction Medicine Fellowship, among the first ACGME-accredited",
  "Part of the first cohort board certified in addiction medicine",
  "First medical director, Dunmore Comprehensive Treatment Center",
  "Founding Editor in Chief of Silver Linings and Black Diamonds",
];

export const honors = [
  { year: "2024–26", text: "Sinai and Synapses Fellow" },
  { year: "2023", text: "Fellow, American Medical Women’s Association" },
  {
    year: "2022",
    text: "National Humanism in Medicine Medal, Arnold Gold Foundation",
  },
  {
    year: "2015",
    text: "Top 25 Women in Business, Northeast PA Business Journal",
  },
  {
    year: "2015",
    text: "Second Prize, Citizen Diplomacy Award, US State Department",
  },
  { year: "2012–14", text: "Fulbright Specialist scholar to Nigeria" },
];