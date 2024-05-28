import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../services/guard/auth.guard';
import { AppRoutingModule } from '../../app-routing.module';


const HOME_PATH = 'home';

const LOGOUT_PATH = 'logout';

const PROFILE_SETTINGS_PATH = 'profile-settings';

const MANAGE_EXERCISE_PATH = 'manage-exercise';
const MANAGE_TRAINING_PATH = 'manage-training';
const MANAGE_PERIOD_PATH = 'manage-period';
const MANAGE_PROGRESS_PATH = 'manage-progress';
const MANAGE_DIET_PATH = 'manage-diet';

const MY_EXERCISES_PATH = 'my-exercises';
const MY_TRAINS_PATH = 'my-trains';
const MY_PERIODS_PATH = 'my-periods';

const EXERCISE_STORE_PATH = 'exercise-store';

const TRAINING_DETAILS_PATH = 'training-details';
const PERIOD_DETAILS_PATH = 'period-details';


const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/main/main.component').then(m => m.MainComponent),
    canActivate: [authGuard],
    children: [
      {
        path: PROFILE_SETTINGS_PATH,
        loadComponent: () => import('./pages/manage-profile/manage-profile.component').then(m => m.ManageProfileComponent),
        canActivate: [authGuard],
        data: {
          breadcrumb: [
            {
              label: 'Profile',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            }
          ]
        },
      },
      {
        path: '',
        loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent),
        canActivate: [authGuard],
        data: {
          breadcrumb:
            []
        },
      },
      {
        path: HOME_PATH,
        loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent),
        canActivate: [authGuard],
        data: {
          breadcrumb:
            []
        },
      },
      {
        path: MANAGE_EXERCISE_PATH,
        loadComponent: () => import('./pages/manage-exercise/manage-exercise.component').then(m => m.ManageExerciseComponent),
        canActivate: [authGuard],
        data: {
          breadcrumb:
            [{
              label: 'Esercizi',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            },
            {
              label: 'Gestisci esercizi',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            }]
        },
      },
      {
        path: `${MANAGE_EXERCISE_PATH}/:exerciseId`,
        loadComponent: () => import('./pages/manage-exercise/manage-exercise.component').then(m => m.ManageExerciseComponent),
        canActivate: [authGuard],
        data: {
          breadcrumb:
            [{
              label: 'Gestisci esercizi',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            }]
        },
      },
      {
        path: EXERCISE_STORE_PATH,
        loadComponent: () => import('./pages/exercise-store/exercise-store.component').then(m => m.ExerciseStoreComponent),
        canActivate: [authGuard],
        data: {
          breadcrumb:
            [{
              label: 'Store esercizi',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            }]
        },
      },
      {
        path: MY_EXERCISES_PATH,
        loadComponent: () => import('./pages/my-exercise-list/my-exercise-list.component').then(m => m.MyExerciseListComponent),
        canActivate: [authGuard],
        data: { preload: true,
          breadcrumb:
            [{
              label: 'Esercizi',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            }]
         },  // Preload this component

      },
      {
        path: MY_TRAINS_PATH,
        loadComponent: () => import('./pages/my-train-list/my-train-list.component').then(m => m.MyTrainListComponent),
        canActivate: [authGuard],
        data: {
          breadcrumb:
            [{
              label: 'Allenamenti',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            }]
        },
      },
      {
        path: MY_PERIODS_PATH,
        loadComponent: () => import('./pages/my-period-list/my-period-list.component').then(m => m.MyPeriodListComponent),
        canActivate: [authGuard],
        data: {
          breadcrumb:
            [{
              label: 'Periodi',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            }]
        },
      },
      {
        path: `${PERIOD_DETAILS_PATH}/:period_id`,
        loadComponent: () => import('./pages/period-details/period-details.component').then(m => m.PeriodDetailsComponent),
        canActivate: [authGuard],
        data: {
          breadcrumb:
            [{
              label: 'Periodi',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            },
            {
              label: 'Dettagli periodo',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            }]
        },
      },
      {
        path: MANAGE_PERIOD_PATH,
        loadComponent: () => import('./pages/manage-period/manage-period.component').then(m => m.ManagePeriodComponent),
        canActivate: [authGuard],
        data: {
          breadcrumb:
            [{
              label: 'Periodi',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            },
            {
              label: 'Gestisci periodo',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            }]
        },
      },
      {
        path: `${MANAGE_PERIOD_PATH}/:period_id`,
        loadComponent: () => import('./pages/manage-period/manage-period.component').then(m => m.ManagePeriodComponent),
        canActivate: [authGuard],
        data: {
          breadcrumb:
            [{
              label: 'Periodi',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            },
            {
              label: 'Gestisci periodo',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            }]
        }
      },
      {
        path: `${TRAINING_DETAILS_PATH}/:training_id`,
        loadComponent: () => import('./pages/training-details/training-details.component').then(m => m.TrainingDetailsComponent),
        canActivate: [authGuard],
        data: {
          breadcrumb:
            [{
              label: 'Allenamenti',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            },
            {
              label: 'Dettagli allenamento',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            }]
        }
      },
      {
        path: MANAGE_TRAINING_PATH,
        loadComponent: () => import('./pages/manage-training/manage-training.component').then(m => m.ManageTrainingComponent),
        canActivate: [authGuard],
        data: {
          breadcrumb:
            [{
              label: 'Allenamenti',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            },
            {
              label: 'Gestisci allenamento',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            }]
        }
      },
      {
        path: `${MANAGE_TRAINING_PATH}/:training_id`,
        loadComponent: () => import('./pages/manage-training/manage-training.component').then(m => m.ManageTrainingComponent),
        canActivate: [authGuard],
        data: {
          breadcrumb:
            [{
              label: 'Allenamenti',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            },
            {
              label: 'Gestisci allenamento',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            }]
        }
      },
      {
        path: MANAGE_PROGRESS_PATH,
        loadComponent: () => import('./pages/manage-progress/manage-progress.component').then(m => m.ManageProgressComponent),
        canActivate: [authGuard],
        data: {
          breadcrumb:
            [{
              label: 'Progressi',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            },
            {
              label: 'Gestisci progresso',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            }]
        }
      },
      {
        path: `${MANAGE_PROGRESS_PATH}/:progresso_id`,
        loadComponent: () => import('./pages/manage-progress/manage-progress.component').then(m => m.ManageProgressComponent),
        canActivate: [authGuard],
        data: {
          breadcrumb:
            [{
              label: 'Progressi',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            },
            {
              label: 'Gestisci progresso',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            }]
        }
      },
      {
        path: MANAGE_DIET_PATH,
        loadComponent: () => import('./pages/manage-diet/manage-diet.component').then(m => m.ManageDietComponent),
        canActivate: [authGuard],
        data: {
          breadcrumb:
            [{
              label: 'Dieta',
              url: '',
              active: true,
              class: 'breadcrumb-item active'
            },
            ]
        }
      },
      {
        path: LOGOUT_PATH,
        loadComponent: () => import('./pages/logout/logout.component').then(m => m.LogoutComponent),
        canActivate: [authGuard]
      }
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

  //LOGOUT
  static get full_logoutPath(): string {
    return "/" + AppRoutingModule.personalAreaPath + "/" + LOGOUT_PATH;
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
  static get full_manageProfilePath(): string {
    return "/" + AppRoutingModule.personalAreaPath + "/" + PROFILE_SETTINGS_PATH;
  }
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
  static get full_manageDietPath(): string {
    return "/" + AppRoutingModule.personalAreaPath + "/" + MANAGE_DIET_PATH;
  }

    //STORE
    static get full_exerciseStorePath(): string {
      return "/" + AppRoutingModule.personalAreaPath + "/" + EXERCISE_STORE_PATH;
    }
}
