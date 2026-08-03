import Project, { IProject } from "@/models/project.model";
import { generateSlug } from "@/utils/slug";
import { CreateProjectInput, UpdateProjectInput } from "@/validations/project.validation";


export async function createProject(ownerId: string, data: CreateProjectInput) {
    let slug = generateSlug(data.title);

    let count = 1;

    while (await Project.exists({ slug })) {
        slug = `${generateSlug(data.title)}-${count++}`;
    }

    return await Project.create({
        ownerId,
        slug,
        ...data,
    });
}
export async function getProjects(filter = {}) {
    return await Project.find(filter)
        .populate("ownerId", "name username avatar")
        .sort({ createdAt: -1 })
        .lean();
}

export async function getProjectById(projectId: string) {
    return await Project.findById(projectId);
}


export async function getProjectWithOwner(projectId: string) {
    return await Project.findById(projectId)
        .populate(
            "ownerId",
            "name username avatar bio githubUrl portfolioUrl"
        );
}
export async function getProjectBySlug(slug: string) {
    return await Project.findOne({ slug })
        .populate("ownerId", "name username avatar bio githubUrl portfolioUrl")
        .lean();
}

export async function updateProject(
    projectId: string,
    data: UpdateProjectInput,
) {
    return await Project.findByIdAndUpdate(projectId, data, {
        new: true,
        runValidators: true,
    });
}

export async function deleteProject(projectId: string) {
    return await Project.findByIdAndDelete(projectId);
}
