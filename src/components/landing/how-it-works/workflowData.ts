export interface WorkflowSlide {
    image: string;
    title: string;
    description: string;
}

export const ownerWorkflow: WorkflowSlide[] = [
    {
        image: "/how-it-works/owner/1.png",
        title: "Submit Your Project",
        description:
            "Publish your project with its live demo, GitHub repository, technologies, and description so the community can start reviewing.",
    },
    {
        image: "/how-it-works/owner/1.png",
        title: "Receive Reviews & Improve",
        description:
            "View ratings, structured feedback, and actionable suggestions that help you continuously improve your project.",
    },
];

export const reviewerWorkflow: WorkflowSlide[] = [
    {
        image: "/how-it-works/reviewer/1.png",
        title: "Explore & Review",
        description:
            "Browse community projects, evaluate them across multiple categories, and provide meaningful structured feedback.",
    },
    {
        image: "/how-it-works/reviewer/1.png",
        title: "Earn Reputation",
        description:
            "Build credibility by writing quality reviews, earning reputation points, and becoming a trusted reviewer.",
    },
];