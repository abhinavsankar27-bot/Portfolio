'use client';
// Procedural Web Audio Engine for UI Sounds
// AUDIO DISABLED PER USER REQUEST

class SoundEngine {
  constructor() {}

  // Muted stubs to prevent breaking existing components that call these methods
  public init() {}
  public playHoverSound() {}
  public playClickSound() {}
  public playSwooshSound() {}
}

// Export a singleton instance
export const soundEngine = new SoundEngine();
