import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface BlogComment {
  text: string;
  platform: string;
  showFull?: boolean;
}

interface Blog {
  title: string;
  image: string;
  snippet: string;
  content: string;
  showFull: boolean;
  newComment: string;
  selectedPlatform: string;
  comments: BlogComment[];
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  platforms = [
    { name: 'Facebook', icon: 'fab fa-facebook', value: 'facebook' },
    { name: 'Instagram', icon: 'fab fa-instagram', value: 'instagram' },
    { name: 'Twitter', icon: 'fab fa-twitter', value: 'twitter' }
  ];

  blogs: Blog[] = [
    {
      title: 'First Blog Post',
      image: 'https://via.placeholder.com/400x200',
      snippet: 'This is a short summary of the first blog post...',
      content: 'This is the full content of the first blog post. It can be as long as I want.',
      showFull: false,
      newComment: '',
      selectedPlatform: '',
      comments: []
    },
    // Add more blog objects here
  ];

  showPopup = false;

  toggleBlog(blog: Blog) {
    blog.showFull = !blog.showFull;
  }

  selectPlatform(blog: Blog, platform: string) {
    blog.selectedPlatform = platform;
  }

  postComment(blog: Blog) {
    if (blog.newComment && blog.selectedPlatform) {
      blog.comments.push({
        text: blog.newComment,
        platform: blog.selectedPlatform,
        showFull: blog.newComment.length <= 80 // show full if short
      });
      this.saveComments();

      // Prefill and open the platform
      const text = encodeURIComponent(blog.newComment + ' - ' + blog.title);
      let url = '';
      if (blog.selectedPlatform === 'facebook') {
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}&quote=${text}`;
      } else if (blog.selectedPlatform === 'twitter') {
        url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(location.href)}`;
      } else if (blog.selectedPlatform === 'instagram') {
        url = `https://www.instagram.com/`;
      }
      if (url) {
        window.open(url, '_blank');
      }

      blog.newComment = '';
      blog.selectedPlatform = '';
      this.showPopup = true;
      setTimeout(() => this.showPopup = false, 2000);
    }
  }

  deleteComment(blog: Blog, index: number) {
    blog.comments.splice(index, 1);
    this.saveComments();
  }

  saveComments() {
    localStorage.setItem('blogs', JSON.stringify(this.blogs));
  }

  ngOnInit() {
    const saved = localStorage.getItem('blogs');
    if (saved) {
      const loaded = JSON.parse(saved);
      this.blogs.forEach((blog, i) => {
        if (loaded[i] && loaded[i].comments) {
          blog.comments = loaded[i].comments;
        }
      });
    }
  }
}