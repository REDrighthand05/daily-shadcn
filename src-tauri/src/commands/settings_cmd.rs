use tauri::State;
use crate::settings::{AppSettings, SettingsStore};

#[tauri::command]
pub fn get_settings(store: State<SettingsStore>) -> Result<AppSettings, String> {
    let settings = store.settings.lock().map_err(|e| e.to_string())?;
    Ok(settings.clone())
}

#[tauri::command]
pub fn save_settings(store: State<SettingsStore>, settings: AppSettings) -> Result<(), String> {
    // Validate inputs
    let opacity = settings.opacity.clamp(0.3, 1.0);
    let width = settings.window_width.clamp(300, 1200);
    let height = settings.window_height.clamp(400, 1600);
    let clipboard_max = settings.clipboard_max_entries.clamp(10, 500);
    let valid_positions = ["left", "right", "floating"];
    let position = if valid_positions.contains(&settings.panel_position.as_str()) {
        settings.panel_position.clone()
    } else {
        "floating".to_string()
    };
    let valid_themes = ["dark", "light"];
    let theme = if valid_themes.contains(&settings.theme.as_str()) {
        settings.theme.clone()
    } else {
        "dark".to_string()
    };
    {
        let mut current = store.settings.lock().map_err(|e| e.to_string())?;
        current.opacity = opacity;
        current.window_width = width;
        current.window_height = height;
        current.clipboard_max_entries = clipboard_max;
        current.panel_position = position;
        current.theme = theme;
    }
    store.save()
}