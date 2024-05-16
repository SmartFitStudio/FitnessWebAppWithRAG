import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExerciseRequest } from '../../../../services/models';
import { ExerciseService } from '../../../../services/services';
import { sub_appRoutingModule } from '../../sub_app-routing.module';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExerciseCategory, getExerciseCategoryValues} from '../../../../services/myModels/exerciseCategory';
import { NgIf, NgFor } from '@angular/common';
import { FeedbackInfoPointComponent } from '../../../../component/feedback-info-point/feedback-info-point.component';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';
@Component({
    selector: 'app-manage-exercise',
    templateUrl: './manage-exercise.component.html',
    styleUrls: ['./manage-exercise.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule, RouterLink,FeedbackInfoPointComponent]
})

export class ManageExerciseComponent implements OnInit {

  private _errorMsg: Array<string> = [];
  private _exerciseRequest: ExerciseRequest={
    name: '',
    description: '',
    category: Array<ExerciseCategory>(),
    shareable: false
  };
  private _selectedCategories: Array<string> = [];
  private _selectedCover: any;
  private _selectedPicture: string | undefined;


  exerciseForm = new FormGroup({
    exerciseName: new FormControl<string | null>(null, Validators.required),
    exerciseDescription: new FormControl<string | null>(null, Validators.required),
    is_shareable: new FormControl<boolean>(false),
    exerciseCategory: new FormControl<Array<ExerciseCategory> | undefined>(undefined),
  });

  //FOR THE SELECT VALUES
  private exercises_categories: Array<string> = getExerciseCategoryValues();

  constructor(
    private exerciseService: ExerciseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private handleError: ErrorHandlerService) {
  }

  get errorMsg(): Array<string> {
    return this._errorMsg;
  }
  get exerciseRequest(): ExerciseRequest | undefined {
    return this._exerciseRequest;
  }
  get selectedCategories(): Array<string> {
    return this._selectedCategories;
  }
  get selectedCover(): any {
    return this._selectedCover;
  }
  get selectedPicture(): string | undefined {
    return this._selectedPicture;
  }

  ngOnInit(): void {
    const exercise_id = this.activatedRoute.snapshot.params['exerciseId'];
    if (exercise_id) {
      this.exerciseService.findExerciseById({
        'exercise-id': exercise_id
      }).subscribe({
        next: (exercise) => {
          this._exerciseRequest = {
            id: exercise.id,
            name: exercise.name,
            description: exercise.description,
            category: exercise.category,
            shareable: exercise.shareable
          };
          if (exercise.cover) {
            this._selectedPicture = 'data:image/jpg;base64,' + exercise.cover;
          }
          this.bind_ExerciseRequestWithForm(this._exerciseRequest);
        },
        error: (err) => { 
          this._errorMsg = this.handleError.handleError(err);
        }
      });
    }
  }

  private bind_ExerciseRequestWithForm(exercise: ExerciseRequest) {
    this.exerciseForm.controls.exerciseName.setValue(exercise.name);
    this.exerciseForm.controls.exerciseDescription.setValue(exercise.description);
    this.exerciseForm.controls.is_shareable.setValue(exercise.shareable);
    this.exerciseForm.controls.exerciseCategory.setValue(exercise.category);
  }

  private bindFormWith_ExerciseRequest() {
      this._exerciseRequest.name = this.exerciseForm.controls.exerciseName.value as string;
      this._exerciseRequest.description = this.exerciseForm.controls.exerciseDescription.value as string;
      this._exerciseRequest.shareable = this.exerciseForm.controls.is_shareable.value as boolean;
      this._exerciseRequest.category = this.exerciseForm.controls.exerciseCategory.value as Array<ExerciseCategory>;
  }

  get categories(): Array<string> {
    return this.exercises_categories;
  }

  saveExercise() {
    this._errorMsg = []; 
      this.bindFormWith_ExerciseRequest();
      this.exerciseService.saveExercise({ body: this._exerciseRequest })
      .subscribe({
        next: (exerciseId) => {  
          if (this._selectedCover) {
            this.uploadCoverImage(exerciseId);
          }
          this.router.navigate([sub_appRoutingModule.full_myExercisesPath]);
        },
        error: (err) => {
          this._errorMsg = this.handleError.handleError(err);
        }
      });
  }
  
 private uploadCoverImage(exerciseId: number) {
    this.exerciseService.uploadBookCoverPicture({
      'exercise-id': exerciseId,
      body: {
        file: this._selectedCover
      }
    })
    .subscribe({
      error: (err) => {
        this._errorMsg = this.handleError.handleError(err);
      }
    });
  }

  onFileSelected(event: any) {
    this._selectedCover = event.target.files[0];
    if (this._selectedCover) {
      const reader = new FileReader();
      reader.onload = () => {
        this._selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this._selectedCover);
    }
  }

  get myExercisePath(): string {
    return sub_appRoutingModule.full_myExercisesPath;
  }
}
