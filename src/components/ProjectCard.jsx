export default function ProjectCard({ project }) {
  const href = `/projects/${project.slug ?? project.frontmatter.slug}`;

  return (
    <a href={href} key={project.slug ?? project.frontmatter.slug}>
      <div className="project-card">
        <h3>{project.frontmatter.title}</h3>
        <h3>{project.frontmatter.year}</h3>
        {project.frontmatter.image && (
          <img
            src={project.frontmatter.image}
            alt={project.frontmatter.title}
          />
        )}
        <p>{project.frontmatter.description}</p>
      </div>
    </a>
  );
}
