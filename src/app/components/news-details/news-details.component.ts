import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  blogData = {
    title: 'Sample Blog Title',
    subtitle: 'A brief subtitle about the blog post.',
    imageUrl: 'assets/image.png',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  };

  currentDate: Date = new Date();
  newsId: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the 'id' parameter from the URL
    this.newsId = this.route.snapshot.paramMap.get('id');
    // You can use this 'newsId' to fetch the actual blog data from a service
  }
}
