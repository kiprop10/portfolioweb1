import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface BlogComment {
  text: string;
  platform: string;
  author: string;
  date: Date;
  showMenu: boolean;
}

interface Blog {
  id: string;
  title: string;
  imageUrl: string;
  summary: string;
  content: string;
  expanded: boolean;
  newCommentText: string;
  referralSource: string;
  askReferral: boolean;
  comments: BlogComment[];
  showPopup?: boolean; // For per-blog toast
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

  platforms = [
    { name: 'Facebook', icon: 'fab fa-facebook', value: 'facebook' },
    { name: 'Instagram', icon: 'fab fa-instagram', value: 'instagram' },
    { name: 'Twitter', icon: 'fab fa-twitter', value: 'twitter' },
    { name: 'Messages', icon: 'fas fa-comment-dots', value: 'messages' }
  ];

  showSharePopup = false;
  shareData = {
    text: '',
    platform: '',
    blog: null as Blog | null,
    commentIndex: -1
  };

  blogs: Blog[] = [
    {
      id: '1',
      title: 'First Blog Post',
      imageUrl: 'https://via.placeholder.com/400x200',
      summary: 'This is a short summary of the first blog post...',
      content: 'This is the full content of the first blog post. It can be as long as I want.',
      expanded: false,
      newCommentText: '',
      referralSource: '',
      askReferral: false,
      comments: [],
      showPopup: false
    }
    // Add more blogs as needed
  ];

  openExpanded(blog: Blog) {
    blog.expanded = true;
  }

  closeExpanded(blog: Blog) {
    blog.expanded = false;
  }

  openCommentMenu(blog: Blog, comment: BlogComment) {
    blog.comments.forEach(c => {
      if (c !== comment) c.showMenu = false;
    });
    comment.showMenu = !comment.showMenu;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.comment-menu')) {
      this.blogs.forEach(blog => blog.comments.forEach(c => c.showMenu = false));
    }
  }

  promptReferral(blog: Blog) {
    if (blog.newCommentText.trim().length === 0) return;
    blog.askReferral = true;
  }

  sendComment(blog: Blog) {
    if (!blog.newCommentText.trim() || !blog.referralSource) return;
    blog.comments.push({
      text: blog.newCommentText.trim(),
      platform: '',
      author: this.currentUser,
      date: new Date(),
      showMenu: false
    });
    blog.newCommentText = '';
    blog.referralSource = '';
    blog.askReferral = false;
    this.saveComments();
    blog.showPopup = true;
    setTimeout(() => blog.showPopup = false, 2000);
  }

  editComment(blog: Blog, index: number) {
    if (blog.comments[index].author !== this.currentUser) return;
    const current = blog.comments[index].text;
    const updated = prompt('Edit your comment:', current);
    if (updated !== null && updated.trim().length > 0) {
      blog.comments[index].text = updated.trim();
      this.saveComments();
    }
    blog.comments[index].showMenu = false;
  }

  deleteComment(blog: Blog, index: number) {
    if (blog.comments[index].author !== this.currentUser) return;
    if (confirm('Delete this comment?')) {
      blog.comments.splice(index, 1);
      this.saveComments();
    }
  }

  openSharePopup(blog: Blog, comment: BlogComment) {
    this.shareData = {
      text: comment.text,
      platform: comment.platform,
      blog,
      commentIndex: blog.comments.indexOf(comment)
    };
    this.showSharePopup = true;
  }

  closeSharePopup() {
    this.showSharePopup = false;
    this.shareData = { text: '', platform: '', blog: null, commentIndex: -1 };
  }

  confirmShare() {
    const text = encodeURIComponent(this.shareData.text);
    let url = '';
    if (this.shareData.platform === 'facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}&quote=${text}`;
    } else if (this.shareData.platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(location.href)}`;
    } else if (this.shareData.platform === 'instagram') {
      url = `https://www.instagram.com/`;
    } else if (this.shareData.platform === 'messages') {
      url = `sms:?body=${text}`;
    }
    if (url) {
      window.open(url, '_blank');
    }
    this.closeSharePopup();
    if (this.shareData.blog) {
      this.shareData.blog.showPopup = true;
      setTimeout(() => {
        if (this.shareData.blog) this.shareData.blog.showPopup = false;
      }, 2000);
    }
  }

  saveComments() {
    // Only persist comments, not UI state like expanded
    const blogsToSave = this.blogs.map(blog => ({
      ...blog,
      expanded: false
    }));
    localStorage.setItem('blogs', JSON.stringify(blogsToSave));
  }

  ngOnInit() {
    const saved = localStorage.getItem('blogs');
    if (saved) {
      const loaded = JSON.parse(saved);
      this.blogs.forEach((blog, i) => {
        if (loaded[i] && loaded[i].comments) {
          blog.comments = loaded[i].comments;
        }
        blog.expanded = false;
      });
    }
  }
}