import { describe, it, expect, beforeEach } from "vitest";
import { useAppStore } from "../stores/appStore";
import { useUIStore } from "../stores/useUIStore";

describe("appStore (initial state)", () => {
  beforeEach(() => {
    useAppStore.setState({
      settings: { theme: "dark", panel_position: "right", opacity: 0.85, autostart: false, shortcut_toggle: "Alt+Space", window_width: 400, window_height: 720, archive_days: 30, accent_color: "#4F8CFF", animations_enabled: true, clipboard_enabled: true, clipboard_max_entries: 500, language: "en-US" },
      notes: [],
      tags: [],
      clipboardEntries: [],
    });
  });

  it("should have initial empty notes", () => {
    expect(useAppStore.getState().notes).toEqual([]);
  });

  it("should set notes correctly", () => {
    const mockNotes = [
      { id: "1", content: "Test 1", created_at: 1, updated_at: 1, pinned: false, tags: [], category: null, archived: false, deleted_at: null },
      { id: "2", content: "Test 2", created_at: 2, updated_at: 2, pinned: true, tags: [], category: null, archived: false, deleted_at: null },
    ];
    useAppStore.getState().setNotes(mockNotes);
    expect(useAppStore.getState().notes).toHaveLength(2);
    expect(useAppStore.getState().notes[0].content).toBe("Test 1");
    expect(useAppStore.getState().notes[1].pinned).toBe(true);
  });

  it("should have empty clipboard entries", () => {
    expect(useAppStore.getState().clipboardEntries).toEqual([]);
  });

  it("should have tags", () => {
    expect(useAppStore.getState().tags).toEqual([]);
  });
});

describe("useUIStore", () => {
  beforeEach(() => {
    useUIStore.setState({
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
    });
  });

  it("should start with notes tab active", () => {
    expect(useUIStore.getState().activeTab).toBe("notes");
  });

  it("should switch tabs correctly", () => {
    useUIStore.getState().setActiveTab("clipboard");
    expect(useUIStore.getState().activeTab).toBe("clipboard");
    useUIStore.getState().setActiveTab("settings");
    expect(useUIStore.getState().activeTab).toBe("settings");
    useUIStore.getState().setActiveTab("notes");
    expect(useUIStore.getState().activeTab).toBe("notes");
  });

  it("should open and close global search", () => {
    useUIStore.getState().openGlobalSearch();
    expect(useUIStore.getState().globalSearchOpen).toBe(true);
    useUIStore.getState().closeGlobalSearch();
    expect(useUIStore.getState().globalSearchOpen).toBe(false);
  });

  it("should toggle showArchived and showDeleted", () => {
    useUIStore.getState().setShowArchived(true);
    expect(useUIStore.getState().showArchived).toBe(true);
    useUIStore.getState().setShowDeleted(true);
    expect(useUIStore.getState().showArchived).toBe(false);
    expect(useUIStore.getState().showDeleted).toBe(true);
  });

  it("should switch editor mode", () => {
    useUIStore.getState().setEditorMode("preview");
    expect(useUIStore.getState().editorMode).toBe("preview");
    useUIStore.getState().setEditorMode("edit");
    expect(useUIStore.getState().editorMode).toBe("edit");
  });
});