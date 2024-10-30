// App.tsx
import axios from "axios";
import { useEffect, useState } from "react";
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import ScreenRenderer, { getScreenTitle } from "./components/ScreenRenders";
import { UIProvider } from "./contexts/UIContext";
import { useNavigation } from "./hooks/useNavigations";
import { MaqsadI } from "./interfaces/Maqsad";
import { ScreenName } from "./types";

const App2 = () => {
  const { screenState, navigateTo, goBack, setScreenState } = useNavigation();
  const [maqsads, setMaqsads] = useState<MaqsadI[]>([]);

  const fetchMaqsads = async () => {
    const res = await axios.get(
      "https://hadith-smoky.vercel.app/api/hadiths/maqsads"
    );
    setMaqsads(res.data.maqsads || []);
  };

  useEffect(() => {
    fetchMaqsads();
  }, []);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handleBackButton = (event: PopStateEvent) => {
      event.preventDefault();
      goBack();
    };
    window.addEventListener("popstate", handleBackButton);
    return () => window.removeEventListener("popstate", handleBackButton);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  return (
    <UIProvider>
      <div className="min-h-screen bg-gray-100">
        <Header
          title={getScreenTitle(screenState.name as ScreenName)}
          onBack={goBack}
          showBack={screenState.name !== "maqsads"}
        />

        <main className="flex-1">
          <ScreenRenderer
            screenState={screenState}
            maqsads={maqsads}
            onNavigate={navigateTo}
          />
        </main>

        <BottomNav setCurrentScreen={setScreenState} />
      </div>
    </UIProvider>
  );
};

export default App2;
