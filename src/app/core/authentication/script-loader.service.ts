import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { EncryptDecryptService } from './encrypt-decrypt.service';

@Injectable({
  providedIn: 'root',
})
export class ScriptLoaderService {
  private renderer: Renderer2;
  private isLoaded = false; // Tracks whether the API has been loaded
  private loaderPromise: Promise<void>; // Stores the Promise for the API loading
  protected readonly EncryptDecryptService = inject(EncryptDecryptService);

  constructor(rendererFactory: RendererFactory2) {
    const userJson = this.EncryptDecryptService.decryptDataLocalWithStorage('currentUser');
    const key = userJson?.google_key;
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loaderPromise = new Promise<void>((resolve, reject) => {
      if (!this.isLoaded) {
        // Create a <script> tag to load the Google Maps API
        const script = document.createElement('script');
        if (userJson.google_key) {
          script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places,drawing`;
        }
        else {
          script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDdoxv2twzzEsEZRqnRe69sT7orj3lwvuc&libraries=places,drawing`;
        }
        script.async = true;
        script.defer = true;

        // On successful load, resolve the promise
        script.onload = () => {
          this.isLoaded = true;
          resolve();
        };

        // Handle loading errors
        script.onerror = () => reject('Google Maps API failed to load');

        // Append the <script> tag to the document
        document.body.appendChild(script);
      } else {
        // If already loaded, resolve the promise immediately
        resolve();
      }
    });
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
      script.async = false;
      script.defer = false;

      script.onload = () => resolve();
      script.onerror = (error: any) => reject(error);

      this.renderer.appendChild(document.head, script);
    });
  }

  /**
 * Public method to load the Google Maps API
 * @returns Promise<void> - Resolves when the API is loaded
 */
  load(): Promise<void> {
    return this.loaderPromise;
  }
}
