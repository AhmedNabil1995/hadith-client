import { useEffect, useState } from "react";
import MaqsadScreen from "./screens/Maqsad";
import BooksScreen from "./screens/Book";
import FaslsScreen from "./screens/Fasl";
import CategoriesScreen from "./screens/Categories";
import SearchScreen from "./screens/Search";
import SettingsScreen from "./screens/Settings";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import HadithScreen from "./screens/Hadith";
import { Book } from "lucide-react";
import axios from "axios";
import { MaqsadI } from "./interfaces/Maqsad";

interface ScreenI {
  name: string;
  params: {
    maqsadId?: number;
    bookId?: number;
    faslId?: number;
    categoryId?: number;
    first_hadith_number?: number;
  };
}

const App = () => {
  const [maqsads, setMaqsads] = useState<MaqsadI[]>([]);

  const fetchMaqsads = async () => {
    const res = await axios.get("http://192.168.1.4:5000/api/hadiths/maqsads");
    setMaqsads(res.data.maqsads || []);
  };

  useEffect(() => {
    fetchMaqsads();
  }, []);

  const [screenState, setScreenState] = useState<ScreenI>({
    name: "maqsads",
    params: {},
  });
  const [history, setHistory] = useState<ScreenI[]>([]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDetails, setNoteDetails] = useState("");

  const handleAddNote = () => {
    // Add note logic here
    setNoteTitle("");
    setNoteDetails("");
    setIsDrawerOpen(false);
  };

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
        return <MaqsadScreen maqsads={maqsads} onNavigate={navigateTo} />;
      case "books":
        return (
          <BooksScreen
            maqsadId={screenState.params.maqsadId || 20}
            onNavigate={navigateTo}
            maqsads={maqsads}
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
            categoryId={screenState.params.categoryId}
            firstHadith={screenState.params.first_hadith_number}
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
      <BottomNav
        setCurrentScreen={setScreenState}
        setShowNoteDialog={setShowNoteDialog}
      />

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20 ${
          showNoteDialog ? "block" : "hidden"
        }`}
      >
        <div className={`bg-white rounded-lg w-full h-full max-w-md p-4`}>
          <div className="flex flex-col justify-center h-full items-center mb-4">
            <div className="w-16 h-16 mb-4">
              <Book className="w-full h-full" />
            </div>
            <p className="text-center text-sm">
              عذراً ليس هناك أي ملاحظة على هذا الفصل
            </p>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="mt-4 bg-amber-500 text-white px-6 py-2 rounded-lg"
            >
              اضافة جديد
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-30 ${
          isDrawerOpen ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`fixed inset-x-0 bottom-0 transform ${
          isDrawerOpen ? "translate-y-0" : "translate-y-full"
        } transition-transform duration-300 ease-in-out  z-30`}
      >
        <div className="bg-white rounded-t-xl p-4 shadow-lg">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="العنوان"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="w-full p-2 border rounded-lg text-right"
            />
            <textarea
              placeholder="التفاصيل"
              value={noteDetails}
              onChange={(e) => setNoteDetails(e.target.value)}
              className="w-full p-2 border rounded-lg h-32 text-right"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddNote}
                className="flex-1 bg-amber-500 text-white py-2 rounded-lg"
              >
                إضافة
              </button>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="flex-1 py-2 border rounded-lg"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
