package pages.homepage;

import base.BasePage;
import org.openqa.selenium.By;
import pages.students.StudentsManagementPage;

import static utils.JavacriptUtil.scrollToElement;

public class HomePage extends BasePage {
    private By studentCard = By.xpath("//div[@class='ant-card-body']//h3[text()='Students Management']/ancestor::div[@class='ant-card-body']\n");

    public StudentsManagementPage navigateToStudentsManagementPage() {
        scrollToElement(studentCard);
        click(studentCard);
        return new StudentsManagementPage();
    }
}
