# 📝 ToDo Application (React + TypeScript)

Assignment built using **React**, **TypeScript**, **Tailwind** and **Material UI**.

🔗 **[Deployed App](https://todo-assignment-upcover.vercel.app/)**

---

## 📦 Features Checklist

### ✅ Core Functionalities

- [x] **Task Management:**
  - Create, edit, delete, and mark tasks as complete/incomplete.
  - Tasks move to appropriate sections upon status change.
  - Confirmation modal before deleting a task.
- [x] **State Management:**
  - Implemented with **Context API**.
  - Tasks persist in **localStorage**.
- [x] **Validations & Error Handling:**
  - Prevents duplicate task names.
  - Ensures task descriptions are non-empty.
  - Handles invalid inputs like empty task titles.
  - **Global Error Boundary** to catch unexpected errors.

### ✅ Advanced Features

- [x] **Drag & Drop Sorting:**
  - Reorder tasks within each section using **react-beautiful-dnd**.
- [x] **Responsive UI:**
  - Mobile-first design 

### ❌ Testing

- [ ] **Unit Tests:**
  - Tests using **Jest** and **React Testing Library** are not included due to:
    - Facing configuration issues with **Vite** when integrating React Testing Library and Jest.
    - Due to time constraints, I couldn't push the test cases.

---
### How to run on local? 
- Clone repo
- run ```npm install```
- run ```rpm run dev```
- Go to http://localhost:5173
