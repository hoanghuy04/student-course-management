package base;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class BasePage {
    public static WebDriver driver;

    public void setDriver(WebDriver driver) {
        BasePage.driver = driver;
    }

    public WebDriver getDriver() {
        return driver;
    }

    protected WebElement findElement(By locator) {
        return driver.findElement(locator);
    }

    protected void setText(By locator, String text) {
        findElement(locator).clear();
        findElement(locator).sendKeys(text);
    }

    protected String getText(By locator) {
        return findElement(locator).getAttribute("value");
    }

    protected  void click(By locator) {
        findElement(locator).click();
    }

    public static void delay(int seconds) {
        try {
            Thread.sleep(seconds * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
