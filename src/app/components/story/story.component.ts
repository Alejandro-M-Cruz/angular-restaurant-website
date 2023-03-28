import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../services/story.service';
import { Story } from '../../model/story';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})

export class StoryComponent implements OnInit {
  story: Story | undefined;

  aboutUsSectionId: string = 'about-us-section';
  aboutUsContentClass: string = 'about-us-content';
  aboutUsDescriptionClass: string = 'about-us-description';
  aboutUsImageClass: string = 'about-us-image';


  constructor(private storyService: StoryService) { }

  clear() {
    this.story = undefined;
  }

  ngOnInit(): void {
    this.storyService.getStory().subscribe(
      data => {
        this.story = data;
      }
    );
  }
}
