import BlogPostPreview from "../BlogPost/BlogPostPreview.js";
import Weather from "../Weather/Weather.js";

export default function Home() {
  return (
    <div className="px-4">
      <Weather />
      <h1 className="text-center text-4xl font-semibold mt-10">
        Recent Blog
      </h1>

      <div className="grid gap-6 m-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <BlogPostPreview
          title="How to Get Started with React: A Beginner’s Guide"
          content="Cover the basics of setting up a React project, creating components, and managing state. Include code examples and best practices for newcomers."
          showLikes={false}
        />

        <BlogPostPreview
          title="Exploring Tailwind CSS: A Comprehensive Tutorial"
          content="Provide an in-depth look at Tailwind CSS, including how to install it, its utility-first approach, and examples of building responsive designs."
          showLikes={false} 
        />

        <BlogPostPreview
          title="The Importance of Responsive Design in Modern Web Development"
          content="Discuss why responsive design is crucial, techniques for creating responsive layouts, and tools for testing responsiveness."
          showLikes={false} 
        />
      </div>
    </div>
  );
}
