package tests.students;

import base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.Test;

public class EditFormTest extends BaseTest {

    @Test
    public void testEditWithValidLastName() throws InterruptedException {
        var studentPage = homePage.navigateToStudentsManagementPage();
        var editFormPage = studentPage.navigateToEditStudentPage();
        
        Assert.assertTrue(editFormPage.isModalVisible(), "Edit Student modal should be visible");
        Assert.assertEquals(editFormPage.getModalTitle(), "Edit Student", "Modal title should be 'Edit Student'");
        
        String originalLastName = editFormPage.getLastNameValue();
        
        editFormPage.enterLastName("Huy");
        
        String newLastName = editFormPage.getLastNameValue();
        Assert.assertEquals(newLastName, "Huy", "Last name should be updated to 'Huy'");
        Assert.assertNotEquals(newLastName, originalLastName, "Last name should be different from original");
        
        editFormPage.clickUpdate();
        
        editFormPage.waitForSuccessMessage();
        
        Assert.assertTrue(editFormPage.isAlertNotificationVisible(), "Success alert notification should be visible");
        Assert.assertTrue(editFormPage.isSuccessMessageVisible(), "Success message 'Add student successful' should be visible");
        Assert.assertEquals(editFormPage.getAlertNotificationTitle(), "Success!", "Alert notification title should be 'Success!'");
        Assert.assertEquals(editFormPage.getSuccessMessageText(), "Add student successful", "Success message should contain 'Add student successful'");

        Assert.assertFalse(editFormPage.isModalVisible(), "Modal should be closed after successful submission");
    }
}