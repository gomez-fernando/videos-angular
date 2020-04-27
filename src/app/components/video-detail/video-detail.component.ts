import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  providers: [UserService, VideoService],
})
export class VideoDetailComponent implements OnInit {
  // public page_title: string;
  public video: Video;
  public identity;
  public token;
  public status: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private videoService: VideoService,
    private sanitizer: DomSanitizer
  ) {
    // this.page_title = 'Editar vídeo favorito';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit(): void {
    this.getVideo();
  }

  getVideo() {
    this.route.params.subscribe((params) => {
      let id = +params['id'];

      this.videoService.getVideo(this.token, id).subscribe(
        (response) => {
          if (response.status == 'success') {
            // this.status = 'success';
            this.video = response.video;
          } else {
            this.router.navigate(['/inicio']);
          }
        },
        (error) => {
          // this.status = 'error';
          console.log(error as any);
        }
      );
    });
  }

  getVideoIframe(url) {
    let video;
    let results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = results === null ? url : results[1];

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + video
    );
  }
}
