import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [FormsModule, CommonModule,],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  projects = [
    {
      title: 'Personal Portfolio',
      image: 'images/project1.jpg',
      url: 'https://ezramutai.github.io/portfolioweb/',
      description: 'A responsive personal portfolio web built with Angular. Showcases projects with screenshots, descriptions and direct links and includes interactive features like a comment section for each project. Mobile user friendly with clean layout, professional styling to highlight your work.',
      updated: new Date('2024-12-15'),
      showFull: false,
      newComment: '',
      commentSent: false
    },
    {
      title: 'Task Manager',
      image: 'ssets/screenshots/task-manager.png',
      url: '',
      description: 'A productivity tool to manage daily tasks, deadlines, and priorities. Includes drag-and-drop, notifications, and analytics dashboard. Built with Angular and Firebase.',
      updated: new Date('2025-02-10'),
      showFull: false,
      newComment: '',
      commentSent: false
    }
    // Add more projects as needed
  ];

  sendComment(project: any) {
    // For demo: just show a thank you message
    project.commentSent = true;
    project.newComment = '';
    setTimeout(() => project.commentSent = false, 3000);
  }
}