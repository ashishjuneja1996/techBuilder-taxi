import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class TranslateLangService {
  private readonly translate = inject(TranslateService);
  private readonly settings = inject(SettingsService);

  load() {
    return new Promise<void>(resolve => {
      const selectedTheme=localStorage.getItem('theme-settings');
      if(selectedTheme)
      {
        const selectedTheme2=JSON.parse(selectedTheme);
        if(selectedTheme2?.theme==='dark'){
          this.settings.setLanguage('en-US2');
          this.translate.setDefaultLang('en-US2');
          this.translate.use('en-US2').subscribe({
            next: () =>
              console.log(),
                //  console.log(`Successfully initialized '${defaultLang}' language.'`

            error: () => console.error(),
            // console.error(`Problem with '${defaultLang}' language initialization.'`)
            complete: () => resolve(),
          });
        }else
        {
          const browserLang = navigator.language;
      const defaultLang = browserLang.match(/en-US|zh-CN|zh-TW/) ? browserLang : 'en-US';

      this.settings.setLanguage(defaultLang);
      this.translate.setDefaultLang(defaultLang);
      this.translate.use(defaultLang).subscribe({
        next: () =>
          console.log(),
            //  console.log(`Successfully initialized '${defaultLang}' language.'`

        error: () => console.error(),
        // console.error(`Problem with '${defaultLang}' language initialization.'`)
        complete: () => resolve(),
      });
        }
      }else
      {
        const browserLang = navigator.language;
        const defaultLang = browserLang.match(/en-US|zh-CN|zh-TW/) ? browserLang : 'en-US';

        this.settings.setLanguage(defaultLang);
        this.translate.setDefaultLang(defaultLang);
        this.translate.use(defaultLang).subscribe({
          next: () =>
            console.log(),
              //  console.log(`Successfully initialized '${defaultLang}' language.'`

          error: () => console.error(),
          // console.error(`Problem with '${defaultLang}' language initialization.'`)
          complete: () => resolve(),
        });
      }

    });
  }
}
