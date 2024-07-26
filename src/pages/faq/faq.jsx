import React from "react";
import "./faq.scss";

const FAQ = () => {
  return (
    <div className="faq">
      <div className="mainContainer">
        <div className="main-body container-fluid">
          <div className="row">
            <div className="col-12 p-3">
              <h5>Frequently Asked Questions</h5>
              <div className="faqSection">
                <div className="faqItem">
                  <h6>1. How do I create a new project?</h6>
                  <p>
                    To create a new project, go to the 'Projects' page and click on
                    the 'Create New Project' button. Fill in the required details
                    and click 'Create'.
                  </p>
                </div>
                <div className="faqItem">
                  <h6>2. How can I add tasks to a project?</h6>
                  <p>
                    Navigate to the project you want to add tasks to. Click on the
                    'Add Task' button, enter the task details, and click 'Add'.
                  </p>
                </div>
                <div className="faqItem">
                  <h6>3. How do I assign tasks to team members?</h6>
                  <p>
                    When adding or editing a task, you can assign it to a team
                    member by selecting their name from the 'Assignee' dropdown
                    menu.
                  </p>
                </div>
                <div className="faqItem">
                  <h6>4. How can I track the progress of my tasks?</h6>
                  <p>
                    You can track the progress of your tasks from the 'Timeline'
                    page, where you can see a visual representation of your
                    project’s progress as a Gantt Chart.
                  </p>
                </div>
                <div className="faqItem">
                  <h6>5. How do I set deadlines for tasks?</h6>
                  <p>
                    When adding or editing a task, you can set a deadline by
                    selecting a date from the 'Due Date' field.
                  </p>
                </div>
                <div className="faqItem">
                  <h6>6. What should I do if I encounter a technical issue?</h6>
                  <p>
                    If you encounter a technical issue, please contact our support
                    team via the 'Contact Us' page, and we will assist you as soon
                    as possible.
                  </p>
                </div>
                <div className="faqItem">
                  <h6>7. How do I change my account settings?</h6>
                  <p>
                    You can change your account settings by navigating to the
                    'Profile' page and updating your information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
