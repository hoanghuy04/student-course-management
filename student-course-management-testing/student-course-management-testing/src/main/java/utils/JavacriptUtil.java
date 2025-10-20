package utils;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;

public class JavacriptUtil extends Utility{

    public static void scrollToElement(By locator) {
        WebElement element = driver.findElement(locator);
        // Cuộn sao cho phần tử nằm ở phía dưới viewport, tránh bị header che
        String jsScript = "arguments[0].scrollIntoView(false);";
        ((JavascriptExecutor) driver).executeScript(jsScript, element);
    }


    public static void clickJS(By locator) {
        WebElement element = driver.findElement(locator);
        String jsScript = "arguments[0].click();";
        ((JavascriptExecutor) driver).executeScript(jsScript, element);
    }
}
