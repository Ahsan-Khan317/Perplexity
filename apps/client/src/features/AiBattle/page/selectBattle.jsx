import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseAIBAttle from "../UseAIBattle.js";

const battles = [
  { 
    name: "Coding Battle", 
    icon: "💻", 
    description: "AI coding skills" 
  },
  { 
    name: "Debate Battle", 
    icon: "⚔️", 
    description: "AI arguments" 
  },
  { 
    name: "Research Battle", 
    icon: "🔎", 
    description: "AI research" 
  },
  { 
    name: "Reasoning Battle", 
    icon: "🧠", 
    description: "Problem solving" 
  },
  { 
    name: "Creative Writing", 
    icon: "✍️", 
    description: "Creative AI" 
  },
  { 
    name: "AI Courtroom", 
    icon: "⚖️", 
    description: "Legal logic" 
  },
  { 
    name: "Future Prediction", 
    icon: "🔮", 
    description: "Forecast AI" 
  },
  { 
    name: "Genius Idea", 
    icon: "💡", 
    description: "Innovation" 
  },
  { 
    name: "Ultimate Championship", 
    icon: "🏆", 
    description: "All AI battle" 
  },
];

function SelectAIBattle() {
  const [selectedBattle, setSelectedBattle] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();
  const { UsesetBattleTitle } = UseAIBAttle();
  const processing = useRef(false);
  const isMounted = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Update Redux when selected battle changes
  useEffect(() => {
  
const setTitle = async()=>{
    if (selectedBattle && UsesetBattleTitle ) {
     UsesetBattleTitle(selectedBattle);
    }
    
}

setTitle()



  }, [selectedBattle, UsesetBattleTitle]);

  const handleBattleSelect = useCallback((battleName) => {
    // Prevent multiple rapid clicks
    if (processing.current || isNavigating) {
      console.log("Already processing or navigating, ignoring click");
      return;
    }

    try {
      console.log("Battle selected:", battleName);
      processing.current = true;
      setIsNavigating(true);

      // Set selected battle
      setSelectedBattle(battleName);

     
      
      // Use replace to prevent back button issues
      navigate("/ai_battle_arena", { replace: true });

    } catch (error) {
      console.error("Error in handleBattleSelect:", error);
      processing.current = false;
      setIsNavigating(false);
    } finally {
      // Reset processing flag after navigation
      setTimeout(() => {
        if (isMounted.current) {
          processing.current = false;
          // Don't reset isNavigating here as it might cause issues
        }
      }, 1000);
    }
  }, [navigate, isNavigating]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-y-auto overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-linear-to-br from-yellow-400/10 via-yellow-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-6 py-8 sm:py-12 pt-20 sm:pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-bold bg-linear-to-r from-yellow-300 to-amber-500 text-transparent bg-clip-text">
            Choose AI Battle
          </h1>
          <p className="mt-3 text-zinc-400 text-xs sm:text-base">
            Select battlefield and watch AI compete
          </p>
        </div>

        {/* Battle Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {battles.map((battle) => (
            <button
              key={battle.name}
              onClick={() => handleBattleSelect(battle.name)}
              disabled={isNavigating || processing.current}
              className={`
                relative rounded-xl border p-3 sm:p-5 text-left
                bg-linear-to-br from-yellow-500/10 to-black
                border-yellow-500/20 cursor-pointer
                hover:border-yellow-400
                hover:shadow-[0_0_30px_rgba(250,204,21,0.15)]
                active:scale-95
                transition-all duration-300
                ${selectedBattle === battle.name ? "border-yellow-400" : ""}
                ${(isNavigating || processing.current) ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <div className="text-2xl sm:text-3xl">
                {battle.icon}
              </div>

              <h2 className="mt-2 font-semibold text-xs sm:text-base text-zinc-100">
                {battle.name}
              </h2>

              <p className="mt-1 text-[10px] sm:text-xs text-zinc-500 line-clamp-2">
                {battle.description}
              </p>
            </button>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-12 flex justify-center gap-8 text-center text-xs text-zinc-500">
          <div>
            <p className="text-yellow-400 font-bold text-lg">9</p>
            Battles
          </div>

          <div>
            <p className="text-yellow-400 font-bold text-lg">⚡</p>
            Realtime
          </div>

          <div>
            <p className="text-yellow-400 font-bold text-lg">🏆</p>
            Champion
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectAIBattle;