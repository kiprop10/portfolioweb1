import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface BlogComment {
  _id?: string;
  author: string;
  text: string;
  createdAt?: string;
}

interface Blog {
  _id: string;
  title: string;
  imageUrl: string;
  content: string;
  comments: BlogComment[];
  createdAt?: string;
  expanded?: boolean;
  newCommentAuthor?: string;
  newCommentText?: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs: Blog[] = [];
  isLoading = false; // 👈 Flag to show spinner
  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('API URL is:', this.apiUrl);
    this.loadBlogs();
  }

  loadBlogs() {
    this.isLoading = true; // 👈 Start loading
    this.http.get<Blog[]>(`${this.apiUrl}/api/blogs`).subscribe({
      next: blogs => {
        this.blogs = blogs.map(blog => ({
          ...blog,
          imageUrl: blog.imageUrl ? this.apiUrl + blog.imageUrl : ''
        }));
        this.isLoading = false; // 👈 Done loading
      },
      error: err => {
        console.error('Error loading blogs:', err);
        this.isLoading = false; // 👈 Hide spinner on error
      }
    });
  }

  showDetail(blog: Blog) {
    this.blogs.forEach(b => b.expanded = false);
    blog.expanded = true;
  }

  closeDetail(blog: Blog) {
    blog.expanded = false;
  }

  addComment(blog: Blog) {
    if (!blog.newCommentAuthor || !blog.newCommentText) return;

    this.http.post(`${this.apiUrl}/api/blogs/${blog._id}/comments`, {
      author: blog.newCommentAuthor,
      text: blog.newCommentText
    }).subscribe((updatedBlog: any) => {
      blog.comments = updatedBlog.comments;
      blog.newCommentAuthor = '';
      blog.newCommentText = '';
    });
  }

  // ✅ Format blog content to render paragraphs, links, and images
  formatContent(content: string): string {
    if (!content) return '';

    let formatted = content
      // Convert [img:/url|caption] to <figure><img /><figcaption></figcaption></figure>
      .replace(/img:([^\|]+)\|([^]*)/g, (_, url, caption) => `
        <figure>
          <img src="${this.apiUrl + url}" alt="${caption}" />
          <figcaption>${caption}</figcaption>
        </figure>
      `)
      // Convert links to anchor tags
      .replace(/(https?:\/\/[^\s<]+)/g, url => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`)
      // Convert line breaks to <br>
      .replace(/\n/g, '<br>');

    return formatted;
  }
}