import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css'],
  providers: [UserService, VideoService],
})
export class VideoNewComponent implements OnInit {
  public page_title: string;
  public video: Video;
  public identity;
  public token;
  public status: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private videoService: VideoService
  ) {
    this.page_title = 'Guardar un nuevo vídeo favorito';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit(): void {
    this.video = new Video(1, this.identity.sub, '', '', '', '', null, null);
  }

  onSubmit(form) {
    // console.log(this.video);
    this.videoService.create(this.token, this.video).subscribe(
      (response) => {
        console.log(response);
        if (response.status == 'success') {
          this.status = 'success';

          this.router.navigate(['/inicio']);
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        this.status = 'error';
        console.log(error as any);
      }
    );
  }
}
