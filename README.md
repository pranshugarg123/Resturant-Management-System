# 🍽️ Restaurant Management API (Role-Based Access)

This is a Node.js + Express backend project for managing **restaurant staff and menu items** with **role-based authentication** using JWT.  
It supports users like **managers, chefs, and waiters**, with secure access controls.

---

## 🚀 Features

- 🔐 JWT-based authentication and login
- 🧑‍🍳 Role-based access control (Manager, Chef, Waiter)
- 📋 CRUD operations for:
  - `Person` (staff members)
  - `MenuItem` (restaurant menu)
- 🛡️ Manager-only routes for menu control
- 🔄 Self-access: staff can update or delete their own profiles

---

## 🧰 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Passport (local strategy for login)
- bcrypt (password hashing)
- JSON Web Token (JWT)

---

## 🗂️ API Endpoints

### 👤 Person (User) Routes

| Method | Endpoint              | Description                        | Access                     |
|--------|-----------------------|------------------------------------|----------------------------|
| POST   | `/person/signup`      | Register a new user                | Public                     |
| POST   | `/person/login`       | Login and receive JWT              | Public                     |
| GET    | `/person/profile`     | View logged-in user's profile      | Authenticated              |
| GET    | `/person`             | Get all staff                      | Authenticated              |
| GET    | `/person/:workType`   | Get users by role (`chef`, etc.)   | Public                     |
| PUT    | `/person/:id`         | Update a person (self or manager)  | Manager / Self             |
| DELETE | `/person/:id`         | Delete a person (self or manager)  | Manager / Self             |

---

### 🍽️ Menu Routes

| Method | Endpoint              | Description                      | Access        |
|--------|-----------------------|----------------------------------|---------------|
| POST   | `/menu`               | Add a new menu item              | Manager Only  |
| GET    | `/menu`               | Get all menu items               | Public        |
| GET    | `/menu/:category`     | Get menu by category             | Public        |
| PUT    | `/menu/:id`           | Update a menu item               | Manager Only  |
| DELETE | `/menu/:id`           | Delete a menu item               | Manager Only  |

---

## 📸 Sample Snapshots

Here are a few snapshots from the Restaurant Management API in action:

<p align="center">
  <img src="https://github.com/user-attachments/assets/861a548a-f84c-4199-a021-13a45846ac9a" 
       alt="Signup/Login Screenshot" 
       width="800" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/5be0d52c-41be-441e-a952-556426ca0503" 
       alt="Person API Screenshot" 
       width="800" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/03692382-ab82-4bf2-a450-886e264f94c0" 
       alt="Menu API Screenshot" 
       width="800" />
</p>







