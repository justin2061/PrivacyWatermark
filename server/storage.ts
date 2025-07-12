// This file is kept for backwards compatibility
// The watermark tool runs entirely client-side and doesn't use any storage
// All image processing happens in the browser for privacy and security

export interface IStorage {
  // No storage operations needed for client-side watermark tool
}

export class MemStorage implements IStorage {
  constructor() {
    // Empty implementation - no server-side storage needed
  }
}

export const storage = new MemStorage();