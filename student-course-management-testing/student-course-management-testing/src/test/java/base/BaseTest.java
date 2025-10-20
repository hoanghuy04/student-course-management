package base;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import pages.homepage.HomePage;
import utils.Utility;

import static base.BasePage.delay;

public class BaseTest {
    private WebDriver driver;
    protected BasePage basePage;
    protected HomePage homePage;
    private String url = "http://localhost:3000/";


    @BeforeClass
    public void setup() {
        System.setProperty("webdriver.chrome.driver", "C:\\driver\\chromedriver-win64\\chromedriver.exe");
        ChromeOptions options = new ChromeOptions();

        options.setBinary("C:\\driver\\chrome-win64\\chrome.exe");

        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
    }

    @BeforeMethod
    public void loadApplication() {
        driver.get(url);
        basePage = new BasePage();
        basePage.setDriver(driver);
        Utility.setDriver();
        homePage = new HomePage();
    }

    @AfterClass
    public void tearDown() {
        delay(2);
//        driver.quit();
    }
}
