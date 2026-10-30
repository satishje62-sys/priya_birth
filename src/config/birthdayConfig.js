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
  voiceMessage: "/assets/voice-message.mp3",
  hasVoiceMessage: true,

  // -------------------------------------------------------------
  // 3. SCENE 0 — THE MAGICAL INVITATION
  // -------------------------------------------------------------
  invitation: {
    badge: "Special Delivery For You 💌",
    heading: "Hey, Beautiful Soul! 🎀",
    subtext1: "Someone has created a tiny magical world just for you.",
    subtext2: "To unlock your birthday celebration, you must solve a few clever friendship puzzles! 💗",
    openButtonText: "OPEN YOUR LITTLE SURPRISE 💌",
    envelopeLetter: `Dear Bestie,

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
      "Hey Bestie, 💗",
      "I don't think I say this enough, but I'm genuinely grateful to have you in my life.",
      "Thank you for all the random conversations, the uncontrollable laughter, the silly arguments, the little moments, and the memories that have become such a beautiful part of my life.",
      "You have a special place in my world, and I'm really glad that our paths crossed.",
      "I hope this new year of your life brings you happiness that stays, dreams that come true, people who appreciate you, and moments that make your heart feel full.",
      "Whenever life gets difficult, I hope you remember how capable, beautiful, and special you are.",
      "No matter how busy life becomes, I hope we always find reasons to laugh together, make new memories, and remain the same two idiots who understand each other in our own little way. 😂💗",
      "Thank you for being YOU.",
      "Happy Birthday, my best girl! 🎂🌸"
    ],
    signature: "With lots of love,\nYOUR BEST FRIEND ❤️"
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
      tag: "Special Bestie Birthday Voucher 🎟️🎀",
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
    voiceNoteTitle: "A Personal Voice Note Just For You 🎙️💕",
    voiceNoteCaption: "Press play to hear a special audio message recorded with love.",
    voiceNoteFallbackText: "“Hey birthday girl! Just wanted to tell you how proud I am of you, how much you mean to me, and that I'll always be by your side. Have the most magical birthday ever!”",
    nextButtonText: "ONE LAST LITTLE SECRET 💌"
  },

  // -------------------------------------------------------------
  // 13. SECRET ENDING — A PROMISE OF FRIENDSHIP
  // -------------------------------------------------------------
  secretEnding: {
    lockPrompt: "Before you go... there's one thing I want you to know.",
    unlockHint: "Click the glowing heart lock to reveal our friendship promise 💖",
    letterTitle: "A Promise of Friendship 🌷❤️",
    letterText: `Dear Bestie,

Birthdays come every year, but people who make life feel a little more beautiful are truly special.

Thank you for the laughs, the memories, the comfort, and all the little things that make our friendship ours.

I cannot promise that every day will be perfect or that life will always be easy. But I hope that even as we grow, change, and follow our dreams, we never lose the bond that makes this friendship special.

I hope you always find reasons to smile, courage to follow your dreams, and people who remind you how wonderful you are.

And whenever you need someone to laugh with, cry with, talk to, or simply sit beside you, I hope you know that you have a friend in me.

Happy Birthday, my best friend.

You deserve a lifetime of beautiful memories. 💗🌸`,
    replayButtonText: "REPLAY OUR ADVENTURE 🔄",
    gardenButtonText: "VISIT OUR MEMORY GARDEN 📸"
  }
};
