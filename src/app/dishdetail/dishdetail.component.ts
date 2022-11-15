import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from "../shared/dish";
import { DishService } from '../services/dish.service';
import { ArrowViewStateTransition } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  commentForm: FormGroup;
  comment: Comment;
  errMess:string;
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  @ViewChild('form') commentFormDirective;
  formErrors = {
    'author': '',
    'rating': '',
    'comment': ''   
  };

  validationMessages = {
    'author': {
      'required': 'author Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 25 characters long.'
    },
    
    'comment': {
      'required': 'comment is required.',
      'minlength': 'comment must be at least 2 characters long.'   
    }
  };
  


  constructor(private dishServcie: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject("BaseURL") private baseURL) { }

  ngOnInit() {
    this.createForm()
    this.dishServcie.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishServcie.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); },
      errmess => this.errMess = <any>errmess);
    
  }
  goBack(): void {
    this.location.back();
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  onSubmit() {
    this.comment = this.commentForm.value;
    const date = Date.now();
    this.comment.date = new Date().toISOString();

    console.log(this.comment);
    this.dish.comments.push(this.comment)
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: '',
      message: ''
    });
    this.commentFormDirective.resetForm();
    this.comment = null;
  }
  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: [5],
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],      
      message: ''
    });
    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
