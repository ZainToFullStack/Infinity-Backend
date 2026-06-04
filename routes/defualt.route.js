// routes/default.route.js - UPDATED WITH FILE UPLOAD & LOGOUT
import { Router } from "express";
import { logincontroller, logoutController } from "../controller/auth.controller.js";
import submitcontactform from "../controller/contact.controller.js";
import {
    createProject,
    deleteProject,
    getsingleProject,
    ShowAllProjects,
    updateProject
} from "../controller/project.controller.js";
import requireAuth from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.js"; // ✅ Multer for file upload

const router = Router();

// 🔓 PUBLIC ROUTES (No authentication needed)
router.route("/login").post(logincontroller);
router.route("/logout").post(requireAuth, logoutController);
router.route("/contactus").post(submitcontactform);
router.route("/allprojects").get(ShowAllProjects);
router.route("/project/:id").get(getsingleProject);

// 🔐 PROTECTED ROUTES (Authentication REQUIRED)
// ✅ createProject now accepts a single file named "image"
router.route("/create").post(requireAuth, upload.single("image"), createProject);
router.route("/update/:id").put(requireAuth, upload.single("image"), updateProject);
router.route("/delete/:id").delete(requireAuth, deleteProject);

export default router;
