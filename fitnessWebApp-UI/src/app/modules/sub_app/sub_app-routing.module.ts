import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../services/guard/auth.guard';
import { MainComponent } from './pages/main/main.component';
import { ManageExerciseComponent } from './pages/manage-exercise/manage-exercise.component';
import { MyExerciseListComponent } from './pages/my-exercise-list/my-exercise-list.component';
import { AppRoutingModule } from '../../app-routing.module';
import { ManageTrainingComponent } from './pages/manage-training/manage-training.component';
import { MyTrainListComponent } from './pages/my-train-list/my-train-list.component';
import { TrainingDetailsComponent } from './pages/training-details/training-details.component';
import { MyPeriodListComponent } from './pages/my-period-list/my-period-list.component';
import { ManagePeriodComponent } from './pages/manage-period/manage-period.component';
import { PeriodDetailsComponent } from './pages/period-details/period-details.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ExerciseStoreComponent } from './pages/exercise-store/exercise-store.component';
import { ManageProgressComponent } from './pages/manage-progress/manage-progress.component';


const HOME_PATH = 'home';

const MANAGE_EXERCISE_PATH = 'manage-training';
const MANAGE_TRAINING_PATH = 'manage-exercise';
const MANAGE_PERIOD_PATH = 'manage-period';
const MANAGE_PROGRESS_PATH = 'manage-progress';

const MY_EXERCISES_PATH = 'my-exercises';
const MY_TRAINS_PATH = 'my-trains';
const MY_PERIODS_PATH = 'my-periods';

const EXERCISE_STORE_PATH = 'exercise-store';


const TRAINING_DETAILS_PATH = 'training-details';
const PERIOD_DETAILS_PATH = 'period-details';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: MyExerciseListComponent,
        canActivate: [authGuard]
      },
      {
        path: HOME_PATH,
        component: HomePageComponent,
        canActivate: [authGuard]
      },
      {
        path: MANAGE_EXERCISE_PATH,
        component: ManageExerciseComponent,
        canActivate: [authGuard]
      },
      {
        path: MANAGE_EXERCISE_PATH + '/:exerciseId',
        component: ManageExerciseComponent,
        canActivate: [authGuard]
      },
      {
        path: EXERCISE_STORE_PATH,
        component: ExerciseStoreComponent,
        canActivate: [authGuard]
      },
      {
        path: MY_EXERCISES_PATH,
        component: MyExerciseListComponent,
        canActivate: [authGuard]
      },
      {
        path: MY_TRAINS_PATH,
        component: MyTrainListComponent,
        canActivate: [authGuard]
      },
      {
        path: MY_PERIODS_PATH,
        component: MyPeriodListComponent,
        canActivate: [authGuard]
      },
      {
        path: PERIOD_DETAILS_PATH + '/:period_id',
        component: PeriodDetailsComponent,
        canActivate: [authGuard]
      },
      {
        path: MANAGE_PERIOD_PATH,
        component: ManagePeriodComponent,
        canActivate: [authGuard]
      },
      {
        path: MANAGE_PERIOD_PATH + '/:period_id',
        component: ManagePeriodComponent,
        canActivate: [authGuard]
      },
      {
        path: TRAINING_DETAILS_PATH + '/:training_id',
        component: TrainingDetailsComponent,
        canActivate: [authGuard]
      },
      {
        path: MANAGE_TRAINING_PATH,
        component: ManageTrainingComponent,
        canActivate: [authGuard]
      },
      {
        path: MANAGE_TRAINING_PATH + '/:training_id',
        component: ManageTrainingComponent,
        canActivate: [authGuard]
      },
      {
        path: MANAGE_PROGRESS_PATH,
        component: ManageProgressComponent,
        canActivate: [authGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class sub_appRoutingModule {


  //HOME
  static get full_homePath(): string {
    return "/" + AppRoutingModule.personalAreaPath + "/" + HOME_PATH;
  }

  //LIST VIEWS
  static get full_myExercisesPath(): string {
    return "/" + AppRoutingModule.personalAreaPath + "/" + MY_EXERCISES_PATH;
  }
  static get full_myTrainsPath(): string {
    return "/" + AppRoutingModule.personalAreaPath + "/" + MY_TRAINS_PATH;
  }
  static get full_myPeriodsPath(): string {
    return "/" + AppRoutingModule.personalAreaPath + "/" + MY_PERIODS_PATH;
  }


  //DETAILS
  static get full_trainingDetailsPath(): string {
    return "/" + AppRoutingModule.personalAreaPath + "/" + TRAINING_DETAILS_PATH;
  }
  static get full_periodDetailsPath(): string {
    return "/" + AppRoutingModule.personalAreaPath + "/" + PERIOD_DETAILS_PATH;
  }


  //MANAGING
  static get full_manageExercisePath(): string {
    return "/" + AppRoutingModule.personalAreaPath + "/" + MANAGE_EXERCISE_PATH;
  }
  static get full_manageTrainingPath(): string {
    return "/" + AppRoutingModule.personalAreaPath + "/" + MANAGE_TRAINING_PATH;
  }
  static get full_managePeriodPath(): string {
    return "/" + AppRoutingModule.personalAreaPath + "/" + MANAGE_PERIOD_PATH;
  }
  static get full_manageProgressPath(): string {
    return "/" + AppRoutingModule.personalAreaPath + "/" + MANAGE_PROGRESS_PATH;
  }


    //STORE
    static get full_exerciseStorePath(): string {
      return "/" + AppRoutingModule.personalAreaPath + "/" + EXERCISE_STORE_PATH;
    }
}
