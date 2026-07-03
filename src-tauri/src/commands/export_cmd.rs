use std::fs;
use std::path::{Path, Component};

fn is_allowed_base(path: &Path) -> bool {
    if let Ok(canonical) = fs::canonicalize(path) {
        let s = canonical.to_string_lossy();
        return s.contains("Documents") || s.contains("Desktop") || s.contains("Downloads");
    }
    false
}

#[tauri::command]
pub fn write_file(path: String, content: String) -> Result<(), String> {
    let p = Path::new(&path);
    if p.components().any(|c| matches!(c, Component::ParentDir)) {
        return Err("invalid path: traversal detected".into());
    }
    // Block writes outside allowed directories
    if !is_allowed_base(p.parent().unwrap_or(Path::new("."))) {
        return Err("invalid path: base directory not allowed".into());
    }
    fs::write(&path, &content).map_err(|e| format!("failed to write: {}", e))
}

#[tauri::command]
pub fn batch_export(base_dir: String, notes: Vec<crate::db::notes::Note>, format: String) -> Result<(), String> {
    let base = Path::new(&base_dir);
    if !is_allowed_base(base) {
        return Err("export target must be in Documents, Desktop, or Downloads".into());
    }
    for note in notes {
        let ext = if format == "markdown" { "md" } else { "txt" };
        let filename = format!("{}-note.{}.{}", note.created_at, note.id.chars().take(8).collect::<String>(), ext);
        let path = base.join(&filename);
        fs::write(&path, &note.content).map_err(|e| format!("failed to write {}: {}", filename, e))?;
    }
    Ok(())
}