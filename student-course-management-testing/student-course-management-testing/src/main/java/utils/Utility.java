package utils;

import base.BasePage;
import org.openqa.selenium.WebDriver;

public class Utility {

    public static WebDriver driver;
    public static void setDriver() {
        driver = BasePage.driver;
    }
}
