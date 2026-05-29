/**
 * LevelSelector - Zeigt verfügbare und abgeschlossene Level an
 */
class LevelSelector {
  constructor(containerSelector, totalLevels = 10) {
    this.container = document.querySelector(containerSelector);
    this.totalLevels = totalLevels;
    if (this.container) {
      this.generateLevelButtons();
      this.setupEventListeners();
    }
  }

  /**
   * Generiert die Level-Buttons
   */
  generateLevelButtons() {
    this.container.innerHTML = ''; // Leere Container

    for (let i = 1; i <= this.totalLevels; i++) {
      const button = this.createLevelButton(i);
      this.container.appendChild(button);
    }
  }

  /**
   * Erstellt einen einzelnen Level-Button
   * @param {number} levelNumber
   * @returns {HTMLElement}
   */
  createLevelButton(levelNumber) {
    const button = document.createElement('button');
    button.className = 'level-button';
    button.dataset.level = levelNumber;

    const canAccess = levelManager.canAccessLevel(levelNumber);
    const isCompleted = levelManager.isLevelCompleted(levelNumber);

    // Button Setup
    if (canAccess) {
      button.classList.add('accessible');
      button.disabled = false;

      if (isCompleted) {
        button.classList.add('completed');
        button.innerHTML = `<span>Level ${levelNumber}</span><span class="badge">✓</span>`;
      } else {
        button.innerHTML = `<span>Level ${levelNumber}</span>`;
      }

      button.addEventListener('click', () => this.loadLevel(levelNumber));
    } else {
      button.classList.add('locked');
      button.disabled = true;
      button.innerHTML = `<span>Level ${levelNumber}</span><span class="lock">🔒</span>`;
    }

    return button;
  }

  /**
   * Lädt ein Level
   * @param {number} levelNumber
   */
  loadLevel(levelNumber) {
    if (levelManager.canAccessLevel(levelNumber)) {
      console.log(`→ Lade Level ${levelNumber}`);
      // Hier würde der Level geladen werden
      // Beispiel: window.location.href = `level-${levelNumber}.html`;
    } else {
      alert(`Level ${levelNumber} ist noch gesperrt. Bitte schließen Sie Level ${levelNumber - 1} ab.`);
    }
  }

  /**
   * Aktualisiert die Button-Anzeige (z.B. nach Level-Abschluss)
   */
  refreshButtons() {
    this.generateLevelButtons();
  }

  /**
   * Setzt Event-Listener für Level-Manager-Events
   */
  setupEventListeners() {
    document.addEventListener('levelManager:levelCompleted', () => {
      this.refreshButtons();
    });

    document.addEventListener('levelManager:levelsReset', () => {
      this.refreshButtons();
    });
  }
}

// Initialisierung (wenn DOM bereit ist)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const selector = new LevelSelector('.level-selector', 10);
  });
} else {
  const selector = new LevelSelector('.level-selector', 10);
}