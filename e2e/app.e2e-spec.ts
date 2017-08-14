import { Ng2btc2bidPage } from './app.po';

describe('ng2btc2bid App', function() {
  let page: Ng2btc2bidPage;

  beforeEach(() => {
    page = new Ng2btc2bidPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
