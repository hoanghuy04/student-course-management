package tests.students;

import base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.Test;

public class ModalTest extends BaseTest {

    @Test
    public void testCancelAddStudent() throws InterruptedException {
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();

        addFormPage.enterFirstName("Minh");
        addFormPage.enterLastName("Huy");
        addFormPage.enterAge("25");
        addFormPage.enterEmail("minnhiuu@gmail.com");

        addFormPage.cancelModal();

        // Verify modal is closed
        Assert.assertFalse(addFormPage.isModalVisible(), "Modal should be closed after cancellation");
    }

    @Test
    public void testCloseAddStudentModal() throws InterruptedException {
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();

        addFormPage.enterFirstName("Minh");
        addFormPage.enterLastName("Huy");
        addFormPage.enterAge("25");

        addFormPage.closeModal();

        // Verify modal is closed
        Assert.assertFalse(addFormPage.isModalVisible(), "Modal should be closed after clicking close button");
    }
}
