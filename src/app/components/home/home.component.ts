import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, VideoService],
})
export class HomeComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public videos;
  public page;
  public next_page;
  public prev_page;
  public number_pages;

  constructor(
    private userService: UserService,
    private videoService: VideoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.page_title = 'Mis vídeos';
  }

  ngOnInit(): void {
    this.loadUser();
    this.actualPageVideos();
    // console.log(this.identity.sub);
  }

  actualPageVideos() {
    this.route.params.subscribe((params) => {
      let page = +params['page'];
      // alert(+params['page']);
      // alert(page);
      if (!page) {
        page = 1;
        this.prev_page = 1;
        this.next_page = 2;
      }
      this.getVideos(page);
    });
  }

  loadUser() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  getVideos(page) {
    this.videoService.getVideos(this.token, page).subscribe(
      (response) => {
        this.videos = response.videos;

        // paginacion
        let number_pages = [];
        for (let i = 1; i <= response.total_pages; i++) {
          number_pages.push(i);
        }
        this.number_pages = number_pages;

        if (page >= 2) {
          this.prev_page = page - 1;
        } else {
          this.prev_page = 1;
        }

        if (page < response.total_pages) {
          this.next_page = page + 1;
        } else {
          this.next_page = response.total_pages;
        }
      },
      (error) => {
        console.log(error as any);
        // alert('error');
      }
    );
  }

  // getThumb(url, size) {
  getThumb(url) {
    let video;
    let results;
    let thumburl;

    if (url === null) {
      return '';
    }

    results = url.match('[\\?&]v=([^&#]*)');
    video = results === null ? url : results[1];

    // if (size != null) {
    //   thumburl = 'http://img.youtube.com/vi/' + video + '/' + size + '.jpg';
    // } else {
    thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
    // }

    return thumburl;
  }

  deleteVideo(id) {
    this.videoService.delete(this.token, id).subscribe(
      (response) => {
        this.actualPageVideos();
      },
      (error) => {
        console.log(error as any);
      }
    );
  }
}
