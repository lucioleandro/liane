import {LianePage} from './app.po';

describe('Liane App', () => {
    let page: LianePage;

    beforeEach(() => {
        page = new LianePage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('Welcome to Liane!');
    });
});
