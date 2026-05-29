/**
 * LevelManager - Verwaltet Levelfortschritt und Zugang
 * Speichert Daten im Browser localStorage
 */
class LevelManager {
  constructor() {
    this.STORAGE_KEY = 'knights_trial_levels';
    this.levelCompletionStatus = {};
    this.loadLevelProgress();
  }

  /**
   * Lädt den Fortschritt aller Level aus localStorage
   */
  loadLevelProgress() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      this.levelCompletionStatus = JSON.parse(saved);
      console.log('✓ Levelfortschritt geladen:', this.levelCompletionStatus);
    } else {
      console.log('Keine gespeicherten Daten gefunden. Starte neues Spiel.');
    }
  }

  /**
   * Speichert den Fortschritt im localStorage
   */
  saveLevelProgress() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.levelCompletionStatus));
    console.log('💾 Levelfortschritt gespeichert');
  }

  /**
   * Markiert ein Level als abgeschlossen
   * @param {number} levelNumber - Die Levelnummer
   */
  completeLevel(levelNumber) {
    this.levelCompletionStatus[levelNumber] = {
      completed: true,
      completedAt: new Date().toISOString()
    };
    this.saveLevelProgress();
    console.log(`✓ Level ${levelNumber} abgeschlossen!`);
    
    // Trigger Event
    this.dispatchEvent('levelCompleted', { levelNumber });
  }

  /**
   * Prüft, ob ein Level abgeschlossen ist
   * @param {number} levelNumber - Die Levelnummer
   * @returns {boolean}
   */
  isLevelCompleted(levelNumber) {
    return this.levelCompletionStatus[levelNumber]?.completed === true;
  }

  /**
   * Prüft, ob ein Level zugänglich ist (Vorgänger abgeschlossen)
   * @param {number} levelNumber - Die Levelnummer
   * @returns {boolean}
   */
  canAccessLevel(levelNumber) {
    // Level 1 ist immer verfügbar
    if (levelNumber === 1) return true;
    
    // Alle anderen Level: Vorheriges Level muss abgeschlossen sein
    return this.isLevelCompleted(levelNumber - 1);
  }

  /**
   * Gibt die Anzahl abgeschlossener Level zurück
   * @returns {number}
   */
  getCompletedLevelCount() {
    return Object.values(this.levelCompletionStatus).filter(l => l.completed).length;
  }

  /**
   * Gibt alle Level-Status zurück
   * @returns {Object}
   */
  getAllLevelStatus() {
    return { ...this.levelCompletionStatus };
  }

  /**
   * Setzt alle Level zurück (Debug)
   */
  resetAllLevels() {
    this.levelCompletionStatus = {};
    this.saveLevelProgress();
    console.log('🔄 Alle Level zurückgesetzt.');
    this.dispatchEvent('levelsReset');
  }

  /**
   * Löscht ein Level aus dem Fortschritt (Debug)
   * @param {number} levelNumber
   */
  resetLevel(levelNumber) {
    delete this.levelCompletionStatus[levelNumber];
    this.saveLevelProgress();
    console.log(`🔄 Level ${levelNumber} zurückgesetzt.`);
  }

  /**
   * Dispatch custom events
   * @param {string} eventName
   * @param {Object} detail
   */
  dispatchEvent(eventName, detail = {}) {
    const event = new CustomEvent(`levelManager:${eventName}`, { detail });
    document.dispatchEvent(event);
  }
}

// Globale Instanz
const levelManager = new LevelManager();