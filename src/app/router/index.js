import { ROUTER } from 'Libs/consts';
import { Router } from './Router';

const router = new Router({
  mode: ROUTER.modeHash,
  root: '/',
  timout: 50,
});

router
  .add(/ui-kit\/form-elements$/, () => {
    console.log('ui-kit --- form-elements');
  })
  .add(/about$/, () => {
    console.log('about');
  })
  .add(/agreements\/([a-zA-Z0-9]*)$/, (id) => {
    console.log(`agreements: ${id}`);
  })
  .add(/news\/([a-zA-Z0-9]*)$/, (id) => {
    console.log(`news: ${id}`);
  })
  .add(/services\/([a-zA-Z0-9]*)$/, (id) => {
    console.log(`services: ${id}`);
  })
  .add(/vacancies\/([a-zA-Z0-9]*)$/, (id) => {
    console.log(`vacancies: ${id}`);
  })
  .add('', () => {
    console.log('landing');
  });

export {
  router,
};
