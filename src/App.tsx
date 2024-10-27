import { useState } from "react";
import MaqsadScreen from "./screens/Maqsad";
import BooksScreen from "./screens/Book";
import FaslsScreen from "./screens/Fasl";
import CategoriesScreen from "./screens/Categories";
import SearchScreen from "./screens/Search";
import SettingsScreen from "./screens/Settings";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import HadithScreen from "./screens/Hadith";

interface ScreenI {
  name: string;
  params: {
    maqsadId?: number;
    bookId?: number;
    faslId?: number;
    categoryId?: number;
  };
}

const App = () => {
  const [screenState, setScreenState] = useState<ScreenI>({
    name: "maqsads",
    params: {},
  });

  const [history, setHistory] = useState<ScreenI[]>([]);

  const navigateTo = (screenName: string, params: any = {}) => {
    setHistory((prev) => [...prev, screenState]);
    setScreenState({ name: screenName, params });
  };

  const goBack = () => {
    if (history.length > 0) {
      const previousScreen = history[history.length - 1];
      setScreenState(previousScreen);
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  const getScreenTitle = () => {
    switch (screenState.name) {
      case "maqsads":
        return "تطبيق الحديث";
      case "books":
        return "الكتب";
      case "fasls":
        return "الفصول";
      case "categories":
        return "الأبواب";
      case "search":
        return "البحث";
      case "settings":
        return "الإعدادات";
      default:
        return "";
    }
  };

  const renderScreen = () => {
    switch (screenState.name) {
      case "maqsads":
        return <MaqsadScreen onNavigate={navigateTo} />;
      case "books":
        return (
          <BooksScreen
            maqsadId={screenState.params.maqsadId}
            onNavigate={navigateTo}
          />
        );
      case "fasls":
        return (
          <FaslsScreen
            bookId={screenState.params.bookId}
            onNavigate={navigateTo}
          />
        );
      case "categories":
        return (
          <CategoriesScreen
            faslId={screenState.params.faslId}
            bookId={screenState.params.bookId}
            onNavigate={navigateTo}
          />
        );
      case "hadiths":
        return (
          <HadithScreen
            faslId={screenState.params.faslId}
            bookId={screenState.params.bookId}
            onNavigate={navigateTo}
          />
        );
      case "search":
        return <SearchScreen />;
      case "settings":
        return <SettingsScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        title={getScreenTitle()}
        onBack={goBack}
        showBack={screenState.name !== "maqsads"}
      />
      {renderScreen()}
      <BottomNav setCurrentScreen={setScreenState} />
    </div>
  );
};

export default App;
