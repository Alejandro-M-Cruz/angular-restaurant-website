import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Story {
  title: string;
  text: string;
  image: string;
  alt_image: string;
}

@Injectable({
  providedIn: 'root'
})

export class StoryService {
  private storyUrl = 'http://localhost:5000/storyContainer';
  constructor(private http: HttpClient) { }

  getStory() {
    return this.http.get<Story>(this.storyUrl);
  }

}
