/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { UserService } from './services/user.service';
import { ProgressService } from './services/progress.service';
import { PeriodsService } from './services/periods.service';
import { NotificaService } from './services/notifica.service';
import { TrainService } from './services/train.service';
import { TrainExerciseService } from './services/train-exercise.service';
import { RagllmService } from './services/ragllm.service';
import { PeriodTrainingService } from './services/period-training.service';
import { ExerciseService } from './services/exercise.service';
import { AuthenticationService } from './services/authentication.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    UserService,
    ProgressService,
    PeriodsService,
    NotificaService,
    TrainService,
    TrainExerciseService,
    RagllmService,
    PeriodTrainingService,
    ExerciseService,
    AuthenticationService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
