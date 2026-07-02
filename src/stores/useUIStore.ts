import { create } from "zustand";
import type { Tab, EditorMode, SearchResultItem } from "../types";

interface UIState {
  activeTab: Tab;
  searchQuery: string;
  selectedTagId: string | null;
  editorMode: EditorMode;
  showArchived: boolean;
  showDeleted: boolean;
  clipboardSearchQuery: string;
  globalSearchOpen: boolean;
  globalSearchQuery: string;
  globalSearchResults: SearchResultItem[];
  loaded: boolean;

  setActiveTab: (tab: Tab) => void;
  setSearchQuery: (q: string) => void;
  setSelectedTagId: (id: string | null) => void;
  setEditorMode: (mode: EditorMode) => void;
  setShowArchived: (v: boolean) => void;
  setShowDeleted: (v: boolean) => void;
  setClipboardSearchQuery: (q: string) => void;
  openGlobalSearch: () => void;
  closeGlobalSearch: () => void;
  setGlobalSearchQuery: (q: string) => void;
  setGlobalSearchResults: (results: SearchResultItem[]) => void;
  setLoaded: (v: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: "notes",
  searchQuery: "",
  selectedTagId: null,
  editorMode: "edit",
  showArchived: false,
  showDeleted: false,
  clipboardSearchQuery: "",
  globalSearchOpen: false,
  globalSearchQuery: "",
  globalSearchResults: [],
  loaded: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setSelectedTagId: (id) => set({ selectedTagId: id }),
  setEditorMode: (mode) => set({ editorMode: mode }),
  setShowArchived: (v) => set({ showArchived: v, showDeleted: false }),
  setShowDeleted: (v) => set({ showDeleted: v, showArchived: false }),
  setClipboardSearchQuery: (q) => set({ clipboardSearchQuery: q }),
  openGlobalSearch: () => set({ globalSearchOpen: true, globalSearchQuery: "", globalSearchResults: [] }),
  closeGlobalSearch: () => set({ globalSearchOpen: false, globalSearchQuery: "", globalSearchResults: [] }),
  setGlobalSearchQuery: (q) => set({ globalSearchQuery: q }),
  setGlobalSearchResults: (results) => set({ globalSearchResults: results }),
  setLoaded: (v) => set({ loaded: v }),
}));
