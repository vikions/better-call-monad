import { useRef, useState } from "react";
import "./App.css";

const CASES = [
  { id: 1, title: "Liquidity Trouble?", image: "/assets/case-01.png" },
  { id: 2, title: "Gambling Problem?", image: "/assets/case-02.png" },
  { id: 3, title: "Identity Crisis?", image: "/assets/case-03.png" },
  { id: 4, title: "Caught Playing Games At Work?", image: "/assets/case-04.png" },
  { id: 5, title: "Technical Difficulties", image: "/assets/case-05.png" },
  { id: 6, title: "Mint & Market Mayhem", image: "/assets/case-06.png" },
];

const CASE_CONTENT: Record<
  number,
  {
    subtitle: string;
    note: string;
    projects: { name: string; url?: string; tagline?: string }[];
  }
> = {
  1: {
    subtitle: "Client reports sudden liquidity loss and mild panic.",
    note: "Try one of these strictly off-the-record solutions before anyone notices.",
    projects: [
      { name: "Kuru Exchange", url: "https://www.kuru.io/", tagline: "Routing your way out of bad swaps." },
      { name: "SeerTrade", url: "https://www.seer.trade/", tagline: "A clearer view on your next move." },
      { name: "Drake Exchange", url: "https://drake.exchange/", tagline: "Perp your way through the chaos." },
    ],
  },
  2: {
    subtitle: "Client can’t stop betting. Neither can the markets.",
    note: "If you’re going to gamble… at least let the smart contracts keep score.",
    projects: [
      { name: "Levr Bet", url: "https://app.levr.bet/", tagline: "Leveraged sports bets, allegedly under control." },
      { name: "RareBet Sports", url: "https://rarelink.rarebetsports.io/", tagline: "Prediction markets for your hot takes." },
      { name: "bro.fun", url: "https://bro.fun/", tagline: "Beer pong, but on-chain. What could go wrong?" },
    ],
  },
  3: {
    subtitle: "Client unsure who they are on-chain, off-chain, or anywhere in between.",
    note: "When in doubt, let the AI and social layers do some of the heavy lifting.",
    projects: [
      { name: "KINETK AI", url: "https://www.kinetk.ai/", tagline: "Protecting your content like it actually matters." },
      { name: "Symphonio", url: "https://www.symphony.io/", tagline: "Agents orchestrating your on-chain moves." },
      { name: "Kizzy Mobile", url: "https://kizzy.io/", tagline: "Social predictions in your pocket." },
    ],
  },
  4: {
    subtitle: "Client allegedly 'testing' games during work hours.",
    note: "If you’re going to get caught playing, at least make it yield something.",
    projects: [
      { name: "Lumiterra", url: "https://lumiterra.net/", tagline: "MMO sandbox for when reality isn’t enough." },
      { name: "LootGo", url: "https://www.lootgo.app/", tagline: "Treasure hunts, but with real on-chain loot." },
      { name: "TeleMafia", url: "https://t.me/TeleMafiaGameBot", tagline: "Telegram, but everyone might be a suspect." },
    ],
  },
  5: {
    subtitle: "Client reports 'something broke in production' and no one read the docs.",
    note: "Good infrastructure doesn’t fix bad decisions… but it does help.",
    projects: [
      { name: "Alchemy", url: "https://www.alchemy.com/", tagline: "When things go wrong, check the RPC first." },
      { name: "0x API", url: "https://0x.org/", tagline: "The silent fixer of your swaps and settlements." },
    ],
  },
  6: {
    subtitle: "Client bought the top. Now they call it 'collecting'.",
    note: "They can’t fix your taste, but they might improve your floor price.",
    projects: [
      {
        name: "Magic Eden",
        url: "https://magiceden.io/",
        tagline: "A familiar marketplace in a new neighborhood.",
      },
      {
        name: "OpenSea",
        url: "https://opensea.io/",
        tagline: "You’ve been here before. Now with more Monad.",
      },
    ],
  },
};


function App() {
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [activeCaseId, setActiveCaseId] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleToggleMusic = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => {
          
        });
    } else {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    }
  };

  const activeCase = activeCaseId ? CASE_CONTENT[activeCaseId] : null;

  return (
    <div className="app-root">
     
      <div className="bg-layer" />

      
      <div className="ash-smoke-container">
        <div className="ash-smoke ash-smoke-1" />
        <div className="ash-smoke ash-smoke-2" />
      </div>

     
      <button className="tv-button" onClick={() => setIsAdOpen(true)}>
        <div className="tv-frame">
          <div className="tv-screen">
            <span className="tv-text">AD</span>
          </div>
          <div className="tv-base" />
        </div>
      </button>

     
      <div className="cases-row">
        {CASES.map((c) => (
          <button
            key={c.id}
            className="case-button"
            onClick={() => setActiveCaseId(c.id)}
          >
            <img src={c.image} alt={c.title} className="case-image" />
          </button>
        ))}
      </div>

      
      {activeCase && (
        <div className="case-overlay" onClick={() => setActiveCaseId(null)}>
          <div className="case-modal" onClick={(e) => e.stopPropagation()}>
            <div className="case-folder">
              <div className="case-tab">
                CASE FILE #{activeCaseId?.toString().padStart(2, "0")}
              </div>
              <div className="case-paper">
                <h2 className="case-title">
                  {CASES.find((c) => c.id === activeCaseId)?.title}
                </h2>
                <p className="case-subtitle">{activeCase.subtitle}</p>
                <p className="case-note">{activeCase.note}</p>

                <h3 className="case-section-title">Recommended dApps</h3>

                
                <table className="case-table">
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeCase.projects.map((p, idx) => (
                      <tr key={`${p.name}-${idx}`}>
                        <td className="project-name">
                          {p.url ? (
                            <a href={p.url} target="_blank" rel="noreferrer">
                              {p.name}
                            </a>
                          ) : (
                            p.name
                          )}
                        </td>
                        <td className="project-desc">
                          {p.tagline || "—"}
                        </td>
                      </tr>
                    ))}

                    
                    {Array.from({
                      length: Math.max(0, 5 - activeCase.projects.length),
                    }).map((_, idx) => (
                      <tr
                        key={`placeholder-${idx}`}
                        className="placeholder-row"
                      >
                        <td colSpan={2} className="placeholder-cell">
                          — ENTRY RESERVED —
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button
                  className="case-close"
                  onClick={() => setActiveCaseId(null)}
                >
                  Close Case
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

     
      {isAdOpen && (
        <div className="overlay" onClick={() => setIsAdOpen(false)}>
          <div className="overlay-inner" onClick={(e) => e.stopPropagation()}>
            <img
              src="/assets/ad-poster.png"
              alt="Better Call Monad Ad"
              className="ad-poster"
            />
            <button
              className="overlay-close"
              onClick={() => setIsAdOpen(false)}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      
      <button className="music-button" onClick={handleToggleMusic}>
        {isMusicPlaying ? "⏸ Pause" : "▶ Play theme"}
      </button>

      
      <audio ref={audioRef} src="/assets/bgm.mp3" loop />
    </div>
  );
}

export default App;
