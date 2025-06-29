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
                                        public apiUrl = environment.apiUrl;

                                          constructor(private http: HttpClient) {}

                                            ngOnInit(): void {
                                                this.loadBlogs();
                                                  }

                                                      loadBlogs() {
                                                          this.http.get<Blog[]>(`${this.apiUrl}/api/blogs`).subscribe(blogs => {
                                                                this.blogs = blogs.map(blog => ({
                                                                        ...blog,
                                                                                imageUrl: blog.imageUrl ? this.apiUrl + blog.imageUrl : ''
                                                                                      }));
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
                                                                                                                                                                }