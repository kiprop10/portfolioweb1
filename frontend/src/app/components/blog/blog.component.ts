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
  editing?: boolean;
  editText?: string;
  showMenu?: boolean;
}

interface Blog {
  _id: string;
  title: string;
  imageUrl: string;
  content: string;
  comments: BlogComment[];
  createdAt?: string;
  expanded?: boolean;
  newCommentText?: string;
  showPopup?: boolean;
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
  currentUser = 'alice@example.com';
  defaultAvatar = 'https://randomuser.me/api/portraits/men/1.jpg';
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchBlogs();
  }

  fetchBlogs() {
    this.loading = true;
    this.http.get<Blog[]>(`${environment.apiUrl}/api/blogs`).subscribe({
      next: blogs => {
        this.blogs = blogs.map(b => ({
          ...b,
          expanded: false,
          newCommentText: '',
          showPopup: false,
          comments: b.comments.map(c => ({
            ...c,
            editing: false,
            editText: '',
            showMenu: false
          }))
        }));
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load blogs';
        this.loading = false;
      }
    });
  }

  sendComment(blog: Blog) {
    const text = blog.newCommentText?.trim();
    if (!text) return;
    this.http.post<Blog>(`${environment.apiUrl}/api/blogs/${blog._id}/comments`, {
      author: this.currentUser,
      text
    }).subscribe({
      next: updatedBlog => {
        blog.comments = updatedBlog.comments.map(c => ({
          ...c,
          editing: false,
          editText: '',
          showMenu: false
        }));
        blog.newCommentText = '';
        blog.showPopup = true;
        setTimeout(() => blog.showPopup = false, 3000);
      },
      error: () => {
        this.error = 'Failed to add comment';
        setTimeout(() => this.error = '', 3000);
      }
    });
  }

  deleteComment(blog: Blog, comment: BlogComment) {
    if (!blog || !comment || !comment._id) return;
    if (!confirm('Delete this comment?')) return;
    this.http.delete<Blog>(`${environment.apiUrl}/api/blogs/${blog._id}/comments/${comment._id}`).subscribe({
      next: updatedBlog => {
        blog.comments = updatedBlog.comments.map(c => ({
          ...c,
          editing: false,
          editText: '',
          showMenu: false
        }));
      },
      error: () => {
        this.error = 'Failed to delete comment';
        setTimeout(() => this.error = '', 3000);
      }
    });
  }

  editComment(comment: BlogComment) {
    comment.editing = true;
    comment.editText = comment.text;
    comment.showMenu = false;
  }

  cancelEdit(comment: BlogComment) {
    comment.editing = false;
    comment.editText = '';
  }

  saveEdit(blog: Blog, comment: BlogComment) {
    const newText = comment.editText?.trim();
    if (!newText || !comment._id) return;
    this.http.put<Blog>(
      `${environment.apiUrl}/api/blogs/${blog._id}/comments/${comment._id}`,
      { text: newText }
    ).subscribe({
      next: updatedBlog => {
        blog.comments = updatedBlog.comments.map(c => ({
          ...c,
          editing: false,
          editText: '',
          showMenu: false
        }));
      },
      error: () => {
        this.error = 'Failed to update comment';
        setTimeout(() => this.error = '', 3000);
      }
    });
  }

  openCommentMenu(blog: Blog, comment: BlogComment) {
    blog.comments.forEach(c => c.showMenu = false);
    comment.showMenu = true;
  }

  openSharePopup(blog: Blog, comment: BlogComment) {
    // Implement your share logic here
    alert('Share functionality not implemented.');
  }
}