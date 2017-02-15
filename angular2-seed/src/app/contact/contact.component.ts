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
        this.apiReturnAsString = JSON.stringify(posts.json());
        console.log(posts);
      });
    });
  }

  getPost2() {
    this.httpService.getPostByNumber(2).subscribe(post => {
      this._ngZone.run(() => {
        this.apiReturnAsString = JSON.stringify(post.json());
        console.log(post);
      });
    });
  }

  sendPost() {

    let post = new Post('Title', 'Body Text', '2');

    this.httpService.sendPost(post).subscribe(ret => {

      this._ngZone.run(() => {
        // if it's successful
        if (ret.status == 201) {
          var jsonId = ret.json();
          post.id = jsonId.id;
          this.apiReturnAsString = post.toPostString();
          console.log(post);
        } else {
          // error state.
          console.log(ret.json());
        }
      });





    })
  }


}
