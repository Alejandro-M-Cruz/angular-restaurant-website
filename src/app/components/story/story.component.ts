import { Component, OnInit, Input } from '@angular/core';
import { StoryService } from '../../services/story.service';
import { Story } from '../../model/story.model';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})

export class StoryComponent implements OnInit {
  @Input() aboutUsSectionId: string | undefined;
  @Input() aboutUsContentClass: string | undefined;
  @Input() aboutUsDescriptionClass: string | undefined;
  @Input() aboutUsImageClass: string | undefined;
  story: Story | undefined;


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
