import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  
  let postsService: PostsService,
      httpTestingController: HttpTestingController
  
  beforeEach(() => { TestBed.configureTestingModule({    
    imports: [HttpClientTestingModule], 
    providers: [
      PostsService
    ]
  });
    postsService = TestBed.get(PostsService)
    httpTestingController = TestBed.get(HttpTestingController)
  });

  it('should be created', () => {
    expect(postsService).toBeTruthy();
  });

  it('should have getPosts function', () => {
    expect(postsService.getPosts).toBeTruthy();
  });

  it('should return a posts list with status 200', (done:DoneFn) => {
      postsService.getPosts().subscribe(data => {   
        expect(data.status).toEqual(200);
      });  
      done();    
  });


});
