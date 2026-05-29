/**
 * LevelComplete - Trigger für Level-Abschluss
 */
class LevelComplete {
  constructor(levelNumber, triggerSelector) {
    this.levelNumber = levelNumber;
    this.triggerElement = document.querySelector(triggerSelector);
    
    if (this.triggerElement) {
      this.setupListener();
      console.log(`✓ LevelComplete initialisiert für Level ${levelNumber}`);
    }
  }

  /**
   * Setzt den Listener auf das Trigger-Element
   */
  setupListener() {
    this.triggerElement.addEventListener('click', () => this.completeLevelTrigger());
  }

  /**
   * Wird aufgerufen wenn das Level abgeschlossen ist
   */
  completeLevelTrigger() {
    levelManager.completeLevel(this.levelNumber);
    this.showCompletionScreen();
  }

  /**
   * Zeigt den Abschluss-Screen
   */
  showCompletionScreen() {
    console.log(`🎉 Level ${this.levelNumber} erfolgreich abgeschlossen!`);
    
    // Erstelle Modal oder Toast
    const modal = document.createElement('div');
    modal.className = 'level-completion-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h2>Glückwunsch!</h2>
        <p>Level ${this.levelNumber} abgeschlossen</p>
        <button class="btn-next">Nächstes Level</button>
        <button class="btn-menu">Zum Menü</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.btn-next').addEventListener('click', () => {
      modal.remove();
      if (levelManager.canAccessLevel(this.levelNumber + 1)) {
        // Lade nächstes Level
        console.log(`→ Lade Level ${this.levelNumber + 1}`);
      }
    });
    
    modal.querySelector('.btn-menu').addEventListener('click', () => {
      modal.remove();
      // Zurück zum Menü
    });
  }
}

/**
 * Hilfsfunktion: Erstelle LevelComplete für ein Level
 * Beispiel: setupLevelCompletion(1, '.goal-trigger');
 */
function setupLevelCompletion(levelNumber, triggerSelector) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new LevelComplete(levelNumber, triggerSelector);
    });
  } else {
    new LevelComplete(levelNumber, triggerSelector);
  }
}