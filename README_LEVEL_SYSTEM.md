# Knights Trial - Level Progression System

## 📋 Überblick

Dieses System verwaltet die Level-Progression in Knights Trial. Es speichert alle Daten im Browser **localStorage**, sodass der Fortschritt persistent gespeichert bleibt.

## 🎯 Funktionalität

### LevelManager
Hauptklasse für Level-Verwaltung:

```javascript
// Ein Level als abgeschlossen markieren
levelManager.completeLevel(1);

// Prüfen ob ein Level abgeschlossen ist
if (levelManager.isLevelCompleted(1)) {
  console.log('Level 1 ist abgeschlossen!');
}

// Prüfen ob ein Level zugänglich ist (Vorgänger abgeschlossen)
if (levelManager.canAccessLevel(2)) {
  console.log('Level 2 kann gespielt werden!');
}

// Anzahl abgeschlossener Level
const count = levelManager.getCompletedLevelCount(); // z.B. 3

// Alle Level-Status abrufen
const allStatus = levelManager.getAllLevelStatus();

// Alle Level zurücksetzen (Debug)
levelManager.resetAllLevels();
```

### LevelSelector
Verwaltet die UI zur Level-Auswahl:

```javascript
// Initialisierung
const selector = new LevelSelector('.level-selector', 10);

// Button aktualisieren (nach Level-Abschluss)
selector.refreshButtons();
```

### LevelComplete
Trigger für Level-Abschluss:

```javascript
// Level-Completion Setup
setupLevelCompletion(1, '.goal-trigger');
```

## 💾 localStorage Format

Daten werden unter dem Key `knights_trial_levels` gespeichert:

```json
{
  "1": {
    "completed": true,
    "completedAt": "2024-05-29T10:30:45.123Z"
  },
  "2": {
    "completed": true,
    "completedAt": "2024-05-29T10:35:20.456Z"
  }
}
```

## 🚀 Integration

### 1. In HTML einbinden:

```html
<link rel="stylesheet" href="css/level-system.css">
<script src="js/LevelManager.js"></script>
<script src="js/LevelSelector.js"></script>
<script src="js/LevelComplete.js"></script>
```

### 2. Level Selector Container:

```html
<div class="level-selector"></div>
```

### 3. In Level-Seite:

```javascript
// Level-Abschluss-Trigger für Level 1
setupLevelCompletion(1, '.ziel-trigger');
```

## 🎨 CSS Klassen

- `.level-button` - Standard Button
- `.level-button.accessible` - Freigespieltes Level (rot/rosa)
- `.level-button.completed` - Abgeschlossenes Level (grün)
- `.level-button.locked` - Gesperrtes Level (grau)
- `.level-completion-modal` - Abschluss-Dialog
- `.level-stats` - Statistik-Anzeige
- `.progress-bar` - Fortschrittsbalken

## 📊 Events

Custom Events für externe Integration:

```javascript
// Level abgeschlossen
document.addEventListener('levelManager:levelCompleted', (e) => {
  console.log('Level abgeschlossen:', e.detail.levelNumber);
});

// Alle Level zurückgesetzt
document.addEventListener('levelManager:levelsReset', () => {
  console.log('Alle Level zurückgesetzt');
});
```

## 🧪 Demo

Öffne `example.html` um das System zu testen:

- Verschiedene Level ausprobieren
- Debug-Controls verwenden
- localStorage-Daten anschauen

## 📁 Dateistruktur

```
├── js/
│   ├── LevelManager.js      # Haupt-Logik
│   ├── LevelSelector.js     # UI-Komponente
│   └── LevelComplete.js     # Level-Trigger
├── css/
│   └── level-system.css     # Styling
├── example.html             # Demo-Seite
└── README_LEVEL_SYSTEM.md   # Diese Datei
```

## 🔧 Debug-Tipps

```javascript
// localStorage anschauen
console.log(localStorage.getItem('knights_trial_levels'));

// Manuelle Daten setzen
localStorage.setItem('knights_trial_levels', JSON.stringify({
  "1": { "completed": true, "completedAt": new Date().toISOString() }
}));

// localStorage leeren
localStorage.removeItem('knights_trial_levels');

// LevelManager neuladen
levelManager.loadLevelProgress();
```

## ✅ Checkliste für Integration

- [ ] Dateien ins Projekt kopieren
- [ ] Scripts in HTML einbinden
- [ ] `.level-selector` Container hinzufügen
- [ ] CSS-Datei verlinken
- [ ] `setupLevelCompletion()` in Level-Seiten aufrufen
- [ ] localStorage im Browser überprüfen (F12 → Application → localStorage)
- [ ] Test durchführen

## 🐛 Troubleshooting

**Buttons werden nicht angezeigt:**
- Stelle sicher, dass `.level-selector` Container im HTML vorhanden ist
- Überprüfe Browser-Konsole auf Fehler (F12)

**localStorage funktioniert nicht:**
- Überprüfe Browser-Einstellungen (Private Mode deaktivieren)
- Stelle sicher, dass localStorage nicht blockiert ist

**Level bleiben gesperrt:**
- Level 1 muss zuerst abgeschlossen werden
- Nutze `levelManager.completeLevel(n)` in der Konsole zum Testen

---

**Viel Spaß beim Spielen!** ⚔️🎮
