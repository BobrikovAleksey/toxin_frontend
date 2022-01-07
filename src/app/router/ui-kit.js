import { router } from 'APP/router';
import { VIEWS } from 'LIBS/consts';

const colorsAndTypes = {
  path: /ui-kit\/colors-and-types$/,
  callback: () => {
    const { app } = router;

    app?.renderView(VIEWS.colorsAndTypes);
  },
};

export {
  colorsAndTypes,
};
