import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScriptLoaderService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  loadScript(scriptId: string, src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if the script is already loaded
      if (document.getElementById(scriptId)) {
        resolve(); // Script is already loaded
        return;
      }

      // Dynamically create and append the script
      const script = this.renderer.createElement('script');
      script.id = scriptId;
      script.src = src;
      script.async = true;
      script.defer = true;

      script.onload = () => resolve();
      script.onerror = (error: any) => reject(error);

      this.renderer.appendChild(document.head, script);
    });
  }
}
