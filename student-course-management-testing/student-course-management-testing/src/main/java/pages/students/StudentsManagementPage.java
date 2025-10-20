package pages.students;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import pages.homepage.HomePage;

import java.time.Duration;

import static utils.JavacriptUtil.scrollToElement;

public class StudentsManagementPage extends HomePage {
    private By buttonAddStudent = By.id("add-student-btn");
    private By buttonEditStudent = By.xpath("//button[@id='edit-student-btn-1']");


    public FormStudentModal navigateToAddStudentPage() throws InterruptedException {
        scrollToElement(buttonAddStudent);
        Thread.sleep(3000);
        click(buttonAddStudent);
        return new FormStudentModal();
    }

    public FormStudentModal navigateToEditStudentPage() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        By buttonEditStudent = By.xpath("//button[@id='edit-student-btn-1']");

        // 🔹 1. Chờ nút Edit xuất hiện và hiển thị
        WebElement editButton = wait.until(ExpectedConditions.visibilityOfElementLocated(buttonEditStudent));

        // 🔹 2. Cuộn xuống nếu cần
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(false);", editButton);

        // 🔹 3. Chờ nút có thể click (tránh bị overlay che)
        wait.until(ExpectedConditions.elementToBeClickable(editButton));

        // 🔹 4. Click an toàn bằng JavaScript (ổn định hơn click() thông thường trong Ant Design)
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", editButton);

        // 🔹 5. Trả về modal AddStudent
        return new FormStudentModal();
    }

}
