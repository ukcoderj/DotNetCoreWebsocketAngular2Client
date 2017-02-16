import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CustomValidators from '../forms/CustomValidators';
import { FakePostsHttpApiService } from '../services/fakePostsHttpApi.service';
import { Post } from '../models/Post';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact-component.css'],
  providers: [FakePostsHttpApiService]
})
export class ContactComponent implements OnInit {

  private apiReturnAsString: string;
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpService: FakePostsHttpApiService, private _ngZone: NgZone) {

  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.validateEmail]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  submitForm(): void {
    console.log(this.contactForm);
  }



  getPosts() {
    this.httpService.getPosts().subscribe(posts => {
      this._ngZone.run(() => {
        var allPosts: Post[] = posts.json();
        this.apiReturnAsString = JSON.stringify(allPosts);
        console.log(posts);
      });
    });
  }

  getPost2() {
    this.httpService.getPostByNumber(2).subscribe(post => {
      this._ngZone.run(() => {
        let tmpPost: Post = post.json();
        this.apiReturnAsString = JSON.stringify(tmpPost);
        console.log(post);
      });
    });
  }

  sendPost() {

    let newPost = new Post('Title', 'Body Text', '2');

    this.httpService.sendPost(newPost).subscribe(ret => {

      this._ngZone.run(() => {
        // if it's successful
        if (ret.status == 201) {
          var jsonId = ret.json();
          newPost.id = jsonId.id;
          this.apiReturnAsString = newPost.toPostString();
          console.log(newPost);
        } else {
          // error state.
          console.log(ret.json());
        }
      });
    })
  }


}
