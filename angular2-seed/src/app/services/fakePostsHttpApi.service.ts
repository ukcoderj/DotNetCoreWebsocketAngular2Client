import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Post } from '../models/Post';
//import 'rxjs/add/operator/map';

@Injectable()
export class FakePostsHttpApiService {

    private baseUrl: string = 'https://jsonplaceholder.typicode.com';
    private headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers({
            'Content-Type': 'application/json'
        });
    }


    getPosts(){
        return this.http.get(this.baseUrl + '/posts').map(resp => resp);
    }

    getPostByNumber(postNum: number){
        return this.http.get(this.baseUrl + '/posts/' + postNum).map(resp => resp);
    }

    sendPost(post: Post){
        /* dont return the json direct in case there's an error */
        return this.http.post(this.baseUrl + '/posts', JSON.stringify(post), this.headers).map(resp => resp);
    }

}