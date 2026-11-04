/**
 * ====================================================================
 * 🎀 BIRTHDAY CONFIGURATION & PERSONALIZATION FILE 🎀
 * ====================================================================
 * 
 * Welcome! You can personalize this entire birthday adventure by editing
 * the values in this single file.
 */

export const birthdayConfig = {
  // -------------------------------------------------------------
  // 1. PRIMARY PERSONALIZATION
  // -------------------------------------------------------------
  birthdayName: "Priya", // Change to HER name (e.g., "Sophia", "Priya", "Emma")
  senderName: "Satish", // Change to YOUR name (e.g., "Aarav", "Alex", "Lucas")
  friendshipStartDate: "In Debuggerzz", // When your friendship began
  birthdayDate: "November 8", // Her birthday date or month/day
  yearsOfFriendship: "1 Unforgettable Life Part",

  // -------------------------------------------------------------
  // 2. AUDIO SETTINGS
  // -------------------------------------------------------------
  birthdaySong: "/assets/birthday-song.mp3",
  hasVoiceMessage: false,

  // -------------------------------------------------------------
  // 3. SCENE 0 — THE MAGICAL INVITATION
  // -------------------------------------------------------------
  invitation: {
    badge: "Special Delivery For You 💌",
    heading: "Hey, Beautiful Priya! 🎀",
    subtext1: "Someone has created a tiny magical world just for you.",
    subtext2: "To unlock your birthday celebration, you must solve a few clever friendship puzzles! 💗",
    openButtonText: "OPEN YOUR LITTLE SURPRISE 💌",
    envelopeLetter: `Dear Priya, 🌸

Today is all about you. But before your birthday surprise begins, you must complete a tiny adventure of clever puzzles created with lots of love, a little madness, and countless memories.

Put on your thinking cap! Ready to unlock your surprises? 🥹🧠💗`,
    startButtonText: "LET'S BEGIN OUR STORY ✨",
  },

  // -------------------------------------------------------------
  // 4. LEVEL 1 — THE SECRET FRIENDSHIP VAULT (CODE CRACKER)
  // -------------------------------------------------------------
  vaultPuzzle: {
    levelTitle: "Level 1: The Secret Friendship Vault 🔐",
    subtitle: "Crack the 4-digit secret combination lock to open the vault! Read the clues or use deduction hints.",
    targetCode: "2410", // 4-digit code (editable)
    clues: [
      { digitIndex: 0, text: "Digit 1: How many best friends in this duo? (1 + 1 = ?)", answer: "2" },
      { digitIndex: 1, text: "Digit 2: Number of seasons in a year (or 2 × 2)", answer: "4" },
      { digitIndex: 2, text: "Digit 3: The loneliest number that became special when we met: (2 - 1)", answer: "1" },
      { digitIndex: 3, text: "Digit 3 & 4 combined: Month number of October (10)", answer: "0" }
    ],
    hintText: "💡 Hint: Think about dates and numbers special to our friendship! Code: 2 4 1 0",
    solvedMessage: "VAULT UNLOCKED! 🔐✨ Your detective brain is as sharp as always!",
    nextButtonText: "PROCEED TO PUZZLE 2 💗"
  },

  // -------------------------------------------------------------
  // 5. LEVEL 2 — THE SECRET WORD PUZZLE
  // -------------------------------------------------------------
  letterPuzzle: {
    levelTitle: "Level 2: The Secret Friendship Puzzle 💗",
    subtitle: "Arrange the scrambled letters in the right order to unlock our sacred friendship phrase!",
    targetPhrase: "BEST FRIENDS FOREVER",
    hintText: "Three special words that define who we are to each other forever...",
    solvedMessage: "Maybe we are both a little crazy, but I'm so glad life made our paths cross. 💗",
    nextButtonText: "PROCEED TO LEVEL 3 🎀"
  },

  // -------------------------------------------------------------
  // 6. LEVEL 3 — THE MAGICAL RIBBON FLOW (PATH PUZZLE)
  // -------------------------------------------------------------
  ribbonPuzzle: {
    levelTitle: "Level 3: The Magical Ribbon Connection 🎀⚡",
    subtitle: "Rotate the tiles to build an unbroken glowing pink ribbon connecting our two hearts!",
    successTitle: "HEARTS CONNECTED! 🎀💖",
    successMessage: "The magic ribbon is flowing! Distance or time can never break our bond.",
    nextButtonText: "PROCEED TO LEVEL 4 🃏"
  },

  // -------------------------------------------------------------
  // 7. LEVEL 4 — BESTIE MEMORY MATCH (CARD FLIP GAME)
  // -------------------------------------------------------------
  memoryMatch: {
    levelTitle: "Level 4: Bestie Memory Match 🃏✨",
    subtitle: "Flip and match all 6 pairs of friendship tokens to unlock our next challenge!",
    successTitle: "ALL PAIRS MATCHED! 🏆🌸",
    successMessage: "Officially confirmed: You have an unbeatable memory for our bestie universe!",
    nextButtonText: "ENTER MINDCRAFT FORGE ⛏️🧠"
  },

  // -------------------------------------------------------------
  // 7.5 LEVEL REWARDS — SECRET MEMORY PHOTOS (LEVELS 1 TO 4)
  // -------------------------------------------------------------
  levelRewards: {
    1: {
      photo: "/assets/reward-level-1.jpg",
      fallbackPhoto: "/assets/memory-1.jpg",
      badge: "Level 1 Vault Cleared! 🔐✨",
      title: "Secret Memory #1 Unlocked 🌸",
      caption: "Super sharp detective brain! Look at this bright, beautiful smile.",
      nextButtonText: "PROCEED TO LEVEL 2 💗"
    },
    2: {
      photo: "/assets/reward-level-2.jpg",
      fallbackPhoto: "/assets/memory-2.jpg",
      badge: "Level 2 Secret Phrase Solved! 🎀✨",
      title: "Secret Memory #2 Unlocked 🧸💛",
      caption: "Friendship phrase unlocked! Always bringing endless joy and positivity.",
      nextButtonText: "PROCEED TO LEVEL 3 🎀"
    },
    3: {
      photo: "/assets/reward-level-3.jpg",
      fallbackPhoto: "/assets/priya-cake-wish.jpg",
      badge: "Level 3 Hearts Connected! ⚡💖",
      title: "Secret Memory #3 Unlocked 🎂✨",
      caption: "The magic ribbon is flowing! A sweet moment captured forever.",
      nextButtonText: "PROCEED TO LEVEL 4 🃏"
    },
    4: {
      photo: "/assets/reward-level-4.jpg",
      fallbackPhoto: "/assets/memory-4.jpg",
      badge: "Level 4 Cards Matched! 🏆🌸",
      title: "Secret Memory #4 Unlocked 👭🎉",
      caption: "Memory champion! Surrounding the birthday girl with love and smiles.",
      nextButtonText: "ENTER MINDCRAFT FORGE ⛏️🧠"
    }
  },

  // -------------------------------------------------------------
  // 8. LEVEL 5 — MINDCRAFT: FRIENDSHIP BRAINSTORM LAB (CRAFTING PUZZLE)
  // -------------------------------------------------------------
  mindcraft: {
    levelTitle: "Level 5: MindCraft Brainstorm Lab 🧠⛏️",
    subtitle: "Brainstorm the recipe clues and arrange blocks in the 3x3 crafting grid to forge 3 legendary friendship artifacts!",
    successTitle: "ALL 3 ARTIFACTS FORGED! 🏆💎",
    successMessage: "You are a master Brainstorm Architect! Your creativity and friendship knowledge is legendary.",
    nextButtonText: "ENTER THE MEMORY GARDEN 🌸📸",
    recipes: [
      {
        id: "totem",
        title: "Recipe 1: The Friendship Totem 🗿💖",
        description: "An ancient bestie relic guarding our duo against all negative vibes!",
        clue: "Place a Friendship Diamond in the center (slot 5), Blossom Petals on both sides (slots 4 & 6), and a Star Sparkle on top (slot 2)!",
        hint: "Top: Star | Middle: Blossom - Diamond - Blossom",
        requiredSlots: {
          1: "star",
          3: "blossom",
          4: "diamond",
          5: "blossom"
        },
        craftedItem: {
          name: "Unbreakable Friendship Totem 🗿💖",
          tag: "Legendary Protection",
          lore: "Infused with pure laughter and loyalty. Guaranteed 100% defense against sadness and bad days!"
        }
      },
      {
        id: "beacon",
        title: "Recipe 2: The 3 AM Gossip Beacon ⚡🧸",
        description: "A redstone-powered transmitter broadcasting late night talks & wild stories!",
        clue: "Place Redstone Energy across the entire middle row (slots 4, 5, 6), sweeten with Honey on top (slot 2), and anchor with Obsidian at the bottom (slot 8)!",
        hint: "Top: Honey | Middle: 3 Redstones | Bottom: Obsidian",
        requiredSlots: {
          1: "honey",
          3: "redstone",
          4: "redstone",
          5: "redstone",
          7: "obsidian"
        },
        craftedItem: {
          name: "Enchanted 3 AM Gossip Beacon ⚡🧸",
          tag: "Mythic Communicator",
          lore: "Transmits infinite rants, drama updates, and deep midnight conversations across any distance!"
        }
      },
      {
        id: "crown",
        title: "Recipe 3: The Birthday Queen's Crown 👑✨",
        description: "The royal coronation crown forged exclusively for today's birthday star!",
        clue: "Place Golden Ingots across the top corners & top middle (slots 1, 2, 3), and place the precious Diamond right in the center (slot 5)!",
        hint: "Top row: 3 Gold Ingots | Center: Diamond",
        requiredSlots: {
          0: "gold",
          1: "gold",
          2: "gold",
          4: "diamond"
        },
        craftedItem: {
          name: "The Eternal Birthday Crown 👑✨",
          tag: "Divine Royalty",
          lore: "Bestowed upon the sweetest, funniest, and most irreplaceable best friend in the universe!"
        }
      }
    ]
  },

  // -------------------------------------------------------------
  // 9. LEVEL 6 — OUR LITTLE MEMORY GARDEN (SCRAPBOOK)
  // -------------------------------------------------------------
  memoryGarden: {
    levelTitle: "Level 6: Our Little Memory Garden 🌸📸",
    subtitle: "A digital scrapbook of our favorite chapters, smiles, and adventures.",
    nextButtonText: "OPEN YOUR HEARTFELT LETTER & GIFT 💌",
    surprisePhotoNote: "✨ Special Secret Memory Unlocked: The bond that keeps growing stronger every day! 🌸",
    photos: [
      {
        id: 1,
        image: "/assets/memory-1.jpg",
        title: "That Radiant, Pure Smile ✨🌸",
        date: "Memory Chapter 01",
        caption: "Your smile has this magical superpower to make any ordinary day bright and full of positive vibes!"
      },
      {
        id: 2,
        image: "/assets/memory-2.jpg",
        title: "Thinking of Infinite Mischief 🧸💛",
        date: "Memory Chapter 02",
        caption: "The cutest pose, the warmest heart, and that little sparkle in your eyes when we're plotting crazy plans together."
      },
      {
        id: 3,
        image: "/assets/memory-3.jpg",
        title: "Cake First, World Later! 🎂😋",
        date: "Memory Chapter 03",
        caption: "Candles glowing, making heartfelt wishes, and digging straight into the sweetest birthday cake! May your year be just as sweet."
      },
      {
        id: 4,
        image: "/assets/memory-4.jpg",
        title: "The Unstoppable Bestie Squad 👭🎉",
        date: "Memory Chapter 04 — Forever Duo & Crew",
        caption: "Surrounded by endless laughter, thumbs up, and moments that become core memories forever. Blessed to have you in my life!"
      }
    ]
  },

  // -------------------------------------------------------------
  // 10. LEVEL 7 — A LETTER & MYSTERY GIFT (HEARTFELT & SURPRISE)
  // -------------------------------------------------------------
  heartfeltLetter: {
    levelTitle: "Level 7: A Letter & Mystery Gift Just For You 🥹🎁",
    subtitle: "A handwritten letter straight from the heart, with a hidden mystery gift...",
    waxSealText: "Click the Wax Seal to Open 💌",
    nextButtonText: "UNLOCK THE SECRET GIFT BOX 🎁",
    paragraphs: [
      "Dear Priya ❤️",
      "Pata nahi tumhe ye letter padhkar kaisa lagega, lekin aaj mann ki kuch baatein likhne ka socha.",
      "Dekho Priya, zindagi mein bahut se log milte hain. Kuch log sirf naam ke liye milte hain, kuch thode waqt ke liye aur kuch aise hote hain jo bina kisi wajah ke bhi apne se lagne lagte hain. Tum unhi logon mein se ek ho.",
      "Main ye nahi kahunga ki hum best friends hain, kyunki dosti ka koi naam dene se pehle use dil se mehsoos karna zaroori hota hai.",
      "Bas itna kehna chahta hoon ki tumse baat karke achha lagta hai. Kabhi tumhari chhoti si baat chehre par smile le aati hai, toh kabhi tumhara ek message bhi din ko thoda behtar bana deta hai.",
      "Mujhe nahi pata tumhari life mein kitne special friends hain, lekin meri ek chhoti si wish hai ki kabhi tumhari favourite friends list mein mera naam bhi ho.",
      "Main tumse roz baat karne ka promise nahi maangta, na hi har waqt attention chahta hoon. Bas jab bhi baat ho, dil se ho. Kabhi hasi-mazaak ho, kabhi serious baatein, kabhi bina kisi topic ke hi baatein hoti rahein.",
      "Aur haan, agar kabhi tum pareshan ho, toh bina soche mujhse share kar sakti ho. Main shayad har problem solve na kar paun, lekin tumhari baat sunne ke liye zaroor rahunga.",
      "Ek baat kahun?",
      "Best friend banana koi competition nahi hai, jahan kisi ko jeetna hota hai. Ye toh ek khoobsurat rishta hai jo waqt, bharose aur care se apne aap ban jata hai.",
      "Bas dil se chahta hoon ki ek din tum khud kaho...",
      "“Satish, tum sirf mere friend nahi, mere best friend ho.” ❤️",
      "Tab shayad mujhe kuch kehne ki zaroorat hi nahi padegi, kyunki meri ye chhoti si wish poori ho chuki hogi.",
      "Take care, Priya. Hamesha khush rehna! ❤️"
    ],
    signature: "— Tumhara ek achha dost,\nSatish ❤️"
  },

  // -------------------------------------------------------------
  // 10. LEVEL 7 — THE MYSTERY GIFT BOX
  // -------------------------------------------------------------
  mysteryGift: {
    levelTitle: "Level 7: The Mystery Gift Box 🎁✨",
    subtitle: "Your next surprise is hidden inside. Find the right key!",
    riddle: "“What is the one thing that keeps our friendship unbroken, even across distance, time, and crazy schedules?”",
    wrongHint: "Not quite that one! Think about what truly connects our hearts no matter what... Try another key! 🗝️",
    correctHeading: "YOU UNLOCKED A LITTLE PIECE OF MY HEART 💗",
    nextButtonText: "NOW, IT'S CAKE TIME! 🎂",
    keys: [
      {
        id: "key-1",
        name: "Key of Mutual Drama 🎭",
        icon: "🎭",
        isCorrect: false,
        hint: "Fun, but our bond goes much deeper than daily drama! Try again! 🌸"
      },
      {
        id: "key-2",
        name: "Key of Unconditional Love & Pure Trust 🗝️✨",
        icon: "🗝️",
        isCorrect: true,
        hint: "The golden key of true friendship!"
      },
      {
        id: "key-3",
        name: "Key of Endless Snacking 🍟",
        icon: "🍟",
        isCorrect: false,
        hint: "Very tempting, but snacks are temporary, true friendship is forever! 😂"
      }
    ],
    giftCard: {
      tag: "Special Birthday Voucher For Priya 🎟️🎀",
      title: "Lifetime Friendship Warranty & Unlimited Hugs",
      perks: [
        "🌸 Unlimited 24/7 rant listening privileges (zero judgment)",
        "🍰 One free birthday dinner of your choice (on me!)",
        "📸 Free emergency excuse provider whenever you need to escape plans",
        "💗 Eternal bestie status with VIP privileges forever"
      ],
      note: "“You are one of the best gifts life has ever given me. Now let's celebrate you!”"
    }
  },

  // -------------------------------------------------------------
  // 11. LEVEL 8 — THE INTERACTIVE BIRTHDAY CAKE
  // -------------------------------------------------------------
  cake: {
    levelTitle: "Level 8: The Birthday Cake & Wish 🎂🕯️",
    instruction1: "Close your eyes, make a wish, and get ready... ✨",
    instruction2: "Your birthday magic begins when the candles go out!",
    candleCount: 6,
    blowMicButtonText: "BLOW OUT THE CANDLES 🎤",
    blowTapButtonText: "BLOW CANDLES (CLICK/TAP) 💨",
    privacyNote: "🔒 Microphone access is used only in your browser to detect air blowing and is never recorded or uploaded.",
    wishTitle: "MAKE A WISH, BIRTHDAY GIRL! 🌸",
    celebrationNotice: "HAPPY BIRTHDAY, PRIYA! 🎂💗",
  },

  // -------------------------------------------------------------
  // 12. LEVEL 9 — THE BIRTHDAY CELEBRATION
  // -------------------------------------------------------------
  celebration: {
    levelTitle: "Level 9: The Grand Birthday Celebration 🎶🎉",
    mainHeading: "HAPPY BIRTHDAY, PRIYA! 🎂🎀",
    subHeading: "Today, the world gets a little brighter because YOU are in it. 💗",
    playSongButton: "PLAY YOUR BIRTHDAY SONG 🎶",
    pauseSongButton: "PAUSE SONG ⏸️",
    songPlayingText: "Now Playing: Happy Birthday Priya 🎶",
    nextButtonText: "ONE LAST LITTLE SECRET 💌"
  },

  // -------------------------------------------------------------
  // 13. SECRET ENDING — A PROMISE OF FRIENDSHIP
  // -------------------------------------------------------------
  secretEnding: {
    lockPrompt: "Before you go... there's one thing I want you to know.",
    unlockHint: "Click the glowing heart lock to reveal our friendship promise 💖",
    letterTitle: "A Promise of Friendship 🌷❤️",
    letterText: `Dear Priya,

Aaj tumse kuch promises karna chahta hoon, jo sirf likhne ke liye nahi, balki dil se nibhaane ke liye hain:

🤝 1. Promise karta hoon ki tumhari friendship ki hamesha respect karunga.

❤️ 2. Jab bhi tum khush hogi, tumhari khushi mein dil se khush hounga aur jab udaas hogi, tumhari baat sunne ki koshish karunga.

🌸 3. Kabhi jaan-bujhkar tumhara dil nahi dukhaunga. Agar galti ho gayi, toh sorry bolne mein ego nahi rakhunga.

😊 4. Tumhare saath hasi-mazaak, silly talks aur chhoti-chhoti yaadein banata rahunga.

🤗 5. Tum busy ho ya reply na kar pao, toh tumhari space aur time ki respect karunga.

💫 6. Kabhi hamare beech misunderstanding ho, toh friendship khatam karne ke bajaye baat karke suljhaane ki koshish karunga.

🌈 7. Promise karta hoon ki tumhari life mein ek aisa friend banne ki koshish karunga, jiske saamne tum bina soche apni baatein share kar sako.

And my last promise...
Main ye promise nahi karta ki main duniya ka perfect friend banunga, lekin itna zaroor promise karta hoon ki ek achha aur genuine friend banne ki poori koshish karunga.

Meri bas ek chhoti si wish hai...
Hamari dosti sirf aaj tak nahi, balki aane wale kai khoobsurat saalon tak bani rahe. ❤️

Friendship is not about being together every day, it's about knowing that someone genuinely cares.

Forever hoping to be your favourite friend! ❤️

— Satish 🌸`,
    replayButtonText: "REPLAY OUR ADVENTURE 🔄",
    gardenButtonText: "VISIT OUR MEMORY GARDEN 📸"
  }
};
