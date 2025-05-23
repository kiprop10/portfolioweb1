import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:[RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
name = 'Kiprop Mutai';
description = 'Web Developer 	and designer';
intro = 'Welcome to my portfolio website! I build modern responsive websites and web applications using angular and other technologies. I am passionate about creating user-friendly and visually appealing digital experiences. My goal is to help businesseses and individuals establisha strong online presence and achieve their goals through effective web solutions. Whether you need a simple website or a complex web application, I am here to help you bring yourvision to life. Let us work together to create something amazing!';
skills = [
  {name: 'HTML', icon: 'fa-brands fa-html5'},
  {name: 'css', icon: 'fa-brands fa-css3-alt'},
];
profileimage = 'assets/images/profile1.jpg';
}
