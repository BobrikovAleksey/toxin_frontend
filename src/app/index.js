import 'STYLES/fonts';
import 'STYLES/main';

import { App } from 'CLASSES/App';

import { About } from 'VIEWS/About';
import { Agreements } from 'VIEWS/Agreements';
import { LandingPage } from 'VIEWS/LandingPage';
import { News } from 'VIEWS/News';
import { Services } from 'VIEWS/Services';
import { Vacancies } from 'VIEWS/Vacancies';
import { ColorsAndTypes } from 'VIEWS/ui-kit/ColorsAndTypes';

import { router } from 'APP/router';

const app = new App({
  router,
  components: {

  },
  views: {
    About,
    Agreements,
    LandingPage,
    News,
    Services,
    Vacancies,
    ColorsAndTypes,
  },
});

app.init();
