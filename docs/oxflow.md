### [1] 테스크 생성 버튼 클릭  
**Action Description:**  
The user clicks the "Create Task" button on the project page or dashboard to initiate creating a new task.  

**(UI Structure):**  
- Popup or new page with the title: **"Create Task"**  
- Default guide text: **"Register a new task."**  
- **Cancel Button:** Cancels the task creation process and returns to the previous screen.  

---

### [2] 테스크 정보 입력: 제목, 인풋 테스크, 아웃풋  
**Action Description:**  
The user enters the task's title and specifies the **input (requirements)** and **output (deliverables)**.  

**(UI Structure):**  
- **Task Title Input Field**  
  A simple text box for summarizing the task.  
- **Input (Requirements) Field:**  
  Multi-line text editor for detailed requirements, goals, and reference materials.  
- **Output (Deliverables) Field:**  
  Field to specify expected outcomes (e.g., file types, reports).  
- **Save or Next Step Button:**  
  Temporarily saves current input and moves to the next step.  
- **Cancel Button:**  
  Returns to the previous screen (pre-task creation).  

---

### [3] 세부 디테일 설정: 우선 순위, 라벨, 지표  
**Action Description:**  
Set the task's priority, select labels (categories, departments, urgency), and configure measurable indicators if needed.  

**(UI Structure):**  
- **Priority Selection Component:**  
  Dropdown or radio button (e.g., urgent/normal/low).  
- **Label Selection/Creation Field:**  
  Add multiple labels (e.g., Marketing, Design, Development), with autocomplete or existing label options.  
- **Metric Setting Field:**  
  Specify or select numeric indicators (e.g., conversion rate, budget, time spent).  
- **Save or Next Step Button.**  
- **Back Button.**  

---

### [4] 담당자 지정  
**Action Description:**  
Assign a team member as the task owner, who will be responsible for execution and reporting.  

**(UI Structure):**  
- **Assignee Search/Selection Box:**  
  Select or search team members from an org chart/team list.  
- **Assignee Profile Display:**  
  Shows selected assignee's name, title, and email.  
- **Confirm Button:** Finalize the assignee selection.  
- **Cancel or Back Button.**  

---

### [5] 일정 설정: 시작/마감 기한  
**Action Description:**  
Set the task's start and end dates.  

**(UI Structure):**  
- **Start Date Calendar/Picker**  
  Widget to choose the starting date.  
- **Due Date Calendar/Picker**  
  Widget to select the deadline.  
- (Optional) **Time Setting:**  
  If necessary, specify the time (hour/minute).  
- **Confirm Button:** Save the schedule.  
- **Back Button.**  

---

### [6] 하위 테스크 생성 (Subtask)  
**Action Description:**  
Divide a large task into smaller subtasks for efficient management.  

**(UI Structure):**  
- **Subtask List Section:**  
  Displays the list of created subtasks.  
- **Add Subtask Button:**  
  Opens a popup or inline form to input subtask title, assignee, and deadline.  
- **Subtask Title Input Field:**  
  Simple summary input.  
- **Subtask Assignee, Priority, and Schedule Settings:**  
  Same options as for main tasks.  
- **Create Button:**  
  Adds the subtask to the list.  
- **Cancel Button.**  

---

### [7] 진행 상황 업데이트  
**Action Description:**  
Authorized users update the task status (e.g., in progress, on hold, completed) and record progress notes.  

**(UI Structure):**  
- **Task Status Dropdown:**  
  Options like "In Progress," "On Hold," or "Completed."  
- **Progress Notes Section:**  
  Text editor for updates, issues, and reference links.  
- **File Attachment Option:**  
  Upload images, documents, or links.  
- **Save/Update Button:**  
  Updates the progress.  
- **Update History:**  
  Displays previous updates as a timeline.  

---

### [8] 테스크 검토 (X - Feedback and Review)  
**Action Description:**  
After the assignee requests task completion, upper-level authorities (LVL2, LVL3) review and decide whether to reject (X) or request modifications.  

**(UI Structure):**  
- **Task Status:** Displayed as "Completion Requested."  
- **Review Section:**  
  Preview/download deliverables (files, links).  
- **Evaluate Button:** Approve or reject the task.  
- **Feedback Input Field:**  
  For modification requests and deadlines.  
- **X (Reject) Button:**  
  Requires mandatory input for rejection reasons.  
- **Snapshot (Version) Save Button:**  
  Saves the current state before rejection.  

---

### [9] 테스크 검토 (O - Completion)  
**Action Description:**  
If all requirements are met, the task is approved (O) and marked as complete. It is archived for records.  

**(UI Structure):**  
- **Task Status:** Displayed as "Completion Requested."  
- **Deliverables Verification:**  
  Review final outputs (files, links).  
- **Approve (O) Button:**  
  Finalizes task completion.  
- **Feedback Input Field (Optional):**  
  Add a brief comment, e.g., "Well done."  
- **Archive Option:**  
  Select where to archive the completed task.  

---

### [10] OX 데이터 기반 대시보드  
**Action Description:**  
Visualize data from completed and ongoing tasks, as well as OX evaluation history, using charts and graphs.  

**(UI Structure):**  
- **Summary Metrics Section:**  
  Total O/X counts, team member completion rates, delay rates, etc.  
- **Chart/Graph Section:**  
  Bar charts (team performance), pie charts (project proportions), and line charts (OX trends over time).  
- **Filter and Sort Options:**  
  By date range, space (e.g., marketing, development), or assignee.  
- **Data Table:**  
  Detailed task list (title, assignee, status, OX results, completion date).  
- **Customizable Blocks:**  
  Add/delete widgets for tailored dashboards.  
- **Role-Based Views:**  
  Visibility depends on LVL3 (admin), LVL2 (team lead), or LVL1 (employee) access.  

---

### [11] “내가 담당한 OX 문서” 확인  
**Action Description:**  
LVL1 (employee) or task assignees review all their tasks and OX evaluations at a glance.  

**(UI Structure):**  
- **Assigned Task List:**  
  Categorized by status (In Progress, On Hold, Completed).  
  Highlights X tasks (requires revision) and O tasks (completed).  
- **Calendar/Gantt Chart View:**  
  Displays task schedules at a glance.  
- **OX History Details:**  
  View when O was granted, when X was given, and feedback content.  
- **Task Detail Navigation:**  
  Click to access task details.  
- **Filter/Search Options:**  
  Filter by date, project, label, or priority.  
- **My Performance Metrics:**  
  Total O count, task time consumption, personal achievement rate.  

