# 🎀 A Little Birthday World For My Best Friend 💗

Ek magical, interactive aur memorable birthday surprise adventure website aapki best friend ke liye!

---

## 🚀 Live Local URL
Aapki website live chal rahi hai:
👉 **[http://localhost:5173/](http://localhost:5173/)**

---

## 🎨 Kaise Customize Karein (Easy Step-by-Step)

Saari personalization ek hi file me rakhi gayi hai:
📁 **[`src/config/birthdayConfig.js`](file:///c:/Users/satis/OneDrive/Desktop/Birthday_web/src/config/birthdayConfig.js)**

### 1. Naam aur Dates Badlein:
```js
birthdayName: "Ananya",             // Yahan apni best friend ka naam likhein
senderName: "Your Bestie",           // Yahan apna naam likhein
friendshipStartDate: "October 14, 2021", // Dosti shuru hone ki date
birthdayDate: "October 29",          // Uska birthday date
yearsOfFriendship: "4 Unforgettable Years",
```

### 2. Apni Photos Lagayein:
1. Apni photos ko `public/assets/` folder me daalein:
   - `memory-1.jpg`
   - `memory-2.jpg`
   - `memory-3.jpg`
   - `memory-4.jpg`
   - `memory-5.jpg` (yeh 5th photo secret surprise hai jo gallery browse karne par khulti hai!)
2. `birthdayConfig.js` me `memoryGarden.photos` ke titles aur captions apni personal memories ke hisaab se edit kar sakte hain.

*(Note: Default me humne 5 cute watercolor illustrations pehle se laga diye hain, taaki photos na hone par bhi page khali na lage!)*

### 3. Birthday Song aur Voice Note:
- Agar aapke paas koi specific birthday song hai to use `public/assets/birthday-song.mp3` naam se save karein.
- Agar aapne koi voice note record kiya hai to use `public/assets/voice-message.mp3` naam se save karein.
- **Audio Fallback:** Agar aap koi audio file nahi bhi daalte, to website me built-in **Web Audio Music Box** hai jo automatically "Happy Birthday" ki sweet music-box tune play karta hai!

### 4. Quiz, Puzzles & Personal Letters:
- **Friendship Quiz (Level 1):** `birthdayConfig.js` me questions, funny wrong answers aur affectionate reactions badal sakte hain.
- **Secret Puzzle (Level 2):** Scrambled tiles "BEST FRIENDS FOREVER" banate hain.
- **The Bestie Challenge (Level 4):** Mazedaar questions aur custom responses.
- **Heartfelt Letter (Level 5):** Typewriter animation ke sath khulne wala emotional letter.
- **Mystery Gift Box (Level 6):** Custom riddle aur birthday voucher.
- **Birthday Cake (Level 7):** Real microphone blow detection ya touch/click se mombatti bujhane ka system.
- **Grand Celebration (Level 8):** Fireworks, balloons, music aur photo collage.
- **Secret Ending:** Golden heart lock se khulne wala final friendship promise.

---

## 🛠️ Controls & Features
- **Header Progress Bar:** 10 stages ki live tracking.
- **Music Box Toggle (🎵):** Background sweet chime melody on/off karne ke liye.
- **Mute Toggle (🔊):** Sound effects on/off.
- **Chapter Navigator (📋):** Kisi bhi unlocked level par directly jump karne ke liye.
- **Reset (🔄):** Starting se restart karne ke liye.
