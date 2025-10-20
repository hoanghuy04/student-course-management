package tests.students;

import base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.Test;

public class AddFormTest extends BaseTest {

    @Test
    public void testValidPartition01() throws InterruptedException {
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        Assert.assertTrue(addFormPage.isModalVisible(), "Add Student modal should be visible");
        Assert.assertEquals(addFormPage.getModalTitle(), "Add New Student", "Modal title should be 'Add New Student'");
        
        addFormPage.fillValidStudentForm(
            "Minh",           
            "Hieu",           
            "18",        
            "Male",     
            "minnhiuu@gmail.com", 
            "0703553341",    
            "CS201 - Data Structures and Algorithms",         
            "2024-01-15"    
        );
        
        addFormPage.clickSubmit();
        
        addFormPage.waitForSuccessMessage();
        
        Assert.assertTrue(addFormPage.isAlertNotificationVisible(), "Success alert notification should be visible");
        Assert.assertTrue(addFormPage.isSuccessMessageVisible(), "Success message 'Add student successful' should be visible");
        Assert.assertEquals(addFormPage.getAlertNotificationTitle(), "Success!", "Alert notification title should be 'Success!'");
        Assert.assertEquals(addFormPage.getSuccessMessageText(), "Add student successful", "Success message should contain 'Add student successful'");

        Assert.assertFalse(addFormPage.isModalVisible(), "Modal should be closed after successful submission");
    }

    @Test
    public void testValidPartition02() throws InterruptedException {
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        addFormPage.fillValidStudentForm(
            "Minh",        
            "Huy",     
            "19",             
            "Female",        
            "minnhiuu@gmail.com", 
            "0703553342",    
            "CS201 - Data Structures and Algorithms",   
            "2025-01-15"    
        );
        
        addFormPage.clickSubmit();
        
        addFormPage.waitForSuccessMessage();
        
        Assert.assertTrue(addFormPage.isAlertNotificationVisible(), "Success alert notification should be visible");
        Assert.assertTrue(addFormPage.isSuccessMessageVisible(), "Success message 'Add student successful' should be visible");
        Assert.assertEquals(addFormPage.getAlertNotificationTitle(), "Success!", "Alert notification title should be 'Success!'");
        Assert.assertEquals(addFormPage.getSuccessMessageText(), "Add student successful", "Success message should contain 'Add student successful'");

        Assert.assertFalse(addFormPage.isModalVisible(), "Modal should be closed after successful submission");
    }

    @Test
    public void testValidPartition03() throws InterruptedException {
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        addFormPage.fillValidStudentForm(
            "Minh",           
            "Huy",     
            "20",       
            "Male",           
            "minnhiuu@gmail.com",
            "0703553343",     
            "CS201 - Data Structures and Algorithms",          
            "2026-01-15"     
        );
        
        addFormPage.clickSubmit();
        addFormPage.waitForSuccessMessage();
        
        Assert.assertTrue(addFormPage.isAlertNotificationVisible(), "Success alert notification should be visible");
        Assert.assertTrue(addFormPage.isSuccessMessageVisible(), "Success message 'Add student successful' should be visible");
        Assert.assertEquals(addFormPage.getAlertNotificationTitle(), "Success!", "Alert notification title should be 'Success!'");
        Assert.assertEquals(addFormPage.getSuccessMessageText(), "Add student successful", "Success message should contain 'Add student successful'");
        Assert.assertFalse(addFormPage.isModalVisible(), "Modal should be closed after successful submission");
    }

    @Test
    public void testValidPartition04() throws InterruptedException {
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        addFormPage.fillValidStudentForm(
            "Minh",          
            "Huy",      
            "21",            
            "Female",        
            "minnhiuu@gmail.com", 
            "0703553344",     
            "CS201 - Data Structures and Algorithms",        
            "2027-01-15"      
        );
        
        addFormPage.clickSubmit();
        addFormPage.waitForSuccessMessage();
        
        Assert.assertTrue(addFormPage.isAlertNotificationVisible(), "Success alert notification should be visible");
        Assert.assertTrue(addFormPage.isSuccessMessageVisible(), "Success message 'Add student successful' should be visible");
        Assert.assertEquals(addFormPage.getAlertNotificationTitle(), "Success!", "Alert notification title should be 'Success!'");
        Assert.assertEquals(addFormPage.getSuccessMessageText(), "Add student successful", "Success message should contain 'Add student successful'");
        Assert.assertFalse(addFormPage.isModalVisible(), "Modal should be closed after successful submission");
    }

    @Test
    public void testValidPartition05() throws InterruptedException {
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        addFormPage.fillValidStudentForm(
            "Minh",          
            "Huy",        
            "22",           
            "Female",        
            "minnhiuu@gmail.com", 
            "0703553345",   
            "CS201 - Data Structures and Algorithms",        
            "2028-01-15"     
        );
        
        addFormPage.clickSubmit();
        addFormPage.waitForSuccessMessage();
        
        Assert.assertTrue(addFormPage.isAlertNotificationVisible(), "Success alert notification should be visible");
        Assert.assertTrue(addFormPage.isSuccessMessageVisible(), "Success message 'Add student successful' should be visible");
        Assert.assertEquals(addFormPage.getAlertNotificationTitle(), "Success!", "Alert notification title should be 'Success!'");
        Assert.assertEquals(addFormPage.getSuccessMessageText(), "Add student successful", "Success message should contain 'Add student successful'");
        Assert.assertFalse(addFormPage.isModalVisible(), "Modal should be closed after successful submission");
    }

    @Test
    public void testValidPartition06() throws InterruptedException {
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        addFormPage.fillValidStudentForm(
            "Minh",          
            "Huy",           
            "23",            
            "Female",         
            "minnhiuu@gmail.com",
            "0703553346",    
            "CS201 - Data Structures and Algorithms",         
            "2029-01-15"     
        );
        
        addFormPage.clickSubmit();
        addFormPage.waitForSuccessMessage();
        
        Assert.assertTrue(addFormPage.isAlertNotificationVisible(), "Success alert notification should be visible");
        Assert.assertTrue(addFormPage.isSuccessMessageVisible(), "Success message 'Add student successful' should be visible");
        Assert.assertEquals(addFormPage.getAlertNotificationTitle(), "Success!", "Alert notification title should be 'Success!'");
        Assert.assertEquals(addFormPage.getSuccessMessageText(), "Add student successful", "Success message should contain 'Add student successful'");
        Assert.assertFalse(addFormPage.isModalVisible(), "Modal should be closed after successful submission");
    }

    @Test
    public void testValidPartition07() throws InterruptedException {
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        addFormPage.fillValidStudentForm(
            "Minh",          
            "Huy",           
            "24",            
            "Female",         
            "minnhiuu@gmail.com",
            "0703553347",    
            "CS201 - Data Structures and Algorithms",         
            "2030-01-15"     
        );
        
        addFormPage.clickSubmit();
        addFormPage.waitForSuccessMessage();
        
        Assert.assertTrue(addFormPage.isAlertNotificationVisible(), "Success alert notification should be visible");
        Assert.assertTrue(addFormPage.isSuccessMessageVisible(), "Success message 'Add student successful' should be visible");
        Assert.assertEquals(addFormPage.getAlertNotificationTitle(), "Success!", "Alert notification title should be 'Success!'");
        Assert.assertEquals(addFormPage.getSuccessMessageText(), "Add student successful", "Success message should contain 'Add student successful'");
        Assert.assertFalse(addFormPage.isModalVisible(), "Modal should be closed after successful submission");
    }

    @Test
    public void testValidPartition08() throws InterruptedException {
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        addFormPage.fillValidStudentForm(
            "Minh",          
            "Huy",           
            "25",            
            "Female",         
            "minnhiuu@gmail.com",
            "0703553348",    
            "CS201 - Data Structures and Algorithms",         
            "2031-01-15"     
        );
        
        addFormPage.clickSubmit();
        addFormPage.waitForSuccessMessage();
        
        Assert.assertTrue(addFormPage.isAlertNotificationVisible(), "Success alert notification should be visible");
        Assert.assertTrue(addFormPage.isSuccessMessageVisible(), "Success message 'Add student successful' should be visible");
        Assert.assertEquals(addFormPage.getAlertNotificationTitle(), "Success!", "Alert notification title should be 'Success!'");
        Assert.assertEquals(addFormPage.getSuccessMessageText(), "Add student successful", "Success message should contain 'Add student successful'");
        Assert.assertFalse(addFormPage.isModalVisible(), "Modal should be closed after successful submission");
    }

    @Test
    public void testInvalidPartition01() throws InterruptedException {
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        addFormPage.enterFirstName("@@@@@@@@"); // Invalid: contains special characters
        addFormPage.enterLastName("Huy");
        addFormPage.enterAge("26");
        addFormPage.enterEmail("minnhiuu@gmail.com");
        addFormPage.enterPhone("0703553349");
        addFormPage.selectFemaleGender();
        addFormPage.selectCourseByText("CS201 - Data Structures and Algorithms");
        addFormPage.enterEnrollmentDate("2032-01-15");
        
        addFormPage.clickSubmit();
        
        Assert.assertTrue(addFormPage.isValidationErrorVisible("first-name"), "First name validation error should be visible");
        Assert.assertEquals(addFormPage.getValidationErrorMessage("first-name"), 
            "FirstName must follow the format [A-Za-z]", "Correct validation message should be shown");
    }

    @Test
    public void testInvalidPartition02() throws InterruptedException {
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        // Leave first name empty and fill other required fields
        addFormPage.enterLastName("Huy");
        addFormPage.enterAge("27");
        addFormPage.enterEmail("minnhiuu@gmail.com");
        addFormPage.enterPhone("0703553350");
        addFormPage.selectFemaleGender();
        addFormPage.selectCourseByText("CS201 - Data Structures and Algorithms");
        addFormPage.enterEnrollmentDate("2033-01-15");
        
        addFormPage.clickSubmit();

        Assert.assertTrue(addFormPage.isValidationErrorVisible("first-name"), "First name validation error should be visible");
        Assert.assertEquals(addFormPage.getValidationErrorMessage("first-name"),
            "FirstName cannot be empty", "Correct validation message should be shown");
    }

    @Test
    public void testInvalidPartition03() throws InterruptedException {
        // Test case 3: Invalid LastName format (@@@@@)
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        addFormPage.enterFirstName("Minh");
        addFormPage.enterLastName("@@@@@"); // Invalid: contains special characters
        addFormPage.enterAge("28");
        addFormPage.enterEmail("minnhiuu@gmail.com");
        addFormPage.enterPhone("0703553351");
        addFormPage.selectFemaleGender();
        addFormPage.selectCourseByText("CS201 - Data Structures and Algorithms");
        addFormPage.enterEnrollmentDate("2034-01-15");
        
        addFormPage.clickSubmit();
        
        Assert.assertTrue(addFormPage.isValidationErrorVisible("last-name"), "Last name validation error should be visible");
        Assert.assertEquals(addFormPage.getValidationErrorMessage("last-name"),
            "Lastname must follow the format [A-Za-z]", "Correct validation message should be shown");
    }

    @Test
    public void testInvalidPartition04() throws InterruptedException {
        // Test case 4: Empty LastName
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        addFormPage.enterFirstName("Minh");
        // Leave last name empty
        addFormPage.enterAge("29");
        addFormPage.enterEmail("minnhiuu@gmail.com");
        addFormPage.enterPhone("0703553352");
        addFormPage.selectFemaleGender();
        addFormPage.selectCourseByText("CS201 - Data Structures and Algorithms");
        addFormPage.enterEnrollmentDate("2035-01-15");
        
        addFormPage.clickSubmit();
        
        Assert.assertTrue(addFormPage.isValidationErrorVisible("last-name"), "Last name validation error should be visible");
        Assert.assertEquals(addFormPage.getValidationErrorMessage("last-name"),
            "LastName cannot be empty", "Correct validation message should be shown");
    }

    @Test
    public void testInvalidPartition05() throws InterruptedException {
        // Test case 5: Negative Age (-15)
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        addFormPage.enterFirstName("Minh");
        addFormPage.enterLastName("Huy");
        addFormPage.enterAge("-15"); // Invalid: negative age
        addFormPage.enterEmail("minnhiuu@gmail.com");
        addFormPage.enterPhone("0703553353");
        addFormPage.selectFemaleGender();
        addFormPage.selectCourseByText("CS201 - Data Structures and Algorithms");
        addFormPage.enterEnrollmentDate("2036-01-15");
        
        addFormPage.clickSubmit();
        
        Assert.assertTrue(addFormPage.isValidationErrorVisible("age"), "Age validation error should be visible");
        Assert.assertEquals(addFormPage.getValidationErrorMessage("age"),
            "Age must be a positive integer", "Correct validation message should be shown");
    }

    @Test
    public void testInvalidPartition06() throws InterruptedException {
        // Test case 6: Empty Age
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        addFormPage.enterFirstName("Minh");
        addFormPage.enterLastName("Huy");
        // Leave age empty
        addFormPage.enterEmail("minnhiuu@gmail.com");
        addFormPage.enterPhone("0703553354");
        addFormPage.selectFemaleGender();
        addFormPage.selectCourseByText("CS201 - Data Structures and Algorithms");
        addFormPage.enterEnrollmentDate("2037-01-15");
        
        addFormPage.clickSubmit();
        
        Assert.assertTrue(addFormPage.isValidationErrorVisible("age"), "Age validation error should be visible");
        Assert.assertEquals(addFormPage.getValidationErrorMessage("age"),
            "Age cannot be empty", "Correct validation message should be shown");
    }

    @Test
    public void testInvalidPartition07() throws InterruptedException {
        // Test case 7: Gender not selected
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        addFormPage.enterFirstName("Minh");
        addFormPage.enterLastName("Huy");
        addFormPage.enterAge("32");
        addFormPage.enterEmail("minnhiuu@gmail.com");
        addFormPage.enterPhone("0703553355");
        // Skip gender selection
        addFormPage.selectCourseByText("CS201 - Data Structures and Algorithms");
        addFormPage.enterEnrollmentDate("2038-01-15");
        
        addFormPage.clickSubmit();
        
        Assert.assertTrue(addFormPage.isValidationErrorVisible("gender"), "Gender validation error should be visible");
        Assert.assertEquals(addFormPage.getValidationErrorMessage("gender"),
            "Gender must be selected", "Correct validation message should be shown");
    }

    @Test
    public void testInvalidPartition08() throws InterruptedException {
        // Test case 8: Invalid Email format (hahaa@@@gmail.com)
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        addFormPage.enterFirstName("Minh");
        addFormPage.enterLastName("Huy");
        addFormPage.enterAge("33");
        addFormPage.enterEmail("hahaa@@@gmail.com"); // Invalid: multiple @ symbols
        addFormPage.enterPhone("0703553356");
        addFormPage.selectFemaleGender();
        addFormPage.selectCourseByText("CS201 - Data Structures and Algorithms");
        addFormPage.enterEnrollmentDate("2039-01-15");
        
        addFormPage.clickSubmit();
        
        Assert.assertTrue(addFormPage.isValidationErrorVisible("email"), "Email validation error should be visible");
        Assert.assertEquals(addFormPage.getValidationErrorMessage("email"),
            "Email must be in the correct format", "Correct validation message should be shown");
    }

    @Test
    public void testInvalidPartition09() throws InterruptedException {
        // Test case 9: Empty Email
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        addFormPage.enterFirstName("Minh");
        addFormPage.enterLastName("Huy");
        addFormPage.enterAge("34");
        // Leave email empty
        addFormPage.enterPhone("0703553357");
        addFormPage.selectFemaleGender();
        addFormPage.selectCourseByText("CS201 - Data Structures and Algorithms");
        addFormPage.enterEnrollmentDate("2040-01-15");
        
        addFormPage.clickSubmit();
        
        Assert.assertTrue(addFormPage.isValidationErrorVisible("email"), "Email validation error should be visible");
        Assert.assertEquals(addFormPage.getValidationErrorMessage("email"),
            "Email cannot be empty", "Correct validation message should be shown");
    }

    @Test
    public void testInvalidPartition10() throws InterruptedException {
        // Test case 10: Invalid Phone format (12321@)
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        addFormPage.enterFirstName("Minh");
        addFormPage.enterLastName("Huy");
        addFormPage.enterAge("35");
        addFormPage.enterEmail("minnhiuu@gmail.com");
        addFormPage.enterPhone("12321@"); // Invalid: contains @ symbol
        addFormPage.selectFemaleGender();
        addFormPage.selectCourseByText("CS201 - Data Structures and Algorithms");
        addFormPage.enterEnrollmentDate("2041-01-15");
        
        addFormPage.clickSubmit();
        
        Assert.assertTrue(addFormPage.isValidationErrorVisible("phone"), "Phone validation error should be visible");
        Assert.assertEquals(addFormPage.getValidationErrorMessage("phone"),
            "Phone must be 10-12 digits and in the range [0-9]", "Correct validation message should be shown");
    }

    @Test
    public void testInvalidPartition11() throws InterruptedException {
        // Test case 11: Empty Phone
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        addFormPage.enterFirstName("Minh");
        addFormPage.enterLastName("Huy");
        addFormPage.enterAge("36");
        addFormPage.enterEmail("minnhiuu@gmail.com");
        // Leave phone empty
        addFormPage.selectFemaleGender();
        addFormPage.selectCourseByText("CS201 - Data Structures and Algorithms");
        addFormPage.enterEnrollmentDate("2042-01-15");
        
        addFormPage.clickSubmit();
        
        Assert.assertTrue(addFormPage.isValidationErrorVisible("phone"), "Phone validation error should be visible");
        Assert.assertEquals(addFormPage.getValidationErrorMessage("phone"),
            "Phone cannot be empty", "Correct validation message should be shown");
    }

    @Test
    public void testInvalidPartition12() throws InterruptedException {
        // Test case 12: Course not selected
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        addFormPage.enterFirstName("Minh");
        addFormPage.enterLastName("Huy");
        addFormPage.enterAge("37");
        addFormPage.enterEmail("minnhiuu@gmail.com");
        addFormPage.enterPhone("0703553360");
        addFormPage.selectFemaleGender();
        // Skip course selection
        addFormPage.enterEnrollmentDate("2043-01-15");
        
        addFormPage.clickSubmit();
        
        Assert.assertTrue(addFormPage.isValidationErrorVisible("course"), "Course validation error should be visible");
        Assert.assertEquals(addFormPage.getValidationErrorMessage("course"),
            "Course must be selected", "Correct validation message should be shown");
    }

    @Test
    public void testInvalidPartition13() throws InterruptedException {
        // Test case 13: Enrollment Date not selected
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        addFormPage.enterFirstName("Minh");
        addFormPage.enterLastName("Huy");
        addFormPage.enterAge("38");
        addFormPage.enterEmail("minnhiuu@gmail.com");
        addFormPage.enterPhone("0703553361");
        addFormPage.selectFemaleGender();
        addFormPage.selectCourseByText("CS201 - Data Structures and Algorithms");
        // Skip enrollment date
        
        addFormPage.clickSubmit();
        
        Assert.assertTrue(addFormPage.isValidationErrorVisible("enrollment-date"), "Enrollment date validation error should be visible");
        Assert.assertEquals(addFormPage.getValidationErrorMessage("enrollment-date"),
            "Enrollment Date must be selected", "Correct validation message should be shown");
    }

    @Test
    public void testValidBoundary1() throws InterruptedException {
        // Test case 1: Valid boundary - Phone with 10 digits
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        // Fill form with valid boundary data (10-digit phone)
        addFormPage.fillValidStudentForm(
            "Minh",          
            "Huy",           
            "39",            
            "Female",         
            "minnhiuu@gmail.com",
            "0123456789",
            "CS201 - Data Structures and Algorithms",         
            "2040-01-15"     
        );
        
        addFormPage.clickSubmit();
        
        addFormPage.waitForSuccessMessage();
        
        Assert.assertTrue(addFormPage.isAlertNotificationVisible(), "Success alert notification should be visible");
        Assert.assertTrue(addFormPage.isSuccessMessageVisible(), "Success message 'Add student successful' should be visible");
        Assert.assertEquals(addFormPage.getAlertNotificationTitle(), "Success!", "Alert notification title should be 'Success!'");
        Assert.assertEquals(addFormPage.getSuccessMessageText(), "Add student successful", "Success message should contain 'Add student successful'");

        Assert.assertFalse(addFormPage.isModalVisible(), "Modal should be closed after successful submission");
    }

    @Test
    public void testValidBoundary2() throws InterruptedException {
        // Test case 2: Valid boundary - Phone with 12 digits
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        // Fill form with valid boundary data (12-digit phone)
        addFormPage.fillValidStudentForm(
            "Minh",          
            "Huy",           
            "40",            
            "Female",         
            "minnhiuu@gmail.com",
            "012345678912",
            "CS201 - Data Structures and Algorithms",         
            "2040-01-15"     
        );
        
        addFormPage.clickSubmit();
        
        addFormPage.waitForSuccessMessage();
        
        Assert.assertTrue(addFormPage.isAlertNotificationVisible(), "Success alert notification should be visible");
        Assert.assertTrue(addFormPage.isSuccessMessageVisible(), "Success message 'Add student successful' should be visible");
        Assert.assertEquals(addFormPage.getAlertNotificationTitle(), "Success!", "Alert notification title should be 'Success!'");
        Assert.assertEquals(addFormPage.getSuccessMessageText(), "Add student successful", "Success message should contain 'Add student successful'");

        Assert.assertFalse(addFormPage.isModalVisible(), "Modal should be closed after successful submission");
    }

    @Test
    public void testInvalidBoundary1() throws InterruptedException {
        // Test case 1: Invalid boundary - Phone with 9 digits (too short)
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();
        
        // Fill form with invalid boundary data (9-digit phone)
        addFormPage.enterFirstName("Minh");
        addFormPage.enterLastName("Huy");
        addFormPage.enterAge("41");
        addFormPage.enterEmail("minnhiuu@gmail.com");
        addFormPage.enterPhone("012345678");
        addFormPage.selectFemaleGender();
        addFormPage.selectCourseByText("CS201 - Data Structures and Algorithms");
        addFormPage.enterEnrollmentDate("2041-01-15");
        
        addFormPage.clickSubmit();
        
        Assert.assertTrue(addFormPage.isValidationErrorVisible("phone"), "Phone validation error should be visible");
        Assert.assertEquals(addFormPage.getValidationErrorMessage("phone"),
            "Phone must be 10-12 digits and in the range [0-9]", "Correct validation message should be shown");
    }

    @Test
    public void testInvalidBoundary2() throws InterruptedException {
        // Test case 2: Invalid boundary - Phone with 13 digits (too long)
        var studentPage = homePage.navigateToStudentsManagementPage();
        var addFormPage = studentPage.navigateToAddStudentPage();

        // Fill form with invalid boundary data (13-digit phone)
        addFormPage.enterFirstName("Minh");
        addFormPage.enterLastName("Huy");
        addFormPage.enterAge("42");
        addFormPage.enterEmail("minnhiuu@gmail.com");
        addFormPage.enterPhone("0123456789123");
        addFormPage.selectFemaleGender();
        addFormPage.selectCourseByText("CS201 - Data Structures and Algorithms");
        addFormPage.enterEnrollmentDate("2042-01-15");
        
        addFormPage.clickSubmit();
        
        Assert.assertTrue(addFormPage.isValidationErrorVisible("phone"), "Phone validation error should be visible");
        Assert.assertEquals(addFormPage.getValidationErrorMessage("phone"),
            "Phone must be 10-12 digits and in the range [0-9]", "Correct validation message should be shown");
    }

}
