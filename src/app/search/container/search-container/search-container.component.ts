import { Component} from '@angular/core';
import { Video } from 'src/app/shared/models/search.interface';
import { SearchService } from 'src/app/shared/services/search.service';



@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.css']
})
export class SearchContainerComponent {

  inputTouched = false;
  loading = false;
  videos: Video[] = [];

  constructor(private searchService: SearchService) { }
  
  handleSearch (inputValue: string) {
    this.loading = true;
    this.searchService.getVideos(inputValue)
      .subscribe((items: any[]) => {
        this.videos = items.map(item => {
          return {
            videoId: item.snippet.videoId,
            videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            title: item.snippet.title,
            channelId: item.snippet.channelId,
            channelUrl: `https://www.youtube.com/channel/${item.snippet.channelId}`,
            channelTitle: item.snippet.channelTitle,
            description: item.snippet.description,
            publishedAt: new Date(item.snippet.publishedAt),
            thumbnail: item.snippet.thumbnails.high.url
          }
        });
        this.inputTouched = true;
        this.loading = false;
      })
  }

}
