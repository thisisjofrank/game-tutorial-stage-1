export class AssetManager {
  constructor() {
    this.assets = new Map();
    this.loadingPromises = new Map();
  }

  async loadImage(key, url) {
    if (this.assets.has(key)) {
      return this.assets.get(key);
    }

    if (this.loadingPromises.has(key)) {
      return this.loadingPromises.get(key);
    }

    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.assets.set(key, img);
        this.loadingPromises.delete(key);
        resolve(img);
      };
      img.onerror = () => {
        this.loadingPromises.delete(key);
        reject(new Error(`Failed to load image: ${url}`));
      };
      img.src = url;
    });

    this.loadingPromises.set(key, promise);
    return promise;
  }

  getAsset(key) {
    return this.assets.get(key) || null;
  }

  hasAsset(key) {
    return this.assets.has(key);
  }

  async loadAssets(assetMap) {
    const promises = Object.entries(assetMap).map(([key, url]) => 
      this.loadImage(key, url)
    );
    await Promise.all(promises);
  }
}
