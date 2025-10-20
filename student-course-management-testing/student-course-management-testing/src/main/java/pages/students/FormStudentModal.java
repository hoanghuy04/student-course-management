package pages.students;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;

import static utils.JavacriptUtil.scrollToElement;

public class FormStudentModal extends StudentsManagementPage {
    private By modalOverlay = By.id("student-modal-overlay");
    private By modalTitle = By.id("modal-title");
    private By modalCloseBtn = By.id("modal-close-btn");
    private By modalCancelBtn = By.id("modal-cancel-btn");
    private By modalOkBtn = By.id("modal-ok-btn");

    private By firstNameInput = By.id("modal-first-name");
    private By lastNameInput = By.id("modal-last-name");
    private By ageInput = By.id("modal-age");
    private By emailInput = By.id("modal-email");
    private By phoneInput = By.id("modal-phone");
    private By courseSelect = By.id("modal-course");
    private By enrollmentDateInput = By.id("modal-enrollment-date");
    private By statusCheckbox = By.id("modal-status");

    private By maleGender = By.id("modal-gender-male");
    private By femaleGender = By.id("modal-gender-female");
    private By otherGender = By.id("modal-gender-other");

    public boolean isModalVisible() {
        try {
            return findElement(modalOverlay).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getModalTitle() {
        return findElement(modalTitle).getText();
    }

    public void closeModal() {
        scrollToElement(modalCloseBtn);
        click(modalCloseBtn);
    }

    public void cancelModal() {
        scrollToElement(modalCancelBtn);
        click(modalCancelBtn);
    }

    public void enterFirstName(String firstName) {
        scrollToElement(firstNameInput);
        clearAndType(firstNameInput, firstName);
    }

    public void enterLastName(String lastName) {
        scrollToElement(lastNameInput);
        clearAndType(lastNameInput, lastName);
    }

    public void enterAge(String age) {
        scrollToElement(ageInput);
        clearAndType(ageInput, age);
    }

    public void enterEmail(String email) {
        scrollToElement(emailInput);
        clearAndType(emailInput, email);
    }

    public void enterPhone(String phone) {
        scrollToElement(phoneInput);
        clearAndType(phoneInput, phone);
    }

    public void enterEnrollmentDate(String date) {
        scrollToElement(enrollmentDateInput);
        clearAndType(enrollmentDateInput, date);
    }

    public void selectMaleGender() {
        scrollToElement(maleGender);
        click(maleGender);
    }

    public void selectFemaleGender() {
        scrollToElement(femaleGender);
        click(femaleGender);
    }

    public void selectOtherGender() {
        scrollToElement(otherGender);
        click(otherGender);
    }

    public boolean isMaleGenderSelected() {
        return findElement(maleGender).isSelected();
    }

    public boolean isFemaleGenderSelected() {
        return findElement(femaleGender).isSelected();
    }

    public boolean isOtherGenderSelected() {
        return findElement(otherGender).isSelected();
    }

    // Course selection method
    public void selectCourseByText(String courseText) {
        scrollToElement(courseSelect);
        WebElement selectElement = findElement(courseSelect);
        Select select = new Select(selectElement);
        select.selectByVisibleText(courseText);
    }

    public void selectCourseByValue(String courseValue) {
        scrollToElement(courseSelect);
        WebElement selectElement = findElement(courseSelect);
        Select select = new Select(selectElement);
        select.selectByValue(courseValue);
    }

    public void selectCourseByIndex(int index) {
        scrollToElement(courseSelect);
        WebElement selectElement = findElement(courseSelect);
        Select select = new Select(selectElement);
        select.selectByIndex(index);
    }

    // Status checkbox methods
    public void setStatusActive(boolean isActive) {
        scrollToElement(statusCheckbox);
        WebElement checkbox = findElement(statusCheckbox);
        if (checkbox.isSelected() != isActive) {
            click(statusCheckbox);
        }
    }

    public boolean isStatusActive() {
        return findElement(statusCheckbox).isSelected();
    }

    // Form submission methods
    public void clickSubmit() {
        scrollToElement(modalOkBtn);
        click(modalOkBtn);
    }

    public void clickUpdate() {
        clickSubmit();
    }

    public void clickEdit() {
        clickSubmit(); 
    }

    public boolean isValidationErrorVisible(String fieldName) {
        try {
            By errorLocator = buildErrorLocator(fieldName);
            return findElement(errorLocator).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getValidationErrorMessage(String fieldName) {
        try {
            By errorLocator = buildErrorLocator(fieldName);
            return findElement(errorLocator).getText();
        } catch (Exception e) {
            return "";
        }
    }

    private By buildErrorLocator(String fieldName) {
        switch (fieldName) {
            case "course":
                // Nếu có <select id="modal-course"> (trường hợp native)
                return By.xpath("//select[@id='modal-course']/following-sibling::p[contains(@class,'text-red-500')]");
            case "gender":
                // Radio group: p lỗi là sibling của group <div class='flex gap-4'>
                // Bám theo nhãn 'Gender' rồi tìm group và p ngay sau nó
                return By.xpath(
                        "//label[normalize-space()='Gender']/following::*[contains(@class,'gap-4')][1]" +
                                "/following-sibling::p[contains(@class,'text-red-500')][1]"
                );
            default:
                // Các input thường có id="modal-<fieldName>"
                return By.xpath("//input[@id='modal-" + fieldName + "']/following-sibling::p[contains(@class,'text-red-500')]");
        }
    }

    // Helper method to clear and type
    private void clearAndType(By locator, String text) {
        WebElement element = findElement(locator);
        element.clear();
        element.sendKeys(text);
    }

    public void fillValidStudentForm(String firstName, String lastName, String age,
                                     String gender, String email, String phone,
                                     String course, String enrollmentDate) {
        enterFirstName(firstName);
        enterLastName(lastName);
        enterAge(age);
        enterEmail(email);
        enterPhone(phone);
        enterEnrollmentDate(enrollmentDate);

        switch (gender.toLowerCase()) {
            case "male":
                selectMaleGender();
                break;
            case "female":
                selectFemaleGender();
                break;
            case "other":
                selectOtherGender();
                break;
        }

        selectCourseByText(course);

        setStatusActive(true);
    }

    public void waitForSuccessMessage() {
        try {
            Thread.sleep(2000); // Wait for message to appear
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public boolean isSuccessMessageVisible() {
        try {
            // Look for the new alert notification with success message
            By successMessageLocator = By.xpath("//div[contains(@class, 'alert-notification')]//div[contains(@class, 'alert-message') and contains(text(), 'Add student successful')]");
            return findElement(successMessageLocator).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getSuccessMessageText() {
        try {
            // Look for the alert message text in the new notification structure
            By successMessageLocator = By.xpath("//div[contains(@class, 'alert-notification')]//div[contains(@class, 'alert-message') and contains(text(), 'Add student successful')]");
            return findElement(successMessageLocator).getText();
        } catch (Exception e) {
            return "";
        }
    }

    public boolean isAlertNotificationVisible() {
        try {
            // Check if any alert notification is visible
            By alertNotificationLocator = By.className("alert-notification");
            return findElement(alertNotificationLocator).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getAlertNotificationTitle() {
        try {
            // Get the alert title (Success! or Error!)
            By alertTitleLocator = By.xpath("//div[contains(@class, 'alert-notification')]//div[contains(@class, 'alert-title')]");
            return findElement(alertTitleLocator).getText();
        } catch (Exception e) {
            return "";
        }
    }

    // Getter methods to retrieve field values for verification
    public String getFirstNameValue() {
        try {
            return findElement(firstNameInput).getAttribute("value");
        } catch (Exception e) {
            return "";
        }
    }

    public String getLastNameValue() {
        try {
            return findElement(lastNameInput).getAttribute("value");
        } catch (Exception e) {
            return "";
        }
    }

    public String getAgeValue() {
        try {
            return findElement(ageInput).getAttribute("value");
        } catch (Exception e) {
            return "";
        }
    }

    public String getEmailValue() {
        try {
            return findElement(emailInput).getAttribute("value");
        } catch (Exception e) {
            return "";
        }
    }

    public String getPhoneValue() {
        try {
            return findElement(phoneInput).getAttribute("value");
        } catch (Exception e) {
            return "";
        }
    }

    public String getCourseValue() {
        try {
            WebElement selectElement = findElement(courseSelect);
            Select select = new Select(selectElement);
            return select.getFirstSelectedOption().getText();
        } catch (Exception e) {
            return "";
        }
    }

    public String getEnrollmentDateValue() {
        try {
            return findElement(enrollmentDateInput).getAttribute("value");
        } catch (Exception e) {
            return "";
        }
    }

    public boolean isAnyGenderSelected() {
        try {
            return findElement(maleGender).isSelected() || 
                   findElement(femaleGender).isSelected() || 
                   findElement(otherGender).isSelected();
        } catch (Exception e) {
            return false;
        }
    }
}
