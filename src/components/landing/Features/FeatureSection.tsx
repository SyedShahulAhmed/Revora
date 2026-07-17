import { FeatureCard } from "./FeatureCard";
import { FeatureImage } from "./FeatureImage";

;

export default function FeatureSection() {
  return (
    <>
      <div id="features" className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <FeatureCard
          eyebrow="Reviewer Reputation"
          title="Credibility that compounds"
          description="Earn points, unlock badges, and level up. Reviewers with high reputation receive priority access to featured projects and exclusive community recognition."
          image={
            <FeatureImage
              src="/features/reviewer-reputation.png"
              alt="Reviewer Reputation"
            />
          }
        />

        <FeatureCard
          reverse
          eyebrow="AI Reviews"
          title="Feedback that actually helps"
          description="Every review is enhanced by AI. Detect bugs, suggest improvements, and generate actionable insights before human reviewers even begin."
          image={
            <FeatureImage
              src="/features/reviewer-reputation.png"
              alt="Reviewer Reputation"
            />
          }
        />

        <FeatureCard
          eyebrow="Analytics"
          title="Understand every review"
          description="Track review quality, contributor engagement, project health, and response times with beautiful real-time analytics."
          image={
            <FeatureImage
              src="/features/reviewer-reputation.png"
              alt="Reviewer Reputation"
            />
          }
        />

        <FeatureCard
          reverse
          eyebrow="Collaboration"
          title="Built for modern teams"
          description="Assign reviewers, discuss changes, resolve feedback, and keep every project moving forward from one collaborative workspace."
          image={
            <FeatureImage
              src="/features/reviewer-reputation.png"
              alt="Reviewer Reputation"
            />
          }
        />
      </div>
    </>
  );
}
