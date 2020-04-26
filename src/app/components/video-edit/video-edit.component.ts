import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';

@Component({
  selector: 'app-video-edit',
  // cambiamos la direccion del template para reutilizar el de guardar video
  templateUrl: '../video-new/video-new.component.html',
  styleUrls: ['./video-edit.component.css'],
  providers: [UserService, VideoService],
})
export class VideoEditComponent implements OnInit {
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
    this.page_title = 'Editar vídeo favorito';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit(): void {
    this.video = new Video(1, this.identity.sub, '', '', '', '', null, null);
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

  onSubmit(form) {
    // console.log(this.video);
    this.videoService.update(this.token, this.video, this.video.id).subscribe(
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
