import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  //1.0: Verify that i can go to the login component
  it('1.0: Verify that i can go to the login component', () => {
    browser.get('/home/login');
    
    let loginButton = element(by.id('login_button')).getText();
    expect(loginButton).toEqual("Login");

    browser.sleep(3000);
    
  })
  //1.1: Verify that we can go to the landing page after logging in
  it('1.1: Verify that we can go to the landing page after logging in', () => {
    browser.get('/home/login');

    //find page elements
    var userNameField = element(by.id('username'));
    var userPassField = element(by.id('password'));
    var userLoginBtn  = element(by.id('login_button'));

    //fill input fields
    userNameField.sendKeys('olishine');
    userPassField.sendKeys('secret code that only he knows muhaha');

    //Click to sign in 
    userLoginBtn.click().then(function() {
    
      expect(browser.getCurrentUrl()).toMatch('/quiz-portal/quizzes-display');
    
    });
    
    browser.sleep(3000);


  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
