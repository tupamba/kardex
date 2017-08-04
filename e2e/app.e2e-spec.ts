import { KardexAppPage } from './app.po';

describe('kardex-app App', () => {
  let page: KardexAppPage;

  beforeEach(() => {
    page = new KardexAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
