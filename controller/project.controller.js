import cloudinary from "../config/cloudinary.js";
import Project from "../model/project.model.js"


const createProject = async (req, res) => {
    try {
        const { title, description, status, projectLink, year } = req.body

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Project image is required',
            });
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'Infinitycorps/projectimgs'   //images folder in cloudinary
        })
        const newProject = await Project.create({
            title,
            description,
            images: result.secure_url,
            status,
            projectLink,
            year
        })
        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: newProject
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create project',
            error: error.message
        })
    }
}
//get all projects right now

const ShowAllProjects = async (req, res) => {
    try {
        const AllProjects = await Project.find().sort()
        const projectcount = AllProjects.length;
        res.status(200).json({
            success: true,
            message: `Found ${projectcount} projects`,
            count: projectcount,
            projects: AllProjects
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to get projects',
            error: error.message
        });
    }
}
const getsingleProject = async (req, res) => {
    try {
        const projectId = req.params.id
        const project = await Project.findById(projectId)
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
                error: `No project with ID: ${projectId}`
            });
        }
        res.status(200).json({
            success: true,
            message: 'Project found',
            data: project
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to get project',
            error: error.message
        });
    }
}
// Add these functions to your project.controller.js
// ✅ 4. UPDATE PROJECT
export const updateProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const updateData = req.body;

        // Find and update the project
        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            updateData,
            {
                new: true,           // Return the updated document
                runValidators: true  // Run model validation on update
            }
        );

        // Check if project exists
        if (!updatedProject) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
                error: `No project with ID: ${projectId}`
            });
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            data: updatedProject
        });

    } catch (error) {
        console.error('❌ Update Project Error:', error);

        // Handle invalid ID format
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid project ID format',
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to update project',
            error: error.message
        });
    }
};

// ✅ 5. DELETE PROJECT
export const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;

        // Find and delete the project
        const deletedProject = await Project.findByIdAndDelete(projectId);

        // Check if project exists
        if (!deletedProject) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
                error: `No project with ID: ${projectId}`
            });
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Project deleted successfully',
            data: {
                id: projectId,
                title: deletedProject.title
            }
        });

    } catch (error) {
        console.error('❌ Delete Project Error:', error);

        // Handle invalid ID format
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid project ID format',
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to delete project',
            error: error.message
        });
    }
};

export { getsingleProject, createProject, ShowAllProjects }