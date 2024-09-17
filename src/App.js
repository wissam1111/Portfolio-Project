import Header from './Components/Header'
import Footer from './Components/Footer'
import ProfileCard from './Components/ProfileCard';
import './App.css'
import BlogPostPreview from './Components/BlogPostPreview';
function App() {
  return (
    <div>
      <Header />
      <ProfileCard />
      <h1 className='text-4xl font-bold text-center text-blue-800 mt-10 -mb-4'>Recent Blog</h1>
      <div className='flex gap-6 ml-2'>
      <BlogPostPreview title="Learn Javascript" content="JavaScript is a versatile language that powers much of the web. Whether you're building front-end interfaces or working with back-end code, mastering the intricacies of JavaScript is key to becoming a better developer. In this article, we'll cover 10 essential JavaScript tips and tricks that every developer should know, helping you write cleaner, more efficient, and more powerful code." />
      <BlogPostPreview title="Responsive Portfolio" content="In today’s digital world, having a personal portfolio website is essential for showcasing your skills and projects. In this guide, we’ll walk you through building a responsive portfolio website using React for functionality and Tailwind CSS for a clean, modern design." />
      <BlogPostPreview title="The Future Of Web Dev" content="The world of web development is constantly evolving, with new tools, frameworks, and best practices emerging every year. As we move into 2024, several trends are set to shape the future of the industry" />
      </div>
      <Footer />
    </div>
  );
}
export default App;
