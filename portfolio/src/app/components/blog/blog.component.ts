import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface BlogComment {
  text: string;
  author: string;
  date: Date;
  showMenu: boolean;
  avatarUrl?: string;
}

interface Blog {
  id: string;
  title: string;
  imageUrl: string;
  summary: string;
  content: string;
  expanded: boolean;
  newCommentText: string;
  comments: BlogComment[];
  showPopup: boolean;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  currentUser = 'alice@example.com';
  defaultAvatar = 'https://randomuser.me/api/portraits/men/1.jpg';

  blogs: Blog[] = [
    {
      id: '1',
      title: 'First Blog Post',
      imageUrl: 'https://via.placeholder.com/900x400',
      summary: 'This is a short summary of the first blog post...',
      content: 'This is the full content of the first blog post. It can be as long as I want. You can add images and more here.',
      expanded: false,
      newCommentText: '',
      comments: [
        {
          text: 'Great post!',
          author: 'Jane Doe',
          date: new Date(),
          showMenu: false,
          avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg'
        },
        {
          text: 'Thanks for sharing.',
          author: 'John Smith',
          date: new Date(),
          showMenu: false,
          avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg'
        },
        {
          text: 'Very insightful.',
          author: 'Alice Example',
          date: new Date(),
          showMenu: false,
          avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg'
        },
        {
          text: 'I learned a lot!',
          author: 'Bob Example',
          date: new Date(),
          showMenu: false,
          avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg'
        }
      ],
      showPopup: false,
    },
    // Add more blogs as needed
  ];

  ngOnInit() {
    // Optionally load comments from localStorage
    const saved = localStorage.getItem('blogs');
    if (saved) {
      const parsed: Blog[] = JSON.parse(saved);
      this.blogs.forEach((b, i) => {
        if (parsed[i]?.comments) b.comments = parsed[i].comments;
        b.showPopup = false;
        b.expanded = false;
      });
    }
  }

  openExpanded(blog: Blog) {
    blog.expanded = true;
  }

  closeExpanded(blog: Blog) {
    blog.expanded = false;
  }

  openCommentMenu(blog: Blog, comment: BlogComment) {
    blog.comments.forEach(c => c.showMenu = false);
    comment.showMenu = !comment.showMenu;
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: HTMLElement) {
    if (!target.closest('.comment-menu')) {
      this.blogs.forEach(b => b.comments.forEach(c => c.showMenu = false));
    }
  }

  sendComment(blog: Blog) {
    const text = blog.newCommentText.trim();
    if (!text) return;
    blog.comments.push({
      text,
      author: this.currentUser,
      date: new Date(),
      showMenu: false,
      avatarUrl: this.defaultAvatar
    });
    blog.newCommentText = '';
    this.saveComments();
    blog.showPopup = true;
    setTimeout(() => blog.showPopup = false, 3000);
  }

  editComment(blog: Blog, index: number) {
    const comment = blog.comments[index];
    if (comment.author !== this.currentUser) return;
    const updated = prompt('Edit your comment:', comment.text);
    if (updated !== null && updated.trim().length > 0) {
      comment.text = updated.trim();
      this.saveComments();
    }
    comment.showMenu = false;
  }

  deleteComment(blog: Blog, index: number) {
    const comment = blog.comments[index];
    if (comment.author !== this.currentUser) return;
    if (confirm('Delete this comment?')) {
      blog.comments.splice(index, 1);
      this.saveComments();
    }
  }

  private saveComments() {
    const toSave = this.blogs.map(b => ({ ...b, expanded: false, showPopup: false }));
    localStorage.setItem('blogs', JSON.stringify(toSave));
  }

  openSharePopup(blog: Blog, comment: BlogComment) {
    // Placeholder for share functionality
    alert('Share feature coming soon!');
  }
}
