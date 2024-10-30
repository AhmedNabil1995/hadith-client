// components/ScreenRenderer.tsx
import React, { Suspense, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScreenI, ScreenName, ScreenParams } from "../types";
import { MaqsadI } from "../interfaces/Maqsad";
import ErrorBoundary from "./ErrorBoudary";
import HadithScreenV2 from "./Hadithv2";

// Lazy load all screen components
const MaqsadScreen = React.lazy(() => import("../screens/Maqsad"));
const BooksScreen = React.lazy(() => import("../screens/Book"));
const FaslsScreen = React.lazy(() => import("../screens/Fasl"));
const CategoriesScreen = React.lazy(() => import("../screens/Categories"));
const SearchScreen = React.lazy(() => import("../screens/Search"));
const SettingsScreen = React.lazy(() => import("../screens/Settings"));
const HadithScreen = React.lazy(() => import("../screens/Hadith"));

interface ScreenRendererProps {
  screenState: ScreenI;
  maqsads: MaqsadI[];
  onNavigate: (screen: ScreenName, params: ScreenParams) => void;
}

const screenVariants = {
  initial: { opacity: 0, x: 300 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -300 },
};

const transition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const validateParams = (name: ScreenName, params: ScreenParams): boolean => {
  switch (name) {
    case "books":
      return typeof params.maqsadId === "number";
    case "fasls":
      return typeof params.bookId === "number";
    case "categories":
      return typeof params.bookId === "number";
    case "hadiths":
      return (
        typeof params.categoryId === "number" &&
        typeof params.first_hadith_number === "number"
      );
    default:
      return true;
  }
};

export const ScreenRenderer: React.FC<ScreenRendererProps> = ({
  screenState,
  maqsads,
  onNavigate,
}) => {
  if (!validateParams(screenState.name as ScreenName, screenState.params)) {
    console.error("Invalid params for screen:", screenState.name);
    return <div>Invalid parameters for this screen</div>;
  }

  const renderScreen = () => {
    switch (screenState.name) {
      case "maqsads":
        return <MaqsadScreen maqsads={maqsads} onNavigate={onNavigate} />;
      case "books":
        return (
          <BooksScreen
            maqsadId={screenState.params.maqsadId!}
            onNavigate={onNavigate}
            maqsads={maqsads}
          />
        );
      case "fasls":
        return (
          <FaslsScreen
            bookId={screenState.params.bookId!}
            onNavigate={onNavigate}
          />
        );
      case "categories":
        return (
          <CategoriesScreen
            faslId={screenState.params.faslId!}
            bookId={screenState.params.bookId!}
            onNavigate={onNavigate}
          />
        );
      case "hadiths":
        return (
          <HadithScreenV2
            faslId={screenState.params.faslId!}
            bookId={screenState.params.bookId!}
            categoryId={screenState.params.categoryId!}
            firstHadith={screenState.params.first_hadith_number!}
            onNavigate={onNavigate}
          />
        );
      case "search":
        return <SearchScreen />;
      case "settings":
        return <SettingsScreen />;
      default:
        return <div>Screen not found</div>;
    }
  };

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <AnimatePresence mode="wait">
          <motion.div
            key={screenState.name}
            initial="initial"
            animate="in"
            exit="out"
            variants={screenVariants}
            transition={transition}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </ErrorBoundary>
  );
};

export const getScreenTitle = (screenName: ScreenName): string => {
  const titles: Record<ScreenName, string> = {
    maqsads: "تطبيق الحديث",
    books: "الكتب",
    fasls: "الفصول",
    categories: "الأبواب",
    hadiths: "الأحاديث",
    search: "البحث",
    settings: "الإعدادات",
  };

  return titles[screenName] || "";
};

export default ScreenRenderer;
